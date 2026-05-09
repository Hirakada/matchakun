"use client";

import React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "default" | "cta" | "selector" | "quiz";
  href?: string;
  className?: string;
  asChild?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  variant = "default",
  href,
  className = "",
  asChild = false,
  ...props
}: ButtonProps) {
  const base = `
    inline-flex w-fit items-center justify-center
    rounded-full
    px-6 py-2.5

    text-center
    text-button
    font-medium

    transition-all duration-200

    disabled:pointer-events-none
    disabled:opacity-50
  `;

  const interaction = `
    hover:bg-brand-500
    hover:shadow-lg
    hover:scale-105
    active:scale-95
  `;

  const variants = {
    default: `
      bg-neutral-100
      text-neutral-black
      shadow-sm
    `,

    cta: `
      bg-brand-300
      text-white
      shadow-sm
    `,

    selector: `
      whitespace-nowrap
      !rounded-full
      !px-3
      !py-2
      !text-xs
      !shadow-none
    `,

    quiz: `
      w-full
      min-h-[64px]

      rounded-2xl

      border border-neutral-200

      bg-neutral-white
      px-5 py-4

      text-neutral-black

      shadow-[0_8px_20px_rgba(0,0,0,0.05)]

      hover:border-brand-300
      hover:bg-brand-300/5
      hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)]
    `,
  };

  const combined = cn(
    base,
    variants[variant],
    interaction,
    className
  );

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

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{
      className?: string;
    }>;
    
    return React.cloneElement(child, {
      className: cn(
        combined,
        child.props.className
      ),
      ...props,
    });
  }

  return (
    <button
      type="button"
      className={combined}
      {...props}
    >
      {children}
    </button>
  );
}