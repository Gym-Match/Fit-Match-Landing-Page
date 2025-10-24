"use client";

import { Flame, MapPin, Target, Clock } from "lucide-react";
import PreRegisterForm from "./PreRegisterForm";
import AppStoreBadges from "./AppStoreBadges";

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-container">
        {/* Lado esquerdo: Conteúdo principal */}
        <div className="hero-left">
          <div className="badge">
            <Flame className="badge-icon" size={16} />
            <span>Em breve: O futuro dos encontros fitness</span>
          </div>

          <h1 className="hero-title">
            O primeiro app de
            <span className="gradient-text"> relacionamentos</span>
            <br />
            <span className="subtitle-accent">100% focado em fitness</span>
          </h1>

          <p className="hero-subtitle">
            Conecte-se com pessoas que compartilham sua paixão por uma vida
            saudável. Encontre alguém para treinar junto, alcançar metas e
            construir um relacionamento forte e fitness!
          </p>

          <div className="hero-features">
            <div className="feature-item">
              <MapPin className="feature-icon" size={20} />
              <span>Encontre pessoas perto de você</span>
            </div>
            <div className="feature-item">
              <Target className="feature-icon" size={20} />
              <span>Matches super precisos</span>
            </div>
            <div className="feature-item">
              <Clock className="feature-icon" size={20} />
              <span>Sincronize horários de treino</span>
            </div>
          </div>

          <AppStoreBadges />
        </div>

        {/* Lado direito: Formulário */}
        <div className="hero-right">
          <PreRegisterForm />
        </div>
      </div>
    </section>
  );
}
