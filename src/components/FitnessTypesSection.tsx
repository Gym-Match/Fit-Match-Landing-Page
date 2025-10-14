import {
  Dumbbell,
  Users,
  Heart,
  Bike,
  Zap,
  Waves,
  Trophy,
  Target,
} from "lucide-react";

export default function FitnessTypesSection() {
  return (
    <section className="fitness-types">
      <div className="section-content">
        <h2 className="section-title">Todas as modalidades em um só lugar</h2>
        <p className="section-subtitle">
          Encontre parceiros para qualquer tipo de atividade física
        </p>

        <div className="modalities-grid">
          <div className="modality">
            <Dumbbell className="modality-icon" size={48} />
            <h4>Musculação</h4>
            <p>Treinos de força e hipertrofia</p>
          </div>

          <div className="modality">
            <Users className="modality-icon" size={48} />
            <h4>Corrida</h4>
            <p>Desde caminhadas até maratonas</p>
          </div>

          <div className="modality">
            <Heart className="modality-icon" size={48} />
            <h4>Yoga & Pilates</h4>
            <p>Flexibilidade e equilíbrio</p>
          </div>

          <div className="modality">
            <Bike className="modality-icon" size={48} />
            <h4>Ciclismo</h4>
            <p>Bike indoor e outdoor</p>
          </div>

          <div className="modality">
            <Zap className="modality-icon" size={48} />
            <h4>Lutas</h4>
            <p>Boxe, MMA, Jiu-Jitsu</p>
          </div>

          <div className="modality">
            <Waves className="modality-icon" size={48} />
            <h4>Natação</h4>
            <p>Esportes aquáticos</p>
          </div>

          <div className="modality">
            <Trophy className="modality-icon" size={48} />
            <h4>Esportes</h4>
            <p>Futebol, tênis, vôlei</p>
          </div>

          <div className="modality">
            <Target className="modality-icon" size={48} />
            <h4>Crossfit</h4>
            <p>Treinos funcionais intensos</p>
          </div>
        </div>
      </div>
    </section>
  );
}
