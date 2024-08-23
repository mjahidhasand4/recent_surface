"use server";
import { prisma } from "@/lib/share";

export const GetOrphanFiles = async () => {
  try {
    const files = await prisma.file.findMany({
      select: {
        id: true,
        ext: true,
        name: true,
        src: true,
        alt: true,
        caption: true,
        description: true,
      },
    });
    return files;
  } catch (error) {
    console.error("Error fetching orphan files:", error);
    throw new Error("Failed to fetch orphan files");
  }
};