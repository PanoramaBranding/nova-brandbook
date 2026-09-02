import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Nav from "@/components/Nav";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "NovaVenta — Brand Book Guidelines 2026",
    template: "%s — NovaVenta Brand Book",
  },
  description:
    "Manual de marca de NovaVenta: estrategia, master brand y assets. Un manual de marca vivo, construido en HTML semántico y datos estructurados para que personas y modelos de IA lo lean con la misma claridad.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full flex bg-white text-[color:var(--color-ink)]">
        <Nav />
        <main className="flex-1 min-w-0">{children}</main>
      </body>
    </html>
  );
}
