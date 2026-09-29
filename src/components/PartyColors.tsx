'use client';

import { useEffect } from 'react';

export default function PartyColors() {
  useEffect(() => {
    let hue = Math.floor(Math.random() * 360);
    document.querySelectorAll('main p').forEach(paragraph => {
      let previousSentence: string | undefined;
      paragraph.querySelectorAll<HTMLElement>('[data-party-sentence]').forEach(fragment => {
        if (!fragment.textContent?.trim()) return;
        const sentence = fragment.dataset.partySentence;
        if (sentence !== previousSentence) {
          // Every adjacent sentence is at least 110 degrees away on the hue wheel.
          hue = (hue + 110 + Math.floor(Math.random() * 141)) % 360;
          previousSentence = sentence;
        }
        fragment.style.setProperty('--party-color', `hsl(${hue} 100% 67%)`);
      });
    });
  }, []);
  return null;
}
