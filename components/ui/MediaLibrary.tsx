interface Props {
  className?: string;
}

export const MediaLibrary: React.FC<Props> = (props) => {
  const { className } = props;
  const _className = className ? `media-library ${className}` : "media-library";

  return <div className={_className}></div>;
};
