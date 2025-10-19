"use client";

import { useState, useEffect, useCallback } from "react";

export function useModalitiesCarousel(totalItems: number) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 768) {
        setItemsPerPage(4); // Desktop: 4 itens por linha
      } else if (window.innerWidth >= 480) {
        setItemsPerPage(2); // Tablet: 2 itens por linha
      } else {
        setItemsPerPage(1); // Mobile: 1 item por vez
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Auto-play no mobile
  useEffect(() => {
    if (itemsPerPage === 1) {
      const interval = setInterval(nextSlide, 4000);
      return () => clearInterval(interval);
    }
  }, [nextSlide, itemsPerPage]);

  return {
    currentIndex,
    totalPages,
    itemsPerPage,
    nextSlide,
    prevSlide,
    goToSlide,
  };
}
