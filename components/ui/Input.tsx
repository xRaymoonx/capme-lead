"use client";

import React from "react";

type Props = {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  type?: string;
};

export default function Input({
  label,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
}: Props) {
  return (
    <div className="space-y-1">
      {label ? <div className="text-sm text-zinc-300">{label}</div> : null}

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={[
          "w-full rounded-xl border bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none",
          error ? "border-red-500" : "border-zinc-800 focus:border-zinc-600",
        ].join(" ")}
      />

      {error ? <div className="text-sm text-red-300">{error}</div> : null}
    </div>
  );
}