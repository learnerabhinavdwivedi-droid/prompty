"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Lenis Smooth Scroll — buttery scroll feel.
 * Wraps the entire app for silk-like scrolling.
 */
export default function SmoothScroll({ children }) {
  const pathname = usePathname();
  const lenisRef = useRef(null);

  useEffect(() => {
    let lenis;

    async function init() {
      const Lenis = (await import("lenis")).default;
      const container = document.getElementById("main-scroll-container");
      const content = document.getElementById("main-scroll-content");
      
      lenis = new Lenis({
        wrapper: container || window,
        content: content || document.body,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
      });

      lenisRef.current = lenis;

      function raf(time) {
        lenis?.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    init();

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  // Reset scroll to top on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return (
    <div id="main-scroll-content" className="w-full min-h-full flex flex-col">
      {children}
    </div>
  );
}

