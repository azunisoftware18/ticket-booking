import { Router } from "express";
import bookingRoute from "./booking.routes.js";
import slotRoute from "./slot.routes.js";

const router = Router();

// 📦 all routes
router.use("/booking", bookingRoute);
router.use("/slot", slotRoute);

export default router;
