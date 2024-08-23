// utils/fileManagerUtils.ts

interface FileProgress {
  file: File;
  progress: number;
  status: "pending" | "uploading" | "completed" | "failed";
}

export const onFileUpload = (
  filesWithProgress: FileProgress[],
  updateFileProgress: (targetFile: File, update: Partial<FileProgress>) => void
) => {
  filesWithProgress.forEach((fileProgress) => {
    const formData = new FormData();
    formData.append("file", fileProgress.file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/file", true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        updateFileProgress(fileProgress.file, {
          progress: percentComplete,
          status: "uploading",
        });
      }
    };

    xhr.onload = () => {
      const newStatus: FileProgress["status"] =
        xhr.status === 200 ? "completed" : "failed";
      updateFileProgress(fileProgress.file, { status: newStatus });
    };

    xhr.onerror = () => {
      updateFileProgress(fileProgress.file, { status: "failed" });
    };

    xhr.send(formData);
  });
};

export const createFileProgressList = (files: File[]): FileProgress[] => {
  return files.map(
    (file): FileProgress => ({
      file,
      progress: 0,
      status: "pending",
    })
  );
};
