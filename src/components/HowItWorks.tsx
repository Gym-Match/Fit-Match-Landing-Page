import Reveal from "./Reveal";

const steps = [
  {
    title: "Monte seu perfil",
    text: "Suas fotos, seu objetivo e o que você curte fazer. Leva menos de dois minutos.",
  },
  {
    title: "Deslize e dê match",
    text: "Curtiu e foi curtido? É match. Sem lotação, sem gente que só quer companhia de treino.",
  },
  {
    title: "Comece a conversa",
    text: "O chat abre com vocês já tendo algo em comum. O resto é com você.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section" id="como-funciona">
      <div className="shell">
        <Reveal className="section-head">
          <span className="eyebrow">Como funciona</span>
          <h2 className="h2" style={{ marginTop: 18 }}>
            Do perfil ao <span className="grad">primeiro date</span>
          </h2>
        </Reveal>

        <Reveal className="steps">
          {steps.map((step, index) => (
            <Reveal
              className="step"
              key={step.title}
              variant="pop"
              delay={index * 130}
            >
              <div className="step__num">{index + 1}</div>
              <h3 className="h3">{step.title}</h3>
              <p>{step.text}</p>
            </Reveal>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
