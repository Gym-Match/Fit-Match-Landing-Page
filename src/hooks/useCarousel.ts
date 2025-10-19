import { useEffect, useState, useRef } from "react";

interface UseCarouselOptions {
  itemsLength: number;
  autoPlayInterval?: number;
  pauseOnHover?: boolean;
  pauseOnFocus?: boolean;
}

export function useCarousel({
  itemsLength,
  autoPlayInterval = 5000,
  pauseOnHover = true,
  pauseOnFocus = true,
}: UseCarouselOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timeouts on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === itemsLength - 1 ? 0 : prevIndex + 1
      );
    }, autoPlayInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isAutoPlaying, isPaused, itemsLength, autoPlayInterval]);

  // Pause auto-play when page is not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const pauseAutoPlay = (resumeAfter = 10000) => {
    setIsAutoPlaying(false);

    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }

    resumeTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, resumeAfter);
  };

  const goToPrevious = () => {
    pauseAutoPlay();
    setCurrentIndex(currentIndex === 0 ? itemsLength - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    pauseAutoPlay();
    setCurrentIndex(currentIndex === itemsLength - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index: number) => {
    pauseAutoPlay();
    setCurrentIndex(index);
  };

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

  const handleFocus = () => {
    if (pauseOnFocus) {
      setIsPaused(true);
    }
  };

  const handleBlur = () => {
    if (pauseOnFocus) {
      setIsPaused(false);
    }
  };

  return {
    currentIndex,
    isAutoPlaying: isAutoPlaying && !isPaused,
    goToPrevious,
    goToNext,
    goToSlide,
    handleMouseEnter,
    handleMouseLeave,
    handleFocus,
    handleBlur,
  };
}
