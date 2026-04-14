"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";

export default function ScrollFadeAffordance() {
  const affordanceRef = useRef<HTMLDivElement>(null);
  const isVisible = useRef(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkVisibility = () => {
      // Math.max evita lo scrolling negativo elastico di iOS
      const currentScroll = Math.max(window.scrollY || document.documentElement.scrollTop || 0, 0);

      // Hide on scroll down (> 30px so it stays visible a bit while scrolling)
      if (currentScroll > 30 && isVisible.current) {
        isVisible.current = false;
        if (affordanceRef.current) {
          gsap.to(affordanceRef.current, {
            opacity: 0,
            duration: 0.8, // Slower fade out
            ease: "power2.out",
            overwrite: true,
          });
        }
      } 
      // Show on return to top
      else if (currentScroll <= 30 && !isVisible.current) {
        isVisible.current = true;
        if (affordanceRef.current) {
          gsap.fromTo(
            affordanceRef.current,
            { opacity: 0, scale: 0.88 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: "back.out(1.5)",
              overwrite: true,
            }
          );
        }
      }
    };

    // Il GSAP ticker esegue la funzione ad ogni refresh del monitor.
    // L'abbiamo preferito ai classici window.addEventListener('scroll') per
    // superare qualsiasi forma di lag o throttle hardware che iOS applica agli eventi.
    gsap.ticker.add(checkVisibility);

    // Initial check all'avvio (es. se la pagina viene refreshata già scrollata)
    checkVisibility();

    return () => {
      gsap.ticker.remove(checkVisibility);
    };
  }, []);

  return (
    <div 
      ref={affordanceRef} 
      className="flex flex-col items-center justify-center gap-1 mt-1 text-inherit will-change-[opacity,transform]"
    >
      <p>Scroll down for my quick story.</p>
      <ChevronDown
        strokeWidth={1.5}
        className="w-5 h-5 text-inherit"
        style={{ color: "currentColor" }}
      />
    </div>
  );
}
