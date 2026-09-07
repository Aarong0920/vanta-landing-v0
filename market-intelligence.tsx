import { Reveal } from './reveal'

type Row = {
  team: string
  league: string
  book: string
  odds: string
  implied: string
  novig: string
  edge: string
  positive: boolean
}

const ROWS: Row[] = [
  { team: 'Chiefs', league: 'NFL', book: 'DraftKings', odds: '-120', implied: '54.5%', novig: '51.3%', edge: '+3.2%', positive: true },
  { team: 'Bills', league: 'NFL', book: 'FanDuel', odds: '+100', implied: '50.0%', novig: '48.2%', edge: '+1.8%', positive: true },
  { team: 'Lakers', league: 'NBA', book: 'BetMGM', odds: '-110', implied: '52.4%', novig: '50.3%', edge: '+2.1%', positive: true },
  { team: 'Celtics', league: 'NBA', book: 'Caesars', odds: '-105', implied: '51.2%', novig: '51.6%', edge: '-0.4%', positive: false },
]

const FILTERS = ['ALL', 'NFL', 'NBA', 'NCAAB', 'MLB', 'NHL']

export function MarketIntelligence() {
  return (
    <section id="intelligence" className="relative px-6 py-28 lg:px-10 lg:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Copy */}
        <Reveal className="order-2 lg:order-1">
          <p className="mb-5 flex items-center gap-3 text-[0.68rem] font-medium uppercase tracking-[0.3em] text-white/40">
            <span className="text-white/25">01</span>
            <span className="h-px w-8 bg-white/15" />
            Live Market Intelligence
          </p>
          <h2 className="font-display text-[clamp(2.2rem,4.4vw,3.4rem)] font-bold leading-[1.02] tracking-[-0.01em] text-white">
            See the market
            <br />
            more clearly.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/55">
            Compare odds across every major sportsbook, surface the best available
            price, and read true no-vig probability beside each line. VANTA gives you
            the edge through data, not noise.
          </p>

          <ul className="mt-8 space-y-3.5">
            {[
              'Best available price across books',
              'Implied vs. no-vig market probability',
              'Live line movement and value edge',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-white/70">
                <span className="h-1.5 w-1.5 flex-none rounded-full bg-[var(--vanta-steel)]/70" />
                {item}
              </li>
            ))}
          </ul>

          <a
            href="#"
            className="mt-9 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            Explore the Board
            <span aria-hidden="true">→</span>
          </a>
        </Reveal>

        {/* Board preview */}
        <Reveal className="order-1 lg:order-2" delay={120}>
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-6 -z-10 rounded-[2rem] opacity-70 blur-3xl"
              style={{ background: 'radial-gradient(60% 60% at 70% 20%, rgba(58,84,120,0.28), transparent 70%)' }}
            />
            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0e14]/80 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
                <div>
                  <p className="font-display text-sm font-semibold tracking-[0.18em] text-white">
                    VANTA BOARD
                  </p>
                  <p className="mt-0.5 text-[0.7rem] text-white/40">Live sportsbook intelligence</p>
                </div>
                <span className="flex items-center gap-2 rounded-full bg-white/[0.04] px-3 py-1 text-[0.68rem] text-white/60 ring-1 ring-inset ring-white/10">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 pulse-gold" />
                  Live
                </span>
              </div>

              <div className="flex flex-wrap gap-2 px-5 py-3.5">
                {FILTERS.map((f, i) => (
                  <span
                    key={f}
                    className={`rounded-md px-2.5 py-1 text-[0.7rem] font-medium tracking-wide ${
                      i === 0
                        ? 'bg-white/[0.1] text-white ring-1 ring-inset ring-white/15'
                        : 'text-white/45'
                    }`}
                  >
                    {f}
                  </span>
                ))}
              </div>

              <div className="px-2 pb-3">
                <div className="grid grid-cols-[1.4fr_0.8fr_0.9fr_0.8fr] gap-2 px-3 py-2 text-[0.62rem] font-medium uppercase tracking-[0.14em] text-white/35">
                  <span>Team</span>
                  <span className="text-right">Odds</span>
                  <span className="text-right">No-vig %</span>
                  <span className="text-right">Edge</span>
                </div>
                {ROWS.map((r) => (
                  <div
                    key={r.team}
                    className="grid grid-cols-[1.4fr_0.8fr_0.9fr_0.8fr] items-center gap-2 rounded-lg px-3 py-3 transition-colors hover:bg-white/[0.03]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 flex-none items-center justify-center rounded-md bg-white/[0.06] text-[0.6rem] font-semibold text-white/70 ring-1 ring-inset ring-white/10">
                        {r.team.slice(0, 2).toUpperCase()}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white">{r.team}</p>
                        <p className="text-[0.66rem] text-white/35">
                          {r.league} · {r.book}
                        </p>
                      </div>
                    </div>
                    <span className="text-right font-mono text-sm text-white/85">{r.odds}</span>
                    <span className="text-right font-mono text-sm text-white/55">{r.novig}</span>
                    <span
                      className={`text-right font-mono text-sm font-semibold ${
                        r.positive ? 'text-emerald-400' : 'text-rose-400/90'
                      }`}
                    >
                      {r.edge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
