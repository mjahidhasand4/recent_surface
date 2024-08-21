"use client";
import { createContext } from "react";
import { Portal } from "@/components/share";
import { FileManager } from "@/components/ui";

interface Props {
  children: React.ReactNode;
}

export const FileManagerContext = createContext({});

export const FileManagerProvider: React.FC<Props> = (props) => {
  return (
    <FileManagerContext.Provider value={{}}>
      <Portal>
        <div className="overlay">
          <FileManager className="gradient-border" />
        </div>
      </Portal>

      {props.children}
    </FileManagerContext.Provider>
  );
};
