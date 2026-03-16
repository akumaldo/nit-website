import {
  Target, Globe, ChartLineUp, Shield,
} from '@phosphor-icons/react';
import './About.css';

const values = [
  {
    icon: Target,
    title: 'Abordagem orientada a resultados',
    text: 'Alinhamos cada solução à estratégia do seu negócio para garantir impacto prático e mensurável.',
  },
  {
    icon: Globe,
    title: 'Visão integrada',
    text: 'Nossa equipe opera na interseção de inovação, estratégia e tecnologia, navegando desafios complexos com confiança.',
  },
  {
    icon: ChartLineUp,
    title: 'Track record comprovado',
    text: 'Décadas de casos de sucesso em organizações públicas e privadas, entregando resultados consistentes.',
  },
  {
    icon: Shield,
    title: 'Parceiro de confiança',
    text: 'Organizações líderes confiam em nós como seus consultores de longo prazo para decisões estratégicas e críticas.',
  },
];

const focus = [
  { num: '01', title: 'Gestão Pública', text: 'Aceleramos processos de transformação digital e inovação para o setor público brasileiro.' },
  { num: '02', title: 'Gestão Privada', text: 'Planejamos e executamos transformações consistentes que aceleram valor aos negócios.' },
  { num: '03', title: 'Autarquias', text: 'Inserimos criatividade e inovação como princípios fundamentais para pessoas e processos.' },
];

export default function About() {
  return (
    <section id="quem-somos" className="about section">
      <div className="container">
        <div className="about__top">
          <div className="about__intro">
            <h2 className="about__heading" data-reveal data-reveal-delay="0">
              Nosso valor, sua vantagem
            </h2>
          </div>
        </div>

        <div className="about__values">
          {values.map((v, i) => (
            <div key={v.title} className="about__value" data-reveal data-reveal-delay={1 + i}>
              <div className="about__value-icon">
                <v.icon size={20} weight="regular" />
              </div>
              <h3 className="about__value-title">{v.title}</h3>
              <p className="about__value-text">{v.text}</p>
            </div>
          ))}
        </div>

        <div className="about__focus" data-reveal data-reveal-delay="5">
          {focus.map((f) => (
            <div key={f.num} className="about__focus-item">
              <span className="about__focus-num">{f.num}</span>
              <div>
                <h4 className="about__focus-title">{f.title}</h4>
                <p className="about__focus-text">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
