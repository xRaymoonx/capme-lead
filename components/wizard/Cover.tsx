"use client";

import React from "react";

export default function Cover({
  title,
  subtitle,
  imageSrc = "/images/modules.jpg",
}: {
  title: string;
  subtitle: string;
  imageSrc?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-black/40 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]">
      <div className="absolute inset-0">
        <img
          src={imageSrc}
          alt=""
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
      </div>

      <div className="relative p-7 sm:p-10">
        <div className="text-xs tracking-wide text-zinc-300/80">
          CAPME • Energieberatung
        </div>
        <h1 className="mt-2 text-3xl sm:text-4xl font-semibold text-white">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-200/90 leading-relaxed">
          {subtitle}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
            kein Marketing
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
            3–5 Minuten
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
            strukturierte Planung
          </span>
        </div>
      </div>
    </div>
  );
}