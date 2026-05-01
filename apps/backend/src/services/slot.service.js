import prisma from "../db/db.js";
import { ApiError } from "../utils/ApiError.js";

class SlotService {
  static async createSlot(payload) {
    const { placeId, startTime, endTime, capacity } = payload;

    const place = await prisma.place.findUnique({
      where: { id: placeId },
    });

    if (!place) {
      throw ApiError.notFound("Place not found");
    }

    const overlapping = await prisma.slot.findFirst({
      where: {
        placeId,
        OR: [
          {
            startTime: { lte: new Date(endTime) },
            endTime: { gte: new Date(startTime) },
          },
        ],
      },
    });

    if (overlapping) {
      throw ApiError.conflict("Slot time overlaps with existing slot");
    }

    const slot = await prisma.slot.create({
      data: {
        placeId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        capacity,
      },
    });

    return slot;
  }

  static async getSlots(placeId) {
    return await prisma.slot.findMany({
      where: { placeId },
      orderBy: { startTime: "asc" },
    });
  }
}

export default SlotService;
