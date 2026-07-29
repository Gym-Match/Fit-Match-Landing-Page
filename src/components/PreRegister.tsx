"use client";

import { useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  Check,
  Crown,
  Gift,
  Loader2,
  Mail,
  PartyPopper,
} from "lucide-react";
import Reveal from "./Reveal";
import { useUrlParams } from "@/hooks/useUrlParams";
import {
  confirmVerificationCode,
  sendVerificationCode,
} from "@/lib/preRegister";

type Step = "form" | "code" | "done";

const perks = [
  "Likes ilimitados no primeiro mês",
  "Super Likes diários",
  "Veja quem curtiu você",
  "Código de convite para render Fit Coins",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function PreRegister() {
  const { refCode } = useUrlParams();

  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (name.trim().length < 3) {
      setError("Digite seu nome completo.");
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError("Digite um e-mail válido.");
      return;
    }

    setLoading(true);
    try {
      await sendVerificationCode({
        name: name.trim(),
        email: email.trim(),
        referralCode: refCode ?? undefined,
      });
      setStep("code");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!/^\d{6}$/.test(code)) {
      setError("O código tem 6 dígitos.");
      return;
    }

    setLoading(true);
    try {
      await confirmVerificationCode(email.trim(), code);
      setStep("done");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section" id="pre-cadastro">
      <div className="shell">
        <Reveal className="cta" variant="drop">
          <div className="offer">
            <span className="eyebrow">
              <Crown size={14} />
              Oferta de lançamento
            </span>

            <h2 className="h2">
              Entre agora e ganhe o{" "}
              <span className="grad">1º mês Premium</span> por nossa conta
            </h2>

            <p className="lead">
              O pré-cadastro é gratuito e leva menos de um minuto. Você recebe um
              código de verificação por e-mail e garante seu lugar antes do
              lançamento.
            </p>

            <div className="offer__perks">
              {perks.map((perk) => (
                <div className="offer__perk" key={perk}>
                  <Check size={18} />
                  {perk}
                </div>
              ))}
            </div>
          </div>

          <div className="form-card">
            {step === "form" && (
              <>
                <span className="form-card__badge">
                  <Gift size={14} />
                  Premium grátis
                </span>
                <h3 className="h3">Garanta seu lugar</h3>

                <form className="form" onSubmit={handleSend} noValidate>
                  <div className="field">
                    <label htmlFor="name">Nome completo</label>
                    <input
                      id="name"
                      name="name"
                      autoComplete="name"
                      placeholder="Como você quer aparecer no app"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="email">E-mail</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {refCode && (
                    <p
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: "0.85rem",
                        color: "var(--green)",
                      }}
                    >
                      <Gift size={16} />
                      Convite de <strong>{refCode}</strong> aplicado
                    </p>
                  )}

                  {error && <FormError message={error} />}

                  <button
                    type="submit"
                    className="btn btn--primary btn--block"
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 size={18} className="spin" />
                    ) : (
                      <Mail size={18} />
                    )}
                    {loading ? "Enviando código..." : "Receber código"}
                  </button>

                  <p className="form__note">
                    Enviaremos um código de 6 dígitos para confirmar seu e-mail.
                    Sem spam.
                  </p>
                </form>
              </>
            )}

            {step === "code" && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setStep("form");
                    setError(null);
                  }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    color: "var(--purple)",
                    fontSize: "0.88rem",
                    marginBottom: 18,
                  }}
                >
                  <ArrowLeft size={16} />
                  Voltar
                </button>

                <h3 className="h3">Confirme seu e-mail</h3>
                <p style={{ marginTop: 10, color: "var(--muted)", fontSize: "0.94rem" }}>
                  Enviamos um código de 6 dígitos para{" "}
                  <strong style={{ color: "var(--text)" }}>{email}</strong>.
                </p>

                <form className="form" onSubmit={handleConfirm} noValidate>
                  <div className="field">
                    <label htmlFor="code">Código de verificação</label>
                    <input
                      id="code"
                      name="code"
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="000000"
                      value={code}
                      onChange={(e) =>
                        setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                      }
                      style={{
                        textAlign: "center",
                        fontSize: "1.4rem",
                        fontWeight: 700,
                        letterSpacing: "0.5em",
                        textIndent: "0.5em",
                      }}
                    />
                  </div>

                  {error && <FormError message={error} />}

                  <button
                    type="submit"
                    className="btn btn--primary btn--block"
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 size={18} className="spin" />
                    ) : (
                      <Check size={18} />
                    )}
                    {loading ? "Verificando..." : "Confirmar e garantir Premium"}
                  </button>

                  <p className="form__note">O código vale por 10 minutos.</p>
                </form>
              </>
            )}

            {step === "done" && (
              <div style={{ textAlign: "center", padding: "12px 0" }}>
                <PartyPopper
                  size={44}
                  color="var(--green)"
                  style={{ display: "block", margin: "0 auto 18px" }}
                />
                <h3 className="h3">Lugar garantido!</h3>
                <p
                  style={{
                    marginTop: 12,
                    color: "var(--muted)",
                    fontSize: "0.95rem",
                  }}
                >
                  Seu primeiro mês Premium está reservado. Avisaremos por e-mail
                  assim que o Fit Match entrar no ar.
                </p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FormError({ message }: { message: string }) {
  return (
    <p
      role="alert"
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 8,
        padding: "12px 14px",
        borderRadius: "var(--radius-sm)",
        border: "1px solid rgba(239,68,68,.35)",
        background: "rgba(239,68,68,.08)",
        color: "#fca5a5",
        fontSize: "0.86rem",
        lineHeight: 1.45,
      }}
    >
      <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 2 }} />
      {message}
    </p>
  );
}
