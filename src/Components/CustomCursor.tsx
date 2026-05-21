import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <>
      {/* MAIN CURSOR DOT - medium size */}
      <motion.div
        animate={{
          x: position.x - 6,
          y: position.y - 6,
        }}
        transition={{ duration: 0.008 }}
        className="
          fixed top-0 left-0
          w-3 h-3
          rounded-full
          pointer-events-none
          z-999999
          bg-linear-to-br from-cyan-300 via-emerald-400 to-teal-500
          shadow-[0_0_20px_5px_rgba(45,212,191,0.7)]
        "
      />

      {/* OUTER RING - subtle */}
      <motion.div
        animate={{
          x: position.x - 12,
          y: position.y - 12,
        }}
        transition={{ duration: 0.015 }}
        className="
          fixed top-0 left-0
          w-6 h-6
          rounded-full
          pointer-events-none
          z-999998
          border border-cyan-400/30
          bg-linear-to-br from-cyan-400/5 to-emerald-400/5
          shadow-[0_0_15px_rgba(34,211,238,0.3)]
        "
      />

      {/* SPREAD GLITTER 1 - top-left */}
      <motion.div
        animate={{
          x: position.x - 18,
          y: position.y - 18,
          opacity: [0, 1, 0],
          scale: [0, 1.2, 0],
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          delay: 0,
          x: { duration: 0.01 },
          y: { duration: 0.01 },
        }}
        className="
          fixed top-0 left-0
          w-1.5 h-1.5
          rounded-full
          bg-cyan-200
          pointer-events-none
          z-999997
          shadow-[0_0_10px_cyan]
        "
      />

      {/* SPREAD GLITTER 2 - top-right */}
      <motion.div
        animate={{
          x: position.x + 16,
          y: position.y - 20,
          opacity: [0, 0.8, 0],
          scale: [0, 1, 0],
        }}
        transition={{
          duration: 0.7,
          repeat: Infinity,
          delay: 0.15,
          x: { duration: 0.012 },
          y: { duration: 0.012 },
        }}
        className="
          fixed top-0 left-0
          w-1 h-1
          rounded-full
          bg-emerald-300
          pointer-events-none
          z-999997
          shadow-[0_0_8px_#6ee7b7]
        "
      />

      {/* SPREAD GLITTER 3 - bottom-right */}
      <motion.div
        animate={{
          x: position.x + 20,
          y: position.y + 14,
          opacity: [0, 1, 0],
          scale: [0, 1.3, 0],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          delay: 0.3,
          x: { duration: 0.011 },
          y: { duration: 0.011 },
        }}
        className="
          fixed top-0 left-0
          w-1 
          rounded-full
          bg-teal-200
          pointer-events-none
          z-999997
          shadow-[0_0_10px_#5eead4]
        "
      />

      {/* SPREAD GLITTER 4 - bottom-left */}
      <motion.div
        animate={{
          x: position.x - 22,
          y: position.y + 12,
          opacity: [0, 0.9, 0],
          scale: [0, 1.1, 0],
        }}
        transition={{
          duration: 0.65,
          repeat: Infinity,
          delay: 0.45,
          x: { duration: 0.013 },
          y: { duration: 0.013 },
        }}
        className="
          fixed top-0 left-0
          w-1.5 h-1.5
          rounded-full
          bg-cyan-100
          pointer-events-none
          z-999996
          shadow-[0_0_12px_rgba(165,243,252,1)]
        "
      />

      {/* SPREAD GLITTER 5 - far left */}
      <motion.div
        animate={{
          x: position.x - 28,
          y: position.y - 4,
          opacity: [0, 0.7, 0],
          scale: [0, 0.9, 0],
        }}
        transition={{
          duration: 0.55,
          repeat: Infinity,
          delay: 0.2,
          x: { duration: 0.014 },
          y: { duration: 0.014 },
        }}
        className="
          fixed top-0 left-0
          w-1 h-1
          rounded-full
          bg-white
          pointer-events-none
          z-999996
          shadow-[0_0_8px_white]
        "
      />

      {/* SPREAD GLITTER 6 - far right */}
      <motion.div
        animate={{
          x: position.x + 26,
          y: position.y + 2,
          opacity: [0, 0.85, 0],
          scale: [0, 1.15, 0],
        }}
        transition={{
          duration: 0.75,
          repeat: Infinity,
          delay: 0.5,
          x: { duration: 0.015 },
          y: { duration: 0.015 },
        }}
        className="
          fixed top-0 left-0
          w-1.5 h-1.5
          rounded-full
          bg-emerald-200
          pointer-events-none
          z-999996
          shadow-[0_0_10px_#a7f3d0]
        "
      />

      {/* SPREAD GLITTER 7 - top center */}
      <motion.div
        animate={{
          x: position.x - 2,
          y: position.y - 24,
          opacity: [0, 1, 0],
          scale: [0, 0.8, 0],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          delay: 0.1,
          x: { duration: 0.009 },
          y: { duration: 0.009 },
        }}
        className="
          fixed top-0 left-0
          w-0.5 h-0.5
          rounded-full
          bg-cyan-50
          pointer-events-none
          z-999995
        "
      />

      {/* SPREAD GLITTER 8 - bottom center */}
      <motion.div
        animate={{
          x: position.x + 3,
          y: position.y + 22,
          opacity: [0, 0.75, 0],
          scale: [0, 1, 0],
        }}
        transition={{
          duration: 0.7,
          repeat: Infinity,
          delay: 0.4,
          x: { duration: 0.01 },
          y: { duration: 0.01 },
        }}
        className="
          fixed top-0 left-0
          w-1 h-1
          rounded-full
          bg-teal-100
          pointer-events-none
          z-999995
          shadow-[0_0_8px_#ccfbf1]
        "
      />
    </>
  );
}