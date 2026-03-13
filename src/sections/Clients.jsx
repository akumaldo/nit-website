import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import './Clients.css';

const logos = [
  { src: '/assets/clients/client-1.png', alt: 'Cliente 1' },
  { src: '/assets/clients/client-2.png', alt: 'Cliente 2' },
  { src: '/assets/clients/client-3.jpg', alt: 'Cliente 3' },
  { src: '/assets/clients/client-4.png', alt: 'Cliente 4' },
  { src: '/assets/clients/client-5.png', alt: 'Cliente 5' },
  { src: '/assets/clients/client-6.jpg', alt: 'Cliente 6' },
  { src: '/assets/clients/client-7.jpg', alt: 'Cliente 7' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Clients() {
  const [ref, inView] = useInView({ threshold: 0.15 });

  return (
    <section className="clients section" ref={ref}>
      <div className="container">
        <motion.span className="section-label" initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp} custom={0}>
          Clientes
        </motion.span>
        <motion.h2 className="section-title" initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp} custom={1}>
          Conheça alguns dos<br /><em>nossos clientes</em>
        </motion.h2>

        <motion.div className="clients__grid" initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp} custom={2}>
          {logos.map((logo, i) => (
            <div key={i} className="clients__item">
              <img src={logo.src} alt={logo.alt} className="clients__logo" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
