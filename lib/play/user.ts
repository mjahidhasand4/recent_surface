"use server";
import { prisma } from "@/lib/share";
import { hash } from "bcryptjs";

export const CreateUser = async () => {
  const hashedPassword = await hash("123456", 10);
  await prisma.user.create({
    data: {
      name: "MD. Jahid Hasan",
      email: "mjahidhasand4@gmail.com",
      phoneNumber: "1303043742",
      password: hashedPassword,
    },
  });
};