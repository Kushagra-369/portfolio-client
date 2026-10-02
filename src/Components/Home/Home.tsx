import { useState, useEffect, useRef, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
  useMotionTemplate,
  useAnimationFrame,
} from "framer-motion";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { APIURL } from "../../GlobalAPIURL";
import { useTheme } from "../../Context/ThemeContext";
import {
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiExpress,
  SiNodedotjs,
  SiNextdotjs,
  SiMongodb,
  SiTypescript,
  SiGit,
  SiFigma,
  SiMui,
} from "react-icons/si";
import { Download, Mail, Sparkles, ArrowRight, Star } from "lucide-react";
import About from "../About/About";
import Skills from "../Skills/Skills";
import Project from "../Projects/Project";
import Signup from "../Contact/Signup";
import Footer from "../Footer/Footer";

interface Skill {
  name: string;
  icon: React.ReactNode;
  gradient: string;
}

interface WorkItem {
  title: string;
  desc: string;
  icon: string;
  color: string;
}

/* =========================================================
   HORROR HOVER — whisper texts that surface when cursed
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
];

export default function Home() {
  const location = useLocation();
  const { theme } = useTheme();
  const isLove = theme === "love";
  const isHorror = theme === "horror";

  const [adminName, setAdminName] = useState<string>("Kushagra Chhabra");
  const [profileImg, setProfileImg] = useState<string>(
    "https://res.cloudinary.com/dynodadq0/image/upload/v1761790870/unnamed_adxxjm.jpg"
  );
  const [isHoveringImg, setIsHoveringImg] = useState<boolean>(false);
  const [heartBurstKey, setHeartBurstKey] = useState<number>(0);

  const cardRef = useRef<HTMLDivElement | null>(null);
  const mouseX = useMotionValue<number>(0);
  const mouseY = useMotionValue<number>(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 200,
    damping: 20,
  });

  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.25), transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHoveringImg(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleMouseEnterImg = () => {
    setIsHoveringImg(true);
    if (isLove || isHorror) setHeartBurstKey((k) => k + 1);
  };

  /* Random whispers + blood drip positions, regenerated on each horror hover */
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
      Array.from({ length: 11 }, (_, i) => ({
        left: `${6 + i * 8.5 + Math.random() * 3}%`,
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

  const rotation = useMotionValue<number>(0);
  const isDragging = useRef<boolean>(false);
  const lastX = useRef<number>(0);

  useAnimationFrame((_, delta) => {
    if (!isDragging.current) {
      rotation.set(rotation.get() + delta * 0.03);
    }
  });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastX.current;
      lastX.current = e.clientX;
      rotation.set(rotation.get() + dx * 0.4);
    };
    const onUp = () => {
      isDragging.current = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [rotation]);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axios.get(`${APIURL}/get_new_profile`);
        const admin = res.data?.adminProfiles?.[0];
        if (admin) {
          setAdminName(admin.name || "Kushagra Chhabra");
          setProfileImg(admin.profileImg?.secure_url || profileImg);
        }
      } catch {
        console.warn("⚠️ Could not load admin details — using default.");
      }
    };
    fetchAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (location.hash) {
      const section = document.getElementById(location.hash.replace("#", ""));
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  const [currentSkill, setCurrentSkill] = useState<number>(0);
  const [averageRating, setAverageRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get(`${APIURL}/get_ratings`);
        setAverageRating(response.data.averageRating);
      } catch (error) {
        console.error("❌ Error fetching ratings:", error);
      }
    };
    fetchRatings();
  }, []);

  const skills: Skill[] = [
    { name: "JavaScript", icon: <SiJavascript className="text-yellow-400 text-2xl lg:text-3xl" />, gradient: "from-yellow-400 to-amber-600" },
    { name: "TypeScript", icon: <SiTypescript className="text-blue-600 text-2xl lg:text-3xl" />, gradient: "from-blue-600 to-blue-800" },
    { name: "React", icon: <SiReact className="text-cyan-400 text-2xl lg:text-3xl" />, gradient: "from-cyan-400 to-blue-600" },
    { name: "Next.js", icon: <SiNextdotjs className="text-white text-2xl lg:text-3xl" />, gradient: "from-gray-100 to-gray-300" },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-400 text-2xl lg:text-3xl" />, gradient: "from-teal-400 to-cyan-600" },
    { name: "Node.js", icon: <SiNodedotjs className="text-green-600 text-2xl lg:text-3xl" />, gradient: "from-green-600 to-green-800" },
    { name: "Express.js", icon: <SiExpress className="text-gray-300 text-2xl lg:text-3xl" />, gradient: "from-gray-300 to-gray-500" },
    { name: "MongoDB", icon: <SiMongodb className="text-green-500 text-2xl lg:text-3xl" />, gradient: "from-green-500 to-green-700" },
    { name: "Git", icon: <SiGit className="text-orange-600 text-2xl lg:text-3xl" />, gradient: "from-orange-600 to-red-600" },
    { name: "Figma", icon: <SiFigma className="text-indigo-500 text-2xl lg:text-3xl" />, gradient: "from-indigo-500 to-blue-600" },
    { name: "Material UI", icon: <SiMui className="text-blue-500 text-2xl lg:text-3xl" />, gradient: "from-blue-500 to-blue-700" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const featuredSkills: Skill[] = skills.slice(0, 3);

  const workItems: WorkItem[] = [
    { title: "Frontend Development", desc: "Crafting responsive, dynamic UIs using React, Next.js, and Tailwind CSS.", icon: "💻", color: "from-cyan-400 to-blue-500" },
    { title: "Backend Engineering", desc: "Building scalable APIs with Node.js, Express, and MongoDB.", icon: "⚙️", color: "from-green-400 to-emerald-500" },
    { title: "Animation & UX", desc: "Enhancing user experiences using Framer Motion and creative design.", icon: "🎨", color: "from-purple-400 to-pink-500" },
  ];

  return (
    <div
      id="home"
      className="min-h-screen relative overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-20 sm:pb-28 lg:pb-32 px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-24 transition-colors duration-700"
    >
      {/* ================= THEME TEXT STYLES ================= */}
      <style>
        {`
          /* ============================================
             HORROR — bright white-hot text with red aura
          ============================================ */
          .horror-text,
          .horror-text * {
            font-family: 'Creepster', 'Nosifer', 'Eater', 'Butcherman', cursive !important;
            letter-spacing: 0.09em !important;
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

          .horror-text-soft,
          .horror-text-soft * {
            font-family: 'Creepster', 'Nosifer', cursive !important;
            color: #ffdddd !important;
            -webkit-text-fill-color: #ffdddd !important;
            text-shadow:
              0 0 6px #ff3333,
              0 0 16px #cc0000,
              0 0 32px #8b0000,
              0 2px 2px #000 !important;
          }

          @keyframes horrorFlicker {
            0%, 47%, 53%, 100% {
              text-shadow:
                0 0 4px #ffdddd,
                0 0 10px #ff3333,
                0 0 20px #ff0000,
                0 0 40px #cc0000,
                0 0 80px #8b0000,
                0 4px 2px #000;
            }
            49% {
              text-shadow:
                0 0 2px #ffaaaa,
                0 0 6px #aa0000,
                0 0 12px #550000,
                0 2px 2px #000;
            }
          }
          .horror-flicker {
            animation: horrorFlicker 4s infinite;
          }

          /* ============================================
             LOVE — DARK rose text with soft pink glow
          ============================================ */
          .love-text,
          .love-text * {
            font-family: 'Dancing Script', 'Great Vibes', cursive !important;
            letter-spacing: 0.02em !important;
            color: #7a0038 !important;
            -webkit-text-fill-color: #7a0038 !important;
            text-shadow:
              0 0 6px rgba(255, 182, 213, 0.9),
              0 0 14px rgba(244, 114, 182, 0.7),
              0 1px 0 rgba(255, 255, 255, 0.6) !important;
          }
          .love-text-soft,
          .love-text-soft * {
            font-family: 'Dancing Script', cursive !important;
            color: #8b0040 !important;
            -webkit-text-fill-color: #8b0040 !important;
            text-shadow:
              0 0 6px rgba(244, 114, 182, 0.55),
              0 1px 0 rgba(255, 255, 255, 0.55) !important;
          }

          /* ============================================
             HEART POP
          ============================================ */
          @keyframes heartPop {
            0%   { transform: translate(-50%, -50%) scale(0) rotate(0deg);   opacity: 0; }
            30%  { transform: translate(-50%, -50%) scale(1.2) rotate(-10deg); opacity: 1; }
            60%  { transform: translate(-50%, -80%) scale(1.1) rotate(8deg);  opacity: 1; }
            100% { transform: translate(-50%, -180%) scale(0.4) rotate(-15deg); opacity: 0; }
          }
          .heart-pop {
            animation: heartPop 1.2s ease-out forwards;
          }

          /* ============================================
             SHINY PHOTO + GLOW
          ============================================ */
          @keyframes shinySweep {
            0%   { transform: translateX(-120%) rotate(8deg); }
            100% { transform: translateX(220%) rotate(8deg); }
          }
          @keyframes horrorPhotoPulse {
            0%, 100% {
              box-shadow:
                0 0 35px rgba(255, 20, 20, 0.85),
                0 0 90px rgba(180, 0, 0, 0.65),
                0 0 160px rgba(120, 0, 0, 0.4);
            }
            50% {
              box-shadow:
                0 0 55px rgba(255, 40, 40, 1),
                0 0 140px rgba(220, 0, 0, 0.9),
                0 0 220px rgba(150, 0, 0, 0.6);
            }
          }
          @keyframes lovePhotoPulse {
            0%, 100% {
              box-shadow:
                0 0 35px rgba(244, 114, 182, 0.9),
                0 0 90px rgba(219, 39, 119, 0.65);
            }
            50% {
              box-shadow:
                0 0 55px rgba(255, 182, 213, 1),
                0 0 140px rgba(244, 114, 182, 0.9);
            }
          }
          .shiny-sweep {
            animation: shinySweep 3s linear infinite;
          }

          .horror-photo-bright {
            filter: brightness(1.15) contrast(1.1) saturate(1.05);
          }
          .love-photo-bright {
            filter: brightness(1.08) contrast(1.05) saturate(1.1);
          }

          /* ============================================
             HORROR IMAGE GLITCH — genuinely wrong
          ============================================ */
          @keyframes horrorImgGlitch {
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
          .horror-img-glitch {
            animation: horrorImgGlitch 1.4s steps(24) infinite;
            will-change: transform, filter;
          }

          /* RGB tear ghost layers */
          @keyframes horrorRGBRed {
            0%, 100% { transform: translate(-3px, 1px); opacity: 0.35; }
            22%      { transform: translate(-8px, 2px); opacity: 0.6; }
            48%      { transform: translate(-2px, 0);   opacity: 0.3; }
            72%      { transform: translate(-11px, 3px);opacity: 0.7; }
            90%      { transform: translate(-4px, 1px); opacity: 0.4; }
          }
          @keyframes horrorRGBCyan {
            0%, 100% { transform: translate(3px, -1px);  opacity: 0.3; }
            22%      { transform: translate(9px, -2px);  opacity: 0.55; }
            48%      { transform: translate(2px, 0);     opacity: 0.25; }
            72%      { transform: translate(12px, -3px); opacity: 0.65; }
            90%      { transform: translate(4px, -1px);  opacity: 0.35; }
          }
          .horror-rgb-red {
            animation: horrorRGBRed 1.2s steps(20) infinite;
            filter: drop-shadow(0 0 0 #ff0000);
            mix-blend-mode: screen;
          }
          .horror-rgb-cyan {
            animation: horrorRGBCyan 1.35s steps(20) infinite;
            filter: drop-shadow(0 0 0 #00ffff);
            mix-blend-mode: screen;
          }

          /* Blood drips falling from the frame */
          @keyframes horrorBloodDripFall {
            0%   { transform: translateY(-10px) scaleY(0.6); opacity: 0; }
            15%  { opacity: 1; }
            100% { transform: translateY(120px) scaleY(1.4); opacity: 0; }
          }

          /* Blood splatter appearing */
          @keyframes horrorSplatter {
            0%, 100% { transform: scale(0.4); opacity: 0; }
            30%      { transform: scale(1);    opacity: 0.85; }
            60%      { transform: scale(1.1);  opacity: 0.55; }
            90%      { transform: scale(1.15); opacity: 0; }
          }

          /* Static noise jitter */
          @keyframes horrorStaticJitter {
            0%   { transform: translate(0, 0); opacity: 0.35; }
            20%  { transform: translate(-3px, 2px); opacity: 0.5; }
            40%  { transform: translate(2px, -3px); opacity: 0.3; }
            60%  { transform: translate(-2px, -2px); opacity: 0.55; }
            80%  { transform: translate(3px, 3px); opacity: 0.4; }
            100% { transform: translate(0, 0); opacity: 0.35; }
          }
          .horror-static {
            animation: horrorStaticJitter 0.18s steps(3) infinite;
          }

          /* Whisper text breathing */
          @keyframes horrorWhisper {
            0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.85); }
            15%      { opacity: 0.9; }
            40%      { opacity: 0.75; }
            70%      { opacity: 0.95; }
            85%      { opacity: 0; transform: translate(-50%, -50%) scale(1.15); }
          }

          /* The eye */
          @keyframes horrorEyeBlink {
            0%, 100% { transform: scaleY(1); }
            46%, 54% { transform: scaleY(0.05); }
          }
          .horror-eye {
            animation: horrorEyeBlink 4.5s ease-in-out infinite;
            transform-origin: center;
          }

          /* Hand / claw rising from below the image */
          @keyframes horrorClawReach {
            0%, 100% { transform: translateY(30%) rotate(-2deg); opacity: 0; }
            35%      { transform: translateY(0%)  rotate(0deg);  opacity: 0.85; }
            60%      { transform: translateY(-3%) rotate(1deg);  opacity: 0.7; }
            85%      { transform: translateY(5%)  rotate(-1deg); opacity: 0; }
          }

          /* Death vignette creeping in */
          @keyframes horrorDeathVignette {
            0%, 100% { opacity: 0.3; }
            50%      { opacity: 0.85; }
          }
        `}
      </style>

      {/* Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Creepster&family=Nosifer&family=Eater&family=Butcherman&family=Dancing+Script:wght@400;700&family=Great+Vibes&display=swap"
      />

      {/* === 3D Background Layer === */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 -left-20 w-md h-112 rounded-full bg-cyan-500/10 dark:bg-cyan-500/5 blur-3xl"
          animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 -right-20 w-lg h-128 rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-3xl"
          animate={{ y: [0, -40, 0], x: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="absolute top-1/3 right-[8%] hidden xl:block" style={{ perspective: "800px" }}>
          <motion.div
            className="relative w-24 h-24"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          >
            {[
              "rotateY(0deg) translateZ(48px)",
              "rotateY(90deg) translateZ(48px)",
              "rotateY(180deg) translateZ(48px)",
              "rotateY(270deg) translateZ(48px)",
              "rotateX(90deg) translateZ(48px)",
              "rotateX(-90deg) translateZ(48px)",
            ].map((t, i) => (
              <div
                key={i}
                className="absolute inset-0 border border-cyan-400/30 rounded-md"
                style={{ transform: t }}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-8xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12 lg:gap-16 xl:gap-24">
          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left max-w-2xl lg:max-w-xl xl:max-w-2xl"
          >
            {/* HERO NAME */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className={`
                text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight
                ${isHorror ? "horror-text horror-flicker" : ""}
                ${isLove ? "love-text" : ""}
              `}
            >
              <span className={isHorror || isLove ? "inline-block" : "bg-linear-to-r from-cyan-400 to-blue-400 dark:from-cyan-300 dark:via-white dark:to-orange-400 bg-clip-text text-transparent inline-block"}>
                {adminName.split(" ")[0] || "Kushagra"}
              </span>{" "}
              <span className={isHorror || isLove ? "inline-block" : "bg-linear-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent inline-block"}>
                {adminName.split(" ")[1] || "Chhabra"}
              </span>
            </motion.h1>

            {/* TAGLINE 1 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className={`
                text-lg sm:text-xl lg:text-2xl mb-6 leading-relaxed
                text-gray-600 dark:text-gray-300
                ${isHorror ? "horror-text-soft" : ""}
                ${isLove ? "love-text-soft" : ""}
              `}
            >
              Full-Stack Developer &{" "}
              <span className="font-semibold">App developer</span>
            </motion.p>

            {/* TAGLINE 2 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className={`
                text-base sm:text-lg mb-10 leading-relaxed
                text-gray-500 dark:text-gray-400
                ${isHorror ? "horror-text-soft" : ""}
                ${isLove ? "love-text-soft" : ""}
              `}
            >
              I craft <span className="font-semibold">digital experiences</span> that blend
              innovative design with cutting-edge technology.
            </motion.p>

            {/* Dynamic Skill */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="mb-12"
            >
              <div className="flex items-center gap-4 mb-4 justify-center lg:justify-start">
                <Star className="w-5 h-5 text-amber-400" />
                <span
                  className={`
                    text-sm font-semibold
                    text-gray-700 dark:text-gray-300
                    ${isHorror ? "horror-text-soft" : ""}
                    ${isLove ? "love-text-soft" : ""}
                  `}
                >
                  Currently loving:
                </span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSkill}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-3 justify-center lg:justify-start"
                >
                  {featuredSkills[currentSkill].icon}
                  <motion.span
                    whileHover={{
                      scale: 1.1,
                      textShadow: "0 0 10px currentColor",
                      transition: { duration: 0.2 },
                    }}
                    className={`text-lg font-bold bg-linear-to-r ${featuredSkills[currentSkill].gradient} bg-clip-text text-transparent cursor-pointer`}
                  >
                    {featuredSkills[currentSkill].name}
                  </motion.span>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* What I Do */}
            <section className="mt-20 select-none mb-16 text-center lg:text-left">
              <motion.h2
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                className={`
                  text-3xl font-bold mb-10 cursor-pointer inline-block
                  text-cyan-400
                  ${isHorror ? "horror-text horror-flicker" : ""}
                  ${isLove ? "love-text" : ""}
                `}
              >
                What I Do
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {workItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2, duration: 0.6 }}
                    whileHover={{
                      y: -10,
                      transition: { duration: 0.3, ease: "easeOut" },
                    }}
                    className="relative group cursor-pointer"
                  >
                    <div
                      className={`
                        absolute -inset-0.5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300
                        bg-linear-to-r from-cyan-600 to-blue-600
                        love:from-pink-500 love:to-rose-500
                        horror:from-red-600 horror:to-red-900
                      `}
                    />

                    <div
                      className={`
                        relative bg-transparent p-6 rounded-2xl border backdrop-blur-md transition-all duration-300 h-full
                        border-cyan-400/20 hover:border-transparent
                        love:border-pink-400/60
                        horror:border-red-700/70
                      `}
                    >
                      <motion.div
                        className="text-4xl mb-4 inline-block"
                        whileHover={{
                          rotate: 360,
                          scale: 1.2,
                          transition: { duration: 0.6, ease: "easeInOut" },
                        }}
                      >
                        {item.icon}
                      </motion.div>

                      <motion.h3
                        initial={{ x: 0 }}
                        whileHover={{ x: 10, transition: { duration: 0.2 } }}
                        className={`
                          text-lg font-semibold mb-2
                          text-cyan-400
                          ${isHorror ? "horror-text" : ""}
                          ${isLove ? "love-text" : ""}
                        `}
                      >
                        {item.title}
                      </motion.h3>

                      <p
                        className={`
                          text-sm leading-relaxed
                          text-gray-600 dark:text-gray-300
                          ${isHorror ? "horror-text-soft" : ""}
                          ${isLove ? "love-text-soft" : ""}
                        `}
                      >
                        {item.desc}
                      </p>

                      <motion.div
                        className={`
                          absolute bottom-0 left-0 h-0.5
                          bg-linear-to-r from-cyan-400 to-blue-500
                          love:from-pink-400 love:to-rose-500
                          horror:from-red-500 horror:to-red-800
                        `}
                        initial={{ width: "0%" }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
                <Link
                  to="#signup"
                  className="
                    relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold overflow-hidden group shadow-lg hover:shadow-2xl transition-shadow duration-300
                    bg-linear-to-r from-cyan-500 to-blue-500 text-white
                    love:from-pink-500 love:to-rose-500
                    horror:from-red-700 horror:via-red-800 horror:to-black
                    horror:border horror:border-red-500/80
                    horror:shadow-[0_0_35px_rgba(255,20,20,0.9)]
                  "
                >
                  <div className="absolute inset-0 w-full h-full">
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    <div className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-linear-to-r from-white/0 via-white/30 to-white/0" />
                  </div>
                  <Mail className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  <span
                    className={`
                      relative z-10 font-medium tracking-wide
                      ${isHorror ? "horror-text-soft" : ""}
                      ${isLove ? "love-text-soft" : ""}
                    `}
                  >
                    Get In Touch
                  </span>
                  <motion.div
                    animate={{ x: 0 }}
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 400 }}
                  >
                    <ArrowRight className="w-4 h-4 relative z-10" />
                  </motion.div>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
                <Link
                  to="/resume"
                  className="
                    relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold backdrop-blur-sm overflow-hidden group transition-all duration-300
                    border-2 border-cyan-400 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10
                    love:border-pink-500 love:text-pink-700 love:hover:bg-pink-500/20
                    horror:border-red-500 horror:text-red-200 horror:hover:bg-red-950/50
                    horror:shadow-[0_0_22px_rgba(255,20,20,0.7)]
                  "
                >
                  <div
                    className="
                      absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10
                      bg-linear-to-r from-cyan-400 to-blue-500
                      love:from-pink-500 love:to-rose-500
                      horror:from-red-700 horror:to-red-950
                    "
                  />
                  <Download className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span
                    className={`
                      font-medium tracking-wide transition-colors duration-300
                      group-hover:text-white
                      ${isHorror ? "horror-text-soft" : ""}
                      ${isLove ? "love-text-soft" : ""}
                    `}
                  >
                    Download CV
                  </span>
                  <motion.div
                    animate={{ rotate: 0 }}
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <Sparkles className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:text-white" />
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* === 3D Profile Image === */}
          <div className="flex flex-col items-center">
            <motion.div
              ref={cardRef}
              className="relative select-none shrink-0 w-full max-w-md lg:max-w-lg xl:max-w-xl"
              initial={{ opacity: 0, scale: 0.85, rotateY: 20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              onMouseEnter={handleMouseEnterImg}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ perspective: 1200 }}
            >
              {/* LOVE HEART POP */}
              {isLove && isHoveringImg && (
                <AnimatePresence>
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
                        className="absolute top-1/2 left-1/2 z-40 pointer-events-none text-2xl sm:text-3xl"
                        style={{
                          filter: "drop-shadow(0 0 10px rgba(244,114,182,0.95))",
                        }}
                      >
                        {["❤️", "💗", "💕", "💖", "💘", "💝"][i]}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}

              <motion.div
                className="relative rounded-3xl p-4 sm:p-6"
                style={{
                  transformStyle: "preserve-3d",
                  rotateX: isHoveringImg ? rotateX : 0,
                  rotateY: isHoveringImg ? rotateY : 0,
                }}
                animate={{ y: isHoveringImg ? -8 : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                {/* ============================
                    HORROR HOVER — TRUE DREAD
                ============================ */}
                {isHorror && isHoveringImg && (
                  <>
                    {/* Blood splatters creeping across the frame */}
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
                          animation: `horrorSplatter 2.4s ease-in-out ${s.delay}s infinite`,
                          mixBlendMode: "multiply",
                        }}
                      />
                    ))}

                    {/* Static noise layer */}
                    <div
                      className="absolute inset-0 rounded-3xl pointer-events-none z-36 horror-static opacity-40"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.65'/></svg>\")",
                        mixBlendMode: "overlay",
                      }}
                    />
                  </>
                )}

                {/* OUTER AMBIENT GLOW */}
                {isHorror && (
                  <div
                    className="absolute -inset-6 rounded-[2.5rem] pointer-events-none blur-2xl"
                    style={{
                      background:
                        "radial-gradient(60% 60% at 50% 50%, rgba(255,30,30,0.7) 0%, rgba(180,0,0,0.45) 45%, transparent 80%)",
                      animation: "horrorPhotoPulse 3s ease-in-out infinite",
                    }}
                  />
                )}
                {isLove && (
                  <div
                    className="absolute -inset-6 rounded-[2.5rem] pointer-events-none blur-2xl"
                    style={{
                      background:
                        "radial-gradient(60% 60% at 50% 50%, rgba(255,150,200,0.75) 0%, rgba(244,114,182,0.5) 45%, transparent 80%)",
                      animation: "lovePhotoPulse 3s ease-in-out infinite",
                    }}
                  />
                )}

                {/* GRADIENT INNER GLOW */}
                <motion.div
                  className="
                    absolute inset-0 rounded-3xl blur-2xl
                    bg-linear-to-br from-cyan-500/20 via-transparent to-blue-500/20
                    love:from-pink-500/40 love:via-transparent love:to-rose-500/40
                    horror:from-red-600/60 horror:via-transparent horror:to-red-950/60
                  "
                  animate={{
                    opacity: isHoveringImg ? 1 : 0.7,
                    scale: isHoveringImg ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                  style={{ transform: "translateZ(-40px)" }}
                />

                {/* BORDER */}
                <div
                  className="
                    absolute inset-0 rounded-3xl
                    border border-cyan-400/20 dark:border-cyan-400/10
                    love:border-pink-400/70
                    horror:border-red-500/80
                  "
                  style={{
                    transform: "translateZ(0px)",
                    boxShadow: isHorror
                      ? "0 0 25px rgba(255,20,20,0.7), inset 0 0 15px rgba(255,40,40,0.35)"
                      : isLove
                      ? "0 0 25px rgba(244,114,182,0.7), inset 0 0 15px rgba(255,180,210,0.4)"
                      : undefined,
                  }}
                />

                <div
                  className="relative select-none rounded-2xl overflow-hidden"
                  style={{ transform: "translateZ(30px)" }}
                >
                  {/* RGB tear ghost layers — only on horror hover */}
                  {isHorror && isHoveringImg && (
                    <>
                      <img
                        src={profileImg}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover rounded-2xl z-5 horror-rgb-red"
                        style={{
                          filter: "saturate(0) brightness(0.6) sepia(1) hue-rotate(-50deg) saturate(6)",
                        }}
                      />
                      <img
                        src={profileImg}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover rounded-2xl z-5 horror-rgb-cyan"
                        style={{
                          filter: "saturate(0) brightness(0.6) sepia(1) hue-rotate(160deg) saturate(6)",
                        }}
                      />
                    </>
                  )}

                  <motion.img
                    src={profileImg}
                    alt={`${adminName} - Full Stack Developer`}
                    className={`
                      w-full h-auto object-cover rounded-2xl shadow-2xl relative z-10
                      ${isHorror && isHoveringImg ? "horror-img-glitch" : ""}
                      ${isHorror && !isHoveringImg ? "horror-photo-bright" : ""}
                      ${isLove ? "love-photo-bright" : ""}
                    `}
                    animate={{
                      scale:
                        isHoveringImg && !isHorror
                          ? 1.03
                          : isHorror && isHoveringImg
                          ? 1.03
                          : 1,
                    }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Horror hover: creeping death vignette + blood stain */}
                  {isHorror && isHoveringImg && (
                    <>
                      {/* Blood stain from bottom, creeping up */}
                      <div
                        className="pointer-events-none absolute inset-0 rounded-2xl z-20"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(60,0,0,0.95) 0%, rgba(140,0,0,0.55) 25%, rgba(80,0,0,0.25) 45%, transparent 65%)",
                          mixBlendMode: "multiply",
                          animation: "horrorDeathVignette 2.6s ease-in-out infinite",
                        }}
                      />
                      {/* Corner shadow closing in */}
                      <div
                        className="pointer-events-none absolute inset-0 rounded-2xl z-20"
                        style={{
                          background:
                            "radial-gradient(120% 100% at 50% 50%, transparent 30%, rgba(0,0,0,0.85) 85%, rgba(0,0,0,1) 100%)",
                          mixBlendMode: "multiply",
                        }}
                      />
                    </>
                  )}

                  {/* Non-horror vignettes (unchanged) */}
                  {isHorror && !isHoveringImg && (
                    <div
                      className="pointer-events-none absolute inset-0 rounded-2xl z-20"
                      style={{
                        background:
                          "radial-gradient(120% 120% at 50% 100%, transparent 40%, rgba(180,0,0,0.35) 100%)",
                        mixBlendMode: "multiply",
                      }}
                    />
                  )}
                  {isLove && (
                    <div
                      className="pointer-events-none absolute inset-0 rounded-2xl z-20"
                      style={{
                        background:
                          "radial-gradient(120% 120% at 50% 100%, transparent 40%, rgba(244,114,182,0.3) 100%)",
                        mixBlendMode: "multiply",
                      }}
                    />
                  )}

                  {(isHorror || isLove) && (
                    <div className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden z-20">
                      <div
                        className="shiny-sweep absolute top-0 left-0 h-full w-1/3 bg-linear-to-r from-transparent via-white/60 to-transparent"
                        style={{ mixBlendMode: "overlay" }}
                      />
                    </div>
                  )}

                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none z-30"
                    style={{ background: glareBg }}
                    animate={{ opacity: isHoveringImg && !isHorror ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* ==========================================
                      HORROR HOVER — THE EYE IN THE DARK
                  ========================================== */}
                  {isHorror && isHoveringImg && (
                    <motion.div
                      className="absolute pointer-events-none z-45"
                      style={{
                        top: "18%",
                        right: "14%",
                        width: "clamp(60px, 12%, 110px)",
                        height: "clamp(30px, 6%, 55px)",
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
                      <div className="horror-eye relative w-full h-full">
                        {/* Outer sclera — dark, dead, bloodshot */}
                        <div
                          className="absolute inset-0 rounded-full"
                          style={{
                            background:
                              "radial-gradient(ellipse at center, #f2e2c8 0%, #d8b8a0 45%, #6b1010 85%, #1a0000 100%)",
                            boxShadow:
                              "0 0 18px rgba(255,0,0,0.85), inset 0 0 12px rgba(120,0,0,0.9)",
                          }}
                        />
                        {/* Bloodshot veins */}
                        <div
                          className="absolute inset-0 rounded-full"
                          style={{
                            background:
                              "radial-gradient(circle at 22% 30%, rgba(160,0,0,0.9) 0%, transparent 12%), radial-gradient(circle at 78% 68%, rgba(180,0,0,0.85) 0%, transparent 10%), radial-gradient(circle at 40% 78%, rgba(200,0,0,0.8) 0%, transparent 8%), radial-gradient(circle at 65% 22%, rgba(150,0,0,0.85) 0%, transparent 9%)",
                            mixBlendMode: "multiply",
                          }}
                        />
                        {/* Iris — crimson */}
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
                          {/* Pupil */}
                          <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"
                            style={{
                              width: "42%",
                              height: "78%",
                              boxShadow: "0 0 6px rgba(0,0,0,1)",
                            }}
                          />
                          {/* Wet highlight */}
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

               
                  {isHorror && isHoveringImg && (
                    <div
                      className="absolute inset-x-0 bottom-0 pointer-events-none z-44 h-1/3 overflow-hidden"
                      style={{ borderRadius: "0 0 1rem 1rem" }}
                    >
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(20,0,0,0.9) 40%, transparent 100%)",
                          animation:
                            "horrorClawReach 3.6s ease-in-out 0.4s infinite",
                        }}
                      >
                        {/* Claw fingers — jagged silhouettes */}
                        <svg
                          viewBox="0 0 400 120"
                          preserveAspectRatio="none"
                          className="w-full h-full opacity-90"
                        >
                          <defs>
                            <linearGradient id="clawGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#000" />
                              <stop offset="100%" stopColor="#2a0000" />
                            </linearGradient>
                          </defs>
                          {[40, 110, 180, 250, 320, 370].map((x, i) => (
                            <path
                              key={i}
                              d={`M${x} 120 L${x - 8} ${40 + (i % 3) * 12} L${x - 3} ${18 + (i % 2) * 10} L${x + 2} ${34 + (i % 3) * 8} L${x + 8} ${16 + (i % 2) * 12} L${x + 12} 120 Z`}
                              fill="url(#clawGrad)"
                            />
                          ))}
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* ==========================================
                      HORROR HOVER — WHISPERS FROM THE DARK
                  ========================================== */}
                  {isHorror && isHoveringImg && (
                    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden rounded-2xl">
                      {horrorWhispers.map((w, i) => (
                        <span
                          key={i}
                          className="absolute font-bold whitespace-nowrap"
                          style={{
                            top: w.top,
                            left: w.left,
                            fontFamily:
                              "'Creepster', 'Nosifer', cursive",
                            fontSize: "clamp(0.85rem, 1.6vw, 1.4rem)",
                            letterSpacing: "0.08em",
                            color: "#ff1a1a",
                            textShadow:
                              "0 0 6px #ff0000, 0 0 14px #b30000, 0 0 26px #4a0000, 0 2px 3px #000",
                            animation: `horrorWhisper ${w.duration}s ease-in-out ${w.delay}s infinite`,
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

                {/* ==========================================
                    HORROR HOVER — BLOOD DRIPPING FROM FRAME
                ========================================== */}
                {isHorror && isHoveringImg && (
                  <div
                    className="absolute left-0 right-0 pointer-events-none z-38 overflow-visible"
                    style={{ top: "calc(100% - 12px)" }}
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
                          animation: `horrorBloodDripFall ${d.duration}s ease-in ${d.delay}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                )}

                <motion.div
                  className={`
                    absolute -top-2 -left-2 w-3 h-3 rounded-full
                    bg-cyan-400
                    love:bg-pink-400 love:shadow-[0_0_20px_rgba(244,114,182,1)]
                    horror:bg-red-500 horror:shadow-[0_0_20px_rgba(255,20,20,1)]
                  `}
                  style={{ transform: "translateZ(60px)" }}
                  animate={isHoveringImg ? { scale: [1, 1.5, 1] } : { scale: 1 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.div
                  className={`
                    absolute -bottom-2 -right-2 w-3 h-3 rounded-full
                    bg-blue-400
                    love:bg-rose-400 love:shadow-[0_0_20px_rgba(244,114,182,1)]
                    horror:bg-red-700 horror:shadow-[0_0_20px_rgba(255,20,20,1)]
                  `}
                  style={{ transform: "translateZ(60px)" }}
                  animate={isHoveringImg ? { scale: [1, 1.5, 1] } : { scale: 1 }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                />
              </motion.div>
            </motion.div>

            {/* Rating Stars */}
            {averageRating !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mt-6 flex flex-col items-center"
              >
                <div className="flex items-center justify-center space-x-1">
                  {[...Array(5)].map((_, i) => {
                    const fillPercent = Math.min(Math.max(averageRating - i, 0), 1) * 100;
                    return (
                      <motion.div
                        key={i}
                        className="relative w-6 h-6 cursor-pointer"
                        whileHover={{ scale: 1.3, rotate: 360, transition: { duration: 0.4 } }}
                      >
                        <Star className="absolute top-0 left-0 w-6 h-6 text-gray-300 dark:text-gray-600" />
                        <div
                          className="absolute top-0 left-0 overflow-hidden"
                          style={{ width: `${fillPercent}%` }}
                        >
                          <Star className="w-6 h-6 text-yellow-400" />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                <motion.p
                  whileHover={{ scale: 1.05 }}
                  className={`
                    mt-2 text-sm text-center cursor-pointer
                    text-gray-700 dark:text-gray-300
                    ${isHorror ? "horror-text-soft" : ""}
                    ${isLove ? "love-text-soft" : ""}
                  `}
                >
                  Average Rating:{" "}
                  <span className="font-semibold text-yellow-500">
                    {averageRating.toFixed(1)}
                  </span>
                  /5 ⭐
                </motion.p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Sections below */}
      <section id="skills">
        <Skills />
      </section>
      <section id="projects" className="pt-10">
        <Project />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="contact">
        <Signup />
      </section>
      <section id="footer">
        <Footer />
      </section>
    </div>
  );
}