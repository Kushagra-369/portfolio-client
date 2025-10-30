import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect } from "react";

export default function Project() {
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

  const projects = [
    {
      title: "Portfolio Website",
      desc: "A fully responsive and animated portfolio built with React, TypeScript, and Tailwind CSS.",
      tech: ["React", "TypeScript", "Tailwind CSS"],
      link: "#",
    },
    {
      title: "Weather Dashboard",
      desc: "Real-time weather updates using OpenWeather API with sleek data visualization.",
      tech: ["Next.js", "API", "Framer Motion"],
      link: "#",
    },
    {
      title: "Task Manager App",
      desc: "A productivity app with CRUD operations, authentication, and animations.",
      tech: ["MongoDB", "Express", "Node.js", "React"],
      link: "#",
    },
    {
      title: "UI Design System",
      desc: "Custom UI components built for consistent styling and reusability across projects.",
      tech: ["Figma", "Design Tokens", "Accessibility"],
      link: "#",
    },
  ];

  return (
    <div
      id="projects"
      className="pt-16 pb-24 px-6 sm:px-12 md:px-20 lg:px-32 font-[Outfit] overflow-y-auto"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="max-w-6xl mx-auto text-center"
      >
        {/* Heading */}
        <motion.h1
          variants={fadeIn}
          custom={0}
          className="text-4xl md:text-5xl font-bold mb-8 bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
        >
          Projects
        </motion.h1>

        {/* Intro */}
        <motion.p
          variants={fadeIn}
          custom={1}
          className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto mb-12"
        >
          Here are some of my featured projects — showcasing creativity,
          functionality, and modern web technologies.
        </motion.p>

        {/* Projects Grid */}
        <motion.div
          variants={fadeIn}
          custom={2}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              variants={fadeIn}
              custom={i * 0.1 + 3}
              whileHover={{ scale: 1.05 }}
              className="relative group bg-white/10 dark:bg-gray-900/40 backdrop-blur-md rounded-2xl border border-cyan-400/20 hover:border-cyan-400/50 shadow-lg transition-all duration-300 p-6"
            >
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">
                {project.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                {project.desc}
              </p>
              <div className="flex flex-wrap gap-2 mb-4 justify-center sm:justify-start">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs bg-cyan-400/20 text-cyan-500 dark:text-cyan-300 px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <a
                href={project.link}
                className="inline-block text-sm font-medium text-cyan-500 hover:text-cyan-400 transition-all"
              >
                View Project →
              </a>

              {/* 🔵 Vertical hover ring (same as in Skills) */}
              <motion.div
                className="absolute -inset-4 rounded-full border-2 border-cyan-400/60 opacity-0 group-hover:opacity-100 pointer-events-none"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "linear",
                }}
                style={{
                  borderTopColor: "transparent",
                  borderLeftColor: "rgba(34,211,238,0.6)",
                }}
              />

              {/* Hover Glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-cyan-400/10 blur-md opacity-0 group-hover:opacity-100 transition-all duration-300"
              />
            </motion.div>

          ))}
        </motion.div>

        {/* Quote */}
        <motion.div
          variants={fadeIn}
          custom={6}
          className="mt-20 text-center text-lg italic text-gray-500 dark:text-gray-400"
        >
          “Every project is a story — told through code and creativity.”
        </motion.div>
      </motion.div>
    </div>
  );
}
