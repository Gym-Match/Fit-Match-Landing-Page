"use client";

import { useState, useEffect } from "react";
import { Crown, Gift, CheckCircle, PartyPopper } from "lucide-react";

interface UserData {
  fullName: string;
  email: string;
  registeredAt: string;
  premiumCode: string;
}

export default function PreRegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [premiumCode, setPremiumCode] = useState("");
  const [registeredUsers, setRegisteredUsers] = useState<UserData[]>([]);

  const MAX_PREMIUM_USERS = 1000;

  // Carregar usuários do localStorage quando o componente montar
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("fitMatchUsers");
      if (stored) {
        setRegisteredUsers(JSON.parse(stored));
      }
    }
  }, []);

  const generatePremiumCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "PREMIUM";
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const hasFullName = (name: string) => {
    return (
      name
        .trim()
        .split(" ")
        .filter((word) => word.length > 0).length >= 2
    );
  };

  const isEmailAlreadyRegistered = (email: string) => {
    return registeredUsers.some(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const fullName = (formData.get("fullName") as string).trim();
    const email = (formData.get("email") as string).trim();

    // Validações
    if (!fullName || fullName.length < 2) {
      alert("Por favor, digite um nome válido.");
      return;
    }

    if (!hasFullName(fullName)) {
      alert("Por favor, digite seu nome completo.");
      return;
    }

    if (!email || !isValidEmail(email)) {
      alert("Por favor, digite um e-mail válido.");
      return;
    }

    if (registeredUsers.length >= MAX_PREMIUM_USERS) {
      alert("Infelizmente todas as vagas premium já foram preenchidas! 😢");
      return;
    }

    if (isEmailAlreadyRegistered(email)) {
      alert("Este e-mail já garantiu o Premium gratuito! 🎉");
      return;
    }

    // Mostrar loading
    setIsLoading(true);

    try {
      // Simular chamada para API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const userData: UserData = {
        fullName,
        email,
        registeredAt: new Date().toISOString(),
        premiumCode: generatePremiumCode(),
      };

      // Salvar dados localmente
      const updatedUsers = [...registeredUsers, userData];
      setRegisteredUsers(updatedUsers);

      if (typeof window !== "undefined") {
        localStorage.setItem("fitMatchUsers", JSON.stringify(updatedUsers));
      }

      // Mostrar sucesso
      setPremiumCode(userData.premiumCode);
      setShowSuccess(true);

      // Reset form
      (e.target as HTMLFormElement).reset();

      // Voltar ao formulário após 10 segundos
      setTimeout(() => {
        setShowSuccess(false);
      }, 10000);
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      alert("Ocorreu um erro. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const remainingSlots = MAX_PREMIUM_USERS - registeredUsers.length;

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
                ? `* Restam apenas ${remainingSlots} vagas para o Premium gratuito!`
                : "* Promoção encerrada - todas as vagas foram preenchidas!"}
            </p>
          </form>
        </>
      ) : (
        <div className="success-message">
          <PartyPopper className="success-icon" size={48} />
          <h4>Parabéns! Você garantiu seu Premium!</h4>
          <p>
            Seu primeiro mês será 100% gratuito! Você receberá um e-mail com seu
            código promocional quando o app for lançado.
          </p>
          {premiumCode && (
            <div
              style={{
                background: "linear-gradient(135deg, #7c3aed, #10b981)",
                color: "white",
                padding: "1rem",
                borderRadius: "12px",
                marginTop: "1rem",
                fontWeight: 700,
                fontFamily: "monospace",
                letterSpacing: "2px",
                textAlign: "center",
              }}
            >
              Seu código Premium: <br />
              <span style={{ fontSize: "1.2rem" }}>{premiumCode}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
