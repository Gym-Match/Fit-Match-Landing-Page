"use client";

import { Crown, Gift, CheckCircle, PartyPopper } from "lucide-react";
import { toast } from "react-toastify";
import { usePreRegister } from "../hooks/usePreRegister";

export default function PreRegisterForm() {
  const { isLoading, showSuccess, registeredUsers, submitForm } =
    usePreRegister();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const fullName = (formData.get("fullName") as string).trim();
    const email = (formData.get("email") as string).trim();
    const referralCode = (formData.get("referralCode") as string).trim();

    try {
      await submitForm(fullName, email, referralCode);

      // Reset form apenas se o cadastro foi bem sucedido
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      // Mostrar erro para o usuário
      toast.error((error as Error).message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
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

            <div className="input-group">
              <label htmlFor="referralCode">
                Código de Indicação <span className="optional">(Opcional)</span>
              </label>
              <input
                type="text"
                id="referralCode"
                name="referralCode"
                placeholder="Digite o código de quem te indicou"
                style={{ textTransform: "uppercase" }}
              />
              <small className="input-hint">
                Se alguém te indicou, use o código dela para ganhar benefícios!
              </small>
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
              * Limitado a apenas 1000 vagas para o Premium gratuito!
            </p>
          </form>
        </>
      ) : (
        <div className="success-message">
          <PartyPopper className="success-icon" size={48} />
          <h4>Parabéns! Você garantiu seu Premium!</h4>
          <p>
            Seu primeiro mês será 100% gratuito! Você receberá um e-mail de
            confirmação do pré-cadastro com todas as informações quando o app
            for lançado.
          </p>

          {registeredUsers.length > 0 &&
            registeredUsers[registeredUsers.length - 1]?.referralCode && (
              <div className="referral-code-display">
                <h5>Seu código de indicação:</h5>
                <div className="referral-code">
                  {registeredUsers[registeredUsers.length - 1].referralCode}
                </div>
                <p className="referral-instructions">
                  Compartilhe este código com seus amigos e ganhe 100 Fit Coins
                  para cada indicação!
                </p>
              </div>
            )}

          <p
            style={{
              marginTop: "15px",
              fontSize: "0.9rem",
              color: "var(--text-secondary)",
            }}
          >
            Caso não receba o e-mail, entre em contato conosco pelo e-mail:{" "}
            <strong style={{ color: "var(--primary-green)" }}>
              contato@fitmatchbr.com
            </strong>
          </p>
        </div>
      )}
    </div>
  );
}
