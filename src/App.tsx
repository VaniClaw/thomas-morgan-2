import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  TreePine, Axe, Scissors, Leaf, Shovel, MoveVertical,
  Phone, MapPin, Menu, X, ArrowUpRight, ChevronDown,
} from 'lucide-react'

/* ── Design tokens ───────────────────────────────────────────────────────── */
const BG      = '#1C1917'
const SURFACE = '#242018'
const CARD    = '#2C2820'
const GOLD    = '#CA8A04'
const GOLD_DIM= 'rgba(202,138,4,0.12)'
const TEXT    = '#F5F0E8'
const MUTED   = '#9C9488'
const BORDER  = '#3A3530'
const SYNE    = { fontFamily: "'Syne', sans-serif" }
const FIG     = { fontFamily: "'Figtree', sans-serif" }

/* ── Reveal helper ───────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = '', y = 40 }: {
  children: React.ReactNode; delay?: number; className?: string; y?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >{children}</motion.div>
  )
}

/* ── Animated counter ────────────────────────────────────────────────────── */
function useCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target, duration])

  return { count, ref }
}

/* ── Navbar ──────────────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
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

  const links = [['Leistungen','leistungen'],['Über uns','ueber'],['Referenzen','referenzen'],['Kontakt','kontakt']]

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(28,25,23,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: scrolled ? `1px solid ${GOLD}40` : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16">
          <button onClick={() => window.scrollTo({ top:0, behavior:'smooth' })} className="cursor-pointer">
            <span style={{ ...SYNE, fontWeight: 700, fontSize: '20px', color: GOLD }}>Morgan.</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {links.map(([l, id]) => (
              <button key={id} onClick={() => go(id)}
                className="cursor-pointer text-sm font-medium transition-colors duration-200"
                style={{ ...FIG, color: MUTED }}
                onMouseEnter={e => (e.currentTarget.style.color = TEXT)}
                onMouseLeave={e => (e.currentTarget.style.color = MUTED)}
              >{l}</button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="tel:015785767550"
              className="flex items-center gap-2 text-sm font-medium transition-colors duration-200"
              style={{ color: MUTED }}
              onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
              onMouseLeave={e => (e.currentTarget.style.color = MUTED)}
            >
              <Phone size={13} /> 01578 5767550
            </a>
            <button onClick={() => go('kontakt')}
              className="cursor-pointer text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-200 hover:opacity-85"
              style={{ background: GOLD, color: BG, ...SYNE }}
            >Angebot</button>
          </div>

          <button onClick={() => setOpen(o => !o)} className="md:hidden cursor-pointer" aria-label="Menü">
            {open ? <X size={20} color={TEXT} /> : <Menu size={20} color={TEXT} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col justify-center px-8"
            style={{ background: BG }}
          >
            {links.map(([l, id], i) => (
              <motion.button key={id} onClick={() => go(id)}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="cursor-pointer text-left py-5 text-4xl font-bold border-b"
                style={{ ...SYNE, color: TEXT, borderColor: BORDER }}
              >{l}</motion.button>
            ))}
            <motion.a href="tel:015785767550"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.32 }}
              className="mt-8 flex items-center gap-2 text-sm font-semibold"
              style={{ color: GOLD }}
            ><Phone size={14} /> 01578 5767550</motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ── Hero — Full viewport ────────────────────────────────────────────────── */
function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: '100vh', background: BG, display: 'flex', flexDirection: 'column' }}
    >
      {/* Subtle ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 70% at 20% 50%, rgba(202,138,4,0.05) 0%, transparent 65%)' }}
      />

      <div className="flex-1 flex flex-col justify-center" style={{ minHeight: '100vh' }}>
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-32 lg:py-0 z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mb-10"
            style={{ ...FIG, fontSize: '11px', letterSpacing: '0.28em', textTransform: 'uppercase', color: GOLD }}
          >Baumpflege · Fällung · Seilklettertechnik</motion.p>

          <div className="overflow-hidden mb-1">
            <motion.h1
              initial={{ y: '105%' }} animate={{ y: 0 }}
              transition={{ duration: 1.0, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              style={{
                ...SYNE,
                fontSize: 'clamp(80px, 12vw, 160px)',
                fontWeight: 900,
                lineHeight: 0.88,
                color: TEXT,
                letterSpacing: '-0.03em',
              }}
            >Ihre</motion.h1>
          </div>
          <div className="overflow-hidden mb-1">
            <motion.h1
              initial={{ y: '105%' }} animate={{ y: 0 }}
              transition={{ duration: 1.0, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{
                ...SYNE,
                fontSize: 'clamp(80px, 12vw, 160px)',
                fontWeight: 900,
                lineHeight: 0.88,
                color: TEXT,
                letterSpacing: '-0.03em',
              }}
            >Bäume.</motion.h1>
          </div>
          <div className="overflow-hidden mb-12">
            <motion.h1
              initial={{ y: '105%' }} animate={{ y: 0 }}
              transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                ...SYNE,
                fontSize: 'clamp(80px, 12vw, 160px)',
                fontWeight: 900,
                lineHeight: 0.88,
                color: GOLD,
                letterSpacing: '-0.03em',
                fontStyle: 'italic',
              }}
            >Sicher.</motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mb-12 max-w-sm"
            style={{ ...FIG, fontSize: '16px', lineHeight: 1.75, color: MUTED }}
          >
            Professionelle Baumpflege und Fällung im Rhein-Main-Gebiet.
            Seit über 10 Jahren — zuverlässig, sauber, fair.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })}
              className="cursor-pointer flex items-center gap-2 font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105"
              style={{
                ...SYNE,
                fontSize: '12px',
                background: GOLD,
                color: BG,
                padding: '16px 32px',
                borderRadius: '4px',
              }}
            >Angebot anfragen <ArrowUpRight size={14} /></button>

            <button
              onClick={() => document.getElementById('leistungen')?.scrollIntoView({ behavior: 'smooth' })}
              className="cursor-pointer flex items-center gap-2 font-semibold uppercase tracking-wider transition-all duration-200"
              style={{
                ...SYNE,
                fontSize: '12px',
                color: MUTED,
                padding: '16px 32px',
                borderRadius: '4px',
                border: `1px solid ${BORDER}`,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = GOLD }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = MUTED }}
            >Leistungen <ChevronDown size={14} /></button>
          </motion.div>

          {/* Trust strip bottom left */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
            className="mt-20 flex items-center gap-8"
          >
            {['10+ Jahre', '★ 5.0 Google', 'Dietzenbach'].map((item, i) => (
              <div key={item} className="flex items-center gap-8">
                {i > 0 && <div className="w-px h-4" style={{ background: BORDER }} />}
                <span style={{ ...FIG, fontSize: '11px', color: MUTED, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{item}</span>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  )
}

/* ── Leistungen — Full-width stacked horizontal list ─────────────────────── */
const SERVICES = [
  { icon: TreePine,      num: '01', name: 'Baumpflege',         desc: 'Vitalitätsschnitt & langfristige Kronenpflege.' },
  { icon: Axe,           num: '02', name: 'Baumfällung',        desc: 'Kontrollierte Fällung auf engstem Raum.' },
  { icon: Scissors,      num: '03', name: 'Baumschnitt',        desc: 'Totholzentfernung und präziser Formschnitt.' },
  { icon: Leaf,          num: '04', name: 'Heckenschnitt',      desc: 'Saisonale Pflege von Hecken & Sträuchern.' },
  { icon: Shovel,        num: '05', name: 'Gartenarbeit',       desc: 'Grünflächenmanagement & Saisonalpflege.' },
  { icon: MoveVertical,  num: '06', name: 'Seilklettertechnik', desc: 'Profi-Klettertechnik — unser Alleinstellungsmerkmal.' },
]

function ServiceRow({ svc, index }: { svc: typeof SERVICES[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)
  const Icon = svc.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative cursor-default"
      style={{
        borderBottom: `1px solid ${BORDER}`,
        borderLeft: `4px solid ${hovered ? GOLD : 'transparent'}`,
        transition: 'border-color 0.35s ease',
        paddingLeft: hovered ? '28px' : '0px',
      }}
    >
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-14 flex items-center gap-8 md:gap-16">
        {/* Big gold number */}
        <motion.span
          animate={{ scale: hovered ? 1.08 : 1, color: hovered ? GOLD : `${GOLD}55` }}
          transition={{ duration: 0.3 }}
          style={{
            ...SYNE,
            fontSize: 'clamp(72px, 9vw, 120px)',
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: '-0.04em',
            minWidth: '140px',
            display: 'block',
          }}
        >{svc.num}</motion.span>

        {/* Service name — center */}
        <div className="flex-1">
          <h3 style={{
            ...SYNE,
            fontSize: 'clamp(28px, 4vw, 56px)',
            fontWeight: 800,
            color: hovered ? TEXT : `${TEXT}cc`,
            letterSpacing: '-0.025em',
            lineHeight: 1,
            transition: 'color 0.3s ease',
          }}>{svc.name}</h3>
        </div>

        {/* Right: icon + short desc */}
        <div className="hidden md:flex items-center gap-5 shrink-0" style={{ maxWidth: '280px' }}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            style={{ background: hovered ? GOLD_DIM : 'transparent', border: `1px solid ${hovered ? GOLD : BORDER}`, transition: 'all 0.3s' }}>
            <Icon size={18} strokeWidth={1.5} color={hovered ? GOLD : MUTED} />
          </div>
          <p style={{ ...FIG, fontSize: '13px', color: MUTED, lineHeight: 1.6 }}>{svc.desc}</p>
        </div>
      </div>
    </motion.div>
  )
}

function Leistungen() {
  return (
    <section id="leistungen" style={{ background: BG, borderTop: `1px solid ${BORDER}` }}>
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 pt-32 pb-20">
        <Reveal>
          <p style={{ ...FIG, fontSize: '11px', letterSpacing: '0.28em', textTransform: 'uppercase', color: GOLD, marginBottom: '20px' }}>
            Was wir bieten
          </p>
          <h2 style={{
            ...SYNE,
            fontSize: 'clamp(56px, 7vw, 96px)',
            fontWeight: 900,
            color: TEXT,
            letterSpacing: '-0.03em',
            lineHeight: 0.95,
          }}>Unsere<br />Leistungen</h2>
        </Reveal>
      </div>

      {/* Stacked rows */}
      <div style={{ borderTop: `1px solid ${BORDER}` }}>
        {SERVICES.map((svc, i) => (
          <ServiceRow key={svc.name} svc={svc} index={i} />
        ))}
      </div>

      <div className="py-20" />
    </section>
  )
}

/* ── Stats — Full-width dramatic split rows ──────────────────────────────── */
const STAT_DATA = [
  {
    target: 10,
    suffix: '+',
    label: 'Jahre Erfahrung',
    desc: 'Seit über einem Jahrzehnt pflegen und fällen wir Bäume im gesamten Rhein-Main-Gebiet. Jeder Einsatz mit vollem Einsatz.',
    bg: SURFACE,
  },
  {
    target: 5,
    suffix: '.0★',
    label: 'Google Bewertung',
    desc: 'Hunderte zufriedene Kunden. Eine perfekte Bewertung — keine Ausnahme, sondern unser Standard bei jedem Auftrag.',
    bg: BG,
  },
  {
    target: 100,
    suffix: '%',
    label: 'Weiterempfehlung',
    desc: 'Jeder Kunde empfiehlt uns weiter. Das ist kein Zufall: sauber, pünktlich, fair — das ist unser Versprechen.',
    bg: SURFACE,
  },
]

function StatRow({ stat, index }: { stat: typeof STAT_DATA[0]; index: number }) {
  const { count, ref } = useCounter(stat.target)
  const revealRef = useRef(null)
  const inView = useInView(revealRef, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={revealRef}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.9, delay: 0.1 }}
      style={{ background: stat.bg, borderBottom: `1px solid ${BORDER}` }}
    >
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-32 md:py-40 flex flex-col md:flex-row items-start md:items-center gap-12 md:gap-0">
        {/* LEFT 40% — huge number */}
        <div className="md:w-2/5 shrink-0">
          <div ref={ref} className="flex items-end gap-2">
            <span style={{
              ...SYNE,
              fontSize: 'clamp(96px, 14vw, 200px)',
              fontWeight: 900,
              color: GOLD,
              lineHeight: 0.85,
              letterSpacing: '-0.05em',
            }}>{count}</span>
            <span style={{
              ...SYNE,
              fontSize: 'clamp(48px, 7vw, 96px)',
              fontWeight: 900,
              color: GOLD,
              lineHeight: 0.85,
              letterSpacing: '-0.03em',
              paddingBottom: '8px',
            }}>{stat.suffix}</span>
          </div>
          <p style={{ ...FIG, fontSize: '11px', letterSpacing: '0.24em', textTransform: 'uppercase', color: MUTED, marginTop: '20px' }}>
            {stat.label}
          </p>
        </div>

        {/* RIGHT 60% — description */}
        <div className="md:w-3/5 md:pl-20">
          <div className="w-12 h-px mb-10" style={{ background: GOLD }} />
          <p style={{ ...FIG, fontSize: 'clamp(18px, 2.2vw, 26px)', color: TEXT, lineHeight: 1.65, opacity: 0.75 }}>
            {stat.desc}
          </p>
          <span style={{ ...FIG, fontSize: '11px', color: MUTED, letterSpacing: '0.1em', marginTop: '16px', display: 'block' }}>
            — Baumpflege Morgan, Dietzenbach
          </span>
        </div>

        {/* Row number indicator */}
        <div className="hidden md:block ml-auto shrink-0">
          <span style={{ ...SYNE, fontSize: '11px', color: BORDER, letterSpacing: '0.2em' }}>
            0{index + 1} / 03
          </span>
        </div>
      </div>
    </motion.div>
  )
}

function Stats() {
  return (
    <section style={{ borderTop: `1px solid ${BORDER}` }}>
      {STAT_DATA.map((stat, i) => (
        <StatRow key={stat.label} stat={stat} index={i} />
      ))}
    </section>
  )
}

/* ── Über Uns — Full bleed, centered quote + 4-col info cards ────────────── */
const INFO_CARDS = [
  { icon: TreePine,     title: 'Arbeitsweise',       desc: 'Sauber, pünktlich und sicher — jeder Auftrag mit vollem Einsatz.' },
  { icon: MapPin,       title: 'Einsatzgebiet',      desc: 'Dietzenbach, Frankfurt, Offenbach & das gesamte Rhein-Main-Gebiet.' },
  { icon: MoveVertical, title: 'Seilklettertechnik', desc: 'Profi-Klettertechnik für höchste Bäume und engen Platzverhältnissen.' },
  { icon: Leaf,         title: 'Unsere Garantie',    desc: 'Wir hinterlassen Ihren Garten sauberer als wir ihn vorgefunden haben.' },
]

function UeberUns() {
  return (
    <section id="ueber" style={{ background: BG }}>
      {/* Full-bleed centered italic quote */}
      <div className="w-full px-8 md:px-16 py-40 md:py-48" style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <Reveal y={50}>
          <div className="max-w-5xl mx-auto text-center">
            <p style={{
              ...FIG,
              fontSize: 'clamp(11px, 1.2vw, 13px)',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: GOLD,
              marginBottom: '40px',
            }}>Über uns</p>

            <blockquote style={{
              ...SYNE,
              fontSize: 'clamp(32px, 5vw, 72px)',
              fontWeight: 800,
              fontStyle: 'italic',
              color: TEXT,
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
            }}>
              "Jeder Baum erzählt eine Geschichte. Wir sorgen dafür, dass sie weitergeht."
            </blockquote>

            <div className="mt-12 flex items-center justify-center gap-6">
              <div className="h-px w-16" style={{ background: GOLD }} />
              <span style={{ ...FIG, fontSize: '14px', fontWeight: 600, color: MUTED, letterSpacing: '0.1em' }}>
                Thomas Morgan · Inhaber & Kletterer
              </span>
              <div className="h-px w-16" style={{ background: GOLD }} />
            </div>

            <p className="mt-12 max-w-2xl mx-auto" style={{ ...FIG, fontSize: '17px', color: MUTED, lineHeight: 1.8 }}>
              Mit über 10 Jahren Erfahrung im Bereich Baumpflege und Fällung steht Thomas Morgan
              für Fachkompetenz, Zuverlässigkeit und faire Preise — als Fachbetrieb mit Seilklettertechnik
              auch für anspruchsvollste Einsätze ausgerüstet.
            </p>
          </div>
        </Reveal>
      </div>

      {/* 4-column info cards */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: BORDER }}>
          {INFO_CARDS.map((card, i) => {
            const Icon = card.icon
            return (
              <Reveal key={card.title} delay={i * 0.1}>
                <div className="h-full p-10 flex flex-col gap-6" style={{ background: SURFACE }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: GOLD_DIM }}>
                    <Icon size={20} strokeWidth={1.5} color={GOLD} />
                  </div>
                  <h3 style={{ ...SYNE, fontSize: '18px', fontWeight: 700, color: TEXT }}>{card.title}</h3>
                  <p style={{ ...FIG, fontSize: '14px', color: MUTED, lineHeight: 1.7 }}>{card.desc}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ── Testimonials — Full-width editorial magazine rows ───────────────────── */
const REVIEWS = [
  { name: 'Verena Ehlers',  text: 'Herr Morgan war sehr freundlich, zuverlässig und professionell. Wir sind rundum zufrieden!', gold: true },
  { name: 'Marius Klein',   text: 'Thomas Morgan ist überaus empfehlenswert — kompetent, zuverlässig und professionell erledigt.', gold: false },
  { name: 'Elayne Chapman', text: 'Hervorragende Arbeit, alles sauber hinterlassen. Pünktlich, fair und freundlich — absolut zu empfehlen!', gold: true },
  { name: 'Monique Tauber', text: 'Kompetent, fair, freundlich und motiviert. Hat schnell und sauber gearbeitet. Jederzeit wieder!', gold: false },
  { name: 'Robert Collina', text: 'Sehr zuverlässig — wir arbeiten schon seit Jahren nur mit Tom und seinem Team zusammen.', gold: true },
]

function TestimonialRow({ review, index }: { review: typeof REVIEWS[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      style={{ borderBottom: `1px solid ${BORDER}` }}
    >
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-16 md:py-20 flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
        {/* Big opening quote glyph */}
        <span
          aria-hidden
          className="shrink-0 select-none"
          style={{
            ...SYNE,
            fontSize: '80px',
            lineHeight: 1,
            color: review.gold ? GOLD : BORDER,
            fontWeight: 900,
            marginBottom: '-12px',
          }}
        >"</span>

        {/* Quote text — huge, spans most of width */}
        <p style={{
          ...FIG,
          fontSize: 'clamp(20px, 3.2vw, 44px)',
          color: review.gold ? TEXT : `${TEXT}99`,
          lineHeight: 1.35,
          fontStyle: 'italic',
          flex: 1,
        }}>{review.text}</p>

        {/* Name pinned right */}
        <div className="shrink-0 md:text-right" style={{ minWidth: '140px' }}>
          <p style={{ ...SYNE, fontSize: '14px', fontWeight: 700, color: review.gold ? GOLD : MUTED }}>
            {review.name}
          </p>
          <p style={{ ...FIG, fontSize: '11px', color: BORDER, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: '4px' }}>
            Google ★★★★★
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function Referenzen() {
  return (
    <section id="referenzen" style={{ background: SURFACE, borderTop: `1px solid ${BORDER}` }}>
      {/* Header */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 pt-32 pb-20">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 style={{
              ...SYNE,
              fontSize: 'clamp(56px, 7vw, 96px)',
              fontWeight: 900,
              color: TEXT,
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
            }}>Kunden&shy;stimmen</h2>
            <p style={{ ...FIG, fontSize: '11px', color: MUTED, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              ★★★★★ Google Rezensionen
            </p>
          </div>
        </Reveal>
      </div>

      {/* Editorial rows */}
      <div style={{ borderTop: `1px solid ${BORDER}` }}>
        {REVIEWS.map((r, i) => (
          <TestimonialRow key={r.name} review={r} index={i} />
        ))}
      </div>

      <div className="py-20" />
    </section>
  )
}

/* ── Kontakt — Full-screen dark, huge phone, inline form ────────────────── */
const HOURS = [
  ['Mo–Mi', '08:00–18:00'],
  ['Donnerstag', '08:00–18:00'],
  ['Freitag', '08:00–17:00'],
  ['Samstag', '08:00–14:00'],
  ['Sonntag', 'Geschlossen'],
]

function Kontakt() {
  const [selectVal, setSelectVal] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    alert('Vielen Dank! Wir melden uns innerhalb von 24 Stunden.')
  }

  return (
    <section id="kontakt" style={{ background: BG, borderTop: `1px solid ${BORDER}` }}>

      {/* TOP HALF — centered huge phone */}
      <div className="w-full py-40 md:py-48 flex flex-col items-center justify-center text-center px-8"
        style={{ borderBottom: `1px solid ${BORDER}` }}>
        <Reveal y={30}>
          <p style={{ ...FIG, fontSize: '11px', letterSpacing: '0.28em', textTransform: 'uppercase', color: MUTED, marginBottom: '32px' }}>
            Rufen Sie uns an
          </p>
          <a
            href="tel:015785767550"
            className="block hover:opacity-70 transition-opacity duration-300"
            style={{
              ...SYNE,
              fontSize: 'clamp(48px, 10vw, 128px)',
              fontWeight: 900,
              color: GOLD,
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >01578 5767550</a>

          <div className="mt-8 flex items-center justify-center gap-4">
            <MapPin size={14} color={MUTED} />
            <p style={{ ...FIG, fontSize: '15px', color: MUTED }}>
              Berliner Str. 26–28 · 63128 Dietzenbach
            </p>
          </div>

          <p style={{ ...FIG, fontSize: '13px', color: BORDER, marginTop: '10px', letterSpacing: '0.1em' }}>
            Mo–Sa · 08:00–18:00 · Kostenlose Erstberatung
          </p>
        </Reveal>
      </div>

      {/* BOTTOM HALF — full-width inline form + hours strip */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-32">
        <Reveal delay={0.1}>
          <h3 style={{ ...SYNE, fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: TEXT, letterSpacing: '-0.02em', marginBottom: '40px' }}>
            Kostenloses Angebot anfragen
          </h3>
        </Reveal>

        {/* Inline single-row form */}
        <Reveal delay={0.15}>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-3 items-stretch">
              {/* Name */}
              <input
                type="text"
                placeholder="Ihr Name"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                style={{
                  flex: 1,
                  padding: '18px 20px',
                  background: SURFACE,
                  border: `1px solid ${BORDER}`,
                  borderRadius: '4px',
                  color: TEXT,
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: '15px',
                  outline: 'none',
                  minWidth: 0,
                }}
                onFocus={e => (e.currentTarget.style.borderColor = GOLD)}
                onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
              />

              {/* Phone */}
              <input
                type="tel"
                placeholder="Telefonnummer"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                style={{
                  flex: 1,
                  padding: '18px 20px',
                  background: SURFACE,
                  border: `1px solid ${BORDER}`,
                  borderRadius: '4px',
                  color: TEXT,
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: '15px',
                  outline: 'none',
                  minWidth: 0,
                }}
                onFocus={e => (e.currentTarget.style.borderColor = GOLD)}
                onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
              />

              {/* Service select */}
              <div style={{ flex: 1, position: 'relative', minWidth: 0 }}>
                <select
                  value={selectVal}
                  onChange={e => setSelectVal(e.target.value)}
                  style={{
                    width: '100%',
                    height: '100%',
                    padding: '18px 40px 18px 20px',
                    background: SURFACE,
                    border: `1px solid ${BORDER}`,
                    borderRadius: '4px',
                    color: selectVal ? TEXT : MUTED,
                    fontFamily: "'Figtree', sans-serif",
                    fontSize: '15px',
                    outline: 'none',
                    appearance: 'none',
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = GOLD)}
                  onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
                >
                  <option value="" disabled>Leistung wählen…</option>
                  {['Baumpflege','Baumfällung','Baumschnitt','Heckenschnitt','Gartenarbeit','Seilklettertechnik','Sonstiges'].map(o => (
                    <option key={o} style={{ background: CARD }}>{o}</option>
                  ))}
                </select>
                <ChevronDown size={14} color={MUTED} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="cursor-pointer shrink-0 font-bold uppercase tracking-wider transition-all duration-200 hover:opacity-85"
                style={{
                  ...SYNE,
                  fontSize: '12px',
                  background: GOLD,
                  color: BG,
                  padding: '18px 36px',
                  borderRadius: '4px',
                  border: 'none',
                  whiteSpace: 'nowrap',
                }}
              >Anfrage senden <ArrowUpRight size={12} style={{ display: 'inline', marginLeft: '6px' }} /></button>
            </div>

            <p style={{ ...FIG, fontSize: '12px', color: BORDER, marginTop: '14px', letterSpacing: '0.06em' }}>
              Kostenlos & unverbindlich · Antwort innerhalb von 24 Stunden
            </p>
          </form>
        </Reveal>

        {/* Opening hours horizontal strip */}
        <Reveal delay={0.25} className="mt-24">
          <p style={{ ...FIG, fontSize: '11px', letterSpacing: '0.24em', textTransform: 'uppercase', color: GOLD, marginBottom: '20px' }}>
            Öffnungszeiten
          </p>
          <div className="flex flex-wrap gap-px" style={{ background: BORDER }}>
            {HOURS.map(([day, time]) => (
              <div
                key={day}
                className="flex flex-col gap-2 px-8 py-6"
                style={{ background: SURFACE, flex: '1 1 140px' }}
              >
                <span style={{ ...FIG, fontSize: '11px', color: MUTED, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{day}</span>
                <span style={{ ...SYNE, fontSize: '16px', fontWeight: 700, color: time === 'Geschlossen' ? BORDER : GOLD }}>
                  {time}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ── Footer ──────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: '#0E0B09', borderTop: `1px solid ${GOLD}30` }}>
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <span style={{ ...SYNE, fontSize: '13px', color: `${TEXT}40`, fontWeight: 600 }}>
          Baumpflege Morgan · © 2025
        </span>
        <span style={{ ...FIG, fontSize: '12px', color: `${TEXT}20` }}>
          Webdesign by <span style={{ color: GOLD, opacity: 0.6 }}>Open Visual</span>
        </span>
        <div className="flex gap-6">
          {['Impressum','Datenschutz'].map(l => (
            <a key={l} href="#"
              className="text-xs transition-colors duration-200"
              style={{ color: `${TEXT}30` }}
              onMouseEnter={e => (e.currentTarget.style.color = MUTED)}
              onMouseLeave={e => (e.currentTarget.style.color = `${TEXT}30`)}
            >{l}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}

/* ── App ─────────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Leistungen />
        <Stats />
        <UeberUns />
        <Referenzen />
        <Kontakt />
      </main>
      <Footer />
    </>
  )
}
