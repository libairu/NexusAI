export default function HeroBanner() {
  return (
    <div className="relative w-full rounded-lg overflow-hidden border border-accent-cyan/15 bg-gradient-to-r from-[#0A1438] via-[#260A4D] to-[#051F40]">
      {/* Glow effects */}
      <div className="absolute -left-20 -top-24 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(51,199,235,0.25)_0%,transparent_70%)]" />
      <div className="absolute right-16 -top-14 w-60 h-60 rounded-full bg-[radial-gradient(circle,rgba(148,107,230,0.3)_0%,transparent_70%)]" />

      {/* Content - use flexbox flow instead of absolute positioning */}
      <div className="relative z-10 flex flex-col gap-4 px-10 py-6">
        {/* Tag */}
        <div className="flex items-center gap-1.5 w-fit px-2.5 py-1 rounded bg-white/10 border border-white/20">
          <span className="w-1.5 h-1.5 rounded-full bg-[#33C7EB] animate-pulse" />
          <span className="text-[10px] font-bold text-[#66D9F2] tracking-[1.5px]">AI POWERED</span>
        </div>

        {/* Title - always light on dark banner background */}
        <h1 className="text-[32px] font-bold bg-gradient-to-r from-white to-[#33C7EB] bg-clip-text text-transparent leading-tight">
          未来已来，拥抱 AI
        </h1>

        {/* Subtitle */}
        <p className="text-sm text-white/70">探索最前沿 AI 知识、连接全球创新者社区</p>

        {/* Stats - flow layout with proper spacing */}
        <div className="flex gap-8 pt-2">
          {[
            { value: "128K+", label: "学习者", color: "text-[#66D9F2]" },
            { value: "3.2K", label: "课程", color: "text-[#B894FA]" },
            { value: "99%", label: "满意度", color: "text-[#66E0A6]" },
          ].map((s) => (
            <div key={s.label} className="flex items-baseline gap-1.5">
              <span className={`text-base font-bold ${s.color}`}>{s.value}</span>
              <span className="text-[11px] text-white/50">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
