# CodeBuddy + Ardot MCP：AI 驱动从生成设计稿到可运行代码全链路实践

## 前言

设计与开发之间的鸿沟，一直是产品团队效率的最大瓶颈之一。设计师在 Figma 中精心绘制的界面，到了开发手中往往需要重新理解、手动提取 Token、逐像素还原 -- 这个过程不仅耗时，还容易产生还原误差。

本文记录了一次完整的 **Design-to-Code** 全链路实践：通过 **CodeBuddy**（AI 编程助手）连接 **Ardot MCP**（设计工具协议），让 AI 全程驱动 -- 从生成设计稿、构建组件库、定义变量 Token，到输出可运行的 Next.js 前端项目，实现了**零手动同步**的设计开发一体化工作流。

---

## 一、工作流全景

```
CodeBuddy (AI Agent)
    │
    ├─── Ardot MCP ──→ 生成设计稿（Dark/Light 双主题）
    │       │
    │       ├── apply_variables  → 24 个 Design Tokens（双模式）
    │       ├── batch_edit       → 完整 UI 布局 + 6 个可复用组件
    │       ├── capture_screenshot → 实时截图验证
    │       └── capture_layout   → 布局结构检查
    │
    ├─── 导出 Tokens ──→ Tailwind v4 @theme 变量
    │
    └─── 生成代码 ──→ Next.js 15 + React 组件（Dark/Light 切换）
```

**核心链路**：ardot 设计稿中的 `$bg-card` → Tailwind 的 `--color-bg-card` → React 的 `className="bg-bg-card"` -- 一条 Token，三处引用，零手动同步。

---

## 二、Ardot MCP 生图能力：AI 直接操作画布

### 2.1 MCP 协议赋能

Ardot MCP 将设计工具的操作能力暴露为标准化的 API，CodeBuddy 通过 MCP 协议直接操作 ardot 画布：

| API | 能力 | 作用 |
|-----|------|------|
| `fetch_editor_state` | 获取画布状态 | 了解当前设计、可用组件 |
| `apply_variables` | 变量管理 | 创建/更新 Design Tokens，支持多模式 |
| `batch_edit` | 批量操作 | 插入 (I)、更新 (U)、复制 (C)、删除 (D)、生成图片 (G) |
| `capture_screenshot` | 实时截图 | 验证设计效果，发现视觉问题 |
| `capture_layout` | 布局检查 | 检测对齐、重叠、间距问题 |
| `locate_available_space` | 空间定位 | 在画布上找到空闲区域放置新内容 |

### 2.2 从零生成完整设计稿

整个 NexusAI 知识分享平台的设计稿（1440x900）完全由 CodeBuddy 通过 ardot MCP 生成：

| 区域 | 生成内容 |
|------|---------|
| **顶部导航** | SVG 六边形 Logo、4 个导航链接、搜索栏、通知铃、渐变头像 |
| **左侧边栏** | 4 个导航项（含激活态高亮）、4 个彩色分类标签 |
| **Hero Banner** | 三色渐变背景 + 径向光效、AI POWERED 脉冲标签、渐变大标题、3 组数据统计 |
| **知识卡片** | 3 列等宽卡片，每张含 Unsplash 封面图、彩色标签、标题、摘要、作者信息 |
| **右侧面板** | AI 助手对话卡、3 条热门话题、3 个学习进度条 |

关键点：AI 生成的不是静态图片，而是**结构化的设计节点** -- 每个元素都有明确的布局属性（flexbox）、样式属性（fill/stroke/cornerRadius）和语义命名。

### 2.3 实时验证闭环

ardot MCP 的截图验证能力是高质量产出的关键保障：

```
batch_edit()          → 生成/修改设计元素
capture_screenshot()  → AI 分析截图，发现视觉问题
capture_layout()      → 检查布局数据，发现间距/对齐问题
batch_edit()          → 自动修复问题
```

这种**生成 → 验证 → 修复**的闭环让 AI 能自主迭代，无需人工逐像素检查。

---

## 三、可持续迭代的设计稿

### 3.1 变量驱动的设计系统

ardot MCP 的 `apply_variables` 让设计稿从第一天就是变量驱动的。NexusAI 定义了 **24 个 Design Tokens**，支持 **Dark + Light 双模式**：

**颜色变量（17 个）-- 双模式对照：**

| Token | Dark Mode | Light Mode | 用途 |
|-------|-----------|------------|------|
| `$bg-base` | `#0A0D17` | `#F7F7FA` | 页面底色 |
| `$bg-surface` | `#121724` | `#FFFFFF` | 面板/侧边栏背景 |
| `$bg-card` | `#171C2E` | `#FAFAFE` | 卡片背景 |
| `$bg-elevated` | `#1F2638` | `#F2F2F8` | 输入框/高亮区块 |
| `$bg-accent-cyan` | `#0D2633` | `#E6F8FC` | Cyan 标签背景 |
| `$bg-accent-purple` | `#1F1438` | `#F2EAFF` | Purple 标签背景 |
| `$bg-accent-green` | `#0F2E1F` | `#EBFAF2` | Green 标签背景 |
| `$accent-cyan` | `#33C7EB` | `#0D8CAE` | 主强调色 |
| `$accent-purple` | `#946BE6` | `#612EB8` | 次强调色 |
| `$accent-green` | `#40D194` | `#148C5A` | 成功/增长色 |
| `$accent-cyan-text` | `#66D9F2` | `#0A7394` | Cyan 文本色 |
| `$accent-purple-text` | `#B894FA` | `#521F9E` | Purple 文本色 |
| `$accent-green-text` | `#66E0A6` | `#0F7347` | Green 文本色 |
| `$text-primary` | `#EBF0FA` | `#12121A` | 主文本 |
| `$text-secondary` | `#ADB8D1` | `#5A5E73` | 次文本 |
| `$text-muted` | `#808CA6` | `#8C94A6` | 辅助文本 |
| `$border-subtle` | `#2E3852` | `#E0E3EB` | 边框/分割线 |

**数值变量（6 个）-- 双模式共享：**

| Token | 值 | 用途 |
|-------|-----|------|
| `$radius-sm / md / lg` | 6px / 12px / 16px | 圆角 |
| `$spacing-sm / md / lg` | 8px / 16px / 24px | 间距 |

### 3.2 设计稿迭代历程

设计稿经历了 5 轮 AI 驱动的迭代，每轮都通过 ardot MCP 实时验证：

| 版本 | 改动 | 验证方式 |
|------|------|---------|
| V1 | 基础布局 + Dark 硬编码色值 | `capture_screenshot` 检查整体布局 |
| V2 | 引入 18 个 Design Token 变量 | `fetch_variables` 确认变量创建 |
| V3 | 修复文本对比度，新增 6 个 `bg-accent-*` / `accent-*-text` Token | 截图对比修复前后 |
| V4 | 将 25 个硬编码颜色节点绑定到变量 | `capture_layout` 验证节点属性 |
| V5 | 添加 Light mode，复制生成亮色设计稿 | 截图验证亮色主题效果 |

---

## 四、组件库：设计复用的基石

### 4.1 6 个可复用组件

通过 ardot MCP 的 `batch_edit` 创建了 `type: "component"` 可复用组件，所有组件均引用 Design Token 变量：

| 组件 | 说明 | Token 引用 |
|------|------|-----------|
| `component/Tag` | 标签徽章 | `$bg-accent-cyan` + `$accent-cyan-text` |
| `component/Button` | 渐变 CTA 按钮 | `$accent-purple` → `$accent-cyan` gradient |
| `component/KnowledgeCard` | 文章知识卡片 | `$bg-card` + `$text-primary` + `$radius-md` |
| `component/ProgressBar` | 学习进度条 | `$bg-elevated` + `$accent-cyan` |
| `component/NavItem` | 侧边栏导航项 | `$text-secondary` + `$text-muted` |
| `component/TrendItem` | 热门话题条目 | `$bg-elevated` + `$accent-cyan-text` |

### 4.2 组件实例化与覆写

组件创建后可在画布任意位置实例化，并通过 `descendants` 覆写内容：

```javascript
// 插入卡片实例并覆写标题和描述
card = I(container, {type: "ref", ref: "component/KnowledgeCard"})
U(card + "title", {content: "GPT-5 架构解析"})
U(card + "desc",  {content: "深度剖析最新大模型架构设计"})
```

组件切换主题时，所有实例自动跟随变量更新 -- 无需逐个修改。

---

## 五、Design to Code：Token 一键打通

### 5.1 Token 映射：ardot → Tailwind v4

ardot 设计稿中的 24 个 Token 直接映射为 Tailwind v4 的 `@theme` + CSS 变量：

```css
/* globals.css */
@import "tailwindcss";

@theme {
  --color-bg-base: var(--nexus-bg-base);
  --color-bg-card: var(--nexus-bg-card);
  --color-accent-cyan: var(--nexus-accent-cyan);
  --color-text-primary: var(--nexus-text-primary);
  /* ... 24 个 Token 完整映射 */
}

:root, .dark {
  --nexus-bg-base: #0A0D17;
  --nexus-text-primary: #EBF0FA;
}

.light {
  --nexus-bg-base: #F7F7FA;
  --nexus-text-primary: #12121A;
}
```

**映射关系**：ardot `$bg-card` → CSS `var(--nexus-bg-card)` → Tailwind `bg-bg-card`

### 5.2 组件映射：ardot → React

设计稿中的 6 个组件 1:1 映射为 React 组件，className 直接引用 Token：

```tsx
// KnowledgeCard.tsx -- 直接使用 Token 类名
<div className="bg-bg-card rounded-md border border-border-subtle">
  <span className="bg-bg-accent-cyan text-accent-cyan-text text-xs px-2 py-1 rounded-sm">
    {tagLabel}
  </span>
  <h3 className="text-text-primary font-bold">{title}</h3>
  <p className="text-text-muted text-sm">{description}</p>
</div>
```

### 5.3 主题切换：一行代码

设计稿的 Dark/Light 双 mode 对应前端仅需切换 HTML class：

```tsx
// ThemeToggle.tsx
const toggle = () => {
  const next = theme === "dark" ? "light" : "dark";
  document.documentElement.className = next;  // 就这一行
  localStorage.setItem("nexus-theme", next);
};
```

### 5.4 最终项目结构

```
NexusAI/                          # Next.js 15 + Tailwind v4
├── app/
│   ├── globals.css               ← 24 Design Tokens (Dark + Light 双模式)
│   ├── layout.tsx                ← Root layout (Inter 字体)
│   └── page.tsx                  ← 主页面（组装所有组件）
├── components/
│   ├── TopNav.tsx                ← 顶部导航 + Logo + 搜索 + 主题切换
│   ├── Sidebar.tsx               ← 左侧边栏 + 导航 + 分类标签
│   ├── HeroBanner.tsx            ← Hero 区域 + 渐变光效 + 统计
│   ├── KnowledgeCard.tsx         ← 知识卡片（复用组件）
│   ├── RightPanel.tsx            ← AI 助手 + 热门话题 + 学习进度
│   └── ThemeToggle.tsx           ← Dark/Light 主题切换
├── package.json
└── tsconfig.json
```

---

## 六、效果展示

### 6.1 ardot 设计稿

设计稿在线地址：https://ardot.tencent.com/file/664524072087754

**画布结构：**

| 画面 | 节点 ID | 位置 | 说明 |
|------|---------|------|------|
| Dark Mode 主屏 | `3:20` | (0, 0) | 深色主题完整界面 |
| Component Library | `3:203` | (0, 1000) | 6 个可复用组件 |
| Light Mode 主屏 | `3:220` | (1640, 0) | 亮色主题完整界面 |

### 6.2 前端项目运行效果

```bash
cd NexusAI && npm install && npm run dev
# 访问 http://localhost:3099
```

**Dark Mode** -- 深邃科技感：
- 背景 `#0A0D17`，文本 `#EBF0FA`
- Cyan `#33C7EB` / Purple `#946BE6` / Green `#40D194`

**Light Mode** -- 清新专业感：
- 背景 `#F7F7FA`，文本 `#12121A`
- 强调色自动切换为深色变体（`#0D8CAE` / `#612EB8` / `#148C5A`），保证 WCAG 4.5:1 对比度

---

## 七、总结与展望

### CodeBuddy + Ardot MCP 的核心价值

| 环节 | 传统流程 | CodeBuddy + Ardot MCP |
|------|---------|----------------------|
| 生成设计稿 | 设计师手动绘制 | AI 通过 MCP 直接在画布上生成 |
| Design Tokens | 手动定义、手动同步 | `apply_variables` 一键创建，支持多模式 |
| 组件库 | 手动创建、手动维护 | `batch_edit` 批量创建，变量自动绑定 |
| 主题切换 | 手动维护两套设计 | Variable modes 一键切换 |
| 设计验证 | 人工检查、来回沟通 | `capture_screenshot` 自动验证 |
| Design to Code | 手动提取 Token、逐个还原 | Token 直接映射 Tailwind，组件 1:1 对应 |
| 迭代效率 | 设计改一处、代码改一处 | 改 Token 一处，设计+代码同时生效 |

### 关键收获

1. **Ardot MCP 的生图能力** -- AI 不再生成"描述设计的文字"，而是直接操作画布生成结构化设计节点，这是质的飞跃
2. **变量 Token 是桥梁** -- 设计稿中的 `$bg-card` 就是 CSS 中的 `var(--color-bg-card)` 就是 Tailwind 中的 `bg-bg-card`，一套 Token 贯穿全链路
3. **可迭代的活设计稿** -- 设计不再是一次性的 PNG 交付物，而是可以持续演进、实时验证的活文档
4. **CodeBuddy 的编排能力** -- AI 同时扮演了设计师（生成设计稿）、前端工程师（生成代码）和 QA（截图验证）三个角色

这套流程实现了真正的 **AI 驱动的 Design-to-Code 全链路** -- 从 ardot 设计稿到 Tailwind CSS 到 React 组件，一条链路、一套 Token、零手动同步。未来已来，拥抱 AI。
