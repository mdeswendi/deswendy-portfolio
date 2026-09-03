"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { ArrowUpRight } from "@/components/ui/icons";
import type { Certificate } from "@/data/certificates";
import { fadeUp } from "@/lib/motion";

/** Renders inside a stagger parent, so it only declares `variants`. */
export default function CertificateCard({
  certificate,
}: {
  certificate: Certificate;
}) {
  const { name, issuer, date, credentialId, image, url } = certificate;

  const body = (
    <>
      {/* Badge artwork is square with transparency, so it is contained and
          padded rather than cropped — object-cover would cut the badge. */}
      <div className="relative aspect-square overflow-hidden border-b border-line bg-ink">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain p-8 transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-base leading-snug font-semibold tracking-tight text-cream transition-colors duration-300 group-hover:text-gold">
          {name}
        </h3>

        <p className="mt-2 text-sm text-muted">{issuer}</p>

        {(date || credentialId) && (
          <p className="mt-3 text-[0.6875rem] tracking-[0.15em] text-muted uppercase">
            {[date, credentialId && `ID ${credentialId}`]
              .filter(Boolean)
              .join(" · ")}
          </p>
        )}

        {url && (
          <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[0.6875rem] tracking-[0.2em] text-cream uppercase transition-colors duration-300 group-hover:text-gold">
            Verify
            <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        )}
      </div>
    </>
  );

  const shell =
    "group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink-soft transition-colors duration-500";

  return (
    <motion.article variants={fadeUp} className="h-full">
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noreferrer noopener"
          className={`${shell} hover:border-gold/50`}
        >
          {body}
        </a>
      ) : (
        <div className={shell}>{body}</div>
      )}
    </motion.article>
  );
}
