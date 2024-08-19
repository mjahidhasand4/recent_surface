import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  onlyIcon?: boolean;
  icon: React.ReactNode;
}

export const Button: React.FC<Props> = (props) => {
  const { onlyIcon, icon, ...rest } = props;

  if (onlyIcon)
    return (
      <button className={`button${onlyIcon ? " onlyIcon" : undefined}`} {...rest}>
        {icon}
      </button>
    );

  return <button {...rest}></button>;
};