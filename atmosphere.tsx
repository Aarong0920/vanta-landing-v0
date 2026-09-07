export function Atmosphere() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* faint technical grid */}
      <div className="vanta-grid absolute inset-0 opacity-70" />
      {/* cool depth wash top-right */}
      <div
        className="absolute -right-[10%] -top-[14%] h-[60vh] w-[60vw] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(58,84,120,0.28) 0%, transparent 68%)' }}
      />
      {/* deep blue-black lower left */}
      <div
        className="absolute -bottom-[18%] -left-[12%] h-[55vh] w-[55vw] rounded-full blur-[130px]"
        style={{ background: 'radial-gradient(circle, rgba(20,30,48,0.55) 0%, transparent 70%)' }}
      />
      {/* vignette */}
      <div className="vanta-vignette absolute inset-0" />
    </div>
  )
}
