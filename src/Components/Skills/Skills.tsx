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
import image1 from "../Home/image.png";

interface Skill {
  name: string;
  icon: React.ReactNode;
}

export default function Skills() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ==================== Image 3D tilt (hover) ====================
  const cardRef = useRef<HTMLDivElement | null>(null);
  const mouseX = useMotionValue<number>(0);
  const mouseY = useMotionValue<number>(0);
  const [isHoveringImg, setIsHoveringImg] = useState<boolean>(false);

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
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.28), transparent 60%)`;

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

  // ==================== Orbit rotation ====================
  const rotation = useMotionValue<number>(0);
  const inverseRotation = useTransform(rotation, (v) => -v);
  const isDragging = useRef<boolean>(false);
  const lastX = useRef<number>(0);

  // 🐢 Slow auto-spin: ~20s per full revolution
  useAnimationFrame((_, delta) => {
    if (!isDragging.current) {
      rotation.set(rotation.get() + delta * 0.018);
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

  const skills: Skill[] = [
    // Frontend
    { name: "JavaScript", icon: <SiJavascript className="text-yellow-400 text-3xl sm:text-4xl" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-blue-600 text-3xl sm:text-4xl" /> },
    { name: "React.js", icon: <SiReact className="text-cyan-400 text-3xl sm:text-4xl" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-gray-200 dark:text-gray-100 text-3xl sm:text-4xl" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-400 text-3xl sm:text-4xl" /> },
    { name: "Framer Motion", icon: <SiFramer className="text-pink-500 text-3xl sm:text-4xl" /> },
    { name: "HTML5", icon: <SiHtml5 className="text-orange-500 text-3xl sm:text-4xl" /> },
    { name: "CSS3", icon: <SiCss3 className="text-blue-500 text-3xl sm:text-4xl" /> },

    // Backend
    { name: "Node.js", icon: <SiNodedotjs className="text-green-600 text-3xl sm:text-4xl" /> },
    { name: "Express.js", icon: <SiExpress className="text-gray-400 text-3xl sm:text-4xl" /> },
    { name: "FastAPI", icon: <SiFastapi className="text-teal-400 text-3xl sm:text-4xl" /> },

    // Programming
    { name: "Python", icon: <SiPython className="text-yellow-300 text-3xl sm:text-4xl" /> },
    { name: "C++", icon: <SiCplusplus className="text-blue-500 text-3xl sm:text-4xl" /> },

    // AI / ML
    { name: "PyTorch", icon: <SiPytorch className="text-orange-500 text-3xl sm:text-4xl" /> },
    { name: "Pandas", icon: <SiPandas className="text-indigo-400 text-3xl sm:text-4xl" /> },
    { name: "NumPy", icon: <SiNumpy className="text-blue-400 text-3xl sm:text-4xl" /> },

    // Databases
    { name: "MongoDB", icon: <SiMongodb className="text-green-500 text-3xl sm:text-4xl" /> },
    { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-400 text-3xl sm:text-4xl" /> },
    { name: "MySQL", icon: <SiMysql className="text-blue-500 text-3xl sm:text-4xl" /> },

    // Tools
    { name: "Git", icon: <SiGit className="text-orange-600 text-3xl sm:text-4xl" /> },
    { name: "GitHub", icon: <SiGithub className="text-gray-200 text-3xl sm:text-4xl" /> },
    { name: "Linux", icon: <SiLinux className="text-yellow-300 text-3xl sm:text-4xl" /> },
    { name: "AWS", icon: <SiAmazonwebservices className="text-orange-400 text-3xl sm:text-4xl" /> },
    { name: "Vercel", icon: <SiVercel className="text-gray-900 dark:text-white text-3xl sm:text-4xl" /> },
    { name: "Render", icon: <SiRender className="text-purple-400 text-3xl sm:text-4xl" /> },

    // UI / Design
    { name: "Figma", icon: <SiFigma className="text-indigo-500 text-3xl sm:text-4xl" /> },
    { name: "Material UI", icon: <SiMui className="text-blue-500 text-2xl sm:text-3xl" /> },
  ];

  // ===== Orbit geometry =====
  const CARD_W = 160;
  const CARD_H = 200;
  const RADIUS = 820; // pushed further out so big image doesn't get overlapped
  const IMAGE_SIZE = 700; // ⬅️ BIG center image
  const ANGLE_STEP = 360 / skills.length;

  return (
    <div className="relative pt-32 pb-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 font-[Outfit] overflow-hidden">
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
          className="text-center text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
        >
          ⚙️ Skills & Tools
        </motion.h1>

        <motion.p
          variants={fadeIn}
          custom={1}
          className="text-center text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-12"
        >
          Grab and drag the ring — or just watch the skills orbit around ↻
        </motion.p>

        {/* ============================================================
            ORBIT STAGE — big image in center, skills around it
            ============================================================ */}
        <div
          className="relative w-full flex items-center justify-center select-none"
          style={{ height: 900 }}
        >
          {/* Floor glow beneath the orbit */}
          <div className="absolute bottom-14 w-[820px] max-w-[94vw] h-32 rounded-[100%] bg-cyan-500/20 dark:bg-cyan-500/10 blur-3xl pointer-events-none" />

          {/* Responsive scale wrapper — keeps the whole 3D scene visible */}
          <div className="scale-[0.42] sm:scale-[0.52] md:scale-[0.62] lg:scale-[0.72] xl:scale-[0.85] 2xl:scale-100 origin-center">
            {/* Perspective context */}
            <div
              style={{
                perspective: 2400,
                perspectiveOrigin: "50% 50%",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Zero-sized anchor at the geometric center of the scene */}
              <div
                className="relative"
                style={{
                  width: 0,
                  height: 0,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* ==================================================
                    CENTER IMAGE — big, clear, the "sun" of the orbit
                    ================================================== */}
                <motion.div
                  ref={cardRef}
                  className="absolute select-none"
                  style={{
                    left: 0,
                    top: 0,
                    width: IMAGE_SIZE,
                    transform: "translate(-50%, -50%) translateZ(0px)",
                    transformStyle: "preserve-3d",
                  }}
                  onMouseEnter={() => setIsHoveringImg(true)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <motion.div
                    className="relative rounded-3xl p-4"
                    style={{
                      transformStyle: "preserve-3d",
                      rotateX: isHoveringImg ? rotateX : 0,
                      rotateY: isHoveringImg ? rotateY : 0,
                    }}
                    animate={{ y: isHoveringImg ? -6 : 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    {/* Soft cyan aura behind the image */}
                    <motion.div
                      className="absolute -inset-6 rounded-3xl bg-linear-to-br from-cyan-500/35 via-transparent to-blue-500/35 blur-3xl"
                      animate={{
                        opacity: isHoveringImg ? 1 : 0.8,
                        scale: isHoveringImg ? 1.06 : 1,
                      }}
                      transition={{ duration: 0.4 }}
                      style={{ transform: "translateZ(-40px)" }}
                    />

                    {/* Frame */}
                    <div
                      className="absolute inset-0 rounded-3xl border-2 border-cyan-400/30 dark:border-cyan-400/20"
                      style={{ transform: "translateZ(0px)" }}
                    />

                    {/* Image */}
                    <div
                      className="relative rounded-2xl overflow-hidden"
                      style={{ transform: "translateZ(30px)" }}
                    >
                      <motion.img
                        src={image1}
                        alt="Skills visual"
                        className="w-full h-auto object-cover rounded-2xl shadow-2xl relative z-10"
                        animate={{ scale: isHoveringImg ? 1.03 : 1 }}
                        transition={{ duration: 0.4 }}
                      />

                      {/* Cursor-following glare */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{ background: glareBg }}
                        animate={{ opacity: isHoveringImg ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>

                    {/* Corner accent dots */}
                    <motion.div
                      className="absolute -top-2 -left-2 w-3 h-3 rounded-full bg-cyan-400"
                      style={{ transform: "translateZ(60px)" }}
                      animate={isHoveringImg ? { scale: [1, 1.5, 1] } : { scale: 1 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute -bottom-2 -right-2 w-3 h-3 rounded-full bg-blue-400"
                      style={{ transform: "translateZ(60px)" }}
                      animate={isHoveringImg ? { scale: [1, 1.5, 1] } : { scale: 1 }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                    />
                  </motion.div>
                </motion.div>

                {/* ==================================================
                    ORBIT RING — skills revolving around the image
                    ================================================== */}
                <motion.div
                  className="absolute cursor-grab active:cursor-grabbing"
                  onPointerDown={handlePointerDown}
                  style={{
                    left: 0,
                    top: 0,
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
                        style={{
                          position: "absolute",
                          left: -CARD_W / 2,
                          top: -CARD_H / 2,
                          width: CARD_W,
                          height: CARD_H,
                          transformStyle: "preserve-3d",
                          transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                        }}
                      >
                        {/* Static counter-rotation: undo the base angle */}
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            transformStyle: "preserve-3d",
                            transform: `rotateY(${-angle}deg)`,
                          }}
                        >
                          {/* Dynamic counter-rotation: undo the ring spin */}
                          <motion.div
                            style={{
                              width: "100%",
                              height: "100%",
                              transformStyle: "preserve-3d",
                              rotateY: inverseRotation,
                            }}
                          >
                            {/* ===== CARD ===== */}
                            <motion.div
                              whileHover={{ scale: 1.08 }}
                              transition={{ type: "spring", stiffness: 250, damping: 14 }}
                              className="relative w-full h-full flex flex-col items-center justify-center rounded-2xl 
                              border border-cyan-400/30 bg-white/40 dark:bg-white/5 
                              backdrop-blur-md text-gray-800 dark:text-gray-200 
                              overflow-visible group shadow-md hover:shadow-cyan-400/40 
                              transition-all duration-300"
                            >
                              {/* Horizontal rotating cyan ring (always spinning) */}
                              <motion.div
                                className="absolute -inset-3 rounded-full border-2 border-cyan-400/40 opacity-100 group-hover:opacity-100"
                                style={{
                                  transformStyle: "preserve-3d",
                                  borderLeftColor: "rgba(34,211,238,0.6)",
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
                                className="absolute -inset-3 rounded-full border-2 border-red-600 opacity-0 group-hover:opacity-100"
                                initial={{ rotateX: 0 }}
                                animate={{ rotateX: 360 }}
                                transition={{
                                  repeat: Infinity,
                                  duration: 3,
                                  ease: "linear",
                                }}
                                style={{
                                  transformStyle: "preserve-3d",
                                  borderLeftColor: "rgba(34,211,238,0.6)",
                                }}
                              />

                              {/* Icon */}
                              <div className="relative z-10 mb-3">{skill.icon}</div>

                              {/* Name */}
                              <span className="relative z-10 font-semibold tracking-wide text-sm sm:text-base text-center px-3 leading-tight">
                                {skill.name}
                              </span>

                              {/* Cyan glow on hover */}
                              <motion.div className="absolute inset-0 rounded-2xl bg-cyan-400/10 blur-md opacity-0 group-hover:opacity-100 transition-all duration-300" />
                            </motion.div>
                            {/* ===== /CARD ===== */}
                          </motion.div>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Drag hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-2 text-xs text-gray-400 dark:text-gray-500 flex items-center justify-center gap-2"
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

        {/* =============== QUOTE =============== */}
        <motion.div
          variants={fadeIn}
          custom={2}
          className="mt-16 sm:mt-20 text-center text-base sm:text-lg italic text-gray-500 dark:text-gray-400"
        >
          "Skill is the unified force of experience, intellect, and passion."
        </motion.div>
      </motion.div>
    </div>
  );
}