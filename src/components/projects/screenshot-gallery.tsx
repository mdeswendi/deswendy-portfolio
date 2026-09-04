"use client";

import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";

type Shot = { src: string; caption: string };

/**
 * Detail-page screenshot set: each shot in its own framed figure with a
 * caption — separate images, never a collage. Matches the site's card
 * styling (rounded-2xl, hairline border, uppercase micro-caption).
 */
export default function ScreenshotGallery({
  title,
  shots,
}: {
  title: string;
  shots: readonly Shot[];
}) {
  return (
    <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:gap-8">
      {shots.map((shot, index) => (
        <Reveal key={shot.src} delay={index * 0.08}>
          <figure className="overflow-hidden rounded-2xl border border-line bg-ink-soft">
            <div className="relative aspect-[16/10]">
              <Image
                src={shot.src}
                alt={`${title} — ${shot.caption}`}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="border-t border-line px-6 py-3.5 text-[0.625rem] tracking-[0.2em] text-muted uppercase">
              {shot.caption}
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
