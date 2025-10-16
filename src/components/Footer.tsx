import { Heart, Mail, Instagram, Music, Briefcase } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-brand">
            <h3 className="footer-logo">
              <Heart className="logo-icon" size={24} />
              Fit Match
            </h3>
            <p className="footer-tagline">
              O primeiro app de relacionamentos 100% focado em fitness.
              Conecte-se com pessoas que compartilham sua paixão por uma vida
              saudável.
            </p>
          </div>

          <div className="footer-contact">
            <h4>Entre em Contato</h4>
            <div className="contact-item">
              <Mail className="contact-icon" size={20} />
              <a href="mailto:contato@fitmatchbr.com">contato@fitmatchbr.com</a>
            </div>
          </div>

          <div className="footer-social">
            <h4>Redes Sociais</h4>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Instagram">
                <Instagram size={20} />
                Instagram
              </a>
              <a href="#" className="social-link" aria-label="TikTok">
                <Music size={20} />
                TikTok
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <Briefcase size={20} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <p>&copy; 2025 Fit Match. Todos os direitos reservados.</p>
            <div className="legal-links">
              <a href="#privacy">Política de Privacidade</a>
              <span>•</span>
              <a href="#terms">Termos de Uso</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
