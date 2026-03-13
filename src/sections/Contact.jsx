import { WhatsappLogo, Envelope, MapPin } from '@phosphor-icons/react';
import './Contact.css';

export default function Contact() {
  return (
    <section id="contato" className="contact section">
      <div className="container">
        <span className="section-label contact__label" data-reveal data-reveal-delay="0">
          Contato
        </span>
        <h2 className="section-title contact__title" data-reveal data-reveal-delay="1">
          Vamos construir<br /><em>algo incrível?</em>
        </h2>
        <p className="section-description contact__desc" data-reveal data-reveal-delay="2">
          Entre em contato e descubra como podemos impulsionar sua organização.
        </p>

        <div className="contact__channels" data-reveal data-reveal-delay="3">
          <a href="https://api.whatsapp.com/send/?phone=5511914049516" target="_blank" rel="noopener noreferrer" className="contact__ch">
            <span className="contact__ch-icon contact__ch-icon--wa">
              <WhatsappLogo size={22} weight="fill" />
            </span>
            <div>
              <span className="contact__ch-label">WhatsApp</span>
              <span className="contact__ch-value">+55 11 91404-9516</span>
            </div>
          </a>
          <a href="mailto:contato@nitbrasil.com" className="contact__ch">
            <span className="contact__ch-icon">
              <Envelope size={22} />
            </span>
            <div>
              <span className="contact__ch-label">Email</span>
              <span className="contact__ch-value">contato@nitbrasil.com</span>
            </div>
          </a>
          <div className="contact__ch">
            <span className="contact__ch-icon">
              <MapPin size={22} />
            </span>
            <div>
              <span className="contact__ch-label">Escritórios</span>
              <span className="contact__ch-value">São Paulo — SP / Belo Horizonte — MG</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
