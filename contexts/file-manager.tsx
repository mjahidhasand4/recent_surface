"use client";
import { ChangeEvent, createContext, ReactNode, useState } from "react";
import { Portal } from "@/components/share";
import { useQuery } from "@tanstack/react-query";
import { GetFolderById, GetRootFolder } from "@/lib/play";

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
  activeFolder: string | null;
}

const initialState: State = {
  isOpen: true,
  data: {
    files: null,
  },
  activeFolder: null,
};

const fetchFolder = async (folderId: string | null) => {
  try {
    if (folderId) {
      const folder = await GetFolderById(folderId);
      return folder ?? { subfolders: [], files: [] }; // Default empty object if folder not found
    } else {
      const rootFolder = await GetRootFolder();
      return rootFolder ?? { subfolders: [], files: [] }; // Default empty object if root folder not found
    }
  } catch (error) {
    console.error("Error fetching folder data:", error);
    return { subfolders: [], files: [] }; // Default empty object on error
  }
};

export const FileManagerContext = createContext<{ open: () => void }>({
  open: () => {},
});

export const FileManagerProvider: React.FC<Props> = (props) => {
  const [state, setState] = useState<State>(initialState);

  const { data: rootFolderData, isLoading: isRootFolderLoading } = useQuery({
    queryKey: ["folder", null],
    queryFn: () => fetchFolder(null),
  });

  const { data: subfolders, isLoading: isSubfoldersLoading } = useQuery({
    queryKey: ["folder", state.activeFolder],
    queryFn: () => fetchFolder(state.activeFolder),
    enabled: !!state.activeFolder,
  });
  console.log("🚀 ~ subfolders:", subfolders);

  const open = () => {
    setState((prev) => ({ ...prev, isOpen: true }));
  };

  const close = () => {
    setState((prev) => ({ ...prev, isOpen: false }));
  };

  const navigateToFolder = (folderId: string | null) => {
    setState((prev) => ({ ...prev, activeFolder: folderId }));
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

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
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
    <FileManagerContext.Provider value={{ open }}>
      <Portal>
        {state.isOpen && (
          <div className="overlay">
            <div className="file-explorer gradient-border">
              <div className="overlap sidebar">
                <div>
                  <nav>
                    <button onClick={() => navigateToFolder(null)}>
                      <img src="/icons/real-media-library.svg" alt="" />
                      <span>{isRootFolderLoading ? "Loading..." : "Hi"}</span>
                    </button>
                    {rootFolderData?.subfolders.map((folder) => (
                      <button
                        key={folder.id}
                        onClick={() => navigateToFolder(folder.id)}
                      >
                        <img src="/icons/real-media-library.svg" alt="" />
                        <span>
                          {isRootFolderLoading ? "Loading..." : folder.name}
                        </span>
                      </button>
                    ))}
                  </nav>
                </div>

                <form></form>
              </div>

              <div className="overlap explore">
                {isSubfoldersLoading ? (
                  <p>Loading subfolders...</p>
                ) : (
                  subfolders?.subfolders.map((folder) => (
                    <button
                      key={folder.id}
                      onClick={() => navigateToFolder(folder.id)}
                    >
                      <span>
                        {isRootFolderLoading ? "Loading..." : folder.name}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </Portal>

      {props.children}
    </FileManagerContext.Provider>
  );
};
