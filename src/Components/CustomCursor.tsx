import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

export default function CustomCursor() {
  /* =========================
     MOUSE POSITION
  ========================= */

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  /* =========================
     MAIN DOT
     Very fast / almost locked
  ========================= */

  const dotX = useSpring(mouseX, {
    stiffness: 1800,
    damping: 65,
    mass: 0.08,
  });

  const dotY = useSpring(mouseY, {
    stiffness: 1800,
    damping: 65,
    mass: 0.08,
  });

  /* =========================
     OUTER RING
     Slight smooth follow
  ========================= */

  const ringX = useSpring(mouseX, {
    stiffness: 650,
    damping: 38,
    mass: 0.18,
  });

  const ringY = useSpring(mouseY, {
    stiffness: 650,
    damping: 38,
    mass: 0.18,
  });

  /* =========================
     MOUSE LISTENER
  ========================= */

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* =================================
          MAIN CURSOR
      ================================= */}

      <motion.div
        style={{
          x: dotX,
          y: dotY,
        }}
        className="
          fixed
          top-0
          left-0
          w-4
          h-4
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          pointer-events-none
          z-999999
          bg-linear-to-br
          from-cyan-200
          via-emerald-400
          to-teal-500
          shadow-[0_0_25px_7px_rgba(45,212,191,0.65)]
        "
      />

      {/* =================================
          INNER GLOW
      ================================= */}

      <motion.div
        style={{
          x: dotX,
          y: dotY,
        }}
        className="
          fixed
          top-0
          left-0
          w-8
          h-8
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          pointer-events-none
          z-999998
          bg-cyan-300/5
          blur-md
        "
      />

      {/* =================================
          OUTER RING
      ================================= */}

      <motion.div
        style={{
          x: ringX,
          y: ringY,
        }}
        className="
          fixed
          top-0
          left-0
          w-8
          h-8
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          pointer-events-none
          z-999997
          border
          border-cyan-300/40
          bg-linear-to-br
          from-cyan-400/10
          to-emerald-400/5
          shadow-[0_0_18px_rgba(34,211,238,0.35)]
        "
      />

      {/* =================================
          SPARKLE 1 — TOP LEFT
      ================================= */}

      <motion.div
        style={{ x: mouseX, y: mouseY }}
        animate={{
          x: ["-50%", "-50%"],
          y: ["-50%", "-50%"],
          opacity: [0, 1, 0],
          scale: [0, 1.4, 0],
        }}
        transition={{
          duration: 0.65,
          repeat: Infinity,
          delay: 0,
        }}
        className="
          fixed
          top-0
          left-0
          w-2
          h-2
          rounded-full
          pointer-events-none
          z-999996
          bg-cyan-200
          shadow-[0_0_12px_#67e8f9]
          -translate-x-7
          -translate-y-7
        "
      />

      {/* =================================
          SPARKLE 2 — TOP RIGHT
      ================================= */}

      <motion.div
        style={{ x: mouseX, y: mouseY }}
        animate={{
          opacity: [0, 0.9, 0],
          scale: [0, 1.2, 0],
        }}
        transition={{
          duration: 0.75,
          repeat: Infinity,
          delay: 0.15,
        }}
        className="
          fixed
          top-0
          left-0
          w-1.5
          h-1.5
          rounded-full
          pointer-events-none
          z-999996
          bg-emerald-300
          shadow-[0_0_12px_#6ee7b7]
          translate-x-7
          -translate-y-8
        "
      />

      {/* =================================
          SPARKLE 3 — BOTTOM RIGHT
      ================================= */}

      <motion.div
        style={{ x: mouseX, y: mouseY }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1.3, 0],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          delay: 0.3,
        }}
        className="
          fixed
          top-0
          left-0
          w-1.5
          h-1.5
          rounded-full
          pointer-events-none
          z-999996
          bg-teal-200
          shadow-[0_0_12px_#5eead4]
          translate-x-8
          translate-y-7
        "
      />

      {/* =================================
          SPARKLE 4 — BOTTOM LEFT
      ================================= */}

      <motion.div
        style={{ x: mouseX, y: mouseY }}
        animate={{
          opacity: [0, 0.9, 0],
          scale: [0, 1.3, 0],
        }}
        transition={{
          duration: 0.7,
          repeat: Infinity,
          delay: 0.42,
        }}
        className="
          fixed
          top-0
          left-0
          w-2
          h-2
          rounded-full
          pointer-events-none
          z-999996
          bg-cyan-100
          shadow-[0_0_14px_#a5f3fc]
          -translate-x-9
          translate-y-6
        "
      />

      {/* =================================
          SPARKLE 5 — FAR LEFT
      ================================= */}

      <motion.div
        style={{ x: mouseX, y: mouseY }}
        animate={{
          opacity: [0, 0.8, 0],
          scale: [0, 1, 0],
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          delay: 0.2,
        }}
        className="
          fixed
          top-0
          left-0
          w-1.5
          h-1.5
          rounded-full
          pointer-events-none
          z-999996
          bg-white
          shadow-[0_0_10px_white]
          -translate-x-11
        "
      />

      {/* =================================
          SPARKLE 6 — FAR RIGHT
      ================================= */}

      <motion.div
        style={{ x: mouseX, y: mouseY }}
        animate={{
          opacity: [0, 0.85, 0],
          scale: [0, 1.15, 0],
        }}
        transition={{
          duration: 0.75,
          repeat: Infinity,
          delay: 0.5,
        }}
        className="
          fixed
          top-0
          left-0
          w-2
          h-2
          rounded-full
          pointer-events-none
          z-999996
          bg-emerald-200
          shadow-[0_0_14px_#a7f3d0]
          translate-x-10
          translate-y-1
        "
      />

      {/* =================================
          SPARKLE 7 — TOP CENTER
      ================================= */}

      <motion.div
        style={{ x: mouseX, y: mouseY }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1, 0],
        }}
        transition={{
          duration: 0.55,
          repeat: Infinity,
          delay: 0.1,
        }}
        className="
          fixed
          top-0
          left-0
          w-1
          h-1
          rounded-full
          pointer-events-none
          z-999995
          bg-cyan-50
          shadow-[0_0_10px_#cffafe]
          -translate-y-10
        "
      />

      {/* =================================
          SPARKLE 8 — BOTTOM CENTER
      ================================= */}

      <motion.div
        style={{ x: mouseX, y: mouseY }}
        animate={{
          opacity: [0, 0.8, 0],
          scale: [0, 1.1, 0],
        }}
        transition={{
          duration: 0.7,
          repeat: Infinity,
          delay: 0.4,
        }}
        className="
          fixed
          top-0
          left-0
          w-1.5
          h-1.5
          rounded-full
          pointer-events-none
          z-999995
          bg-teal-100
          shadow-[0_0_10px_#ccfbf1]
          translate-y-9
        "
      />

      {/* =================================
          SPARKLE 9 — DIAGONAL
      ================================= */}

      <motion.div
        style={{ x: mouseX, y: mouseY }}
        animate={{
          opacity: [0, 0.9, 0],
          scale: [0, 1.2, 0],
          rotate: [0, 90, 180],
        }}
        transition={{
          duration: 0.9,
          repeat: Infinity,
          delay: 0.25,
        }}
        className="
          fixed
          top-0
          left-0
          w-1
          h-3
          rounded-full
          pointer-events-none
          z-999995
          bg-cyan-200
          shadow-[0_0_10px_cyan]
          translate-x-5
          translate-y-6
        "
      />

      {/* =================================
          SPARKLE 10 — DIAGONAL
      ================================= */}

      <motion.div
        style={{ x: mouseX, y: mouseY }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1.1, 0],
          rotate: [90, 180, 270],
        }}
        transition={{
          duration: 0.85,
          repeat: Infinity,
          delay: 0.55,
        }}
        className="
          fixed
          top-0
          left-0
          w-1
          h-3
          rounded-full
          pointer-events-none
          z-999995
          bg-emerald-200
          shadow-[0_0_10px_#6ee7b7]
          -translate-x-6
          -translate-y-5
        "
      />

      {/* =================================
          SPARKLE 11
      ================================= */}

      <motion.div
        style={{ x: mouseX, y: mouseY }}
        animate={{
          opacity: [0, 0.7, 0],
          scale: [0, 1.4, 0],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          delay: 0.35,
        }}
        className="
          fixed
          top-0
          left-0
          w-1
          h-1
          rounded-full
          pointer-events-none
          z-999994
          bg-white
          shadow-[0_0_8px_white]
          translate-x-2
          -translate-y-12
        "
      />

      {/* =================================
          SPARKLE 12
      ================================= */}

      <motion.div
        style={{ x: mouseX, y: mouseY }}
        animate={{
          opacity: [0, 0.8, 0],
          scale: [0, 1.3, 0],
        }}
        transition={{
          duration: 0.65,
          repeat: Infinity,
          delay: 0.6,
        }}
        className="
          fixed
          top-0
          left-0
          w-1.5
          h-1.5
          rounded-full
          pointer-events-none
          z-999994
          bg-teal-100
          shadow-[0_0_10px_#99f6e4]
          -translate-x-3
          translate-y-11
        "
      />
    </>
  );
}