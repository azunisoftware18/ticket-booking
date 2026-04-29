import jwt from "jsonwebtoken";
import { envConfig } from "../config/env.config";
import prisma from "../db/db.js";

export const authMiddleware = (req, res, next) => {
  const token =
    req.headers["authorization"]?.replace("Bearer ", "") ||
    req.cookes?.accessToken;

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, envConfig.ACCESS_TOKEN_SECRET);
     const userExists = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        role: true,
        email: true,
        phone: true
      }
    });

    if (!userExists) {
      throw ApiError.unauthorized("Unauthorized: Invalid token user");
    }
    req.user =  userExists
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
