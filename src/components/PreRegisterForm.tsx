"use client";

import { Crown, Gift, CheckCircle, PartyPopper } from "lucide-react";
import { usePreRegister } from "../hooks/usePreRegister";

export default function PreRegisterForm() {
  const { isLoading, showSuccess, remainingSlots, submitForm } =
    usePreRegister();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const fullName = (formData.get("fullName") as string).trim();
    const email = (formData.get("email") as string).trim();

    try {
      await submitForm(fullName, email);

      // Reset form apenas se o cadastro foi bem sucedido
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      // Mostrar erro para o usuário
      alert((error as Error).message);
    }
  };

  return (
    <div className="form-card">
      <div className="premium-badge">
        <Crown className="crown" size={20} />
        <span>OFERTA EXCLUSIVA</span>
      </div>

      {!showSuccess ? (
        <>
          <h3>
            <Gift size={24} style={{ display: "inline", marginRight: "8px" }} />
            Cadastre-se e ganhe!
          </h3>
          <div className="offer-highlight">
            <h4>1º MÊS PREMIUM GRÁTIS</h4>
          </div>

          <div className="benefits">
            <div className="benefit">
              <CheckCircle className="check" size={20} />
              <span>Likes ilimitados</span>
            </div>
            <div className="benefit">
              <CheckCircle className="check" size={20} />
              <span>Super likes diários</span>
            </div>
            <div className="benefit">
              <CheckCircle className="check" size={20} />
              <span>Ver quem curtiu você</span>
            </div>
          </div>

          <form className="pre-register-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="fullName">Nome Completo</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                placeholder="Digite seu nome completo"
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Digite seu melhor e-mail"
              />
            </div>

            <button
              type="submit"
              className={`submit-btn ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              <span>
                {isLoading ? (
                  <>
                    <Gift
                      size={20}
                      style={{ display: "inline", marginRight: "8px" }}
                    />
                    Garantindo seu Premium...
                  </>
                ) : (
                  <>
                    <Gift
                      size={20}
                      style={{ display: "inline", marginRight: "8px" }}
                    />
                    Garantir meu Premium GRÁTIS
                  </>
                )}
              </span>
            </button>

            <p className="disclaimer">
              {remainingSlots > 0
                ? `* Limitado a apenas ${remainingSlots} vagas para o Premium gratuito!`
                : "* Promoção encerrada - todas as vagas foram preenchidas!"}
            </p>
          </form>
        </>
      ) : (
        <div className="success-message">
          <PartyPopper className="success-icon" size={48} />
          <h4>Parabéns! Você garantiu seu Premium!</h4>
          <p>
            Seu primeiro mês será 100% gratuito! Você receberá um e-mail com
            todas as informações quando o app for lançado.
          </p>
        </div>
      )}
    </div>
  );
}
