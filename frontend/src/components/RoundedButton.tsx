import type { ReactNode } from "react";

interface RoundedButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

function RoundedButton({
  className,
  children,
  disabled,
  onClick,
}: RoundedButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`border border-divider hover:bg-divider/50 py-1 px-2 rounded-lg ${disabled ? "cursor-not-allowed" : "cursor-pointer"} 
        text-sm text-nowrap ${className} ${disabled ? "hover:bg-transparent!" : ""}`}
    >
      {children}
    </button>
  );
}

export default RoundedButton;
