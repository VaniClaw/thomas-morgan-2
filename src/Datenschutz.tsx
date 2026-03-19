import { useEffect } from 'react'

export default function Datenschutz() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const label = "font-['Cabin'] text-[11px] uppercase tracking-[0.22em] mb-2"
  const text = "font-['Cabin'] text-sm leading-relaxed"

  return (
    <div className="min-h-screen bg-[#F5EFE6] px-6 py-24">
      <div className="max-w-2xl mx-auto">
        <a
          href="/"
          className="font-['Cabin'] text-[11px] uppercase tracking-[0.22em] text-[#9B8E7F]
                     hover:text-[#2C1F14] transition-colors duration-200 cursor-pointer"
        >
          ← Zurück zur Startseite
        </a>

        <h1 className="font-['Lora'] font-bold text-4xl text-[#2C1F14] mt-10 mb-10">
          Datenschutzerklärung
        </h1>

        <div className="flex flex-col gap-8 text-[#6B5D4F]">
          <div>
            <p className={label} style={{ color: '#5C7A3E' }}>1. Datenschutz auf einen Blick</p>
            <p className={text}>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen
              Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen
              Sie persönlich identifiziert werden können.
            </p>
          </div>

          <div>
            <p className={label} style={{ color: '#5C7A3E' }}>2. Verantwortlicher</p>
            <div className={text}>
              <p className="font-semibold text-[#2C1F14]">Baumpflege Morgan</p>
              <p>Thomas Morgan</p>
              <p>Berliner Str. 26–28</p>
              <p>63128 Dietzenbach</p>
              <p className="mt-2">Telefon: 01578 5767550</p>
            </div>
          </div>

          <div>
            <p className={label} style={{ color: '#5C7A3E' }}>3. Datenerfassung auf dieser Website</p>
            <p className={text}>
              <strong className="text-[#2C1F14]">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten
              können Sie dem Abschnitt „Verantwortlicher" entnehmen.
            </p>
            <p className={`${text} mt-3`}>
              <strong className="text-[#2C1F14]">Wie erfassen wir Ihre Daten?</strong><br />
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen (z.B. über ein Kontaktformular
              oder per Telefon). Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der
              Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser,
              Betriebssystem oder Uhrzeit des Seitenaufrufs).
            </p>
          </div>

          <div>
            <p className={label} style={{ color: '#5C7A3E' }}>4. Hosting</p>
            <p className={text}>
              Diese Website wird bei einem externen Dienstleister gehostet (Vercel Inc.). Die personenbezogenen
              Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert.
              Hierbei kann es sich v.a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten,
              Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website
              generiert werden, handeln.
            </p>
          </div>

          <div>
            <p className={label} style={{ color: '#5C7A3E' }}>5. Allgemeine Hinweise und Pflichtinformationen</p>
            <p className={text}>
              <strong className="text-[#2C1F14]">Datenschutz</strong><br />
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln
              Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften
              sowie dieser Datenschutzerklärung.
            </p>
            <p className={`${text} mt-3`}>
              <strong className="text-[#2C1F14]">Hinweis zur verantwortlichen Stelle</strong><br />
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist im Abschnitt
              „Verantwortlicher" aufgeführt.
            </p>
          </div>

          <div>
            <p className={label} style={{ color: '#5C7A3E' }}>6. Ihre Rechte</p>
            <p className={text}>
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer
              gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung
              oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt
              haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen.
            </p>
          </div>

          <div>
            <p className={label} style={{ color: '#5C7A3E' }}>7. Kontaktformular</p>
            <p className={text}>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
              Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der
              Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht
              ohne Ihre Einwilligung weiter. Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6
              Abs. 1 lit. b DSGVO.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
