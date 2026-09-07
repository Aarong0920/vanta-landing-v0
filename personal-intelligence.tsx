import { Reveal } from './reveal'

const STATS = [
  { label: 'Profit / Loss', value: '+$3,136.02', tone: 'text-emerald-400' },
  { label: 'ROI', value: '+12.4%', tone: 'text-emerald-400' },
  { label: 'Win Rate', value: '58.7%', tone: 'text-white' },
]

const INSIGHTS = [
  'You perform 27% better on home underdogs.',
  'Your strongest sport is the NBA (+18% ROI).',
  'Your best days are Sundays (+22%).',
]

// smooth-ish upward equity curve
const POINTS = [40, 46, 42, 55, 60, 52, 68, 74, 66, 82, 78, 92, 100, 96, 112]

function EquityCurve() {
  const w = 520
  const h = 170
  const max = Math.max(...POINTS)
  const min = Math.min(...POINTS)
  const step = w / (POINTS.length - 1)
  const coords = POINTS.map((p, i) => {
    const x = i * step
    const y = h - ((p - min) / (max - min)) * (h - 20) - 10
    return [x, y] as const
  })
  const line = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  const area = `${line} L${w},${h} L0,${h} Z`

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="equityFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(120,160,210,0.28)" />
          <stop offset="100%" stopColor="rgba(120,160,210,0)" />
        </linearGradient>
        <linearGradient id="equityStroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7f9fce" />
          <stop offset="100%" stopColor="#c6d4e8" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#equityFill)" />
      <path d={line} fill="none" stroke="url(#equityStroke)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function PersonalIntelligence() {
  return (
    <section id="personal" className="relative px-6 py-28 lg:px-10 lg:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Copy */}
        <Reveal>
          <p className="mb-5 flex items-center gap-3 text-[0.68rem] font-medium uppercase tracking-[0.3em] text-white/40">
            <span className="text-white/25">03</span>
            <span className="h-px w-8 bg-white/15" />
            Personal Intelligence
          </p>
          <h2 className="font-display text-[clamp(2.2rem,4.4vw,3.4rem)] font-bold leading-[1.02] tracking-[-0.01em] text-white">
            Turn your data
            <br />
            into progress.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/55">
            Track every ticket, measure real ROI and win rate, and see what is
            actually working. VANTA learns from your history to sharpen the next
            decision.
          </p>
          <a
            href="#edge"
            className="mt-9 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            See Your Edge
            <span aria-hidden="true">→</span>
          </a>
        </Reveal>

        {/* Dashboard preview */}
        <Reveal delay={120}>
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-6 -z-10 rounded-[2rem] opacity-70 blur-3xl"
              style={{ background: 'radial-gradient(60% 60% at 30% 20%, rgba(52,74,108,0.3), transparent 70%)' }}
            />
            <div className="rounded-2xl border border-white/[0.08] bg-[#0a0e14]/80 p-5 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <p className="font-display text-sm font-semibold tracking-[0.16em] text-white">
                  PERFORMANCE
                </p>
                <span className="rounded-md bg-white/[0.05] px-2.5 py-1 text-[0.68rem] text-white/50 ring-1 ring-inset ring-white/10">
                  All Time
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3"
                  >
                    <p className="text-[0.6rem] uppercase tracking-[0.16em] text-white/35">{s.label}</p>
                    <p className={`mt-1.5 font-display text-lg font-bold sm:text-xl ${s.tone}`}>
                      {s.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-[1.4fr_1fr]">
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className="mb-2 flex items-center justify-between text-[0.66rem] text-white/35">
                    <span>Cumulative P/L</span>
                    <span className="text-emerald-400">Trending up</span>
                  </div>
                  <div className="h-[130px]">
                    <EquityCurve />
                  </div>
                  <div className="mt-2 flex justify-between text-[0.6rem] text-white/25">
                    <span>Jan</span>
                    <span>Mar</span>
                    <span>May</span>
                    <span>Jun</span>
                  </div>
                </div>

                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <p className="mb-3 text-[0.66rem] uppercase tracking-[0.16em] text-white/35">Insights</p>
                  <ul className="space-y-3">
                    {INSIGHTS.map((text) => (
                      <li key={text} className="flex gap-2.5 text-[0.78rem] leading-snug text-white/65">
                        <span
                          aria-hidden="true"
                          className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-[var(--vanta-gold)]/70"
                        />
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
