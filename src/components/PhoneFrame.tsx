import type { CSSProperties, ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Moldura de iPhone 17 Pro Max usada em todos os previews do app.
 * A escala vem da variável CSS `--phone-w` (largura do aparelho); todo o
 * resto — raio, espessura da borda, ilha dinâmica e botões — é calculado
 * a partir dela, então basta redefinir `--phone-w` para redimensionar.
 */
export default function PhoneFrame({
  children,
  className = "",
  style,
}: PhoneFrameProps) {
  return (
    <div className={`phone ${className}`.trim()} style={style}>
      <span className="phone__btn phone__btn--action" aria-hidden="true" />
      <span className="phone__btn phone__btn--vol-up" aria-hidden="true" />
      <span className="phone__btn phone__btn--vol-down" aria-hidden="true" />
      <span className="phone__btn phone__btn--power" aria-hidden="true" />
      <span className="phone__btn phone__btn--camera" aria-hidden="true" />

      <div className="phone__screen">
        <div className="phone__island" aria-hidden="true" />
        {children}
        <div className="phone__glare" aria-hidden="true" />
      </div>
    </div>
  );
}
