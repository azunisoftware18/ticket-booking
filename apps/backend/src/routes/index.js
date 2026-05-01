import { Router } from "express";
import bookingRoute from "./booking.routes.js";
import slotRoute from "./slot.routes.js";
import authRoute from "./auth.routes.js";

const router = Router();

// 📦 all routes
router.use("/booking", bookingRoute);
router.use("/slot", slotRoute);
router.use("/auth", authRoute);

export default router;
