/** NovaVenta lockup from the Home hero (Figma node 528:1251 desktop, 529:1864
 * mobile) — reassembled from its exported path fragments, kept at their exact
 * relative insets so the mark stays crisp and responsive. The container's
 * aspect ratio genuinely differs per breakpoint in Figma (mobile crops
 * tighter around the mark), not just a naive collapse of the desktop ratio. */
export default function HeroMark() {
  return (
    <div className="relative w-full aspect-[388/118] md:aspect-[1440/415]" aria-hidden="true">
      <div className="absolute inset-[0_46.8%_4.1%_0]">
        <img src="/brand/home/hero-wordmark-1.svg" alt="" className="block size-full" />
      </div>
      <div className="absolute inset-[0_25.29%_30.62%_50.08%]">
        <img src="/brand/home/hero-wordmark-2.svg" alt="" className="block size-full" />
      </div>
      <div className="absolute inset-[0_49.92%_30.62%_28.95%]">
        <img src="/brand/home/hero-wordmark-3.svg" alt="" className="block size-full" />
      </div>
      <div className="absolute inset-[0_0_30.62%_74.71%]">
        <img src="/brand/home/hero-wordmark-4.svg" alt="" className="block size-full" />
      </div>
      <div className="absolute inset-[82.63%_21.43%_0.37%_73.39%]">
        <img src="/brand/home/hero-mark-1.svg" alt="" className="block size-full" />
      </div>
      <div className="absolute inset-[82.26%_16.32%_0_78.57%]">
        <img src="/brand/home/hero-mark-2.svg" alt="" className="block size-full" />
      </div>
      <div className="absolute inset-[82.26%_10.96%_0.37%_84.44%]">
        <img src="/brand/home/hero-mark-3.svg" alt="" className="block size-full" />
      </div>
      <div className="absolute inset-[78.76%_7.16%_0.18%_89.49%]">
        <img src="/brand/home/hero-mark-4.svg" alt="" className="block size-full" />
      </div>
      <div className="absolute inset-[82.25%_1.32%_0_93.23%]">
        <img src="/brand/home/hero-mark-5.svg" alt="" className="block size-full" />
      </div>
    </div>
  );
}
