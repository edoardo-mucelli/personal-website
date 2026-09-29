'use client';

import { useEffect } from 'react';

const SVG_NS = 'http://www.w3.org/2000/svg';
const STORAGE_KEY = 'comic-sans-party-hues';
const distance = (a: number, b: number) => Math.min(Math.abs(a - b), 360 - Math.abs(a - b));

function separateContours() {
  document.querySelectorAll<SVGSVGElement>('[data-party-artwork] svg').forEach((svg, artwork) => {
    if (svg.dataset.partyPrepared) return;
    svg.dataset.partyPrepared = 'true';
    const defs = document.createElementNS(SVG_NS, 'defs');
    const paths = [...svg.querySelectorAll('path')].filter(p => !p.closest('defs'));
    paths.forEach((original, index) => {
      // These source assets use absolute M commands for every contour.
      const contours = original.getAttribute('d')?.match(/M[^M]+/g) ?? [];
      const paint = getComputedStyle(original);
      const filled = paint.fill !== 'none';
      const stroked = paint.stroke !== 'none';
      const group = document.createElementNS(SVG_NS, 'g');
      if (filled) {
        // Clip against the complete original silhouette, preserving letter counters
        // and holes even when their contours receive independent colors.
        const clip = document.createElementNS(SVG_NS, 'clipPath');
        clip.id = `party-clip-${artwork}-${index}`;
        const silhouette = original.cloneNode(true) as SVGPathElement;
        silhouette.setAttribute('clip-rule', original.getAttribute('fill-rule') ?? 'nonzero');
        clip.append(silhouette);
        defs.append(clip);
        group.setAttribute('clip-path', `url(#${clip.id})`);
      }
      contours.forEach(contour => {
        const line = original.cloneNode(true) as SVGPathElement;
        line.removeAttribute('id');
        line.setAttribute('d', contour);
        line.dataset.partyPaint = [filled && 'fill', stroked && 'stroke'].filter(Boolean).join(' ');
        group.append(line);
      });
      if (contours.length) original.replaceWith(group);
    });
    svg.prepend(defs);
  });
  // Include the inline scroll arrow too.
  document.querySelectorAll<SVGElement>('main svg:not([data-party-prepared]) path, main svg:not([data-party-prepared]) polyline, main svg:not([data-party-prepared]) line').forEach(line => {
    line.dataset.partyPaint = 'stroke';
  });
}

export default function PartyColors() {
  useEffect(() => {
    separateContours();
    function randomize() {
      let previous: number[] = [];
      try { previous = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? '[]'); } catch { /* Storage may be disabled. */ }
      const next: number[] = [];
      let hue = Math.floor(Math.random() * 360);
      function color() {
        const old = previous[next.length];
        const choices = Array.from({ length: 360 }, (_, h) => h).filter(h =>
          distance(h, hue) >= 110 && (typeof old !== 'number' || distance(h, old) >= 40));
        hue = choices[Math.floor(Math.random() * choices.length)];
        next.push(hue);
        return `hsl(${hue} 100% 67%)`;
      }
      document.querySelectorAll('main p').forEach(paragraph => {
        let previousSentence: string | undefined;
        let sentenceColor = '';
        paragraph.querySelectorAll<HTMLElement>('[data-party-sentence]').forEach(fragment => {
          if (!fragment.textContent?.trim()) return;
          const sentence = fragment.dataset.partySentence;
          if (sentence !== previousSentence) {
            sentenceColor = color();
            previousSentence = sentence;
          }
          fragment.style.setProperty('--party-color', sentenceColor);
        });
      });
      document.querySelectorAll<SVGElement>('[data-party-paint]').forEach(line => {
        const lineColor = color();
        line.dataset.partyPaint?.split(' ').forEach(paint => line.style.setProperty(paint, lineColor));
      });
      try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* Random colors still work without storage. */ }
    }
    randomize();
    const onPageShow = (event: PageTransitionEvent) => { if (event.persisted) randomize(); };
    window.addEventListener('pageshow', onPageShow);
    return () => window.removeEventListener('pageshow', onPageShow);
  }, []);
  return null;
}
