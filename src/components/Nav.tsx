"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const links = [
  { href: "#app", label: "O app" },
  { href: "#recursos", label: "Recursos" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#fitcoins", label: "FitCoins" },
];

export default function Nav() {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${stuck ? "is-stuck" : ""}`}>
      <div className="shell nav__inner">
        <a href="#topo" className="brand" aria-label="Fit Match — início">
          <span className="brand__mark">
            <Image
              src="/assets/logo.png"
              alt=""
              width={34}
              height={34}
              priority
            />
          </span>
          <span>
            Fit <span className="grad">Match</span>
          </span>
        </a>

        <nav className="nav__links">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav__link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav__cta">
          <a href="#pre-cadastro" className="btn btn--primary btn--sm">
            <span className="only-wide">Garantir meu Premium</span>
            <span className="only-narrow">Pré-cadastro</span>
          </a>
        </div>
      </div>
    </header>
  );
}
