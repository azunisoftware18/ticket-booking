import { Router } from "express";
import TicketController from "../controllers/ticket.controller.js";
import asyncHandler from "../utils/AsyncHandler.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.get(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.authorize(["ADMIN"]),
  asyncHandler(TicketController.getAll)
);

router.get(
  "/download/:bookingId",
  asyncHandler(TicketController.download)
);

export default router;