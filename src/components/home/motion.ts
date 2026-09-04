import type { Variants } from "framer-motion";

import { easeOut } from "@/lib/motion";

/**
 * Home-scoped reveal variants. Same vocabulary as `lib/motion.ts` (opacity +
 * a short rise) but a touch quicker and tighter, so the redesigned home page
 * reads snappier without changing the rhythm of every other page.
 *
 * `MotionConfig reducedMotion="user"` (set in the root layout) still applies,
 * so these collapse to a plain fade when the visitor asks for reduced motion.
 */
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

/** Parent wrapper — children inherit hidden/visible and play in sequence. */
export const revealStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/** Shared `whileInView` viewport config for the home sections. */
export const revealView = { once: true, amount: 0.15 } as const;
