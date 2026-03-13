# Brain Scroll Section — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current broken BrainScroll component with a clean split-layout scroll-driven brain assembly animation.

**Architecture:** A single section (300vh) with a sticky inner container (100vh). CSS Grid splits it 50/50: static AIPF text on the left, canvas-driven frame animation on the right. GSAP ScrollTrigger maps scroll progress to frame index. Section background matches frame background (#e7ebec) for seamless blending.

**Tech Stack:** React, GSAP ScrollTrigger, Canvas 2D API, CSS Grid

**Spec:** `docs/superpowers/specs/2026-03-13-brain-scroll-design.md`

---

## File Structure

| File | Action | Responsibility |
|------|--------|---------------|
| `src/sections/BrainScroll.css` | Rewrite | Layout (300vh outer, sticky inner, CSS Grid split), canvas styling, text styling, mobile responsive, reduced-motion |
| `src/sections/BrainScroll.jsx` | Rewrite | Frame preloading, canvas rendering, GSAP ScrollTrigger setup, cleanup, accessibility |
| `src/App.jsx` | No change | Already imports BrainScroll in correct position |

Frames already exist at `public/assets/frames/frame_0001.webp` through `frame_0181.webp` (181 files, ~26MB).

Files to delete (no longer needed):
| File | Reason |
|------|--------|
| `src/sections/AIPFBanner.jsx` | Replaced by BrainScroll |
| `src/sections/AIPFBanner.css` | Replaced by BrainScroll |

---

## Chunk 1: Implementation

### Task 1: Write BrainScroll.css

**Files:**
- Rewrite: `src/sections/BrainScroll.css`

- [ ] **Step 1: Write the complete CSS**

```css
/* ===== Brain Scroll — Split Layout ===== */

.brain-scroll {
  height: 300vh;
  position: relative;
  background: #e7ebec;
}

.brain-scroll__sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 var(--pad);
}

/* --- Text side (left) --- */
.brain-scroll__text {
  max-width: 480px;
}

.brain-scroll__badge {
  font-family: var(--font-heading);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--nit-blue);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}

.brain-scroll__title {
  font-family: var(--font-heading);
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.01em;
  color: var(--text);
  margin-bottom: 16px;
}

.brain-scroll__title em {
  font-style: italic;
  color: var(--nit-blue);
}

.brain-scroll__desc {
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.75;
  color: var(--text-secondary);
  margin-bottom: 28px;
  max-width: 440px;
}

.brain-scroll__cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-heading);
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
  background: var(--nit-blue);
  padding: 13px 26px;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s var(--ease-out);
}

.brain-scroll__cta:hover {
  background: var(--nit-blue-light);
  color: #fff;
  transform: translateY(-2px);
}

/* --- Canvas side (right) --- */
.brain-scroll__canvas-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.brain-scroll__canvas {
  display: block;
  width: 100%;
  height: 80vh;
  border: none;
  outline: none;
}

/* --- Mobile --- */
@media (max-width: 768px) {
  .brain-scroll {
    height: 200vh;
  }

  .brain-scroll__sticky {
    grid-template-columns: 1fr;
    grid-template-rows: 40vh auto;
    align-items: start;
    padding-top: 80px;
    gap: 24px;
  }

  .brain-scroll__canvas-wrap {
    order: -1;
  }

  .brain-scroll__canvas {
    height: 100%;
  }

  .brain-scroll__text {
    max-width: 100%;
  }

  .brain-scroll__title {
    font-size: clamp(1.5rem, 5vw, 2rem);
  }
}

/* --- Reduced motion --- */
@media (prefers-reduced-motion: reduce) {
  .brain-scroll {
    height: auto;
    padding: var(--section-gap) 0;
  }

  .brain-scroll__sticky {
    position: relative;
    height: auto;
    min-height: 0;
  }
}
```

- [ ] **Step 2: Verify file saved**

Run: `cat src/sections/BrainScroll.css | head -5`
Expected: `/* ===== Brain Scroll — Split Layout ===== */`

---

### Task 2: Write BrainScroll.jsx

**Files:**
- Rewrite: `src/sections/BrainScroll.jsx`

- [ ] **Step 1: Write the complete component**

```jsx
import { useRef, useEffect, useCallback } from 'react';
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

export default function BrainScroll() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef(null);
  const abortRef = useRef(false);

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

    // Fill with background color first (seamless blending)
    ctx.fillStyle = '#e7ebec';
    ctx.fillRect(0, 0, w, h);

    // object-fit: contain
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

  // Preload frames in batches
  useEffect(() => {
    abortRef.current = false;
    const images = new Array(TOTAL_FRAMES);
    let batchStart = 0;
    let firstDrawn = false;

    // If reduced motion, only load the final frame
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

    return () => {
      abortRef.current = true;
    };
  }, [drawFrame]);

  // GSAP ScrollTrigger
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
          if (rafRef.current) return;
          rafRef.current = requestAnimationFrame(() => {
            rafRef.current = null;
            drawFrame(frameIndex);
          });
        }
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

  // Resize handler
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

  return (
    <section ref={sectionRef} className="brain-scroll">
      <div className="brain-scroll__sticky">
        <div className="brain-scroll__text">
          <div className="brain-scroll__badge">
            <Brain size={15} weight="fill" />
            AIPF Framework
          </div>
          <h3 className="brain-scroll__title">
            Quer estar <em>2 anos à frente</em> do mercado?
          </h3>
          <p className="brain-scroll__desc">
            Integração e governança de projetos de AI para transformar sua
            organização. Nossa abordagem conecta inovação, estratégia e
            tecnologia para resultados reais.
          </p>
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
```

- [ ] **Step 2: Verify file saved**

Run: `head -5 src/sections/BrainScroll.jsx`
Expected: `import { useRef, useEffect, useCallback } from 'react';`

---

### Task 3: Clean up old files

**Files:**
- Delete: `src/sections/AIPFBanner.jsx`
- Delete: `src/sections/AIPFBanner.css`

- [ ] **Step 1: Delete AIPFBanner files**

```bash
rm src/sections/AIPFBanner.jsx src/sections/AIPFBanner.css
```

- [ ] **Step 2: Verify no imports remain**

Run: `grep -r "AIPFBanner" src/`
Expected: No output (no references)

---

### Task 4: Build and verify

- [ ] **Step 1: Run production build**

Run: `cd /Users/brunolunardi/Downloads/Dev_Projects/NIT/nit-website && npx vite build`
Expected: Build succeeds with no errors

- [ ] **Step 2: Start dev server and visually verify**

Run: `npx vite --host`
Expected:
- Section between Hero and About with light gray (`#e7ebec`) background
- Left side: AIPF text with dark text, blue badge, blue CTA button
- Right side: brain animation that assembles as you scroll through the section
- Canvas blends seamlessly with section background (no visible box/border)
- Section sticks while scrolling through 300vh
- Mobile: canvas on top, text below

- [ ] **Step 3: Commit**

```bash
git add src/sections/BrainScroll.jsx src/sections/BrainScroll.css
git add -u  # picks up deleted AIPFBanner files
git commit -m "feat: rewrite BrainScroll as split-layout scroll-driven animation

- 50/50 grid: AIPF text left, brain canvas right
- GSAP ScrollTrigger scrub maps scroll to frame index
- Background #e7ebec matches frame BG for seamless blending
- Reduced motion: shows static final frame
- Mobile: stacked layout (canvas top, text bottom)
- Removes old AIPFBanner component"
```
