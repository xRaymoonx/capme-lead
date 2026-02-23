import React from "react";

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-black/40 shadow-[0_20px_70px_-45px_rgba(0,0,0,0.9)]">
      <div className="p-6 sm:p-8">{children}</div>
    </div>
  );
}