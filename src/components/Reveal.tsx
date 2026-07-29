"use client";

import { useEffect, useRef, useState } from "react";
import type { ElementType, ReactNode } from "react";

type Variant =
  | "up"
  | "left"
  | "right"
  | "scale"
  /* As quatro abaixo só ganham valores próprios acima de 1081px; abaixo disso
     caem no deslocamento vertical padrão. */
  | "flyLeft"
  | "flyRight"
  | "rise3d"
  | "pop"
  | "drop";

interface RevealProps {
  children: ReactNode;
  /** Tag renderizada. Útil para manter semântica (section, li, h2...). */
  as?: ElementType;
  variant?: Variant;
  /** Atraso em ms — usado para escalonar itens de uma mesma lista. */
  delay?: number;
  className?: string;
}

const variantClass: Record<Variant, string> = {
  up: "",
  left: "reveal--left",
  right: "reveal--right",
  scale: "reveal--scale",
  flyLeft: "reveal--fly-left",
  flyRight: "reveal--fly-right",
  rise3d: "reveal--rise3d",
  pop: "reveal--pop",
  drop: "reveal--drop",
};

export default function Reveal({
  children,
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${variantClass[variant]} ${
        visible ? "is-in" : ""
      } ${className}`.trim()}
      style={delay ? { ["--reveal-delay" as string]: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
