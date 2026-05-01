import prisma from "../db/db.js";
import { ApiError } from "../utils/ApiError.js";

class BookingService {
  static async createBooking(payload) {
    const { eventId, slotId, tickets, fullName, email, phone } = payload;

    return await prisma.$transaction(async (tx) => {
      const slot = await tx.slot.findUnique({
        where: { id: slotId },
      });

      if (!slot) throw ApiError.notFound("Slot not found");

      const totalRequested = tickets.reduce((sum, t) => sum + t.quantity, 0);

      if (slot.booked + totalRequested > slot.capacity) {
        throw ApiError.badRequest("Slot full");
      }

      let user = await tx.user.findUnique({ where: { email } });

      if (!user) {
        user = await tx.user.create({
          data: { fullName, email, phone },
        });
      }

      const createdTickets = [];

      for (const t of tickets) {
        for (let i = 0; i < t.quantity; i++) {
          const ticket = await tx.ticket.create({
            data: {
              userId: user.id,
              eventId,
              slotId,
              typeId: t.typeId,
              qrCode: "jhkjh",
              expiresAt: new Date(slot.endTime),
            },
          });

          createdTickets.push(ticket);
        }
      }

      await tx.slot.update({
        where: { id: slotId },
        data: {
          booked: {
            increment: totalRequested,
          },
        },
      });

      return createdTickets;
    });
  }

  static async scanTicket(payload) {
    const { qrCode, gateId, type } = payload;

    const ticket = await prisma.ticket.findUnique({
      where: { qrCode },
    });

    if (!ticket) throw ApiError.notFound("Invalid QR");

    if (type === "ENTRY") {
      if (ticket.status !== "PENDING") {
        throw ApiError.badRequest("Already used");
      }

      await prisma.ticket.update({
        where: { id: ticket.id },
        data: {
          status: "IN_PROGRESS",
          entryGateId: gateId,
          entryAt: new Date(),
        },
      });
    }

    if (type === "EXIT") {
      if (ticket.status !== "IN_PROGRESS") {
        throw ApiError.badRequest("Entry not done");
      }

      await prisma.ticket.update({
        where: { id: ticket.id },
        data: {
          status: "COMPLETED",
          exitGateId: gateId,
          exitAt: new Date(),
        },
      });
    }

    await prisma.scanLog.create({
      data: {
        ticketId: ticket.id,
        gateId,
        type,
      },
    });

    return { message: "Scan success" };
  }
}

export default BookingService;
