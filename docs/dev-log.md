# Development Log

This log tracks features, fixes, and content changes to provide context for testing and historical reference.

---

## [2026-04-18] - Setup Workflow and GSAP Prep

### Changes
- **Workflow**: Established `docs/workflow.md` with branching and naming conventions (`feat/`, `fix/`, etc.).
- **Branching**: Created `dev` from `main` and `GSAP-test-animations` from `dev`.
- **GSAP Prep**: Ready to start testing advanced animations on the personal website.

### Context for Tests
- Verify that standard git operations (branching, merging) follow the new convention.
- Future GSAP animations will need tests for:
    - Component mount behavior.
    - Animation triggers (scroll, timing).
    - Mobile performance/responsiveness.

---

## [2026-04-18] - Implemented GSAP Scroll Reveal

### Changes
- **Feature**: Added `<GSAPScrollReveal>` component to animate paragraph text on scroll.
- **Logic**: Used GSAP's `ScrollTrigger` in a Client Component wrapper. Elements (`.text-block p`) fade in from 0% opacity and move slightly upwards (y: 20 -> y: 0) when they reach 85% of the viewport.
- **Rules**: Applied `once: true` so the text stays visible if scrolled back up. Header text and Affordance scroll are excluded as requested.

### Context for Tests
- Scroll behavior needs visual/manual validation on different devices.
- Need to check that Hydration doesn't cause flash of unstyled text before GSAP initializes, although standard React render cycle usually prevents it with fast transitions.

### Tweaks (Follow-up)
- **Timing**: Added `delay: 0.5` and increased `duration` by 40% (to 1.12s) for a smoother and slower reveal.
- **Coverage**: Updated selector from `.text-block p` to `.text-block p, .media-hug-content` to animate SVG, videos, and images below the header as well.
- **Footer**: Re-enabled animation for social links and copyright, but set `scrollTrigger` to `start: "bottom bottom"` bound to the container so it only reveals them when the absolute end of the page is reached. Added `stagger: 0.2`.
- **Layout**: Added `pb-[16px]` to main container for bottom spacing.
