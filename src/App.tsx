import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  TreePine, Axe, Scissors, Leaf, Shovel, MoveVertical,
  Phone, MapPin, Clock, Menu, X, ChevronDown, Star,
} from 'lucide-react'

/* ─── Grain overlay ─────────────────────────────────────────────────────────── */
function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.04]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '180px 180px',
      }}
    />
  )
}

/* ─── Scroll-triggered fade-up ──────────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════════════════════════════════ */
function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const links = [
    { label: 'Leistungen', href: '#leistungen' },
    { label: 'Über uns', href: '#ueber-uns' },
    { label: 'Referenzen', href: '#referenzen' },
    { label: 'Kontakt', href: '#kontakt' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#F5EFE6]/95 backdrop-blur-sm' : 'bg-[#F5EFE6]'
      } border-b border-[#DDD5C4]`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 cursor-pointer group">
          <span
            className="font-['Lora'] italic text-[#2C1F14] text-lg leading-none tracking-tight
                       group-hover:text-[#5C7A3E] transition-colors duration-200"
          >
            Morgan
          </span>
          <span className="w-px h-4 bg-[#DDD5C4]" />
          <span className="font-['Cabin'] text-[11px] uppercase tracking-[0.18em] text-[#9B8E7F]">
            Baumpflege
          </span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-['Cabin'] text-[11px] uppercase tracking-[0.16em] text-[#9B8E7F]
                         hover:text-[#2C1F14] transition-colors duration-200 cursor-pointer"
            >
              {l.label}
            </a>
          ))}
          <a
            href="tel:015785767550"
            className="font-['Cabin'] text-[11px] uppercase tracking-[0.16em] bg-[#2C1F14]
                       text-[#F5EFE6] px-4 py-2 hover:bg-[#5C7A3E] transition-colors duration-200 cursor-pointer"
          >
            Anrufen
          </a>
        </div>

        <button
          className="md:hidden text-[#2C1F14] cursor-pointer p-1"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menü"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden overflow-hidden border-t border-[#DDD5C4] bg-[#F5EFE6]"
          >
            <div className="px-6 py-5 flex flex-col gap-5">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-['Cabin'] text-xs uppercase tracking-widest text-[#9B8E7F]
                             hover:text-[#2C1F14] transition-colors duration-200 cursor-pointer"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="tel:015785767550"
                className="font-['Cabin'] text-xs uppercase tracking-widest text-[#F5EFE6]
                           bg-[#2C1F14] px-4 py-3 text-center hover:bg-[#5C7A3E] transition-colors duration-200"
              >
                Jetzt anrufen
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative min-h-screen bg-[#F5EFE6] flex flex-col justify-center overflow-hidden pt-[72px]">
      <div className="absolute left-0 top-0 h-full w-px bg-[#DDD5C4] hidden lg:block" />

      <div className="max-w-6xl mx-auto px-6 md:px-10 w-full py-24 md:py-36">
        {/* Top label */}
        <motion.p
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-['Cabin'] text-[11px] uppercase tracking-[0.25em] text-[#9B8E7F] mb-10 flex items-center gap-3"
        >
          <span className="inline-block w-8 h-px bg-[#9B8E7F]" />
          Dietzenbach &amp; Rhein-Main — Seit über 10 Jahren
        </motion.p>

        {/* Main headline — staggered lines */}
        <div>
          {[
            { text: 'Professionelle', delay: 0.2 },
            { text: 'Pflege für Ihre', delay: 0.32 },
          ].map(({ text, delay }) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="font-['Lora'] font-bold text-[clamp(3rem,9vw,8rem)] leading-[0.95] text-[#2C1F14] tracking-tight">
                {text}
              </h1>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-['Lora'] font-bold italic text-[clamp(3rem,9vw,8rem)] leading-[0.95] text-[#5C7A3E] tracking-tight">
              Bäume.
            </h1>
          </motion.div>
        </div>

        {/* Subline + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-12 max-w-lg"
        >
          <p className="font-['Cabin'] text-base leading-relaxed text-[#9B8E7F]">
            Baumpflege, Fällung und Seilklettertechnik — zuverlässig, sauber
            und fair. Ihr Fachbetrieb im Rhein-Main-Gebiet.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="tel:015785767550"
              className="font-['Cabin'] text-sm uppercase tracking-wider
                         bg-[#2C1F14] text-[#F5EFE6] px-8 py-4
                         hover:bg-[#5C7A3E] transition-colors duration-300 cursor-pointer
                         flex items-center gap-3 justify-center sm:justify-start"
            >
              <Phone size={15} />
              Jetzt anrufen
            </a>
            <a
              href="#leistungen"
              className="font-['Cabin'] text-sm uppercase tracking-wider
                         border border-[#2C1F14] text-[#2C1F14] px-8 py-4
                         hover:bg-[#2C1F14] hover:text-[#F5EFE6] transition-colors duration-300 cursor-pointer
                         flex items-center gap-3 justify-center sm:justify-start"
            >
              Unsere Leistungen
            </a>
          </div>
        </motion.div>

        {/* Bottom info bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-20 pt-8 border-t border-[#DDD5C4] flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10"
        >
          <span className="font-['Cabin'] text-xs text-[#9B8E7F] flex items-center gap-2">
            <MapPin size={12} />
            Berliner Str. 26–28, 63128 Dietzenbach
          </span>
          <span className="font-['Cabin'] text-xs text-[#9B8E7F] flex items-center gap-2">
            <Clock size={12} />
            Mo–Fr 08:00 – 18:00 · Sa 08:00 – 14:00
          </span>
          <span className="font-['Cabin'] text-xs text-[#9B8E7F] flex items-center gap-2">
            <Star size={12} />
            5.0 Google Bewertung
          </span>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#9B8E7F] cursor-pointer"
        animate={{ y: [0, 7, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <ChevronDown size={18} />
      </motion.div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   LEISTUNGEN
   ═══════════════════════════════════════════════════════════════════════════════ */
const services = [
  {
    num: '01',
    icon: TreePine,
    title: 'Baumpflege',
    body: 'Vitalitätsschnitt und langfristige Kronenpflege für gesunde, sichere Bäume — fachgerecht und nachhaltig.',
  },
  {
    num: '02',
    icon: Axe,
    title: 'Baumfällung',
    body: 'Kontrollierte Fällung auf engstem Raum — sicher und präzise, auch in schwierigen Situationen.',
  },
  {
    num: '03',
    icon: Scissors,
    title: 'Baumschnitt',
    body: 'Totholzentfernung und präziser Formschnitt nach fachlichen Standards für langfristige Baumgesundheit.',
  },
  {
    num: '04',
    icon: Leaf,
    title: 'Heckenschnitt',
    body: 'Saisonale Pflege und Formschnitt für Hecken und Sträucher — sauber und termingerecht.',
  },
  {
    num: '05',
    icon: Shovel,
    title: 'Gartenarbeit',
    body: 'Grünflächenmanagement und saisonale Pflege für Ihren Garten — das ganze Jahr über.',
  },
  {
    num: '06',
    icon: MoveVertical,
    title: 'Seilklettertechnik',
    body: 'Profi-Klettertechnik für höchste Bäume — unser Alleinstellungsmerkmal für anspruchsvollste Einsätze.',
    special: true,
  },
]

function Leistungen() {
  return (
    <section id="leistungen" className="bg-[#2C1F14] py-28 md:py-40">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Section header */}
        <Reveal>
          <div className="flex items-end justify-between mb-16 md:mb-20 border-b border-[#4A3728] pb-8">
            <div>
              <p className="font-['Cabin'] text-[11px] uppercase tracking-[0.22em] text-[#5C7A3E] mb-3">
                Leistungen
              </p>
              <h2 className="font-['Lora'] font-bold text-[clamp(2rem,5vw,3.5rem)] text-[#F5EFE6] leading-tight">
                Was wir für Sie tun
              </h2>
            </div>
            <a
              href="tel:015785767550"
              className="hidden sm:flex items-center gap-2 font-['Cabin'] text-xs uppercase tracking-wider
                         text-[#5C7A3E] border border-[#5C7A3E] px-5 py-3
                         hover:bg-[#5C7A3E] hover:text-[#F5EFE6] transition-colors duration-200 cursor-pointer"
            >
              <Phone size={13} />
              Anrufen
            </a>
          </div>
        </Reveal>

        {/* Cards — 3-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#4A3728]">
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <Reveal key={s.num} delay={i * 0.06}>
                <div
                  className="bg-[#2C1F14] p-8 md:p-10 group
                             hover:bg-[#362818] transition-colors duration-300 cursor-default h-full"
                >
                  <div className="flex items-start justify-between mb-8">
                    <span className="font-['Lora'] italic font-bold text-5xl text-[#4A3728] leading-none select-none">
                      {s.num}
                    </span>
                    <div className="flex items-center gap-2">
                      {s.special && (
                        <span className="font-['Cabin'] text-[9px] uppercase tracking-[0.12em] text-[#5C7A3E] border border-[#5C7A3E]/30 px-2 py-0.5">
                          Spezialist
                        </span>
                      )}
                      <Icon
                        size={20}
                        className="text-[#5C7A3E] mt-1 group-hover:scale-110 transition-transform duration-200"
                      />
                    </div>
                  </div>
                  <h3 className="font-['Lora'] font-bold text-xl text-[#F5EFE6] mb-3">
                    {s.title}
                  </h3>
                  <p className="font-['Cabin'] text-sm leading-relaxed text-[#9B8E7F]">
                    {s.body}
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

/* ═══════════════════════════════════════════════════════════════════════════════
   ÜBER UNS
   ═══════════════════════════════════════════════════════════════════════════════ */
function UeberUns() {
  return (
    <section id="ueber-uns" className="bg-[#EDE5D8] py-28 md:py-40">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left: big name */}
          <Reveal>
            <p className="font-['Cabin'] text-[11px] uppercase tracking-[0.22em] text-[#9B8E7F] mb-4">
              Über uns
            </p>
            <h2 className="font-['Lora'] font-bold text-[clamp(2.5rem,6vw,5rem)] text-[#2C1F14] leading-[1.05]">
              Thomas<br />
              <span className="italic text-[#5C7A3E]">Morgan.</span>
            </h2>

            <div className="mt-10 flex flex-col gap-2">
              <div className="flex items-center gap-3 border-t border-[#DDD5C4] py-4">
                <span className="font-['Cabin'] font-semibold text-xs uppercase tracking-widest text-[#2C1F14]">
                  Dietzenbach & Rhein-Main-Gebiet
                </span>
              </div>
              <div className="flex items-center gap-3 border-t border-[#DDD5C4] py-4">
                <span className="font-['Cabin'] font-semibold text-xs uppercase tracking-widest text-[#2C1F14]">
                  Seilklettertechnik
                </span>
              </div>
              <div className="flex items-center gap-3 border-t border-[#DDD5C4] py-4">
                <span className="font-['Cabin'] font-semibold text-xs uppercase tracking-widest text-[#2C1F14]">
                  Über 10 Jahre Erfahrung
                </span>
              </div>
              <div className="border-t border-[#DDD5C4]" />
            </div>
          </Reveal>

          {/* Right: text */}
          <Reveal delay={0.12}>
            <div className="md:pt-14">
              <p className="font-['Cabin'] text-base leading-[1.85] text-[#6B5D4F]">
                Mit über 10 Jahren Erfahrung im Bereich Baumpflege und Fällung
                steht Thomas Morgan für Fachkompetenz, Zuverlässigkeit und faire
                Preise — als Fachbetrieb mit Seilklettertechnik auch für
                anspruchsvollste Einsätze ausgerüstet.
              </p>
              <p className="font-['Cabin'] text-base leading-[1.85] text-[#6B5D4F] mt-5">
                Einsatzgebiet: Dietzenbach, Frankfurt, Offenbach und das gesamte
                Rhein-Main-Gebiet. Jeder Auftrag wird mit Sorgfalt und
                Zuverlässigkeit ausgeführt — persönlich, verlässlich, fachgerecht.
              </p>

              <a
                href="#kontakt"
                className="mt-10 inline-flex items-center gap-3 font-['Cabin'] text-xs uppercase
                           tracking-widest text-[#5C7A3E] border-b border-[#5C7A3E] pb-1
                           hover:text-[#2C1F14] hover:border-[#2C1F14] transition-colors duration-200 cursor-pointer"
              >
                Kontakt aufnehmen
                <span className="text-base leading-none">→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   REFERENZEN
   ═══════════════════════════════════════════════════════════════════════════════ */
const reviews = [
  { name: 'Verena Ehlers', text: 'Herr Morgan war sehr freundlich, zuverlässig und professionell. Wir sind rundum zufrieden!' },
  { name: 'Marius Klein', text: 'Thomas Morgan ist überaus empfehlenswert — kompetent, zuverlässig und professionell erledigt.' },
  { name: 'Elayne Chapman', text: 'Hervorragende Arbeit, alles sauber hinterlassen. Pünktlich, fair und freundlich — absolut zu empfehlen!' },
  { name: 'Monique Tauber', text: 'Kompetent, fair, freundlich und motiviert. Hat schnell und sauber gearbeitet. Jederzeit wieder!' },
  { name: 'Robert Collina', text: 'Sehr zuverlässig — wir arbeiten schon seit Jahren nur mit Tom und seinem Team zusammen.' },
]

function Referenzen() {
  return (
    <section id="referenzen" className="bg-[#F5EFE6] py-28 md:py-40">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <Reveal>
          <div className="flex items-end justify-between mb-16 md:mb-20 border-b border-[#DDD5C4] pb-8">
            <div>
              <p className="font-['Cabin'] text-[11px] uppercase tracking-[0.22em] text-[#5C7A3E] mb-3">
                Referenzen
              </p>
              <h2 className="font-['Lora'] font-bold text-[clamp(2rem,5vw,3.5rem)] text-[#2C1F14] leading-tight">
                Was unsere Kunden sagen
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="#D4A836" color="#D4A836" />
              ))}
              <span className="font-['Cabin'] text-xs font-semibold text-[#2C1F14] ml-2">5.0</span>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#DDD5C4]">
          {reviews.slice(0, 3).map((r, i) => (
            <Reveal key={r.name} delay={i * 0.07}>
              <div className="bg-[#F5EFE6] p-8 h-full flex flex-col group hover:bg-[#EDE5D8] transition-colors duration-300">
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={12} fill="#D4A836" color="#D4A836" />
                  ))}
                </div>
                <p className="font-['Cabin'] text-sm leading-[1.8] text-[#6B5D4F] flex-1">
                  „{r.text}"
                </p>
                <div className="mt-6 pt-5 border-t border-[#DDD5C4] flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#2C1F14] flex items-center justify-center shrink-0">
                    <span className="font-['Cabin'] text-[10px] font-bold text-[#F5EFE6]">
                      {r.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-['Cabin'] text-xs font-semibold text-[#2C1F14]">{r.name}</p>
                    <p className="font-['Cabin'] text-[11px] text-[#9B8E7F]">Google Rezension</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#DDD5C4] mt-px">
          {reviews.slice(3).map((r, i) => (
            <Reveal key={r.name} delay={(i + 3) * 0.07}>
              <div className="bg-[#F5EFE6] p-8 h-full flex flex-col group hover:bg-[#EDE5D8] transition-colors duration-300">
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={12} fill="#D4A836" color="#D4A836" />
                  ))}
                </div>
                <p className="font-['Cabin'] text-sm leading-[1.8] text-[#6B5D4F] flex-1">
                  „{r.text}"
                </p>
                <div className="mt-6 pt-5 border-t border-[#DDD5C4] flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#2C1F14] flex items-center justify-center shrink-0">
                    <span className="font-['Cabin'] text-[10px] font-bold text-[#F5EFE6]">
                      {r.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-['Cabin'] text-xs font-semibold text-[#2C1F14]">{r.name}</p>
                    <p className="font-['Cabin'] text-[11px] text-[#9B8E7F]">Google Rezension</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   KONTAKT
   ═══════════════════════════════════════════════════════════════════════════════ */
const hours = [
  ['Mo–Mi', '08:00 – 18:00'],
  ['Donnerstag', '08:00 – 18:00'],
  ['Freitag', '08:00 – 17:00'],
  ['Samstag', '08:00 – 14:00'],
  ['Sonntag', 'Geschlossen'],
]

function Kontakt() {
  return (
    <section id="kontakt" className="bg-[#2C1F14] py-28 md:py-40">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <Reveal>
          <p className="font-['Cabin'] text-[11px] uppercase tracking-[0.22em] text-[#5C7A3E] mb-4">
            Kontakt
          </p>
          <h2 className="font-['Lora'] font-bold text-[clamp(2rem,5vw,3.5rem)] text-[#F5EFE6] leading-tight mb-16">
            Sprechen Sie uns an.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Left: big phone */}
          <Reveal>
            <div>
              <p className="font-['Cabin'] text-xs uppercase tracking-widest text-[#9B8E7F] mb-4">
                Telefon
              </p>
              <a
                href="tel:015785767550"
                className="font-['Lora'] font-bold text-[clamp(1.8rem,5vw,3.2rem)] text-[#F5EFE6]
                           hover:text-[#5C7A3E] transition-colors duration-200 cursor-pointer leading-tight block"
              >
                01578 5767550
              </a>
              <p className="font-['Cabin'] text-sm text-[#9B8E7F] mt-3">
                Rufen Sie einfach an — wir sind für Sie da.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-start gap-5">
                <a
                  href="tel:015785767550"
                  className="inline-flex items-center gap-3 font-['Cabin'] text-sm uppercase
                             tracking-wider bg-[#F5EFE6] text-[#2C1F14] px-8 py-4
                             hover:bg-[#5C7A3E] hover:text-[#F5EFE6] transition-colors duration-300 cursor-pointer"
                >
                  <Phone size={15} />
                  Jetzt anrufen
                </a>

                <a
                  href="#kontakt"
                  onClick={(e) => {
                    e.preventDefault()
                    const subject = encodeURIComponent('Anfrage über Website')
                    window.location.href = `mailto:?subject=${subject}`
                  }}
                  className="inline-flex items-center gap-3 font-['Cabin'] text-xs uppercase
                             tracking-widest text-[#5C7A3E] border-b border-[#5C7A3E] pb-1 sm:mt-3
                             hover:text-[#F5EFE6] hover:border-[#F5EFE6] transition-colors duration-200 cursor-pointer"
                >
                  Kostenloses Angebot anfragen
                  <span className="text-base leading-none">→</span>
                </a>
              </div>
            </div>
          </Reveal>

          {/* Right: address + hours */}
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-10">
              <div>
                <p className="font-['Cabin'] text-xs uppercase tracking-widest text-[#9B8E7F] mb-3">
                  Adresse
                </p>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-[#5C7A3E] mt-0.5 shrink-0" />
                  <div>
                    <p className="font-['Cabin'] text-sm text-[#F5EFE6]">
                      Berliner Str. 26–28
                    </p>
                    <p className="font-['Cabin'] text-sm text-[#F5EFE6]">
                      63128 Dietzenbach
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-['Cabin'] text-xs uppercase tracking-widest text-[#9B8E7F] mb-3">
                  Öffnungszeiten
                </p>
                <div className="flex flex-col gap-0">
                  {hours.map(([day, time]) => (
                    <div key={day} className="flex items-center justify-between py-2.5 border-t border-[#4A3728]">
                      <span className="font-['Cabin'] text-sm text-[#9B8E7F]">{day}</span>
                      <span className={`font-['Cabin'] text-sm ${time === 'Geschlossen' ? 'text-[#9B8E7F]' : 'text-[#F5EFE6] font-semibold'}`}>
                        {time}
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-[#4A3728]" />
                </div>
              </div>

              <div className="border-t border-[#4A3728] pt-8">
                <p className="font-['Cabin'] text-xs text-[#9B8E7F] leading-relaxed">
                  Baumpflege Morgan — Thomas Morgan<br />
                  Professionelle Baumpflege, Fällung und Seilklettertechnik.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="bg-[#231A10] py-10 border-t border-[#4A3728]">
      <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-['Cabin'] text-xs text-[#6B5D4F]">
          © 2025 Baumpflege Morgan · Dietzenbach
        </span>
        <span className="font-['Cabin'] text-xs text-[#6B5D4F]">
          Webdesign by <span className="text-[#5C7A3E]">Open Visual</span>
        </span>
        <div className="flex gap-6">
          {['Impressum', 'Datenschutz'].map((l) => (
            <a
              key={l}
              href="#"
              className="font-['Cabin'] text-xs text-[#6B5D4F] hover:text-[#9B8E7F] transition-colors duration-200 cursor-pointer"
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <>
      <GrainOverlay />
      <Navbar />
      <Hero />
      <Leistungen />
      <UeberUns />
      <Referenzen />
      <Kontakt />
      <Footer />
    </>
  )
}
