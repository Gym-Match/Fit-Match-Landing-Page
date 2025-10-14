"use client";

import { useEffect } from "react";

export function useScrollAnimations() {
  useEffect(() => {
    // Configurar animações de scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
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

    // Observador específico para títulos de seção
    const titleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.3 }
    );

    // Observar todos os títulos de seção
    const sectionTitles = document.querySelectorAll(".section-title");
    sectionTitles.forEach((title) => {
      titleObserver.observe(title);
    });

    // Animação específica para os cards em sequência
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll(
            ".step, .modality, .benefit-card"
          );
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add("animate-in");
            }, index * 150);
          });
        }
      });
    }, observerOptions);

    // Observar seções com cards
    const cardSections = document.querySelectorAll(
      ".how-it-works .steps, .modalities-grid, .benefits-grid"
    );
    cardSections.forEach((section) => cardObserver.observe(section));

    // Cleanup
    return () => {
      observer.disconnect();
      titleObserver.disconnect();
      cardObserver.disconnect();
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
        animation: float-up 4s linear forwards;
        opacity: 0.7;
      `;

      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 4000);
    };

    // Adicionar CSS para animação dos corações
    const heartStyle = document.createElement("style");
    heartStyle.textContent = `
      @keyframes float-up {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 0.7;
        }
        100% {
          transform: translateY(-100vh) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(heartStyle);

    // Floating hearts animation
    const interval = setInterval(createFloatingHeart, 3000);

    return () => {
      clearInterval(interval);
      document.head.removeChild(heartStyle);
    };
  }, []);
}

export function usePageAnimations() {
  useScrollAnimations();
  useFloatingHearts();
}
