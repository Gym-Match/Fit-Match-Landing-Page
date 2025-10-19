"use client";

import { Heart, Zap, Users } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function ExclusiveBenefitsSection() {
  const benefits = [
    {
      icon: Heart,
      title: "Encontre Sua Alma Gêmea Fitness",
      description:
        "Conecte-se com alguém que compartilha seus objetivos, valores e paixão por uma vida saudável. Amor verdadeiro começa na academia!",
    },
    {
      icon: Zap,
      title: "Motivação Diária Garantida",
      description:
        "Tenha sempre alguém para te motivar, celebrar suas conquistas e te ajudar a superar os desafios. Juntos vocês são mais fortes!",
    },
    {
      icon: Users,
      title: "Comunidade Exclusiva",
      description:
        "Faça parte de uma comunidade premium de pessoas comprometidas com saúde, bem-estar e relacionamentos autênticos.",
    },
  ];

  return (
    <section className="exclusive-benefits">
      <div className="section-content">
        <h2 className="section-title">
          Por que escolher o <span className="gradient-text">Fit Match</span>?
        </h2>

        {/* Grid para desktop */}
        <div className="benefits-grid desktop-grid">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="benefit-card">
                <IconComponent className="benefit-icon" size={48} />
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            );
          })}
        </div>

        {/* Carrossel para mobile */}
        <div className="benefits-swiper mobile-carousel">
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
            className="benefits-swiper-container"
          >
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <SwiperSlide key={index}>
                  <div className="benefit-card">
                    <IconComponent className="benefit-icon" size={48} />
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
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
