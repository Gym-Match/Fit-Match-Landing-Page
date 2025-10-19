"use client";

import { Gift, Users, Coins, Mail, ArrowRight } from "lucide-react";
import "../styles/InviteCodeSection.css";

export default function InviteCodeSection() {
  return (
    <section className="invite-code-section">
      <div className="section-content">
        <div className="invite-header">
          <div className="invite-icon">
            <Gift size={48} />
          </div>
          <h2 className="invite-title">
            Convide amigos e ganhe{" "}
            <span className="gradient-text">FitCoins</span>
          </h2>
          <p className="invite-subtitle">
            Compartilhe seu código exclusivo e acumule moedas para usar no app
          </p>
        </div>

        <div className="invite-grid">
          {/* Step 1 */}
          <div className="invite-step">
            <div className="step-number">1</div>
            <div className="step-icon">
              <Mail size={32} />
            </div>
            <h3 className="step-title">Receba seu código</h3>
            <p className="step-description">
              Após o pré-cadastro, você receberá um código único de 8 caracteres
              por email
            </p>
          </div>

          {/* Step 2 */}
          <div className="invite-step">
            <div className="step-number">2</div>
            <div className="step-icon">
              <Users size={32} />
            </div>
            <h3 className="step-title">Compartilhe com amigos</h3>
            <p className="step-description">
              Envie seu código para amigos que também querem encontrar parceiros
              de treino
            </p>
          </div>

          {/* Step 3 */}
          <div className="invite-step">
            <div className="step-number">3</div>
            <div className="step-icon">
              <Coins size={32} />
            </div>
            <h3 className="step-title">Ganhe FitCoins</h3>
            <p className="step-description">
              A cada amigo que usar seu código, você ganha FitCoins para usar
              quando o app for lançado
            </p>
          </div>
        </div>

        <div className="fitcoins-info">
          <div className="fitcoins-content">
            <div className="fitcoins-icon">
              <Coins size={40} />
            </div>
            <div className="fitcoins-text">
              <h3>O que são FitCoins?</h3>
              <p>
                Moeda virtual do Fit Match que você pode usar para comprar
                Superlikes, revelar quem curtiu você, acessar filtros premium e
                muito mais!
              </p>
            </div>
          </div>

          <div className="fitcoins-benefits">
            <h4>Use suas FitCoins para:</h4>
            <div className="benefits-list">
              <div className="benefit-item">
                <ArrowRight size={16} />
                <span>Superlikes ilimitados</span>
              </div>
              <div className="benefit-item">
                <ArrowRight size={16} />
                <span>Ver quem curtiu você</span>
              </div>
              <div className="benefit-item">
                <ArrowRight size={16} />
                <span>Filtros premium avançados</span>
              </div>
              <div className="benefit-item">
                <ArrowRight size={16} />
                <span>Destaque no perfil</span>
              </div>
            </div>
          </div>
        </div>

        <div className="invite-cta">
          <h3>Quanto mais amigos, mais FitCoins!</h3>
          <p>
            Comece agora mesmo fazendo seu pré-cadastro e receba seu código
            exclusivo
          </p>
        </div>
      </div>
    </section>
  );
}
