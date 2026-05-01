import "dotenv/config"; // 🔥 ensure env loads
import prisma from "../src/db/db.js";
import bcrypt from "bcryptjs";

async function main() {
  console.log("🌱 Seeding started...");

  const adminEmail = "admin@example.com";

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log("⚠️ Admin already exists");
    return;
  }

  // 🔐 hash password (bcryptjs)
  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  const admin = await prisma.user.create({
    data: {
      fullName: "Super Admin",
      email: adminEmail,
      phone: "9999999999",
      role: "ADMIN",
      password: hashedPassword,
    },
  });

  console.log("✅ Admin created:", admin.email);
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
