import express from "express";
import cors from "cors";
import { responseHandler } from "./middlewares/response.middleware.js";

const app = express();

app.use(cors({ origin: true, credentials: true }));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(responseHandler);

app.get("/health", (req, res) => {
  res.json({ status: "health is ok" });
});

export default app;
