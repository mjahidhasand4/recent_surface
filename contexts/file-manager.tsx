"use client";
import { DismissIcon } from "@/components/icons";
import { Portal, UploadFile } from "@/components/share";
import { useClickOutside } from "@/hooks/share";
import { GetOrphanFiles } from "@/lib/play";
import { createFileProgressList, onFileUpload } from "@/utils/file";
import { ChangeEvent, createContext, useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

interface FileProgress {
  file: File;
  progress: number;
  status: "pending" | "uploading" | "completed" | "failed";
}

interface State {
  isOpen: boolean;
  data: {
    files: FileProgress[] | null;
  };
  orphanFiles: {
    id: string;
    name: string;
    ext: string;
    src: string;
    alt: string;
    caption: string;
    description: string;
  }[];
}

const initialState: State = {
  isOpen: true,
  data: {
    files: null,
  },
  orphanFiles: [],
};

export const FileManagerContext = createContext<{ open: () => void }>({
  open: () => {},
});

export const FileManagerProvider: React.FC<Props> = ({ children }) => {
  const [state, setState] = useState<State>(initialState);

  useEffect(() => {
    const getOrphanFiles = async () => {
      try {
        const orphanFiles = await GetOrphanFiles();
        setState((prev) => ({
          ...prev,
          orphanFiles: orphanFiles.map((file) => ({
            ...file,
            ext: file.ext,
            alt: file.alt ?? "",
            caption: file.caption ?? "",
            description: file.description ?? "",
          })),
        }));
      } catch (error) {
        console.error("Error fetching orphan files:", error);
      }
    };

    getOrphanFiles();
  }, []);

  const open = () => {
    setState((prev) => ({
      ...prev,
      isOpen: true,
    }));
  };

  const close = () => {
    setState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const ref = useClickOutside(close);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    const filesWithProgress = createFileProgressList(files);

    setState((prev) => ({
      ...prev,
      data: { files: filesWithProgress },
    }));

    onFileUpload(filesWithProgress, updateFileProgress);
  };

  const updateFileProgress = (
    targetFile: File,
    update: Partial<FileProgress>
  ) => {
    setState((prev) => {
      const updatedFiles = prev.data.files?.map((fileProgress) =>
        fileProgress.file === targetFile
          ? { ...fileProgress, ...update }
          : fileProgress
      );
      return { ...prev, data: { files: updatedFiles ?? [] } };
    });
  };

  return (
    <FileManagerContext.Provider value={{ open }}>
      <Portal>
        {state.isOpen && (
          <div className="overlay">
            <div ref={ref} className="file-explorer gradient-border">
              <div className="overlap">
                <div className="scrollbar">
                  <div>
                    <h4>
                      <img src="/icons/quick-mode.png" alt="" />
                      <span>Quick Access</span>
                    </h4>
                    <nav>
                      <button>
                        <img src="/icons/user-folder.png" alt="" />
                        <span>My Folder</span>
                      </button>
                      <button>
                        <img src="/icons/favorite-folder.png" alt="" />
                        <span>Favorite</span>
                      </button>
                      <button>
                        <img src="/icons/documents.png" alt="" />
                        <span>Documents</span>
                      </button>
                      <button>
                        <img src="/icons/gallery.png" alt="" />
                        <span>Pictures</span>
                      </button>
                      <button>
                        <img src="/icons/music-heart.png" alt="" />
                        <span>Music</span>
                      </button>
                      <button>
                        <img src="/icons/video.png" alt="" />
                        <span>Videos</span>
                      </button>
                    </nav>
                  </div>

                  <div>
                    <h4>
                      <img src="/icons/file-explorer.png" alt="" />
                      <span>File Explorer</span>
                    </h4>
                    <nav>
                      <button>
                        <img src="/icons/gallery.png" alt="" />
                        <span>Pictures</span>
                      </button>
                      <button>
                        <img src="/icons/video.png" alt="" />
                        <span>Videos</span>
                      </button>
                    </nav>
                  </div>
                </div>

                <div>
                  <img src="/icons/pictures-folder.png" alt="" />
                  <span>Insert files</span>
                  <input type="file" multiple onChange={onFileChange} />
                </div>
              </div>

              <div className="overlap">
                <button onClick={close}>
                  <DismissIcon />
                </button>

                <div>
                  <h4>Orphan Files</h4>

                  {state.orphanFiles.length > 0 &&
                    state.orphanFiles.map((file) => (
                      <UploadFile key={file.id} {...file} />
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Portal>

      {children}
    </FileManagerContext.Provider>
  );
};
