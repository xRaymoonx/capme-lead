"use client";

import React from "react";

type Props = {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: React.ReactNode; // 🔥 jetzt JSX erlaubt
};

export default function Checkbox({ checked, onChange, label }: Props) {
  return (
    <label className="flex items-start gap-3 text-sm text-zinc-200 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 accent-emerald-600"
      />
      {label && <span className="leading-relaxed">{label}</span>}
    </label>
  );
}