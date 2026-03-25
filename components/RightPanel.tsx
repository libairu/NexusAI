export default function RightPanel() {
  return (
    <aside className="w-[280px] shrink-0 h-full bg-bg-surface border-l border-border-subtle pt-lg pb-lg px-md flex flex-col gap-5">
      {/* AI Assistant Card */}
      <div className="flex flex-col gap-3 bg-bg-card rounded-md border border-accent-purple/25 p-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-purple to-accent-cyan" />
          <span className="text-[13px] font-bold text-text-primary">NexusAI 助手</span>
        </div>
        <div className="bg-bg-accent-purple rounded-lg px-3 py-2.5">
          <p className="text-xs text-text-secondary leading-relaxed">
            根据你的学习路径，我建议接下来深入研究 Transformer 注意力机制，这将帮助你更好理解 GPT 系列模型。
          </p>
        </div>
        <button className="w-full h-9 rounded-lg bg-gradient-to-r from-accent-purple to-accent-cyan text-[13px] font-bold text-white cursor-pointer hover:opacity-90 transition-opacity">
          问问 AI
        </button>
      </div>

      {/* Trending Topics */}
      <div className="flex flex-col gap-2.5">
        <span className="text-[13px] font-bold text-text-primary">热门话题</span>
        {[
          { label: "#Sora 视频生成", count: "24K", dotColor: "bg-accent-cyan/15", countColor: "text-accent-cyan-text" },
          { label: "#深度学习优化", count: "18K", dotColor: "bg-accent-purple/15", countColor: "text-accent-purple-text" },
          { label: "#RAG 检索增强", count: "12K", dotColor: "bg-accent-green/15", countColor: "text-accent-green-text" },
        ].map((t) => (
          <div key={t.label} className="flex items-center justify-between h-11 bg-bg-elevated rounded-lg px-3 cursor-pointer hover:bg-bg-card transition-colors">
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded ${t.dotColor}`} />
              <span className="text-xs text-text-secondary">{t.label}</span>
            </div>
            <span className={`text-[11px] ${t.countColor}`}>{t.count}</span>
          </div>
        ))}
      </div>

      {/* Learning Progress */}
      <div className="flex flex-col gap-3 bg-bg-card rounded-md border border-border-subtle/70 p-md">
        <span className="text-[13px] font-bold text-text-primary">学习进度</span>
        {[
          { label: "Transformer 架构", pct: "72%", width: "72%", gradient: "from-accent-cyan to-[#3399FF]", color: "text-accent-cyan-text" },
          { label: "量子计算基础", pct: "45%", width: "45%", gradient: "from-accent-purple to-[#CC33CC]", color: "text-accent-purple-text" },
          { label: "大模型微调", pct: "28%", width: "28%", gradient: "from-accent-green to-[#009966]", color: "text-accent-green-text" },
        ].map((p) => (
          <div key={p.label} className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <span className="text-xs text-text-secondary">{p.label}</span>
              <span className={`text-[11px] font-bold ${p.color}`}>{p.pct}</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-bg-elevated">
              <div className={`h-full rounded-full bg-gradient-to-r ${p.gradient}`} style={{ width: p.width }} />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
