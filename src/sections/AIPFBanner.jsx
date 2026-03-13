import { ArrowUpRight, Brain } from '@phosphor-icons/react';
import './AIPFBanner.css';

export default function AIPFBanner() {
  return (
    <section className="aipf">
      <div className="container">
        <div className="aipf__card" data-reveal data-reveal-delay="0">
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
              Nossa abordagem conecta inovação, estratégia e tecnologia para resultados reais.
            </p>
          </div>
          <a
            href="https://aivante-ten.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="aipf__cta btn-glow"
          >
            Conheça o AIPF Framework
            <ArrowUpRight size={18} weight="bold" />
          </a>
        </div>
      </div>
    </section>
  );
}
