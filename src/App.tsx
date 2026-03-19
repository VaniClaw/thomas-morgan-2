import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Phone, MapPin, ChevronRight } from 'lucide-react'

/* ─── tokens ─────────────────────────────────────────────────────────────── */
const BG     = '#faf8f4'
const INK    = '#14110e'
const MUTED  = '#8c8680'
const RULE   = '#e2ddd6'
const ACCENT = '#2d4f1a'
const WARM   = '#f2ede4'   // section bg alternate

/* ─── Reveal ─────────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Navbar ─────────────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  function go(id: string) {
    setOpen(false)
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 80)
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(250,248,244,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? `1px solid ${RULE}` : '1px solid transparent',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between h-16">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer"
          >
            <span className="cormorant font-semibold text-lg tracking-wide" style={{ color: INK }}>
              Baumpflege Morgan
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-10">
            {[['Leistungen','leistungen'],['Über uns','ueber'],['Referenzen','referenzen'],['Kontakt','kontakt']].map(([l,id]) => (
              <button key={id} onClick={() => go(id)}
                className="cursor-pointer text-xs font-medium tracking-[0.12em] uppercase transition-colors duration-200"
                style={{ color: MUTED }}
                onMouseEnter={e => (e.currentTarget.style.color = INK)}
                onMouseLeave={e => (e.currentTarget.style.color = MUTED)}
              >{l}</button>
            ))}
          </nav>

          <a href="tel:015785767550"
            className="hidden md:flex items-center gap-2 text-xs font-semibold tracking-[0.1em] uppercase transition-colors duration-200"
            style={{ color: ACCENT }}
            onMouseEnter={e => (e.currentTarget.style.color = INK)}
            onMouseLeave={e => (e.currentTarget.style.color = ACCENT)}
          >
            <Phone size={13} />
            01578 5767550
          </a>

          <button onClick={() => setOpen(o => !o)} className="md:hidden cursor-pointer p-1" aria-label="Menü">
            <div className="flex flex-col gap-[5px]">
              <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }}
                className="block w-5 h-px" style={{ background: INK, transformOrigin: 'center' }} />
              <motion.span animate={{ opacity: open ? 0 : 1 }}
                className="block w-5 h-px" style={{ background: INK }} />
              <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }}
                className="block w-5 h-px" style={{ background: INK, transformOrigin: 'center' }} />
            </div>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col justify-center px-10"
            style={{ background: BG }}
          >
            {[['Leistungen','leistungen'],['Über uns','ueber'],['Referenzen','referenzen'],['Kontakt','kontakt']].map(([l,id], i) => (
              <motion.button key={id} onClick={() => go(id)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="cursor-pointer text-left py-5 cormorant font-light italic"
                style={{ fontSize: '52px', color: INK, borderBottom: `1px solid ${RULE}` }}
              >{l}</motion.button>
            ))}
            <motion.a href="tel:015785767550"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.32 }}
              className="mt-10 text-sm font-semibold tracking-[0.1em] uppercase flex items-center gap-2"
              style={{ color: ACCENT }}
            >
              <Phone size={14} /> 01578 5767550
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ─── Hero ───────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16"
      style={{ background: BG }}>

      {/* Tag */}
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
        className="text-xs font-medium tracking-[0.22em] uppercase mb-10"
        style={{ color: MUTED }}
      >
        Fachbetrieb seit 2010 · Dietzenbach & Frankfurt
      </motion.p>

      {/* Main heading — Cormorant, centered, large */}
      <div className="overflow-hidden mb-2">
        <motion.h1
          initial={{ y: '105%' }} animate={{ y: 0 }}
          transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="cormorant font-light leading-[0.9] tracking-tight"
          style={{ fontSize: 'clamp(64px, 11vw, 148px)', color: INK }}
        >
          Baumpflege
        </motion.h1>
      </div>

      <div className="overflow-hidden mb-10">
        <motion.h1
          initial={{ y: '105%' }} animate={{ y: 0 }}
          transition={{ duration: 1.0, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="cormorant italic font-light leading-[0.9] tracking-tight"
          style={{ fontSize: 'clamp(64px, 11vw, 148px)', color: ACCENT }}
        >
          Morgan.
        </motion.h1>
      </div>

      {/* Thin rule */}
      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ delay: 0.7, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm mb-10" style={{ height: '1px', background: RULE, transformOrigin: 'center' }}
      />

      <motion.p
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.7 }}
        className="text-base leading-relaxed max-w-md mb-10"
        style={{ color: MUTED }}
      >
        Professionelle Baumpflege, Fällung und Seilklettertechnik im Raum
        Dietzenbach & Frankfurt. Zuverlässig, sauber, fair.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <button onClick={() => document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })}
          className="cursor-pointer flex items-center gap-2 text-sm font-semibold tracking-[0.08em] uppercase px-8 py-3.5 transition-all duration-300"
          style={{ background: INK, color: BG }}
          onMouseEnter={e => (e.currentTarget.style.background = ACCENT)}
          onMouseLeave={e => (e.currentTarget.style.background = INK)}
        >
          Angebot anfragen <ArrowUpRight size={14} />
        </button>
        <button onClick={() => document.getElementById('leistungen')?.scrollIntoView({ behavior: 'smooth' })}
          className="cursor-pointer flex items-center gap-2 text-sm font-medium tracking-[0.08em] uppercase px-8 py-3.5 border transition-all duration-300"
          style={{ border: `1px solid ${RULE}`, color: MUTED }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = INK
            e.currentTarget.style.color = INK
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = RULE
            e.currentTarget.style.color = MUTED
          }}
        >
          Leistungen <ChevronRight size={14} />
        </button>
      </motion.div>

      {/* Scroll nudge */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-px h-12" style={{ background: `linear-gradient(to bottom, transparent, ${RULE})` }}
        />
      </motion.div>
    </section>
  )
}

/* ─── Leistungen — horizontal scroll cards ───────────────────────────────── */
const SERVICES = [
  { num: '01', name: 'Baumpflege', desc: 'Vitalitätsschnitt, Kronenpflege und gezielte Pflege für langfristig gesunde Bäume.' },
  { num: '02', name: 'Baumfällung', desc: 'Kontrollierte Fällung auf engem Raum — sicher und rücksichtsvoll.' },
  { num: '03', name: 'Baumschnitt', desc: 'Totholzentfernung, Formschnitt und Kronenpflege nach Maß.' },
  { num: '04', name: 'Heckenschnitt', desc: 'Präzise Pflege von Hecken, Sträuchern und Formgehölzen aller Art.' },
  { num: '05', name: 'Gartenarbeit', desc: 'Saisonale Pflege, Bepflanzung und Grünflächenmanagement.' },
  { num: '06', name: 'Seilklettertechnik', desc: 'Klettertechnik auf höchstem Niveau für alle schwer zugänglichen Kronenarbeiten.', highlight: true },
]

function Leistungen() {
  return (
    <section id="leistungen" style={{ background: WARM }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-24 pb-12">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-12" >
          <h2 className="cormorant font-light leading-none"
            style={{ fontSize: 'clamp(44px, 6vw, 80px)', color: INK }}>
            Unsere<br /><em style={{ color: ACCENT }}>Leistungen</em>
          </h2>
          <p className="text-sm max-w-xs pb-1" style={{ color: MUTED, lineHeight: '1.7' }}>
            Jede Aufgabe wird mit Sorgfalt, Erfahrung und modernem Gerät ausgeführt.
          </p>
        </Reveal>
      </div>

      {/* Horizontal scroll strip */}
      <div className="scroll-strip pl-6 md:pl-10 pb-24" style={{ borderTop: `1px solid ${RULE}` }}>
        {SERVICES.map((s, i) => (
          <Reveal key={s.num} delay={i * 0.06}>
            <div
              className="shrink-0 flex flex-col justify-between p-8 transition-colors duration-300 cursor-default group"
              style={{
                width: 'clamp(260px, 30vw, 360px)',
                minHeight: '300px',
                background: s.highlight ? ACCENT : BG,
                borderRight: `1px solid ${RULE}`,
              }}
              onMouseEnter={e => {
                if (!s.highlight) (e.currentTarget as HTMLDivElement).style.background = '#ede8df'
              }}
              onMouseLeave={e => {
                if (!s.highlight) (e.currentTarget as HTMLDivElement).style.background = BG
              }}
            >
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] mb-6"
                  style={{ color: s.highlight ? 'rgba(250,248,244,0.5)' : MUTED }}>
                  {s.num}
                </p>
                <h3 className="cormorant font-medium leading-tight mb-4"
                  style={{ fontSize: '32px', color: s.highlight ? BG : INK }}>
                  {s.name}
                </h3>
                <p className="text-sm leading-relaxed"
                  style={{ color: s.highlight ? 'rgba(250,248,244,0.72)' : MUTED }}>
                  {s.desc}
                </p>
              </div>
              {s.highlight && (
                <span className="mt-6 self-start text-xs font-bold tracking-[0.16em] uppercase px-3 py-1.5"
                  style={{ border: '1px solid rgba(250,248,244,0.3)', color: BG }}>
                  Unser USP
                </span>
              )}
            </div>
          </Reveal>
        ))}
        {/* End padding card */}
        <div className="shrink-0 w-10" />
      </div>
    </section>
  )
}

/* ─── Über uns ───────────────────────────────────────────────────────────── */
function UeberUns() {
  return (
    <section id="ueber" className="py-24 md:py-36" style={{ background: BG }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: large italic statement */}
          <Reveal className="lg:col-span-7">
            <p className="cormorant italic font-light leading-[1.2] mb-12"
              style={{ fontSize: 'clamp(36px, 4.5vw, 60px)', color: INK }}>
              "Fachkompetenz, Zuverlässigkeit und faire Preise — das ist unser Anspruch seit über 10 Jahren."
            </p>
            <p className="text-base leading-relaxed max-w-lg" style={{ color: MUTED }}>
              Thomas Morgan und sein Team stehen für sorgfältige Arbeit, Pünktlichkeit und höchste
              Sicherheitsstandards. Vom Routineschnitt bis zum Spezialeinsatz mit Seilklettertechnik —
              wir erledigen jeden Job, als wäre es unser eigener Garten.
            </p>
          </Reveal>

          {/* Right: stats, stripped back */}
          <Reveal delay={0.15} className="lg:col-span-5">
            <div style={{ borderTop: `1px solid ${RULE}` }}>
              {[
                { val: '10+', label: 'Jahre Erfahrung' },
                { val: '★ 5.0', label: 'Google Bewertung' },
                { val: '100%', label: 'Weiterempfehlung' },
              ].map((s, i) => (
                <div key={i} className="flex items-baseline justify-between py-6"
                  style={{ borderBottom: `1px solid ${RULE}` }}>
                  <span className="cormorant font-medium" style={{ fontSize: '52px', color: ACCENT, letterSpacing: '-0.02em' }}>
                    {s.val}
                  </span>
                  <span className="text-sm font-medium tracking-[0.1em] uppercase" style={{ color: MUTED }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Contact shortcut */}
            <div className="mt-10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ background: WARM, border: `1px solid ${RULE}` }}>
                <MapPin size={16} color={MUTED} />
              </div>
              <p className="text-sm" style={{ color: MUTED }}>
                Berliner Str. 26-28, 63128 Dietzenbach
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ─── Testimonials — auto-rotating single quote ─────────────────────────── */
const REVIEWS = [
  { name: 'Verena Ehlers', text: 'Herr Morgan war sehr freundlich, zuverlässig und professionell. Die Kommunikation war durchweg sehr gut — wir sind rundum zufrieden.' },
  { name: 'Marius Klein', text: 'Thomas Morgan ist überaus empfehlenswert. Alle Jobs wurden kompetent, zuverlässig und professionell erledigt. Absolute Weiterempfehlung!' },
  { name: 'Elayne Chapman', text: 'Hervorragende Arbeit geleistet, alles sauber hinterlassen und den Garten ordentlich und gepflegt hinterlassen. Und obendrein noch freundlich.' },
  { name: 'Monique Tauber', text: 'Er ist kompetent, fair, freundlich, zuverlässig und motiviert. Hat schnell die gewünschten Baumschnitte erledigt und alles top abgewickelt.' },
  { name: 'Robert Collina', text: 'Tom und seine Mitarbeiter sind sehr zuverlässig und sehr gut — wir arbeiten schon seit Jahren nur mit ihm zusammen.' },
]

function Referenzen() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % REVIEWS.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="referenzen" className="py-24 md:py-36" style={{ background: WARM }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <Reveal className="mb-16 flex items-end justify-between flex-wrap gap-4">
          <h2 className="cormorant font-light leading-none"
            style={{ fontSize: 'clamp(44px, 6vw, 80px)', color: INK }}>
            Kundenstimmen
          </h2>
          <p className="text-xs font-medium tracking-[0.18em] uppercase" style={{ color: MUTED }}>
            ★★★★★ Google Rezensionen
          </p>
        </Reveal>

        {/* Single rotating quote */}
        <div className="relative min-h-[200px] flex items-start"
          style={{ borderTop: `1px solid ${RULE}`, paddingTop: '48px' }}>
          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <p className="cormorant italic font-light leading-[1.3] mb-8 max-w-3xl"
                style={{ fontSize: 'clamp(28px, 4vw, 52px)', color: INK }}>
                "{REVIEWS[active].text}"
              </p>
              <p className="text-sm font-semibold tracking-[0.12em] uppercase" style={{ color: ACCENT }}>
                — {REVIEWS[active].name}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot navigation */}
        <div className="flex items-center gap-3 mt-12">
          {REVIEWS.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className="cursor-pointer transition-all duration-300"
              style={{
                width: i === active ? '28px' : '8px',
                height: '2px',
                background: i === active ? ACCENT : RULE,
              }}
              aria-label={`Rezension ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Kontakt — centered, single column ─────────────────────────────────── */
const HOURS = [
  ['Mo – Do', '08:00 – 18:00'],
  ['Freitag', '08:00 – 17:00'],
  ['Samstag', '08:00 – 14:00'],
  ['Sonntag', 'Geschlossen'],
]

function Kontakt() {
  const iStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 0',
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${RULE}`,
    borderRadius: 0,
    fontSize: '15px',
    fontFamily: "'DM Sans', sans-serif",
    color: INK,
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <section id="kontakt" className="py-24 md:py-36" style={{ background: BG }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <Reveal className="text-center mb-20">
          <p className="text-xs font-medium tracking-[0.22em] uppercase mb-6" style={{ color: MUTED }}>
            Kontakt
          </p>
          <h2 className="cormorant font-light leading-tight"
            style={{ fontSize: 'clamp(44px, 6vw, 80px)', color: INK }}>
            Kostenloses Angebot.<br />
            <em style={{ color: ACCENT }}>Innerhalb von 24h.</em>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Form */}
          <Reveal delay={0.1}>
            <form onSubmit={e => { e.preventDefault(); alert('Vielen Dank! Wir melden uns bald.') }}
              className="flex flex-col gap-8">
              {[
                { label: 'Ihr Name', type: 'text', placeholder: 'Thomas Müller', req: true },
                { label: 'Telefon', type: 'tel', placeholder: '+49 123 456 789', req: false },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-medium tracking-[0.14em] uppercase mb-1" style={{ color: MUTED }}>
                    {f.label}
                  </label>
                  <input type={f.type} placeholder={f.placeholder} required={f.req} style={iStyle}
                    onFocus={e => (e.currentTarget.style.borderBottomColor = ACCENT)}
                    onBlur={e => (e.currentTarget.style.borderBottomColor = RULE)}
                  />
                </div>
              ))}

              <div>
                <label className="block text-xs font-medium tracking-[0.14em] uppercase mb-1" style={{ color: MUTED }}>
                  Leistung
                </label>
                <select style={iStyle}
                  onFocus={e => (e.currentTarget.style.borderBottomColor = ACCENT)}
                  onBlur={e => (e.currentTarget.style.borderBottomColor = RULE)}
                >
                  <option value="">Bitte wählen…</option>
                  {['Baumpflege','Baumfällung','Baumschnitt','Heckenschnitt','Gartenarbeit','Seilklettertechnik','Sonstiges'].map(o => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium tracking-[0.14em] uppercase mb-1" style={{ color: MUTED }}>
                  Nachricht
                </label>
                <textarea rows={4} placeholder="Beschreiben Sie Ihr Anliegen…"
                  style={{ ...iStyle, resize: 'none', lineHeight: '1.7' }}
                  onFocus={e => (e.currentTarget.style.borderBottomColor = ACCENT)}
                  onBlur={e => (e.currentTarget.style.borderBottomColor = RULE)}
                />
              </div>

              <button type="submit"
                className="cursor-pointer self-start flex items-center gap-2 text-sm font-semibold tracking-[0.1em] uppercase px-8 py-4 mt-2 transition-colors duration-300"
                style={{ background: INK, color: BG }}
                onMouseEnter={e => (e.currentTarget.style.background = ACCENT)}
                onMouseLeave={e => (e.currentTarget.style.background = INK)}
              >
                Anfrage senden <ArrowUpRight size={14} />
              </button>
            </form>
          </Reveal>

          {/* Info */}
          <Reveal delay={0.18}>
            <div className="flex flex-col gap-10">
              {/* Phone — centrepiece */}
              <div>
                <p className="text-xs font-medium tracking-[0.18em] uppercase mb-3" style={{ color: MUTED }}>
                  Direkt anrufen
                </p>
                <a href="tel:015785767550"
                  className="cursor-pointer cormorant font-light leading-none block mb-1 transition-opacity duration-200 hover:opacity-60"
                  style={{ fontSize: 'clamp(40px, 5vw, 64px)', color: INK, letterSpacing: '-0.02em' }}
                >
                  01578 5767550
                </a>
                <p className="text-xs font-medium tracking-[0.1em] uppercase" style={{ color: ACCENT }}>
                  Notfall? Jetzt anrufen.
                </p>
              </div>

              {/* Hours */}
              <div>
                <p className="text-xs font-medium tracking-[0.18em] uppercase mb-4" style={{ color: MUTED }}>
                  Öffnungszeiten
                </p>
                <div style={{ borderTop: `1px solid ${RULE}` }}>
                  {HOURS.map(([day, time]) => (
                    <div key={day} className="flex justify-between py-3"
                      style={{ borderBottom: `1px solid ${RULE}` }}>
                      <span className="text-sm" style={{ color: time === 'Geschlossen' ? MUTED : INK }}>{day}</span>
                      <span className="text-sm font-medium"
                        style={{ color: time === 'Geschlossen' ? RULE : ACCENT }}>{time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div>
                <p className="text-xs font-medium tracking-[0.18em] uppercase mb-3" style={{ color: MUTED }}>
                  Adresse
                </p>
                <p className="text-sm leading-relaxed" style={{ color: INK }}>
                  Berliner Str. 26-28<br />63128 Dietzenbach
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ─────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: INK }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="cormorant font-medium text-sm" style={{ color: 'rgba(250,248,244,0.4)' }}>
          Baumpflege Morgan · © 2025
        </span>
        <span className="text-xs tracking-[0.1em] uppercase" style={{ color: 'rgba(250,248,244,0.2)' }}>
          Webdesign by <span style={{ color: ACCENT }}>Open Visual</span>
        </span>
        <div className="flex gap-6">
          {['Impressum','Datenschutz'].map(l => (
            <a key={l} href="#"
              className="text-xs tracking-[0.1em] uppercase transition-colors duration-200"
              style={{ color: 'rgba(250,248,244,0.3)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(250,248,244,0.8)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(250,248,244,0.3)')}
            >{l}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}

/* ─── App ────────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Leistungen />
        <UeberUns />
        <Referenzen />
        <Kontakt />
      </main>
      <Footer />
    </>
  )
}
