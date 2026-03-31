"use client";

import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "default" | "cta" | "selector" | "quiz";
  href?: string;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  variant = "default",
  href,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "w-fit flex text-center items-center justify-center shadow-sm px-6 py-2.5 rounded-full text-button font-medium transition-all duration-200";

  const interaction =
    "hover:bg-brand-500 hover:shadow-lg hover:scale-105 active:scale-95";

  const variants = {
    default:
      "bg-neutral-100 text-neutral-black",

    cta:
      "bg-brand-300 text-white",

    selector:
      "whitespace-nowrap !px-3 !py-2 !text-xs !rounded-full !shadow-none",
    
    quiz: `
      w-full
      min-h-[64px]
      px-5 py-4
      rounded-2xl

      bg-neutral-white text-neutral-black
      border border-neutral-200

      shadow-[0_8px_20px_rgba(0,0,0,0.05)]

      hover:border-brand-300
      hover:bg-brand-300/5
      hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)]
    `,
  };

  const combined = `${base} ${variants[variant]} ${interaction} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combined}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={combined} {...props}>
      {children}
    </button>
  );
}