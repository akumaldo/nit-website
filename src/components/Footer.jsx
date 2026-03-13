import { LinkedinLogo, WhatsappLogo } from '@phosphor-icons/react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <img src="/logo-white.png" alt="NIT Brasil" className="footer__logo" />
            <p className="footer__tagline">
              Conectados com a inovação através de novos modelos mentais e tecnológicos,
              alinhados às tendências globais de gestão e transformação digital.
            </p>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Institucional</h4>
            <nav className="footer__links">
              <a href="#home">Home</a>
              <a href="#quem-somos">Quem Somos</a>
              <a href="#servicos">Serviços</a>
              <a href="#contato">Contato</a>
            </nav>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Unidades</h4>
            <nav className="footer__links">
              <a href="https://maps.app.goo.gl/fTrA7yqUV4ypjtgWA" target="_blank" rel="noopener noreferrer">São Paulo — SP</a>
              <a href="https://maps.app.goo.gl/ZSqhNc3UEeGdL5a97" target="_blank" rel="noopener noreferrer">Belo Horizonte — MG</a>
            </nav>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Conecte-se</h4>
            <div className="footer__social">
              <a href="https://linkedin.com/company/nitbrasil/" target="_blank" rel="noopener noreferrer" className="footer__icon" aria-label="LinkedIn">
                <LinkedinLogo size={20} weight="fill" />
              </a>
              <a href="https://api.whatsapp.com/send/?phone=5511914049516" target="_blank" rel="noopener noreferrer" className="footer__icon footer__icon--wa" aria-label="WhatsApp">
                <WhatsappLogo size={20} weight="fill" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>&copy; {new Date().getFullYear()} Nit Brasil — Todos os direitos reservados</span>
        </div>
      </div>
    </footer>
  );
}
