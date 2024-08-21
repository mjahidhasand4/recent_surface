interface Props {
  name: string;
  progress: number;
  status: "pending" | "uploading" | "completed" | "failed";
}

export const UploadProgress: React.FC<Props> = (props) => {
  const { name, progress, status } = props;

  return (
    <div className="upload-progress">
      {name} - {progress} - {status}
    </div>
  );
};
