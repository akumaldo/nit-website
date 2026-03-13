import { WhatsappLogo } from '@phosphor-icons/react';
import './WhatsAppFAB.css';

export default function WhatsAppFAB() {
  return (
    <a
      href="https://api.whatsapp.com/send/?phone=5511914049516"
      target="_blank"
      rel="noopener noreferrer"
      className="wa-fab"
      aria-label="Fale conosco no WhatsApp"
    >
      <WhatsappLogo size={28} weight="fill" />
      <span className="wa-fab__pulse" />
    </a>
  );
}
