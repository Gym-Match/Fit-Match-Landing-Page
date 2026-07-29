/** Aurora + grade + grão: o fundo vivo que fica atrás de toda a página. */
export default function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="backdrop__grid" />
      <div className="orb orb--purple" />
      <div className="orb orb--green" />
      <div className="orb orb--center" />
      <div className="backdrop__noise" />
    </div>
  );
}
