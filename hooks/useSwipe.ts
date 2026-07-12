"use client";

import { useRef } from "react";

interface UseSwipeProps {
  enabled?: boolean;

  threshold?: number;
  tapThreshold?: number;

  onLeft?: () => void;
  onRight?: () => void;
  onCenter?: () => void;

  onTap?: () => void;
}

export function useSwipe({
  enabled = true,

  threshold = 50,
  tapThreshold = 12,

  onLeft,
  onRight,
  onCenter,

  onTap,
}: UseSwipeProps) {
  const startX = useRef(0);
  const startY = useRef(0);

  function onPointerDown(event: React.PointerEvent) {
    if (!enabled) return;

    startX.current = event.clientX;
    startY.current = event.clientY;
  }

  function onPointerUp(event: React.PointerEvent) {
    if (!enabled) return;

    const deltaX = event.clientX - startX.current;
    const deltaY = event.clientY - startY.current;

    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    const isTouch = event.pointerType === "touch";

    // Tap hanya untuk touch device
    if (absX < tapThreshold && absY < tapThreshold) {
      if (isTouch) {
        onTap?.();
      }
      return;
    }

    // Horizontal swipe
    if (absX > absY) {
      if (absX < threshold) return;

      if (deltaX > 0) {
        onRight?.();
      } else {
        onLeft?.();
      }

      return;
    }

    // Vertical swipe
    if (absY < threshold) return;

    onCenter?.();
  }

  return {
    onPointerDown,
    onPointerUp,
  };
}