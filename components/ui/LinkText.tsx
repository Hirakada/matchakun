"use client";

import NextLink from "next/link";

type LinkTextProps = {
  children: React.ReactNode;
  href: string;
  variant?: "navigation" | "hyperlink";
  external?: boolean;
  className?: string;
};

export default function LinkText({
  children,
  href,
  variant = "navigation",
  external = false,
  className = "",
}: LinkTextProps) {
  const base =
    "relative inline-block text-body-sm font-medium transition-all duration-200";

  const variants = {
    navigation:
      "after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1 " +
      "after:h-[2px] after:w-0 after:bg-current " +
      "after:transition-all after:duration-300 after:ease-out " +
      "hover:after:w-full",

    hyperlink:
      "text-brand-500 underline underline-offset-4 hover:text-brand-700",
  };

  const interaction =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2";

  const combined = `${base} ${variants[variant]} ${interaction} ${className}`;

  if (external) {
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
    <NextLink href={href} className={combined}>
      {children}
    </NextLink>
  );
}