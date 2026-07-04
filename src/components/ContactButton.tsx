import type { AnchorHTMLAttributes, ReactNode } from "react";
import Magnet from "./Magnet";

type ContactButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

export default function ContactButton({ children, className = "", ...props }: ContactButtonProps) {
  return (
    <Magnet className="magnet-inline" strength={5}>
      <a className={`contact-button ${className}`} {...props}>
        {children}
      </a>
    </Magnet>
  );
}
