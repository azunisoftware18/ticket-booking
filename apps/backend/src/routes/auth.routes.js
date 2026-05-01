import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import AuthValidation from "../validations/auth.validation.js";
import ValidateRequest from "../middlewares/validateRequest.middleware.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import asyncHandler from "../utils/AsyncHandler.js";

const router = Router();

router.post(
  "/login",
  ValidateRequest.validate(AuthValidation.login),
  asyncHandler(AuthController.login)
);

router.get(
  "/",
  AuthMiddleware.isAuthenticated,
  asyncHandler(AuthController.getMe)
);

router.post("/refresh", asyncHandler(AuthController.refresh));

router.post(
  "/logout",
  AuthMiddleware.isAuthenticated,
  asyncHandler(AuthController.logout)
);

export default router;
