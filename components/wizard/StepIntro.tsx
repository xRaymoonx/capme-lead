"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";

export default function StepIntro({
  token,
  onNext,
}: {
  token: string;
  onNext: () => void;
}) {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-zinc-100">
          Kurz ein paar Infos zur besseren Planung
        </h1>
        <p className="mt-3 text-zinc-300">
          Diese Seite dient der Nachbereitung nach unserem Gespräch – ohne Druck,
          ohne Marketing. Einfach strukturiert, damit wir sauber planen können.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-200">
        Dauer: ca. 3–5 Minuten.
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={onNext}>Starten</Button>

        <Button
          variant="secondary"
          onClick={() => router.push(`/1/${token}/info`)}
        >
          Infos (optional)
        </Button>
      </div>

      <div className="text-xs text-zinc-500">
        Hinweis: Die Infos sind optional – für alle, die nach dem Gespräch noch
        etwas nachlesen möchten.
      </div>
    </div>
  );
}