import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  title: string;
}

export const Checkbox: React.FC<Props> = (props) => {
  const { name, title, ...rest } = props;
  return (
    <div className="checkbox">
      <label htmlFor={name}>{title}</label>
      <div>
        <input id={name} name={name} type="checkbox" {...rest} />
        <svg viewBox="0 0 17 18">
          <polyline
            fill="none"
            points="1 9 7 14 15 4"
            stroke="currentColor"
            strokeDasharray="22"
            strokeDashoffset="44"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            style={{ transition: "stroke-dashoffset 250ms linear 0.2s" }}
          />
        </svg>
      </div>
    </div>
  );
};
