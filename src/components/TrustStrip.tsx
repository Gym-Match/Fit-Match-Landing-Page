import { Apple, BadgeCheck, Gift } from "lucide-react";
import Reveal from "./Reveal";

const items = [
  { icon: Gift, text: "Pré-cadastro gratuito" },
  { icon: BadgeCheck, text: "1º mês Premium por nossa conta" },
  { icon: Apple, text: "iOS e Android no lançamento" },
];

export default function TrustStrip() {
  return (
    <div className="shell">
      <Reveal className="trust">
        {items.map(({ icon: Icon, text }) => (
          <span className="trust__item" key={text}>
            <Icon size={18} />
            {text}
          </span>
        ))}
      </Reveal>
    </div>
  );
}
