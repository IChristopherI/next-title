import { prisma } from "./prisma.js";
import bcrypt from "bcryptjs";
async function main() {
  const hashPassword =  await bcrypt.hash("admin", 10)
  const user = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@gmail.com",
      password: hashPassword,
      Role: "Admin",      
    }
  })
  console.log("Created user:", user);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
