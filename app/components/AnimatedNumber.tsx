"use client";

import React, { useEffect, useRef, useState } from "react";

export default function AnimatedNumber({
  value,
  duration = 700,
  decimals = 1,
}: {
  value: number;
  duration?: number;
  decimals?: number;
}) {
  const [display, setDisplay] = useState(0);
  const startRef = useRef<number | null>(null);
  const startVal = useRef(0);

  useEffect(() => {
    startVal.current = display;
    startRef.current = null;
    let raf: number;

    const step = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const progress = Math.min(1, (timestamp - startRef.current) / duration);
      const next = startVal.current + (value - startVal.current) * progress;
      setDisplay(Number(next.toFixed(decimals)));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration, decimals]);

  return <span aria-live="polite">{display}</span>;
}
