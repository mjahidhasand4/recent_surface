"use client";
import { useContext } from "react";
import { FileManagerContext } from "@/contexts";

export const useFileExplorer = () => {
  const context = useContext(FileManagerContext);
  if (!context) throw new Error("useFileExplorer must be used within a FileManagerProvider");
  return context;
};