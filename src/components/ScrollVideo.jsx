import { useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { ArrowUpRight, Brain } from '@phosphor-icons/react';
import gsap from 'gsap';
import './ScrollVideo.css';

export default function ScrollVideo() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const timelineRef = useRef(null);
  const textRef = useRef(null);
  const rafRef = useRef(null);

  useLayoutEffect(() => {
    if (!textRef.current) return;

    const els = textRef.current;
    const badge = els.querySelector('.sv__badge');
    const title = els.querySelector('.sv__title');
    const desc = els.querySelector('.sv__desc');
    const link = els.querySelector('.sv__link');

    gsap.set([badge, title, desc, link], { opacity: 0, y: 28 });

    const tl = gsap.timeline({ paused: true });
    tl.to(badge, { opacity: 1, y: 0, duration: 0.12, ease: 'power2.out' }, 0.08)
      .to(title, { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' }, 0.14)
      .to(desc,  { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' }, 0.22)
      .to(link,  { opacity: 1, y: 0, duration: 0.12, ease: 'power2.out' }, 0.30);

    timelineRef.current = tl;
    return () => tl.kill();
  }, []);

  const handleScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      const container = containerRef.current;
      const video = videoRef.current;
      if (!container || !video || !video.duration) return;

      const rect = container.getBoundingClientRect();
      const windowH = window.innerHeight;
      const progress = Math.max(0, Math.min(1,
        1 - rect.bottom / (rect.height + windowH)
      ));

      video.currentTime = progress * video.duration;

      if (timelineRef.current) {
        timelineRef.current.progress(progress);
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  return (
    <section className="sv-section" ref={containerRef}>
      <div className="sv-section__sticky">
        <div className="container">
          <div className="sv-section__layout">
            <div className="sv-section__text" ref={textRef}>
              <div className="sv__badge">
                <Brain size={15} weight="fill" />
                AIPF Framework
              </div>
              <h2 className="sv__title">
                Quer estar <em>2 anos à frente</em> do mercado?
              </h2>
              <p className="sv__desc">
                Integração e governança de projetos de AI para transformar sua organização.
                Nossa abordagem conecta inovação, estratégia e tecnologia para resultados reais.
              </p>
              <a
                href="https://aivante-ten.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="sv__link"
              >
                Conheça o AIPF Framework
                <ArrowUpRight size={16} weight="bold" />
              </a>
            </div>

            <div className="sv-section__media">
              <video
                ref={videoRef}
                className="sv-section__video"
                src="/assets/aipf-video.mp4"
                muted
                playsInline
                preload="auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
