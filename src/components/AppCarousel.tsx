"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface CarouselItem {
  id: number;
  image: string;
  title: string;
  description: string;
  alt: string;
}

const carouselItems: CarouselItem[] = [
  {
    id: 1,
    image: "/assets/home.jpeg",
    title: "Encontre a pessoa certa",
    description:
      "Filtre por localização, interesses e objetivos fitness. Nosso algoritmo inteligente conecta você com pessoas que compartilham da mesma paixão por um estilo de vida saudável.",
    alt: "Encontre a pessoa certa",
  },
  {
    id: 2,
    image: "/assets/chat.PNG",
    title: "Converse com seus matchs",
    description:
      "Chat integrado para planejar treinos, trocar dicas e marcar encontros. Construa conexões reais que vão além da academia.",
    alt: "Converse com seus matchs",
  },
  {
    id: 3,
    image: "/assets/store.PNG",
    title: "Loja Fit Match",
    description:
      "Ganhe Fit Coins completando missões e troque por Superlikes, revelar curtidas e outros produtos exclusivos. Complete desafios diários e semanais para desbloquear funcionalidades especiais.",
    alt: "Produtos e Serviços",
  },
];

export default function AppCarousel() {
  return (
    <div className="app-carousel">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet custom-bullet",
          bulletActiveClass:
            "swiper-pagination-bullet-active custom-bullet-active",
        }}
        loop={true}
        className="app-swiper"
      >
        {carouselItems.map((item, index) => (
          <SwiperSlide key={item.id}>
            <div className={`carousel-content ${index === 1 ? "reverse" : ""}`}>
              <div className="carousel-image">
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={400}
                  height={800}
                  className="app-screenshot"
                  priority
                />
              </div>
              <div className="carousel-text">
                <h3 className="carousel-title">{item.title}</h3>
                <p className="carousel-description">{item.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
