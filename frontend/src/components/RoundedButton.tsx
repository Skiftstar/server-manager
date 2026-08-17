import type { ReactNode } from "react";

interface RoundedButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

function RoundedButton({ className, children, onClick }: RoundedButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`border border-divider hover:bg-divider/50 py-1 px-2 rounded-lg cursor-pointer text-sm text-nowrap ${className}`}
    >
      {children}
    </button>
  );
}

export default RoundedButton;
