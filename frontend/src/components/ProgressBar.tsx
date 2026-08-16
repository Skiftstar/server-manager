interface ProgressBarProps {
  percent: number; // 0-100
  color?: string;
  className?: string;
}

export default function ProgressBar({
  percent,
  className = "",
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percent));

  return (
    <div
      className={`h-1 w-full overflow-hidden rounded-full bg-bg ${className}`}
    >
      <div
        className={`h-1 rounded-full transition-all duration-300 bg-accent`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
