# 从设计稿到可运行代码：ardot MCP 驱动的 Design-to-Code 全链路实践

## 背景

在传统的产品开发流程中，设计师在 Figma 中完成设计稿，开发者手动提取 Design Tokens、逐个还原组件，这个过程充满了沟通成本和还原误差。本次实践通过 **ardot MCP**（Model Context Protocol）打通了 AI 辅助设计到前端代码的全链路，实现了：

- AI 直接在 ardot 画布上生成完整 UI 设计稿
- 设计稿可持续迭代，实时验证
- 组件库、变量 Token 一键同步到前端代码
- Dark/Light 双主题从设计到代码完全一致

---

## 一、ardot MCP 生图能力：从零到完整设计稿

### 1.1 AI 驱动的设计稿生成

ardot MCP 提供了一套完整的设计操作 API，AI 可以像设计师一样直接在画布上创建 UI：

```
fetch_editor_state  → 获取画布状态和可用组件
apply_variables     → 创建/更新 Design Tokens
batch_edit          → 批量插入/更新/删除节点（Insert/Update/Delete/Copy）
capture_screenshot  → 实时截图验证设计效果
capture_layout      → 检查布局结构和对齐
```

整个 NexusAI 知识分享平台的设计稿（1440x900）完全由 AI 通过 ardot MCP 生成，包含：

| 区域 | 内容 |
|------|------|
| 顶部导航 | Logo（SVG 六边形图标）、导航链接、搜索栏、通知、头像 |
| 左侧边栏 | 导航菜单（首页/探索/AI工具/收藏）、分类标签 |
| Hero Banner | 渐变背景 + 径向光效、AI POWERED 标签、渐变标题、统计数据 |
| 内容卡片 | 3 列知识卡片（含 Unsplash 图片、标签、标题、描述、作者） |
| 右侧面板 | AI 助手卡片、热门话题、学习进度条 |

### 1.2 实时截图验证

ardot MCP 的 `capture_screenshot` 能力是迭代的关键 -- 每次修改后立即截图验证，发现问题立刻修复：

```
batch_edit()           → 生成/修改设计元素
capture_screenshot()   → 截图验证视觉效果
capture_layout()       → 检查布局数据
batch_edit()           → 修复发现的问题
```

这种**生成-验证-修复**的循环让 AI 能自主完成高质量的设计产出。

---

## 二、可持续迭代的设计稿

### 2.1 变量驱动的设计系统

ardot MCP 的 `apply_variables` 让设计稿从一开始就是变量驱动的。NexusAI 设计稿定义了 **24 个 Design Tokens**：

**颜色变量（17个）：**

| Token | Dark Mode | Light Mode | 用途 |
|-------|-----------|------------|------|
| `$bg-base` | `#0A0D17` | `#F7F7FA` | 页面底色 |
| `$bg-surface` | `#121724` | `#FFFFFF` | 面板背景 |
| `$bg-card` | `#171C2E` | `#FAFAFE` | 卡片背景 |
| `$bg-elevated` | `#1F2638` | `#F2F2F8` | 高亮区块 |
| `$bg-accent-cyan` | `#0D2633` | `#E6F8FC` | Cyan 标签背景 |
| `$bg-accent-purple` | `#1F1438` | `#F2EAFF` | Purple 标签背景 |
| `$bg-accent-green` | `#0F2E1F` | `#EBFAF2` | Green 标签背景 |
| `$accent-cyan` | `#33C7EB` | `#0D8CAE` | 主强调色 |
| `$accent-purple` | `#946BE6` | `#612EB8` | 次强调色 |
| `$accent-green` | `#40D194` | `#148C5A` | 成功色 |
| `$accent-cyan-text` | `#66D9F2` | `#0A7394` | Cyan 文本 |
| `$accent-purple-text` | `#B894FA` | `#521F9E` | Purple 文本 |
| `$accent-green-text` | `#66E0A6` | `#0F7347` | Green 文本 |
| `$text-primary` | `#EBF0FA` | `#12121A` | 主文本 |
| `$text-secondary` | `#ADB8D1` | `#5A5E73` | 次文本 |
| `$text-muted` | `#808CA6` | `#8C94A6` | 弱文本 |
| `$border-subtle` | `#2E3852` | `#E0E3EB` | 边框 |

**数值变量（6个）：**
- `$radius-sm/md/lg`: 6px / 12px / 16px
- `$spacing-sm/md/lg`: 8px / 16px / 24px

### 2.2 一键切换主题

通过 ardot 的 variable modes 能力，同一套设计稿只需切换 mode 就能在 Dark/Light 主题间切换。所有使用了 `$variable` 引用的节点会自动更新颜色。

### 2.3 迭代过程

设计稿经历了多轮迭代：

1. **V1**：基础布局 + Dark 硬编码色值
2. **V2**：引入 Design Tokens 变量系统
3. **V3**：修复文本对比度，新增 `bg-accent-*` 背景色 Token
4. **V4**：将硬编码颜色绑定到变量，消除魔法数字
5. **V5**：新增 Light mode，创建亮色设计稿

每次迭代都通过 ardot MCP 的截图验证确保质量。

---

## 三、组件库：设计复用的基石

### 3.1 6 个可复用组件

通过 ardot MCP 的 `batch_edit` 创建了 `type: "component"` 可复用组件：

| 组件 | 说明 | 关键 Token 引用 |
|------|------|----------------|
| `component/Tag` | 标签徽章 | `$bg-accent-cyan` + `$accent-cyan-text` |
| `component/Button` | 渐变按钮 | `$accent-purple` → `$accent-cyan` gradient |
| `component/KnowledgeCard` | 知识卡片 | `$bg-card` + `$text-primary` + `$radius-md` |
| `component/ProgressBar` | 进度条 | `$bg-elevated` + `$accent-cyan` |
| `component/NavItem` | 导航项 | `$text-secondary` + `$text-muted` |
| `component/TrendItem` | 热门话题 | `$bg-elevated` + `$accent-cyan-text` |

### 3.2 组件实例化

组件创建后，可以在画布任意位置通过 `ref` 引用插入实例，并通过 `descendants` 覆写内容：

```javascript
// 插入卡片实例并覆写标题
card=I(container, {type: "ref", ref: "component/KnowledgeCard"})
U(card+"title", {content: "GPT-5 架构解析"})
```

---

## 四、Design to Code：一键打通

### 4.1 Token 到 Tailwind

ardot 设计稿中的 24 个 Design Tokens 直接映射为 Tailwind v4 的 `@theme` 变量：

```css
@theme {
  --color-bg-base: var(--nexus-bg-base);
  --color-accent-cyan: var(--nexus-accent-cyan);
  --color-text-primary: var(--nexus-text-primary);
  /* ... */
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

### 4.2 组件到 React

设计稿中的 6 个组件直接映射为 React 组件：

| 设计组件 | React 组件 | Tailwind 类名示例 |
|---------|-----------|------------------|
| `component/Tag` | `<span className="bg-bg-accent-cyan text-accent-cyan-text">` | Token 直接引用 |
| `component/KnowledgeCard` | `<KnowledgeCard>` | `bg-bg-card rounded-md border-border-subtle` |
| `component/Button` | `<button>` | `bg-gradient-to-r from-accent-purple to-accent-cyan` |

### 4.3 主题切换

设计稿的 Dark/Light 双 mode 对应前端的 CSS class 切换：

```tsx
// ThemeToggle 组件
const toggle = () => {
  const next = theme === "dark" ? "light" : "dark";
  document.documentElement.className = next;
  localStorage.setItem("nexus-theme", next);
};
```

### 4.4 项目结构

最终生成的 Next.js 15 + Tailwind v4 项目：

```
NexusAI/
├── app/
│   ├── globals.css          ← 24 Design Tokens (Dark + Light)
│   ├── layout.tsx           ← Root layout
│   └── page.tsx             ← 主页面
├── components/
│   ├── TopNav.tsx           ← 导航栏 + 主题切换
│   ├── Sidebar.tsx          ← 侧边栏
│   ├── HeroBanner.tsx       ← Hero 区域
│   ├── KnowledgeCard.tsx    ← 知识卡片
│   ├── RightPanel.tsx       ← AI助手 + 趋势 + 进度
│   └── ThemeToggle.tsx      ← Dark/Light 切换
├── package.json
└── tsconfig.json
```

---

## 五、效果展示

### 5.1 ardot 设计稿

**Dark Mode 设计稿：**
- 设计稿地址：https://ardot.tencent.com/file/664524072087754
- 节点 `3:20` -- 深色主题完整界面

**Light Mode 设计稿：**
- 节点 `3:220` -- 亮色主题完整界面

**组件库：**
- 节点 `3:203` -- 6 个可复用组件

### 5.2 前端项目

**Dark Mode：**
- 深色背景 `#0A0D17`，浅色文本 `#EBF0FA`
- 强调色 `#33C7EB` (cyan) / `#946BE6` (purple) / `#40D194` (green)

**Light Mode：**
- 浅色背景 `#F7F7FA`，深色文本 `#12121A`
- 强调色自动切换为深色变体保证对比度

运行项目：
```bash
cd NexusAI && npm run dev
# 访问 http://localhost:3099
```

---

## 六、总结

### ardot MCP 的核心价值

| 能力 | 传统流程 | ardot MCP 流程 |
|------|---------|---------------|
| 生成设计稿 | 设计师手动绘制 | AI 通过 MCP 直接生成 |
| Design Tokens | 手动定义和同步 | `apply_variables` 一键创建，支持多模式 |
| 组件库 | 手动创建和维护 | `batch_edit` 批量创建可复用组件 |
| 主题切换 | 手动维护两套设计 | Variable modes 自动切换 |
| 设计验证 | 人工检查 | `capture_screenshot` + `capture_layout` 自动验证 |
| Design to Code | 手动提取和还原 | Token 直接映射 Tailwind 变量，组件 1:1 对应 |

### 关键收获

1. **ardot MCP 的生图能力**让 AI 成为了设计工具的直接操作者，不再需要中间格式转换
2. **变量驱动的设计系统**是 Design-to-Code 的桥梁 -- 设计稿中的 `$bg-card` 直接变成 CSS 的 `var(--color-bg-card)`
3. **可迭代的设计稿**意味着设计不再是一次性交付物，而是可以持续演进的活文档
4. **组件库的复用**让设计稿和代码保持了一致的抽象层级

这套流程实现了真正的 **Design Token 一键打通** -- 从 ardot 设计稿到 Tailwind CSS 到 React 组件，一条链路、一套 Token、零手动同步。
