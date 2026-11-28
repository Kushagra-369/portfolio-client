# Implement Black Hole Easter Egg

Work directly in this existing React + TypeScript + Vite portfolio.

First inspect src/App.tsx, routing, main layout, CSS and existing Framer Motion setup.

## Goal
Add a cinematic black hole Easter egg ONLY to the main portfolio screen, NOT the Start/Landing page.

## Animation sequence

1. Show a small, realistic animated black hole on the main portfolio screen. Keep it unobtrusive.
2. On click, move it smoothly to the exact viewport centre while increasing its size.
3. Make the entire visible portfolio get sucked into it:
   - Navbar
   - Home
   - About
   - Projects
   - Experience
   - Skills
   - Contact
   - Footer
   - All visible text, images, cards and UI
4. Use cinematic scale, opacity, blur, rotation and masking effects.
5. Show a completely black, empty screen for 1.5–2 seconds.
6. Restore the complete portfolio smoothly to exactly its previous appearance.

## Technical requirements

- Use existing Framer Motion if suitable.
- Create a modular BlackHole component.
- Apply the effect at the correct application-level wrapper.
- Do not unmount/remount the application.
- Preserve route, React state, theme and scroll position.
- Lock scrolling during the animation.
- Prevent multiple clicks during animation.
- Restore everything even if animation is interrupted.
- Clean up timers and listeners.
- Support mobile and desktop.
- Respect prefers-reduced-motion.
- Do not interfere with Start page, AI assistant, voice tour, theme toggle or navigation.
- Do not add unnecessary dependencies.

## Completion

Implement the actual feature; do not just provide suggestions.

Run npm run build after implementation and fix errors caused by your changes.

Finally report:
- Files created and modified.
- Where the black hole appears.
- How to test it.
- Build result.

Do not overwrite unrelated existing functionality.
