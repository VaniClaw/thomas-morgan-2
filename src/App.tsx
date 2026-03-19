import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  TreePine, Axe, Scissors, Leaf, Shovel, MoveVertical,
  Phone, MapPin, ChevronDown, ArrowUpRight, Menu, X,
} from 'lucide-react'

/* ── Design tokens ───────────────────────────────────────────────────────── */
const BG      = '#1C1917'
const SURFACE = '#242018'
const CARD    = '#2C2820'
const GOLD    = '#CA8A04'
const GOLD_DIM= 'rgba(202,138,4,0.15)'
const TEXT    = '#F5F0E8'
const MUTED   = '#9C9488'
const BORDER  = '#3A3530'
const SYNE    = { fontFamily: "'Syne', sans-serif" }
const FIG     = { fontFamily: "'Figtree', sans-serif" }

/* ── Helpers ─────────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = '', y = 32 }: {
  children: React.ReactNode; delay?: number; className?: string; y?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >{children}</motion.div>
  )
}

/* Animated counter */
function useCounter(target: number, duration = 1800) {
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

/* ── Hero ────────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: BG }}>
      {/* Subtle radial bg glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(202,138,4,0.07) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full py-32 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-0 items-center">
        {/* Left 60% */}
        <div className="lg:col-span-3">
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xs font-mono tracking-[0.22em] mb-8"
            style={{ color: MUTED }}
          >Baumpflege & Fällung · Dietzenbach & Frankfurt</motion.p>

          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ ...SYNE, fontSize: 'clamp(56px, 8.5vw, 120px)', fontWeight: 800, lineHeight: 0.95, color: TEXT, letterSpacing: '-0.02em' }}
            >Ihre Bäume in</motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h1
              initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ ...SYNE, fontSize: 'clamp(56px, 8.5vw, 120px)', fontWeight: 800, lineHeight: 0.95, color: GOLD, letterSpacing: '-0.02em', fontStyle: 'italic' }}
            >besten Händen.</motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="text-base leading-relaxed max-w-md mb-10"
            style={{ color: MUTED }}
          >
            Professionelle Baumpflege, Fällung und Seilklettertechnik
            seit über 10 Jahren. Zuverlässig, sauber, fair.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            <button onClick={() => document.getElementById('kontakt')?.scrollIntoView({ behavior:'smooth' })}
              className="cursor-pointer flex items-center gap-2 text-sm font-bold uppercase tracking-wider px-7 py-3.5 rounded-full transition-all duration-200 hover:scale-105"
              style={{ background: GOLD, color: BG, ...SYNE }}
            >Angebot anfragen <ArrowUpRight size={14} /></button>
            <button onClick={() => document.getElementById('leistungen')?.scrollIntoView({ behavior:'smooth' })}
              className="cursor-pointer flex items-center gap-2 text-sm font-semibold uppercase tracking-wider px-7 py-3.5 rounded-full border transition-all duration-200 hover:border-[#CA8A04] hover:text-[#CA8A04]"
              style={{ border: `1px solid ${BORDER}`, color: MUTED, ...SYNE }}
            >Leistungen <ChevronDown size={14} /></button>
          </motion.div>
        </div>

        {/* Right 40% — decorative floating tags + ring */}
        <div className="lg:col-span-2 flex items-center justify-center relative h-72 lg:h-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Outer spinning ring */}
            <div className="spin-slow absolute inset-0 rounded-full"
              style={{
                width: '260px', height: '260px',
                border: `1px dashed ${GOLD}40`,
                borderRadius: '50%',
              }}
            />
            {/* Inner circle */}
            <div className="relative flex flex-col items-center justify-center rounded-full"
              style={{ width: '260px', height: '260px', background: GOLD_DIM, border: `1px solid ${GOLD}30` }}
            >
              <span style={{ ...SYNE, fontWeight: 800, fontSize: '72px', color: GOLD, lineHeight: 1 }}>10</span>
              <span style={{ ...FIG, fontSize: '13px', color: MUTED, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Jahre</span>
              <span style={{ ...FIG, fontSize: '11px', color: MUTED, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '2px' }}>Erfahrung</span>
            </div>

            {/* Floating tags */}
            {[
              { text: '★ 5.0 Google', top: '-24px', right: '-40px', delay: 0.8 },
              { text: 'Seilklettertechnik', bottom: '10px', right: '-56px', delay: 0.95 },
              { text: 'Seit 2010', top: '50px', left: '-72px', delay: 1.1 },
            ].map((tag) => (
              <motion.div key={tag.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: tag.delay, duration: 0.5 }}
                className="absolute px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap"
                style={{
                  ...FIG,
                  background: CARD,
                  border: `1px solid ${BORDER}`,
                  color: TEXT,
                  top: tag.top,
                  bottom: tag.bottom,
                  left: tag.left,
                  right: tag.right,
                }}
              >{tag.text}</motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Trust bar */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
        className="absolute bottom-0 left-0 right-0 flex items-center justify-center flex-wrap gap-0"
        style={{ borderTop: `1px solid ${BORDER}`, background: `${SURFACE}cc` }}
      >
        {['10+ Jahre Erfahrung', '★ 5.0 Google', 'Dietzenbach', 'Frankfurt', 'Zuverlässig'].map((item, i) => (
          <div key={item} className="flex items-center">
            {i > 0 && <span className="w-px h-8 mx-6 hidden sm:block" style={{ background: GOLD, opacity: 0.25 }} />}
            <span className="px-6 sm:px-0 py-4 text-xs font-medium tracking-[0.12em] uppercase"
              style={{ color: MUTED }}>
              {item}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  )
}

/* ── Leistungen — Bento Grid ─────────────────────────────────────────────── */
const SERVICES = [
  { icon: TreePine, name: 'Baumpflege', desc: 'Vitalitätsschnitt, Kronenpflege und gezielte Pflege für langfristig gesunde Bäume.', span: 'lg:col-span-2 lg:row-span-2', large: true },
  { icon: Axe,      name: 'Baumfällung', desc: 'Kontrollierte Fällung auf engem Raum.', span: 'lg:col-span-1' },
  { icon: Scissors, name: 'Baumschnitt', desc: 'Totholzentfernung und Formschnitt.', span: 'lg:col-span-1' },
  { icon: Leaf,     name: 'Heckenschnitt', desc: 'Präzise Pflege von Hecken und Sträuchern.', span: 'lg:col-span-1' },
  { icon: Shovel,   name: 'Gartenarbeit', desc: 'Saisonale Pflege und Grünflächenmanagement.', span: 'lg:col-span-1' },
  { icon: MoveVertical, name: 'Seilklettertechnik', desc: 'Profi-Klettertechnik für schwer zugängliche Kronenbereiche. Unser stärkstes Alleinstellungsmerkmal.', span: 'lg:col-span-2', gold: true },
]

function Leistungen() {
  return (
    <section id="leistungen" className="py-24 md:py-36 px-6 md:px-10" style={{ background: BG }}>
      <div className="max-w-7xl mx-auto">
        <Reveal className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: GOLD }}>Was wir bieten</p>
          <h2 style={{ ...SYNE, fontSize: 'clamp(40px, 5.5vw, 72px)', fontWeight: 800, color: TEXT, letterSpacing: '-0.02em', lineHeight: 1 }}>
            Unsere Leistungen
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[200px]">
          {SERVICES.map((s, i) => {
            const Icon = s.icon
            return (
              <Reveal key={s.name} delay={i * 0.07} className={`${s.span} h-full`}>
                <motion.div
                  whileHover={{ scale: 1.02, borderColor: s.gold ? BG : GOLD }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative h-full flex flex-col justify-between p-6 rounded-2xl overflow-hidden cursor-default"
                  style={{
                    background: s.gold ? GOLD : CARD,
                    border: `1px solid ${s.gold ? GOLD : BORDER}`,
                  }}
                >
                  {s.gold && (
                    <span className="absolute top-5 right-5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                      style={{ background: `${BG}40`, color: BG, ...SYNE }}>
                      Alleinstellungsmerkmal
                    </span>
                  )}

                  {/* Top: icon */}
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: s.gold ? `${BG}25` : GOLD_DIM }}>
                      <Icon size={22} strokeWidth={1.5} color={s.gold ? BG : GOLD} />
                    </div>
                  </div>

                  {/* Bottom: text */}
                  <div>
                    <h3 className="font-bold mb-2" style={{ ...SYNE, fontSize: s.large ? '26px' : '18px', color: s.gold ? BG : TEXT }}>
                      {s.name}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: s.gold ? `${BG}bb` : MUTED }}>
                      {s.desc}
                    </p>
                  </div>

                  {/* Gold accent line on large card */}
                  {s.large && (
                    <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: GOLD }} />
                  )}
                </motion.div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ── Stats ───────────────────────────────────────────────────────────────── */
function StatCounter({ target, suffix = '', label }: { target: number; suffix?: string; label: string }) {
  const { count, ref } = useCounter(target)
  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      <span style={{ ...SYNE, fontSize: 'clamp(64px, 8vw, 96px)', fontWeight: 800, color: GOLD, lineHeight: 1, letterSpacing: '-0.03em' }}>
        {count}{suffix}
      </span>
      <span className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: MUTED }}>
        {label}
      </span>
    </div>
  )
}

function Stats() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-10" style={{ background: SURFACE }}>
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="flex flex-col md:flex-row items-center justify-center gap-0 divide-y md:divide-y-0 md:divide-x"
            style={{ '--tw-divide-color': `${GOLD}30` } as React.CSSProperties}>
            <div className="px-12 py-8 md:py-0"><StatCounter target={10} suffix="+" label="Jahre Erfahrung" /></div>
            <div className="px-12 py-8 md:py-0"><StatCounter target={5} suffix=".0★" label="Google Bewertung" /></div>
            <div className="px-12 py-8 md:py-0"><StatCounter target={100} suffix="%" label="Weiterempfehlung" /></div>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-16 text-center">
          <div className="w-12 h-px mx-auto mb-8" style={{ background: GOLD }} />
          <p className="text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto italic"
            style={{ ...FIG, color: TEXT, opacity: 0.8 }}>
            "Wir arbeiten schon seit Jahren nur mit ihm zusammen."
          </p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-widest" style={{ color: GOLD }}>
            — Robert Collina, Stammkunde
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ── Über uns + Accordion ────────────────────────────────────────────────── */
const ACCORDION_ITEMS = [
  { title: 'Unsere Arbeitsweise', body: 'Sauber, pünktlich, sicher. Kein Job zu groß, keiner zu klein — jeder Auftrag wird mit vollem Einsatz erledigt.' },
  { title: 'Seilklettertechnik', body: 'Profi-Klettertechnik für höchste Bäume und enge Platzverhältnisse. Damit erreichen wir sicher, was andere nicht können.' },
  { title: 'Einsatzgebiet', body: 'Dietzenbach, Frankfurt, Offenbach, Dreieich und das gesamte Rhein-Main-Gebiet — wir kommen zu Ihnen.' },
  { title: 'Unsere Garantie', body: 'Wir hinterlassen jeden Garten sauberer als wir ihn vorgefunden haben. Das ist unser Versprechen an jeden Kunden.' },
]

function AccordionItem({ title, body }: { title: string; body: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: `1px solid ${BORDER}` }}>
      <button onClick={() => setOpen(o => !o)}
        className="cursor-pointer w-full flex items-center justify-between py-5 text-left gap-4 transition-colors duration-200"
        style={{ color: open ? GOLD : TEXT }}
      >
        <span style={{ ...SYNE, fontSize: '16px', fontWeight: 600 }}>{title}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={18} color={open ? GOLD : MUTED} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="pb-5 pr-8"
              style={{
                ...FIG, fontSize: '14px', color: MUTED, lineHeight: '1.75',
                borderLeft: `2px solid ${GOLD}`,
                paddingLeft: '16px',
                marginLeft: '4px',
              }}
            >{body}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function UeberUns() {
  return (
    <section id="ueber" className="py-24 md:py-36 px-6 md:px-10" style={{ background: BG }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-6" style={{ color: GOLD }}>Über uns</p>
            <h2 style={{ ...SYNE, fontSize: 'clamp(40px, 5.5vw, 68px)', fontWeight: 800, color: TEXT, letterSpacing: '-0.02em', lineHeight: 1.05 }} className="mb-8">
              Thomas<br />Morgan
            </h2>
            <p className="text-base leading-[1.8] mb-6" style={{ color: MUTED }}>
              Mit über 10 Jahren Erfahrung im Bereich Baumpflege und Fällung
              steht Thomas Morgan für Fachkompetenz, Zuverlässigkeit und faire
              Preise. Unser Team arbeitet stets sauber, pünktlich und nach
              höchsten Sicherheitsstandards.
            </p>
            <p className="text-base leading-[1.8]" style={{ color: MUTED }}>
              Als Fachbetrieb mit Seilklettertechnik sind wir auch für
              anspruchsvollste Einsätze ausgerüstet — sicher, effizient und
              rücksichtsvoll gegenüber Ihrem Eigentum und Ihrer Umgebung.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-6" style={{ color: GOLD }}>Mehr erfahren</p>
            <div style={{ borderTop: `1px solid ${BORDER}` }}>
              {ACCORDION_ITEMS.map(item => (
                <AccordionItem key={item.title} {...item} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ── Testimonials — hover-lift cards ────────────────────────────────────── */
const REVIEWS = [
  { name: 'Verena Ehlers',  text: 'Herr Morgan war sehr freundlich, zuverlässig und professionell. Die Kommunikation war durchweg sehr gut — wir sind rundum zufrieden!' },
  { name: 'Marius Klein',   text: 'Thomas Morgan ist überaus empfehlenswert — kompetent, zuverlässig und professionell erledigt. Absolute Weiterempfehlung!' },
  { name: 'Elayne Chapman', text: 'Hervorragende Arbeit, alles sauber hinterlassen. Pünktlich, fair und freundlich — absolut zu empfehlen!' },
  { name: 'Monique Tauber', text: 'Kompetent, fair, freundlich und motiviert. Hat schnell und sauber gearbeitet. Jederzeit wieder!' },
  { name: 'Robert Collina', text: 'Sehr zuverlässig — wir arbeiten schon seit Jahren nur mit Tom und seinem Team zusammen.' },
]

function Referenzen() {
  return (
    <section id="referenzen" className="py-24 md:py-36 px-6 md:px-10" style={{ background: SURFACE }}>
      <div className="max-w-7xl mx-auto">
        <Reveal className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2 style={{ ...SYNE, fontSize: 'clamp(40px, 5.5vw, 72px)', fontWeight: 800, color: TEXT, letterSpacing: '-0.02em', lineHeight: 1 }}>
            Kundenstimmen
          </h2>
          <p className="text-xs uppercase tracking-[0.18em] font-semibold" style={{ color: MUTED }}>★★★★★ Google Rezensionen</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -8, borderColor: GOLD }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="flex flex-col h-full p-7 rounded-2xl"
                style={{ background: CARD, border: `1px solid ${BORDER}`, cursor: 'default' }}
              >
                {/* Big gold quote mark */}
                <div style={{ ...SYNE, fontSize: '56px', color: GOLD, lineHeight: 1, marginBottom: '12px', opacity: 0.6 }}>"</div>

                <p className="flex-1 text-sm leading-[1.75] italic mb-6" style={{ color: TEXT, opacity: 0.85 }}>
                  {r.text}
                </p>

                <div className="flex items-center justify-between pt-5" style={{ borderTop: `1px solid ${BORDER}` }}>
                  <p className="text-sm font-bold" style={{ ...SYNE, color: TEXT }}>{r.name}</p>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded"
                    style={{ background: GOLD_DIM, color: GOLD }}>Google</span>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Kontakt ─────────────────────────────────────────────────────────────── */
const HOURS = [
  ['Mo – Mi', '08:00–18:00'], ['Donnerstag', '08:00–18:00'],
  ['Freitag', '08:00–17:00'], ['Samstag', '08:00–14:00'], ['Sonntag', 'Geschlossen'],
]

function FloatInput({ label, type = 'text', placeholder = ' ', required = false, as: As = 'input', rows }: {
  label: string; type?: string; placeholder?: string; required?: boolean; as?: 'input' | 'textarea'; rows?: number
}) {
  const [active, setActive] = useState(false)
  const [val, setVal] = useState('')
  const filled = active || val.length > 0

  const sharedStyle: React.CSSProperties = {
    width: '100%',
    padding: filled ? '22px 16px 8px' : '15px 16px',
    background: CARD,
    border: `1px solid ${active ? GOLD : BORDER}`,
    borderRadius: '10px',
    color: TEXT,
    fontFamily: "'Figtree', sans-serif",
    fontSize: '15px',
    outline: 'none',
    resize: 'none' as const,
    transition: 'border-color 0.2s, padding 0.2s',
  }

  return (
    <div style={{ position: 'relative' }}>
      {As === 'textarea'
        ? <textarea rows={rows} placeholder={filled ? placeholder : ' '} required={required} value={val}
            onFocus={() => setActive(true)} onBlur={() => setActive(false)}
            onChange={e => setVal(e.target.value)} style={{ ...sharedStyle, paddingTop: '28px' }} />
        : <input type={type} placeholder={filled ? placeholder : ' '} required={required} value={val}
            onFocus={() => setActive(true)} onBlur={() => setActive(false)}
            onChange={e => setVal(e.target.value)} style={sharedStyle} />
      }
      <label style={{
        position: 'absolute', left: '16px',
        top: filled ? (As === 'textarea' ? '10px' : '8px') : '50%',
        transform: filled || As === 'textarea' ? 'none' : 'translateY(-50%)',
        fontSize: filled ? '10px' : '14px',
        color: active ? GOLD : MUTED,
        pointerEvents: 'none',
        transition: 'all 0.2s ease',
        fontFamily: "'Figtree', sans-serif",
        letterSpacing: filled ? '0.08em' : 'normal',
        textTransform: filled ? 'uppercase' : 'none',
      }}>{label}</label>
    </div>
  )
}

function Kontakt() {
  return (
    <section id="kontakt" className="py-24 md:py-36 px-6 md:px-10" style={{ background: BG }}>
      <div className="max-w-7xl mx-auto">
        {/* Phone hero */}
        <Reveal className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] mb-5" style={{ color: MUTED }}>
            Rufen Sie uns an
          </p>
          <a href="tel:015785767550"
            className="cursor-pointer block transition-opacity duration-200 hover:opacity-70"
            style={{ ...SYNE, fontSize: 'clamp(44px, 8vw, 96px)', fontWeight: 800, color: GOLD, letterSpacing: '-0.03em', lineHeight: 1 }}
          >01578 5767550</a>
          <p className="mt-5 text-sm" style={{ color: MUTED }}>
            Mo–Sa · 08:00–18:00 · Sofortberatung kostenlos
          </p>
        </Reveal>

        {/* Gold divider */}
        <div className="w-full h-px mb-16" style={{ background: `${GOLD}30` }} />

        {/* Form + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <Reveal delay={0.1}>
            <h3 className="text-2xl font-bold mb-8" style={{ ...SYNE, color: TEXT }}>
              Kostenloses Angebot anfragen
            </h3>
            <form onSubmit={e => { e.preventDefault(); alert('Vielen Dank! Wir melden uns innerhalb von 24 Stunden.') }}
              className="flex flex-col gap-4">
              <FloatInput label="Ihr Name" required />
              <FloatInput label="Telefonnummer" type="tel" />

              {/* Select — manual */}
              <div style={{ position: 'relative' }}>
                <select defaultValue=""
                  style={{ width:'100%', padding:'15px 16px', background:CARD, border:`1px solid ${BORDER}`, borderRadius:'10px', color:MUTED, fontFamily:"'Figtree',sans-serif", fontSize:'15px', outline:'none', appearance:'none' }}
                  onFocus={e => (e.currentTarget.style.borderColor = GOLD)}
                  onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
                  onChange={e => (e.currentTarget.style.color = TEXT)}
                >
                  <option value="" disabled>Leistung wählen…</option>
                  {['Baumpflege','Baumfällung','Baumschnitt','Heckenschnitt','Gartenarbeit','Seilklettertechnik','Sonstiges'].map(o => (
                    <option key={o} style={{ background: CARD }}>{o}</option>
                  ))}
                </select>
                <ChevronDown size={16} color={MUTED} style={{ position:'absolute', right:'16px', top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }} />
              </div>

              <FloatInput label="Ihre Nachricht" as="textarea" rows={4} />

              <button type="submit"
                className="cursor-pointer w-full py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-all duration-200 hover:opacity-85 hover:-translate-y-0.5 mt-2"
                style={{ background: GOLD, color: BG, ...SYNE }}
              >Anfrage senden</button>
              <p className="text-xs text-center" style={{ color: MUTED }}>
                Kostenlos & unverbindlich · Antwort innerhalb von 24 Stunden
              </p>
            </form>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="flex flex-col gap-10">
              {/* Address */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: GOLD }}>Adresse</p>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: GOLD_DIM }}>
                    <MapPin size={16} color={GOLD} />
                  </div>
                  <p className="text-base leading-relaxed" style={{ color: TEXT, opacity: 0.8 }}>
                    Berliner Str. 26-28<br />63128 Dietzenbach
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: GOLD }}>Öffnungszeiten</p>
                <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${BORDER}` }}>
                  {HOURS.map(([day, time], i) => (
                    <div key={day} className="flex justify-between items-center px-5 py-3.5"
                      style={{
                        borderTop: i > 0 ? `1px solid ${BORDER}` : undefined,
                        background: time === 'Geschlossen' ? 'transparent' : CARD,
                      }}
                    >
                      <span className="text-sm" style={{ color: time === 'Geschlossen' ? BORDER : MUTED }}>{day}</span>
                      <span className="text-sm font-semibold" style={{ color: time === 'Geschlossen' ? BORDER : GOLD }}>
                        {time}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Notfall CTA */}
                <div className="mt-5 p-5 rounded-xl" style={{ background: GOLD_DIM, border: `1px solid ${GOLD}30` }}>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: GOLD }}>Notfall?</p>
                  <a href="tel:015785767550"
                    className="flex items-center gap-2 font-bold transition-opacity hover:opacity-75"
                    style={{ ...SYNE, fontSize: '22px', color: TEXT }}>
                    <Phone size={18} color={GOLD} /> 01578 5767550
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ── Footer ──────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: '#0E0B09', borderTop: `1px solid ${GOLD}30` }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <span style={{ ...SYNE, fontSize:'13px', color: `${TEXT}40`, fontWeight: 600 }}>
          Baumpflege Morgan · © 2025
        </span>
        <span style={{ ...FIG, fontSize:'12px', color: `${TEXT}20` }}>
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
