import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Roboto_Condensed } from "next/font/google";
import Nav from "@/components/Nav";
import ScrollReveal from "@/components/ScrollReveal";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/brand-data";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

// Tipografía complementaria del sistema (sección 3.5 de Brand Assets). Solo se
// usa en los especímenes y en el display promocional; el resto del sitio sigue
// en Plus Jakarta Sans. Fuente variable de Google Fonts (licencia OFL).
const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
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
    <html lang="es" className={`${plusJakartaSans.variable} ${robotoCondensed.variable} h-full antialiased`}>
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
        {/* OJO: no poner un max-w aquí. Se intentó md:max-w-[1240px] el
            2026-09-21 para forzar el ancho de contenido de Figma, y rompió el
            layout: también limita los heroes y la portada, que van a sangre
            completa. El ancho de contenido se controla por sección, no aquí. */}
        <main className="flex-1 min-w-0">{children}</main>
      </body>
    </html>
  );
}
