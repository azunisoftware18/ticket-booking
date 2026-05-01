import { PrismaClient } from "../generated/prisma/index.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { createPool } from "mariadb";
import { envConfig } from "../config/env.config.js";

const pool = createPool({ uri: envConfig.DATABASE_URL });
const adapter = new PrismaMariaDb(pool);

const prisma = new PrismaClient({ adapter });
export default prisma;
