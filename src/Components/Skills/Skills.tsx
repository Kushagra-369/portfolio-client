import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect } from "react";
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
  SiFramer,
  SiMui
} from "react-icons/si";

export default function Skills() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  const skills = [
    { name: "JavaScript", icon: <SiJavascript className="text-yellow-400 text-3xl sm:text-4xl" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-blue-600 text-3xl sm:text-4xl" /> },
    { name: "React.js", icon: <SiReact className="text-cyan-400 text-3xl sm:text-4xl" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-gray-200 dark:text-gray-100 text-3xl sm:text-4xl" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-400 text-3xl sm:text-4xl" /> },
    { name: "Framer Motion", icon: <SiFramer className="text-pink-500 text-3xl sm:text-4xl" /> },
    { name: "Node.js", icon: <SiNodedotjs className="text-green-600 text-3xl sm:text-4xl" /> },
    { name: "Express.js", icon: <SiExpress className="text-gray-400 text-3xl sm:text-4xl" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-green-500 text-3xl sm:text-4xl" /> },
    { name: "Git", icon: <SiGit className="text-orange-600 text-3xl sm:text-4xl" /> },
    { name: "Figma", icon: <SiFigma className="text-indigo-500 text-3xl sm:text-4xl" /> },
    { name: "Material UI", icon: <SiMui className="text-blue-500 text-2xl sm:text-3xl" /> },
  ];

  return (
    <div className="pt-32 pb-24 px-4 sm:px-8 md:px-20 lg:px-32 font-[Outfit] overflow-y-auto">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="max-w-5xl mx-auto text-center"
      >
        {/* Title */}
        <motion.h1
          variants={fadeIn}
          custom={0}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 
          bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
        >
          ⚙️ Skills & Tools
        </motion.h1>

        {/* Skills Grid */}
        <motion.div variants={fadeIn} custom={1}>
          <div className="grid grid-cols-2 select-none sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                variants={fadeIn}
                custom={i * 0.1 + 5}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 250, damping: 12 }}
                className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 
                flex flex-col items-center justify-center rounded-2xl 
                border border-cyan-400/30 bg-white/30 dark:bg-white/5 
                backdrop-blur-md text-gray-800 dark:text-gray-200 
                overflow-visible group shadow-md hover:shadow-cyan-400/30 
                transition-all duration-300 mx-auto"
              >
                {/* Horizontal rotating ring */}
                <motion.div
                  className="absolute -inset-4 sm:-inset-5 rounded-full border-2 border-cyan-400/40 opacity-100 
                  group-hover:opacity-100"
                  style={{
                    transformStyle: "preserve-3d", borderLeftColor: "rgba(34,211,238,0.6)",
                  }}
                  initial={{ rotateX: 0 }}
                  animate={{ rotateY: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: "linear",
                  }}
                />

                {/* Vertical hover ring */}
                <motion.div
                  className="absolute -inset-4 sm:-inset-5 rounded-full border-2 border-red-600 opacity-0 
                  group-hover:opacity-100"
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
                <div className="relative z-10 mb-2">{skill.icon}</div>

                {/* Skill Name */}
                <span className="relative z-10 font-semibold tracking-wide text-sm sm:text-base md:text-lg">
                  {skill.name}
                </span>

                {/* Subtle glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-cyan-400/10 blur-md opacity-0 
                  group-hover:opacity-100 transition-all duration-300"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div
          variants={fadeIn}
          custom={2}
          className="mt-16 sm:mt-20 text-center text-base sm:text-lg italic text-gray-500 dark:text-gray-400"
        >
          “Skill is the unified force of experience, intellect, and passion.”
        </motion.div>
      </motion.div>
    </div>
  );
}
