import { Router } from "express";
import SlotController from "../controllers/slot.controller.js";
import SlotValidation from "../validations/slot.validation.js";
import ValidateRequest from "../middlewares/validateRequest.middleware.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.authorize(["ADMIN"]),
  ValidateRequest.validate(SlotValidation.createSlot),
  SlotController.create
);

router.get("/:placeId", SlotController.list);

export default router;
