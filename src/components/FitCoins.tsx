import Image from "next/image";
import { Eye, Gem, Sparkles, Star, TrendingUp } from "lucide-react";
import PhoneFrame from "./PhoneFrame";
import Reveal from "./Reveal";

const rewards = [
  {
    icon: Star,
    title: "Super Like",
    desc: "Avise que o interesse é real antes mesmo do match.",
  },
  {
    icon: Eye,
    title: "Revelar curtidas",
    desc: "Veja quem já curtiu você antes de deslizar.",
  },
  {
    icon: TrendingUp,
    title: "Destaque no perfil",
    desc: "Apareça primeiro para quem está perto de você.",
  },
];

export default function FitCoins() {
  return (
    <section className="section" id="fitcoins">
      <div className="shell">
        <Reveal className="coins" variant="drop">
          <div>
            <span className="eyebrow">
              <Sparkles size={14} />
              Fit Coins
            </span>

            <h2 className="h2" style={{ margin: "20px 0 16px" }}>
              Suas chances de match, <span className="grad-purple">turbinadas</span>
            </h2>

            <p className="lead">
              Complete missões diárias e semanais, convide amigos com o seu
              código e acumule Fit Coins. Na loja do app elas viram vantagem
              real na hora de conquistar.
            </p>

            <div className="coins__list">
              {rewards.map(({ icon: Icon, title, desc }) => (
                <div className="coins__item" key={title}>
                  <Icon size={22} />
                  <div>
                    <strong>{title}</strong>
                    <span>{desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 28 }}>
              <span className="coin-badge">
                <Gem size={22} />
                150
              </span>
            </div>
          </div>

          <div className="coins__device">
            <span className="stage-shadow" aria-hidden="true" />
            <PhoneFrame className="phone--float">
              <Image
                src="/assets/store.PNG"
                alt="Loja de recompensas do Fit Match com saldo de Fit Coins"
                fill
                sizes="(max-width: 760px) 64vw, 276px"
              />
            </PhoneFrame>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
