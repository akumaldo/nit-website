import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { List, X } from '@phosphor-icons/react';
import './Header.css';

const navItems = [
  { label: 'Quem Somos', href: '#quem-somos' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Clientes', href: '#clientes' },
  { label: 'Contato', href: '#contato' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        className={`header ${scrolled ? 'header--scrolled' : ''}`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="header__inner container">
          <a href="#home" className="header__logo">
            <img src="/logo.png" alt="NIT Brasil" width="38" height="38" />
          </a>

          <nav className="header__nav">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="header__link">
                {item.label}
              </a>
            ))}
          </nav>

          <a href="#contato" className="header__cta">Fale Conosco</a>

          <button
            className="header__toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav className="mobile-overlay__nav">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="mobile-overlay__link"
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.06 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
