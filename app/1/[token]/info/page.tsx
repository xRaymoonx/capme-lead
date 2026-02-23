"use client";

import React, { useMemo, useState } from "react";
import WizardShell from "../../../../components/wizard/WizardShell";
import Card from "../../../../components/ui/Card";
import Button from "../../../../components/ui/Button";

type InfoSection = {
  id: string;
  title: string;
  subtitle?: string;
  bullets: string[];
  note?: string;
  imageSrc?: string;
};

export default function InfoPage() {
  const [activeId, setActiveId] = useState("capme");

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
        note: "Unser Anspruch: sauber geplant, sicher umgesetzt – ohne unnötigen Druck.",
        imageSrc: "/images/capme.jpg",
      },
      {
        id: "why",
        title: "Warum CapMe?",
        bullets: [
          "Alles aus einer Hand: von der Idee bis zur fertigen Anlage",
          "Qualität & Sicherheit: geprüfte Markenprodukte, Umsetzung nach Norm",
          "Erfahrung & Fachwissen: Praxis im Elektro- und PV-Bereich",
          "Nachhaltig investieren: Energiekosten senken & Klimaschutz",
        ],
        note: "CapMe Elektrotechnik GmbH – Ihr Partner für die Energie der Zukunft.",
      },
      {
        id: "inverter",
        title: "Hybrid-Wechselrichter",
        subtitle:
          "Stabile Stromversorgung, auch bei Störungen – und zukunftssicher durch Updates.",
        bullets: [
          "Bis zu 10 kW Ausgangsleistung (je nach System)",
          "3-phasig: Unterstützung 3-phasiger Geräte im Notstrom (je nach Setup)",
          "Bypass-Schaltung: bei Störung Versorgung über Netzstrom stabil",
          "OTA Updates: Updates ohne Unterbrechung möglich",
          "SG Ready: kann überschüssigen Solarstrom intelligent verteilen (z. B. Wärmepumpe)",
        ],
        imageSrc: "/images/inverter.jpg",
      },
      {
        id: "safety",
        title: "Integriertes BMS-Modul",
        subtitle:
          "Gefahrenabschirmung & Schutzmechanismen – pro Batterie separat gedacht.",
        bullets: [
          "Eigenes BMS pro Batterie: Fehlfunktionen wirken sich nicht auf andere aus",
          "Automatische Schutzmaßnahmen (je nach System)",
          "Witterungsbeständig: Batterieheizung für Winterbetrieb (je nach System)",
          "IP65 Schutz (je nach Ausführung/Komponenten)",
        ],
        imageSrc: "/images/modules.jpg",
      },
      {
        id: "battery",
        title: "Batterie: flexibel starten & später erweitern",
        subtitle: "Start klein – Kapazität später ausbauen, wenn es passt.",
        bullets: [
          "Einstieg ab kleinem Setup möglich (je nach System)",
          "Integrierter DC-DC-Wandler (je nach System)",
          "Erweiterung später kompatibel & unkompliziert",
          "Skalierbar bis hohe kWh (je nach System)",
        ],
        note: "Was sinnvoll ist, hängt von Verbrauch, Dach, Budget und Ziel (Autarkie/Notstrom) ab.",
      },
    ],
    [],
  );

  const active = sections.find((s) => s.id === activeId) ?? sections[0];

  const stepStatuses = useMemo(
    () => ["active", "todo", "todo", "todo", "todo", "todo", "todo"] as const,
    [],
  );

  return (
    <WizardShell
      step={0}
      totalSteps={7}
      stepLabel="Infos"
      stepStatuses={stepStatuses as any}
    >
      <div className="space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs text-zinc-400">CAPME • Informationen</div>
            <h1 className="mt-1 text-2xl font-semibold text-zinc-100">
              Broschüre – kurz zusammengefasst
            </h1>
            <p className="mt-2 text-sm text-zinc-300">
              Optional zum Nachlesen – sachlich, übersichtlich, ohne Marketing.
            </p>
          </div>

          <Button variant="secondary" onClick={() => history.back()}>
            Zurück
          </Button>
        </div>

        <Card>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Sidebar */}
            <div className="md:col-span-4">
              <div className="space-y-2">
                {sections.map((s) => {
                  const isActive = s.id === activeId;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setActiveId(s.id)}
                      className={[
                        "w-full text-left rounded-xl border px-3 py-3 transition",
                        isActive
                          ? "border-emerald-500/30 bg-emerald-500/10"
                          : "border-white/10 bg-white/5 hover:bg-white/10",
                      ].join(" ")}
                    >
                      <div className="text-sm font-semibold text-zinc-100">
                        {s.title}
                      </div>
                      {s.subtitle && (
                        <div className="mt-1 text-xs text-zinc-400 line-clamp-2">
                          {s.subtitle}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content */}
            <div className="md:col-span-8">
              <div className="max-h-[60vh] overflow-y-auto pr-1">
                {active.imageSrc && (
                  <div className="mb-4">
                    <div className="rounded-2xl border border-white/10 bg-black/20 overflow-hidden">
                      <img
                        src={active.imageSrc}
                        alt={active.title}
                        className="w-full h-[260px] object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>
                )}

                <div className="text-xs text-zinc-400">Kapitel</div>
                <h2 className="mt-1 text-2xl font-semibold text-zinc-100">
                  {active.title}
                </h2>

                {active.subtitle && (
                  <p className="mt-2 text-sm text-zinc-300">{active.subtitle}</p>
                )}

                <ul className="mt-4 space-y-2 text-sm text-zinc-200">
                  {active.bullets.map((b, i) => (
                    <li key={i}>• {b}</li>
                  ))}
                </ul>

                {active.note && (
                  <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-300">
                    {active.note}
                  </div>
                )}

                <div className="mt-5 text-xs text-zinc-500">
                  Hinweis: Details (Modelle/Leistungswerte/Normen) hängen vom
                  konkreten System & der Planung ab.
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </WizardShell>
  );
}