"use client";
import { createContext, useState, ChangeEvent, ReactNode } from "react";
import { Portal } from "@/components/share";
import { GetOrphanFiles } from "@/lib/play";

interface Props {
  children: ReactNode;
}

interface FileProgress {
  file: File;
  progress: number;
  status: "pending" | "uploading" | "completed" | "failed";
}

interface OrphanFile {
  id: string;
  ext: string;
  name: string;
  src: string;
  alt: string;
  caption: string;
  description: string;
}

interface State {
  data: {
    files: FileProgress[] | null;
    orphanFiles: OrphanFile[];
  };
}

const initialState: State = {
  data: {
    files: null,
    orphanFiles: [],
  },
};

export const FileManagerContext = createContext<State>(initialState);

export const FileManagerProvider: React.FC<Props> = (props) => {
  const [state, setState] = useState<State>(initialState);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    if (fileInput.files) {
      const filesArray = Array.from(fileInput.files);
      const filesWithProgress: FileProgress[] = filesArray.map((file) => ({
        file,
        progress: 0,
        status: "pending",
      }));
      setState((prev) => ({
        ...prev,
        data: {
          files: filesWithProgress,
          orphanFiles: prev.data.orphanFiles,
        },
      }));
      uploadFiles(filesWithProgress);
    }
  };

  const uploadFiles = (filesWithProgress: FileProgress[]) => {
    filesWithProgress.forEach((fileProgress) => {
      const formData = new FormData();
      formData.append("file", fileProgress.file);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/file", true);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setState((prev) => ({
            ...prev,
            data: {
              ...prev.data,
              files:
                prev.data.files?.map((fp) =>
                  fp.file === fileProgress.file ? { ...fp, progress: percentComplete, status: "uploading" } : fp
                ) ?? [],
            },
          }));
        }
      };

      xhr.onload = async () => {
        if (xhr.status === 200) {
          setState((prev) => ({
            ...prev,
            data: {
              ...prev.data,
              files:
                prev.data.files?.map((fp) =>
                  fp.file === fileProgress.file
                    ? { ...fp, status: "completed" }
                    : fp
                ) ?? [],
            },
          }));

          const orphanFiles = await GetOrphanFiles();
          console.log("🚀 ~ xhr.onload= ~ files:", orphanFiles);
          setState((prev) => ({
            ...prev,
            data: {
              ...prev.data,
              orphanFiles,
            },
          }));
        } else {
          setState((prev) => ({
            ...prev,
            data: {
              ...prev.data,
              files:
                prev.data.files?.map((fp) =>
                  fp.file === fileProgress.file
                    ? { ...fp, status: "failed" }
                    : fp
                ) ?? [],
            },
          }));
        }
      };

      xhr.onerror = () => {
        setState((prev) => ({
          ...prev,
          data: {
            ...prev.data,
            files:
              prev.data.files?.map((fp) =>
                fp.file === fileProgress.file ? { ...fp, status: "failed" } : fp
              ) ?? [],
          },
        }));
      };

      xhr.send(formData);
    });
  };

  return (
    <FileManagerContext.Provider value={state}>
      <Portal>
        <div className="overlay">
          <div className="file-explorer gradient-border">
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

              <form>
                <img src="/icons/pictures-folder.png" alt="" />
                <span>Insert files</span>
                <input type="file" multiple onChange={handleFileChange} />
              </form>
            </div>

            <div className="overlap">
              {state.data.orphanFiles &&
                state.data.orphanFiles.map((file, index) => (
                  <div style={{ margin: "0 0 16px" }} key={index}>
                    <p>ID: {file.id}</p>
                    <p>Extension: {file.ext}</p>
                    <p>Name: {file.name}</p>
                    <p>Src: {file.src}</p>
                    <p>Alt: {file.alt}</p>
                    <p>Caption: {file.caption}</p>
                    <p>Description: {file.description}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Portal>

      {props.children}
    </FileManagerContext.Provider>
  );
};
