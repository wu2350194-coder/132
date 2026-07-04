import type { AnchorHTMLAttributes, ReactNode } from "react";
import Magnet from "./Magnet";

type OutlineButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  dark?: boolean;
};

export default function OutlineButton({
  children,
  className = "",
  dark = false,
  ...props
}: OutlineButtonProps) {
  return (
    <Magnet className="magnet-inline" strength={5}>
      <a className={`outline-button ${dark ? "outline-button-dark" : ""} ${className}`} {...props}>
        {children}
      </a>
    </Magnet>
  );
}
