import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect } from "react";
import { Github, ExternalLink } from "lucide-react";

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

  // 🔹 Full Stack Projects
  const fullStackProjects = [
    {
      title: "Portfolio Website",
      desc: "A fully responsive and animated portfolio built with React, TypeScript, and Tailwind CSS.",
      tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/Kushagra-369/portfolio-client",
      live: "https://portfolio-client-swart.vercel.app/",
    },
    {
      title: "Food King",
      desc: "A full-stack food ordering app with user authentication, cart, and admin dashboard.",
      tech: ["React", "JavaScript", "Node.js", "Express", "MongoDB", "JWT"],
      github: "https://github.com/Kushagra-369/food_client",
      live: "https://food-client-33mf.vercel.app/",
    },
    {
      title: "HCM",
      desc: "A Monsterverse present in the novel Empty Spaces.",
      tech: ["React", "Express", "MongoDB", "JWT", "JavaScript", "Node.js"],
      github: "https://github.com/Kushagra-369/HCM",
      live: "https://hcm-rho.vercel.app/",
    },
  ];

  // 🔹 Frontend Projects
  const frontendProjects = [
    {
      title: "Sekiro",
      desc: "A cinematic landing page inspired by Sekiro: Shadows Die Twice — focusing on animations and storytelling.",
      tech: ["HTML", "CSS", "JavaScript", "GSAP"],
      github: "https://github.com/Kushagra-369/Sekiro",
      live: "https://sekiro.vercel.app/",
    },
    {
      title: "Life is Strange",
      desc: "Interactive web experience with scroll-triggered animations and emotional storytelling.",
      tech: ["React", "Framer Motion", "Tailwind CSS"],
      github: "https://github.com/Kushagra-369/BEST-GAME",
      live: "https://best-game.vercel.app/",
    },
    {
      title: "Abandoned Places",
      desc: "A photography showcase website with responsive grid layout and smooth transitions.",
      tech: ["Next.js", "Tailwind CSS"],
      github: "https://github.com/Kushagra-369/abondoned-client",
      live: "https://abondoned-client.vercel.app/",
    },
  ];

  return (
    <div
      id="projects"
      className="pt-16 pb-24 px-6 sm:px-12 md:px-20 lg:px-32 font-[Outfit] overflow-y-auto min-h-screen"
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

        <motion.p
          variants={fadeIn}
          custom={1}
          className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto mb-12"
        >
          A showcase of my full-stack and frontend projects — combining design,
          logic, and performance.
        </motion.p>

        {/* 🔹 Full Stack Section */}
        <motion.h2
          variants={fadeIn}
          custom={2}
          className="text-2xl font-semibold text-cyan-400 mb-6"
        >
          ⚙️ Full Stack Projects
        </motion.h2>

        <motion.div
          variants={fadeIn}
          custom={3}
          className="grid grid-cols-1 select-none sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-16"
        >
          {fullStackProjects.map((project, i) => (
            <motion.div
              key={project.title}
              variants={fadeIn}
              custom={i * 0.2 + 4}
              whileHover={{ scale: 1.05 }}
              className="relative group bg-white/10 dark:bg-gray-900/40 backdrop-blur-md rounded-2xl border border-cyan-400/20 hover:border-cyan-400/50 shadow-lg transition-all duration-300 p-6 overflow-hidden"
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

              {/* GitHub + Live (added here) */}
              <div className="flex  justify-center sm:justify-start gap-4 mt-3 relative z-10">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-cyan-500 hover:text-cyan-400 transition-all cursor-pointer"
                  >
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                )}
                {project.live && project.live !== "#" && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" /> Live
                  </a>
                )}
              </div>

              {/* Hover Animations */}
              <motion.div
                className="absolute -inset-4 rounded-full border-2 border-cyan-400/60 opacity-0 group-hover:opacity-100 pointer-events-none z-0"
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
              <motion.div
                className="absolute inset-0 rounded-2xl bg-cyan-400/10 blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-0"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* 🔹 Frontend Section */}
        <motion.h2
          variants={fadeIn}
          custom={5}
          className="text-2xl font-semibold text-cyan-400 mb-6"
        >
          🎨 Frontend Projects
        </motion.h2>

        <motion.div
          variants={fadeIn}
          custom={6}
          className="grid select-none grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {frontendProjects.map((project, i) => (
            <motion.div
              key={project.title}
              variants={fadeIn}
              custom={i * 0.2 + 7}
              whileHover={{ scale: 1.05 }}
              className="relative group bg-white/10 dark:bg-gray-900/40 backdrop-blur-md rounded-2xl border border-cyan-400/20 hover:border-cyan-400/50 shadow-lg transition-all duration-300 p-6 overflow-hidden"
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

              {/* GitHub + Live (already here) */}
              <div className="flex justify-center sm:justify-start gap-4 mt-3 relative z-10">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-cyan-500 hover:text-cyan-400 transition-all cursor-pointer"
                  >
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                )}
                {project.live && project.live !== "#" && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" /> Live
                  </a>
                )}
              </div>

              {/* Hover Border + Glow */}
              <motion.div
                className="absolute -inset-4 rounded-full border-2 border-cyan-400/60 opacity-0 group-hover:opacity-100 pointer-events-none z-0"
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
              <motion.div
                className="absolute inset-0 rounded-2xl bg-cyan-400/10 blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-0"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Quote */}
        <motion.div
          variants={fadeIn}
          custom={10}
          className="mt-20 text-center text-lg italic text-gray-500 dark:text-gray-400"
        >
          “Every project is a story — told through code and creativity.”
        </motion.div>
      </motion.div>
    </div>
  );
}
