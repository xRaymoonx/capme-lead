"use client";

import { useMemo, useState } from "react";

import WizardShell from "../../../components/wizard/WizardShell";
import StepIntro from "../../../components/wizard/StepIntro";
import StepBasics from "../../../components/wizard/StepBasics";
import StepBuilding from "../../../components/wizard/StepBuilding";
import StepEnergy from "../../../components/wizard/StepEnergy";
import StepMotivation from "../../../components/wizard/StepMotivation";
import StepBudget from "../../../components/wizard/StepBudget";
import StepReview from "../../../components/wizard/StepReview";
import StepDone from "../../../components/wizard/StepDone";

export type StepStatus = "idle" | "active" | "done" | "error";

export default function Wizard({ token }: { token: string }) {
  const [step, setStep] = useState(0);

  // merkt sich: wurde bei einem Step schon versucht weiterzugehen?
  const [attempted, setAttempted] = useState<Record<number, boolean>>({});

  const [basics, setBasics] = useState({
    name: "",
    phone: "",
    email: "",
    consent_privacy: false,
  });

  const [building, setBuilding] = useState({
    street: "",
    zip: "",
    city: "",
    building_type: "",
    owner: "",
    roof_type: "",
    roof_orientation: "",
    shading: "",
  });

  const [energy, setEnergy] = useState({
    consumption_kwh_year: "",
    costs_eur_year: "",
  });

  const [motivation, setMotivation] = useState({
    timeline: "",
    note: "",
    interests: {} as Record<string, boolean>,
  });

  const [budget, setBudget] = useState({
    budget_mode: "unknown" as "unknown" | "total" | "monthly",
    budget_value: "",
  });

  // --- VALIDATION (nur required; optional bleibt optional) ---
  const isBasicsValid = useMemo(() => {
    return (
      basics.name.trim().length > 0 &&
      basics.phone.trim().length > 0 &&
      basics.consent_privacy === true
    );
  }, [basics]);

  const isBuildingValid = useMemo(() => {
    return (
      building.building_type.trim().length > 0 &&
      building.owner.trim().length > 0 &&
      building.roof_type.trim().length > 0 &&
      building.roof_orientation.trim().length > 0 &&
      building.street.trim().length > 0 &&
      building.zip.trim().length > 0 &&
      building.city.trim().length > 0
    );
  }, [building]);

  // Energie/Wünsche/Budget kannst du später schärfer machen – erstmal neutral:
  const isEnergyValid = true;
  const isMotivationValid = true;
  const isBudgetValid = true;

  // Step 0..6 (Intro..Review). Step 7 = Done (nicht in Progress)
  const totalSteps = 7;

  const stepLabel =
    step === 0
      ? "Intro"
      : step === 1
        ? "Basis"
        : step === 2
          ? "Gebäude"
          : step === 3
            ? "Energie"
            : step === 4
              ? "Wünsche"
              : step === 5
                ? "Budget"
                : step === 6
                  ? "Review"
                  : "Fertig";

  const heroTitle =
    step <= 1
      ? "Kurz ein paar Infos zur besseren Planung"
      : step === 6
        ? "Zusammenfassung"
        : "PV-Nachbereitung";

  const heroSubtitle =
    step === 6
      ? "Bitte einmal in Ruhe durchlesen. Danach können Sie absenden."
      : "Ohne Druck, ohne Marketing. Einfach strukturiert.";

  const heroImage =
    step === 0
      ? "/images/modules.jpg"
      : step === 2
        ? "/images/roof.jpg"
        : step === 3
          ? "/images/inverter.jpg"
          : "/images/capme.jpg";

  function markAttempt(s: number) {
    setAttempted((a) => ({ ...a, [s]: true }));
  }

  function canProceedFrom(s: number) {
    if (s === 0) return true;
    if (s === 1) return isBasicsValid;
    if (s === 2) return isBuildingValid;
    if (s === 3) return isEnergyValid;
    if (s === 4) return isMotivationValid;
    if (s === 5) return isBudgetValid;
    if (s === 6) return true;
    return true;
  }

  function next() {
    // wenn beim aktuellen Step required fehlt -> nur markieren & NICHT weiter
    if (!canProceedFrom(step)) {
      markAttempt(step);
      return;
    }
    setStep((s) => Math.min(s + 1, 7));
  }

  function back() {
    setStep((s) => Math.max(0, s - 1));
  }

  function restart() {
    setBasics({ name: "", phone: "", email: "", consent_privacy: false });
    setBuilding({
      street: "",
      zip: "",
      city: "",
      building_type: "",
      owner: "",
      roof_type: "",
      roof_orientation: "",
      shading: "",
    });
    setEnergy({ consumption_kwh_year: "", costs_eur_year: "" });
    setMotivation({ timeline: "", note: "", interests: {} });
    setBudget({ budget_mode: "unknown", budget_value: "" });
    setAttempted({});
    setStep(0);
  }

  // Status für ProgressBar:
  const stepStatuses: StepStatus[] = useMemo(() => {
    const validMap = [
      true, // Intro
      isBasicsValid,
      isBuildingValid,
      isEnergyValid,
      isMotivationValid,
      isBudgetValid,
      true, // Review
    ];

    return Array.from({ length: totalSteps }, (_, i) => {
      const isActive = step === i;
      const isDone = step > i;
      const isValid = validMap[i];
      const wasAttempted = !!attempted[i];

      if (isActive) {
        // Rot nur wenn versucht & invalid
        if (wasAttempted && !isValid) return "error";
        return "active";
      }

      if (isDone) {
        return "done";
      }

      // Zukunft: neutral, solange nicht attempted
      if (wasAttempted && !isValid) return "error";
      return "idle";
    });
  }, [
    attempted,
    isBasicsValid,
    isBuildingValid,
    isEnergyValid,
    isMotivationValid,
    isBudgetValid,
    step,
    totalSteps,
  ]);

  function onJump(to: number) {
    // optional: Jump nur zu bereits erreichten Steps erlauben
    if (to < 0 || to >= totalSteps) return;
    setStep(to);
  }

  return (
    <WizardShell
      step={step}
      totalSteps={totalSteps}
      stepLabel={stepLabel}
      stepStatuses={stepStatuses}
      onJump={onJump}
    >
      {/* ✅ Hero-Block in children (WizardShell nimmt keine hero* Props) */}
      <div className="mb-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 md:p-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            <div className="md:col-span-7">
              <div className="text-xs text-zinc-400">
                CAPME • PV-Qualifizierung
              </div>
              <h1 className="mt-1 text-2xl font-semibold text-zinc-100">
                {heroTitle}
              </h1>
              <p className="mt-2 text-sm text-zinc-300">{heroSubtitle}</p>
            </div>

            <div className="md:col-span-5">
              <div className="rounded-2xl border border-white/10 bg-black/20 overflow-hidden">
                <img
                  src={heroImage}
                  alt={heroTitle}
                  className="w-full h-[180px] md:h-[200px] object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {step === 0 && <StepIntro token={token} onNext={next} />}

      {step === 1 && (
        <StepBasics
          data={basics}
          setData={(patch) => setBasics((b) => ({ ...b, ...patch }))}
          onNext={() => {
            if (!isBasicsValid) markAttempt(1);
            next();
          }}
          onBack={back}
        />
      )}

      {step === 2 && (
        <StepBuilding
          data={building}
          setData={(patch) => setBuilding((x) => ({ ...x, ...patch }))}
          onNext={() => {
            if (!isBuildingValid) markAttempt(2);
            next();
          }}
          onBack={back}
        />
      )}

      {step === 3 && (
        <StepEnergy
          data={energy}
          setData={(patch) => setEnergy((x) => ({ ...x, ...patch }))}
          onNext={next}
          onBack={back}
        />
      )}

      {step === 4 && (
        <StepMotivation
          data={motivation}
          setData={(patch) => setMotivation((x) => ({ ...x, ...patch }))}
          onNext={next}
          onBack={back}
        />
      )}

      {step === 5 && (
        <StepBudget
          data={budget}
          setData={(patch) => setBudget((x) => ({ ...x, ...patch }))}
          onNext={next}
          onBack={back}
        />
      )}

      {step === 6 && (
        <StepReview
          token={token}
          basics={basics}
          building={building}
          energy={energy}
          motivation={motivation}
          budget={budget}
          onBack={() => setStep(5)}
          onEdit={(s) => setStep(s)}
          onSubmit={() => setStep(7)}
        />
      )}

      {step === 7 && (
        <StepDone
          title="✅ Danke!"
          text="Wir haben Ihre Angaben erhalten. Sie können diese Seite jetzt schließen."
          onRestart={restart}
        />
      )}
    </WizardShell>
  );
}