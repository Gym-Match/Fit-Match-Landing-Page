"use client";

import { Gift, Users, Coins, Mail, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../styles/InviteCodeSection.css";

export default function InviteCodeSection() {
  const steps = [
    {
      number: 1,
      icon: Mail,
      title: "Receba seu código",
      description:
        "Após o pré-cadastro, você receberá um código único de 8 caracteres por email",
    },
    {
      number: 2,
      icon: Users,
      title: "Compartilhe com amigos",
      description:
        "Envie seu código para amigos que também querem encontrar parceiros de treino",
    },
    {
      number: 3,
      icon: Coins,
      title: "Ganhe FitCoins",
      description:
        "A cada amigo que usar seu código, você ganha FitCoins para usar quando o app for lançado",
    },
  ];

  return (
    <section className="invite-code-section">
      <div className="section-content">
        <div className="invite-header">
          <div className="invite-icon">
            <Gift size={48} />
          </div>
          <h2 className="invite-title">
            Convide amigos e ganhe{" "}
            <span className="gradient-text">FitCoins</span>
          </h2>
          <p className="invite-subtitle">
            Compartilhe seu código exclusivo e acumule moedas para usar no app
          </p>
        </div>

        {/* Grid para desktop */}
        <div className="invite-grid desktop-grid">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="invite-step">
                <div className="step-number">{step.number}</div>
                <div className="step-icon">
                  <IconComponent size={32} />
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            );
          })}
        </div>

        {/* Carrossel para mobile */}
        <div className="invite-swiper mobile-carousel">
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
            className="invite-swiper-container"
          >
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <SwiperSlide key={index}>
                  <div className="invite-step">
                    <div className="step-number">{step.number}</div>
                    <div className="step-icon">
                      <IconComponent size={32} />
                    </div>
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-description">{step.description}</p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <div className="fitcoins-info">
          <div className="fitcoins-content">
            <div className="fitcoins-icon">
              <Coins size={40} />
            </div>
            <div className="fitcoins-text">
              <h3>O que são FitCoins?</h3>
              <p>
                Moeda virtual do Fit Match que você pode usar para comprar
                Superlikes, revelar quem curtiu você, acessar filtros premium e
                muito mais!
              </p>
            </div>
          </div>

          <div className="fitcoins-benefits">
            <h4>Use suas FitCoins para:</h4>
            <div className="benefits-list">
              <div className="benefit-item">
                <ArrowRight size={16} />
                <span>Superlikes ilimitados</span>
              </div>
              <div className="benefit-item">
                <ArrowRight size={16} />
                <span>Ver quem curtiu você</span>
              </div>
              <div className="benefit-item">
                <ArrowRight size={16} />
                <span>Filtros premium avançados</span>
              </div>
              <div className="benefit-item">
                <ArrowRight size={16} />
                <span>Destaque no perfil</span>
              </div>
            </div>
          </div>
        </div>

        <div className="invite-cta">
          <h3>Quanto mais amigos, mais FitCoins!</h3>
          <p>
            Comece agora mesmo fazendo seu pré-cadastro e receba seu código
            exclusivo
          </p>
        </div>
      </div>
    </section>
  );
}
