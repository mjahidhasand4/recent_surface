"use client";
import { createContext, useState, ChangeEvent } from "react";
import { Portal, UploadProgress } from "@/components/share";

interface Props {
  children: React.ReactNode;
}

interface FileProgress {
  file: File;
  progress: number;
  status: "pending" | "uploading" | "completed" | "failed";
}

interface State {
  data: {
    files: FileProgress[] | null;
  };
}

const initialState: State = {
  data: {
    files: null,
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
      setState({ data: { files: filesWithProgress } });
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
          const percentComplete = Math.round(
            (event.loaded / event.total) * 100
          );
          setState((prevState: any) => {
            const updatedFiles =
              prevState.data.files?.map((fp: { file: File }) =>
                fp.file === fileProgress.file
                  ? { ...fp, progress: percentComplete, status: "uploading" }
                  : fp
              ) ?? []; // Ensure it defaults to an empty array if files is null
            return { data: { files: updatedFiles } };
          });
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          setState((prevState: any) => {
            const updatedFiles =
              prevState.data.files?.map((fp: { file: File }) =>
                fp.file === fileProgress.file
                  ? { ...fp, status: "completed" }
                  : fp
              ) ?? []; // Ensure it defaults to an empty array if files is null
            return { data: { files: updatedFiles } };
          });
        } else {
          setState((prevState: any) => {
            const updatedFiles =
              prevState.data.files?.map((fp: { file: File }) =>
                fp.file === fileProgress.file ? { ...fp, status: "failed" } : fp
              ) ?? []; // Ensure it defaults to an empty array if files is null
            return { data: { files: updatedFiles } };
          });
        }
      };

      xhr.onerror = () => {
        setState((prevState: any) => {
          const updatedFiles =
            prevState.data.files?.map((fp: { file: File }) =>
              fp.file === fileProgress.file ? { ...fp, status: "failed" } : fp
            ) ?? []; // Ensure it defaults to an empty array if files is null
          return { data: { files: updatedFiles } };
        });
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

              <div>
                <img src="/icons/pictures-folder.png" alt="" />
                <span>Insert files</span>
                <input type="file" multiple onChange={handleFileChange} />
              </div>
            </div>

            <div className="overlap">
              {state.data.files &&
                state.data.files.map((file) => (
                  <UploadProgress
                    name={file.file.name}
                    progress={file.progress}
                    status={file.status}
                  />
                ))}
            </div>
          </div>
        </div>
      </Portal>

      {props.children}
    </FileManagerContext.Provider>
  );
};
