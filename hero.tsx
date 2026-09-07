import { DataCore } from './data-core'

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-x-clip px-6 pb-24 pt-32 lg:overflow-visible lg:px-10 lg:pb-32 lg:pt-40"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        {/* Left — copy */}
        <div className="relative z-10 max-w-2xl">
          <p className="mb-6 flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.35em] text-white/45">
            <span className="h-px w-8 bg-gradient-to-r from-[var(--vanta-gold)]/70 to-transparent" />
            Market Intelligence
          </p>

          <h1 className="font-display text-[clamp(2.9rem,8.5vw,6.2rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.02em]">
            <span className="block text-gradient-steel">Know the bet</span>
            <span className="block text-gradient-steel">before you</span>
            <span className="block text-gradient-steel">place it.</span>
          </h1>

          <p className="mt-8 max-w-md text-pretty text-base leading-relaxed text-white/55 sm:text-lg">
            Real-time sportsbook intelligence, price comparison, and AI-powered
            market analysis in one place.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#edge"
              className="group relative overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_40px_-12px_rgba(79,107,147,0.7)] ring-1 ring-inset ring-white/20 transition-transform hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(180deg,#55709a 0%,#31456a 100%)' }}
            >
              Get Started
            </a>
            <a
              href="#intelligence"
              className="rounded-full px-6 py-3.5 text-sm font-semibold text-white/80 ring-1 ring-inset ring-white/15 transition-colors hover:bg-white/5 hover:text-white"
            >
              See How It Works
            </a>
          </div>

          <p className="mt-8 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-white/30">
            Private Beta · Serious Players Only
          </p>
        </div>

        {/* Right — Data Core. Floats in the mid layer (above background
            atmosphere, below the headline text which sits at z-10). The stage
            is allowed to overflow so modules can travel into the hero space. */}
        <div className="relative z-[5] lg:overflow-visible">
          <DataCore />
          <div className="relative z-10 mt-2 hidden justify-between px-4 text-[0.6rem] uppercase tracking-[0.3em] text-white/25 lg:flex">
            <span>Data</span>
            <span>Perspective</span>
            <span>Clarity</span>
          </div>
        </div>
      </div>
    </section>
  )
}
