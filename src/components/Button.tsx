import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "outline" | "filled";
  className?: string;
  onClick?: () => void;
};

/** Figma "Boton" component — two variants, exact spec from get_design_context. */
export default function Button({
  children,
  href,
  variant = "outline",
  className = "",
  onClick,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-10 py-4 text-base font-bold transition-colors";
  const styles =
    variant === "filled"
      ? "bg-azul-1 text-white hover:bg-azul-2"
      : "border-2 border-azul-1 text-azul-2 hover:bg-azul-tint";

  const classes = `${base} ${styles} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
