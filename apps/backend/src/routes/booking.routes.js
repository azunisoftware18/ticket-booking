import { Router } from "express";
import BookingController from "../controllers/booking.controller.js";
import BookingValidation from "../validations/booking.validation.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import ValidateRequest from "../middlewares/validateRequest.middleware.js";
import asyncHandler from "../utils/AsyncHandler.js";

const router = Router();

// Create booking
router.post(
  "/create",
  ValidateRequest.validate(BookingValidation.createBooking),
  asyncHandler(BookingController.create)
);

// Scan QR (Gate device)
router.post(
  "/scan",
  ValidateRequest.validate(BookingValidation.scanTicket),
  asyncHandler(BookingController.scan)
);

export default router;
