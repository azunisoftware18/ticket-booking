import { Router } from "express";
import BookingController from "../controllers/booking.controller.js";
import BookingValidation from "../validations/booking.validation.js";
import ValidateRequest from "../middlewares/validateRequest.middleware.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import asyncHandler from "../utils/AsyncHandler.js";

const router = Router();

router.post(
  "/",
  AuthMiddleware.isAuthenticated,
  ValidateRequest.validate(BookingValidation.createBooking),
  asyncHandler(BookingController.create)
);

router.post(
  "/success",
  ValidateRequest.validate(BookingValidation.paymentSuccess),
  asyncHandler(BookingController.success)
);
router.post(
  "/failure",
  ValidateRequest.validate(BookingValidation.paymentFailure),
  asyncHandler(BookingController.failure)
);

router.post(
  "/cancel/:id",
  AuthMiddleware.isAuthenticated,
  asyncHandler(BookingController.cancelBooking)
);

export default router;
