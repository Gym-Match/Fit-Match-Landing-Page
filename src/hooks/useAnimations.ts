"use client";

import { useEffect } from "react";

export function useScrollAnimations() {
  useEffect(() => {
    // Configurar animações de scroll com opções mais suaves
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -80px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    // Observar seções para animação
    const sectionsToAnimate = document.querySelectorAll(
      ".how-it-works, .fitness-types, .exclusive-benefits, .step, .modality, .benefit-card, .feature-highlight, .feature-item, .section-title, .features-section, .hero-features"
    );

    sectionsToAnimate.forEach((section) => {
      section.classList.add("scroll-animate");
      observer.observe(section);
    });

    // Observador específico para títulos de seção com animação mais suave
    const titleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -50px 0px" }
    );

    // Observar todos os títulos de seção
    const sectionTitles = document.querySelectorAll(".section-title");
    sectionTitles.forEach((title) => {
      titleObserver.observe(title);
    });

    // Animação específica para os cards em sequência (stagger effect)
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll(
            ".step, .modality, .benefit-card"
          );
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add("animate-in");
            }, index * 100); // Reduzido para 100ms para animação mais rápida
          });
        }
      });
    }, observerOptions);

    // Observar seções com cards
    const cardSections = document.querySelectorAll(
      ".how-it-works .steps, .modalities-grid, .benefits-grid"
    );
    cardSections.forEach((section) => cardObserver.observe(section));

    // Animação inicial do hero com delay suave
    setTimeout(() => {
      const heroElements = document.querySelectorAll(
        ".hero-title, .hero-subtitle, .hero-features, .app-store-section, .form-card"
      );
      heroElements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add("hero-animate-in");
        }, index * 150);
      });
    }, 100); // Pequeno delay inicial para evitar flash

    // Animação para badges e elementos especiais
    const badgeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scale-in-element", "visible");
          }
        });
      },
      { threshold: 0.5 }
    );

    const badges = document.querySelectorAll(".badge, .premium-badge");
    badges.forEach((badge) => badgeObserver.observe(badge));

    // Cleanup
    return () => {
      observer.disconnect();
      titleObserver.disconnect();
      cardObserver.disconnect();
      badgeObserver.disconnect();
    };
  }, []);
}

export function useFloatingHearts() {
  useEffect(() => {
    const createFloatingHeart = () => {
      const heart = document.createElement("div");
      heart.innerHTML = "💖";
      heart.style.cssText = `
        position: fixed;
        font-size: 1.5rem;
        left: ${Math.random() * 100}vw;
        bottom: -20px;
        z-index: 0;
        pointer-events: none;
        animation: float-up 5s ease-out forwards;
        opacity: 0.6;
      `;

      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 5000);
    };

    // Adicionar CSS para animação dos corações com curva mais suave
    const heartStyle = document.createElement("style");
    heartStyle.textContent = `
      @keyframes float-up {
        0% {
          transform: translateY(0) translateX(0) rotate(0deg);
          opacity: 0.6;
        }
        50% {
          transform: translateY(-50vh) translateX(${
            Math.random() * 40 - 20
          }px) rotate(180deg);
          opacity: 0.4;
        }
        100% {
          transform: translateY(-100vh) translateX(${
            Math.random() * 60 - 30
          }px) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(heartStyle);

    // Floating hearts animation com intervalo maior para não sobrecarregar
    const interval = setInterval(createFloatingHeart, 4000);

    return () => {
      clearInterval(interval);
      document.head.removeChild(heartStyle);
    };
  }, []);
}

// Hook para animações de parallax suaves
export function useParallaxEffect() {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const parallaxElements = document.querySelectorAll(".gradient-orb");

      parallaxElements.forEach((element, index) => {
        const speed = 0.3 + index * 0.1; // Velocidades diferentes para cada orb
        const yPos = -(scrolled * speed);
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    // Throttle para melhor performance
    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollHandler, { passive: true });

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);
}

export function usePageAnimations() {
  useScrollAnimations();
  useFloatingHearts();
  useParallaxEffect();
}
