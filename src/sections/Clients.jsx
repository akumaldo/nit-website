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

export default function Clients() {
  return (
    <section className="clients section">
      <div className="container">
        <span className="section-label" data-reveal data-reveal-delay="0">
          Clientes
        </span>
        <h2 className="section-title" data-reveal data-reveal-delay="1">
          Conheça alguns dos<br /><em>nossos clientes</em>
        </h2>

        <div className="clients__grid" data-reveal data-reveal-delay="2">
          {logos.map((logo, i) => (
            <div key={i} className="clients__item">
              <img src={logo.src} alt={logo.alt} className="clients__logo" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
