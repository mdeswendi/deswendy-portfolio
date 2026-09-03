"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * `reducedMotion="user"` makes every framer-motion animation respect the
 * visitor's OS "reduce motion" setting. Children are passed through, so pages
 * rendered inside stay Server Components.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
