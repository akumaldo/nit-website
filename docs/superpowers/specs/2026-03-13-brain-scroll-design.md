# Brain Scroll Section — Design Spec

## Overview

A scroll-driven animation section where a mechanical/AI brain assembles from exploded tech parts as the user scrolls. Split 50/50 layout: AIPF text content on the left, brain animation canvas on the right. Positioned between the Hero and About sections.

**Note:** The current implementation (`BrainScroll.jsx`) does NOT match this spec — it uses a full-bleed dark overlay approach. This spec is the canonical design. The implementation will be rewritten to match.

## Video Source

- File: `openart-video_e5304710_1773399265495.mp4`
- Resolution: 1740x1188, 24fps original, 6s duration
- Frames already extracted: 181 frames at 30fps as WebP (q80) in `/public/assets/frames/`
- Frame naming: `frame_0001.webp` through `frame_0181.webp` (zero-padded 4 digits)
- Frame 1: exploded tech parts scattered. Frame ~90: parts converging. Frame 181: fully assembled brain.
- Frame background color: `#e7ebec` (sampled from corners of frame_0001)

## Layout

### Desktop (>768px)

```
┌──────────────────────────────────────────────┐
│              height: 300vh                    │
│  ┌────────────────────────────────────────┐   │
│  │  sticky (top:0, height:100vh)          │   │
│  │  ┌──────────────┬───────────────────┐  │   │
│  │  │  TEXT (50%)   │  CANVAS (50%)     │  │   │
│  │  │              │                   │  │   │
│  │  │  [badge]     │   ╭─────────╮     │  │   │
│  │  │  [title]     │   │  brain  │     │  │   │
│  │  │  [desc]      │   │ animatn │     │  │   │
│  │  │  [CTA btn]   │   ╰─────────╯     │  │   │
│  │  │              │                   │  │   │
│  │  └──────────────┴───────────────────┘  │   │
│  └────────────────────────────────────────┘   │
│                                              │
│  (scroll travel: 2 viewports)                │
└──────────────────────────────────────────────┘
```

- Section background: `#e7ebec` — matches frame background exactly for seamless blending
- Text side: vertically centered, left-aligned, max-width ~480px with left padding
- Canvas side: `object-fit: contain`, no border, no shadow, no box
- No visible boundary between canvas content and section background
- Layout uses CSS Grid: `grid-template-columns: 1fr 1fr`

### Mobile (<768px)

```
┌──────────────────────┐
│   height: 200vh      │
│  ┌─────────────────┐ │
│  │ sticky 100vh    │ │
│  │  ┌───────────┐  │ │
│  │  │  canvas   │  │ │
│  │  │  (40vh)   │  │ │
│  │  └───────────┘  │ │
│  │  ┌───────────┐  │ │
│  │  │   text    │  │ │
│  │  │  content  │  │ │
│  │  └───────────┘  │ │
│  └─────────────────┘ │
└──────────────────────┘
```

- Column layout: `grid-template-columns: 1fr`, canvas on top (~40vh), text below
- Scroll travel reduced to `200vh`
- Canvas takes up ~40% of viewport height

## Scroll Animation

- GSAP ScrollTrigger with `scrub: true` on the 300vh outer section
- `trigger`: the outer section, `start: 'top top'`, `end: 'bottom bottom'`
- Progress 0→1 maps to frame index 0→180
- `requestAnimationFrame` throttle: only redraw when frame index actually changes
- Text is **static** (visible from the start) — all animation focus is on the brain assembling

## Canvas Rendering

- `getContext('2d', { alpha: false })` — opaque canvas (frame backgrounds are solid `#e7ebec`, not transparent)
- `object-fit: contain` logic: brain fits within canvas bounds, horizontally and vertically centered
- DPR capped at `Math.min(devicePixelRatio, 2)` for performance
- Canvas element has no CSS border, outline, or box-shadow

## Frame Loading

- Preload in batches of 15 using `requestIdleCallback` with `setTimeout` fallback (for Safari <16.4)
- On first frame loaded (`frame_0001`): immediately draw it as placeholder
- Loading is eager (starts on mount) — section is below the fold so loading overlaps with user reading the Hero
- On component unmount: abort any pending batch loads, cancel rAF, kill ScrollTrigger instances
- Frame naming pattern: `/assets/frames/frame_${String(i+1).padStart(4,'0')}.webp`

## Seamless Blending

- Section background color: `#e7ebec` — matches frame corners exactly
- Canvas has no border, outline, box-shadow, or filter
- No `mix-blend-mode` needed — frames are opaque with matching background
- Optional safety: thin radial gradient overlay at canvas edges (`#e7ebec` → transparent) if minor color differences appear at certain frames

## Text Content

- Badge: "AIPF Framework" with `<Brain>` icon (from @phosphor-icons/react)
- Title: "Quer estar **2 anos à frente** do mercado?" (`em` tag on "2 anos à frente")
- Description: "Integração e governança de projetos de AI para transformar sua organização. Nossa abordagem conecta inovação, estratégia e tecnologia para resultados reais."
- CTA: "Conheça o AIPF Framework" → `href="https://aivante-ten.vercel.app/"`, `target="_blank"`, `rel="noopener noreferrer"`

## Styling

- **Light theme** throughout — dark text on light background
- Text colors: `--text` for title, `--text-secondary` for description, `--nit-blue` for badge and accents
- Font families: `--font-heading` (Montserrat) for badge/title/CTA, `--font-sans` (Inter) for description
- CTA button: `--nit-blue` background, `#fff` text, `btn-glow` class for subtle blue glow
- No glassmorphism, no backdrop-filter, no dark overlays

## Accessibility

- Canvas: `aria-hidden="true"` (decorative)
- `prefers-reduced-motion: reduce`: show static final frame (frame 181) instead of scroll animation. Disable ScrollTrigger scrub.
- CTA link has descriptive text (no need for aria-label)

## Resize Handling

- On resize: redraw current frame to fit new canvas dimensions
- No debounce needed (only redraws once per resize via rAF throttle already in place)
- No breakpoint reload — layout switches via CSS Grid media query

## Integration

- Replaces the current `BrainScroll` (dark overlay version) and `AIPFBanner` components
- Component files: `src/sections/BrainScroll.jsx` + `src/sections/BrainScroll.css`
- In `App.jsx`: `<BrainScroll />` between `<Hero />` and `<About />`

## Performance

- 181 WebP frames, ~26MB total
- Batch preloading (15 at a time) via `requestIdleCallback` / `setTimeout` fallback
- Single rAF throttle prevents queue buildup
- Canvas only redraws when frame index changes
- DPR capped at 2x
- Future optimization: separate mobile frame set (15fps, 640px, q60) to reduce mobile bandwidth — not in scope for v1
