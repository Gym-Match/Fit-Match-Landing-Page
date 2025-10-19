"use client";

import {
  Dumbbell,
  Users,
  Heart,
  Bike,
  Zap,
  Waves,
  Trophy,
  Target,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useModalitiesCarousel } from "@/hooks/useModalitiesCarousel";

export default function FitnessTypesSection() {
  const modalities = [
    {
      icon: Dumbbell,
      title: "Musculação",
      description: "Treinos de força e hipertrofia",
    },
    {
      icon: Users,
      title: "Corrida",
      description: "Desde caminhadas até maratonas",
    },
    {
      icon: Heart,
      title: "Yoga & Pilates",
      description: "Flexibilidade e equilíbrio",
    },
    {
      icon: Bike,
      title: "Ciclismo",
      description: "Bike indoor e outdoor",
    },
    {
      icon: Zap,
      title: "Lutas",
      description: "Boxe, MMA, Jiu-Jitsu",
    },
    {
      icon: Waves,
      title: "Natação",
      description: "Esportes aquáticos",
    },
    {
      icon: Trophy,
      title: "Esportes",
      description: "Futebol, tênis, vôlei",
    },
    {
      icon: Target,
      title: "Crossfit",
      description: "Treinos funcionais intensos",
    },
  ];

  const {
    currentIndex,
    totalPages,
    itemsPerPage,
    nextSlide,
    prevSlide,
    goToSlide,
  } = useModalitiesCarousel(modalities.length);

  const getVisibleModalities = () => {
    const startIndex = currentIndex * itemsPerPage;
    return modalities.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <section className="fitness-types">
      <div className="section-content">
        <h2 className="section-title">Todas as modalidades em um só lugar</h2>
        <p className="section-subtitle">
          Encontre parceiros para qualquer tipo de atividade física
        </p>

        <div className="modalities-container">
          {/* Grid para desktop */}
          <div className="modalities-grid desktop-grid">
            {modalities.map((modality, index) => {
              const IconComponent = modality.icon;
              return (
                <div key={index} className="modality">
                  <IconComponent className="modality-icon" size={48} />
                  <h4>{modality.title}</h4>
                  <p>{modality.description}</p>
                </div>
              );
            })}
          </div>

          {/* Carrossel para mobile */}
          <div className="modalities-carousel mobile-carousel">
            <div className="carousel-container">
              <button
                className="carousel-nav prev"
                onClick={prevSlide}
                aria-label="Modalidade anterior"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="carousel-content">
                <div
                  className="carousel-track"
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                >
                  {modalities.map((modality, index) => {
                    const IconComponent = modality.icon;
                    return (
                      <div key={index} className="modality carousel-slide">
                        <IconComponent className="modality-icon" size={48} />
                        <h4>{modality.title}</h4>
                        <p>{modality.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                className="carousel-nav next"
                onClick={nextSlide}
                aria-label="Próxima modalidade"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Indicadores */}
            <div className="carousel-dots">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${
                    index === currentIndex ? "active" : ""
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Ir para slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
