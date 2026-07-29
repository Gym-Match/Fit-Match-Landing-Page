import Image from "next/image";
import { Flame, Heart, MapPin, Sparkles, Target } from "lucide-react";
import MatchOverlay from "./MatchOverlay";
import PhoneFrame from "./PhoneFrame";
import Reveal from "./Reveal";

const signals = [
  { icon: Target, color: "#c868fa", label: "Match por objetivo" },
  { icon: MapPin, color: "#15ef1a", label: "Mesma academia" },
  { icon: Heart, color: "#ffd700", label: "Perto de você" },
];

export default function Hero() {
  return (
    <section className="hero" id="topo">
      <div className="shell hero__grid">
        <div className="hero__copy">
          <Reveal>
            <span className="eyebrow">
              <Flame size={14} />
              Pré-cadastro aberto
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="h1 hero__title">
              <span>Seu próximo match</span>
              <span className="grad grad--shine">não está no bar.</span>
              <span>Está na academia.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="lead hero__lead">
              O Fit Match é o app de relacionamentos de quem vive o estilo de
              vida fitness. Deslize, dê match e converse com alguém que entende
              por que você acorda às 5h.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="signals">
              {signals.map(({ icon: Icon, color, label }) => (
                <span className="signal" key={label}>
                  <Icon size={18} color={color} />
                  <em>{label}</em>
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={280}>
            <div className="hero__actions">
              <a href="#pre-cadastro" className="btn btn--primary">
                <Sparkles size={18} />
                Quero 1 mês Premium grátis
              </a>
              <a href="#app" className="btn btn--ghost">
                Ver o app por dentro
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal variant="scale" delay={200} className="hero__stage">
          <span className="stage-halo" aria-hidden="true" />
          <span className="stage-shadow" aria-hidden="true" />

          <PhoneFrame className="phone--float">
            <Image
              src="/assets/home.jpeg"
              alt="Tela de perfis do app de relacionamentos Fit Match"
              fill
              sizes="(max-width: 760px) 66vw, 288px"
              priority
            />
            <MatchOverlay />
          </PhoneFrame>

          <PhoneFrame className="phone--ghost">
            {/* Acima da dobra no desktop: carrega junto, não sob demanda. */}
            <Image
              src="/assets/chat.PNG"
              alt="Tela de conversas do app Fit Match"
              fill
              sizes="(max-width: 760px) 45vw, 196px"
              loading="eager"
            />
          </PhoneFrame>
        </Reveal>
      </div>
    </section>
  );
}
