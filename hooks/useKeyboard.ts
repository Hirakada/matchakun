"use client";

import { useEffect } from "react";

interface UseKeyboardProps {
  enabled?: boolean;

  onLeft?: () => void;
  onCenter?: () => void;
  onRight?: () => void;

  onConfirm?: () => void;

  onEscape?: () => void;
}

export function useKeyboard({
  enabled = true,
  onLeft,
  onCenter,
  onRight,
  onConfirm,
  onEscape,
}: UseKeyboardProps) {
  useEffect(() => {
    if (!enabled) return;

    function handleKeyDown(event: KeyboardEvent) {
      const key = event.key.toLowerCase();

      switch (key) {
        case "a":
        case "arrowleft":
          event.preventDefault();
          onLeft?.();
          break;

        case "s":
        case "arrowdown":
          event.preventDefault();
          onCenter?.();
          break;

        case "d":
        case "arrowright":
          event.preventDefault();
          onRight?.();
          break;

        case "enter":
        case " ":
          event.preventDefault();
          onConfirm?.();
          break;

        case "escape":
          event.preventDefault();
          onEscape?.();
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    enabled,
    onLeft,
    onCenter,
    onRight,
    onConfirm,
    onEscape,
  ]);
}