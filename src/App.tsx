import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Phone } from 'lucide-react'

/* ── fonts ─────────────────────────────────────────────────────────────────
   Barlow Condensed — display, bold, condensed
   EB Garamond      — body, editorial serif
   ──────────────────────────────────────────────────────────────────────── */

const COND = { fontFamily: "'Barlow Condensed', sans-serif" }
const SERIF = { fontFamily: "'EB Garamond', Georgia, serif" }
const INK = '#111010'
const CREAM = '#f0ece3'
const GREEN = '#2d5a1b'
const MUTED = '#7a7570'
const RULE = '#d4cfc5'

/* ── Reveal ─────────────────────────────────────────────────────────────── */
function R({
  children,
  delay = 0,
  className = '',
  y = 40,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  y?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ── Marquee ────────────────────────────────────────────────────────────── */
function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items]
  return (
    <div
      className="overflow-hidden border-y py-4"
      style={{ borderColor: RULE, background: GREEN }}
    >
      <div className="flex whitespace-nowrap marquee-track gap-12">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-sm font-semibold uppercase tracking-[0.18em] shrink-0"
            style={{ ...COND, color: CREAM }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── Navbar ─────────────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  function go(id: string) {
    setMenuOpen(false)
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 80)
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 h-14 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(240,236,227,0.94)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          borderBottom: scrolled ? `1px solid ${RULE}` : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer"
        >
          <span
            className="text-base font-black uppercase tracking-[0.08em]"
            style={{ ...COND, color: INK }}
          >
            Baumpflege Morgan
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            ['Leistungen', 'leistungen'],
            ['Über uns', 'ueber'],
            ['Referenzen', 'referenzen'],
            ['Kontakt', 'kontakt'],
          ].map(([label, id]) => (
            <button
              key={id}
              onClick={() => go(id)}
              className="slide-link cursor-pointer text-xs font-semibold uppercase tracking-[0.14em]"
              data-text={label}
              style={{ ...COND, color: MUTED }}
            >
              <span>{label}</span>
            </button>
          ))}
          <button
            onClick={() => go('kontakt')}
            className="cursor-pointer flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] px-4 py-2 transition-colors duration-200"
            style={{
              ...COND,
              background: INK,
              color: CREAM,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = GREEN
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = INK
            }}
          >
            Angebot anfragen
            <ArrowUpRight size={13} />
          </button>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden cursor-pointer flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Menü"
        >
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
            className="block h-px w-6"
            style={{ background: INK, transformOrigin: 'center' }}
            transition={{ duration: 0.25 }}
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1 }}
            className="block h-px w-6"
            style={{ background: INK }}
            transition={{ duration: 0.15 }}
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
            className="block h-px w-6"
            style={{ background: INK, transformOrigin: 'center' }}
            transition={{ duration: 0.25 }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: menuOpen ? 'auto' : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-14 left-0 right-0 z-40 md:hidden overflow-hidden"
        style={{ background: CREAM, borderBottom: `1px solid ${RULE}` }}
      >
        <div className="flex flex-col px-6 py-6 gap-4">
          {[
            ['Leistungen', 'leistungen'],
            ['Über uns', 'ueber'],
            ['Referenzen', 'referenzen'],
            ['Kontakt', 'kontakt'],
          ].map(([label, id]) => (
            <button
              key={id}
              onClick={() => go(id)}
              className="cursor-pointer text-left text-2xl font-black uppercase tracking-tight"
              style={{ ...COND, color: INK }}
            >
              {label}
            </button>
          ))}
        </div>
      </motion.div>
    </>
  )
}

/* ── Hero ───────────────────────────────────────────────────────────────── */
function Hero() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-end overflow-hidden pt-14"
      style={{ background: CREAM }}
    >
      {/* Paralax background text */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <span
          className="font-black uppercase leading-none"
          style={{
            ...COND,
            fontSize: 'clamp(120px, 22vw, 340px)',
            color: 'transparent',
            WebkitTextStroke: `1px ${RULE}`,
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
          }}
        >
          MORGAN
        </span>
      </motion.div>

      {/* Content sits at bottom */}
      <div className="relative z-10 px-6 md:px-10 pb-16 max-w-7xl mx-auto w-full">
        {/* Year tag */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xs font-semibold uppercase tracking-[0.22em] mb-8"
          style={{ ...COND, color: MUTED }}
        >
          Seit 2010 · Dietzenbach & Frankfurt
        </motion.p>

        {/* Massive headline */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-black uppercase leading-[0.88]"
            style={{
              ...COND,
              fontSize: 'clamp(72px, 13vw, 180px)',
              color: INK,
              letterSpacing: '-0.02em',
            }}
          >
            Ihre Bäume.<br />
            <span style={{ color: GREEN }}>Unser Handwerk.</span>
          </motion.h1>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row md:items-end gap-6 md:gap-0 justify-between pt-8"
          style={{ borderTop: `1px solid ${RULE}` }}
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="text-base leading-relaxed max-w-sm"
            style={{ ...SERIF, color: MUTED }}
          >
            Fachbetrieb für Baumpflege & Fällung. Seilklettertechnik für
            anspruchsvollste Einsätze — sicher, sauber, zuverlässig.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-4"
          >
            <button
              onClick={() => document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })}
              className="cursor-pointer flex items-center gap-2 text-sm font-bold uppercase tracking-[0.1em] px-6 py-3 transition-colors duration-200"
              style={{ ...COND, background: INK, color: CREAM }}
              onMouseEnter={e => (e.currentTarget.style.background = GREEN)}
              onMouseLeave={e => (e.currentTarget.style.background = INK)}
            >
              Angebot anfragen
              <ArrowUpRight size={14} />
            </button>
            <a
              href="tel:015785767550"
              className="cursor-pointer flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.1em] transition-colors duration-200"
              style={{ ...COND, color: MUTED }}
              onMouseEnter={e => (e.currentTarget.style.color = INK)}
              onMouseLeave={e => (e.currentTarget.style.color = MUTED)}
            >
              <Phone size={14} />
              01578 5767550
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ── Leistungen ─────────────────────────────────────────────────────────── */
const SERVICES = [
  { num: '01', name: 'Baumpflege', desc: 'Fachgerechte Pflege und Gesundheitserhalt durch gezielte Kronenpflege und Vitalitätsschnitt.' },
  { num: '02', name: 'Baumfällung', desc: 'Sichere und kontrollierte Fällung — auch unter schwierigsten Platzverhältnissen.' },
  { num: '03', name: 'Baumschnitt', desc: 'Formschnitt, Totholzentfernung und Kronenaufbau für gesunde, standfeste Bäume.' },
  { num: '04', name: 'Heckenschnitt', desc: 'Präziser Schnitt für gepflegte Hecken und Sträucher aller Art.' },
  { num: '05', name: 'Gartenarbeit', desc: 'Saisonale Pflege, Beete, Grünflächengestaltung — alles aus einer Hand.' },
  { num: '06', name: 'Seilklettertechnik', desc: 'Profi-Klettertechnik für schwer zugängliche Bäume. Unser stärkstes Alleinstellungsmerkmal.', highlight: true },
]

function Leistungen() {
  return (
    <section id="leistungen" className="py-24 md:py-32" style={{ background: CREAM }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header row */}
        <R className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-0">
          <h2
            className="font-black uppercase leading-none"
            style={{ ...COND, fontSize: 'clamp(48px, 7vw, 96px)', color: INK, letterSpacing: '-0.02em' }}
          >
            Leistungen
          </h2>
          <p className="text-sm max-w-xs pb-2" style={{ ...SERIF, color: MUTED }}>
            Jede Arbeit wird sauber, pünktlich und mit vollem Einsatz erledigt.
          </p>
        </R>

        {/* Numbered list */}
        <div style={{ borderTop: `1px solid ${RULE}`, marginTop: '2rem' }}>
          {SERVICES.map((s, i) => (
            <R key={s.num} delay={i * 0.06}>
              <div
                className="flex flex-col md:flex-row md:items-center gap-4 md:gap-0 py-7 group cursor-default transition-colors duration-200"
                style={{
                  borderBottom: `1px solid ${RULE}`,
                  background: s.highlight ? 'transparent' : 'transparent',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = s.highlight ? `${GREEN}12` : `${INK}04`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                {/* Number */}
                <span
                  className="font-bold shrink-0 w-14"
                  style={{ ...COND, fontSize: '13px', color: MUTED, letterSpacing: '0.08em' }}
                >
                  {s.num}
                </span>

                {/* Name */}
                <h3
                  className="font-black uppercase flex-1 leading-none transition-colors duration-200"
                  style={{
                    ...COND,
                    fontSize: 'clamp(28px, 4vw, 52px)',
                    color: s.highlight ? GREEN : INK,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {s.name}
                  {s.highlight && (
                    <span
                      className="ml-4 text-xs font-bold uppercase tracking-widest px-2.5 py-1 align-middle"
                      style={{ ...COND, background: GREEN, color: CREAM, fontSize: '10px' }}
                    >
                      USP
                    </span>
                  )}
                </h3>

                {/* Desc */}
                <p
                  className="text-sm leading-relaxed md:max-w-xs md:text-right"
                  style={{ ...SERIF, color: MUTED }}
                >
                  {s.desc}
                </p>
              </div>
            </R>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Über uns ───────────────────────────────────────────────────────────── */
function UeberUns() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], [-30, 30])

  return (
    <section
      id="ueber"
      ref={ref}
      className="py-24 md:py-32 overflow-hidden"
      style={{ background: INK }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Scrolling big text */}
        <div className="overflow-hidden mb-16">
          <motion.p
            style={{ x }}
            className="font-black uppercase leading-none select-none"
          >
            <span
              style={{
                ...COND,
                fontSize: 'clamp(64px, 11vw, 140px)',
                color: 'transparent',
                WebkitTextStroke: `1px ${GREEN}`,
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap',
              }}
            >
              Thomas Morgan
            </span>
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Left: stats column */}
          <R className="md:col-span-4" delay={0.1}>
            <div className="flex flex-col gap-8">
              {[
                { val: '10+', label: 'Jahre Erfahrung' },
                { val: '★ 5.0', label: 'Google Bewertung' },
                { val: '100%', label: 'Weiterempfehlung' },
              ].map(s => (
                <div key={s.label}>
                  <p
                    className="font-black leading-none mb-1"
                    style={{ ...COND, fontSize: '64px', color: GREEN, letterSpacing: '-0.03em' }}
                  >
                    {s.val}
                  </p>
                  <p className="text-sm uppercase tracking-widest" style={{ ...COND, color: MUTED }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </R>

          {/* Right: text */}
          <R className="md:col-span-8" delay={0.2}>
            <p
              className="text-xl md:text-2xl leading-relaxed mb-10"
              style={{ ...SERIF, color: CREAM, fontStyle: 'italic', lineHeight: '1.6' }}
            >
              Mit über 10 Jahren Erfahrung steht Thomas Morgan für
              Fachkompetenz, Zuverlässigkeit und faire Preise.
              Unser Team arbeitet stets sauber, pünktlich und nach
              höchsten Sicherheitsstandards.
            </p>

            <div
              className="pt-8"
              style={{ borderTop: `1px solid #2a2a2a` }}
            >
              <p
                className="text-3xl md:text-4xl leading-tight mb-4"
                style={{ ...SERIF, color: CREAM, fontStyle: 'italic' }}
              >
                "Wir arbeiten schon seit Jahren nur mit ihm zusammen."
              </p>
              <p className="text-sm font-bold uppercase tracking-widest" style={{ ...COND, color: GREEN }}>
                — Robert Collina, Stammkunde
              </p>
            </div>
          </R>
        </div>
      </div>
    </section>
  )
}

/* ── Referenzen ─────────────────────────────────────────────────────────── */
const REVIEWS = [
  { name: 'Verena Ehlers', text: 'Herr Morgan war sehr freundlich, zuverlässig und professionell. Die Kommunikation war durchweg sehr gut.' },
  { name: 'Marius Klein', text: 'Thomas Morgan ist überaus empfehlenswert. Alle Jobs wurden kompetent, zuverlässig und professionell erledigt.' },
  { name: 'Elayne Chapman', text: 'Sie haben hervorragende Arbeit geleistet, alles sauber hinterlassen und den Garten ordentlich und gepflegt hinterlassen.' },
  { name: 'Monique Tauber', text: 'Er ist kompetent, fair, freundlich, zuverlässig und motiviert. Er hat schnell die gewünschten Baumschnitte erledigt — jederzeit wieder!' },
]

function Referenzen() {
  return (
    <section id="referenzen" className="py-24 md:py-32" style={{ background: CREAM }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <R className="mb-16">
          <h2
            className="font-black uppercase"
            style={{ ...COND, fontSize: 'clamp(48px, 7vw, 96px)', color: INK, letterSpacing: '-0.02em', lineHeight: 0.9 }}
          >
            Kunden–<br />stimmen
          </h2>
        </R>

        {/* Alternating full-width quotes */}
        <div>
          {REVIEWS.map((r, i) => (
            <R key={r.name} delay={i * 0.08}>
              <div
                className="py-10 flex flex-col md:flex-row md:items-start gap-6 md:gap-16"
                style={{ borderTop: `1px solid ${RULE}` }}
              >
                {/* Number + name */}
                <div className="shrink-0 md:w-52">
                  <p
                    className="font-bold mb-1"
                    style={{ ...COND, fontSize: '11px', color: MUTED, letterSpacing: '0.14em', textTransform: 'uppercase' }}
                  >
                    0{i + 1} — Google
                  </p>
                  <p
                    className="font-black uppercase"
                    style={{ ...COND, fontSize: '18px', color: INK, letterSpacing: '0.02em' }}
                  >
                    {r.name}
                  </p>
                  <div className="flex gap-0.5 mt-2">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <span key={si} style={{ color: GREEN, fontSize: '12px' }}>★</span>
                    ))}
                  </div>
                </div>

                {/* Quote — big editorial text */}
                <p
                  className="flex-1 leading-[1.35]"
                  style={{
                    ...SERIF,
                    fontSize: 'clamp(22px, 3vw, 38px)',
                    color: INK,
                    fontStyle: 'italic',
                  }}
                >
                  "{r.text}"
                </p>
              </div>
            </R>
          ))}

          {/* Last row border */}
          <div style={{ borderTop: `1px solid ${RULE}` }} />
        </div>
      </div>
    </section>
  )
}

/* ── Kontakt ────────────────────────────────────────────────────────────── */
const HOURS = [
  ['Montag', '08:00–18:00'],
  ['Dienstag', '08:00–18:00'],
  ['Mittwoch', '08:00–18:00'],
  ['Donnerstag', '08:00–18:00'],
  ['Freitag', '08:00–17:00'],
  ['Samstag', '08:00–14:00'],
  ['Sonntag', 'Geschlossen'],
]

function Kontakt() {
  const inputStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${RULE}`,
    borderRadius: 0,
    color: INK,
    padding: '12px 0',
    width: '100%',
    fontSize: '16px',
    fontFamily: "'EB Garamond', Georgia, serif",
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <section
      id="kontakt"
      className="py-24 md:py-32"
      style={{ background: INK }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Big CTA headline */}
        <R className="mb-16">
          <h2
            className="font-black uppercase leading-[0.88]"
            style={{
              ...COND,
              fontSize: 'clamp(52px, 9vw, 120px)',
              letterSpacing: '-0.02em',
              color: CREAM,
            }}
          >
            Kostenloses<br />
            <span style={{ color: GREEN }}>Angebot.</span>
          </h2>
        </R>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Form — minimal, underline-only inputs */}
          <R delay={0.1}>
            <form
              className="flex flex-col gap-8"
              onSubmit={e => {
                e.preventDefault()
                alert('Vielen Dank! Wir melden uns innerhalb von 24 Stunden.')
              }}
            >
              {[
                { label: 'Name', type: 'text', placeholder: 'Ihr vollständiger Name', required: true },
                { label: 'Telefon', type: 'tel', placeholder: 'Ihre Rufnummer', required: false },
              ].map(f => (
                <div key={f.label}>
                  <label
                    className="block text-xs font-bold uppercase tracking-[0.18em] mb-1"
                    style={{ ...COND, color: MUTED }}
                  >
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    required={f.required}
                    style={{ ...inputStyle, '::placeholder': { color: '#4a4a46' } } as React.CSSProperties}
                    onFocus={e => (e.currentTarget.style.borderBottomColor = GREEN)}
                    onBlur={e => (e.currentTarget.style.borderBottomColor = RULE)}
                  />
                </div>
              ))}

              <div>
                <label
                  className="block text-xs font-bold uppercase tracking-[0.18em] mb-1"
                  style={{ ...COND, color: MUTED }}
                >
                  Leistung
                </label>
                <select
                  style={{ ...inputStyle, color: INK }}
                  onFocus={e => (e.currentTarget.style.borderBottomColor = GREEN)}
                  onBlur={e => (e.currentTarget.style.borderBottomColor = RULE)}
                >
                  <option value="">Bitte wählen…</option>
                  {['Baumpflege', 'Baumfällung', 'Baumschnitt', 'Heckenschnitt', 'Gartenarbeit', 'Seilklettertechnik', 'Sonstiges'].map(o => (
                    <option key={o} style={{ background: INK }}>{o}</option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className="block text-xs font-bold uppercase tracking-[0.18em] mb-1"
                  style={{ ...COND, color: MUTED }}
                >
                  Nachricht
                </label>
                <textarea
                  rows={4}
                  placeholder="Beschreiben Sie Ihr Anliegen…"
                  style={{ ...inputStyle, resize: 'none', lineHeight: '1.6' }}
                  onFocus={e => (e.currentTarget.style.borderBottomColor = GREEN)}
                  onBlur={e => (e.currentTarget.style.borderBottomColor = RULE)}
                />
              </div>

              <button
                type="submit"
                className="cursor-pointer self-start flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] px-8 py-4 transition-all duration-200"
                style={{ ...COND, background: GREEN, color: CREAM }}
                onMouseEnter={e => (e.currentTarget.style.background = CREAM) && (e.currentTarget.style.color = INK)}
                onMouseLeave={e => {
                  e.currentTarget.style.background = GREEN
                  e.currentTarget.style.color = CREAM
                }}
              >
                Anfrage senden
                <ArrowUpRight size={15} />
              </button>

              <p className="text-xs" style={{ ...COND, color: MUTED, letterSpacing: '0.08em' }}>
                Antwort innerhalb von 24 Stunden — kostenlos & unverbindlich.
              </p>
            </form>
          </R>

          {/* Info */}
          <R delay={0.2}>
            <div className="flex flex-col gap-12">
              {/* Phone — huge */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] mb-3" style={{ ...COND, color: MUTED }}>
                  Direkt anrufen
                </p>
                <a
                  href="tel:015785767550"
                  className="cursor-pointer group"
                >
                  <span
                    className="font-black leading-none transition-colors duration-200 group-hover:opacity-70"
                    style={{ ...COND, fontSize: 'clamp(36px, 5vw, 64px)', color: CREAM, letterSpacing: '-0.02em' }}
                  >
                    01578 5767550
                  </span>
                </a>
                <p className="text-sm mt-2" style={{ ...COND, color: GREEN, letterSpacing: '0.06em' }}>
                  Notfall? Jetzt direkt anrufen.
                </p>
              </div>

              {/* Address */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] mb-3" style={{ ...COND, color: MUTED }}>
                  Adresse
                </p>
                <p className="text-xl" style={{ ...SERIF, color: CREAM, fontStyle: 'italic' }}>
                  Berliner Str. 26-28<br />63128 Dietzenbach
                </p>
              </div>

              {/* Hours */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ ...COND, color: MUTED }}>
                  Öffnungszeiten
                </p>
                <div className="flex flex-col gap-2">
                  {HOURS.map(([day, time]) => (
                    <div key={day} className="flex justify-between items-baseline">
                      <span
                        className="text-sm font-semibold uppercase tracking-wider"
                        style={{ ...COND, color: time === 'Geschlossen' ? '#3a3a36' : MUTED }}
                      >
                        {day}
                      </span>
                      <span
                        className="text-sm font-bold"
                        style={{ ...COND, color: time === 'Geschlossen' ? '#3a3a36' : GREEN, letterSpacing: '0.06em' }}
                      >
                        {time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </R>
        </div>
      </div>
    </section>
  )
}

/* ── Footer ─────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: '#0a0a09', borderTop: `1px solid #1a1a18` }}>
      <div
        className="max-w-7xl mx-auto px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <div>
          <span
            className="text-sm font-black uppercase tracking-[0.08em]"
            style={{ ...COND, color: '#3a3a36' }}
          >
            Baumpflege Morgan
          </span>
          <span className="ml-3 text-xs" style={{ ...COND, color: '#2a2a28', letterSpacing: '0.1em' }}>
            © 2025
          </span>
        </div>

        <p className="text-xs" style={{ ...COND, color: '#2a2a28', letterSpacing: '0.1em' }}>
          Webdesign by <span style={{ color: GREEN }}>Open Visual</span>
        </p>

        <div className="flex gap-6">
          {['Impressum', 'Datenschutz'].map(l => (
            <a
              key={l}
              href="#"
              className="text-xs font-semibold uppercase tracking-[0.12em] transition-colors duration-200"
              style={{ ...COND, color: '#3a3a36' }}
              onMouseEnter={e => (e.currentTarget.style.color = CREAM)}
              onMouseLeave={e => (e.currentTarget.style.color = '#3a3a36')}
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

/* ── App ────────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee items={[
          'Baumpflege', '★ 5.0 Google', 'Baumfällung', 'Seilklettertechnik',
          'Dietzenbach', 'Zuverlässig seit 2010', 'Heckenschnitt', 'Gartenarbeit',
          'Baumschnitt', 'Frankfurt & Umgebung', 'Professionell', 'Fair & Pünktlich',
        ]} />
        <Leistungen />
        <Marquee items={[
          '★ Verena Ehlers', '★ Marius Klein', '★ Elayne Chapman',
          '★ Monique Tauber', '★ Robert Collina', '★ Stefano De Padova',
          'Top Bewertungen', 'Immer 5 Sterne', 'Weiterempfehlung 100%',
        ]} />
        <UeberUns />
        <Referenzen />
        <Kontakt />
      </main>
      <Footer />
    </>
  )
}
