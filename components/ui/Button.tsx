"use client";

import React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
  variant?: "primary" | "secondary";
};

export default function Button({
  children,
  onClick,
  disabled,
  type = "button",
  className = "",
  variant = "primary",
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  const styles =
    variant === "primary"
      ? "bg-emerald-600 text-white hover:bg-emerald-500"
      : "border border-zinc-800 bg-transparent text-zinc-100 hover:bg-zinc-900";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[base, styles, className].join(" ")}
    >
      {children}
    </button>
  );
}