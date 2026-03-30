"use client";

import { useEffect, useRef } from "react";
import Typed from "typed.js";

type Props = {
  strings: string[];
  typeSpeed?: number;
  backSpeed?: number;
  loop?: boolean;
};

export default function TypingAnimation({
  strings,
  typeSpeed = 80,
  backSpeed = 30,
  loop = false,
}: Props) {
  const el = useRef<HTMLSpanElement | null>(null);
  const typed = useRef<Typed | null>(null);

  useEffect(() => {
    if (!el.current) return;

    typed.current = new Typed(el.current, {
      strings,
      typeSpeed,
      backSpeed,
      loop,
      showCursor: true,
    });

    return () => {
      typed.current?.destroy(); 
    };
  }, [strings, typeSpeed, backSpeed, loop]);

  return <span ref={el} />;
}