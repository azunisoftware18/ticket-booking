import { PrismaClient } from "../generated/prisma/index.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { createPool } from "mariadb";

// Connection pool banao
const pool = createPool({
  uri: process.env.DATABASE_URL,
  connectionLimit: 10,
});

const adapter = new PrismaMariaDb(pool);

const prisma = new PrismaClient({
  adapter,
});

export default prisma;
