import { useRef, useEffect, useCallback } from 'react';
import './CityBackground.css';

const DESKTOP_FRAMES = 240;
const MOBILE_FRAMES = 120;
const MOBILE_BREAKPOINT = 768;

function getConfig() {
  const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
  return {
    total: isMobile ? MOBILE_FRAMES : DESKTOP_FRAMES,
    path: isMobile ? '/assets/city_background_mobile/frame_' : '/assets/city_background/frame_',
  };
}

function padFrame(n) {
  return String(n).padStart(4, '0');
}

export default function CityBackground() {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const loadedCountRef = useRef(0);
  const totalRef = useRef(0);
  const rafRef = useRef(null);
  const configRef = useRef(null);

  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    const img = imagesRef.current[index];
    if (!img || !img.complete) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for performance

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // object-fit: cover
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = w / h;
    let drawW, drawH, drawX, drawY;

    if (canvasRatio > imgRatio) {
      drawW = w;
      drawH = w / imgRatio;
      drawX = 0;
      drawY = (h - drawH) / 2;
    } else {
      drawH = h;
      drawW = h * imgRatio;
      drawX = (w - drawW) / 2;
      drawY = 0;
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  // Preload frames progressively
  useEffect(() => {
    const config = getConfig();
    configRef.current = config;
    totalRef.current = config.total;
    loadedCountRef.current = 0;

    const images = new Array(config.total);
    let firstDrawn = false;

    // Load frames in batches to avoid overwhelming the browser
    const BATCH_SIZE = 10;
    let batchStart = 0;

    function loadBatch() {
      const end = Math.min(batchStart + BATCH_SIZE, config.total);
      for (let i = batchStart; i < end; i++) {
        const img = new Image();
        img.decoding = 'async';
        img.src = `${config.path}${padFrame(i + 1)}.webp`;
        img.onload = () => {
          loadedCountRef.current++;
          if (!firstDrawn && i === 0) {
            firstDrawn = true;
            drawFrame(0);
          }
        };
        images[i] = img;
      }
      batchStart = end;
      if (batchStart < config.total) {
        requestIdleCallback ? requestIdleCallback(() => loadBatch()) : setTimeout(loadBatch, 16);
      }
    }

    loadBatch();
    imagesRef.current = images;
  }, [drawFrame]);

  // Scroll handler
  const handleScroll = useCallback(() => {
    if (rafRef.current) return; // Throttle to one rAF

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const total = totalRef.current;
      if (!total) return;

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const progress = Math.max(0, Math.min(1, scrollTop / docHeight));
      const frameIndex = Math.min(total - 1, Math.floor(progress * total));

      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        drawFrame(frameIndex);
      }
    });
  }, [drawFrame]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const handleResize = () => {
      // Check if we need to switch between mobile/desktop frames
      const newConfig = getConfig();
      if (configRef.current && newConfig.total !== configRef.current.total) {
        window.location.reload(); // Simplest approach for breakpoint crossing
        return;
      }
      drawFrame(currentFrameRef.current);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll, drawFrame]);

  return (
    <div className="city-bg">
      <canvas ref={canvasRef} className="city-bg__canvas" />
      <div className="city-bg__filter" />
    </div>
  );
}
