'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const DataCoreScene = dynamic(() => import('./data-core-scene'), {
  ssr: false,
  loading: () => <CoreFallback />,
})

function CoreFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="h-40 w-40 animate-pulse rounded-2xl bg-gradient-to-br from-white/10 to-transparent ring-1 ring-white/10" />
    </div>
  )
}

export function DataCore() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    // Sizing anchor: keeps the object roughly the same visible size and holds
    // the grid cell's height, but never clips — the actual motion stage is a
    // larger, overflow-visible layer that bleeds into the hero.
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      {/* Oversized motion stage — extends well beyond the visible object so
          expanding/reconfiguring modules travel freely into the hero space.
          No border, no panel, no hard edge; overflow is intentionally visible. */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[165%] -translate-x-1/2 -translate-y-1/2">
        {/* Soft glow that falls off gradually into the page background — this
            replaces the old dark vignette square so there is no visible box. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 blur-3xl"
          style={{
            background:
              'radial-gradient(circle at 50% 46%, rgba(255,183,90,0.16), transparent 38%), radial-gradient(circle at 50% 54%, rgba(74,106,158,0.20), transparent 58%)',
          }}
        />
        {/* The R3F canvas fills the oversized, transparent, overflow-visible
            stage so nothing is clipped. Pointer events re-enabled here only. */}
        <div className="pointer-events-auto absolute inset-0">
          <DataCoreScene reduced={reduced} />
        </div>
      </div>
    </div>
  )
}
