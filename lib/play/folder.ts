"use server";
import { prisma } from "@/lib/share";

export const CreateFolder = async (formData: FormData) => {
  console.log(Object.fromEntries(formData));
  const folder = {
    name: formData.get("name")?.toString() || "",
    private: formData.get("private")?.toString() === "on",
    parentId: formData.get("parentId")?.toString() || null,
    userId: "cm0f0x1ie00006ueep82gxata",
  };

  try {
    const newFolder = await prisma.folder.create({
      data: {
        name: folder.name,
        parentId: folder.parentId,
        userId: folder.userId,
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

export const DeleteFolderById = async (folderId: string) => {
  try {
    const deletedFolder = await prisma.folder.delete({
      where: {
        id: folderId,
      },
    });

    return deletedFolder;
  } catch (error) {
    console.log("🚀 ~ DeleteFolderById ~ error:", error);
    throw new Error("Failed to delete the folder.");
  }
};
