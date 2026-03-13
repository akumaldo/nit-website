import { motion } from 'framer-motion';
import { ArrowUpRight, Brain } from '@phosphor-icons/react';
import { useInView } from '../hooks/useInView';
import './AIPFBanner.css';

export default function AIPFBanner() {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <section className="aipf" ref={ref}>
      <div className="container">
        <motion.a
          href="https://aivante-ten.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="aipf__card"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="aipf__left">
            <div className="aipf__badge">
              <Brain size={15} weight="fill" />
              AIPF Framework
            </div>
            <h3 className="aipf__title">
              Quer estar <em>2 anos à frente</em> do mercado?
            </h3>
            <p className="aipf__desc">
              Integração e governança de projetos de AI para transformar sua organização.
            </p>
          </div>
          <span className="aipf__arrow">
            <ArrowUpRight size={20} weight="bold" />
          </span>
        </motion.a>
      </div>
    </section>
  );
}
