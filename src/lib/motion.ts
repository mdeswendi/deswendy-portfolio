import type { Variants } from "framer-motion";

/**
 * Shared easing + variants so every section reveals with the same rhythm.
 * `as const` keeps the tuple readonly, which is what framer-motion's
 * BezierDefinition expects.
 */
export const easeOut = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, ease: easeOut } },
};

/** Parent wrapper: children inherit `hidden`/`visible` and play in sequence. */
export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

/** Reveal-on-scroll defaults for `whileInView`. */
export const viewportOnce = { once: true, amount: 0.3 } as const;
