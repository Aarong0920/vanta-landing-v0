import { VantaLogo } from './vanta-logo'

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/[0.06] px-6 py-10 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-4">
          <VantaLogo />
          <span className="hidden text-[0.62rem] uppercase tracking-[0.3em] text-white/30 sm:block">
            Market Intelligence
          </span>
        </div>
        <div className="flex items-center gap-7 text-[0.68rem] uppercase tracking-[0.22em] text-white/40">
          <a href="#intelligence" className="transition-colors hover:text-white">Intelligence</a>
          <a href="#personal" className="transition-colors hover:text-white">Perspective</a>
          <a href="#edge" className="transition-colors hover:text-white">Opportunity</a>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-7xl text-[0.66rem] text-white/25">
        © {new Date().getFullYear()} VANTA. For entertainment purposes. Please bet responsibly.
      </p>
    </footer>
  )
}
