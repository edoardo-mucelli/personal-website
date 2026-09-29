'use client';

import { useEffect } from 'react';

const STORAGE_KEY = 'comic-sans-party-hues';
const distance = (a: number, b: number) => Math.min(Math.abs(a - b), 360 - Math.abs(a - b));

export default function PartyColors() {
  useEffect(() => {
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
      try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* Random colors still work without storage. */ }
    }
    randomize();
    const onPageShow = (event: PageTransitionEvent) => { if (event.persisted) randomize(); };
    window.addEventListener('pageshow', onPageShow);
    return () => window.removeEventListener('pageshow', onPageShow);
  }, []);
  return null;
}
