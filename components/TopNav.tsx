import ThemeToggle from "./ThemeToggle";

export default function TopNav() {
  return (
    <nav className="flex items-center justify-between h-16 px-lg bg-bg-surface border-b border-border-subtle transition-colors">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="14,2 26,8 26,20 14,26 2,20 2,8" stroke="#33C7EB" strokeWidth="1.5" fill="none" />
          <circle cx="14" cy="14" r="4" fill="#33C7EB" opacity="0.7" />
          <line x1="14" y1="2" x2="14" y2="10" stroke="#946BE6" strokeWidth="1" />
          <line x1="14" y1="18" x2="14" y2="26" stroke="#946BE6" strokeWidth="1" />
          <line x1="2" y1="14" x2="10" y2="14" stroke="#33C7EB" strokeWidth="1" />
          <line x1="18" y1="14" x2="26" y2="14" stroke="#33C7EB" strokeWidth="1" />
        </svg>
        <span className="text-lg font-bold text-text-primary tracking-[3px]">NEXUS AI</span>
      </div>

      {/* Nav Links */}
      <div className="flex items-center gap-1">
        <span className="px-4 py-2 text-sm font-medium text-accent-cyan-text">发现</span>
        <span className="px-4 py-2 text-sm text-text-secondary">课程</span>
        <span className="px-4 py-2 text-sm text-text-secondary">实验室</span>
        <span className="px-4 py-2 text-sm text-text-secondary">社区</span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 w-60 h-9 bg-bg-elevated rounded-lg border border-border-subtle px-3">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4.5" stroke="#808CA6" strokeWidth="1.2" /><line x1="9.5" y1="9.5" x2="13" y2="13" stroke="#808CA6" strokeWidth="1.2" strokeLinecap="round" /></svg>
          <span className="text-[13px] text-text-muted">搜索知识、课程、作者...</span>
        </div>
        <ThemeToggle />
        <div className="relative w-9 h-9 bg-bg-elevated rounded-lg border border-border-subtle flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2C5.8 2 4 3.8 4 6v3l-1.5 2h11L12 9V6c0-2.2-1.8-4-4-4z" stroke="currentColor" className="text-text-muted" strokeWidth="1.2" fill="none" /><line x1="6.5" y1="13" x2="9.5" y2="13" stroke="currentColor" className="text-text-muted" strokeWidth="1.2" strokeLinecap="round" /></svg>
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-accent-cyan rounded-full" />
        </div>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center">
          <span className="text-xs font-bold text-white">AI</span>
        </div>
      </div>
    </nav>
  );
}
