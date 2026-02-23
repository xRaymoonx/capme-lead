export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-3xl px-6 py-16 space-y-10">
        <header className="space-y-2">
          <div className="text-xs text-zinc-400">CAPME • Datenschutz</div>
          <h1 className="text-3xl font-semibold">Datenschutzhinweise</h1>
          <p className="text-zinc-300">
            Diese Hinweise erklären, welche personenbezogenen Daten wir im Rahmen der PV-Nachbereitung
            verarbeiten und zu welchem Zweck.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">1. Verantwortlicher</h2>
          <p className="text-zinc-300">
            <span className="font-medium text-zinc-100">CapMe Elektrotechnik GmbH</span>
            <br />
            [Straße Hausnummer], [PLZ Ort]
            <br />
            Telefon: [Telefon] • E-Mail: [E-Mail]
            <br />
            Vertreten durch: [Geschäftsführer]
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">2. Zweck der Verarbeitung</h2>
          <ul className="list-disc pl-6 space-y-2 text-zinc-300">
            <li>Bearbeitung Ihrer Anfrage und Kontaktaufnahme (Telefon/E-Mail)</li>
            <li>Planung und Vorbereitung einer PV-/Energie-Lösung (Vorprüfung, Beratung, Angebot)</li>
            <li>Dokumentation des Vorgangs (Nachbereitung nach dem Gespräch)</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">3. Welche Daten werden verarbeitet?</h2>
          <ul className="list-disc pl-6 space-y-2 text-zinc-300">
            <li>Stammdaten: Name</li>
            <li>Kontaktdaten: Telefonnummer, E-Mail (optional)</li>
            <li>Objekt-/Planungsdaten: Adresse, Gebäudetyp, Dachtyp, Ausrichtung, Verschattung, Verbrauch/Angaben aus dem Formular</li>
            <li>Freitextangaben/Notizen (falls angegeben)</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">4. Rechtsgrundlagen</h2>
          <ul className="list-disc pl-6 space-y-2 text-zinc-300">
            <li>
              <span className="font-medium text-zinc-100">Art. 6 Abs. 1 lit. b DSGVO</span> (vorvertragliche Maßnahmen / Anfragebearbeitung)
            </li>
            <li>
              <span className="font-medium text-zinc-100">Art. 6 Abs. 1 lit. f DSGVO</span> (berechtigtes Interesse an effizienter Bearbeitung und Dokumentation)
            </li>
            <li>
              <span className="font-medium text-zinc-100">Art. 6 Abs. 1 lit. a DSGVO</span> (Einwilligung, falls erforderlich – z. B. für bestimmte Kontaktwege/Optionen)
            </li>
          </ul>
          <p className="text-zinc-400 text-sm">
            Hinweis: Je nach konkretem Prozess kann die Einwilligung nicht immer die Hauptgrundlage sein –
            oft ist es “vorvertraglich”. Trotzdem ist Transparenz hier Pflicht.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">5. Empfänger / Dienstleister</h2>
          <p className="text-zinc-300">
            Zur technischen Bereitstellung und Speicherung können wir Dienstleister einsetzen (Auftragsverarbeiter).
            Dazu gehören Hosting- und Datenbank-Anbieter.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-zinc-300">
            <li>Hosting/Plattform: [z. B. Vercel] (Website/App-Bereitstellung)</li>
            <li>Datenbank/Backend: [z. B. Supabase] (Speicherung und Verarbeitung der Formulardaten)</li>
          </ul>
          <p className="text-zinc-400 text-sm">
            Mit eingesetzten Auftragsverarbeitern wird ein Vertrag zur Auftragsverarbeitung (AVV) abgeschlossen.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">6. Speicherdauer</h2>
          <p className="text-zinc-300">
            Wir speichern Daten nur so lange, wie es für die Bearbeitung Ihrer Anfrage und die Planung erforderlich ist.
            Darüber hinaus können gesetzliche Aufbewahrungspflichten gelten (z. B. für geschäftliche Kommunikation/Angebote).
          </p>
          <p className="text-zinc-400 text-sm">
            Richtwert: Anfrage-/Planungsdaten werden regelmäßig geprüft und gelöscht, wenn sie nicht mehr benötigt werden.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">7. Ihre Rechte</h2>
          <ul className="list-disc pl-6 space-y-2 text-zinc-300">
            <li>Auskunft (Art. 15 DSGVO)</li>
            <li>Berichtigung (Art. 16 DSGVO)</li>
            <li>Löschung (Art. 17 DSGVO)</li>
            <li>Einschränkung (Art. 18 DSGVO)</li>
            <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Widerspruch (Art. 21 DSGVO)</li>
            <li>Beschwerde bei einer Aufsichtsbehörde</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">8. Kontakt Datenschutz</h2>
          <p className="text-zinc-300">
            Für Datenschutzanfragen: <span className="text-zinc-100 font-medium">[r.merola@capme.de]</span>
            <br />
            Alternativ an die oben genannte Kontaktadresse.
          </p>
        </section>

        <footer className="pt-8 border-t border-white/10 text-sm text-zinc-500">
          Stand: [17.02.2026]
        </footer>
      </div>
    </div>
  );
}