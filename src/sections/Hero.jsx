import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Hero.css';

const pillars = ['Inovação', 'Estratégia', 'Tecnologia'];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % pillars.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="hero">
      {/* Background image + overlay */}
      <div className="hero__bg-image" />
      <div className="hero__bg-overlay" />

      {/* Animated gradient orbs */}
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />
      <div className="hero__orb hero__orb--3" />

      {/* Grain overlay */}
      <div className="hero__grain" />

      {/* Grid lines */}
      <div className="hero__grid" />

      <div className="hero__content container">
        <motion.div
          className="hero__text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            className="hero__badge"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className="hero__badge-dot" />
            Neos Inovação e Tecnologia
          </motion.div>

          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            Impulsionando{' '}
            <span className="hero__title-accent">
              <AnimatePresence mode="wait">
                <motion.span
                  key={pillars[index]}
                  className="hero__rotating-word"
                  initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {pillars[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          <motion.p
            className="hero__desc"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            Hub de soluções que integra inovação, estratégia e tecnologia
            para organizações públicas e privadas alcançarem seus objetivos.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <a href="#servicos" className="hero__btn-primary">
              Nossos Serviços
              <span className="hero__btn-shine" />
            </a>
            <a href="#quem-somos" className="hero__btn-ghost">
              Conheça a NIT
              <span className="hero__btn-arrow">→</span>
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__pillars"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          {pillars.map((p, i) => (
            <motion.div
              key={p}
              className={`hero__pillar ${index === i ? 'hero__pillar--active' : ''}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.08 }}
              onClick={() => setIndex(i)}
            >
              <span className="hero__pillar-num">0{i + 1}</span>
              <span className="hero__pillar-name">{p}</span>
              <span className="hero__pillar-bar" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
