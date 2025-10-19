"use client";

import { useRef } from "react";
import Image from "next/image";
import { useCarousel } from "../hooks/useCarousel";

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
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const {
    currentIndex,
    isAutoPlaying,
    goToPrevious,
    goToNext,
    goToSlide,
    handleMouseEnter,
    handleMouseLeave,
    handleFocus,
    handleBlur,
  } = useCarousel({
    itemsLength: carouselItems.length,
    autoPlayInterval: 5000,
    pauseOnHover: true,
    pauseOnFocus: true,
  });

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Removido navegação por teclado conforme solicitado
    e.preventDefault();
  };

  const currentItem = carouselItems[currentIndex];

  return (
    <div
      className="app-carousel"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="region"
      aria-label="Carrossel de funcionalidades do aplicativo"
    >
      {/* Mobile Carousel */}
      <div className="mobile-carousel">
        <div className="carousel-container">
          <div className="carousel-content" key={`mobile-${currentIndex}`}>
            <div className="carousel-image">
              <Image
                src={currentItem.image}
                alt={currentItem.alt}
                width={300}
                height={600}
                className="app-screenshot"
                priority
              />
            </div>
            <div className="carousel-text">
              <h3 className="carousel-title">{currentItem.title}</h3>
              <p className="carousel-description">{currentItem.description}</p>
            </div>
          </div>
        </div>

        {/* Dots indicator */}
        <div className="carousel-dots">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Carousel */}
      <div className="desktop-carousel">
        <div className="carousel-container">
          <div className="carousel-content" key={`desktop-${currentIndex}`}>
            <div className="carousel-image">
              <Image
                src={currentItem.image}
                alt={currentItem.alt}
                width={400}
                height={800}
                className="app-screenshot"
                priority
              />
            </div>
            <div className="carousel-text">
              <h3 className="carousel-title">{currentItem.title}</h3>
              <p className="carousel-description">{currentItem.description}</p>
            </div>
          </div>
        </div>

        {/* Dots indicator */}
        <div className="carousel-dots">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Auto-play status indicator */}
      {!isAutoPlaying && (
        <div className="autoplay-status" aria-live="polite">
          Auto-play pausado
        </div>
      )}

      {/* Screen reader announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {currentIndex + 1} de {carouselItems.length}: {currentItem.title}
      </div>
    </div>
  );
}
