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

export default function Skills() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ==================== LEFT: Image 3D tilt (Home-style) ====================
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

  // ==================== RIGHT: Controllable cylinder ====================
  const rotation = useMotionValue<number>(0);
  const inverseRotation = useTransform(rotation, (v) => -v);
  const isDragging = useRef<boolean>(false);
  const lastX = useRef<number>(0);

  // 🐢 Slow auto-spin
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
    // Frontend
    {
      name: "JavaScript",
      icon: <SiJavascript className="text-yellow-400 text-5xl sm:text-6xl" />,
    },
    {
      name: "TypeScript",
      icon: <SiTypescript className="text-blue-600 text-5xl sm:text-6xl" />,
    },
    {
      name: "React.js",
      icon: <SiReact className="text-cyan-400 text-5xl sm:text-6xl" />,
    },
    {
      name: "Next.js",
      icon: <SiNextdotjs className="text-gray-200 dark:text-gray-100 text-5xl sm:text-6xl" />,
    },
    {
      name: "Tailwind CSS",
      icon: <SiTailwindcss className="text-teal-400 text-5xl sm:text-6xl" />,
    },
    {
      name: "Framer Motion",
      icon: <SiFramer className="text-pink-500 text-5xl sm:text-6xl" />,
    },
    {
      name: "HTML5",
      icon: <SiHtml5 className="text-orange-500 text-5xl sm:text-6xl" />,
    },
    {
      name: "CSS3",
      icon: <SiCss3 className="text-blue-500 text-5xl sm:text-6xl" />,
    },

    // Backend
    {
      name: "Node.js",
      icon: <SiNodedotjs className="text-green-600 text-5xl sm:text-6xl" />,
    },
    {
      name: "Express.js",
      icon: <SiExpress className="text-gray-400 text-5xl sm:text-6xl" />,
    },
    {
      name: "FastAPI",
      icon: <SiFastapi className="text-teal-400 text-5xl sm:text-6xl" />,
    },

    // Programming
    {
      name: "Python",
      icon: <SiPython className="text-yellow-300 text-5xl sm:text-6xl" />,
    },
    {
      name: "C++",
      icon: <SiCplusplus className="text-blue-500 text-5xl sm:text-6xl" />,
    },

    // AI / ML
    {
      name: "PyTorch",
      icon: <SiPytorch className="text-orange-500 text-5xl sm:text-6xl" />,
    },

    {
      name: "Pandas",
      icon: <SiPandas className="text-indigo-400 text-5xl sm:text-6xl" />,
    },
    {
      name: "NumPy",
      icon: <SiNumpy className="text-blue-400 text-5xl sm:text-6xl" />,
    },

    // Databases
    {
      name: "MongoDB",
      icon: <SiMongodb className="text-green-500 text-5xl sm:text-6xl" />,
    },
    {
      name: "PostgreSQL",
      icon: <SiPostgresql className="text-blue-400 text-5xl sm:text-6xl" />,
    },
    {
      name: "MySQL",
      icon: <SiMysql className="text-blue-500 text-5xl sm:text-6xl" />,
    },

    // Tools
    {
      name: "Git",
      icon: <SiGit className="text-orange-600 text-5xl sm:text-6xl" />,
    },
    {
      name: "GitHub",
      icon: <SiGithub className="text-gray-200 text-5xl sm:text-6xl" />,
    },
    {
      name: "Linux",
      icon: <SiLinux className="text-yellow-300 text-5xl sm:text-6xl" />,
    },
    {
      name: "AWS",
      icon: <SiAmazonwebservices className="text-orange-400 text-5xl sm:text-6xl" />,
    },
    {
      name: "Vercel",
      icon: <SiVercel className="text-gray-900 dark:text-white text-5xl sm:text-6xl" />,
    },
    {
      name: "Render",
      icon: <SiRender className="text-purple-400 text-5xl sm:text-6xl" />,
    },

    // UI / Design
    {
      name: "Figma",
      icon: <SiFigma className="text-indigo-500 text-5xl sm:text-6xl" />,
    },
    {
      name: "Material UI",
      icon: <SiMui className="text-blue-500 text-4xl sm:text-5xl" />,
    },
  ];

  // Cylinder geometry
  const CARD_W = 200;
  const CARD_H = 260;

  // Larger radius prevents cards from overlapping
  const RADIUS = 900;

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
          className="text-center text-3xl sm:text-4xl md:text-5xl font-bold mb-14 sm:mb-20 bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
        >
          ⚙️ Skills & Tools
        </motion.h1>

        {/* =============== TWO-COLUMN LAYOUT =============== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-4 items-center">

          {/* =================================================
              LEFT: IMAGE — hugs viewport left edge,
              wall-mounted slant FIXED
              ================================================= */}
          <div className="flex justify-start order-2 lg:order-1 -ml-4 sm:-ml-8 md:-ml-12 lg:-ml-16 xl:-ml-24 2xl:-ml-28">
            {/* Perspective root */}
            <div
              style={{
                perspective: 1400,
                perspectiveOrigin: "30% 50%",
              }}
            >
              {/* Wall-mount slant — FIXED:
                  left side goes INTO wall, right side comes OUT toward viewer */}
              <div
                style={{
                  transform: "rotateY(22deg) rotateX(4deg) rotateZ(1.2deg)",
                  transformOrigin: "left center",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Hover interaction wrapper */}
                <motion.div
                  ref={cardRef}
                  className="relative select-none w-full max-w-104 sm:max-w-lg lg:max-w-160 xl:max-w-184"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  onMouseEnter={() => setIsHoveringImg(true)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{ transformStyle: "preserve-3d" }}
                >
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
                    {/* Soft depth glow */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl bg-linear-to-br from-cyan-500/20 via-transparent to-blue-500/20 blur-2xl"
                      animate={{
                        opacity: isHoveringImg ? 0.9 : 0.5,
                        scale: isHoveringImg ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.4 }}
                      style={{ transform: "translateZ(-40px)" }}
                    />

                    {/* Frame border */}
                    <div
                      className="absolute inset-0 rounded-3xl border border-cyan-400/20 dark:border-cyan-400/10"
                      style={{ transform: "translateZ(0px)" }}
                    />

                    {/* Wall shadow — now cast to the LEFT (light from right) */}
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
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT: 3D CYLINDER
              ================================================= */}
          <div className="flex flex-col items-center justify-center order-1 lg:order-2">
            <div
              className="relative w-full flex items-center justify-center"
              style={{ height: 560 }}
            >
              {/* Floor glow */}
              <div className="absolute bottom-12 w-[620px] max-w-[92vw] h-28 rounded-[100%] bg-cyan-500/20 blur-3xl pointer-events-none" />

              {/* Responsive scale so cylinder fits in column */}
              <div className="scale-[0.52] sm:scale-[0.58] md:scale-[0.62] lg:scale-[0.55] xl:scale-[0.62] origin-center">
                {/* Perspective context */}
                <div
                  style={{
                    width: CARD_W,
                    height: CARD_H,
                    perspective: 1800,
                    perspectiveOrigin: "50% 50%",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Revolving ring — draggable */}
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
                          {/* Static counter-rotation (base angle) */}
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              transformStyle: "preserve-3d",
                              transform: `rotateY(${-angle}deg)`,
                            }}
                          >
                            {/* Dynamic counter-rotation so card always faces viewer */}
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
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 250, damping: 12 }}
                                className="relative w-full h-full flex flex-col items-center justify-center rounded-2xl 
                                border border-cyan-400/30 bg-white/30 dark:bg-white/5 
                                backdrop-blur-md text-gray-800 dark:text-gray-200 
                                overflow-visible group shadow-md hover:shadow-cyan-400/30 
                                transition-all duration-300"
                              >
                                {/* Horizontal rotating cyan ring */}
                                <motion.div
                                  className="absolute -inset-4 sm:-inset-5 rounded-full border-2 border-cyan-400/40 opacity-100 group-hover:opacity-100"
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
                                  className="absolute -inset-4 sm:-inset-5 rounded-full border-2 border-red-600 opacity-0 group-hover:opacity-100"
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
                                <div className="relative z-10 mb-3 scale-90">
                                  {skill.icon}
                                </div>

                                <span className="relative z-10 font-semibold tracking-wide text-base sm:text-lg text-center px-3">
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
          </div>
        </div>

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