"use client";

import React from "react";

export default function BrochureHero({
  title,
  subtitle,
  imageSrc = "/images/capme.jpg",
}: {
  title: string;
  subtitle?: string;
  imageSrc?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/60">
      <div className="absolute inset-0">
        {/* Hintergrundbild */}
        <img
          src={imageSrc}
          alt=""
          className="h-full w-full object-cover opacity-35"
        />
        {/* dunkler Verlauf */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/65 to-black/80" />
      </div>

      <div className="relative p-6 sm:p-8">
        <div className="text-sm text-zinc-300">CAPME • PV-Nachbereitung</div>
        <div className="mt-2 text-2xl sm:text-3xl font-semibold">{title}</div>
        {subtitle ? (
          <div className="mt-3 max-w-xl text-zinc-200 leading-relaxed">
            {subtitle}
          </div>
        ) : null}
      </div>
    </div>
  );
}