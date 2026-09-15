"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

export function Reveal({ children, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.12 });
  const reducedMotion = useReducedMotion();
  return (
    <div
      ref={ref}
      className={`reveal ${className ?? ""}`}
      data-revealed={visible && !reducedMotion}
    >
      {children}
    </div>
  );
}
