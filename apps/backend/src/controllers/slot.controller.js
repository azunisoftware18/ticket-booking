import asyncHandler from "../utils/AsyncHandler.js";
import SlotService from "../services/slot.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

class SlotController {
  static create = asyncHandler(async (req, res) => {
    const data = await SlotService.createSlot(req.body);

    return res
      .status(201)
      .json(ApiResponse.success(data, "Slot created successfully", 201));
  });

  static list = asyncHandler(async (req, res) => {
    const { placeId } = req.params;

    const data = await SlotService.getSlots(placeId);

    return res
      .status(200)
      .json(ApiResponse.success(data, "Slots fetched successfully", 200));
  });
}

export default SlotController;