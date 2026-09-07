import { Reveal } from './reveal'

const OPPORTUNITIES = [
  { match: 'Bills vs Dolphins', edge: '+2.8%' },
  { match: 'Ravens vs Bengals', edge: '+2.4%' },
  { match: '49ers vs Seahawks', edge: '+2.1%' },
]

export function AskVanta() {
  return (
    <section id="ask" className="relative px-6 py-28 lg:px-10 lg:py-36">
      {/* warm ambient field, restrained */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 blur-[120px]"
        style={{ background: 'radial-gradient(50% 50% at 30% 50%, rgba(210,150,60,0.16), transparent 72%)' }}
      />

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Copy */}
        <Reveal>
          <p className="mb-5 flex items-center gap-3 text-[0.68rem] font-medium uppercase tracking-[0.3em]">
            <span className="text-[var(--vanta-gold)]/60">02</span>
            <span className="h-px w-8 bg-[var(--vanta-gold)]/30" />
            <span className="text-[var(--vanta-gold)]/80">Ask VANTA</span>
          </p>
          <h2 className="font-display text-[clamp(2.2rem,4.4vw,3.4rem)] font-bold leading-[1.02] tracking-[-0.01em] text-white">
            The right question
            <br />
            finds a brighter edge.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/55">
            Ask VANTA turns raw market data into contextual answers. Get instant,
            grounded insight powered by live lines and advanced modeling — so you
            spend less time hunting and more time deciding.
          </p>
          <a
            href="#"
            className="mt-9 inline-flex items-center gap-2 text-sm font-medium text-[var(--vanta-gold)] transition-opacity hover:opacity-80"
          >
            Try Ask VANTA
            <span aria-hidden="true">→</span>
          </a>
        </Reveal>

        {/* Chat panel */}
        <Reveal delay={120}>
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-px -z-10 rounded-[1.6rem] opacity-60"
              style={{ background: 'linear-gradient(140deg, rgba(226,180,103,0.5), transparent 45%)' }}
            />
            <div className="rounded-[1.55rem] border border-[var(--vanta-gold)]/15 bg-[#0b0d12]/85 p-5 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-[#1a1206] ring-1 ring-inset ring-[#f4d79a]/60"
                  style={{ background: 'linear-gradient(150deg,#f3d391,#d9a441)' }}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 3l2.3 6.2L21 11l-6.7 1.8L12 19l-2.3-6.2L3 11l6.7-1.8L12 3Z" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="font-display text-sm font-semibold tracking-[0.16em] text-white">
                  ASK VANTA
                </span>
              </div>

              {/* user question */}
              <div className="mb-4 flex justify-end">
                <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-white/[0.06] px-4 py-2.5 text-sm text-white/85 ring-1 ring-inset ring-white/10">
                  Which NFL games have the most value this week?
                </p>
              </div>

              {/* answer */}
              <div className="rounded-2xl rounded-tl-sm border border-[var(--vanta-gold)]/15 bg-gradient-to-b from-[var(--vanta-gold)]/[0.07] to-transparent p-4">
                <p className="text-sm leading-relaxed text-white/70">
                  Based on current lines and our projections, the top value
                  opportunities this week are:
                </p>
                <ul className="mt-4 space-y-2.5">
                  {OPPORTUNITIES.map((o, i) => (
                    <li
                      key={o.match}
                      className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3.5 py-2.5 ring-1 ring-inset ring-white/[0.06]"
                    >
                      <span className="flex items-center gap-3 text-sm text-white/80">
                        <span className="text-[0.7rem] text-[var(--vanta-gold)]/70">{i + 1}</span>
                        {o.match}
                      </span>
                      <span className="font-mono text-sm font-semibold text-[var(--vanta-gold)]">
                        {o.edge} edge
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* input */}
              <div className="mt-5 flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5">
                <span className="flex-1 text-sm text-white/35">Ask anything…</span>
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-[#1a1206]"
                  style={{ background: 'linear-gradient(150deg,#f3d391,#d9a441)' }}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
