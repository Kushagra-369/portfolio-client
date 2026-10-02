import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import type { Variants } from "framer-motion";
import { useState, useMemo } from "react";
import { useTheme } from "../../Context/ThemeContext";

/* =========================================================
   HORROR WHISPERS
========================================================= */
const HORROR_WHISPERS = [
  "I see you",
  "Behind you",
  "Don't turn around",
  "You shouldn't have",
  "He's here",
  "It hurts",
  "Look closer",
  "Run.",
  "Feed me",
  "Let me in",
  "Nine of us",
  "We never left",
];

export default function About() {
  const { theme } = useTheme();
  const isLove = theme === "love";
  const isHorror = theme === "horror";

  // =========================================
  // 3D PHOTO TILT
  // =========================================
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-12, 12]);

  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const glareBg = useMotionTemplate`
    radial-gradient(
      circle at ${glareX} ${glareY},
      rgba(255,255,255,0.28),
      transparent 60%
    )
  `;

  const [isHoveringImg, setIsHoveringImg] = useState(false);
  const [heartBurstKey, setHeartBurstKey] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHoveringImg(true);
    if (isLove || isHorror) setHeartBurstKey((k) => k + 1);
  };

  const handleMouseLeave = () => {
    setIsHoveringImg(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  /* Horror hover — random whispers and drips, regenerated per hover */
  const horrorWhispers = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        text: HORROR_WHISPERS[Math.floor(Math.random() * HORROR_WHISPERS.length)],
        top: `${10 + Math.random() * 72}%`,
        left: `${5 + Math.random() * 70}%`,
        rotation: -12 + Math.random() * 24,
        delay: i * 0.35,
        duration: 2.2 + Math.random() * 1.4,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [heartBurstKey]
  );

  const horrorBloodDrips = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        left: `${6 + i * 9 + Math.random() * 3}%`,
        width: `${2 + Math.random() * 2.5}px`,
        height: `${18 + Math.random() * 42}px`,
        delay: Math.random() * 0.9,
        duration: 1.8 + Math.random() * 1.6,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [heartBurstKey]
  );

  const horrorSplatters = useMemo(
    () =>
      Array.from({ length: 6 }, () => ({
        top: `${10 + Math.random() * 80}%`,
        left: `${10 + Math.random() * 80}%`,
        size: `${50 + Math.random() * 90}px`,
        delay: Math.random() * 1.4,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [heartBurstKey]
  );

  // =========================================
  // ANIMATIONS
  // =========================================
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: "easeOut" },
    },
  };

  const itemAnimation: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <main
      className="
        relative min-h-screen overflow-hidden
        bg-transparent
        px-6 pb-20 pt-28
        text-gray-900 dark:text-white
        sm:px-10
        md:px-14
        lg:px-16
        xl:px-20
      "
    >
      {/* ============ THEME FONTS + TEXT GLOW ============ */}
      <style>
        {`
          /* HORROR — glowing white-red */
          .about-horror-text,
          .about-horror-text * {
            font-family: 'Creepster', 'Nosifer', 'Eater', 'Butcherman', cursive !important;
            letter-spacing: 0.08em !important;
            color: #ffffff !important;
            -webkit-text-fill-color: #ffffff !important;
            text-shadow:
              0 0 4px #ffdddd,
              0 0 10px #ff3333,
              0 0 20px #ff0000,
              0 0 40px #cc0000,
              0 0 80px #8b0000,
              0 4px 2px #000 !important;
          }
          .about-horror-text-soft,
          .about-horror-text-soft * {
            font-family: 'Creepster', 'Nosifer', cursive !important;
            color: #ffdddd !important;
            -webkit-text-fill-color: #ffdddd !important;
            text-shadow:
              0 0 6px #ff3333,
              0 0 16px #cc0000,
              0 0 32px #8b0000,
              0 2px 2px #000 !important;
          }

          /* Heading flicker */
          @keyframes aboutHorrorFlicker {
            0%, 46%, 54%, 100% {
              text-shadow:
                0 0 4px #ffdddd, 0 0 10px #ff3333, 0 0 20px #ff0000,
                0 0 40px #cc0000, 0 0 80px #8b0000, 0 4px 2px #000;
            }
            48% {
              text-shadow:
                0 0 2px #ffaaaa, 0 0 6px #aa0000, 0 0 12px #550000,
                0 2px 2px #000;
            }
            50% {
              text-shadow:
                0 0 6px #ffffff, 0 0 16px #ff6666, 0 0 34px #cc0000,
                0 0 70px #660000, 0 4px 2px #000;
            }
          }
          .about-horror-flicker { animation: aboutHorrorFlicker 3.8s infinite; }

          /* LOVE — dark rose + soft pink glow */
          .about-love-text,
          .about-love-text * {
            font-family: 'Dancing Script', 'Great Vibes', cursive !important;
            letter-spacing: 0.02em !important;
            color: #7a0038 !important;
            -webkit-text-fill-color: #7a0038 !important;
            text-shadow:
              0 0 6px rgba(255, 182, 213, 0.9),
              0 0 14px rgba(244, 114, 182, 0.7),
              0 1px 0 rgba(255, 255, 255, 0.6) !important;
          }
          .about-love-text-soft,
          .about-love-text-soft * {
            font-family: 'Dancing Script', cursive !important;
            color: #8b0040 !important;
            -webkit-text-fill-color: #8b0040 !important;
            text-shadow:
              0 0 6px rgba(244, 114, 182, 0.55),
              0 1px 0 rgba(255, 255, 255, 0.55) !important;
          }

          /* Photo glow pulses */
          @keyframes aboutHorrorPulse {
            0%, 100% {
              box-shadow:
                0 0 30px rgba(180, 0, 0, 0.75),
                0 0 80px rgba(90, 0, 0, 0.65),
                inset 0 0 18px rgba(255, 40, 40, 0.35);
            }
            50% {
              box-shadow:
                0 0 55px rgba(255, 20, 20, 1),
                0 0 130px rgba(140, 0, 0, 0.95),
                inset 0 0 28px rgba(255, 40, 40, 0.6);
            }
          }
          @keyframes aboutLovePulse {
            0%, 100% {
              box-shadow:
                0 0 30px rgba(244, 114, 182, 0.8),
                0 0 80px rgba(219, 39, 119, 0.6);
            }
            50% {
              box-shadow:
                0 0 55px rgba(255, 182, 213, 1),
                0 0 130px rgba(244, 114, 182, 0.9);
            }
          }
          @keyframes aboutShinySweep {
            0%   { transform: translateX(-120%) rotate(8deg); }
            100% { transform: translateX(220%) rotate(8deg); }
          }
          .about-shiny-sweep { animation: aboutShinySweep 3.5s linear infinite; }

          /* ============================================
             HORROR IMAGE GLITCH — VHS rot
          ============================================ */
          @keyframes aboutImgGlitch {
            0%, 100% {
              transform: translate(0, 0) scale(1.03);
              filter: brightness(1.05) contrast(1.25) saturate(0.55) hue-rotate(-10deg);
            }
            6% {
              transform: translate(-5px, 2px) scale(1.04) skewX(-1.5deg);
              filter: brightness(1.25) contrast(1.6) saturate(0.2) hue-rotate(-25deg);
            }
            8% {
              transform: translate(4px, -3px) scale(1.035) skewX(2deg);
              filter: brightness(1.05) contrast(1.8) saturate(0.05) hue-rotate(180deg);
            }
            11% {
              transform: translate(-2px, 3px) scale(1.03);
              filter: brightness(0.85) contrast(2.2) saturate(0) invert(0.05);
            }
            13% {
              transform: translate(0, 0) scale(1.03);
              filter: brightness(1.05) contrast(1.25) saturate(0.55);
            }
            47% {
              transform: translate(0, 0) scale(1.03);
              filter: brightness(1.05) contrast(1.25) saturate(0.55);
            }
            49% {
              transform: translate(6px, 1px) scale(1.045) skewX(3deg);
              filter: brightness(1.4) contrast(2) saturate(0.1) hue-rotate(45deg);
            }
            51% {
              transform: translate(-4px, -2px) scale(1.03) skewX(-2deg);
              filter: brightness(0.7) contrast(2.4) saturate(0.05);
            }
            53% {
              transform: translate(0, 0) scale(1.03);
              filter: brightness(1.05) contrast(1.25) saturate(0.55);
            }
            86% {
              transform: translate(-3px, 2px) scale(1.04) skewY(1.5deg);
              filter: brightness(1.2) contrast(1.9) saturate(0.15);
            }
            88% {
              transform: translate(2px, -2px) scale(1.03) skewY(-1deg);
              filter: brightness(1.5) contrast(1.4) saturate(0.3);
            }
          }
          .about-horror-img-glitch {
            animation: aboutImgGlitch 1.4s steps(24) infinite;
            will-change: transform, filter;
          }

          /* RGB tear ghosts */
          @keyframes aboutRGBRed {
            0%, 100% { transform: translate(-3px, 1px); opacity: 0.35; }
            22%      { transform: translate(-8px, 2px); opacity: 0.6; }
            48%      { transform: translate(-2px, 0);   opacity: 0.3; }
            72%      { transform: translate(-11px, 3px);opacity: 0.7; }
            90%      { transform: translate(-4px, 1px); opacity: 0.4; }
          }
          @keyframes aboutRGBCyan {
            0%, 100% { transform: translate(3px, -1px);  opacity: 0.3; }
            22%      { transform: translate(9px, -2px);  opacity: 0.55; }
            48%      { transform: translate(2px, 0);     opacity: 0.25; }
            72%      { transform: translate(12px, -3px); opacity: 0.65; }
            90%      { transform: translate(4px, -1px);  opacity: 0.35; }
          }
          .about-horror-rgb-red {
            animation: aboutRGBRed 1.2s steps(20) infinite;
            mix-blend-mode: screen;
          }
          .about-horror-rgb-cyan {
            animation: aboutRGBCyan 1.35s steps(20) infinite;
            mix-blend-mode: screen;
          }

          /* Blood drips */
          @keyframes aboutBloodDripFall {
            0%   { transform: translateY(-10px) scaleY(0.6); opacity: 0; }
            15%  { opacity: 1; }
            100% { transform: translateY(120px) scaleY(1.4); opacity: 0; }
          }

          /* Blood splatter */
          @keyframes aboutSplatter {
            0%, 100% { transform: scale(0.4); opacity: 0; }
            30%      { transform: scale(1);    opacity: 0.85; }
            60%      { transform: scale(1.1);  opacity: 0.55; }
            90%      { transform: scale(1.15); opacity: 0; }
          }

          /* Static jitter */
          @keyframes aboutStaticJitter {
            0%   { transform: translate(0, 0); opacity: 0.35; }
            20%  { transform: translate(-3px, 2px); opacity: 0.5; }
            40%  { transform: translate(2px, -3px); opacity: 0.3; }
            60%  { transform: translate(-2px, -2px); opacity: 0.55; }
            80%  { transform: translate(3px, 3px); opacity: 0.4; }
            100% { transform: translate(0, 0); opacity: 0.35; }
          }
          .about-horror-static {
            animation: aboutStaticJitter 0.18s steps(3) infinite;
          }

          /* Whispers */
          @keyframes aboutWhisper {
            0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.85); }
            15%      { opacity: 0.9; }
            40%      { opacity: 0.75; }
            70%      { opacity: 0.95; }
            85%      { opacity: 0; transform: translate(-50%, -50%) scale(1.15); }
          }

          /* Eye blink */
          @keyframes aboutEyeBlink {
            0%, 100% { transform: scaleY(1); }
            46%, 54% { transform: scaleY(0.05); }
          }
          .about-horror-eye {
            animation: aboutEyeBlink 4.5s ease-in-out infinite;
            transform-origin: center;
          }

          /* Claw reaching */
          @keyframes aboutClawReach {
            0%, 100% { transform: translateY(30%) rotate(-2deg); opacity: 0; }
            35%      { transform: translateY(0%)  rotate(0deg);  opacity: 0.85; }
            60%      { transform: translateY(-3%) rotate(1deg);  opacity: 0.7; }
            85%      { transform: translateY(5%)  rotate(-1deg); opacity: 0; }
          }

          /* Death vignette */
          @keyframes aboutDeathVignette {
            0%, 100% { opacity: 0.3; }
            50%      { opacity: 0.9; }
          }

          /* Badge heartbeat */
          @keyframes aboutBadgeHeartbeat {
            0%, 100% { box-shadow: 0 0 12px rgba(255,20,20,0.65); }
            50%      { box-shadow: 0 0 26px rgba(255,40,40,1), 0 0 42px rgba(180,0,0,0.8); }
          }
          .about-horror-badge { animation: aboutBadgeHeartbeat 2.2s ease-in-out infinite; }

          /* Horror link — bloodshot glow on hover */
          .about-horror-link:hover {
            box-shadow: 0 0 14px rgba(255,20,20,0.9), inset 0 0 8px rgba(255,20,20,0.4) !important;
            text-shadow: 0 0 8px rgba(255,0,0,0.95);
          }

          /* Screenshot cards — blood rot on hover */
          @keyframes aboutScreenshotGlitch {
            0%, 100% { transform: translate(0,0) skew(0deg); }
            25%      { transform: translate(-2px, 1px) skew(-1.5deg); }
            50%      { transform: translate(2px, -1px) skew(1.5deg); }
            75%      { transform: translate(-1px, 2px) skew(-1deg); }
          }
          .about-horror-screenshot:hover { animation: aboutScreenshotGlitch 0.4s steps(4) infinite; }

          /* Ambient blood mist */
          @keyframes aboutBloodMist {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50%      { opacity: 0.65; transform: scale(1.05); }
          }

          /* Ring rotation — slower, more ominous under horror */
          @keyframes aboutHorrorRing {
            0%, 100% {
              box-shadow: 0 0 18px rgba(255,20,20,0.5), inset 0 0 12px rgba(255,20,20,0.35);
            }
            50% {
              box-shadow: 0 0 34px rgba(255,40,40,0.95), inset 0 0 20px rgba(255,40,40,0.6);
            }
          }
        `}
      </style>

      {/* Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Creepster&family=Nosifer&family=Eater&family=Butcherman&family=Dancing+Script:wght@400;700&family=Great+Vibes&display=swap"
      />

      {/* =========================================
          HORROR — ambient blood mist behind content
      ========================================= */}
      {isHorror && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(60% 45% at 50% 100%, rgba(180,0,0,0.35) 0%, rgba(80,0,0,0.2) 45%, transparent 80%)",
              animation: "aboutBloodMist 6s ease-in-out infinite",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.22] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.7'/></svg>\")",
            }}
          />
        </>
      )}

      {/* =========================================
          PAGE HEADER
      ========================================= */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="relative z-10 mx-auto mb-12 max-w-[1450px]"
      >
        <div className="mb-3 flex items-center gap-3">
          <span
            className={`
              h-px w-10
              bg-cyan-500 dark:bg-cyan-400
              love:bg-pink-500
              horror:bg-red-600
            `}
          />
          <span
            className={`
              text-[10px] font-semibold uppercase tracking-[0.28em]
              text-cyan-600 dark:text-cyan-400
              love:text-pink-700
              horror:text-red-400
              ${isHorror ? "about-horror-text-soft" : ""}
              ${isLove ? "about-love-text-soft" : ""}
            `}
          >
            Professional Journey
          </span>
        </div>

        <h1
          className={`
            text-5xl font-bold tracking-tight
            text-gray-900 dark:text-white
            sm:text-6xl
            relative inline-block
            ${isHorror ? "about-horror-text about-horror-flicker" : ""}
            ${isLove ? "about-love-text" : ""}
          `}
        >
          Experience
          <span
            className={`
              text-cyan-500 dark:text-cyan-400
              love:text-pink-500
              horror:text-red-500
            `}
          >
            .
          </span>
          {/* Horror — bloodshot eye to the right of the title */}
          {isHorror && (
            <motion.span
              aria-hidden="true"
              className="about-horror-eye absolute top-1/2 -right-14 sm:-right-16 -translate-y-1/2 inline-block"
              style={{ width: "52px", height: "28px" }}
              initial={{ opacity: 0.85 }}
              animate={{ opacity: [0.85, 0.95, 0.85] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(ellipse at center, #f2e2c8 0%, #d8b8a0 45%, #6b1010 85%, #1a0000 100%)",
                  boxShadow:
                    "0 0 14px rgba(255,0,0,0.85), inset 0 0 8px rgba(120,0,0,0.9)",
                }}
              />
              <span
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: "22%",
                  height: "70%",
                  background:
                    "radial-gradient(circle at 40% 35%, #ff4a4a 0%, #b30000 45%, #4a0000 80%, #1a0000 100%)",
                  boxShadow:
                    "0 0 8px rgba(255,0,0,0.95), inset 0 0 6px rgba(0,0,0,0.9)",
                }}
              >
                <span
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"
                  style={{ width: "50%", height: "80%" }}
                />
              </span>
            </motion.span>
          )}
        </h1>

        <p
          className={`
            mt-3 max-w-xl text-xs leading-6 sm:text-sm
            text-gray-500 dark:text-gray-500
            ${isHorror ? "about-horror-text-soft" : ""}
            ${isLove ? "about-love-text-soft" : ""}
          `}
        >
          A quick look at what I built and learned during my internship.
        </p>
      </motion.div>

      {/* =========================================
          MAIN TWO COLUMN LAYOUT
      ========================================= */}
      <div
        className="
          relative z-10 mx-auto grid max-w-[1450px] items-start gap-10
          lg:grid-cols-[500px_minmax(0,1fr)]
          xl:grid-cols-[560px_minmax(0,1fr)]
        "
      >
        {/* =========== LEFT — PHOTO =========== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeUp}
          className="lg:sticky lg:top-28"
        >
          <div
            className="relative perspective-[1400px]"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* ============ LOVE HEART POP ============ */}
            {isLove && isHoveringImg && (
              <>
                {[...Array(6)].map((_, i) => {
                  const angle = (i / 6) * 360;
                  const dx = Math.cos((angle * Math.PI) / 180) * 90;
                  const dy = Math.sin((angle * Math.PI) / 180) * 90;
                  return (
                    <motion.div
                      key={`${heartBurstKey}-${i}`}
                      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                      animate={{
                        opacity: [0, 1, 1, 0],
                        scale: [0, 1.1, 1, 0.6],
                        x: dx,
                        y: dy,
                      }}
                      transition={{
                        duration: 1.4,
                        delay: i * 0.06,
                        ease: "easeOut",
                      }}
                      className="absolute top-1/2 left-1/2 z-40 pointer-events-none text-3xl sm:text-4xl"
                      style={{
                        filter: "drop-shadow(0 0 12px rgba(244,114,182,0.95))",
                      }}
                    >
                      {["❤️", "💗", "💕", "💖", "💘", "💝"][i]}
                    </motion.div>
                  );
                })}
              </>
            )}

            {/* 3D BACK RING */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className={`
                pointer-events-none absolute left-1/2 top-1/2 h-[88%] w-[82%]
                -translate-x-1/2 -translate-y-1/2 rounded-[45%] border
                border-cyan-400/25 dark:border-cyan-400/20
                love:border-pink-400/50
                horror:border-red-600/60
              `}
              style={
                isHorror
                  ? { animation: "aboutHorrorRing 3.5s ease-in-out infinite" }
                  : undefined
              }
            />

            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className={`
                pointer-events-none absolute left-1/2 top-1/2 h-[96%] w-[68%]
                -translate-x-1/2 -translate-y-1/2 rounded-[50%] border
                border-blue-400/20 dark:border-blue-400/10
                love:border-rose-400/40
                horror:border-red-800/50
              `}
            />

            {/* PHOTO GLOW */}
            <motion.div
              animate={{
                opacity: [0.25, 0.5, 0.25],
                scale: [0.95, 1.05, 0.95],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className={`
                absolute inset-10 rounded-[40px] blur-[65px]
                bg-cyan-400/20 dark:bg-cyan-400/15
                love:bg-pink-500/40
                horror:bg-red-800/60
              `}
            />

            {/* ============ 3D PHOTO ============ */}
            <motion.div
              style={{
                rotateX: isHoveringImg ? rotateX : 0,
                rotateY: isHoveringImg ? rotateY : 0,
                transformStyle: "preserve-3d",
              }}
              animate={{ y: [0, -8, 0] }}
              transition={{
                y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
              }}
              className="relative z-10 w-full"
            >
              {/* Depth */}
              <div
                className={`
                  absolute inset-0 translate-x-4 translate-y-5 rounded-4xl border
                  border-cyan-400/10 bg-cyan-400/4 dark:bg-cyan-400/2.5
                  love:border-pink-400/30 love:bg-pink-400/10
                  horror:border-red-700/50 horror:bg-red-900/25
                `}
                style={{ transform: "translateZ(-40px)" }}
              />

              {/* Wall shadow */}
              <div
                className="
                  absolute inset-0 rounded-4xl bg-black/10 dark:bg-black/40 blur-2xl
                "
                style={{
                  transform: "translateX(-24px) translateZ(-60px)",
                  opacity: 0.6,
                }}
              />

              {/* ============= HORROR HOVER EXTRAS ============= */}
              {isHorror && isHoveringImg && (
                <>
                  {/* Blood splatters across the frame */}
                  {horrorSplatters.map((s, i) => (
                    <div
                      key={`splat-${i}`}
                      className="absolute pointer-events-none z-35 rounded-full"
                      style={{
                        top: s.top,
                        left: s.left,
                        width: s.size,
                        height: s.size,
                        background:
                          "radial-gradient(circle, rgba(200,0,0,0.85) 0%, rgba(120,0,0,0.55) 35%, rgba(60,0,0,0.15) 60%, transparent 75%)",
                        filter: "blur(1px)",
                        animation: `aboutSplatter 2.4s ease-in-out ${s.delay}s infinite`,
                        mixBlendMode: "multiply",
                      }}
                    />
                  ))}

                  {/* Static noise layer */}
                  <div
                    className="absolute inset-0 rounded-4xl pointer-events-none z-36 about-horror-static opacity-40"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.65'/></svg>\")",
                      mixBlendMode: "overlay",
                    }}
                  />
                </>
              )}

              {/* Frame */}
              <motion.div
                animate={{ scale: isHoveringImg && !isHorror ? 1.015 : 1 }}
                transition={{ duration: 0.4 }}
                className={`
                  relative overflow-hidden rounded-4xl border p-2 shadow-2xl backdrop-blur-md
                  border-cyan-400/20 bg-white/40
                  dark:border-cyan-400/10 dark:bg-white/5
                  dark:shadow-[0_35px_100px_rgba(0,0,0,0.7)]
                  love:border-pink-400/70 love:bg-pink-50/40
                  love:shadow-[0_0_40px_rgba(244,114,182,0.55)]
                  horror:border-red-500/80 horror:bg-black/50
                  horror:shadow-[0_0_40px_rgba(255,20,20,0.85)]
                `}
                style={{
                  transformStyle: "preserve-3d",
                  animation: isHorror
                    ? "aboutHorrorPulse 3s ease-in-out infinite"
                    : isLove
                    ? "aboutLovePulse 3s ease-in-out infinite"
                    : undefined,
                }}
              >
                <div
                  className="relative overflow-hidden rounded-[25px]"
                  style={{ transform: "translateZ(30px)" }}
                >
                  {/* Horror — RGB tear ghosts behind the image */}
                  {isHorror && isHoveringImg && (
                    <>
                      <img
                        src="https://res.cloudinary.com/dzrvibnxs/image/upload/v1789411883/a97c9fbb-b286-4464-8a62-89ad1a38adaf_clbkqy.png"
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover rounded-[25px] z-5 about-horror-rgb-red"
                        style={{
                          filter:
                            "saturate(0) brightness(0.6) sepia(1) hue-rotate(-50deg) saturate(6)",
                        }}
                      />
                      <img
                        src="https://res.cloudinary.com/dzrvibnxs/image/upload/v1789411883/a97c9fbb-b286-4464-8a62-89ad1a38adaf_clbkqy.png"
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover rounded-[25px] z-5 about-horror-rgb-cyan"
                        style={{
                          filter:
                            "saturate(0) brightness(0.6) sepia(1) hue-rotate(160deg) saturate(6)",
                        }}
                      />
                    </>
                  )}

                  <motion.img
                    src="https://res.cloudinary.com/dzrvibnxs/image/upload/v1789411883/a97c9fbb-b286-4464-8a62-89ad1a38adaf_clbkqy.png"
                    alt="Kushagra Chhabra"
                    className={`
                      relative z-10 block aspect-4/5 w-full rounded-[25px]
                      object-cover object-center shadow-2xl
                      ${isHorror && isHoveringImg ? "about-horror-img-glitch" : ""}
                    `}
                    animate={{ scale: isHoveringImg && !isHorror ? 1.03 : 1 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      filter: isHorror
                        ? isHoveringImg
                          ? undefined
                          : "brightness(1.15) contrast(1.1) saturate(1.05)"
                        : isLove
                        ? "brightness(1.08) contrast(1.05) saturate(1.1)"
                        : undefined,
                    }}
                  />

                  {/* Horror hover — death vignette + blood stain from below */}
                  {isHorror && isHoveringImg && (
                    <>
                      <div
                        className="pointer-events-none absolute inset-0 rounded-[25px] z-20"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(60,0,0,0.95) 0%, rgba(140,0,0,0.55) 25%, rgba(80,0,0,0.25) 45%, transparent 65%)",
                          mixBlendMode: "multiply",
                          animation:
                            "aboutDeathVignette 2.6s ease-in-out infinite",
                        }}
                      />
                      <div
                        className="pointer-events-none absolute inset-0 rounded-[25px] z-20"
                        style={{
                          background:
                            "radial-gradient(120% 100% at 50% 50%, transparent 30%, rgba(0,0,0,0.85) 85%, rgba(0,0,0,1) 100%)",
                          mixBlendMode: "multiply",
                        }}
                      />
                    </>
                  )}

                  {/* Shiny sweep (horror/love) */}
                  {(isHorror || isLove) && (
                    <div className="pointer-events-none absolute inset-0 rounded-[25px] overflow-hidden z-20">
                      <div
                        className="about-shiny-sweep absolute top-0 left-0 h-full w-1/3 bg-linear-to-r from-transparent via-white/60 to-transparent"
                        style={{ mixBlendMode: "overlay" }}
                      />
                    </div>
                  )}

                  {/* Cursor glare — off during horror hover */}
                  <motion.div
                    className="pointer-events-none absolute inset-0 z-20 rounded-[25px]"
                    style={{ background: glareBg }}
                    animate={{ opacity: isHoveringImg && !isHorror ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Bottom fade */}
                  <div
                    className="
                      pointer-events-none absolute inset-x-0 bottom-0 z-20 h-1/3
                      bg-linear-to-t from-black/45 to-transparent
                      dark:from-black/60
                      horror:from-black/80
                    "
                  />

                  {/* ==================================
                      HORROR — THE EYE IN THE DARK
                  ================================== */}
                  {isHorror && isHoveringImg && (
                    <motion.div
                      className="absolute pointer-events-none z-45"
                      style={{
                        top: "16%",
                        right: "12%",
                        width: "clamp(60px, 14%, 110px)",
                        height: "clamp(30px, 7%, 55px)",
                      }}
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={{
                        opacity: [0, 0, 0.95, 0.85, 0.95, 0],
                        scale: [0.4, 0.4, 1, 0.97, 1, 0.85],
                      }}
                      transition={{
                        duration: 4.5,
                        times: [0, 0.15, 0.28, 0.55, 0.85, 1],
                        repeat: Infinity,
                        repeatDelay: 1.2,
                      }}
                    >
                      <div className="about-horror-eye relative w-full h-full">
                        <div
                          className="absolute inset-0 rounded-full"
                          style={{
                            background:
                              "radial-gradient(ellipse at center, #f2e2c8 0%, #d8b8a0 45%, #6b1010 85%, #1a0000 100%)",
                            boxShadow:
                              "0 0 18px rgba(255,0,0,0.85), inset 0 0 12px rgba(120,0,0,0.9)",
                          }}
                        />
                        <div
                          className="absolute inset-0 rounded-full"
                          style={{
                            background:
                              "radial-gradient(circle at 22% 30%, rgba(160,0,0,0.9) 0%, transparent 12%), radial-gradient(circle at 78% 68%, rgba(180,0,0,0.85) 0%, transparent 10%), radial-gradient(circle at 40% 78%, rgba(200,0,0,0.8) 0%, transparent 8%), radial-gradient(circle at 65% 22%, rgba(150,0,0,0.85) 0%, transparent 9%)",
                            mixBlendMode: "multiply",
                          }}
                        />
                        <div
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                          style={{
                            width: "44%",
                            height: "70%",
                            background:
                              "radial-gradient(circle at 40% 35%, #ff4a4a 0%, #b30000 45%, #4a0000 80%, #1a0000 100%)",
                            boxShadow:
                              "0 0 12px rgba(255,0,0,0.95), inset 0 0 8px rgba(0,0,0,0.9)",
                          }}
                        >
                          <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"
                            style={{ width: "42%", height: "78%" }}
                          />
                          <div
                            className="absolute rounded-full bg-white/80"
                            style={{
                              width: "18%",
                              height: "22%",
                              top: "18%",
                              left: "22%",
                              filter: "blur(0.5px)",
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ==================================
                      HORROR — CLAWED HAND RISING
                  ================================== */}
                  {isHorror && isHoveringImg && (
                    <div
                      className="absolute inset-x-0 bottom-0 pointer-events-none z-44 h-1/3 overflow-hidden"
                      style={{ borderRadius: "0 0 25px 25px" }}
                    >
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(20,0,0,0.9) 40%, transparent 100%)",
                          animation:
                            "aboutClawReach 3.6s ease-in-out 0.4s infinite",
                        }}
                      >
                        <svg
                          viewBox="0 0 400 120"
                          preserveAspectRatio="none"
                          className="w-full h-full opacity-90"
                        >
                          <defs>
                            <linearGradient
                              id="aboutClawGrad"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop offset="0%" stopColor="#000" />
                              <stop offset="100%" stopColor="#2a0000" />
                            </linearGradient>
                          </defs>
                          {[40, 110, 180, 250, 320, 370].map((x, i) => (
                            <path
                              key={i}
                              d={`M${x} 120 L${x - 8} ${
                                40 + (i % 3) * 12
                              } L${x - 3} ${18 + (i % 2) * 10} L${x + 2} ${
                                34 + (i % 3) * 8
                              } L${x + 8} ${16 + (i % 2) * 12} L${x + 12} 120 Z`}
                              fill="url(#aboutClawGrad)"
                            />
                          ))}
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* ==================================
                      HORROR — WHISPERS
                  ================================== */}
                  {isHorror && isHoveringImg && (
                    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden rounded-[25px]">
                      {horrorWhispers.map((w, i) => (
                        <span
                          key={i}
                          className="absolute font-bold whitespace-nowrap"
                          style={{
                            top: w.top,
                            left: w.left,
                            fontFamily: "'Creepster', 'Nosifer', cursive",
                            fontSize: "clamp(0.85rem, 1.6vw, 1.35rem)",
                            letterSpacing: "0.08em",
                            color: "#ff1a1a",
                            textShadow:
                              "0 0 6px #ff0000, 0 0 14px #b30000, 0 0 26px #4a0000, 0 2px 3px #000",
                            animation: `aboutWhisper ${w.duration}s ease-in-out ${w.delay}s infinite`,
                            transform: `translate(-50%, -50%) rotate(${w.rotation}deg)`,
                            opacity: 0,
                          }}
                        >
                          {w.text}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* ==================================
                    HORROR — BLOOD DRIPPING FROM FRAME
                ================================== */}
                {isHorror && isHoveringImg && (
                  <div
                    className="absolute left-0 right-0 pointer-events-none z-38 overflow-visible"
                    style={{ top: "calc(100% - 14px)" }}
                  >
                    {horrorBloodDrips.map((d, i) => (
                      <span
                        key={`drip-${i}`}
                        className="absolute top-0 rounded-b-full"
                        style={{
                          left: d.left,
                          width: d.width,
                          height: d.height,
                          background:
                            "linear-gradient(180deg, rgba(180,0,0,0.95) 0%, #b80000 40%, #ff0000 100%)",
                          boxShadow:
                            "0 0 8px rgba(255,0,0,0.95), 0 0 18px rgba(180,0,0,0.7)",
                          animation: `aboutBloodDripFall ${d.duration}s ease-in ${d.delay}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>

            {/* COMPLETED BADGE */}
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className={`
                absolute -bottom-4 right-3 z-30 rounded-xl border px-4 py-2.5 shadow-xl backdrop-blur-xl
                border-cyan-400/20 bg-white/90
                dark:border-white/10 dark:bg-[#07111f]/95
                love:border-pink-400/60 love:bg-pink-50/95
                horror:border-red-600/80 horror:bg-black/95 about-horror-badge
              `}
            >
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span
                    className={`
                      absolute inline-flex h-full w-full animate-ping rounded-full opacity-70
                      bg-cyan-500
                      love:bg-pink-500
                      horror:bg-red-500
                    `}
                  />
                  <span
                    className={`
                      relative inline-flex h-2 w-2 rounded-full
                      bg-cyan-500
                      love:bg-pink-500
                      horror:bg-red-500
                    `}
                  />
                </span>
                <div>
                  <p
                    className={`
                      text-[10px] font-semibold
                      text-gray-800 dark:text-white
                      love:text-pink-900
                      horror:text-red-100
                      ${isHorror ? "about-horror-text-soft" : ""}
                      ${isLove ? "about-love-text-soft" : ""}
                    `}
                  >
                    Internship Completed
                  </p>
                  <p
                    className={`
                      text-[9px]
                      text-gray-500 dark:text-gray-500
                      love:text-pink-700
                      horror:text-red-300
                    `}
                  >
                    10 July 2026
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* =========== ABOUT ME =========== */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-10"
          >
            <div className="mb-2 flex items-center gap-2">
              <span
                className={`
                  h-px w-6
                  bg-cyan-500 dark:bg-cyan-400
                  love:bg-pink-500
                  horror:bg-red-600
                `}
              />
              <h2
                className={`
                  text-[10px] font-semibold uppercase tracking-[0.25em]
                  text-cyan-600 dark:text-cyan-400
                  love:text-pink-700
                  horror:text-red-400
                  ${isHorror ? "about-horror-text-soft" : ""}
                  ${isLove ? "about-love-text-soft" : ""}
                `}
              >
                About Me
              </h2>
            </div>
            <p
              className={`
                max-w-md text-xs leading-5
                text-gray-600 dark:text-gray-500
                ${isHorror ? "about-horror-text-soft" : ""}
                ${isLove ? "about-love-text-soft" : ""}
              `}
            >
              MERN-stack developer who enjoys turning ideas into clean,
              interactive and user-focused web experiences.
            </p>
          </motion.div>
        </motion.div>

        {/* =========== RIGHT — EXPERIENCE =========== */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="min-w-0"
        >
          {/* INTERNSHIP */}
          <motion.div variants={itemAnimation}>
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <span
                className={`
                  rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider
                  border-cyan-400/30 bg-cyan-400/10
                  text-cyan-600
                  dark:border-cyan-400/20 dark:text-cyan-300
                  love:border-pink-400/60 love:bg-pink-500/15 love:text-pink-800
                  horror:border-red-600/80 horror:bg-red-900/50 horror:text-red-200
                  horror:shadow-[0_0_16px_rgba(255,20,20,0.6)]
                  ${isHorror ? "about-horror-text-soft" : ""}
                  ${isLove ? "about-love-text-soft" : ""}
                `}
              >
                Internship
              </span>
              <span
                className={`
                  text-[10px]
                  text-gray-500 dark:text-gray-600
                  love:text-pink-700
                  horror:text-red-300
                `}
              >
                10/07/2026 — Completed
              </span>
            </div>

            <h2
              className={`
                text-2xl font-bold tracking-tight sm:text-3xl
                text-gray-900 dark:text-white
                ${isHorror ? "about-horror-text about-horror-flicker" : ""}
                ${isLove ? "about-love-text" : ""}
              `}
            >
              YouTube Clone Development
            </h2>

            <p
              className={`
                mt-3 max-w-3xl text-xs leading-6 sm:text-sm
                text-gray-600 dark:text-gray-500
                ${isHorror ? "about-horror-text-soft" : ""}
                ${isLove ? "about-love-text-soft" : ""}
              `}
            >
              Developed a full-stack YouTube-style platform with advanced
              comments, video downloads, premium subscriptions, payments,
              authentication, gesture controls and real-time video
              communication.
            </p>
          </motion.div>

          {/* LINKS */}
          <motion.div variants={itemAnimation} className="mt-5 flex flex-wrap gap-2">
            <a
              href="https://youtube-clone-internship-fm9z.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                rounded-lg border px-3 py-2 text-[10px] font-semibold transition-all duration-300
                border-cyan-400/30 bg-cyan-400/10 text-cyan-600 hover:bg-cyan-400/20
                dark:text-cyan-300
                love:border-pink-400/60 love:bg-pink-500/20 love:text-pink-100 love:hover:bg-pink-500/35
                horror:border-red-600/80 horror:bg-red-900/50 horror:text-red-100 horror:hover:bg-red-800/70
                ${isHorror ? "about-horror-text-soft about-horror-link" : ""}
                ${isLove ? "about-love-text-soft" : ""}
              `}
            >
              Live Demo ↗
            </a>

            <a
              href="https://github.com/Kushagra-369/youtube-clone-internship"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                rounded-lg border px-3 py-2 text-[10px] font-semibold transition-all duration-300
                border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100
                dark:border-white/10 dark:bg-white/3 dark:text-gray-400 dark:hover:bg-white/6 dark:hover:text-white
                love:border-pink-400/60 love:bg-pink-500/15 love:text-pink-800 love:hover:bg-pink-500/25
                horror:border-red-700/70 horror:bg-red-950/50 horror:text-red-200 horror:hover:bg-red-900/60
                ${isHorror ? "about-horror-text-soft about-horror-link" : ""}
                ${isLove ? "about-love-text-soft" : ""}
              `}
            >
              GitHub ↗
            </a>

            <a
              href="https://res.cloudinary.com/dzrvibnxs/image/upload/v1789414970/elevanceskills-Full-Stack-Web-Development-Training-Certificate_1_wlm21a.png"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                rounded-lg border px-3 py-2 text-[10px] font-semibold transition-all duration-300
                border-gray-200 bg-gray-50 text-gray-600
                hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-700
                dark:border-white/10 dark:bg-white/3 dark:text-gray-400
                dark:hover:border-cyan-400/20 dark:hover:bg-cyan-400/6 dark:hover:text-cyan-300
                love:border-pink-400/60 love:bg-pink-500/15 love:text-pink-800 love:hover:bg-pink-500/25
                horror:border-red-700/70 horror:bg-red-950/50 horror:text-red-200 horror:hover:bg-red-900/60
                ${isHorror ? "about-horror-text-soft about-horror-link" : ""}
                ${isLove ? "about-love-text-soft" : ""}
              `}
            >
              Training Certificate ↗
            </a>

            <a
              href="https://res.cloudinary.com/dzrvibnxs/image/upload/v1789414998/elevanceskills-Full-Stack-Web-Development-Internship-Certificate_ondoml.png"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                rounded-lg border px-3 py-2 text-[10px] font-semibold transition-all duration-300
                border-gray-200 bg-gray-50 text-gray-600
                hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-700
                dark:border-white/10 dark:bg-white/3 dark:text-gray-400
                dark:hover:border-cyan-400/20 dark:hover:bg-cyan-400/6 dark:hover:text-cyan-300
                love:border-pink-400/60 love:bg-pink-500/15 love:text-pink-800 love:hover:bg-pink-500/25
                horror:border-red-700/70 horror:bg-red-950/50 horror:text-red-200 horror:hover:bg-red-900/60
                ${isHorror ? "about-horror-text-soft about-horror-link" : ""}
                ${isLove ? "about-love-text-soft" : ""}
              `}
            >
              Completion Certificate ↗
            </a>
          </motion.div>

          {/* 4 PROJECT SCREENSHOTS */}
          <motion.div variants={itemAnimation} className="mt-6 grid grid-cols-2 gap-3">
            {[
              "https://res.cloudinary.com/dzrvibnxs/image/upload/v1789414769/Screenshot_From_2026-09-15_01-06-57_dt9xhc.png",
              "https://res.cloudinary.com/dzrvibnxs/image/upload/v1789414742/Screenshot_From_2026-09-15_01-07-09_fr75gv.png",
              "https://res.cloudinary.com/dzrvibnxs/image/upload/v1789414750/Screenshot_From_2026-09-15_01-07-44_zl3kcm.png",
              "https://res.cloudinary.com/dzrvibnxs/image/upload/v1789414759/Screenshot_From_2026-09-15_01-07-32_fmzepv.png",
            ].map((src, idx) => (
              <motion.a
                key={idx}
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: isHorror ? 0 : -4, scale: isHorror ? 1 : 1.015 }}
                transition={{ duration: 0.25 }}
                className={`
                  group overflow-hidden rounded-xl border p-1.5 shadow-sm transition-colors
                  border-gray-200 bg-white/50
                  dark:border-white/10 dark:bg-white/2.5 dark:shadow-none
                  love:border-pink-400/60 love:bg-pink-50/60
                  horror:border-red-700/80 horror:bg-black/50
                  horror:shadow-[0_0_18px_rgba(180,0,0,0.5)]
                  ${isHorror ? "about-horror-screenshot" : ""}
                `}
              >
                <div className="overflow-hidden rounded-lg relative">
                  <img
                    src={src}
                    alt={`YouTube Clone Screenshot ${idx + 1}`}
                    className="
                      block aspect-video w-full object-cover object-top
                      transition duration-500 group-hover:scale-[1.03]
                    "
                    style={
                      isHorror
                        ? {
                            filter:
                              "brightness(0.85) contrast(1.15) saturate(0.5) hue-rotate(-10deg)",
                          }
                        : undefined
                    }
                  />
                  {/* Horror — red wash over screenshots */}
                  {isHorror && (
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 100%, rgba(180,0,0,0.55) 0%, transparent 65%)",
                        mixBlendMode: "multiply",
                      }}
                    />
                  )}
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* WHAT I BUILT */}
          <motion.div variants={itemAnimation} className="mt-7">
            <div className="mb-4 flex items-center gap-3">
              <span
                className={`
                  h-px w-7
                  bg-cyan-500 dark:bg-cyan-400
                  love:bg-pink-500
                  horror:bg-red-600
                `}
              />
              <h3
                className={`
                  text-[10px] font-semibold uppercase tracking-[0.25em]
                  text-cyan-600 dark:text-cyan-400
                  love:text-pink-700
                  horror:text-red-400
                  ${isHorror ? "about-horror-text-soft" : ""}
                  ${isLove ? "about-love-text-soft" : ""}
                `}
              >
                What I Built
              </h3>
            </div>

            <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {[
                {
                  title: "Comments & Moderation",
                  desc: "Translation, reactions, city display, filtering and automatic moderation.",
                },
                {
                  title: "Downloads & Premium",
                  desc: "Video downloads, daily limits, premium access and Razorpay payments.",
                },
                {
                  title: "Subscription Plans",
                  desc: "Free, Bronze, Silver and Gold plans with watch limits and invoice emails.",
                },
                {
                  title: "Authentication & Theme",
                  desc: "Location/time based theme behaviour with state-based OTP authentication.",
                },
                {
                  title: "Gesture Video Controls",
                  desc: "Tap gestures for seeking, pause, next video, comments and website controls.",
                },
                {
                  title: "Real-Time Communication",
                  desc: "Video calls, YouTube screen sharing and local call recording.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ x: isHorror ? 6 : 4 }}
                  className="flex gap-3"
                >
                  <span
                    className={`
                      mt-1
                      text-cyan-500 dark:text-cyan-400
                      love:text-pink-500
                      horror:text-red-500
                      ${isHorror ? "horror:drop-shadow-[0_0_6px_rgba(255,0,0,0.9)]" : ""}
                    `}
                  >
                    ✦
                  </span>
                  <div>
                    <h4
                      className={`
                        text-xs font-semibold
                        text-gray-800 dark:text-gray-200
                        love:text-pink-900
                        horror:text-red-100
                        ${isHorror ? "about-horror-text-soft" : ""}
                        ${isLove ? "about-love-text-soft" : ""}
                      `}
                    >
                      {item.title}
                    </h4>
                    <p
                      className={`
                        mt-1 text-[10px] leading-5
                        text-gray-500 dark:text-gray-600
                        love:text-pink-700
                        horror:text-red-300
                        ${isHorror ? "about-horror-text-soft" : ""}
                        ${isLove ? "about-love-text-soft" : ""}
                      `}
                    >
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* FINAL TAKEAWAY */}
          <motion.div
            variants={itemAnimation}
            className={`
              mt-7 border-t pt-5
              border-gray-200 dark:border-white/[0.07]
              love:border-pink-400/40
              horror:border-red-800/70
            `}
          >
            <p
              className={`
                text-xs leading-6
                text-gray-500 dark:text-gray-500
                love:text-pink-800
                horror:text-red-200
                ${isHorror ? "about-horror-text-soft" : ""}
                ${isLove ? "about-love-text-soft" : ""}
              `}
            >
              <span
                className={`
                  font-medium
                  text-gray-700 dark:text-gray-300
                  love:text-pink-900
                  horror:text-red-100
                `}
              >
                Internship takeaway —
              </span>{" "}
              strengthened my full-stack development skills through real-world
              payments, authentication, UX interactions and real-time features.
            </p>
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
}