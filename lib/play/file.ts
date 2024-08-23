"use server";
import { prisma } from "@/lib/share";

export const GetOrphanFiles = async () => {
  try {
    return await prisma.file.findMany({
      select: {
        id: true,
        name: true,
        ext: true,
        src: true,
        alt: true,
        caption: true,
        description: true,
      },
    });
  } catch (error) {
    console.error("Error fetching files:", error);
    throw new Error("Failed to fetch orphan files");
  }
};
