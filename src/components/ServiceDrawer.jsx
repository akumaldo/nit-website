import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from '@phosphor-icons/react';
import './ServiceDrawer.css';

export default function ServiceDrawer({ isOpen, onClose, service }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && service && (
        <>
          <motion.div
            className="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />
          <motion.aside
            className="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <button className="drawer__close" onClick={onClose} aria-label="Fechar">
              <X size={20} />
            </button>

            <span className="drawer__category">{service.category}</span>
            <h2 className="drawer__title">{service.title}</h2>
            <p className="drawer__intro">{service.intro}</p>

            {service.paragraphs?.map((p, i) => (
              <p key={i} className="drawer__text">{p}</p>
            ))}

            {service.sections?.map((section, si) => (
              <div key={si} className="drawer__section">
                <h3 className="drawer__section-title">{section.heading}</h3>

                {section.paragraphs?.map((p, pi) => (
                  <p key={pi} className="drawer__text">{p}</p>
                ))}

                {section.items?.map((item, ii) => (
                  <div key={ii} className="drawer__item">
                    <h4 className="drawer__item-name">{item.name}</h4>
                    <p className="drawer__item-text">{item.text}</p>
                  </div>
                ))}
              </div>
            ))}

          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
