import { Reveal } from './reveal'

export function FinalCta() {
  return (
    <section id="edge" className="relative overflow-hidden px-6 py-36 lg:py-48">
      {/* horizon glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            'radial-gradient(80% 120% at 50% 130%, rgba(210,150,60,0.22) 0%, rgba(58,84,120,0.12) 40%, transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(226,180,103,0.4), transparent)' }}
      />

      <Reveal className="relative mx-auto max-w-3xl text-center">
        <p className="mb-6 flex items-center justify-center gap-3 text-[0.68rem] font-medium uppercase tracking-[0.3em] text-white/40">
          <span className="text-white/25">04</span>
          <span className="h-px w-8 bg-white/15" />
          The Edge
        </p>
        <h2 className="font-display text-[clamp(2.8rem,7vw,5.5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.02em] text-gradient-steel">
          Know your edge.
        </h2>
        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-white/55">
          Smarter information. Better decisions. A brighter edge — every time you
          step to the market.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#top"
            className="rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-[0_10px_40px_-12px_rgba(79,107,147,0.7)] ring-1 ring-inset ring-white/20 transition-transform hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(180deg,#55709a 0%,#31456a 100%)' }}
          >
            Get Started
          </a>
          <a
            href="#intelligence"
            className="rounded-full px-7 py-3.5 text-sm font-semibold text-white/80 ring-1 ring-inset ring-white/15 transition-colors hover:bg-white/5 hover:text-white"
          >
            Watch Demo
          </a>
        </div>
      </Reveal>
    </section>
  )
}
