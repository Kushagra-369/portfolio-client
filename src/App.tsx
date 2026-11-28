import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import Navbar from "./Components/Navbar/Navbar";
import CustomCursor from "./Components/CustomCursor";
import Chatbot from "./Components/AI/Chatbot";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import VoiceAssistant from "./Components/VoiceAssistant/VoiceAssistant";
import PortfolioTour from "./Components/PortfolioTour/PortfolioTour";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useTheme } from "./Context/ThemeContext";

import Home from "./Components/Home/Home";
import Resume from "./Components/Resume/Resume";
import Login from "./Components/Contact/Login";
import OTP from "./Components/Contact/OTP";
import AdminDashboard from "./Components/Dashboard/AdminDashboard";
import Icons from "./Components/Home/Icons";
import PNF from "./Components/PNF/PageNotFound";
import Start from "./Components/Start/Start";
import BlackHoleEffect from "./Components/BlackHole/BlackHoleEffect";

const adminPath = import.meta.env.VITE_ADMIN_ROUTE;

/* =========================================================
   PARTICLE TYPES
========================================================= */

type ParticleKind =
  | "snow"
  | "heart"
  | "spider"
  | "bat"
  | "web"
  | "skull"
  | "ember"
  | "eye";

interface Particle {
  id: number;
  left: string;
  size: string;
  duration: string;
  delay: string;
  drift: string;
  opacity: number;
  kind: ParticleKind;
  emoji?: string;
}

/* =========================================================
   SNOW (LIGHT / DARK)
========================================================= */

const snowflakes: Particle[] = Array.from({ length: 65 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  size: `${Math.random() * 5 + 2}px`,
  duration: `${Math.random() * 10 + 8}s`,
  delay: `${Math.random() * -18}s`,
  drift: `${Math.random() * 140 - 70}px`,
  opacity: Math.random() * 0.55 + 0.25,
  kind: "snow",
}));

/* =========================================================
   LOVE — FALLING HEARTS
========================================================= */

const HEART_EMOJIS = ["❤️", "💗", "💕", "💖", "💘", "💝", "🩷"];

const hearts: Particle[] = Array.from({ length: 45 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  size: `${Math.random() * 16 + 12}px`,
  duration: `${Math.random() * 9 + 9}s`,
  delay: `${Math.random() * -18}s`,
  drift: `${Math.random() * 160 - 80}px`,
  opacity: Math.random() * 0.45 + 0.45,
  kind: "heart",
  emoji: HEART_EMOJIS[i % HEART_EMOJIS.length],
}));

/* =========================================================
   HORROR — SPOOKY MIXED LAYERS
   spiders, bats, webs, skulls, eyes
========================================================= */

const SPIDER_EMOJIS = ["🕷️", "🕷️", "🕸️"];
const BAT_EMOJIS = ["🦇", "🦇"];
const WEB_EMOJIS = ["🕸️"];
const SKULL_EMOJIS = ["💀", "☠️"];
const EYE_EMOJIS = ["👁️", "👁️"];

const makeHorrorGroup = (
  count: number,
  kind: ParticleKind,
  emojis: string[],
  sizeRange: [number, number],
  durationRange: [number, number],
  opacityRange: [number, number],
  driftRange: [number, number] = [140, 240]
): Particle[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0]}px`,
    duration: `${Math.random() * (durationRange[1] - durationRange[0]) + durationRange[0]
      }s`,
    delay: `${Math.random() * -20}s`,
    drift: `${Math.random() * (driftRange[1] - driftRange[0]) + driftRange[0]
      }px`,
    opacity:
      Math.random() * (opacityRange[1] - opacityRange[0]) + opacityRange[0],
    kind,
    emoji: emojis[i % emojis.length],
  }));

const spiders = makeHorrorGroup(16, "spider", SPIDER_EMOJIS, [15, 26], [16, 26], [0.65, 1]);
const bats = makeHorrorGroup(14, "bat", BAT_EMOJIS, [17, 28], [9, 15], [0.6, 0.95], [280, 500]);
const webs = makeHorrorGroup(10, "web", WEB_EMOJIS, [24, 40], [14, 20], [0.12, 0.3]);
const skulls = makeHorrorGroup(12, "skull", SKULL_EMOJIS, [15, 24], [18, 28], [0.55, 0.9]);
const eyes = makeHorrorGroup(16, "eye", EYE_EMOJIS, [13, 22], [13, 22], [0.6, 0.95]);

/* =========================================================
   FALLING PARTICLES (theme-aware)
========================================================= */

function FallingParticles() {
  const { theme } = useTheme();

  const particles: Particle[] =
    theme === "love" ? hearts : theme === "horror" ? [] : snowflakes;

  return (
    <>
      {/* ============ SNOW / HEARTS ============ */}
      {(theme === "light" || theme === "dark" || theme === "love") && (
        <div
          className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
          aria-hidden="true"
        >
          {particles.map((p) => {
            const isEmoji = p.kind !== "snow";
            return (
              <span
                key={`${p.kind}-${p.id}`}
                className={`
                  falling-particle absolute -top-5
                  ${isEmoji
                    ? "select-none flex items-center justify-center love:drop-shadow-[0_0_10px_rgba(244,114,182,0.65)]"
                    : "rounded-full bg-cyan-400/40 shadow-[0_0_8px_rgba(34,211,238,0.35)] dark:bg-[#00ff3c]/80 dark:shadow-[0_0_12px_rgba(0,255,60,0.75)]"
                  }
                `}
                style={
                  {
                    left: p.left,
                    width: isEmoji ? "auto" : p.size,
                    height: isEmoji ? "auto" : p.size,
                    fontSize: isEmoji ? p.size : undefined,
                    lineHeight: 1,
                    opacity: p.opacity,
                    animationDuration: p.duration,
                    animationDelay: p.delay,
                    "--particle-drift": p.drift,
                  } as CSSProperties
                }
              >
                {isEmoji ? p.emoji : null}
              </span>
            );
          })}
        </div>
      )}

      {/* ============ HORROR — BLOOD RED & WRETCHED ============ */}
      {theme === "horror" && (
        <>
          {/* 🩸 Blood vignette — crushes the edges, keeps the middle readable */}
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 -z-40 horror:bg-[radial-gradient(ellipse_at_center,transparent_18%,rgba(75,0,0,0.55)_58%,rgba(25,0,0,0.85)_82%,rgba(0,0,0,0.97)_100%)]"
          />

          {/* 🫀 Pulsing arterial core — slow heartbeat glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 -z-40 horror:bg-[radial-gradient(42%_32%_at_50%_55%,rgba(230,10,10,0.22)_0%,rgba(120,0,0,0.10)_45%,transparent_75%)] horror:animate-[horrorPulse_5.5s_ease-in-out_infinite]"
          />

          {/* 🕯️ Flickering darkness — the whole world breathes wrong */}
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 -z-40 bg-black opacity-[0.08] horror:animate-[horrorFlicker_9s_ease-in-out_infinite]"
          />

          {/* ⚡ Occasional blood flash — like a lightbulb full of blood */}
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 -z-40 bg-red-800 opacity-0 mix-blend-screen horror:animate-[bloodFlash_16s_ease-in-out_infinite]"
          />

          {/* 🎞️ Film grain / rot */}
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 -z-40 horror:opacity-[0.3] horror:mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.7'/></svg>\")",
            }}
          />

          {/* 🕷️ Spiders + Skulls + Eyes — slow, heavy, glowing red */}
          <div
            className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
            aria-hidden="true"
          >
            {[...spiders, ...skulls, ...eyes].map((p) => (
              <span
                key={`${p.kind}-${p.id}`}
                className="
                  falling-particle absolute -top-5 select-none
                  flex items-center justify-center
                  horror:drop-shadow-[0_0_14px_rgba(255,0,0,0.85)]
                "
                style={
                  {
                    left: p.left,
                    fontSize: p.size,
                    lineHeight: 1,
                    opacity: p.opacity,
                    animationDuration: p.duration,
                    animationDelay: p.delay,
                    "--particle-drift": p.drift,
                  } as CSSProperties
                }
              >
                {p.emoji}
              </span>
            ))}
          </div>

          {/* 🦇 Bats — screeching across the screen */}
          <div
            className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
            aria-hidden="true"
          >
            {bats.map((p, idx) => (
              <span
                key={`bat-${p.id}`}
                className="bat-fly absolute select-none horror:drop-shadow-[0_0_12px_rgba(255,0,0,0.75)]"
                style={
                  {
                    top: `${8 + (idx * 7) % 75}%`,
                    left: "-10%",
                    fontSize: p.size,
                    opacity: p.opacity,
                    animationDuration: p.duration,
                    animationDelay: p.delay,
                    "--bat-travel": p.drift,
                  } as CSSProperties
                }
              >
                {p.emoji}
              </span>
            ))}
          </div>

          {/* 🕸️ Web strands — rot in and out of existence */}
          <div
            className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
            aria-hidden="true"
          >
            {webs.map((p) => (
              <span
                key={`web-${p.id}`}
                className="web-fade absolute select-none horror:drop-shadow-[0_0_10px_rgba(255,40,40,0.45)]"
                style={
                  {
                    top: p.left,
                    left: `${(p.id * 17) % 95}%`,
                    fontSize: p.size,
                    animationDuration: p.duration,
                    animationDelay: p.delay,
                  } as CSSProperties
                }
              >
                {p.emoji}
              </span>
            ))}
          </div>

          {/* 🩸 Blood drops — falling, thick, glowing */}
          <div
            className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
            aria-hidden="true"
          >
            {Array.from({ length: 45 }).map((_, i) => (
              <span
                key={`blood-${i}`}
                className="blood-drip absolute horror:bg-linear-to-b horror:from-red-400 horror:via-red-700 horror:to-red-950 horror:shadow-[0_0_12px_rgba(255,0,0,0.9)]"
                style={
                  {
                    left: `${Math.random() * 100}%`,
                    top: "-6%",
                    width: `${Math.random() * 2.5 + 2}px`,
                    height: `${Math.random() * 16 + 10}px`,
                    borderRadius: "9999px",
                    opacity: Math.random() * 0.55 + 0.4,
                    animationDuration: `${Math.random() * 4 + 4.5}s`,
                    animationDelay: `${Math.random() * -10}s`,
                    "--particle-drift": `${Math.random() * 90 - 45}px`,
                  } as CSSProperties
                }
              />
            ))}
          </div>

          {/* 🔥 Embers — dying, ember-red, rising from below */}
          <div
            className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
            aria-hidden="true"
          >
            {Array.from({ length: 30 }).map((_, i) => (
              <span
                key={`ember-${i}`}
                className="ember-rise absolute rounded-full horror:bg-red-500/70 horror:shadow-[0_0_16px_rgba(255,30,0,0.95)]"
                style={
                  {
                    left: `${Math.random() * 100}%`,
                    bottom: "-5%",
                    width: `${Math.random() * 4 + 2}px`,
                    height: `${Math.random() * 4 + 2}px`,
                    opacity: Math.random() * 0.6 + 0.4,
                    animationDuration: `${Math.random() * 8 + 8}s`,
                    animationDelay: `${Math.random() * -12}s`,
                    "--particle-drift": `${Math.random() * 120 - 60}px`,
                  } as CSSProperties
                }
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

/* =========================================================
   SPARSE COSMIC ACCENTS
   A few decorative objects placed in the page margins.
   They intentionally stay away from the central content.
========================================================= */

function CosmicAccents() {
  const { theme } = useTheme();

  return (
    <div
      className={`cosmic-accents cosmic-${theme}`}
      aria-hidden="true"
    >
      <div className="cosmic-starfield" />

      <div className="cosmic-object cosmic-ringed-planet">
        <span className="cosmic-planet-body" />
        <span className="cosmic-planet-ring" />
      </div>

      <div className="cosmic-object cosmic-moon">
        <span className="cosmic-moon-crater crater-one" />
        <span className="cosmic-moon-crater crater-two" />
      </div>

      <div className="cosmic-object cosmic-mini-planet">
        <span className="cosmic-mini-glow" />
      </div>

      <span className="cosmic-star star-one" />
      <span className="cosmic-star star-two" />
      <span className="cosmic-star star-three" />
      <span className="cosmic-star star-four" />
    </div>
  );
}

/* =========================================================
   APP CONTENT
========================================================= */

function AppContent() {
  const location = useLocation();

  const [entered, setEntered] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("portfolio-main-visibility", {
        detail: { visible: entered || location.pathname !== "/" },
      })
    );
  }, [entered, location.pathname]);


  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;
      setShowScrollTop(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hideNavbarRoutes = ["/admin/dashboard"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  const showThemeEffects = entered || location.pathname !== "/";

  if (!entered && location.pathname === "/") {
    return (
      <>
        {showThemeEffects && <CosmicAccents />}
        {showThemeEffects && <FallingParticles />}
        {!shouldHideNavbar && entered && <Navbar />}

        <AnimatePresence mode="wait">
          {!entered && location.pathname === "/" ? (
            <motion.div
              key="start-page"
              initial={{ rotateY: 0, opacity: 1 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{
                rotateY: -180,
                opacity: 0,
                transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] },
              }}
              style={{
                transformStyle: "preserve-3d",
                perspective: 2000,
                transformOrigin: "left center",
              }}
              className="w-full h-screen relative z-10"
            >
              <Start
                onStart={() => {
                  setEntered(true);
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="main-home"
              initial={{ rotateY: 180, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
              style={{
                transformStyle: "preserve-3d",
                perspective: 2000,
                transformOrigin: "right center",
              }}
            >
              <div className="pt-28 min-h-screen relative z-10">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/resume" element={<Resume />} />
                  <Route path={`/${adminPath}`} element={<Login />} />
                  <Route path="/otp" element={<OTP />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/icons" element={<Icons />} />
                  <Route path="*" element={<PNF />} />
                </Routes>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {showScrollTop && entered && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="
              fixed bottom-6 right-6 z-99999 flex h-14 w-14 items-center justify-center
              rounded-full bg-sky-500 dark:bg-[#00ff3c] love:bg-pink-500
              horror:bg-red-700 horror:text-red-50
              text-white shadow-2xl dark:shadow-[0_0_28px_rgba(0,255,60,0.55)] love:shadow-pink-500/50
              horror:shadow-[0_0_30px_rgba(255,0,0,0.85)]
              transition-all duration-300 hover:scale-110
            "
          >
            <ChevronUp size={28} />
          </button>
        )}
      </>
    );
  }

  return (
    <>
      {showThemeEffects && <CosmicAccents />}
      {showThemeEffects && <FallingParticles />}
      {!shouldHideNavbar && <Navbar />}

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ rotateY: 90, x: "100vw", opacity: 0 }}
          animate={{ rotateY: 0, x: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          style={{ transformStyle: "preserve-3d", perspective: 2000 }}
        >
          <div className="pt-28 min-h-screen relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/resume" element={<Resume />} />
              <Route path={`/${adminPath}`} element={<Login />} />
              <Route path="/otp" element={<OTP />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/icons" element={<Icons />} />
              <Route path="*" element={<PNF />} />
            </Routes>
          </div>
        </motion.div>
      </AnimatePresence>

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="
            fixed bottom-6 right-6 z-99999 flex h-14 w-14 items-center justify-center
            rounded-full bg-sky-500 dark:bg-[#00ff3c] love:bg-pink-500
            horror:bg-red-700 horror:text-red-50
            text-white shadow-2xl dark:shadow-[0_0_28px_rgba(0,255,60,0.55)] love:shadow-pink-500/50
            horror:shadow-[0_0_30px_rgba(255,0,0,0.85)]
            transition-all duration-300 hover:scale-110
          "
        >
          <ChevronUp size={28} />
        </button>
      )}
    </>
  );
}

/* =========================================================
   MAIN APP
========================================================= */

export default function App() {
  const { theme } = useTheme();
  const isHorror = theme === "horror";

  return (
    <BrowserRouter>
      <CustomCursor />

      <BlackHoleEffect>
      <div className={isHorror ? "horror-mode" : ""}>
        {/* ===================================================
            GLOBAL BACKGROUND
        =================================================== */}
        <div
          className="
            fixed inset-0 -z-50 h-full w-full
            bg-[#f7fcff]
            [background:radial-gradient(125%_125%_at_50%_10%,#ffffff_35%,#b9edff_100%)]
            dark:[background:radial-gradient(125%_125%_at_50%_10%,#010402_0%,#031008_48%,#000000_100%)]
            love:[background:radial-gradient(125%_125%_at_50%_10%,#fff3f8_0%,#ffd0e5_48%,#f472b6_100%)]
            horror:[background:radial-gradient(120%_110%_at_50%_28%,#4a0a0a_0%,#2a0404_28%,#120101_55%,#050000_80%,#000_100%)]
          "
        />

        {/* ===================================================
            WEBSITE
        =================================================== */}
        <AppContent />

        <PortfolioTour />
        <VoiceAssistant />

        <Chatbot />
      </div>
      </BlackHoleEffect>

      {/* ===================================================
          ANIMATION CSS
      =================================================== */}
      <style>
        {`
          /* ---------- SPARSE COSMIC BACKGROUND ---------- */
          .cosmic-accents {
            position: fixed;
            inset: 0;
            z-index: 0;
            overflow: hidden;
            pointer-events: none;
            isolation: isolate;
            --cosmic-glow: rgba(56, 189, 248, 0.42);
            --cosmic-core: #8bdcff;
            --cosmic-shadow: #174b70;
          }

          .cosmic-dark {
            --cosmic-glow: rgba(0, 255, 174, 0.38);
            --cosmic-core: #8fffe0;
            --cosmic-shadow: #064c3b;
          }

          .cosmic-love {
            --cosmic-glow: rgba(244, 114, 182, 0.4);
            --cosmic-core: #ffc0df;
            --cosmic-shadow: #8f3568;
          }

          .cosmic-horror {
            --cosmic-glow: rgba(239, 68, 68, 0.38);
            --cosmic-core: #ff9b9b;
            --cosmic-shadow: #641313;
          }

          .cosmic-starfield {
            position: absolute;
            inset: 0;
            opacity: 0.42;
            background-image:
              radial-gradient(1px 1px at 12% 18%, var(--cosmic-core) 98%, transparent),
              radial-gradient(1px 1px at 83% 13%, var(--cosmic-core) 98%, transparent),
              radial-gradient(1.5px 1.5px at 92% 48%, var(--cosmic-core) 98%, transparent),
              radial-gradient(1px 1px at 7% 72%, var(--cosmic-core) 98%, transparent),
              radial-gradient(1px 1px at 74% 86%, var(--cosmic-core) 98%, transparent),
              radial-gradient(1px 1px at 28% 91%, var(--cosmic-core) 98%, transparent);
          }

          .cosmic-object {
            position: absolute;
            display: block;
            filter: drop-shadow(0 0 22px var(--cosmic-glow));
            animation: cosmicDrift 12s ease-in-out infinite;
          }

          .cosmic-ringed-planet {
            top: 16%;
            right: 8.5%;
            width: clamp(64px, 7vw, 104px);
            aspect-ratio: 1;
            animation-delay: -3s;
          }

          .cosmic-planet-body {
            position: absolute;
            inset: 18%;
            border-radius: 50%;
            background:
              radial-gradient(circle at 32% 28%, rgba(255,255,255,.95), transparent 12%),
              radial-gradient(circle at 35% 30%, var(--cosmic-core), var(--cosmic-shadow) 72%);
            box-shadow:
              inset -9px -8px 16px rgba(0,0,0,.42),
              0 0 20px var(--cosmic-glow);
          }

          .cosmic-planet-ring {
            position: absolute;
            left: -12%;
            top: 37%;
            width: 124%;
            height: 30%;
            border: 2px solid color-mix(in srgb, var(--cosmic-core) 72%, transparent);
            border-radius: 50%;
            transform: rotate(-22deg);
            box-shadow: 0 0 10px var(--cosmic-glow);
          }

          .cosmic-moon {
            left: 7%;
            bottom: 15%;
            width: clamp(34px, 4vw, 58px);
            aspect-ratio: 1;
            border-radius: 50%;
            background:
              radial-gradient(circle at 28% 25%, rgba(255,255,255,.85), transparent 15%),
              radial-gradient(circle at 38% 35%, #dbeafe, #7892a8 72%, #26394b);
            box-shadow: inset -8px -7px 13px rgba(0,0,0,.45), 0 0 22px var(--cosmic-glow);
            animation-delay: -7s;
          }

          .cosmic-moon-crater {
            position: absolute;
            border-radius: 50%;
            background: rgba(20, 35, 48, .22);
            box-shadow: inset 2px 2px 4px rgba(0,0,0,.18);
          }

          .crater-one { width: 19%; height: 19%; top: 28%; left: 56%; }
          .crater-two { width: 12%; height: 12%; top: 60%; left: 30%; }

          .cosmic-mini-planet {
            right: 5.5%;
            bottom: 24%;
            width: clamp(20px, 2.2vw, 30px);
            aspect-ratio: 1;
            border-radius: 50%;
            background: radial-gradient(circle at 30% 28%, #fff, var(--cosmic-core) 28%, var(--cosmic-shadow) 82%);
            box-shadow: 0 0 18px var(--cosmic-glow);
            animation-delay: -5s;
          }

          .cosmic-star {
            position: absolute;
            width: 3px;
            height: 3px;
            border-radius: 50%;
            background: var(--cosmic-core);
            box-shadow: 0 0 9px 2px var(--cosmic-glow);
            animation: cosmicTwinkle 4s ease-in-out infinite;
          }

          .star-one { top: 29%; right: 23%; }
          .star-two { top: 67%; left: 19%; animation-delay: -1s; }
          .star-three { top: 12%; left: 31%; animation-delay: -2.4s; }
          .star-four { bottom: 12%; right: 28%; animation-delay: -3s; }

          @keyframes cosmicDrift {
            0%, 100% { transform: translate3d(0, 0, 0) rotate(-4deg); }
            50% { transform: translate3d(0, -13px, 0) rotate(4deg); }
          }

          @keyframes cosmicTwinkle {
            0%, 100% { opacity: .28; transform: scale(.8); }
            50% { opacity: .95; transform: scale(1.35); }
          }

          @media (max-width: 700px) {
            .cosmic-ringed-planet { top: 12%; right: 3%; width: 54px; }
            .cosmic-moon { left: 3%; bottom: 12%; width: 32px; }
            .cosmic-mini-planet { right: 3%; bottom: 20%; width: 18px; }
            .star-three, .star-four { display: none; }
          }

          @media (prefers-reduced-motion: reduce) {
            .cosmic-object, .cosmic-star { animation: none; }
          }

          /* ---------- SNOW / HEARTS / SPIDERS / SKULLS / EYES ---------- */
          .falling-particle {
            animation-name: particleFall;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            will-change: transform;
          }

          @keyframes particleFall {
            0%   { transform: translate3d(0, -30px, 0) rotate(0deg); }
            25%  { transform: translate3d(calc(var(--particle-drift) * 0.25), 25vh, 0) rotate(90deg); }
            50%  { transform: translate3d(calc(var(--particle-drift) * -0.35), 50vh, 0) rotate(180deg); }
            75%  { transform: translate3d(calc(var(--particle-drift) * 0.55), 75vh, 0) rotate(270deg); }
            100% { transform: translate3d(var(--particle-drift), 115vh, 0) rotate(360deg); }
          }

          /* ---------- BATS (fly across) ---------- */
          .bat-fly {
            animation-name: batFly;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            will-change: transform;
          }

          @keyframes batFly {
            0%   { transform: translate3d(0, 0, 0) scaleX(1) rotate(0deg); opacity: 0; }
            10%  { opacity: 0.95; }
            50%  { transform: translate3d(calc(var(--bat-travel) * 0.5), -25px, 0) scaleX(1) rotate(-6deg); }
            90%  { opacity: 0.95; }
            100% { transform: translate3d(var(--bat-travel), 25px, 0) scaleX(1) rotate(6deg); opacity: 0; }
          }

          /* ---------- WEB STRANDS (appear / disappear) ---------- */
          .web-fade {
            animation-name: webFade;
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
            will-change: opacity, transform;
          }

          @keyframes webFade {
            0%, 100% { opacity: 0; transform: scale(0.85) rotate(-4deg); }
            50%      { opacity: 0.4; transform: scale(1) rotate(4deg); }
          }

          /* ---------- BLOOD DROPS (fall fast, stretch) ---------- */
          .blood-drip {
            animation-name: bloodDrip;
            animation-timing-function: cubic-bezier(0.4, 0.05, 0.85, 0.4);
            animation-iteration-count: infinite;
            will-change: transform, opacity;
          }

          @keyframes bloodDrip {
            0%   { transform: translate3d(0, -10vh, 0) scaleY(0.5); opacity: 0; }
            6%   { opacity: 0.95; }
            100% { transform: translate3d(var(--particle-drift), 118vh, 0) scaleY(1.7); opacity: 0.85; }
          }

          /* ---------- EMBERS / ASH (rise) ---------- */
          .ember-rise {
            animation-name: emberRise;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            will-change: transform, opacity;
          }

          @keyframes emberRise {
            0%   { transform: translate3d(0, 0, 0) scale(1); opacity: 0; }
            10%  { opacity: 0.9; }
            100% { transform: translate3d(var(--particle-drift), -110vh, 0) scale(0.4); opacity: 0; }
          }

          /* ---------- HORROR CENTER PULSE (heartbeat) ---------- */
          @keyframes horrorPulse {
            0%, 100% { opacity: 0.5;  transform: scale(1); }
            18%      { opacity: 1;    transform: scale(1.06); }
            30%      { opacity: 0.55; transform: scale(1); }
            45%      { opacity: 0.85; transform: scale(1.03); }
            60%      { opacity: 0.5;  transform: scale(1); }
          }

          /* ---------- HORROR FLICKER (bad bulb) ---------- */
          @keyframes horrorFlicker {
            0%, 100% { opacity: 0.07; }
            6%       { opacity: 0.17; }
            7%       { opacity: 0.03; }
            8%       { opacity: 0.19; }
            9%       { opacity: 0.05; }
            35%      { opacity: 0.09; }
            36%      { opacity: 0.02; }
            37%      { opacity: 0.15; }
            62%      { opacity: 0.06; }
            63%      { opacity: 0.18; }
            64%      { opacity: 0.04; }
            86%      { opacity: 0.11; }
          }

          /* ---------- BLOOD FLASH (rare, violent) ---------- */
          @keyframes bloodFlash {
            0%, 88%, 100% { opacity: 0; }
            89%           { opacity: 0.30; }
            90%           { opacity: 0.04; }
            91%           { opacity: 0.24; }
            92%           { opacity: 0; }
          }

          /* ---------- HORROR TEXT: never lost, always bleeding ---------- */
          .horror-mode h1,
          .horror-mode h2,
          .horror-mode h3,
          .horror-mode h4,
          .horror-mode h5,
          .horror-mode h6,
          .horror-mode p,
          .horror-mode a,
          .horror-mode li,
          .horror-mode button,
          .horror-mode span,
          .horror-mode strong,
          .horror-mode em,
          .horror-mode label {
            text-shadow:
              0 2px 6px rgba(0, 0, 0, 0.95),
              0 1px 2px rgba(0, 0, 0, 1),
              0 0 18px rgba(200, 0, 0, 0.45);
          }

          .horror-mode h1,
          .horror-mode h2 {
            text-shadow:
              0 3px 8px rgba(0, 0, 0, 1),
              0 0 28px rgba(255, 0, 0, 0.6);
          }

          @media (prefers-reduced-motion: reduce) {
            .falling-particle,
            .bat-fly,
            .web-fade,
            .ember-rise,
            .blood-drip {
              animation-duration: 20s;
            }
          }
        `}
      </style>
    </BrowserRouter>
  );
}