import { useEffect } from 'react'

export default function Impressum() {
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
          Impressum
        </h1>

        <div className="flex flex-col gap-8 text-[#6B5D4F]">
          <div>
            <p className={label} style={{ color: '#5C7A3E' }}>Angaben gemäß § 5 TMG</p>
            <div className={text}>
              <p className="font-semibold text-[#2C1F14]">Baumpflege Morgan</p>
              <p>Thomas Morgan</p>
              <p>Berliner Str. 26–28</p>
              <p>63128 Dietzenbach</p>
            </div>
          </div>

          <div>
            <p className={label} style={{ color: '#5C7A3E' }}>Kontakt</p>
            <div className={text}>
              <p>Telefon: <a href="tel:015785767550" className="hover:text-[#2C1F14] transition-colors">01578 5767550</a></p>
            </div>
          </div>

          <div>
            <p className={label} style={{ color: '#5C7A3E' }}>Umsatzsteuer-ID</p>
            <p className={text}>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: wird nachgereicht.
            </p>
          </div>

          <div>
            <p className={label} style={{ color: '#5C7A3E' }}>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</p>
            <div className={text}>
              <p>Thomas Morgan</p>
              <p>Berliner Str. 26–28</p>
              <p>63128 Dietzenbach</p>
            </div>
          </div>

          <div>
            <p className={label} style={{ color: '#5C7A3E' }}>Streitschlichtung</p>
            <p className={text}>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
              https://ec.europa.eu/consumers/odr/. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
              vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>

          <div>
            <p className={label} style={{ color: '#5C7A3E' }}>Haftung für Inhalte</p>
            <p className={text}>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
              allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
              verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
              zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
          </div>

          <div>
            <p className={label} style={{ color: '#5C7A3E' }}>Haftung für Links</p>
            <p className={text}>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
              Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
              verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
