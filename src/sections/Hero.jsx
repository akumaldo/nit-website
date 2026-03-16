import { motion } from 'framer-motion';
import './Hero.css';

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__bg-image" />
      <div className="hero__bg-overlay" />

      <div className="hero__content container">
        <motion.div
          className="hero__text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            Impulsionamos inovação,
            <br />
            estratégia <em>&</em> tecnologia
          </motion.h1>

          <motion.p
            className="hero__desc"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            Combinamos décadas de expertise em inovação, estratégia e tecnologia
            para guiar organizações públicas e privadas através de desafios complexos
            com clareza, precisão e resultados mensuráveis.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <a href="#contato" className="hero__btn-primary">
              Agende uma Consulta
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
