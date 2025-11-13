import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import CircularProgress from "@mui/material/CircularProgress";

export default function Project() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProjects = async () => {
      try {
        const res = await fetch("https://portfolio-server-u68u.onrender.com/get_all_project");
        const data = await res.json();
        setProjects(data.data);
      } catch (error) {
        console.log("Fetch Error: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <CircularProgress size={60} />
      </div>
    );
  }

  // Splitting projects based on category from backend
  const fullStackProjects = projects.filter(p => p.category === "Full Stack");
  const frontendProjects = projects.filter(p => p.category === "Frontend");

  return (
    <div
      id="projects"
      className="pt-16 pb-24 px-6 sm:px-12 md:px-20 lg:px-32 font-[Outfit] overflow-y-auto min-h-screen"
    >
      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-6xl mx-auto text-center">
        
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

        {/* Full Stack */}
        {fullStackProjects.length > 0 && (
          <Section title="⚙️ Full Stack Projects" projects={fullStackProjects} fadeIn={fadeIn} />
        )}

        {/* Frontend */}
        {frontendProjects.length > 0 && (
          <Section title="🎨 Frontend Projects" projects={frontendProjects} fadeIn={fadeIn} />
        )}

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

// ✅ Section Component (No Changes in UI — Only Data Coming From Backend)
function Section({ title, projects, fadeIn }: any) {
  return (
    <>
      <motion.h2 variants={fadeIn} className="text-2xl font-semibold text-cyan-400 mb-6">
        {title}
      </motion.h2>

      <motion.div variants={fadeIn} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-16 select-none">
        {projects.map((project: any, i: number) => (
          <motion.div
            key={project._id}
            variants={fadeIn}
            custom={i * 0.2}
            whileHover={{ scale: 1.05 }}
            className="relative group rounded-2xl border border-cyan-400/20 hover:border-cyan-400/50 shadow-lg overflow-hidden transition-all duration-300"
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-all duration-500"
              style={{ backgroundImage: `url(${project.profilePhoto?.secure_url})` }}
            ></div>

            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all duration-500"></div>

            <div className="relative z-10 p-6 backdrop-blur-[2px]">
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">{project.name}</h3>
              <p className="text-gray-200 text-sm mb-4 leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4 justify-center sm:justify-start">
                {project.tools?.map((tech: string) => (
                  <span
                    key={tech}
                    className="text-xs bg-cyan-400/20 text-cyan-200 px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex justify-center sm:justify-start gap-4 mt-3">
                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" className="flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-100">
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                )}

                {project.deploymentLink && (
                  <a href={project.deploymentLink} target="_blank" className="flex items-center gap-2 text-sm text-blue-300 hover:text-blue-100">
                    <ExternalLink className="w-4 h-4" /> Live
                  </a>
                )}
              </div>

            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
