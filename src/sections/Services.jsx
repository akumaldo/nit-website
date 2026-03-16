import { useState } from 'react';
import { ArrowRight } from '@phosphor-icons/react';
import serviceDetails from '../data/serviceDetails';
import ServiceDrawer from '../components/ServiceDrawer';
import './Services.css';

const services = [
  {
    name: 'IoT & Smart Cities',
    desc: 'Guiamos organizações através de projetos de IoT, infraestrutura urbana conectada e soluções inteligentes para cidades e indústria.',
    detailKey: 'IoT',
  },
  {
    name: 'Inteligência Artificial',
    desc: 'Nossos especialistas ajudam organizações a implementar, gerenciar e governar projetos de AI com resultados mensuráveis.',
    detailKey: 'Inteligência Artificial',
  },
  {
    name: 'Gestão Estratégica',
    desc: 'SWOT, BSC, planejamento estratégico e gestão de mudanças para alinhar tecnologia à estratégia do negócio.',
    detailKey: 'Gestão Estratégica',
  },
  {
    name: 'Transformação Digital',
    desc: 'Integração de tecnologias digitais em todos os aspectos da operação, do diagnóstico à implementação.',
    detailKey: 'Transformação Digital',
  },
  {
    name: 'Consultoria em TI',
    desc: 'Expertise para maximizar o valor das iniciativas tecnológicas com foco em eficiência e inovação.',
    detailKey: 'Consultoria',
  },
  {
    name: 'Data Science & Analytics',
    desc: 'Análise preditiva, machine learning e business intelligence para tomada de decisão baseada em dados.',
    detailKey: 'Data Science',
  },
];

export default function Services() {
  const [drawerService, setDrawerService] = useState(null);

  return (
    <section id="servicos" className="services section">
      <div className="container">
        <div className="services__header">
          <h2 className="services__title" data-reveal data-reveal-delay="0">
            Visão geral dos serviços
          </h2>
        </div>

        <div className="services__grid" data-reveal data-reveal-delay="1">
          {services.map((s) => (
            <div
              key={s.name}
              className="services__card"
              onClick={() => setDrawerService(serviceDetails[s.detailKey] || null)}
            >
              <h3 className="services__card-name">{s.name}</h3>
              <p className="services__card-desc">{s.desc}</p>
              <span className="services__card-more">
                Saiba mais <ArrowRight size={14} weight="bold" />
              </span>
            </div>
          ))}
        </div>
      </div>

      <ServiceDrawer
        isOpen={!!drawerService}
        onClose={() => setDrawerService(null)}
        service={drawerService}
      />
    </section>
  );
}
