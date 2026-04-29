import { PrismaClient } from "../generated/prisma/index.js";

const { PrismaClient } = generatedPrisma;
const prisma = new PrismaClient({});

export default prisma;