import Image from "next/image";
import type { CaseImage } from "@/content/cases/types";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";

type Props = {
  image: CaseImage;
  overlay?: CaseImage;
  locale: Locale;
  priority?: boolean;
  sizes?: string;
};

/** Main image with an optional second device overlapping its corner. */
export function CaseVisual({ image, overlay, locale, priority, sizes = "(max-width: 900px) 100vw, 1100px" }: Props) {
  const portrait = overlay ? isPortrait(overlay.aspect) : false;
  return (
    <div className={`cv ${overlay ? "cv--overlay" : ""} ${portrait ? "cv--portrait" : ""}`}>
      <div className="cv__main" style={{ aspectRatio: image.aspect }}>
        <Image src={image.src} alt={t(image.alt, locale)} fill sizes={sizes} priority={priority} />
      </div>
      {overlay && (
        <div className="cv__over" style={{ aspectRatio: overlay.aspect }}>
          <Image src={overlay.src} alt={t(overlay.alt, locale)} fill sizes="(max-width: 900px) 45vw, 420px" />
        </div>
      )}
    </div>
  );
}

function isPortrait(aspect: string) {
  const [w, h] = aspect.split("/").map((n) => parseFloat(n));
  return h > w;
}
