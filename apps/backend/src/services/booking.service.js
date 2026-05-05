import prisma from "../db/db.js";
import crypto from "node:crypto";
import QRCode from "qrcode";
import { ApiError } from "../utils/ApiError.js";
import { envConfig } from "../config/env.config.js";
import { log } from "node:console";

class BookingService {
  static async createBooking(payload, user) {
    const {
      placeId,
      slotDateTime,
      tickets,
      addons,
      name,
      email,
      phone,
      bookingType = "TICKET",
    } = payload;

    const txnId = "TXN_" + Date.now();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    return prisma.$transaction(
      async (tx) => {
        const typeIds = tickets.map((t) => t.typeId);

        const ticketTypes = await tx.ticketType.findMany({
          where: { id: { in: typeIds } },
        });

        if (!ticketTypes.length) {
          throw ApiError.badRequest("Invalid ticket types");
        }

        let totalAmount = 0;
        let totalSeats = 0;

        tickets.forEach((t) => {
          const type = ticketTypes.find((x) => x.id === t.typeId);
          totalAmount += type.price * t.quantity;
          totalSeats += t.quantity;
        });

        const addonIds = addons?.map((a) => a.addonId) || [];

        const addonList = await tx.addon.findMany({
          where: {
            id: { in: addonIds },
            placeId,
            isActive: true,
          },
        });

        if (addons?.length) {
          if (addonList.length !== addons.length) {
            throw ApiError.badRequest("Invalid or inactive addon");
          }
        }

        let addonAmount = 0;

        addons?.forEach((a) => {
          const addon = addonList.find((x) => x.id === a.addonId);
          addonAmount += addon.price * a.quantity;
        });

        const finalAmount = totalAmount + addonAmount;

        const capacity = await this.getSlotCapacity(tx, placeId, slotDateTime);

        const activeBookings = await tx.booking.findMany({
          where: {
            placeId,
            slotDateTime: new Date(slotDateTime),
            OR: [
              { status: "PAID" },
              { status: "PENDING", expiresAt: { gt: new Date() } },
            ],
          },
        });

        const usedSeats = activeBookings.reduce(
          (sum, b) => sum + b.totalSeats,
          0
        );

        if (totalSeats > capacity - usedSeats) {
          throw ApiError.badRequest("Not enough seats available");
        }

        const booking = await tx.booking.create({
          data: {
            userId: user?.id,
            placeId,
            slotDateTime: new Date(slotDateTime),
            name,
            email,
            phone,
            totalAmount: finalAmount,
            totalSeats,
            bookingType,
            txnId,
            status: "PENDING",
            expiresAt,
          },
        });

        // 🔥 SAVE ADDONS
        if (addons?.length) {
          await tx.bookingAddon.createMany({
            data: addons.map((a) => ({
              bookingId: booking.id,
              addonId: a.addonId,
              quantity: a.quantity,
            })),
          });
        }

        const key = envConfig.EASEBUZZ_KEY;
        const salt = envConfig.EASEBUZZ_SALT;

        const hashString = `${key}|${txnId}|${finalAmount}|Ticket Booking|${name}|${email}|||||||||||${salt}`;
        const hash = crypto
          .createHash("sha512")
          .update(hashString)
          .digest("hex");

        return {
          booking,
          payment: {
            txnid: txnId,
            amount: finalAmount,
            firstname: name,
            email,
            phone,
            productinfo: "Ticket Booking",
            surl: `${envConfig.BASE_URL}/api/booking/success`,
            furl: `${envConfig.BASE_URL}/api/booking/failure`,
            key,
            hash,
            url: "https://pay.easebuzz.in/payment/initiateLink",
          },
        };
      },
      { isolationLevel: "Serializable" }
    );
  }

  static async paymentSuccess(data) {
    const booking = await prisma.booking.findUnique({
      where: { txnId: data.txnid },
    });

    if (!booking) throw ApiError.notFound("Booking not found");

    // 🔐 verify using gateway data only
    if (!this.verifyHash(data)) {
      throw ApiError.badRequest("Invalid payment");
    }

    if (data.status.toLowerCase() !== "success") {
      throw ApiError.badRequest("Payment not successful");
    }

    if (booking.status === "PAID") return booking;

    if (booking.expiresAt < new Date()) {
      throw ApiError.badRequest("Booking expired");
    }

    const updated = await prisma.booking.update({
      where: { txnId: data.txnid },
      data: {
        status: "PAID",
        paymentId: data.easepayid,
      },
    });

    return updated;
  }

  static async paymentFailure(data) {
    const booking = await prisma.booking.findUnique({
      where: { txnId: data.txnid },
    });

    if (!booking) throw ApiError.notFound("Booking not found");

    if (booking.status !== "PENDING") return true;

    await prisma.booking.update({
      where: { txnId: data.txnid },
      data: { status: "FAILED" },
    });

    return true;
  }

  static async expireBookings() {
    await prisma.booking.updateMany({
      where: {
        status: "PENDING",
        expiresAt: { lt: new Date() },
      },
      data: {
        status: "EXPIRED",
      },
    });
  }

  static async getSlotCapacity(tx, placeId, slotDateTime) {
    const dateObj = new Date(slotDateTime);

    const startOfDay = new Date(dateObj.setHours(0, 0, 0, 0));

    const time = new Date(slotDateTime).toISOString().slice(11, 16); // HH:mm

    // OVERRIDE CHECK
    const override = await tx.slotOverride.findFirst({
      where: {
        placeId,
        date: startOfDay,
        startTime: time,
      },
    });

    if (override) {
      if (override.isClosed) {
        throw ApiError.badRequest("Slot is closed");
      }

      if (override.capacity !== null) {
        return override.capacity;
      }
    }

    // TEMPLATE RANGE MATCH
    const template = await tx.slotTemplate.findFirst({
      where: {
        placeId,
        startTime: { lte: time },
        endTime: { gt: time },
      },
    });

    if (!template) {
      throw ApiError.notFound("Slot not found");
    }

    return template.capacity;
  }

  static verifyHash(data) {
    const salt = envConfig.EASEBUZZ_SALT;
    const key = envConfig.EASEBUZZ_KEY;

    const str = `${salt}|${data.status}|||||||||||${data.email}|${data.firstname}|${data.productinfo}|${data.amount}|${data.txnid}|${key}`;

    const hash = crypto.createHash("sha512").update(str).digest("hex");

    return hash === data.hash;
  }

  static async generateTicketQR(ticket) {
    const payload = JSON.stringify({
      ticketId: ticket.id,
      ts: Date.now(),
    });

    const signature = crypto
      .createHmac("sha256", envConfig.QR_SECRET)
      .update(payload)
      .digest("hex");

    const finalData = JSON.stringify({
      payload,
      signature,
    });

    const qrImage = await QRCode.toDataURL(finalData);

    return qrImage;
  }
}

export default BookingService;
