import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "outline"
  | "ghost"
  | "link";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: ReactNode;
}

const getVariantClasses = (variant: ButtonVariant): string => {
  const variants = {
    primary:
      "bg-red-9 text-white hover:bg-red-7 focus:ring-2 focus:ring-red-7 focus:ring-offset-2",
    secondary:
      "bg-gray-7 text-white hover:bg-gray-6 focus:ring-2 focus:ring-gray-5 focus:ring-offset-2",
    accent:
      "bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2",
    outline:
      "border-2 border-gray-9 text-gray-9 hover:bg-gray-3 focus:ring-2 focus:ring-gray-7 focus:ring-offset-2",
    ghost:
      "text-gray-9 hover:bg-gray-3 focus:ring-2 focus:ring-gray-7 focus:ring-offset-2",
    link: "text-red-9 underline-offset-4 hover:underline focus:ring-2 focus:ring-red-7 focus:ring-offset-2",
  };
  return variants[variant];
};

const getSizeClasses = (size: ButtonSize): string => {
  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  };
  return sizes[size];
};

export const Button = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  children,
  ...props
}: ButtonProps) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none cursor-pointer";
  const variantClasses = getVariantClasses(variant);
  const sizeClasses = getSizeClasses(size);
  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
