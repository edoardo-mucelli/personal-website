"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Ensure ScrollTrigger is registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GSAPScrollRevealProps {
  children: React.ReactNode;
}

export default function GSAPScrollReveal({ children }: GSAPScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // We use gsap.context for React 18+ strict mode cleanup
    const ctx = gsap.context(() => {
      // Selezioniamo tutti i paragrafi all'interno delle classi .text-block
      // e tutti i blocchi multimediali (.media-hug-content), escludendo quelli con .footer-anim
      const elements = gsap.utils.toArray<HTMLElement>(".text-block:not(.footer-anim) p, .media-hug-content:not(.footer-anim)");

      elements.forEach((el) => {
        gsap.fromTo(
          el,
          { 
            opacity: 0, 
            y: 20 // Partenza dal basso
          },
          {
            opacity: 1,
            y: 0, // Arrivo alla posizione originale
            duration: 1.12, // Rallentata del 40% rispetto all'originale 0.8
            delay: 0.5, // Mezzo secondo di ritardo prima che parta l'animazione
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%", // Inizia l'animazione quando il top del paragrafo raggiunge l'85% del viewport dall'alto
              once: true, // L'animazione avviene solo una volta. Se scrolli su, restano visibili.
            },
          }
        );
      });

      // Animazione speciale per gli elementi del footer (link social e copyright)
      const footerElements = gsap.utils.toArray<HTMLElement>(".footer-anim");
      
      if (footerElements.length > 0) {
        gsap.fromTo(
          footerElements,
          { 
            opacity: 0, 
            y: 20 
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.12,
            stagger: 0.2, // Fa comparire prima i social, e un attimo dopo il copyright
            ease: "power2.out",
            scrollTrigger: {
              trigger: footerElements[footerElements.length - 1], // Trigger sull'ultimissimo elemento per assicurare la fine della pagina
              start: "bottom bottom", // Triggera quando il fondo dell'ultimo elemento tocca il fondo della finestra
              once: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <div ref={containerRef} className="contents">
      {children}
    </div>
  );
}
