import { motion } from 'framer-motion';
import { Crosshair, Eye, Diamond } from '@phosphor-icons/react';
import { useInView } from '../hooks/useInView';
import './About.css';

const pillars = [
  {
    icon: Crosshair,
    title: 'Missão',
    text: 'Nossa missão é impulsionar o sucesso das organizações, fornecendo soluções estratégicas inovadoras e personalizadas. Comprometemo-nos a ajudar nossos clientes a atingir suas metas e superar desafios, através da aplicação de ferramentas avançadas, técnicas especializadas e serviços de alta qualidade, criando um impacto positivo e duradouro no mercado.',
  },
  {
    icon: Eye,
    title: 'Visão',
    text: 'Nossa visão é nos tornarmos a principal referência em soluções estratégicas e inovadoras, reconhecidos pela excelência e impacto positivo que geramos nas organizações. Aspiramos a transformar desafios em oportunidades, liderando a evolução dos modelos de trabalho e promovendo um crescimento sustentável e eficiente para nossos clientes e parceiros.',
  },
  {
    icon: Diamond,
    title: 'Valores',
    text: 'Inovação, Excelência, Transparência, Colaboração, Sustentabilidade e Foco em cada solução que entregamos.',
  },
];

const values = [
  { name: 'Inovação', text: 'Valorizamos a criatividade e a busca constante por soluções inovadoras que gerem valor e diferenciação para nossos clientes.' },
  { name: 'Excelência', text: 'Comprometemo-nos a entregar serviços de alta qualidade, superando as expectativas e estabelecendo padrões elevados de desempenho.' },
  { name: 'Transparência', text: 'Atuamos com honestidade e clareza, mantendo uma comunicação aberta e confiável com nossos clientes, parceiros e colaboradores.' },
  { name: 'Colaboração', text: 'Acreditamos na força do trabalho em equipe e na construção de parcerias estratégicas que promovam o sucesso mútuo.' },
  { name: 'Sustentabilidade', text: 'Priorizamos práticas sustentáveis que contribuem para o desenvolvimento econômico, social e ambiental das comunidades onde atuamos.' },
  { name: 'Foco', text: 'Direcionamos nossos esforços e recursos para alcançar resultados concretos e mensuráveis.' },
];

const focus = [
  { num: '01', title: 'Gestão Pública', text: 'Criamos a aceleração nos processos de transformação digital e inovação no Brasil.' },
  { num: '02', title: 'Gestão Privada', text: 'Pensamos e planejamos o processo de transformação de forma consistente e ordenada acelerando valor aos negócios.' },
  { num: '03', title: 'Autarquias', text: 'Inserimos criatividade e inovação como princípios fundamentais para pessoas e processos traçados para atingimento das metas.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.08 });

  return (
    <section id="quem-somos" className="about section" ref={ref}>
      <div className="container">
        <div className="about__top">
          <div className="about__intro">
            <motion.span className="section-label" initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp} custom={0}>
              Quem Somos
            </motion.span>
            <motion.h2 className="section-title" initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp} custom={1}>
              Hub de soluções em<br /><em>inovação & estratégia</em>
            </motion.h2>
          </div>
          <motion.p className="section-description about__desc" initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp} custom={2}>
            Somos um Hub de soluções e estratégia que apoia organizações públicas, privadas e autarquias a alcançar metas e superar desafios.
            Utilizamos as ferramentas mais modernas, técnicas avançadas, serviços personalizados e os modelos de trabalho mais inovadores do mercado.
            Nosso grande diferencial é a integração entre os pilares de inovação, tecnologia, estratégia, pautada em dados.
          </motion.p>
        </div>

        <div className="about__cards">
          {pillars.map((p, i) => (
            <motion.div key={p.title} className="about__card" initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp} custom={3 + i}>
              <div className="about__card-icon">
                <p.icon size={24} weight="regular" />
              </div>
              <h3 className="about__card-title">{p.title}</h3>
              <p className="about__card-text">{p.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div className="about__values" initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp} custom={6}>
          {values.map((v) => (
            <div key={v.name} className="about__value">
              <h4 className="about__value-name">{v.name}</h4>
              <p className="about__value-text">{v.text}</p>
            </div>
          ))}
        </motion.div>

        <motion.div className="about__focus" initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp} custom={7}>
          {focus.map((f) => (
            <div key={f.num} className="about__focus-item">
              <span className="about__focus-num">{f.num}</span>
              <div>
                <h4 className="about__focus-title">{f.title}</h4>
                <p className="about__focus-text">{f.text}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
