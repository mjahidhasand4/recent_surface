import React from "react";

interface Props {
  id: string;
  name: string;
  ext: string;
  src: string;
  alt: string;
  caption: string;
  description: string;
}

const iconMapping: Record<string, string> = {
  pdf: "/icons/pdf-icon.svg",
  doc: "/icons/word.svg",
  docx: "/icons/word.svg",
  xls: "/icons/excel-icon.svg",
  xlsx: "/icons/excel-icon.svg",
  zip: "/icons/zip-icon.svg",
  default: "/icons/get-started.svg",
};

export const UploadFile: React.FC<Props> = (props) => {
  const { id, name, ext, src, alt, caption, description } = props;

  // Select the icon based on the file extension, defaulting to a generic icon if not found
  const iconPath = iconMapping[ext] || iconMapping["default"];

  return (
    <div className="upload-file">
      <img src={iconPath} alt="File Icon" />
      <div>name: {name}</div>
      <div>alt: {alt}</div>
      <div>caption: {caption}</div>
      <div>description: {description}</div>
    </div>
  );
};