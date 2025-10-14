import { FileText, Search, MessageCircle } from "lucide-react";

export default function HowItWorksSection() {
  return (
    <section className="how-it-works">
      <div className="section-content">
        <h2 className="section-title">
          Como o <span className="gradient-text">Fit Match</span> funciona
        </h2>

        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>
                <FileText className="step-icon" size={20} />
                Crie seu perfil fitness
              </h3>
              <p>
                Conte sobre seus objetivos, modalidades favoritas e
                disponibilidade de horários
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>
                <Search className="step-icon" size={20} />
                Descubra matches perfeitos
              </h3>
              <p>
                Nosso algoritmo encontra pessoas com objetivos similares na sua
                região
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>
                <MessageCircle className="step-icon" size={20} />
                Conecte-se e treine junto
              </h3>
              <p>
                Converse, marque treinos e construa relacionamentos saudáveis
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
