'use client';

import { useEffect, useRef } from 'react';

const REACTION_DURATIONS = [100, 120, 120, 110, 110, 110, 140, 140, 500, ...Array(8).fill(120), ...Array(6).fill(120)];
const REACTION_MS = REACTION_DURATIONS.reduce((a, b) => a + b, 0);
// Optical correction: shift the scene slightly left of its former alignment.
const SCENE_CENTER_X = (57 + 156) / 2 + 3;
function reactionFrame(elapsed: number) {
  let end = 0;
  for (let i = 0; i < REACTION_DURATIONS.length; i++) {
    end += REACTION_DURATIONS[i];
    if (elapsed < end) return i;
  }
  return REACTION_DURATIONS.length - 1;
}

/** The idle scene and whole-body sprites share a fixed pixel coordinate system. */
export default function Workbench() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    const images: Record<string, HTMLImageElement> = {};
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let alive = true, raf = 0, phase = 'loading', start = 0;
    let width = 0, scale = 2, origin = 0;
    let idleEpoch = 0, emissionEnd = Infinity;
    const setPhase = (value: string) => {
      phase = value; canvas.dataset.state = value;
      if (value === 'gone') {
        cancelAnimationFrame(raf); raf = 0;
        canvas.dataset.frame = 'empty';
        canvas.removeEventListener('click', click);
        canvas.removeEventListener('pointermove', move);
        canvas.removeEventListener('keydown', key);
      }
      canvas.tabIndex = value === 'idle' ? 0 : -1;
      canvas.setAttribute('role', value === 'idle' ? 'button' : 'img');
      canvas.setAttribute('aria-label', value === 'gone' ? 'Workbench with chair pushed back' : 'Edoardo soldering at his workbench');
      canvas.style.cursor = 'default';
    };
    const sprite = (key: string, frame: number, x: number) => {
      canvas.dataset.frame = `${key}:${frame}`;
      ctx.drawImage(images[key], frame % 8 * 192, Math.floor(frame / 8) * 176, 192, 176, x, 0, 192, 176);
    };
    const sparks = (time: number) => {
      if (reduced.matches) return;
      // Independent ballistic particles preserve the underlying furniture and alpha.
      const last = Math.floor((Math.min(time, emissionEnd) - idleEpoch) / 85);
      const first = Math.max(0, Math.floor((time - idleEpoch - 2000) / 85));
      for (let i = first; i <= last; i++) {
        const age = (time - idleEpoch - i * 85) / 1000;
        const seed = Math.abs(Math.sin(i * 127.1 + 311.7));
        const vx = -34 + seed * 56, vy = -38 - Math.abs(Math.cos(i * 71.9)) * 30;
        const x = 98 + vx * age, y = 112 + vy * age + 58 * age * age;
        if (age < 0 || y > 164) continue;
        ctx.fillStyle = i % 3 === 0 ? '#ff7618' : '#ffc62c';
        ctx.fillRect(Math.round(origin + x - vx * .018), Math.round(y - (vy + 116 * age) * .018), 1, 2);
        ctx.fillStyle = age < .15 ? '#ffffff' : '#fff17b';
        ctx.fillRect(Math.round(origin + x), Math.round(y), 1, 1);
      }
    };
    const draw = (time: number) => {
      if (phase === 'loading' || phase === 'error') return;
      ctx.clearRect(0, 0, width, 352); ctx.save(); ctx.scale(scale, scale); ctx.imageSmoothingEnabled = false;
      const elapsed = time - start;
      if (phase === 'idle') {
        sprite('idle', reduced.matches ? 0 : Math.floor(elapsed / 50) % 56, origin);
      } else if (phase === 'reacting' && elapsed < REACTION_MS) {
        sprite('reaction', reactionFrame(elapsed), origin);
      } else {
        if (phase === 'reacting') { start += REACTION_MS; setPhase('walking'); }
        if (phase === 'walking') {
          const distance = (time - start) * .036;
          if ((origin + distance + 55) * scale > width) setPhase('gone');
          ctx.drawImage(images.chairRest, origin, 0);
          if (phase === 'walking') sprite('walk', Math.floor((time - start) / 120) % 8, Math.round(origin + distance));
          // One opaque table layer correctly hides the actor until he clears it.
          ctx.drawImage(images.table, origin, 0);
        } else ctx.drawImage(images.empty, origin, 0);
      }
      sparks(time);
      ctx.restore();
    };
    const tick = (time: number) => {
      raf = 0;
      if (!alive || phase === 'gone') return;
      draw(time);
      if (alive && phase !== 'gone' && !(reduced.matches && phase === 'idle')) raf = requestAnimationFrame(tick);
    };
    const resize = () => {
      width = canvas.getBoundingClientRect().width;
      scale = matchMedia('(max-width: 767px)').matches ? 1.5 : 2;
      origin = Math.round(width / scale / 2 - SCENE_CENTER_X);
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(176 * scale * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); draw(performance.now());
    };
    const isScene = (e: PointerEvent | MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) / scale - origin), y = Math.floor((e.clientY - rect.top) / scale);
      return phase === 'idle' && x >= 13 && x < 188 && y >= 28 && y < 176;
    };
    const trigger = () => {
      if (phase !== 'idle') return;
      start = performance.now(); emissionEnd = start; setPhase(reduced.matches ? 'gone' : 'reacting'); draw(start);
    };
    const click = (e: MouseEvent) => { if (isScene(e)) trigger(); };
    const move = (e: PointerEvent) => { canvas.style.cursor = isScene(e) ? 'pointer' : 'default'; };
    const key = (e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); trigger(); } };
    const motionChange = () => {
      if (reduced.matches && phase !== 'loading' && phase !== 'idle') setPhase('gone');
      cancelAnimationFrame(raf); raf = 0; draw(performance.now());
      if (phase === 'idle' && !reduced.matches) raf = requestAnimationFrame(tick);
    };
    canvas.addEventListener('click', click); canvas.addEventListener('pointermove', move); canvas.addEventListener('keydown', key);
    window.addEventListener('resize', resize); reduced.addEventListener('change', motionChange);
    Promise.all(['idle', 'reaction', 'walk', 'chairRest', 'table', 'empty'].map(async name => {
      const im = new Image(); im.src = `/media/workbench/v3/${name === 'chairRest' ? 'chair-rest' : name}.png?revision=7`; await im.decode(); images[name] = im;
    })).then(() => {
      if (!alive) return;
      setPhase('idle'); start = performance.now(); idleEpoch = start; resize(); raf = requestAnimationFrame(tick);
    }).catch(() => { if (alive) setPhase('error'); });
    return () => {
      alive = false; cancelAnimationFrame(raf); window.removeEventListener('resize', resize); reduced.removeEventListener('change', motionChange);
      canvas.removeEventListener('click', click); canvas.removeEventListener('pointermove', move); canvas.removeEventListener('keydown', key);
    };
  }, []);
  return <div id="workbench" className="relative h-[264px] md:h-[352px]">
    <canvas ref={ref} role="button" tabIndex={0} data-state="loading" aria-label="Edoardo soldering at his workbench" style={{ width: '100vw', height: '100%', position: 'absolute', left: 'calc(50% - 50vw)', imageRendering: 'pixelated', touchAction: 'pan-y' }} />
  </div>;
}
