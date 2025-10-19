"use client";

import { Crown, Gift, CheckCircle, PartyPopper } from "lucide-react";
import { toast } from "react-toastify";
import { usePreRegister } from "../hooks/usePreRegister";
import { useState } from "react";

export default function PreRegisterForm() {
  const { isLoading, showSuccess, submitForm } = usePreRegister();
  const [invitationCodeError, setInvitationCodeError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInvitationCodeError(false); // Reset error state

    const formData = new FormData(e.currentTarget);
    const fullName = (formData.get("fullName") as string).trim();
    const email = (formData.get("email") as string).trim();
    const invitationCode = (formData.get("invitation_code") as string)?.trim();

    try {
      await submitForm(fullName, email, invitationCode);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      const errorMessage = (error as Error).message;

      // Se o erro for relacionado ao código de convite, marcar o campo com erro visual
      if (errorMessage.includes("Código de convite inválido")) {
        setInvitationCodeError(true);
        toast.error(
          "❌ Código de convite inválido! Verifique se digitou corretamente ou deixe em branco se não tiver um código.",
          {
            position: "top-right",
            autoClose: 6000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
      } else {
        // Mostrar outros erros para o usuário
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
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
              <label htmlFor="invitation_code">
                Código de convite (opcional)
              </label>
              <input
                type="text"
                id="invitation_code"
                name="invitation_code"
                placeholder="Digite seu código de convite"
                className={invitationCodeError ? "error" : ""}
                onChange={() => setInvitationCodeError(false)} // Limpar erro ao digitar
              />
              {invitationCodeError && (
                <span className="error-message">
                  Código de convite inválido
                </span>
              )}
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
