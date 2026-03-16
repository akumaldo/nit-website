import { WhatsappLogo, Envelope, MapPin } from '@phosphor-icons/react';
import './Contact.css';

export default function Contact() {
  return (
    <section id="contato" className="contact section">
      <div className="container">
        <div className="contact__content">
          <h2 className="contact__title" data-reveal data-reveal-delay="0">
            Vamos construir<br /><em>algo incrível?</em>
          </h2>
          <p className="contact__desc" data-reveal data-reveal-delay="1">
            Entre em contato e descubra como podemos impulsionar sua organização
            com soluções em inovação, estratégia e tecnologia.
          </p>

          <div className="contact__actions" data-reveal data-reveal-delay="2">
            <a href="https://api.whatsapp.com/send/?phone=5511914049516" target="_blank" rel="noopener noreferrer" className="contact__btn contact__btn--wa">
              <WhatsappLogo size={18} weight="fill" />
              WhatsApp
            </a>
            <a href="mailto:contato@nitbrasil.com" className="contact__btn">
              <Envelope size={18} />
              Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
