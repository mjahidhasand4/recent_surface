import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  title: string;
}

export const Input: React.FC<Props> = (props) => {
  const { name, title, ...rest } = props;

  return (
    <div className="input regular">
      <label htmlFor={name}>{title}</label>
      <input id={name} name={name} {...rest} />
    </div>
  );
};