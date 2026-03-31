"use client";

import { useEffect, useState } from "react";

export default function useScrollDirection() {
  const [direction, setDirection] = useState<"up" | "down">("down");

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const THRESHOLD = 10;

    const update = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY;

      if (Math.abs(delta) < THRESHOLD) {
        ticking = false;
        return;
      }

      if (delta > 0) {
        setDirection("down");
      } else {
        setDirection("up");
      }

      lastY = currentY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return direction;
}