"use client";
import { createContext } from "react";
import { Portal } from "@/components/share";
import { MediaLibrary } from "@/components/ui";

interface Props {
  children: React.ReactNode;
}

export const MediaLibraryContext = createContext({});

export const MediaLibraryProvider: React.FC<Props> = (props) => {
  return (
    <MediaLibraryContext.Provider value={{}}>
      <Portal>
        <div className="overlay">
          <MediaLibrary className="overlap gradient-border" />
        </div>
      </Portal>

      {props.children}
    </MediaLibraryContext.Provider>
  );
};
