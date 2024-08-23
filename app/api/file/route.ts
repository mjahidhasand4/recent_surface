import path from "node:path";
import fs from "node:fs/promises";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { uuid, prisma } from "@/lib/share";

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const ext = path.extname(file.name);
    const newFilename = uuid();
    const fileName = `./public/uploads/${newFilename}${ext}`;
    await fs.writeFile(fileName, buffer);

    await prisma.file.create({
      data: {
        ext: ext.slice(1),
        name: file.name,
        src: fileName,
        alt: "",
        caption: "",
        description: "",
      },
    });

    revalidatePath("/");

    return NextResponse.json({ status: "success" });
  } catch (e) {
    return NextResponse.json({ status: "fail", error: e });
  }
};
