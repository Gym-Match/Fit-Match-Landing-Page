import Image from "next/image";
import "../styles/FeaturesSection.css";

export default function FeaturesSection() {
  return (
    <section className="features-section">
      <div className="section-content">
        <h2 className="main-section-title">
          Pensado para você encontrar quem mais combina com você
        </h2>

        <div className="features-grid">
          {/* Feature 1 */}
          <div className="feature-item">
            <div className="feature-image">
              <Image
                src="/assets/home.jpeg"
                alt="Encontre a pessoa certa"
                className="feature-img"
                width={400}
                height={300}
              />
            </div>
            <div className="feature-content">
              <h3 className="feature-title">Encontre a pessoa certa</h3>
              <p className="feature-description">
                Filtre por localização, interesses e objetivos fitness. Nosso
                algoritmo inteligente conecta você com pessoas que compartilham
                da mesma paixão por um estilo de vida saudável.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="feature-item reverse">
            <div className="feature-image">
              <Image
                src="/assets/chat.PNG"
                alt="Converse com seus matchs"
                className="feature-img"
                width={400}
                height={300}
              />
            </div>
            <div className="feature-content">
              <h3 className="feature-title">Converse com seus matchs</h3>
              <p className="feature-description">
                Chat integrado para planejar treinos, trocar dicas e marcar
                encontros. Construa conexões reais que vão além da academia.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="feature-item">
            <div className="feature-image">
              <Image
                src="/assets/store.PNG"
                alt="Produtos e Serviços"
                className="feature-img"
                width={400}
                height={300}
              />
            </div>
            <div className="feature-content">
              <h3 className="feature-title">Loja Fit Match</h3>
              <p className="feature-description">
                Ganhe Fit Coins completando missões e troque por Superlikes,
                revelar curtidas e outros produtos exclusivos. Complete desafios
                diários e semanais para desbloquear funcionalidades especiais.
              </p>
            </div>
          </div>
        </div>

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
