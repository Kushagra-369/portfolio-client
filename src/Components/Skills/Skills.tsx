import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  SiJavascript,
  SiReact,
  SiVercel,
  SiRender,
  SiTailwindcss,
  SiExpress,
  SiNodedotjs,
  SiNextdotjs,
  SiMongodb,
  SiTypescript,
  SiGit,
  SiFigma,
  SiFramer,
  SiMui,
  SiPython,
  SiCplusplus,
  SiHtml5,
  SiCss3,
  SiGithub,
  SiLinux,
  SiPostgresql,
  SiMysql,
  SiFastapi,
  SiPytorch,
  SiPandas,
  SiNumpy,
  SiAmazonwebservices,
} from "react-icons/si";
import { useTheme } from "../../Context/ThemeContext";
import image1 from "../Home/image.png";

export default function Skills() {
  const { theme } = useTheme();
  const isLove = theme === "love";
  const isHorror = theme === "horror";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ==================== LEFT: Image 3D tilt ====================
  const cardRef = useRef<HTMLDivElement | null>(null);
  const mouseX = useMotionValue<number>(0);
  const mouseY = useMotionValue<number>(0);
  const [isHoveringImg, setIsHoveringImg] = useState<boolean>(false);
  const [heartBurstKey, setHeartBurstKey] = useState<number>(0);

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

  const handleMouseEnterImg = () => {
    setIsHoveringImg(true);
    if (isLove) setHeartBurstKey((k) => k + 1);
  };

  const handleMouseLeave = () => {
    setIsHoveringImg(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // ==================== RIGHT: Cylinder ====================
  const rotation = useMotionValue<number>(0);
  const inverseRotation = useTransform(rotation, (v) => -v);
  const isDragging = useRef<boolean>(false);
  const lastX = useRef<number>(0);

  useAnimationFrame((_, delta) => {
    if (!isDragging.current) {
      rotation.set(rotation.get() + delta * 0.006);
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

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    lastX.current = e.clientX;
  };

  // ==================== Variants ====================
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  const skills = [
    { name: "JavaScript", icon: <SiJavascript className="text-yellow-400 text-5xl sm:text-6xl" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-blue-600 text-5xl sm:text-6xl" /> },
    { name: "React.js", icon: <SiReact className="text-cyan-400 text-5xl sm:text-6xl" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-gray-200 dark:text-gray-100 text-5xl sm:text-6xl" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-400 text-5xl sm:text-6xl" /> },
    { name: "Framer Motion", icon: <SiFramer className="text-pink-500 text-5xl sm:text-6xl" /> },
    { name: "HTML5", icon: <SiHtml5 className="text-orange-500 text-5xl sm:text-6xl" /> },
    { name: "CSS3", icon: <SiCss3 className="text-blue-500 text-5xl sm:text-6xl" /> },
    { name: "Node.js", icon: <SiNodedotjs className="text-green-600 text-5xl sm:text-6xl" /> },
    { name: "Express.js", icon: <SiExpress className="text-gray-400 text-5xl sm:text-6xl" /> },
    { name: "FastAPI", icon: <SiFastapi className="text-teal-400 text-5xl sm:text-6xl" /> },
    { name: "Python", icon: <SiPython className="text-yellow-300 text-5xl sm:text-6xl" /> },
    { name: "C++", icon: <SiCplusplus className="text-blue-500 text-5xl sm:text-6xl" /> },
    { name: "PyTorch", icon: <SiPytorch className="text-orange-500 text-5xl sm:text-6xl" /> },
    { name: "Pandas", icon: <SiPandas className="text-indigo-400 text-5xl sm:text-6xl" /> },
    { name: "NumPy", icon: <SiNumpy className="text-blue-400 text-5xl sm:text-6xl" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-green-500 text-5xl sm:text-6xl" /> },
    { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-400 text-5xl sm:text-6xl" /> },
    { name: "MySQL", icon: <SiMysql className="text-blue-500 text-5xl sm:text-6xl" /> },
    { name: "Git", icon: <SiGit className="text-orange-600 text-5xl sm:text-6xl" /> },
    { name: "GitHub", icon: <SiGithub className="text-gray-200 text-5xl sm:text-6xl" /> },
    { name: "Linux", icon: <SiLinux className="text-yellow-300 text-5xl sm:text-6xl" /> },
    { name: "AWS", icon: <SiAmazonwebservices className="text-orange-400 text-5xl sm:text-6xl" /> },
    { name: "Vercel", icon: <SiVercel className="text-gray-900 dark:text-white text-5xl sm:text-6xl" /> },
    { name: "Render", icon: <SiRender className="text-purple-400 text-5xl sm:text-6xl" /> },
    { name: "Figma", icon: <SiFigma className="text-indigo-500 text-5xl sm:text-6xl" /> },
    { name: "Material UI", icon: <SiMui className="text-blue-500 text-4xl sm:text-5xl" /> },
  ];

  const CARD_W = 200;
  const CARD_H = 260;
  const RADIUS = 900;
  const ANGLE_STEP = 360 / skills.length;

  return (
    <div className="relative pt-32 pb-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 font-[Outfit] overflow-hidden">
      {/* ============ THEME FONTS + TEXT GLOW ============ */}
      <style>
        {`
          /* HORROR — glowing white-red text */
          .skill-horror-text,
          .skill-horror-text * {
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
          .skill-horror-text-soft,
          .skill-horror-text-soft * {
            font-family: 'Creepster', 'Nosifer', cursive !important;
            color: #ffdddd !important;
            -webkit-text-fill-color: #ffdddd !important;
            text-shadow:
              0 0 6px #ff3333,
              0 0 16px #cc0000,
              0 0 32px #8b0000,
              0 2px 2px #000 !important;
          }

          /* LOVE — dark rose text with soft pink glow */
          .skill-love-text,
          .skill-love-text * {
            font-family: 'Dancing Script', 'Great Vibes', cursive !important;
            letter-spacing: 0.02em !important;
            color: #7a0038 !important;
            -webkit-text-fill-color: #7a0038 !important;
            text-shadow:
              0 0 6px rgba(255, 182, 213, 0.9),
              0 0 14px rgba(244, 114, 182, 0.7),
              0 1px 0 rgba(255, 255, 255, 0.6) !important;
          }
          .skill-love-text-soft,
          .skill-love-text-soft * {
            font-family: 'Dancing Script', cursive !important;
            color: #8b0040 !important;
            -webkit-text-fill-color: #8b0040 !important;
            text-shadow:
              0 0 6px rgba(244, 114, 182, 0.55),
              0 1px 0 rgba(255, 255, 255, 0.55) !important;
          }

          /* Heart pop (love) */
          @keyframes skillHeartPop {
            0%   { transform: translate(-50%, -50%) scale(0) rotate(0deg);    opacity: 0; }
            30%  { transform: translate(-50%, -50%) scale(1.2) rotate(-10deg); opacity: 1; }
            60%  { transform: translate(-50%, -80%) scale(1.1) rotate(8deg);   opacity: 1; }
            100% { transform: translate(-50%, -180%) scale(0.4) rotate(-15deg); opacity: 0; }
          }

          /* Shiny sweep for photo in horror/love */
          @keyframes skillShinySweep {
            0%   { transform: translateX(-120%) rotate(8deg); }
            100% { transform: translateX(220%) rotate(8deg); }
          }

          /* Horror / Love photo pulse */
          @keyframes skillHorrorPulse {
            0%, 100% { box-shadow: 0 0 25px rgba(180,0,0,0.7), 0 0 60px rgba(90,0,0,0.6); }
            50%      { box-shadow: 0 0 45px rgba(255,20,20,1), 0 0 110px rgba(140,0,0,0.9); }
          }
          @keyframes skillLovePulse {
            0%, 100% { box-shadow: 0 0 25px rgba(244,114,182,0.75), 0 0 60px rgba(219,39,119,0.6); }
            50%      { box-shadow: 0 0 45px rgba(255,182,213,1), 0 0 110px rgba(244,114,182,0.85); }
          }
          .skill-shiny-sweep { animation: skillShinySweep 3.5s linear infinite; }
        `}
      </style>

      {/* Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Creepster&family=Nosifer&family=Eater&family=Butcherman&family=Dancing+Script:wght@400;700&family=Great+Vibes&display=swap"
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="max-w-[1500px] mx-auto"
      >
        {/* =============== MAIN HEADING =============== */}
        <motion.h1
          variants={fadeIn}
          custom={0}
          className={`
            text-center text-3xl sm:text-4xl md:text-5xl font-bold mb-14 sm:mb-20
            bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent
            ${isHorror ? "skill-horror-text" : ""}
            ${isLove ? "skill-love-text" : ""}
          `}
        >
          ⚙️ Skills & Tools
        </motion.h1>

        {/* =============== TWO-COLUMN LAYOUT =============== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-4 items-center">

          {/* =========== LEFT: IMAGE =========== */}
          <div className="flex justify-start order-2 lg:order-1 -ml-4 sm:-ml-8 md:-ml-12 lg:-ml-16 xl:-ml-24 2xl:-ml-28">
            <div style={{ perspective: 1400, perspectiveOrigin: "30% 50%" }}>
              <div
                style={{
                  transform: "rotateY(22deg) rotateX(4deg) rotateZ(1.2deg)",
                  transformOrigin: "left center",
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  ref={cardRef}
                  className="relative select-none w-full max-w-104 sm:max-w-lg lg:max-w-160 xl:max-w-184"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  onMouseEnter={handleMouseEnterImg}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{ transformStyle: "preserve-3d" }}
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
                    {/* OUTER AMBIENT GLOW (horror/love) */}
                    {isHorror && (
                      <div
                        className="absolute -inset-6 rounded-[2.5rem] pointer-events-none blur-2xl"
                        style={{
                          background:
                            "radial-gradient(60% 60% at 50% 50%, rgba(255,30,30,0.75) 0%, rgba(180,0,0,0.5) 45%, transparent 80%)",
                          animation: "skillHorrorPulse 3s ease-in-out infinite",
                        }}
                      />
                    )}
                    {isLove && (
                      <div
                        className="absolute -inset-6 rounded-[2.5rem] pointer-events-none blur-2xl"
                        style={{
                          background:
                            "radial-gradient(60% 60% at 50% 50%, rgba(255,150,200,0.8) 0%, rgba(244,114,182,0.5) 45%, transparent 80%)",
                          animation: "skillLovePulse 3s ease-in-out infinite",
                        }}
                      />
                    )}

                    {/* Soft depth glow */}
                    <motion.div
                      className="
                        absolute inset-0 rounded-3xl blur-2xl
                        bg-linear-to-br from-cyan-500/20 via-transparent to-blue-500/20
                        love:from-pink-500/40 love:via-transparent love:to-rose-500/40
                        horror:from-red-600/60 horror:via-transparent horror:to-red-950/60
                      "
                      animate={{
                        opacity: isHoveringImg ? 0.9 : 0.5,
                        scale: isHoveringImg ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.4 }}
                      style={{ transform: "translateZ(-40px)" }}
                    />

                    {/* Frame border */}
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

                    {/* Wall shadow */}
                    <div
                      className="absolute inset-0 rounded-3xl bg-black/10 dark:bg-black/40 blur-2xl"
                      style={{
                        transform: "translateX(-24px) translateZ(-60px)",
                        opacity: 0.6,
                      }}
                    />

                    <div
                      className="relative select-none rounded-2xl overflow-hidden"
                      style={{ transform: "translateZ(30px)" }}
                    >
                      <motion.img
                        src={image1}
                        alt="Skills visual"
                        className="w-full h-auto object-cover rounded-2xl shadow-2xl relative z-10"
                        animate={{ scale: isHoveringImg ? 1.03 : 1 }}
                        transition={{ duration: 0.4 }}
                      />

                      {/* Shiny sweep (horror/love) */}
                      {(isHorror || isLove) && (
                        <div className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden z-20">
                          <div
                            className="skill-shiny-sweep absolute top-0 left-0 h-full w-1/3 bg-linear-to-r from-transparent via-white/60 to-transparent"
                            style={{ mixBlendMode: "overlay" }}
                          />
                        </div>
                      )}

                      {/* Cursor glare */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl pointer-events-none z-30"
                        style={{ background: glareBg }}
                        animate={{ opacity: isHoveringImg ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>

                    {/* Corner accent dots */}
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
              </div>
            </div>
          </div>

          {/* =========== RIGHT: 3D CYLINDER =========== */}
          <div className="flex flex-col items-center justify-center order-1 lg:order-2">
            <div
              className="relative w-full flex items-center justify-center"
              style={{ height: 560 }}
            >
              {/* Floor glow */}
              <div
                className={`
                  absolute bottom-12 w-[620px] max-w-[92vw] h-28 rounded-[100%] blur-3xl pointer-events-none
                  bg-cyan-500/20
                  love:bg-pink-500/30
                  horror:bg-red-800/40
                `}
              />

              <div className="scale-[0.52] sm:scale-[0.58] md:scale-[0.62] lg:scale-[0.55] xl:scale-[0.62] origin-center">
                <div
                  style={{
                    width: CARD_W,
                    height: CARD_H,
                    perspective: 1800,
                    perspectiveOrigin: "50% 50%",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <motion.div
                    className="relative cursor-grab active:cursor-grabbing"
                    onPointerDown={handlePointerDown}
                    style={{
                      width: CARD_W,
                      height: CARD_H,
                      transformStyle: "preserve-3d",
                      rotateY: rotation,
                      touchAction: "none",
                    }}
                  >
                    {skills.map((skill, i) => {
                      const angle = i * ANGLE_STEP;
                      return (
                        <div
                          key={skill.name}
                          className="absolute top-1/2 left-1/2"
                          style={{
                            width: CARD_W,
                            height: CARD_H,
                            marginLeft: -CARD_W / 2,
                            marginTop: -CARD_H / 2,
                            transformStyle: "preserve-3d",
                            transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              transformStyle: "preserve-3d",
                              transform: `rotateY(${-angle}deg)`,
                            }}
                          >
                            <motion.div
                              style={{
                                width: "100%",
                                height: "100%",
                                transformStyle: "preserve-3d",
                                rotateY: inverseRotation,
                              }}
                            >
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 250, damping: 12 }}
                                className={`
                                  relative w-full h-full flex flex-col items-center justify-center rounded-2xl
                                  border backdrop-blur-md overflow-visible group shadow-md
                                  transition-all duration-300
                                  border-cyan-400/30 bg-white/30 dark:bg-white/5
                                  text-gray-800 dark:text-gray-200
                                  hover:shadow-cyan-400/30!
                                  love:border-pink-400/60
                                  love:bg-pink-100/40!
                                  love:text-pink-900!
                                  love:hover:shadow-pink-400/40
                                  horror:border-red-700/80!
                                  horror:bg-black/50!
                                  horror:text-red-100!
                                  horror:hover:shadow-red-800/60!
                                `}
                              >
                                {/* Horizontal rotating cyan ring */}
                                <motion.div
                                  className={`
                                    absolute -inset-4 sm:-inset-5 rounded-full border-2
                                    border-cyan-400/40
                                    love:border-pink-400/60
                                    horror:border-red-600/70
                                  `}
                                  style={{
                                    transformStyle: "preserve-3d",
                                    borderLeftColor: isHorror
                                      ? "rgba(255,26,26,0.9)"
                                      : isLove
                                      ? "rgba(244,114,182,0.9)"
                                      : "rgba(34,211,238,0.6)",
                                  }}
                                  initial={{ rotateX: 0 }}
                                  animate={{ rotateY: 360 }}
                                  transition={{
                                    repeat: Infinity,
                                    duration: 6,
                                    ease: "linear",
                                  }}
                                />

                                {/* Vertical red hover ring */}
                                <motion.div
                                  className={`
                                    absolute -inset-4 sm:-inset-5 rounded-full border-2 opacity-0 group-hover:opacity-100
                                    border-red-600
                                    love:border-pink-500
                                    horror:border-red-500
                                  `}
                                  initial={{ rotateX: 0 }}
                                  animate={{ rotateX: 360 }}
                                  transition={{
                                    repeat: Infinity,
                                    duration: 3,
                                    ease: "linear",
                                  }}
                                  style={{
                                    transformStyle: "preserve-3d",
                                    borderLeftColor: isHorror
                                      ? "rgba(255,26,26,0.9)"
                                      : isLove
                                      ? "rgba(244,114,182,0.9)"
                                      : "rgba(34,211,238,0.6)",
                                  }}
                                />

                                {/* Icon */}
                                <div className="relative z-10 mb-3 scale-90">
                                  {skill.icon}
                                </div>

                                <span
                                  className={`
                                    relative z-10 font-semibold tracking-wide text-base sm:text-lg text-center px-3
                                    ${isHorror ? "skill-horror-text-soft" : ""}
                                    ${isLove ? "skill-love-text-soft" : ""}
                                  `}
                                >
                                  {skill.name}
                                </span>

                                {/* Cyan glow on hover */}
                                <motion.div
                                  className={`
                                    absolute inset-0 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-300
                                    bg-cyan-400/10
                                    love:bg-pink-400/20
                                    horror:bg-red-700/30
                                  `}
                                />
                              </motion.div>
                            </motion.div>
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Drag hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className={`
                mt-2 text-xs flex items-center justify-center gap-2
                text-gray-400 dark:text-gray-500
                love:text-pink-800
                horror:text-red-200
                ${isHorror ? "skill-horror-text-soft" : ""}
                ${isLove ? "skill-love-text-soft" : ""}
              `}
            >
              <motion.span
                animate={{ x: [-4, 4, -4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                ←
              </motion.span>
              <span>drag to spin</span>
              <motion.span
                animate={{ x: [4, -4, 4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </motion.p>
          </div>
        </div>

        {/* =============== QUOTE =============== */}
        <motion.div
          variants={fadeIn}
          custom={2}
          className={`
            mt-16 sm:mt-20 text-center text-base sm:text-lg italic
            text-gray-500 dark:text-gray-400
            ${isHorror ? "skill-horror-text-soft" : ""}
            ${isLove ? "skill-love-text-soft" : ""}
          `}
        >
          "Skill is the unified force of experience, intellect, and passion."
        </motion.div>
      </motion.div>
    </div>
  );
}