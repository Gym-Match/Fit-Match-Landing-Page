"use client";

import { Gift, Users, Coins, Star, ArrowRight, Sparkles } from "lucide-react";

export default function ReferralSection() {
  return (
    <section className="referral-section">
      <div className="container">
        <div className="referral-content">
          <div className="referral-header">
            <div className="referral-icon">
              <Gift size={32} />
            </div>
            <h2>Sistema de Indicação</h2>
            <p>Ganhe Fit Coins indicando amigos!</p>
          </div>

          <div className="referral-features">
            <div className="feature-card">
              <div className="feature-icon">
                <Users size={24} />
              </div>
              <h3>Seu Código Único</h3>
              <p>
                Após o cadastro, você receberá um código exclusivo para
                compartilhar
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon coins">
                <Coins size={24} />
              </div>
              <h3>100 Fit Coins por Indicação</h3>
              <p>
                Para cada pessoa que usar seu código, você ganha 100 Fit Coins
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon premium">
                <Star size={24} />
              </div>
              <h3>Troque por Benefícios</h3>
              <p>
                Use seus Fit Coins para desvendar curtidas, superlikes e planos
                premium
              </p>
            </div>
          </div>

          <div className="referral-benefits">
            <div className="benefits-header">
              <Sparkles size={20} />
              <span>O que você pode fazer com Fit Coins:</span>
            </div>
            <div className="benefits-list">
              <div className="benefit-item">
                <ArrowRight size={16} />
                <span>Desvendar quem curtiu você</span>
              </div>
              <div className="benefit-item">
                <ArrowRight size={16} />
                <span>Superlikes extras</span>
              </div>
              <div className="benefit-item">
                <ArrowRight size={16} />
                <span>Meses de plano premium</span>
              </div>
              <div className="benefit-item">
                <ArrowRight size={16} />
                <span>Recursos exclusivos</span>
              </div>
            </div>
          </div>

          <div className="referral-cta">
            <p>
              <strong>Dica:</strong> Se alguém te indicou, use o código dela no
              formulário abaixo!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
