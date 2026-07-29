import Image from "next/image";
import {
  Eye,
  Heart,
  MessageCircle,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";
import PhoneFrame from "./PhoneFrame";
import Reveal from "./Reveal";

const actions = [
  { icon: X, color: "#ff4757", label: "Passar" },
  { icon: Star, color: "#ffd700", label: "Super Like" },
  { icon: Heart, color: "#15ef1a", label: "Curtir" },
  { icon: SlidersHorizontal, color: "#9ca3af", label: "Filtrar" },
];

export default function Features() {
  return (
    <section className="section" id="recursos">
      <div className="shell">
        <Reveal className="section-head">
          <span className="eyebrow">Recursos</span>
          <h2 className="h2" style={{ marginTop: 18 }}>
            Um app de relacionamento que{" "}
            <span className="grad">fala a sua língua</span>
          </h2>
          <p className="lead" style={{ marginTop: 16 }}>
            Aqui ninguém precisa explicar por que treina. Todo mundo já entende.
          </p>
        </Reveal>

        <div className="bento">
          <Reveal className="card card--feature" variant="rise3d">
            <div className="card__text">
              <h3 className="h3">Um perfil que mostra o seu estilo de vida</h3>
              <p>
                Suas fotos, seu objetivo e o que você curte fazer. Quem abre o
                seu perfil já sabe se combina com você.
              </p>
            </div>
            <div className="card__device">
              <PhoneFrame className="mini-phone">
                <Image
                  src="/assets/home.jpeg"
                  alt="Perfil de usuária no Fit Match"
                  fill
                  sizes="(max-width: 760px) 46vw, 184px"
                />
              </PhoneFrame>
            </div>
          </Reveal>

          <Reveal className="card card--wide" variant="rise3d" delay={80}>
            <div className="card__icon">
              <Heart size={22} />
            </div>
            <h3 className="h3">Curtiu e foi curtido? É match.</h3>
            <p>
              Passar, curtir ou mandar um Super Like. A mecânica que você já
              conhece — com gente que compartilha a sua rotina.
            </p>
            <div className="actions-row">
              {actions.map(({ icon: Icon, color, label }) => (
                <span className="action-dot" key={label} title={label}>
                  <Icon size={22} color={color} />
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal className="card card--third" variant="rise3d" delay={160}>
            <div className="card__icon card__icon--gold">
              <Star size={22} />
            </div>
            <h3 className="h3">Super Like</h3>
            <p>
              Quando passar batido não é opção. Seu perfil aparece em destaque
              para quem você quer conhecer.
            </p>
          </Reveal>

          <Reveal className="card card--third" variant="rise3d" delay={240}>
            <div className="card__icon card__icon--green">
              <Eye size={22} />
            </div>
            <h3 className="h3">Veja quem curtiu você</h3>
            <p>
              Sem mistério. Descubra quem já demonstrou interesse antes mesmo de
              deslizar.
            </p>
          </Reveal>

          <Reveal className="card card--half" variant="rise3d" delay={320}>
            <div className="card__icon">
              <MessageCircle size={22} />
            </div>
            <h3 className="h3">Conversa sem gelo inicial</h3>
            <p>
              Vocês já começam com assunto. Nada de &ldquo;oi, tudo bem?&rdquo;
              e três dias de silêncio.
            </p>
          </Reveal>

          <Reveal className="card card--half" variant="rise3d" delay={400}>
            <div className="card__icon card__icon--green">
              <ShieldCheck size={22} />
            </div>
            <h3 className="h3">Perfis verificados por e-mail</h3>
            <p>
              Todo cadastro passa por confirmação. Menos perfil falso, mais
              gente real do outro lado.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
