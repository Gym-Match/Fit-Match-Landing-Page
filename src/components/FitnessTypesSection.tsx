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
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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

  return (
    <section className="fitness-types">
      <div className="section-content">
        <h2 className="section-title">Todas as modalidades em um só lugar</h2>
        <p className="section-subtitle">
          Encontre parceiros para qualquer tipo de atividade física
        </p>

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
        <div className="modalities-swiper mobile-carousel">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet custom-bullet",
              bulletActiveClass:
                "swiper-pagination-bullet-active custom-bullet-active",
            }}
            loop={true}
            className="modalities-swiper-container"
          >
            {modalities.map((modality, index) => {
              const IconComponent = modality.icon;
              return (
                <SwiperSlide key={index}>
                  <div className="modality">
                    <IconComponent className="modality-icon" size={48} />
                    <h4>{modality.title}</h4>
                    <p>{modality.description}</p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
