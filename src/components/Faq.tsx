"use client";

import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "./Reveal";

const items = [
  {
    q: "O Fit Match já está disponível?",
    a: "Ainda não. Estamos na fase de pré-cadastro — quem entra agora garante o primeiro mês Premium sem custo e é avisado por e-mail no dia do lançamento.",
  },
  {
    q: "Preciso pagar alguma coisa para me pré-cadastrar?",
    a: "Não. O pré-cadastro é gratuito. Pedimos apenas nome e e-mail, e enviamos um código de 6 dígitos para confirmar que o endereço é seu.",
  },
  {
    q: "O que muda em relação a outros apps de relacionamento?",
    a: "O público. Aqui todo mundo já vive o estilo de vida fitness, então o ponto em comum vem de graça — e o perfil mostra isso antes do primeiro like.",
  },
  {
    q: "Como funcionam as Fit Coins?",
    a: "São a moeda do app. Você acumula completando missões diárias e semanais e convidando amigos com o seu código. Na loja, troca por Super Likes, curtidas reveladas e destaque no perfil.",
  },
  {
    q: "Em quais celulares vai rodar?",
    a: "iPhone e Android. O app está sendo construído para as duas plataformas e chega às lojas no lançamento.",
  },
];

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panel = useRef<HTMLDivElement>(null);

  // max-height precisa de um valor concreto para animar; medimos o conteúdo.
  useEffect(() => {
    const node = panel.current;
    if (!node) return;
    node.style.maxHeight = isOpen ? `${node.scrollHeight}px` : "0px";
  }, [isOpen, answer]);

  return (
    <div className={`faq__item ${isOpen ? "is-open" : ""}`}>
      <button
        type="button"
        className="faq__q"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        {question}
        <Plus size={20} />
      </button>
      <div className="faq__a" ref={panel}>
        <p>{answer}</p>
      </div>
    </div>
  );
}

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section">
      <div className="shell">
        <Reveal className="section-head">
          <span className="eyebrow">Dúvidas</span>
          <h2 className="h2" style={{ marginTop: 18 }}>
            Perguntas <span className="grad">frequentes</span>
          </h2>
        </Reveal>

        <Reveal className="faq" variant="drop">
          {items.map((item, index) => (
            <FaqItem
              key={item.q}
              question={item.q}
              answer={item.a}
              isOpen={open === index}
              onToggle={() => setOpen(open === index ? null : index)}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
