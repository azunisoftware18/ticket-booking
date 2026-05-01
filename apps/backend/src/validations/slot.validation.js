import { z } from "zod";

class SlotValidation {
  static get createSlot() {
    return z.object({
      placeId: z.string().uuid(),
      startTime: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), "Invalid startTime"),
      endTime: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), "Invalid endTime"),
      capacity: z.number().min(1, "Capacity must be at least 1"),
    });
  }
}

export default SlotValidation;
