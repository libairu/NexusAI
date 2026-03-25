interface KnowledgeCardProps {
  image: string;
  tagLabel: string;
  tagColor: "cyan" | "purple" | "green";
  title: string;
  description: string;
  author: string;
  readTime?: string;
  likes: string;
}

const tagStyles = {
  cyan: "bg-bg-accent-cyan text-accent-cyan-text",
  purple: "bg-bg-accent-purple text-accent-purple-text",
  green: "bg-bg-accent-green text-accent-green-text",
};

const likesColor = {
  cyan: "text-accent-cyan-text",
  purple: "text-accent-purple-text",
  green: "text-accent-green-text",
};

const avatarGradient = {
  cyan: "from-accent-cyan to-[#3399FF]",
  purple: "from-accent-purple to-[#CC33CC]",
  green: "from-accent-green to-[#009966]",
};

export default function KnowledgeCard({
  image,
  tagLabel,
  tagColor,
  title,
  description,
  author,
  readTime,
  likes,
}: KnowledgeCardProps) {
  return (
    <div className="flex-1 flex flex-col bg-bg-card rounded-md border border-border-subtle/70 overflow-hidden">
      {/* Image */}
      <div className="w-full h-[120px] bg-bg-elevated overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2 px-md pt-3 pb-md">
        <span className={`w-fit text-[11px] px-2 py-0.5 rounded ${tagStyles[tagColor]}`}>
          {tagLabel}
        </span>
        <h3 className="text-sm font-bold text-text-primary leading-snug">{title}</h3>
        <p className="text-xs text-text-muted leading-relaxed">{description}</p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-1.5">
            <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${avatarGradient[tagColor]}`} />
            <span className="text-[11px] text-text-muted">{author}</span>
          </div>
          <div className="flex items-center gap-3">
            {readTime && <span className="text-[11px] text-text-muted">{readTime}</span>}
            <span className={`text-[11px] ${likesColor[tagColor]}`}>{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
