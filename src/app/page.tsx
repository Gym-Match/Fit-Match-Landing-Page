"use client";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FitnessTypesSection from "@/components/FitnessTypesSection";
import ExclusiveBenefitsSection from "@/components/ExclusiveBenefitsSection";
import Footer from "@/components/Footer";
import BackgroundDecoration from "@/components/BackgroundDecoration";
import { usePageAnimations } from "@/hooks/useAnimations";

export default function Home() {
  // Usar as animações
  usePageAnimations();

  return (
    <div>
      <div className="container">
        <Header />

        <main className="main-content">
          <HeroSection />
          <FeaturesSection />
          <HowItWorksSection />
          <FitnessTypesSection />
          <ExclusiveBenefitsSection />
        </main>

        <BackgroundDecoration />
      </div>
      <Footer />
    </div>
  );
}
