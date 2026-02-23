"use client";

import React from "react";
import Button from "../ui/Button";

export default function StepDone({
  title,
  text,
  onRestart,
}: {
  title: string;
  text: string;
  onRestart: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="text-2xl font-semibold">{title}</div>
      <p className="text-zinc-300 leading-relaxed">{text}</p>

      <Button variant="secondary" onClick={onRestart}>
        Neu starten
      </Button>
    </div>
  );
}