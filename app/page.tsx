import TopNav from "@/components/TopNav";
import Sidebar from "@/components/Sidebar";
import HeroBanner from "@/components/HeroBanner";
import KnowledgeCard from "@/components/KnowledgeCard";
import RightPanel from "@/components/RightPanel";

const cards = [
  {
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=300&fit=crop",
    tagLabel: "大语言模型",
    tagColor: "cyan" as const,
    title: "GPT-5 架构解析：从 Transformer 到多模态推理",
    description: "深度剖析最新大模型架构设计，探索多模态能力背后的技术原理",
    author: "Dr. Wei Chen",
    readTime: "12 min",
    likes: "2.4K",
  },
  {
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=300&fit=crop",
    tagLabel: "量子计算",
    tagColor: "purple" as const,
    title: "量子计算时代：AI 算法的次元革命",
    description: "量子优势如何改变机器学习范式，解密复杂问题的新路径",
    author: "Prof. Lin Zhang",
    likes: "1.8K",
  },
  {
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=300&fit=crop",
    tagLabel: "机器人技术",
    tagColor: "green" as const,
    title: "具身化 AI：今天的机器人如何感知世界",
    description: "从传感器融合到多模态感知，探索具身化 AI 的技术底座",
    author: "Maya Robotics",
    likes: "3.1K",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-lg flex flex-col gap-5">
          <HeroBanner />
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-text-primary">AI 正在推荐</h2>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-bg-accent-purple border border-accent-purple/35">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
              <span className="text-[11px] text-accent-purple-text">个性化推荐</span>
            </div>
          </div>
          {/* Cards */}
          <div className="flex gap-md">
            {cards.map((card) => (
              <KnowledgeCard key={card.title} {...card} />
            ))}
          </div>
        </main>
        <RightPanel />
      </div>
    </div>
  );
}
