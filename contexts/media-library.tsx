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
        <MediaLibrary className="overlay" />
      </Portal>

      {props.children}
    </MediaLibraryContext.Provider>
  );
};