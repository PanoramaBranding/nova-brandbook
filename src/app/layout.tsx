import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Nav from "@/components/Nav";
import ScrollReveal from "@/components/ScrollReveal";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/brand-data";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Brand Book Guidelines 2026`,
    template: "%s — NovaVenta Brand Book",
  },
  description: SITE_DESCRIPTION,
};

// JSON-LD (schema.org) — parte de la capa "AI-readable" del brief original,
// junto con /llms.txt y /brand.json. `sameAs` queda vacío a propósito: no hay
// perfiles sociales de NovaVenta confirmados todavía, y esto no inventa uno.
const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/brand/footer-mark.svg`,
  description: SITE_DESCRIPTION,
};

const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${SITE_NAME} — Brand Book Guidelines 2026`,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: "es",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col md:flex-row bg-white text-[color:var(--color-ink)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }}
        />
        <Nav />
        <ScrollReveal />
        <main className="flex-1 min-w-0">{children}</main>
      </body>
    </html>
  );
}
