const navItems = [
  { icon: "M2 7L8 2L14 7V14H10V10H6V14H2V7Z", label: "首页", active: true },
  { icon: "M8 1.5A6.5 6.5 0 1014.5 8 6.5 6.5 0 008 1.5zM11 5L9 9 5 11l2-4 4-2z", label: "探索" },
  { icon: "M2 2h12a3 3 0 013 3v6a3 3 0 01-3 3H2V2z", label: "AI 工具" },
  { icon: "M4 2h8a1 1 0 011 1v11l-5-3-5 3V3a1 1 0 011-1z", label: "收藏" },
];

const tags = [
  { color: "bg-accent-cyan", label: "人工智能" },
  { color: "bg-accent-purple", label: "量子计算" },
  { color: "bg-accent-green", label: "大模型" },
  { color: "bg-[#FF6B6B]", label: "机器人技术" },
];

export default function Sidebar() {
  return (
    <aside className="w-[220px] shrink-0 h-full bg-bg-surface border-r border-border-subtle pt-lg pb-lg px-md flex flex-col gap-1">
      <span className="text-[10px] font-bold text-text-muted tracking-[2px] px-2 pt-2 pb-1">导航</span>

      {navItems.map((item) => (
        <div
          key={item.label}
          className={`flex items-center gap-2.5 h-10 px-3 rounded-lg cursor-pointer ${
            item.active
              ? "bg-gradient-to-r from-accent-cyan/15 to-accent-cyan/5 border border-accent-cyan/25"
              : "hover:bg-bg-elevated"
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d={item.icon} stroke={item.active ? "#33C7EB" : "#808CA6"} strokeWidth="1.2" fill="none" />
          </svg>
          <span className={`text-sm ${item.active ? "font-medium text-accent-cyan-text" : "text-text-secondary"}`}>
            {item.label}
          </span>
        </div>
      ))}

      <span className="text-[10px] font-bold text-text-muted tracking-[2px] px-2 pt-4 pb-1">分类</span>

      {tags.map((tag) => (
        <div key={tag.label} className="flex items-center gap-2 h-8 px-3 rounded-md cursor-pointer hover:bg-bg-elevated">
          <span className={`w-1.5 h-1.5 rounded-full ${tag.color}`} />
          <span className="text-[13px] text-text-secondary">{tag.label}</span>
        </div>
      ))}
    </aside>
  );
}
