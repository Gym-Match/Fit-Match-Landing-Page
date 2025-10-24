"use client";

import {
  Crown,
  Gift,
  CheckCircle,
  PartyPopper,
  Mail,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";
import { toast } from "react-toastify";
import { useRef } from "react";
import { useEmailVerification } from "../hooks/useEmailVerification";
import { useUrlParams } from "../hooks/useUrlParams";

export default function PreRegisterForm() {
  const {
    isLoading,
    showSuccess,
    showVerificationForm,
    pendingEmail,
    canResend,
    resendCountdown,
    sendCode,
    verifyCode,
    resendCode,
    goBack,
  } = useEmailVerification();
  const { refCode } = useUrlParams();
  const verificationInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const fullName = (formData.get("fullName") as string).trim();
    const email = (formData.get("email") as string).trim();

    try {
      // Enviar código de verificação
      await sendCode(fullName, email, refCode || undefined);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      const errorMessage = (error as Error).message;

      // Mostrar erros para o usuário
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleVerifyCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const code = (formData.get("verificationCode") as string).trim();

    try {
      await verifyCode(code);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      const errorMessage = (error as Error).message;

      // Mostrar erros para o usuário
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleResendCode = async () => {
    try {
      await resendCode();
      // Limpar o campo de código de verificação
      if (verificationInputRef.current) {
        verificationInputRef.current.value = "";
        verificationInputRef.current.focus();
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.error(errorMessage, {
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
          {!showVerificationForm ? (
            // Formulário inicial (nome e email)
            <>
              <h3>
                <Gift
                  size={24}
                  style={{ display: "inline", marginRight: "8px" }}
                />
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

                {refCode && (
                  <div
                    className="referral-info"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "12px 16px",
                      background:
                        "linear-gradient(135deg, rgba(46, 204, 113, 0.1) 0%, rgba(39, 174, 96, 0.1) 100%)",
                      border: "1px solid rgba(46, 204, 113, 0.3)",
                      borderRadius: "12px",
                      marginBottom: "20px",
                      fontSize: "14px",
                      color: "var(--primary-green)",
                    }}
                  >
                    <Gift size={16} />
                    <span>
                      Cadastro via convite • Código: <strong>{refCode}</strong>
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  className={`submit-btn ${isLoading ? "loading" : ""}`}
                  disabled={isLoading}
                >
                  <span>
                    {isLoading ? (
                      <>
                        <Mail
                          size={20}
                          style={{ display: "inline", marginRight: "8px" }}
                        />
                        Enviando código...
                      </>
                    ) : (
                      <>
                        <Mail
                          size={20}
                          style={{ display: "inline", marginRight: "8px" }}
                        />
                        Enviar código de verificação
                      </>
                    )}
                  </span>
                </button>

                <p className="disclaimer">
                  * Enviaremos um código de verificação para seu e-mail
                </p>
              </form>
            </>
          ) : (
            // Formulário de verificação de código
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <button
                  onClick={goBack}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--primary-purple)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14px",
                    padding: "8px 0",
                  }}
                >
                  <ArrowLeft size={16} />
                  Voltar
                </button>
              </div>

              <h3>
                <Mail
                  size={24}
                  style={{ display: "inline", marginRight: "8px" }}
                />
                Verifique seu e-mail
              </h3>

              <div
                style={{
                  padding: "20px 0",
                  margin: "20px 0",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    marginBottom: "10px",
                    color: "var(--text-secondary)",
                  }}
                >
                  Enviamos um código de 6 dígitos para:
                </p>
                <p
                  style={{ fontWeight: "600", color: "var(--primary-purple)" }}
                >
                  {pendingEmail}
                </p>
              </div>

              <form className="pre-register-form" onSubmit={handleVerifyCode}>
                <div className="input-group">
                  <label htmlFor="verificationCode">
                    Código de Verificação
                  </label>
                  <input
                    ref={verificationInputRef}
                    type="text"
                    id="verificationCode"
                    name="verificationCode"
                    required
                    placeholder="000000"
                    maxLength={6}
                    pattern="[0-9]{6}"
                    style={{
                      textAlign: "center",
                      fontSize: "24px",
                      letterSpacing: "8px",
                      fontWeight: "bold",
                    }}
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
                        Verificando...
                      </>
                    ) : (
                      <>
                        <Gift
                          size={20}
                          style={{ display: "inline", marginRight: "8px" }}
                        />
                        Confirmar e garantir Premium
                      </>
                    )}
                  </span>
                </button>

                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                      marginBottom: "10px",
                    }}
                  >
                    Não recebeu o código?
                  </p>
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={isLoading || !canResend}
                    style={{
                      background: "none",
                      border: "none",
                      color: canResend
                        ? "var(--primary-purple)"
                        : "var(--text-secondary)",
                      cursor: canResend ? "pointer" : "not-allowed",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "14px",
                      margin: "0 auto",
                      textDecoration: canResend ? "underline" : "none",
                      opacity: canResend ? 1 : 0.6,
                    }}
                  >
                    <RefreshCw size={14} />
                    {canResend
                      ? "Reenviar código"
                      : `Aguarde ${resendCountdown}s`}
                  </button>
                </div>

                <p className="disclaimer">* O código é válido por 10 minutos</p>
              </form>
            </>
          )}
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
