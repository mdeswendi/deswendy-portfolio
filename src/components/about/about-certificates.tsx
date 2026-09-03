"use client";

import { motion } from "framer-motion";

import CertificateCard from "@/components/about/certificate-card";
import type { Certificate } from "@/data/certificates";
import { fadeUp, stagger } from "@/lib/motion";

/**
 * Section wrapper + stagger parent for the certificate cards — same pattern as
 * projects-grid and journal-grid.
 */
export default function AboutCertificates({
  certificates,
}: {
  certificates: Certificate[];
}) {
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="mx-auto max-w-6xl border-t border-line px-6 py-24 lg:px-8 lg:py-32"
    >
      <motion.p
        variants={fadeUp}
        className="flex items-center gap-3 text-[0.6875rem] tracking-[0.2em] text-muted uppercase"
      >
        <span className="h-px w-6 bg-gold" />
        Certificates
      </motion.p>

      <motion.h2
        variants={fadeUp}
        className="mt-6 max-w-2xl font-display text-2xl font-semibold tracking-tight text-cream lg:text-3xl"
      >
        Learning, on the record
      </motion.h2>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((certificate) => (
          <CertificateCard key={certificate.id} certificate={certificate} />
        ))}
      </div>
    </motion.section>
  );
}
