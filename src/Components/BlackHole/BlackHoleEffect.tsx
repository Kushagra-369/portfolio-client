import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import "./BlackHole.css";

type Phase = "idle" | "approach" | "suction" | "black" | "restore";

export default function BlackHoleEffect({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [enabled, setEnabled] = useState(false);
  const busy = useRef(false);
  const root = useRef<HTMLDivElement>(null);
  const hole = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const listener = (event: Event) => {
      const e = event as CustomEvent<{ visible: boolean }>;
      setEnabled(Boolean(e.detail?.visible));
    };

    window.addEventListener("portfolio-main-visibility", listener);
    return () => window.removeEventListener("portfolio-main-visibility", listener);
  }, []);

  const sleep = (ms: number) =>
    new Promise<void>((resolve) => window.setTimeout(resolve, ms));

  const activate = async () => {
    if (busy.current || !root.current || !hole.current) return;

    busy.current = true;

    const container = root.current;
    const button = hole.current;
    const scrollY = window.scrollY;
    const body = document.body;

    const oldBody = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const animations: Animation[] = [];
    const overlays: HTMLSpanElement[] = [];
    const originalStyles = new Map<HTMLElement, string>();

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";

    try {
      setPhase("approach");
      await sleep(reduced ? 50 : 550);

      const holeRect = button.getBoundingClientRect();
      const holeX = holeRect.left + holeRect.width / 2;
      const holeY = holeRect.top + holeRect.height / 2;

      const fragment = document.createDocumentFragment();
      const chars: { el: HTMLSpanElement; x: number; y: number }[] = [];
      const textNodes: Text[] = [];
      const styleCache = new Map<HTMLElement, CSSStyleDeclaration>();

      // Capture only visible text, with a strict particle limit.
      const MAX_LETTERS = reduced ? 0 : 320;
      const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);

      while (walker.nextNode() && chars.length < MAX_LETTERS) {
        const node = walker.currentNode as Text;
        const parent = node.parentElement;

        if (
          !parent ||
          parent.closest(
            "script,style,textarea,input,select,option,[aria-hidden='true'],.black-hole-trigger"
          )
        ) continue;

        const text = node.textContent || "";
        if (!text.trim()) continue;

        const parentRect = parent.getBoundingClientRect();

        // Ignore text outside the current viewport.
        if (
          parentRect.bottom < 0 ||
          parentRect.top > window.innerHeight ||
          parentRect.right < 0 ||
          parentRect.left > window.innerWidth
        ) continue;

        let computed = styleCache.get(parent);
        if (!computed) {
          computed = getComputedStyle(parent);
          styleCache.set(parent, computed);
        }

        const range = document.createRange();

        for (let i = 0; i < text.length && chars.length < MAX_LETTERS; i++) {
          if (/\s/.test(text[i])) continue;

          range.setStart(node, i);
          range.setEnd(node, i + 1);

          const rect = range.getBoundingClientRect();
          if (!rect.width || !rect.height) continue;

          const particle = document.createElement("span");
          particle.textContent = text[i];
          particle.className = "black-hole-letter";

          Object.assign(particle.style, {
            position: "fixed",
            left: `${rect.left}px`,
            top: `${rect.top}px`,
            width: `${Math.max(rect.width, 2)}px`,
            height: `${rect.height}px`,
            font: computed.font,
            color: computed.color,
            lineHeight: computed.lineHeight,
            letterSpacing: computed.letterSpacing,
            zIndex: "2147483001",
            pointerEvents: "none",
            whiteSpace: "pre",
          });

          fragment.appendChild(particle);
          overlays.push(particle);

          chars.push({
            el: particle,
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          });
        }

        if (chars.length > 0 && !textNodes.includes(node)) {
          textNodes.push(node);
        }
      }

      // One DOM insertion instead of hundreds of individual insertions.
      document.body.appendChild(fragment);

      textNodes.forEach((node) => {
        const parent = node.parentElement as HTMLElement | null;
        if (!parent || originalStyles.has(parent)) return;

        originalStyles.set(parent, parent.style.opacity);
        parent.style.opacity = "0";
      });

      setPhase("suction");

      // Animate letters in a short, staggered sequence.
      chars.sort(
        (a, b) =>
          Math.hypot(a.x - holeX, a.y - holeY) -
          Math.hypot(b.x - holeX, b.y - holeY)
      );

      chars.forEach((char, index) => {
        const animation = char.el.animate(
          [
            {
              transform: "translate(0,0) scale(1) rotate(0deg)",
              opacity: 1,
              filter: "blur(0px)",
            },
            {
              transform: `translate(${centerX - char.x}px, ${centerY - char.y}px) scale(0) rotate(${index % 2 ? 180 : -180}deg)`,
              opacity: 0,
              filter: "blur(4px)",
            },
          ],
          {
            duration: reduced ? 100 : 500,
            delay: reduced ? 0 : index * 1.2,
            easing: "cubic-bezier(.7,0,.9,.3)",
            fill: "forwards",
          }
        );

        animations.push(animation);
      });

      // Animate only a small number of visible visual components.
      const candidates = Array.from(
        container.querySelectorAll<HTMLElement>(
          "img, video, canvas, button, article, section, [class*='card']"
        )
      );

      const elements = candidates
        .filter((el) => {
          if (el.closest(".black-hole-trigger")) return false;

          const rect = el.getBoundingClientRect();
          return (
            rect.width > 0 &&
            rect.height > 0 &&
            rect.bottom > 0 &&
            rect.top < window.innerHeight &&
            rect.right > 0 &&
            rect.left < window.innerWidth
          );
        })
        .filter(
          (el) =>
            !candidates.some(
              (other) => other !== el && other.contains(el) && elementsAlreadySelected(other, candidates)
            )
        )
        .slice(0, 16);

      elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();

        const animation = el.animate(
          [
            {
              transform: "translate(0,0) scale(1)",
              opacity: 1,
              filter: "blur(0px)",
            },
            {
              transform: `translate(${centerX - (rect.left + rect.width / 2)}px, ${centerY - (rect.top + rect.height / 2)}px) rotate(${index % 2 ? 10 : -10}deg) scale(0.02)`,
              opacity: 0,
              filter: "blur(6px)",
            },
          ],
          {
            duration: reduced ? 100 : 550,
            delay: reduced ? 0 : 250 + index * 25,
            easing: "cubic-bezier(.7,0,.9,.3)",
            fill: "forwards",
          }
        );

        animations.push(animation);
      });

      await sleep(reduced ? 150 : 1150);

      setPhase("black");
      await sleep(reduced ? 200 : 1800);

      setPhase("restore");

      [...animations].reverse().forEach((animation) => {
        try {
          animation.reverse();
        } catch {
          // Ignore animations that cannot be reversed.
        }
      });

      await sleep(reduced ? 100 : 650);
    } finally {
      animations.forEach((animation) => animation.cancel());
      overlays.forEach((el) => el.remove());

      originalStyles.forEach((opacity, el) => {
        el.style.opacity = opacity;
      });

      body.style.position = oldBody.position;
      body.style.top = oldBody.top;
      body.style.width = oldBody.width;
      body.style.overflow = oldBody.overflow;

      window.scrollTo(0, scrollY);

      setPhase("idle");
      busy.current = false;
    }
  };

  return (
    <>
      <div ref={root} className="black-hole-content">
        {children}
      </div>

      {enabled && (
        <motion.button
          ref={hole}
          type="button"
          className="black-hole-trigger"
          onClick={activate}
          disabled={phase !== "idle"}
          aria-label="Enter the black hole"
          title="Enter the black hole"
          animate={
            phase === "idle"
              ? { left: "auto", top: "auto", right: 28, bottom: 28, x: 0, y: 0, scale: 1 }
              : {
                  left: "50%",
                  top: "50%",
                  right: "auto",
                  bottom: "auto",
                  x: "-50%",
                  y: "-50%",
                  scale: phase === "approach" ? 4 : 7,
                }
          }
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <span className="black-hole-ring" />
          <span className="black-hole-core" />
        </motion.button>
      )}

      <div className={`black-hole-blackout ${phase === "black" ? "is-black" : ""}`} />
    </>
  );
}

// Helper used to avoid animating nested visual elements repeatedly.
function elementsAlreadySelected(el: HTMLElement, candidates: HTMLElement[]) {
  return candidates.some(
    (candidate) => candidate !== el && candidate.contains(el) && candidate.tagName === "SECTION"
  );
}
