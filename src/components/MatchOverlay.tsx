import { Heart } from "lucide-react";

/**
 * Animação que roda dentro do aparelho do hero: a carta recebe um like,
 * o match acontece e os corações sobem. Loop de 9s, puro CSS.
 */
/* Poucos, pequenos e agrupados perto do centro: espalhados pela largura toda
   viravam confete em cima do print do app. */
const hearts = [
  { left: "34%", delay: "5.1s", size: 12 },
  { left: "44%", delay: "5.5s", size: 15 },
  { left: "56%", delay: "5.2s", size: 11 },
  { left: "64%", delay: "5.7s", size: 14 },
];

export default function MatchOverlay() {
  return (
    <div className="match-fx" aria-hidden="true">
      <span className="match-fx__stamp">LIKE</span>

      <div className="match-fx__banner">
        <div className="match-fx__inner">
          <Heart className="match-fx__icon" size={40} />
          <strong className="match-fx__title">É UM MATCH!</strong>
          <span className="match-fx__sub">Vocês se curtiram</span>
        </div>
      </div>

      {hearts.map((heart) => (
        <Heart
          key={heart.left}
          className="match-fx__heart"
          size={heart.size}
          style={{ left: heart.left, animationDelay: heart.delay }}
        />
      ))}
    </div>
  );
}
