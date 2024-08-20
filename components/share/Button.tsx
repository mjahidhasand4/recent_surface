"use client";
import { useFormStatus } from "react-dom";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  button?: "button" | "submit";
  onlyIcon?: boolean;
  icon?: React.ReactNode;
  text?: string;
  children?: React.ReactNode;
  color?: "primary";
}

export const Button: React.FC<Props> = (props) => {
  const { onlyIcon, icon, text, button, children, color, ...rest } = props;

  if ((icon || text) && children) {
    throw new Error(
      "You cannot use `icon` or `text` props together with `children` prop. Please choose either."
    );
  }

  if (onlyIcon)
    return (
      <button
        className={`button${onlyIcon ? " onlyIcon" : undefined}`}
        {...rest}
      >
        {icon}
      </button>
    );

  if (button === "submit") {
    const status = useFormStatus();

    return (
      <button className={`button ${color}`} {...rest}>
        {status.pending && <span>Loading...</span>}
        {icon}
        {text}
        {children}
      </button>
    );
  }

  return (
    <button className={`button ${color}`} {...rest}>
      {icon}
      {text}
      {children}
    </button>
  );
};
