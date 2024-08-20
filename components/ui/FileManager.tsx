interface Props {
  className?: string;
}

export const FileManager: React.FC<Props> = (props) => {
  const { className } = props;
  const _className = className ? `file-manager ${className}` : "file-manager";

  return <div className={_className}>
    
  </div>;
};
