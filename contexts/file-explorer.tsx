"use client";
import {
  ArrowRightIcon,
  DeleteIcon,
  DismissIcon,
  FolderAddIcon,
} from "@/components/icons";
import { Folder, Portal } from "@/components/share";
import {
  DeleteFolderById,
  GetFolderById,
  GetPinnedFolder,
  GetRootFolder,
} from "@/lib/play";
import { useQuery } from "@tanstack/react-query";
import {
  ChangeEvent,
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react";

interface Props {
  children: ReactNode;
}

interface OpenBox {
  folder: boolean;
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
  select: {
    pinnedFolder: string;
    subfolder: string;
  };
  activeFolder: string | null;
  openBox: OpenBox;
}

const initialState: State = {
  isOpen: true,
  data: {
    files: null,
  },
  select: {
    subfolder: "",
    pinnedFolder: "",
  },
  activeFolder: null,
  openBox: {
    folder: false,
  },
};

// Queue for managing folder navigation
const folderQueue: (string | null)[] = [];

// Fetch Functions
const fetchRootFolder = async () => {
  try {
    const rootFolder = await GetRootFolder();
    return rootFolder ?? { subfolders: [], files: [] };
  } catch (error) {
    console.error("Error fetching root folder data:", error);
    return { subfolders: [], files: [] };
  }
};

const fetchFolderById = async (folderId: string) => {
  try {
    const folder = await GetFolderById(folderId);
    return folder ?? { subfolders: [], files: [] };
  } catch (error) {
    console.error("Error fetching folder data:", error);
    return { subfolders: [], files: [] };
  }
};

const fetchPinnedFolder = async () => {
  try {
    const pinnedFolders = await GetPinnedFolder();
    return pinnedFolders;
  } catch (error) {
    console.error("Error fetching pinned folders:", error);
    return null;
  }
};

// Context
export const FileManagerContext = createContext<{ open: () => void }>({
  open: () => {},
});

// Provider Component
export const FileManagerProvider: React.FC<Props> = ({ children }) => {
  const [state, setState] = useState<State>(initialState);

  // Queries
  const { data: rootFolderData, isLoading: isRootFolderLoading } = useQuery({
    queryKey: ["folder", "root"],
    queryFn: fetchRootFolder,
  });

  const { data: subfoldersData, isLoading: isSubfoldersLoading } = useQuery({
    queryKey: ["folder", state.activeFolder],
    queryFn: () => fetchFolderById(state.activeFolder!),
    enabled: !!state.activeFolder,
  });

  const { data: pinnedFolders, isLoading: isPinnedFolderLoading } = useQuery({
    queryKey: ["pinned-folder"],
    queryFn: fetchPinnedFolder,
  });

  useEffect(() => {
    if (rootFolderData && "id" in rootFolderData && !state.activeFolder) {
      setState((prev) => ({
        ...prev,
        activeFolder: rootFolderData.id,
      }));
    }
  }, [rootFolderData, state.activeFolder]);

  // Actions
  const openFileExplorer = () =>
    setState((prev) => ({ ...prev, isOpen: true }));
  const close = () => setState((prev) => ({ ...prev, isOpen: false }));

  const openBox = (box: keyof OpenBox) => {
    setState((prev) => ({
      ...prev,
      openBox: { ...prev.openBox, [box]: true },
    }));
  };

  const closeBox = (box: keyof OpenBox) => {
    setState((prev) => ({
      ...prev,
      openBox: { ...prev.openBox, [box]: false },
    }));
  };

  const resetState = () => {
    setState({
      ...initialState,
      isOpen: true, // Keep the file explorer open
    });
  };

  const navigateToFolder = (folderId: string | null) => {
    if (state.activeFolder !== null) {
      // Enqueue the current folder before navigating to the new one
      folderQueue.push(state.activeFolder);
    }
    setState((prev) => ({ ...prev, activeFolder: folderId }));
  };

  const navigateBack = () => {
    if (folderQueue.length > 0) {
      const previousFolder = folderQueue.pop() || null;
      setState((prev) => ({ ...prev, activeFolder: previousFolder }));
    }
  };

  const selectFolder = (type: "subfolder" | "pinnedFolder", id: string) => {
    setState((prev) => ({
      ...prev,
      select: {
        ...prev.select,
        [type]: id,
      },
    }));
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
    <FileManagerContext.Provider value={{ open: openFileExplorer }}>
      <Portal>
        {state.isOpen && (
          <div className="overlay">
            <div className="file-explorer gradient-border">
              <div className="overlap sidebar">
                <div>
                  <nav onClick={resetState}>
                    <button>
                      <img src="/icons/quick-mode.png" alt="" />
                      <span>Quick Access</span>
                    </button>

                    {pinnedFolders?.length === 0 ? (
                      <>
                        <span>Pin</span>
                        <span>
                          Don’t waste time searching—pin your top folders
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                  </nav>

                  <nav>
                    <button onClick={() => navigateToFolder(null)}>
                      <img src="/icons/real-media-library.svg" alt="" />
                      <span>
                        {isRootFolderLoading
                          ? "Loading..."
                          : rootFolderData && "name" in rootFolderData
                          ? rootFolderData.name
                          : "File Explorer"}
                      </span>
                    </button>
                    {rootFolderData &&
                      "subfolders" in rootFolderData &&
                      rootFolderData.subfolders.map((folder) => (
                        <button
                          key={folder.id}
                          onClick={() => navigateToFolder(folder.id)}
                        >
                          <img src="/icons/file-explorer.png" alt="" />
                          <span>{folder.name}</span>
                        </button>
                      ))}
                  </nav>
                </div>

                <form></form>
              </div>

              <div className="overlap explore">
                <div>
                  <div>
                    <button onClick={navigateBack}>
                      <ArrowRightIcon />
                    </button>
                    <button onClick={() => openBox("folder")}>
                      <FolderAddIcon />
                    </button>
                    <button
                      onClick={async () => {
                        await DeleteFolderById(state.select.subfolder);
                      }}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                  <button onClick={close}>
                    <DismissIcon />
                  </button>
                </div>

                {isSubfoldersLoading ? (
                  <p>Loading subfolders...</p>
                ) : state.activeFolder ? (
                  <div>
                    {subfoldersData?.subfolders.map((folder) => (
                      <button
                        key={folder.id}
                        onClick={() => selectFolder("subfolder", folder.id)}
                        onDoubleClick={() => navigateToFolder(folder.id)}
                      >
                        <span>{folder.name}</span>
                      </button>
                    ))}
                  </div>
                ) : isPinnedFolderLoading ? (
                  "Loading..."
                ) : (
                  pinnedFolders?.map((folder) => (
                    <button
                      key={folder.id}
                      onClick={() => selectFolder("pinnedFolder", folder.id)}
                      onDoubleClick={() => navigateToFolder(folder.id)}
                    >
                      {folder.name}
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </Portal>

      {state.openBox.folder && (
        <Folder
          parentId={state.activeFolder}
          closeBox={() => closeBox("folder")}
        />
      )}

      {children}
    </FileManagerContext.Provider>
  );
};
