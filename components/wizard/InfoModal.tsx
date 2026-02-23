"use client";

import React, { useEffect, useMemo, useState } from "react";
import Button from "../ui/Button";
import Card from "../ui/Card";

type InfoSection = {
  id: string;
  title: string;
  subtitle?: string;
  bullets: string[];
  note?: string;
  imageSrc?: string;
};

export default function InfoModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);

  // Body Scroll sperren
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const sections: InfoSection[] = useMemo(
    () => [
      {
        id: "capme",
        title: "Über CapMe Elektrotechnik GmbH",
        subtitle:
          "Qualität, Zuverlässigkeit und moderne Energielösungen – von Planung bis Inbetriebnahme & Wartung.",
        bullets: [
          "Erfahrenes Fachunternehmen für Photovoltaik, Elektrotechnik und Energiemanagement",
          "Maßgeschneiderte Konzepte: Planung → Installation → Inbetriebnahme → Wartung",
          "Fokus auf hochwertige Komponenten und transparente Beratung",
        ],
        note:
          "Unser Anspruch: sauber geplant, sicher umgesetzt – ohne unnötigen Druck.",
        imageSrc: "/images/capme.jpg",
      },
      {
        id: "inverter",
        title: "Hybrid-Wechselrichter",
        subtitle:
          "Stabile Stromversorgung, auch bei Störungen – und zukunftssicher durch Updates.",
        bullets: [
          "Bis zu 10 kW Ausgangsleistung (je nach System)",
          "3-phasig: Unterstützung 3-phasiger Geräte im Notstrom",
          "Bypass-Schaltung für stabile Netzversorgung",
          "OTA Updates ohne Unterbrechung",
          "SG Ready für intelligente Energieverteilung",
        ],
        imageSrc: "/images/inverter.jpg",
      },
      {
        id: "safety",
        title: "Integriertes BMS-Modul",
        subtitle:
          "Gefahrenabschirmung & Schutzmechanismen – pro Batterie separat gedacht.",
        bullets: [
          "Eigenes BMS pro Batterie",
          "Automatische Schutzmaßnahmen",
          "Witterungsbeständig mit Batterieheizung",
          "IP65 Schutz (je nach System)",
        ],
        imageSrc: "/images/modules.jpg",
      },
      {
        id: "battery",
        title: "Batterie – flexibel & erweiterbar",
        subtitle: "Start klein – später ausbauen, wenn es sinnvoll ist.",
        bullets: [
          "Einstieg mit kleinem Setup möglich",
          "Integrierter DC-DC-Wandler",
          "Kompatible Erweiterung",
          "Skalierbar auf hohe kWh",
        ],
        note:
          "Was sinnvoll ist, hängt von Verbrauch, Dach, Budget und Ziel ab.",
      },
    ],
    []
  );

  if (!open) return null;

  const active = sections[index];
  const total = sections.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Reader Container */}
      <div className="relative w-full max-w-3xl">
        <Card>
          <div className="flex h-[85vh] flex-col overflow-hidden rounded-3xl">

            {/* Header */}
            <div className="border-b border-white/10 px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-zinc-400">
                    Kapitel {index + 1} von {total}
                  </div>
                  <h2 className="mt-2 text-2xl font-semibold text-zinc-100">
                    {active.title}
                  </h2>
                </div>

                <Button variant="secondary" onClick={onClose}>
                  Schließen
                </Button>
              </div>
            </div>

            {/* Scroll Content */}
            <div className="flex-1 overflow-y-auto px-8 py-8">

              {/* Bild */}
              {active.imageSrc && (
                <div className="mb-8">
                  <img
                    src={active.imageSrc}
                    alt={active.title}
                    className="w-full rounded-2xl object-contain"
                  />
                </div>
              )}

              {active.subtitle && (
                <p className="mb-6 text-lg text-zinc-300 leading-relaxed">
                  {active.subtitle}
                </p>
              )}

              <ul className="space-y-4 text-zinc-200 leading-relaxed">
                {active.bullets.map((b, i) => (
                  <li key={i}>• {b}</li>
                ))}
              </ul>

              {active.note && (
                <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 text-zinc-300">
                  {active.note}
                </div>
              )}
            </div>

            {/* Footer Navigation */}
            <div className="border-t border-white/10 px-8 py-5">
              <div className="flex items-center justify-between">
                <Button
                  variant="secondary"
                  disabled={index === 0}
                  onClick={() => setIndex((i) => i - 1)}
                >
                  Zurück
                </Button>

                {index < total - 1 ? (
                  <Button onClick={() => setIndex((i) => i + 1)}>
                    Weiter
                  </Button>
                ) : (
                  <Button onClick={onClose}>
                    Zurück zum Formular
                  </Button>
                )}
              </div>
            </div>

          </div>
        </Card>
      </div>
    </div>
  );
}