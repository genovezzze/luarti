"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap, reducedMotion, ScrollTrigger } from "@/lib/textMotion";

/** Lenis smooth scrolling (same settings as atoms.technology: lerp 0.1), synced with GSAP. */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (reducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: { offset: -80 } });
    lenisRef.current = lenis;
    // Let components scroll smoothly to a position (e.g. step buttons)
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Page changed: jump to top and re-measure
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (!window.location.hash) lenis.scrollTo(0, { immediate: true });
    lenis.resize();
  }, [pathname]);

  return null;
}
