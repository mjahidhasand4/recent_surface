"use server";
import { prisma } from "@/lib/share";

interface CreateFolder {
  (name: string, parentId: string | null, userId: string): Promise<boolean>;
}

export const CreateFolder: CreateFolder = async (name, parentId, userId) => {
  try {
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new Error("User not found");
    }

    const newFolder = await prisma.folder.create({
      data: {
        name,
        parentId: parentId || undefined,
        userId,
      },
    });

    console.log("Folder created successfully:", newFolder);
    return true;
  } catch (error) {
    console.error("Error creating folder:", error);
    return false;
  }
};

export const GetRootFolder = async () => {
  const rootFolder = await prisma.folder.findFirst({
    where: {
      parentId: null,
    },
    select: {
      id: true,
      name: true,
      subfolders: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return rootFolder;
};

export const GetFolderById = async (folderId: string) => {
  return await prisma.folder.findUnique({
    where: { id: folderId },
    select: {
      id: true,
      name: true,
      subfolders: true,
    },
  });
};
