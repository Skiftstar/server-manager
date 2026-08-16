import type { ReactNode } from "react";

interface ContentCardProps {
  children: ReactNode;
}

function ContentCard({ children }: ContentCardProps) {
  return (
    <div className="w-full h-full bg-surface p-3 border-accent/30 border rounded overflow-hidden">
      {children}
    </div>
  );
}

export default ContentCard;
