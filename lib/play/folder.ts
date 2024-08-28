"use server";
import { prisma } from "@/lib/share";

export const CreateFolder = async (_: any, formData: FormData) => {
  try {
    const userId = "";
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

export const GetPinnedFolder = async () => {
  try {
    const pinnedFolders = await prisma.folder.findMany({
      where: {
        isPinned: true,
      },
    });

    return pinnedFolders;
  } catch (error) {
    console.log("🚀 ~ GetPinnedFolder ~ error:", error);
    return [];
  }
};
