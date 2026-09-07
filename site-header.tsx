'use client'

import { useEffect, useState } from 'react'
import { VantaLogo } from './vanta-logo'

const NAV = [
  { label: 'Product', href: '#intelligence' },
  { label: 'Intelligence', href: '#ask' },
  { label: 'Personal', href: '#personal' },
  { label: 'Edge', href: '#edge' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? 'border-b border-white/[0.06] bg-[#05070b]/80 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-10">
        <a href="#top" aria-label="VANTA home">
          <VantaLogo />
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-white/55 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden text-sm font-medium text-white/70 transition-colors hover:text-white sm:block"
          >
            Log in
          </a>
          <a
            href="#edge"
            className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-inset ring-white/15 backdrop-blur transition-all hover:bg-white/[0.16]"
          >
            Explore VANTA
          </a>
        </div>
      </div>
    </header>
  )
}
