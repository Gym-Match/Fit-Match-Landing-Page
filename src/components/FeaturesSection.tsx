import Image from "next/image";
import AppCarousel from "./AppCarousel";
import "../styles/FeaturesSection.css";
import "../styles/AppCarousel.css";

export default function FeaturesSection() {
  return (
    <section className="features-section">
      <div className="section-content">
        <h2 className="main-section-title">
          Pensado para você encontrar quem mais combina com você
        </h2>

        {/* Novo Carrossel de Aplicativo */}
        <AppCarousel />

        {/* Seção de destaque */}
        <div className="highlight-section">
          <h2 className="highlight-title">
            Matches que <span className="gradient-text">treinam juntos</span>,
            ficam juntos
          </h2>
          <p className="highlight-subtitle">
            O match perfeito para o seu coração e seu estilo de vida fitness
          </p>
        </div>
      </div>
    </section>
  );
}
