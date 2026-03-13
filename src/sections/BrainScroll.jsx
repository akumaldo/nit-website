import { useRef, useEffect, useCallback, useState } from 'react';
import { ArrowUpRight, Brain } from '@phosphor-icons/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './BrainScroll.css';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 181;
const BATCH_SIZE = 15;

function padFrame(n) {
  return String(n).padStart(4, '0');
}

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Steps reveal alongside brain construction phases:
// 0.00 = parts scattered → badge + title
// 0.20 = parts start converging → challenge text
// 0.45 = brain taking shape → solution text
// 0.70 = brain nearly complete → CTA appears
const STEPS = [
  { id: 'intro', at: 0.0 },
  { id: 'challenge', at: 0.20 },
  { id: 'solution', at: 0.45 },
  { id: 'cta', at: 0.70 },
];

export default function BrainScroll() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef(null);
  const abortRef = useRef(false);
  const [visibleSteps, setVisibleSteps] = useState(
    prefersReducedMotion
      ? new Set(STEPS.map((s) => s.id))
      : new Set()
  );

  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = imagesRef.current[index];
    if (!img || !img.complete) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    ctx.fillStyle = '#e7ebec';
    ctx.fillRect(0, 0, w, h);

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = w / h;
    let drawW, drawH, drawX, drawY;

    if (canvasRatio > imgRatio) {
      drawH = h;
      drawW = h * imgRatio;
      drawX = (w - drawW) / 2;
      drawY = 0;
    } else {
      drawW = w;
      drawH = w / imgRatio;
      drawX = 0;
      drawY = (h - drawH) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  // Preload frames
  useEffect(() => {
    abortRef.current = false;
    const images = new Array(TOTAL_FRAMES);
    let batchStart = 0;
    let firstDrawn = false;

    if (prefersReducedMotion) {
      const img = new Image();
      img.src = `/assets/frames/frame_${padFrame(TOTAL_FRAMES)}.webp`;
      img.onload = () => drawFrame(TOTAL_FRAMES - 1);
      images[TOTAL_FRAMES - 1] = img;
      imagesRef.current = images;
      return;
    }

    function loadBatch() {
      if (abortRef.current) return;
      const end = Math.min(batchStart + BATCH_SIZE, TOTAL_FRAMES);
      for (let i = batchStart; i < end; i++) {
        const img = new Image();
        img.decoding = 'async';
        img.src = `/assets/frames/frame_${padFrame(i + 1)}.webp`;
        img.onload = () => {
          if (!firstDrawn && i === 0) {
            firstDrawn = true;
            drawFrame(0);
          }
        };
        images[i] = img;
      }
      batchStart = end;
      if (batchStart < TOTAL_FRAMES) {
        const schedule = typeof requestIdleCallback !== 'undefined'
          ? requestIdleCallback
          : (cb) => setTimeout(cb, 16);
        schedule(() => loadBatch());
      }
    }

    loadBatch();
    imagesRef.current = images;
    return () => { abortRef.current = true; };
  }, [drawFrame]);

  // ScrollTrigger — frames + synced text reveal
  useEffect(() => {
    if (prefersReducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;

        const frameIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(progress * TOTAL_FRAMES)
        );
        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          if (!rafRef.current) {
            rafRef.current = requestAnimationFrame(() => {
              rafRef.current = null;
              drawFrame(frameIndex);
            });
          }
        }

        setVisibleSteps((prev) => {
          const next = new Set(prev);
          let changed = false;
          for (const step of STEPS) {
            if (progress >= step.at && !prev.has(step.id)) {
              next.add(step.id);
              changed = true;
            }
          }
          return changed ? next : prev;
        });
      },
    });

    return () => {
      st.kill();
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [drawFrame]);

  // Resize
  useEffect(() => {
    let resizeRaf = null;
    const handleResize = () => {
      if (resizeRaf) return;
      resizeRaf = requestAnimationFrame(() => {
        resizeRaf = null;
        drawFrame(currentFrameRef.current);
      });
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
    };
  }, [drawFrame]);

  const sc = (id) =>
    `brain-scroll__step ${visibleSteps.has(id) ? 'brain-scroll__step--visible' : ''}`;

  return (
    <section ref={sectionRef} className="brain-scroll">
      <div className="brain-scroll__sticky">
        <div className="brain-scroll__text">
          {/* Parts scattered → Badge + Title fade in */}
          <div className={sc('intro')}>
            <div className="brain-scroll__badge">
              <Brain size={15} weight="fill" />
              AIPF Framework
            </div>
            <h3 className="brain-scroll__title">
              Quer estar <em>2 anos à frente</em> do mercado?
            </h3>
          </div>

          {/* Parts converging → Challenge */}
          <div className={sc('challenge')}>
            <p className="brain-scroll__desc">
              A inteligência artificial será responsável por um aumento de{' '}
              <strong>40% da produtividade</strong> nas empresas nos próximos
              anos. Quem não se adaptar, ficará para trás.
            </p>
          </div>

          {/* Brain taking shape → Solution */}
          <div className={sc('solution')}>
            <p className="brain-scroll__desc">
              O <strong>AIPF</strong> é nosso framework proprietário de
              integração e governança de projetos de AI — do diagnóstico à
              implementação, com resultados reais e mensuráveis.
            </p>
          </div>

          {/* Brain complete → CTA */}
          <div className={sc('cta')}>
            <a
              href="https://aivante-ten.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="brain-scroll__cta btn-glow"
            >
              Conheça o AIPF Framework
              <ArrowUpRight size={18} weight="bold" />
            </a>
          </div>
        </div>

        <div className="brain-scroll__canvas-wrap">
          <canvas
            ref={canvasRef}
            className="brain-scroll__canvas"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
