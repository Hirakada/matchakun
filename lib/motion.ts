import type { Easing } from "framer-motion";

export const easeOut: Easing = [0.22, 1, 0.36, 1];

export const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

export const transition = {
  duration: 0.6,
  ease: easeOut,
};

export const delayed = (delay = 0.2) => ({
  duration: 0.6,
  delay,
  ease: easeOut,
});