import prisma from "../db/db.js";
import { ApiError } from "../utils/ApiError.js";

class SlotService {
  static async createSlot(payload) {
    const { placeId, startTime, endTime, capacity } = payload;

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (start >= end) {
      throw ApiError.badRequest("Start time must be before end time");
    }

    const place = await prisma.place.findUnique({
      where: { id: placeId },
    });

    if (!place) {
      throw ApiError.notFound("Place not found");
    }

    const overlapping = await prisma.slot.findFirst({
      where: {
        placeId,
        startTime: { lt: end },
        endTime: { gt: start },
      },
    });

    if (overlapping) {
      throw ApiError.conflict("Slot overlaps with existing slot");
    }

    return await prisma.slot.create({
      data: {
        placeId,
        startTime: start,
        endTime: end,
        capacity,
      },
    });
  }

  static async getSlots(placeId) {
    return prisma.slot.findMany({
      where: { placeId },
      orderBy: { startTime: "asc" },
    });
  }
}

export default SlotService;
