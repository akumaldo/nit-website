import { motion } from 'framer-motion';
import { WhatsappLogo, Envelope, MapPin } from '@phosphor-icons/react';
import { useInView } from '../hooks/useInView';
import './Contact.css';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section id="contato" className="contact section" ref={ref}>
      <div className="container">
        <motion.span className="section-label contact__label" initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp} custom={0}>
          Contato
        </motion.span>
        <motion.h2 className="section-title contact__title" initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp} custom={1}>
          Vamos construir<br /><em>algo incrível?</em>
        </motion.h2>
        <motion.p className="section-description contact__desc" initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp} custom={2}>
          Entre em contato e descubra como podemos impulsionar sua organização.
        </motion.p>

        <motion.div className="contact__channels" initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp} custom={3}>
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
        </motion.div>
      </div>
    </section>
  );
}
