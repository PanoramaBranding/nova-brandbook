import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";

export const metadata: Metadata = { title: "04 · Aplicaciones de marca" };

/**
 * Full section built from get_design_context on both breakpoints (desktop
 * 2045:602, mobile 2045:603) the same day 04 entered scope. Desktop and
 * mobile are two separate trees (not one responsive tree): several images
 * change relative proportion between breakpoints (e.g. the "Caja2" mockup
 * is a narrow fixed box on desktop but full-width on mobile; the
 * Portada/Doblepágina row keeps equal 561/561 columns on desktop but a much
 * narrower Portada column on mobile), so forcing one shared tree would mean
 * either wrong proportions or an unreadable pile of per-breakpoint overrides
 * on every image. The crop-inset percentages themselves (for the images
 * that use the "oversized image + negative inset" zoom pattern, e.g.
 * Portada2, Appmobile, Pantalla1, Billboard2/3/4) are IDENTICAL between
 * desktop and mobile in Figma's own code — only the containing box's size
 * differs — so those exact percentages are reused verbatim via CroppedImg.
 */

function CoverImg({
  src,
  alt,
  aspect,
  className = "",
}: {
  src: string;
  alt: string;
  aspect: number;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`} style={{ aspectRatio: aspect }}>
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );
}

// For the mockups Figma composed as an oversized image inside a clipped
// box (percentages taken as-is from get_design_context — they already
// encode the intended crop, not a placeholder guess).
function CroppedImg({
  src,
  alt,
  aspect,
  inset,
  className = "",
}: {
  src: string;
  alt: string;
  aspect: number;
  inset: { top: number; left: number; width: number; height: number };
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: aspect }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute max-w-none pointer-events-none"
        style={{
          top: `${inset.top}%`,
          left: `${inset.left}%`,
          width: `${inset.width}%`,
          height: `${inset.height}%`,
        }}
      />
    </div>
  );
}

const D = "/brand/design-system";

// Shared crop insets (identical desktop/mobile per Figma's own code).
const INSET = {
  portada2: { top: -0.01, left: -41.74, width: 183.58, height: 100.01 },
  appmobile1: { top: -50.67, left: -107.76, width: 262.74, height: 262.8 },
  appmobile2: { top: -22.33, left: -10.74, width: 121.48, height: 168.55 },
  pantalla1: { top: -27.83, left: -15.77, width: 131.54, height: 165.08 },
  billboard2: { top: -16.76, left: -20.27, width: 130.86, height: 133.61 },
  billboard4: { top: -10.42, left: -104.38, width: 290.06, height: 120.74 },
  billboard3: { top: -9.16, left: -11.84, width: 119.97, height: 118.33 },
};

function AplicacionesHeading() {
  return (
    <div className="border-t border-azul-1 pt-12">
      <h2 className="text-[28px] md:text-[32px] font-bold text-azul-2">4.1 Aplicaciones master brand</h2>
    </div>
  );
}

function DesktopGallery() {
  return (
    <div className="hidden md:flex flex-col gap-[34px] items-end w-full">
      <div className="flex flex-col gap-[34px] items-end w-full">
        <CoverImg src={`${D}/nova-caja-1.png`} alt="" aspect={2528 / 1680} className="w-full" />
        <CoverImg src={`${D}/caja2-1.png`} alt="" aspect={791 / 988} className="w-[791px]" />
      </div>

      <CoverImg src={`${D}/nova-caja-2.png`} alt="" aspect={1135 / 754} className="w-full" />

      <div className="flex gap-3 items-center w-full">
        <CroppedImg src={`${D}/portada2-1.png`} alt="" aspect={561 / 772} inset={INSET.portada2} className="w-[561px]" />
        <div className="flex flex-col gap-[14px] items-start w-[561px]">
          <CoverImg src={`${D}/doblepagina1-1.png`} alt="" aspect={4000 / 2700} className="w-full" />
          <CoverImg src={`${D}/doblepagina1-2.png`} alt="" aspect={4000 / 2700} className="w-full" />
        </div>
      </div>

      <div className="flex flex-col gap-[35px] items-start w-full">
        <CoverImg src={`${D}/newspaper-1.png`} alt="" aspect={791 / 1186} className="w-[791px]" />
        <CoverImg src={`${D}/redessociales2-1.png`} alt="" aspect={4096 / 1773} className="w-full" />
        <CoverImg src={`${D}/webpage-1.png`} alt="" aspect={4096 / 2731} className="w-full" />
        <CoverImg src={`${D}/webpage-2.png`} alt="" aspect={4096 / 2731} className="w-full" />

        <div className="flex gap-3 items-start w-full">
          <div className="flex flex-col gap-[15px] items-start w-[447px]">
            <CroppedImg src={`${D}/appmobile-1.png`} alt="" aspect={2000 / 2806} inset={INSET.appmobile1} className="w-full" />
            <CroppedImg src={`${D}/appmobile2-1.png`} alt="" aspect={447 / 483} inset={INSET.appmobile2} className="w-full" />
          </div>
          <CoverImg src={`${D}/iconapp-1.png`} alt="" aspect={676 / 846} className="w-[676px]" />
        </div>

        <CoverImg src={`${D}/redessociales-1.png`} alt="" aspect={4096 / 1935} className="w-full" />
        <CroppedImg src={`${D}/pantalla1-1.png`} alt="" aspect={1135 / 603} inset={INSET.pantalla1} className="w-full" />
        <CoverImg src={`${D}/billboard1-1.png`} alt="" aspect={2400 / 2400} className="w-full" />
        <CroppedImg src={`${D}/billboard2-1.png`} alt="" aspect={1113 / 726} inset={INSET.billboard2} className="w-full" />

        <div className="flex gap-3 items-start w-full">
          <CroppedImg src={`${D}/billboard4-1.png`} alt="" aspect={447 / 716} inset={INSET.billboard4} className="w-[447px]" />
          <CroppedImg src={`${D}/billboard3-1.png`} alt="" aspect={676 / 1028} inset={INSET.billboard3} className="w-[676px]" />
        </div>
      </div>
    </div>
  );
}

function MobileGallery() {
  return (
    <div className="md:hidden flex flex-col gap-6 items-end w-full">
      <div className="flex flex-col gap-6 items-end w-full">
        <CoverImg src={`${D}/nova-caja-1.png`} alt="" aspect={2528 / 1680} className="w-full" />
        <CoverImg src={`${D}/caja2-1.png`} alt="" aspect={3277 / 4096} className="w-full" />
      </div>

      <CoverImg src={`${D}/nova-caja-2.png`} alt="" aspect={2528 / 1680} className="w-full" />

      <div className="flex gap-3 w-full">
        <CroppedImg src={`${D}/portada2-1.png`} alt="" aspect={181 / 248} inset={INSET.portada2} className="w-[50.6%]" />
        <div className="flex flex-col justify-between flex-1">
          <CoverImg src={`${D}/doblepagina1-1.png`} alt="" aspect={4000 / 2700} className="w-full" />
          <CoverImg src={`${D}/doblepagina1-2.png`} alt="" aspect={4000 / 2700} className="w-full" />
        </div>
      </div>

      <div className="flex flex-col gap-6 items-start w-full">
        <CoverImg src={`${D}/newspaper-1.png`} alt="" aspect={2731 / 4096} className="w-full" />
        <CoverImg src={`${D}/redessociales2-1.png`} alt="" aspect={4096 / 1773} className="w-full" />
        <CoverImg src={`${D}/webpage-1.png`} alt="" aspect={4096 / 2731} className="w-full" />
        <CoverImg src={`${D}/webpage-2.png`} alt="" aspect={4096 / 2731} className="w-full" />

        <div className="flex flex-col gap-6 items-start w-full">
          <div className="flex gap-[15px] items-start w-full">
            <CroppedImg src={`${D}/appmobile-1.png`} alt="" aspect={2000 / 2806} inset={INSET.appmobile1} className="flex-1" />
            <CroppedImg src={`${D}/appmobile2-1.png`} alt="" aspect={193 / 209} inset={INSET.appmobile2} className="w-[53.9%]" />
          </div>
          <CoverImg src={`${D}/iconapp-1.png`} alt="" aspect={1464 / 1832} className="w-full" />
        </div>

        <CoverImg src={`${D}/redessociales-1.png`} alt="" aspect={4096 / 1935} className="w-full" />
        <CroppedImg src={`${D}/pantalla1-1.png`} alt="" aspect={1135 / 603} inset={INSET.pantalla1} className="w-full" />
        <CoverImg src={`${D}/billboard1-1.png`} alt="" aspect={2400 / 2400} className="w-full" />
        <CroppedImg src={`${D}/billboard2-1.png`} alt="" aspect={1113 / 726} inset={INSET.billboard2} className="w-full" />

        <div className="flex gap-3 items-start w-full">
          <CroppedImg src={`${D}/billboard4-1.png`} alt="" aspect={447 / 716} inset={INSET.billboard4} className="flex-1" />
          <CroppedImg src={`${D}/billboard3-1.png`} alt="" aspect={676 / 1028} inset={INSET.billboard3} className="self-stretch shrink-0" />
        </div>
      </div>
    </div>
  );
}

export default function AplicacionesPage() {
  return (
    <div className="flex flex-col">
      <PageHero
        image="/brand/heroes/hero-design-system.png"
        mobileImage="/brand/heroes/hero-design-system-mobile.png"
        number="04"
        titleLines="Aplicaciones master brand"
      />

      {/* pl-[220px] on desktop, matching the "frase" module site-wide.
          Figma's own Quote instance (node 528:1242) confirms pl-297, but
          Sofia asked to bring it to 220px everywhere (2026-09-11) —
          deliberate, don't revert without asking. max-w lives on the <p>
          — on the <section> it caps the section's own box (padding
          included), leaving far less room for the actual text and
          stopping the section short of the real content width; confirmed
          as why this page (and Submarca/Master Brand) looked wrong right
          after the pl-297 change while Estrategia didn't. */}
      <section className="px-4 md:px-[38px] py-16 md:py-[50px]">
        <p className="md:ml-auto md:max-w-[905px] text-[32px] md:text-[52px] leading-[1.3] md:leading-[60px] text-azul-1 font-bold">
          Las aplicaciones de la master brand muestran cómo NovaVenta se
          implementa en diferentes formatos y puntos de contacto, manteniendo
          una presencia visual consistente y reconocible.
          <br />
          <br />
          Esta sección reúne criterios de composición, jerarquía, uso de
          color, fotografía, tipografía y demás elementos del sistema para
          asegurar que cada pieza responda a las reglas definidas para la
          marca principal.
        </p>
      </section>

      {/* pl-67/pr-38, not symmetric px-38 — confirmed via get_design_context
          on node 2045:601/602 (Round 17): its own content frame sits offset
          67px from the sidebar and 38px from the right edge, same as every
          other page's body content. Combined with DesktopGallery's old
          `md:max-w-[1135px]` cap (removed below), the old symmetric padding
          left a growing, unwanted gap on the right at wider viewports
          instead of the gallery filling the real available width — that's
          what Sofia was seeing. */}
      <section id="aplicaciones-master-brand" className="px-6 md:pl-[67px] md:pr-[38px] pb-16 md:pb-24 scroll-mt-8">
        <div className="flex flex-col gap-8">
          <AplicacionesHeading />
          <DesktopGallery />
          <MobileGallery />
        </div>
      </section>

      <Footer />
    </div>
  );
}
