import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  TreePine, Axe, Scissors, Leaf, Shovel, MoveVertical,
  Phone, MapPin, Menu, X, ArrowRight, Star, Clock, ChevronDown, ChevronLeft, ChevronRight,
} from 'lucide-react'

/* ── Design tokens ───────────────────────────────────────────────────────── */
const BG      = '#FAFAF8'
const WHITE   = '#FFFFFF'
const TEXT    = '#1A1A1A'
const TEXT_2  = '#3D3D3D'
const GREEN   = '#4A7C59'
const GREEN_L = '#EAF2EC'
const GREEN_D = '#3A6347'
const MUTED   = '#8B8B82'
const CARD    = '#F2F1ED'
const BORDER  = '#E5E4DF'
const DARK    = '#1E2A21'

const SERIF = { fontFamily: "'Cormorant Garamond', serif" }
const SANS  = { fontFamily: "'Outfit', sans-serif" }

/* ── Reveal helper ───────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = '', y = 30 }: {
  children: React.ReactNode; delay?: number; className?: string; y?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >{children}</motion.div>
  )
}

/* ── Animated counter ────────────────────────────────────────────────────── */
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
      <nav className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(250,250,248,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(1.2)' : 'none',
          borderBottom: scrolled ? `1px solid ${BORDER}` : '1px solid transparent',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between h-[72px]">
          <button onClick={() => window.scrollTo({ top:0, behavior:'smooth' })} className="cursor-pointer flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: GREEN }}>
              <TreePine size={15} color={WHITE} strokeWidth={2} />
            </div>
            <span style={{ ...SERIF, fontWeight: 600, fontSize: '22px', color: TEXT, letterSpacing: '-0.01em' }}>
              Baumpflege Morgan
            </span>
          </button>

          <div className="hidden md:flex items-center gap-10">
            {links.map(([l, id]) => (
              <button key={id} onClick={() => go(id)}
                className="cursor-pointer text-[13px] font-medium tracking-wide transition-colors duration-200"
                style={{ ...SANS, color: MUTED }}
                onMouseEnter={e => (e.currentTarget.style.color = GREEN)}
                onMouseLeave={e => (e.currentTarget.style.color = MUTED)}
              >{l}</button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-5">
            <a href="tel:015785767550"
              className="flex items-center gap-2 text-[13px] font-medium transition-colors duration-200"
              style={{ ...SANS, color: TEXT_2 }}
              onMouseEnter={e => (e.currentTarget.style.color = GREEN)}
              onMouseLeave={e => (e.currentTarget.style.color = TEXT_2)}
            >
              <Phone size={14} strokeWidth={1.8} /> 01578 5767550
            </a>
            <button onClick={() => go('kontakt')}
              className="cursor-pointer text-[13px] font-semibold px-6 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg"
              style={{ background: GREEN, color: WHITE, ...SANS }}
              onMouseEnter={e => (e.currentTarget.style.background = GREEN_D)}
              onMouseLeave={e => (e.currentTarget.style.background = GREEN)}
            >Kontakt</button>
          </div>

          <button onClick={() => setOpen(o => !o)} className="md:hidden cursor-pointer" aria-label="Menü">
            {open ? <X size={22} color={TEXT} /> : <Menu size={22} color={TEXT} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col justify-center px-10"
            style={{ background: BG }}
          >
            {links.map(([l, id], i) => (
              <motion.button key={id} onClick={() => go(id)}
                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="cursor-pointer text-left py-5 border-b"
                style={{ ...SERIF, fontSize: '36px', fontWeight: 500, color: TEXT, borderColor: BORDER }}
              >{l}</motion.button>
            ))}
            <motion.a href="tel:015785767550"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="mt-10 flex items-center gap-2 text-sm font-semibold"
              style={{ ...SANS, color: GREEN }}
            ><Phone size={15} /> 01578 5767550</motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ── Hero — Clean, light, centered with organic shape ────────────────────── */
function Hero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ background: BG }}>
      {/* Soft organic blob behind */}
      <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-[700px] h-[700px] md:w-[900px] md:h-[900px] rounded-full opacity-40"
        style={{ background: `radial-gradient(circle, ${GREEN_L} 0%, transparent 70%)` }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 flex flex-col items-center justify-center text-center"
        style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="flex items-center gap-2.5 mb-10 px-5 py-2.5 rounded-full"
          style={{ background: GREEN_L, border: `1px solid ${GREEN}25` }}
        >
          <div className="w-2 h-2 rounded-full" style={{ background: GREEN }} />
          <span style={{ ...SANS, fontSize: '12px', fontWeight: 600, color: GREEN, letterSpacing: '0.06em' }}>
            Rhein-Main-Gebiet · Seit über 10 Jahren
          </span>
        </motion.div>

        {/* Heading */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '100%' }} animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              ...SERIF,
              fontSize: 'clamp(48px, 8vw, 96px)',
              fontWeight: 500,
              lineHeight: 1.08,
              color: TEXT,
              letterSpacing: '-0.025em',
            }}
          >
            Professionelle Pflege
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '100%' }} animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              ...SERIF,
              fontSize: 'clamp(48px, 8vw, 96px)',
              fontWeight: 500,
              lineHeight: 1.08,
              color: TEXT,
              letterSpacing: '-0.025em',
            }}
          >
            für Ihre <span style={{ color: GREEN, fontStyle: 'italic' }}>Bäume</span>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="mt-8 max-w-lg"
          style={{ ...SANS, fontSize: '17px', lineHeight: 1.75, color: MUTED }}
        >
          Baumpflege, Fällung und Seilklettertechnik — zuverlässig, sauber und fair.
          Ihr Fachbetrieb in Dietzenbach und Umgebung.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mt-10"
        >
          <button
            onClick={() => document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })}
            className="cursor-pointer flex items-center gap-2 font-semibold transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
            style={{
              ...SANS,
              fontSize: '14px',
              background: GREEN,
              color: WHITE,
              padding: '15px 32px',
              borderRadius: '50px',
              border: 'none',
            }}
          >Kostenloses Angebot <ArrowRight size={16} /></button>

          <a href="tel:015785767550"
            className="cursor-pointer flex items-center gap-2 font-semibold transition-all duration-300"
            style={{
              ...SANS,
              fontSize: '14px',
              color: TEXT,
              padding: '15px 32px',
              borderRadius: '50px',
              border: `1.5px solid ${BORDER}`,
              background: WHITE,
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = GREEN; e.currentTarget.style.color = GREEN }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = TEXT }}
          ><Phone size={15} /> Jetzt anrufen</a>
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="mt-16 flex flex-wrap justify-center gap-8"
        >
          {[
            { icon: Star, text: '5.0 Google Bewertung' },
            { icon: Clock, text: '10+ Jahre Erfahrung' },
            { icon: MapPin, text: 'Dietzenbach & Frankfurt' },
          ].map(item => (
            <div key={item.text} className="flex items-center gap-2">
              <item.icon size={14} color={GREEN} strokeWidth={2} />
              <span style={{ ...SANS, fontSize: '13px', color: MUTED, fontWeight: 500 }}>{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} color={MUTED} />
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ── Leistungen — 2×3 card grid with hover lift ──────────────────────────── */
const SERVICES = [
  { icon: TreePine,      name: 'Baumpflege',         desc: 'Vitalitätsschnitt und langfristige Kronenpflege für gesunde, sichere Bäume.' },
  { icon: Axe,           name: 'Baumfällung',        desc: 'Kontrollierte Fällung auf engstem Raum — sicher und präzise.' },
  { icon: Scissors,      name: 'Baumschnitt',        desc: 'Totholzentfernung und präziser Formschnitt nach fachlichen Standards.' },
  { icon: Leaf,          name: 'Heckenschnitt',      desc: 'Saisonale Pflege und Formschnitt für Hecken und Sträucher.' },
  { icon: Shovel,        name: 'Gartenarbeit',       desc: 'Grünflächenmanagement und saisonale Pflege für Ihren Garten.' },
  { icon: MoveVertical,  name: 'Seilklettertechnik', desc: 'Profi-Klettertechnik für höchste Bäume — unser Alleinstellungsmerkmal.', highlight: true },
]

function ServiceCard({ svc, index }: { svc: typeof SERVICES[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const Icon = svc.icon

  return (
    <Reveal delay={index * 0.08}>
      <div
        className="relative h-full p-8 md:p-10 rounded-2xl transition-all duration-400 cursor-default"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? WHITE : CARD,
          border: `1px solid ${hovered ? GREEN + '30' : BORDER}`,
          boxShadow: hovered ? '0 16px 48px rgba(74,124,89,0.1), 0 4px 12px rgba(0,0,0,0.04)' : '0 1px 3px rgba(0,0,0,0.02)',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        }}
      >
        {svc.highlight && (
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full"
            style={{ background: GREEN_L, ...SANS, fontSize: '10px', fontWeight: 600, color: GREEN, letterSpacing: '0.08em', textTransform: 'uppercase' }}
          >Spezialist</div>
        )}

        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300"
          style={{
            background: hovered ? GREEN : GREEN_L,
          }}
        >
          <Icon size={22} strokeWidth={1.6} color={hovered ? WHITE : GREEN} style={{ transition: 'color 0.3s' }} />
        </div>

        <h3 className="mb-3" style={{ ...SERIF, fontSize: '24px', fontWeight: 600, color: TEXT }}>{svc.name}</h3>
        <p style={{ ...SANS, fontSize: '14px', color: MUTED, lineHeight: 1.75 }}>{svc.desc}</p>
      </div>
    </Reveal>
  )
}

function Leistungen() {
  return (
    <section id="leistungen" className="py-24 md:py-32" style={{ background: BG }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Section header */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full"
              style={{ ...SANS, fontSize: '12px', fontWeight: 600, color: GREEN, background: GREEN_L, letterSpacing: '0.06em' }}
            >Unsere Leistungen</span>
            <h2 style={{
              ...SERIF,
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 500,
              color: TEXT,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}>Alles rund um Baum<br />und Garten</h2>
            <p className="mt-5" style={{ ...SANS, fontSize: '16px', color: MUTED, lineHeight: 1.7 }}>
              Von der schonenden Pflege bis zur sicheren Fällung — wir bieten das volle Programm für Bäume, Hecken und Grünflächen.
            </p>
          </div>
        </Reveal>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((svc, i) => (
            <ServiceCard key={svc.name} svc={svc} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Stats — Horizontal row of 3 clean cards ────────────────────────────── */
const STAT_DATA = [
  { target: 10, suffix: '+', label: 'Jahre Erfahrung', desc: 'Über ein Jahrzehnt Erfahrung im Rhein-Main-Gebiet.' },
  { target: 5, suffix: '.0', label: 'Google Bewertung', desc: 'Perfekte Bewertung — unser Standard.' },
  { target: 100, suffix: '%', label: 'Weiterempfehlung', desc: 'Jeder Kunde empfiehlt uns weiter.' },
]

function Stats() {
  return (
    <section className="py-20 md:py-24" style={{ background: DARK }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STAT_DATA.map((stat, i) => {
            const { count, ref } = useCounter(stat.target)
            return (
              <Reveal key={stat.label} delay={i * 0.12}>
                <div ref={ref} className="text-center py-10 md:py-14 px-6 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div className="flex items-baseline justify-center gap-1 mb-3">
                    <span style={{ ...SERIF, fontSize: 'clamp(52px, 8vw, 72px)', fontWeight: 600, color: WHITE, lineHeight: 1 }}>
                      {count}
                    </span>
                    <span style={{ ...SERIF, fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 500, color: '#8BC49A' }}>
                      {stat.suffix}
                    </span>
                  </div>
                  <p style={{ ...SANS, fontSize: '14px', fontWeight: 600, color: WHITE, letterSpacing: '0.04em', marginBottom: '8px' }}>
                    {stat.label}
                  </p>
                  <p style={{ ...SANS, fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                    {stat.desc}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ── Über Uns — Asymmetric two-column layout ─────────────────────────────── */
const INFO_ITEMS = [
  { icon: TreePine,     label: 'Saubere Arbeitsweise', desc: 'Pünktlich, sicher und sauber — jeder Auftrag mit vollem Einsatz.' },
  { icon: MapPin,       label: 'Rhein-Main-Gebiet', desc: 'Dietzenbach, Frankfurt, Offenbach und das gesamte Rhein-Main-Gebiet.' },
  { icon: MoveVertical, label: 'Seilklettertechnik', desc: 'Profi-Klettertechnik für höchste Bäume und enge Platzverhältnisse.' },
  { icon: Leaf,         label: 'Unsere Garantie', desc: 'Wir hinterlassen Ihren Garten sauberer als wir ihn vorgefunden haben.' },
]

function UeberUns() {
  return (
    <section id="ueber" className="py-24 md:py-32" style={{ background: BG }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — Text content */}
          <div>
            <Reveal>
              <span className="inline-block mb-5 px-4 py-1.5 rounded-full"
                style={{ ...SANS, fontSize: '12px', fontWeight: 600, color: GREEN, background: GREEN_L, letterSpacing: '0.06em' }}
              >Über uns</span>

              <h2 className="mb-8" style={{
                ...SERIF,
                fontSize: 'clamp(36px, 5vw, 52px)',
                fontWeight: 500,
                color: TEXT,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
              }}>
                Ihr Fachbetrieb für<br />Baumpflege seit über<br /><span style={{ color: GREEN, fontStyle: 'italic' }}>10 Jahren</span>
              </h2>

              <p className="mb-6" style={{ ...SANS, fontSize: '16px', color: MUTED, lineHeight: 1.8 }}>
                Mit über 10 Jahren Erfahrung im Bereich Baumpflege und Fällung steht Thomas Morgan
                für Fachkompetenz, Zuverlässigkeit und faire Preise — als Fachbetrieb mit Seilklettertechnik
                auch für anspruchsvollste Einsätze ausgerüstet.
              </p>
            </Reveal>

            {/* Quote */}
            <Reveal delay={0.15}>
              <div className="p-8 rounded-2xl mt-8" style={{ background: GREEN_L, border: `1px solid ${GREEN}20` }}>
                <blockquote style={{ ...SERIF, fontSize: '22px', fontWeight: 500, fontStyle: 'italic', color: TEXT, lineHeight: 1.55 }}>
                  "Jeder Baum erzählt eine Geschichte. Wir sorgen dafür, dass sie weitergeht."
                </blockquote>
                <div className="flex items-center gap-3 mt-5">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: GREEN }}>
                    <span style={{ ...SANS, fontSize: '14px', fontWeight: 600, color: WHITE }}>TM</span>
                  </div>
                  <div>
                    <p style={{ ...SANS, fontSize: '14px', fontWeight: 600, color: TEXT }}>Thomas Morgan</p>
                    <p style={{ ...SANS, fontSize: '12px', color: MUTED }}>Inhaber & Kletterer</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right — Info cards in a 2×2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:mt-16">
            {INFO_ITEMS.map((item, i) => {
              const Icon = item.icon
              return (
                <Reveal key={item.label} delay={i * 0.1}>
                  <div className="h-full p-7 rounded-2xl" style={{ background: WHITE, border: `1px solid ${BORDER}` }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
                      style={{ background: GREEN_L }}
                    >
                      <Icon size={18} strokeWidth={1.8} color={GREEN} />
                    </div>
                    <h4 className="mb-2" style={{ ...SANS, fontSize: '15px', fontWeight: 600, color: TEXT }}>{item.label}</h4>
                    <p style={{ ...SANS, fontSize: '13px', color: MUTED, lineHeight: 1.7 }}>{item.desc}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Testimonials — Horizontal scroll carousel ───────────────────────────── */
const REVIEWS = [
  { name: 'Verena Ehlers',  text: 'Herr Morgan war sehr freundlich, zuverlässig und professionell. Wir sind rundum zufrieden!' },
  { name: 'Marius Klein',   text: 'Thomas Morgan ist überaus empfehlenswert — kompetent, zuverlässig und professionell erledigt.' },
  { name: 'Elayne Chapman', text: 'Hervorragende Arbeit, alles sauber hinterlassen. Pünktlich, fair und freundlich — absolut zu empfehlen!' },
  { name: 'Monique Tauber', text: 'Kompetent, fair, freundlich und motiviert. Hat schnell und sauber gearbeitet. Jederzeit wieder!' },
  { name: 'Robert Collina', text: 'Sehr zuverlässig — wir arbeiten schon seit Jahren nur mit Tom und seinem Team zusammen.' },
]

function Referenzen() {
  const scrollRef = useRef<HTMLDivElement>(null)

  function scroll(dir: number) {
    scrollRef.current?.scrollBy({ left: dir * 380, behavior: 'smooth' })
  }

  return (
    <section id="referenzen" className="py-24 md:py-32" style={{ background: CARD }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Header with arrows */}
        <Reveal>
          <div className="flex items-end justify-between mb-12 md:mb-16">
            <div>
              <span className="inline-block mb-4 px-4 py-1.5 rounded-full"
                style={{ ...SANS, fontSize: '12px', fontWeight: 600, color: GREEN, background: GREEN_L, letterSpacing: '0.06em' }}
              >Kundenstimmen</span>
              <h2 style={{
                ...SERIF,
                fontSize: 'clamp(36px, 5vw, 52px)',
                fontWeight: 500,
                color: TEXT,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
              }}>Was unsere Kunden sagen</h2>
            </div>
            <div className="hidden md:flex gap-2">
              <button onClick={() => scroll(-1)}
                className="cursor-pointer w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ background: WHITE, border: `1px solid ${BORDER}` }}
                onMouseEnter={e => { e.currentTarget.style.background = GREEN; e.currentTarget.style.borderColor = GREEN }}
                onMouseLeave={e => { e.currentTarget.style.background = WHITE; e.currentTarget.style.borderColor = BORDER }}
              ><ChevronLeft size={18} /></button>
              <button onClick={() => scroll(1)}
                className="cursor-pointer w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ background: WHITE, border: `1px solid ${BORDER}` }}
                onMouseEnter={e => { e.currentTarget.style.background = GREEN; e.currentTarget.style.borderColor = GREEN }}
                onMouseLeave={e => { e.currentTarget.style.background = WHITE; e.currentTarget.style.borderColor = BORDER }}
              ><ChevronRight size={18} /></button>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Scrollable cards */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto hide-scrollbar px-6 md:px-10 pb-4"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {/* Left spacer for centering on large screens */}
        <div className="shrink-0 hidden lg:block" style={{ width: 'calc((100vw - 1152px) / 2 - 16px)' }} />

        {REVIEWS.map((review, i) => (
          <Reveal key={review.name} delay={i * 0.08}>
            <div
              className="shrink-0 flex flex-col justify-between p-8 md:p-9 rounded-2xl"
              style={{
                width: '340px',
                minHeight: '240px',
                background: WHITE,
                border: `1px solid ${BORDER}`,
                scrollSnapAlign: 'start',
              }}
            >
              {/* Stars */}
              <div>
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} fill="#F5B731" color="#F5B731" />
                  ))}
                </div>
                <p style={{ ...SANS, fontSize: '15px', color: TEXT_2, lineHeight: 1.7 }}>
                  "{review.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 mt-6 pt-5" style={{ borderTop: `1px solid ${BORDER}` }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: GREEN_L }}
                >
                  <span style={{ ...SANS, fontSize: '12px', fontWeight: 600, color: GREEN }}>
                    {review.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p style={{ ...SANS, fontSize: '13px', fontWeight: 600, color: TEXT }}>{review.name}</p>
                  <p style={{ ...SANS, fontSize: '11px', color: MUTED }}>Google Rezension</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}

        {/* Right spacer */}
        <div className="shrink-0 w-6 md:w-10" />
      </div>
    </section>
  )
}

/* ── Kontakt — Clean centered form card ──────────────────────────────────── */
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
  const [message, setMessage] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    alert('Vielen Dank! Wir melden uns innerhalb von 24 Stunden.')
  }

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    background: BG,
    border: `1px solid ${BORDER}`,
    borderRadius: '12px',
    color: TEXT,
    ...SANS,
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  }

  function focusStyle(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    e.currentTarget.style.borderColor = GREEN
    e.currentTarget.style.boxShadow = `0 0 0 3px ${GREEN}15`
  }
  function blurStyle(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    e.currentTarget.style.borderColor = BORDER
    e.currentTarget.style.boxShadow = 'none'
  }

  return (
    <section id="kontakt" className="py-24 md:py-32" style={{ background: BG }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

          {/* Left — Info */}
          <div className="lg:col-span-2">
            <Reveal>
              <span className="inline-block mb-5 px-4 py-1.5 rounded-full"
                style={{ ...SANS, fontSize: '12px', fontWeight: 600, color: GREEN, background: GREEN_L, letterSpacing: '0.06em' }}
              >Kontakt</span>

              <h2 className="mb-6" style={{
                ...SERIF,
                fontSize: 'clamp(36px, 5vw, 48px)',
                fontWeight: 500,
                color: TEXT,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
              }}>
                Sprechen Sie<br />uns an
              </h2>

              <p className="mb-10" style={{ ...SANS, fontSize: '15px', color: MUTED, lineHeight: 1.75 }}>
                Kostenlose Erstberatung und unverbindliches Angebot — wir melden uns innerhalb von 24 Stunden.
              </p>
            </Reveal>

            {/* Contact info */}
            <Reveal delay={0.1}>
              <a href="tel:015785767550"
                className="flex items-center gap-4 mb-5 p-5 rounded-xl transition-all duration-200"
                style={{ background: WHITE, border: `1px solid ${BORDER}` }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = GREEN + '40')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = BORDER)}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: GREEN_L }}
                >
                  <Phone size={17} color={GREEN} strokeWidth={1.8} />
                </div>
                <div>
                  <p style={{ ...SANS, fontSize: '13px', color: MUTED, marginBottom: '2px' }}>Telefon</p>
                  <p style={{ ...SANS, fontSize: '16px', fontWeight: 600, color: TEXT }}>01578 5767550</p>
                </div>
              </a>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex items-center gap-4 p-5 rounded-xl"
                style={{ background: WHITE, border: `1px solid ${BORDER}` }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: GREEN_L }}
                >
                  <MapPin size={17} color={GREEN} strokeWidth={1.8} />
                </div>
                <div>
                  <p style={{ ...SANS, fontSize: '13px', color: MUTED, marginBottom: '2px' }}>Adresse</p>
                  <p style={{ ...SANS, fontSize: '15px', fontWeight: 600, color: TEXT }}>Berliner Str. 26–28, 63128 Dietzenbach</p>
                </div>
              </div>
            </Reveal>

            {/* Opening hours */}
            <Reveal delay={0.2}>
              <div className="mt-8 p-6 rounded-xl" style={{ background: WHITE, border: `1px solid ${BORDER}` }}>
                <div className="flex items-center gap-2 mb-5">
                  <Clock size={15} color={GREEN} strokeWidth={1.8} />
                  <span style={{ ...SANS, fontSize: '13px', fontWeight: 600, color: TEXT }}>Öffnungszeiten</span>
                </div>
                <div className="flex flex-col gap-3">
                  {HOURS.map(([day, time]) => (
                    <div key={day} className="flex justify-between items-center">
                      <span style={{ ...SANS, fontSize: '13px', color: MUTED }}>{day}</span>
                      <span style={{
                        ...SANS,
                        fontSize: '13px',
                        fontWeight: time === 'Geschlossen' ? 400 : 600,
                        color: time === 'Geschlossen' ? MUTED : TEXT,
                      }}>{time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right — Form card */}
          <div className="lg:col-span-3">
            <Reveal delay={0.1}>
              <div className="p-8 md:p-10 rounded-2xl" style={{ background: WHITE, border: `1px solid ${BORDER}`, boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
                <h3 className="mb-2" style={{ ...SERIF, fontSize: '26px', fontWeight: 600, color: TEXT }}>
                  Kostenloses Angebot anfragen
                </h3>
                <p className="mb-8" style={{ ...SANS, fontSize: '14px', color: MUTED }}>
                  Füllen Sie das Formular aus — wir antworten schnell.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label style={{ ...SANS, fontSize: '12px', fontWeight: 600, color: TEXT_2, display: 'block', marginBottom: '6px' }}>
                        Name *
                      </label>
                      <input type="text" placeholder="Ihr Name" required value={name} onChange={e => setName(e.target.value)}
                        style={inputStyle} onFocus={focusStyle} onBlur={blurStyle}
                      />
                    </div>
                    <div>
                      <label style={{ ...SANS, fontSize: '12px', fontWeight: 600, color: TEXT_2, display: 'block', marginBottom: '6px' }}>
                        Telefon
                      </label>
                      <input type="tel" placeholder="Telefonnummer" value={phone} onChange={e => setPhone(e.target.value)}
                        style={inputStyle} onFocus={focusStyle} onBlur={blurStyle}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ ...SANS, fontSize: '12px', fontWeight: 600, color: TEXT_2, display: 'block', marginBottom: '6px' }}>
                      Leistung
                    </label>
                    <div style={{ position: 'relative' }}>
                      <select value={selectVal} onChange={e => setSelectVal(e.target.value)}
                        style={{
                          ...inputStyle,
                          appearance: 'none',
                          color: selectVal ? TEXT : MUTED,
                          paddingRight: '40px',
                        }}
                        onFocus={focusStyle} onBlur={blurStyle}
                      >
                        <option value="" disabled>Leistung wählen…</option>
                        {['Baumpflege','Baumfällung','Baumschnitt','Heckenschnitt','Gartenarbeit','Seilklettertechnik','Sonstiges'].map(o => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                      <ChevronDown size={16} color={MUTED} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                    </div>
                  </div>

                  <div>
                    <label style={{ ...SANS, fontSize: '12px', fontWeight: 600, color: TEXT_2, display: 'block', marginBottom: '6px' }}>
                      Nachricht
                    </label>
                    <textarea placeholder="Beschreiben Sie Ihr Anliegen…" rows={4} value={message} onChange={e => setMessage(e.target.value)}
                      style={{ ...inputStyle, resize: 'none' } as React.CSSProperties}
                      onFocus={focusStyle as any} onBlur={blurStyle as any}
                    />
                  </div>

                  <button type="submit"
                    className="cursor-pointer w-full font-semibold transition-all duration-300 hover:shadow-lg mt-2"
                    style={{
                      ...SANS,
                      fontSize: '15px',
                      background: GREEN,
                      color: WHITE,
                      padding: '16px',
                      borderRadius: '12px',
                      border: 'none',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = GREEN_D)}
                    onMouseLeave={e => (e.currentTarget.style.background = GREEN)}
                  >
                    Anfrage senden
                  </button>

                  <p className="text-center" style={{ ...SANS, fontSize: '12px', color: MUTED, marginTop: '4px' }}>
                    Kostenlos & unverbindlich · Antwort innerhalb von 24 Stunden
                  </p>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Footer ──────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: DARK }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 pb-8"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: GREEN }}>
              <TreePine size={13} color={WHITE} strokeWidth={2} />
            </div>
            <span style={{ ...SERIF, fontSize: '18px', fontWeight: 600, color: WHITE }}>
              Baumpflege Morgan
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {['Leistungen','Über uns','Referenzen','Kontakt'].map(l => (
              <button key={l}
                onClick={() => document.getElementById(l === 'Über uns' ? 'ueber' : l.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                className="cursor-pointer text-sm transition-colors duration-200"
                style={{ ...SANS, color: 'rgba(255,255,255,0.4)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
              >{l}</button>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span style={{ ...SANS, fontSize: '13px', color: 'rgba(255,255,255,0.25)' }}>
            © 2025 Baumpflege Morgan · Alle Rechte vorbehalten
          </span>
          <span style={{ ...SANS, fontSize: '12px', color: 'rgba(255,255,255,0.15)' }}>
            Webdesign by <span style={{ color: 'rgba(74,124,89,0.7)' }}>Open Visual</span>
          </span>
          <div className="flex gap-5">
            {['Impressum','Datenschutz'].map(l => (
              <a key={l} href="#"
                className="text-xs transition-colors duration-200"
                style={{ ...SANS, color: 'rgba(255,255,255,0.25)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}
              >{l}</a>
            ))}
          </div>
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
