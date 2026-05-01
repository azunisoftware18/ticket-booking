import { z } from "zod";

class BookingValidation {
  static get createBooking() {
    return z.object({
      eventId: z.string().uuid(),
      slotId: z.string().uuid(),

      tickets: z
        .array(
          z.object({
            typeId: z.string().uuid(),
            quantity: z.number().min(1).max(6),
          })
        )
        .min(1),

      fullName: z.string().min(2),
      email: z.string().email(),
      phone: z.string().min(10),
    });
  }

  static get scanTicket() {
    return z.object({
      qrCode: z.string(),
      gateId: z.string().uuid(),
      type: z.enum(["ENTRY", "EXIT"]),
    });
  }
}

export default BookingValidation;
