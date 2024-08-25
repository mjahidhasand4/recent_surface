"use client";
import { ChangeEvent, createContext, ReactNode, useState } from "react";
import { ArrowRightIcon, DismissIcon } from "@/components/icons";
import { Portal } from "@/components/share";

interface Props {
  children: ReactNode;
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
}

const initialState: State = {
  isOpen: true,
  data: {
    files: null,
  },
};

const demoImages = [
  "https://images.unsplash.com/photo-1642447995041-436bb59b71f0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1723845626792-2fe4a79c7239?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1660474128741-b9bc5f7b2370?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1662913307002-ad2d32923913?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1565965018721-340ac71b14cc?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1670003942359-3c64df385673?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1477088139840-0f0a9cb47cce?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1661953124438-3959644bbcb4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export const FileManagerContext = createContext<{
  state: State;
  open: () => void;
  close: () => void;
}>({
  state: initialState,
  open: () => {},
  close: () => {},
});

export const FileManagerProvider: React.FC<Props> = (props) => {
  const [state, setState] = useState<State>(initialState);

  const open = () => {
    setState((prev) => ({ ...prev, isOpen: true }));
  };

  const close = () => {
    setState((prev) => ({ ...prev, isOpen: false }));
  };

  const updateFileProgress = (
    file: File,
    progress: number,
    status: "pending" | "uploading" | "completed" | "failed"
  ) => {
    setState((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        files:
          prev.data.files?.map((fp) =>
            fp.file === file ? { ...fp, progress, status } : fp
          ) ?? [],
      },
    }));
  };

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
          const percentComplete = Math.round(
            (event.loaded / event.total) * 100
          );
          updateFileProgress(fileProgress.file, percentComplete, "uploading");
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          updateFileProgress(fileProgress.file, 100, "completed");
        } else {
          updateFileProgress(fileProgress.file, 0, "failed");
        }
      };

      xhr.onerror = () => {
        updateFileProgress(fileProgress.file, 0, "failed");
      };

      xhr.send(formData);
    });
  };

  return (
    <FileManagerContext.Provider value={{ state, open, close }}>
      <Portal>
        {state.isOpen && (
          <div className="overlay">
            <div className="file-explorer gradient-border">
              <div className="overlap">
                <div className="scrollbar">
                  <div>
                    <h4>
                      <img src="/icons/real-media-library.svg" alt="" />
                      <span>File Explorer</span>
                    </h4>
                    <nav></nav>
                  </div>
                </div>

                <form>
                  <img src="/icons/pictures-folder.png" alt="" />
                  <span>Insert files</span>
                  <input type="file" multiple onChange={handleFileChange} />
                </form>
              </div>

              <div className="overlap">
                <div>
                  <div>
                    <img src="/icons/real-media-library.svg" alt="" />
                    <h3>File Explorer</h3>
                  </div>
                  <button onClick={close}>
                    <DismissIcon />
                  </button>
                </div>

                <div className="scrollbar">
                  <div className="scrollbar">
                    <div>
                      <div>
                        <h4>Anonymous</h4>
                        <button>
                          <span>More</span>
                          <ArrowRightIcon />
                        </button>
                      </div>

                      <div>
                        {demoImages.map((src) => (
                          <button key={src}>
                            <img src={src} alt="" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>{/* More */}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Portal>

      {props.children}
    </FileManagerContext.Provider>
  );
};
