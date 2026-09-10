import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "outline" | "filled";
  className?: string;
  onClick?: () => void;
};

/**
 * Figma "Boton" component — "Predeterminado" (outline) is the resting
 * state, "Variante 2" (543:673: filled bg-azul-1, white text) is confirmed
 * as the button's hover state, not a generic light-tint hover. A small
 * scale added on top for a bit of life without overdoing it.
 */
export default function Button({
  children,
  href,
  variant = "outline",
  className = "",
  onClick,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-10 py-4 text-base font-bold transition-all duration-200 ease-out hover:scale-[1.03] active:scale-[0.98]";
  const styles =
    variant === "filled"
      ? "bg-azul-1 text-white hover:bg-azul-2"
      : "border-2 border-azul-1 text-azul-2 hover:bg-azul-1 hover:text-white";

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
