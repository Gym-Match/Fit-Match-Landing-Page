import { Heart, Zap, Users } from "lucide-react";

export default function ExclusiveBenefitsSection() {
  return (
    <section className="exclusive-benefits">
      <div className="section-content">
        <h2 className="section-title">
          Por que escolher o <span className="gradient-text">Fit Match</span>?
        </h2>

        <div className="benefits-grid">
          <div className="benefit-card">
            <Heart className="benefit-icon" size={48} />
            <h3>Encontre Sua Alma Gêmea Fitness</h3>
            <p>
              Conecte-se com alguém que compartilha seus objetivos, valores e
              paixão por uma vida saudável. Amor verdadeiro começa na academia!
            </p>
          </div>

          <div className="benefit-card">
            <Zap className="benefit-icon" size={48} />
            <h3>Motivação Diária Garantida</h3>
            <p>
              Tenha sempre alguém para te motivar, celebrar suas conquistas e te
              ajudar a superar os desafios. Juntos vocês são mais fortes!
            </p>
          </div>

          <div className="benefit-card">
            <Users className="benefit-icon" size={48} />
            <h3>Comunidade Exclusiva</h3>
            <p>
              Faça parte de uma comunidade premium de pessoas comprometidas com
              saúde, bem-estar e relacionamentos autênticos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
