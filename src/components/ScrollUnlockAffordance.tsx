"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { Observer } from "gsap/dist/Observer";

// Make sure GSAP registers the Observer plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(Observer);
}

const CONFIG = {
  unlockThreshold: 80, // Virtual pixels required to unlock
  maxPullDistance: 120, // Max distance for interpolation
  resistanceFactor: 0.35, // Elastic damping
  fadeStart: 0.05, // Progress where fade starts (0-1)
  fadeEnd: 0.7, // Progress where opacity is 1
  minScale: 0.6, // Starting scale
  maxScale: 1.0, // Armed scale
};

export default function ScrollUnlockAffordance() {
  const [isLocked, setIsLocked] = useState(true);
  const chevronRef = useRef<SVGSVGElement>(null);

  // State Machine variables
  const state = useRef<"idle" | "pulling" | "armed" | "released">("idle");
  const currentPull = useRef(0);
  const observer = useRef<Observer | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // A11y Fallback
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsLocked(false);
      document.body.style.overflow = "auto";
      return;
    }

    // 1. Initial State: Page is locked at the top
    document.body.style.overflow = "hidden";
    gsap.set(chevronRef.current, { opacity: 0, scale: CONFIG.minScale });

    // Handoff to normal scroll
    const fireUnlock = () => {
      state.current = "released";
      setIsLocked(false);
      document.body.style.overflow = "auto";

      if (observer.current) {
        observer.current.kill(); // Stop observing
      }

      // Smooth completion animation
      if (chevronRef.current) {
        gsap.to(chevronRef.current, {
          opacity: 0,
          scale: 1.2,
          y: 5,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    };

    // Elastic reset if threshold isn't met
    const resetElastic = () => {
      state.current = "idle";
      currentPull.current = 0;
      
      if (chevronRef.current) {
        gsap.to(chevronRef.current, {
          opacity: 0,
          scale: CONFIG.minScale,
          duration: 0.5,
          ease: "elastic.out(1, 0.5)",
        });
      }
    };

    // Calculate fade and scale based on pull progress
    const updateVisuals = () => {
      if (state.current === "released" || !chevronRef.current) return;

      const progress = Math.min(Math.max(currentPull.current / CONFIG.maxPullDistance, 0), 1);
      
      let opacity = 0;
      if (progress > CONFIG.fadeStart) {
        opacity = (progress - CONFIG.fadeStart) / (CONFIG.fadeEnd - CONFIG.fadeStart);
      }
      opacity = Math.min(Math.max(opacity, 0), 1);
      
      const scale = CONFIG.minScale + opacity * (CONFIG.maxScale - CONFIG.minScale);

      // We explicitly animate only opacity and scale (no vertical movement during pull)
      gsap.set(chevronRef.current, { opacity, scale });

      // Update logical state
      if (currentPull.current > 0 && currentPull.current < CONFIG.unlockThreshold) {
        state.current = "pulling";
      } else if (currentPull.current >= CONFIG.unlockThreshold) {
        state.current = "armed";
      } else {
        state.current = "idle";
      }
    };

    // 2. Setup GSAP Observer to catch all unified interactions
    observer.current = Observer.create({
      target: window, // Listen on entire window
      type: "wheel,touch,pointer", // Catch mouse wheel, swipe, and drag
      preventDefault: true, // Stop actual browser bounce/scroll while locked
      onChange: (self) => {
        if (state.current === "released") return;

        // In GSAP Observer, deltaY > 0 means the user is intending to scroll DOWN
        // (i.e. swiping UP on touch, or wheeling DOWN on mouse).
        if (self.deltaY > 0) {
          // Accumulate pulling with simulated resistance
          currentPull.current += self.deltaY * CONFIG.resistanceFactor;
          updateVisuals();
        } else if (self.deltaY < 0 && state.current !== "idle") {
          // Relieving the pull slightly before lifting finger
          currentPull.current += self.deltaY * CONFIG.resistanceFactor;
          if (currentPull.current < 0) currentPull.current = 0;
          updateVisuals();
        }
      },
      onStop: () => {
        // Observer detects when movement has naturally stopped
        if (state.current === "armed") {
          fireUnlock();
        } else if (state.current === "pulling") {
          resetElastic();
        }
      },
    });

    return () => {
      document.body.style.overflow = "";
      if (observer.current) observer.current.kill();
    };
  }, []);

  return (
    <div className="h-8 flex justify-center items-center mt-2 pointer-events-none">
      <svg
        ref={chevronRef}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-slate-400"
        style={{ willChange: "opacity, transform" }}
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  );
}
