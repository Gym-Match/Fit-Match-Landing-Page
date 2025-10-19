"use client";

import { FileText, Search, MessageCircle } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      icon: FileText,
      title: "Crie seu perfil fitness",
      description:
        "Conte sobre seus objetivos, modalidades favoritas e disponibilidade de horários",
    },
    {
      number: 2,
      icon: Search,
      title: "Descubra matches perfeitos",
      description:
        "Nosso algoritmo encontra pessoas com objetivos similares na sua região",
    },
    {
      number: 3,
      icon: MessageCircle,
      title: "Conecte-se e treine junto",
      description:
        "Converse, marque treinos e construa relacionamentos saudáveis",
    },
  ];

  return (
    <section className="how-it-works">
      <div className="section-content">
        <h2 className="section-title">
          Como o <span className="gradient-text">Fit Match</span> funciona
        </h2>

        {/* Grid para desktop */}
        <div className="steps desktop-grid">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="step">
                <div className="step-number">{step.number}</div>
                <div className="step-content">
                  <h3>
                    <IconComponent className="step-icon" size={20} />
                    {step.title}
                  </h3>
                  <p>{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carrossel para mobile */}
        <div className="steps-swiper mobile-carousel">
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
            className="steps-swiper-container"
          >
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <SwiperSlide key={index}>
                  <div className="step">
                    <div className="step-number">{step.number}</div>
                    <div className="step-content">
                      <h3>
                        <IconComponent className="step-icon" size={20} />
                        {step.title}
                      </h3>
                      <p>{step.description}</p>
                    </div>
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
