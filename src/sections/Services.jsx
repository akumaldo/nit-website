import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lightbulb, ChartLineUp, Cpu,
  WifiHigh, Brain, Buildings,
  Target, ArrowsClockwise, Kanban,
  MagnifyingGlass, ChartBar, Package,
} from '@phosphor-icons/react';
import serviceDetails from '../data/serviceDetails';
import ServiceDrawer from '../components/ServiceDrawer';
import './Services.css';

const categories = [
  {
    id: 'inovacao',
    label: 'Inovação',
    icon: Lightbulb,
    description: 'Transformamos ideias em soluções disruptivas que impulsionam o seu negócio.',
    services: [
      { icon: WifiHigh, name: 'IoT', desc: 'Internet das Coisas aplicada a indústria, agronegócio e gestão pública.' },
      { icon: Brain, name: 'Inteligência Artificial', desc: 'Soluções AI para produtividade, automação e tomada de decisão.' },
      { icon: Buildings, name: 'Smart Cities', desc: 'Infraestrutura urbana conectada para cidades inteligentes.' },
    ],
  },
  {
    id: 'estrategia',
    label: 'Estratégia',
    icon: ChartLineUp,
    description: 'Estratégias personalizadas para guiar sua organização rumo ao sucesso.',
    services: [
      { icon: Target, name: 'Gestão Estratégica', desc: 'SWOT, BSC, planejamento estratégico e gestão de mudanças.' },
      { icon: ArrowsClockwise, name: 'Transformação Digital', desc: 'Integração de tecnologias digitais em todos os aspectos da operação.' },
      { icon: Kanban, name: 'Gestão de Projetos', desc: 'Metodologias híbridas: PMBOK, Scrum e Kanban.' },
    ],
  },
  {
    id: 'tecnologia',
    label: 'Tecnologia',
    icon: Cpu,
    description: 'Soluções tecnológicas avançadas para otimizar e transformar processos.',
    services: [
      { icon: MagnifyingGlass, name: 'Consultoria', desc: 'Expertise para maximizar o valor das iniciativas tecnológicas.' },
      { icon: ChartBar, name: 'Data Science', desc: 'Análise preditiva, machine learning e business intelligence.' },
      { icon: Package, name: 'Produtos Digitais', desc: 'Software, aplicativos e plataformas sob medida.' },
    ],
  },
];

export default function Services() {
  const [active, setActive] = useState('inovacao');
  const [drawerService, setDrawerService] = useState(null);
  const cat = categories.find((c) => c.id === active);

  return (
    <section id="servicos" className="services section">
      <div className="container">
        <span className="section-label" data-reveal data-reveal-delay="0">
          Produtos & Serviços
        </span>
        <h2 className="section-title" data-reveal data-reveal-delay="1">
          Soluções que geram<br /><em>resultados reais</em>
        </h2>

        <div className="services__tabs" data-reveal data-reveal-delay="2">
          {categories.map((c) => (
            <button
              key={c.id}
              className={`services__tab ${active === c.id ? 'services__tab--active' : ''}`}
              onClick={() => setActive(c.id)}
            >
              <c.icon size={18} weight={active === c.id ? 'fill' : 'regular'} />
              {c.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="services__body"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="services__cat-desc">{cat.description}</p>

            <div className="services__grid">
              {cat.services.map((s, i) => (
                <motion.div
                  key={s.name}
                  className="services__card"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                  onClick={() => setDrawerService(serviceDetails[s.name] || null)}
                >
                  <div className="services__card-icon">
                    <s.icon size={22} weight="regular" />
                  </div>
                  <h3 className="services__card-name">{s.name}</h3>
                  <p className="services__card-desc">{s.desc}</p>
                  <span className="services__card-more">Saiba mais →</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <ServiceDrawer
        isOpen={!!drawerService}
        onClose={() => setDrawerService(null)}
        service={drawerService}
      />
    </section>
  );
}
