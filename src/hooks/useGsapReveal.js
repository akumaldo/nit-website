import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes GSAP ScrollTrigger for:
 * 1. Section active state (semi-transparent -> opaque)
 * 2. Reveal animations (fade-in + slide-up) for [data-reveal] elements
 */
export default function useGsapReveal() {
  useEffect(() => {
    // Section active state — toggle class when section is 30% visible
    const sections = document.querySelectorAll('.section, .hero');
    const sectionTriggers = [];

    sections.forEach((section) => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top 70%',
        end: 'bottom 30%',
        onEnter: () => section.classList.add('section--active'),
        onLeave: () => section.classList.remove('section--active'),
        onEnterBack: () => section.classList.add('section--active'),
        onLeaveBack: () => section.classList.remove('section--active'),
      });
      sectionTriggers.push(trigger);
    });

    // Reveal animations for [data-reveal] elements
    const revealEls = document.querySelectorAll('[data-reveal]');

    revealEls.forEach((el, i) => {
      gsap.set(el, { opacity: 0, y: 40 });

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: (el.dataset.revealDelay || 0) * 0.1,
            ease: 'power2.out',
          });
        },
      });
    });

    // Mark hero as active immediately
    const hero = document.querySelector('.hero');
    if (hero) hero.classList.add('section--active');

    return () => {
      sectionTriggers.forEach((t) => t.kill());
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
}
