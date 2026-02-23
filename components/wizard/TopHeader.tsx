"use client";

import React from "react";
import Image from "next/image";

export default function TopHeader() {
  return (
    <div className="sticky top-0 z-30 border-b border-white/5 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        {/* Left: Logo + Text */}
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="CAPME Logo"
            width={140}
            height={40}
            className="h-9 w-auto object-contain"
            priority
          />

          <div className="leading-tight">
            <div className="text-sm font-semibold text-zinc-100">
              
            </div>
            <div className="text-xs text-zinc-400">
              
            </div>
          </div>
        </div>

        {/* Right: Trust Badge */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
            ruhig • sachlich • klar
          </span>
        </div>
      </div>
    </div>
  );
}