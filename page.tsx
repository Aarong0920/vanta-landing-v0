import { Atmosphere } from '@/components/atmosphere'
import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { MarketIntelligence } from '@/components/market-intelligence'
import { AskVanta } from '@/components/ask-vanta'
import { PersonalIntelligence } from '@/components/personal-intelligence'
import { FinalCta } from '@/components/final-cta'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#05070b] text-white">
      <Atmosphere />
      <div className="relative z-10">
        <SiteHeader />
        <Hero />
        <MarketIntelligence />
        <AskVanta />
        <PersonalIntelligence />
        <FinalCta />
        <SiteFooter />
      </div>
    </main>
  )
}
