import { Router } from "express";
import bookingRoute from "./booking.routes.js";
import slotRoute from "./slot.routes.js";
import authRoute from "./auth.routes.js";
import placeRoute from "./place.routes.js";

const router = Router();

// 📦 all routes
router.use("/auth", authRoute);
router.use("/place", placeRoute);
router.use("/booking", bookingRoute);
router.use("/slot", slotRoute);

export default router;
