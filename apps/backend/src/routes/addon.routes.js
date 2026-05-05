import { Router } from "express";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import asyncHandler from "../utils/AsyncHandler.js";
import AddonController from "../controllers/addon.controller.js";

const router = Router();

router.post(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.authorize(["ADMIN"]),
  asyncHandler(AddonController.handle)
);

export default router;
