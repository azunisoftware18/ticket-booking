import BookingService from "../services/booking.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

class BookingController {
  static create = async (req, res) => {
    const data = await BookingService.createBooking(req.body);

    return res
      .status(201)
      .json(ApiResponse.success(data, "Booking successful", 201));
  };

  static scan = async (req, res) => {
    const data = await BookingService.scanTicket(req.body);

    return res.status(200).json(ApiResponse.success(data, "Scan success", 200));
  };
}

export default BookingController;
