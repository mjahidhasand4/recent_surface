import NextLink from "next/link";
import { AnchorHTMLAttributes } from "react";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  onlyIcon?: boolean;
  icon?: React.ReactNode;
  text?: string;
  children?: React.ReactNode;
  color?: "primary";
}

export const Link: React.FC<Props> = (props) => {
  const { href, onlyIcon, icon, text, children, color, ...rest } = props;

  if ((icon || text) && children) {
    throw new Error(
      "You cannot use `icon` or `text` props together with `children` prop. Please choose either."
    );
  }

  if (onlyIcon)
    return (
      <NextLink
        href={href}
        className={`button${onlyIcon ? " onlyIcon" : undefined}`}
        {...rest}
      >
        {icon}
      </NextLink>
    );

  return (
    <NextLink href={href} className={`button ${color}`} {...rest}>
      {icon}
      {text}
      {children}
    </NextLink>
  );
};