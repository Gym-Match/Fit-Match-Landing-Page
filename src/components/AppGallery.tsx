import Image from "next/image";
import PhoneFrame from "./PhoneFrame";
import Reveal from "./Reveal";

const screens = [
  {
    id: "descubra",
    step: "01",
    title: "Descubra",
    desc: "Deslize por perfis de quem vive academia. Objetivo, interesses e onde treina — tudo à vista antes do like.",
    image: "/assets/home.jpeg",
    alt: "Tela de perfis do Fit Match",
  },
  {
    id: "converse",
    step: "02",
    title: "Converse",
    desc: "Deu match, abriu o chat. A conversa já começa com algo de verdade em comum.",
    image: "/assets/chat.PNG",
    alt: "Tela de conversas do Fit Match",
  },
  {
    id: "conquiste",
    step: "03",
    title: "Conquiste",
    desc: "Fit Coins viram Super Like, curtidas reveladas e destaque no perfil.",
    image: "/assets/store.PNG",
    alt: "Loja de recompensas do Fit Match",
  },
];

export default function AppGallery() {
  return (
    <section className="section" id="app">
      <div className="shell">
        <Reveal className="section-head">
          <span className="eyebrow">Preview</span>
          <h2 className="h2" style={{ marginTop: 18 }}>
            O app por <span className="grad">dentro</span>
          </h2>
          <p className="lead" style={{ marginTop: 16 }}>
            Telas reais do Fit Match. Nada de mockup genérico.
          </p>
        </Reveal>
      </div>

      {/* Todos os aparelhos visíveis de uma vez: no desktop em leque,
          no mobile num carrossel com encaixe — sem controle longe da tela. */}
      <div className="gallery">
        {screens.map((screen, index) => (
          <Reveal
            className="gallery__item"
            key={screen.id}
            variant={
              index === 0 ? "flyLeft" : index === 1 ? "pop" : "flyRight"
            }
            delay={index * 90}
          >
            <div className="gallery__device">
              <span className="stage-shadow" aria-hidden="true" />
              <PhoneFrame>
                <Image
                  src={screen.image}
                  alt={screen.alt}
                  fill
                  sizes="(max-width: 900px) 60vw, 25vw"
                />
              </PhoneFrame>
            </div>

            <div className="gallery__caption">
              <span className="gallery__step">{screen.step}</span>
              <h3 className="h3">{screen.title}</h3>
              <p>{screen.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
