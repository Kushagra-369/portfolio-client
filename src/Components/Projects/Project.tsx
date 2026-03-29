import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { Github, ExternalLink } from "lucide-react";

// Complete static project data with all fields from your JSON
const staticProjects = [
  {
    _id: "6910c9d084a2c11a9b7f6ab5",
    profilePhoto: {
      _id: "6910c9d084a2c11a9b7f6ab6",
      public_id: "course/j1ucqrbg3llkgmczxp76",
      secure_url: "https://res.cloudinary.com/dynodadq0/image/upload/v1762707919/course/j1ucqrbg3llkgmczxp76.jpg"
    },
    name: "Sekiro",
    description: "A cinematic landing page inspired by Sekiro: Shadows Die Twice — focusing on immersive design and smooth animations.",
    tools: ["Css", "JavaScipt", "Framer-Motion", "React"],
    githubLink: "https://github.com/Kushagra-369/Sekiro",
    deploymentLink: "https://sekiro.vercel.app/",
    category: "Frontend",
    isDeleted: false,
    createdAt: "2025-11-09T17:05:20.297+00:00",
    updatedAt: "2025-11-09T17:05:20.297+00:00",
    __v: 0
  },
  {
    _id: "6910ca6784a2c11a9b7f6ab8",
    profilePhoto: {
      _id: "6910ca6784a2c11a9b7f6ab9",
      public_id: "course/r0saxyqjivs8adhbcpmd",
      secure_url: "https://res.cloudinary.com/dynodadq0/image/upload/v1762708070/course/r0saxyqjivs8adhbcpmd.jpg"
    }, // No image data for this project
    name: "Life is Strange",
    description: "Interactive web experience with scroll-triggered animations and emotional storytelling through code.",
    tools: ["React", "Framer Motion", "CSS", "GSAP"],
    githubLink: "https://github.com/Kushagra-369/BEST-GAME",
    deploymentLink: "https://best-game.vercel.app/",
    category: "Frontend",
    isDeleted: false,
    createdAt: "2025-11-09T17:07:51.432+00:00",
    updatedAt: "2025-11-09T17:07:51.432+00:00",
    __v: 0
  },
  {
    _id: "6910d56e84a2c11a9b7f6add",
    profilePhoto: {
      _id: "6910d56e84a2c11a9b7f6ade",
      public_id: "course/raqip9kg6sg1i5bh6sbm",
      secure_url: "https://res.cloudinary.com/dynodadq0/image/upload/v1762710893/course/raqip9kg6sg1i5bh6sbm.jpg"
    },
    name: "HCM",
    description: "A Monsterverse present in the novel Empty Spaces. Full-stack application with authentication and real-time features.",
    tools: ["React", "JavaScript", "MongoDB", "Postman", "express", "Nodejs", "JWT"],
    githubLink: "https://github.com/Kushagra-369/HCM",
    deploymentLink: "https://hcm-rho.vercel.app/",
    category: "Full Stack",
    isDeleted: false,
    createdAt: "2025-11-09T17:54:54.648+00:00",
    updatedAt: "2025-11-09T17:54:54.648+00:00",
    __v: 0
  },
  {
    _id: "6910d5d584a2c11a9b7f6ae0",
    profilePhoto: {
      _id: "6910d5d584a2c11a9b7f6ae1",
      public_id: "course/fark0wcx2xk9d5bqaani",
      secure_url: "https://res.cloudinary.com/dynodadq0/image/upload/v1762710996/course/fark0wcx2xk9d5bqaani.jpg"
    },
    name: "Abandoned Places",
    description: "A photography showcase website with responsive grid layout and smooth transitions. Perfect for visual storytelling.",
    tools: ["TailwindCss", "JavaScript", "React", "Framer-Motion"],
    githubLink: "https://github.com/Kushagra-369/abondoned-client",
    deploymentLink: "https://abondoned-client.vercel.app/",
    category: "Frontend",
    isDeleted: false,
    createdAt: "2025-11-09T17:56:37.691+00:00",
    updatedAt: "2025-11-09T17:56:37.691+00:00",
    __v: 0
  },
  {
    _id: "6910c8c884a2c11a9b7f6aaf",
    profilePhoto: {
      _id: "6910c8c884a2c11a9b7f6ab0",
      public_id: "course/nwvtys4iz1tzmfczglxp",
      secure_url: "https://res.cloudinary.com/dynodadq0/image/upload/v1762707655/course/nwvtys4iz1tzmfczglxp.jpg"
    },
    name: "My Portfolio",
    description: "A fully responsive and animated portfolio built with React, TypeScript, and Framer Motion. Showcasing projects and skills.",
    tools: ["React", "TypeScript", "Framer Motion", "TailwindCSS", "Node.js", "Express"],
    githubLink: "https://github.com/Kushagra-369/portfolio-client",
    deploymentLink: "https://portfolio-client-swart.vercel.app/",
    category: "Full Stack",
    isDeleted: false,
    createdAt: "2025-11-09T17:00:56.538+00:00",
    updatedAt: "2025-11-09T17:00:56.538+00:00",
    __v: 0
  },
  {
    _id: "6910c93584a2c11a9b7f6ab2",
    profilePhoto: {
      _id: "6910c93584a2c11a9b7f6ab3",
      public_id: "course/jjsbdelj7n1zg7hoejdd",
      secure_url: "https://res.cloudinary.com/dynodadq0/image/upload/v1762707764/course/jjsbdelj7n1zg7hoejdd.jpg"
    },
    name: "Food King",
    description: "A full-stack food ordering app with user authentication, cart, and admin panel. Integrated payment gateway and real-time order tracking.",
    tools: ["React", "JavaScript", "Framer-Motion", "Express", "MongoDB", "Postman", "Nodejs", "JWT"],
    githubLink: "https://github.com/Kushagra-369/food_client",
    deploymentLink: "https://food-client-33mf.vercel.app/",
    category: "Full Stack",
    isDeleted: false,
    createdAt: "2025-11-09T17:02:45.184+00:00",
    updatedAt: "2025-11-09T17:02:45.184+00:00",
    __v: 0
  },
];

// Fallback gradient colors for projects without images
const gradientColors = [
  "from-purple-900 to-blue-900",
  "from-emerald-900 to-cyan-900",
  "from-orange-900 to-red-900",
  "from-pink-900 to-rose-900",
  "from-indigo-900 to-violet-900"
];

export default function Project() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Simulate loading for smooth transition (optional)
    const timer = setTimeout(() => {
      setProjects(staticProjects);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
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
        <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Splitting projects based on category
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
          className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
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

function Section({ title, projects, fadeIn }: any) {
  return (
    <>
      <motion.h2 variants={fadeIn} className="text-2xl font-semibold text-cyan-400 mb-6">
        {title}
      </motion.h2>

      <motion.div variants={fadeIn} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-16 select-none">
        {projects.map((project: any, i: number) => {
          // Get consistent gradient based on project index
          const gradientIndex = i % gradientColors.length;

          return (
            <motion.div
              key={project._id}
              variants={fadeIn}
              custom={i * 0.2}
              whileHover={{ scale: 1.05 }}
              className="relative group rounded-2xl border border-cyan-400/20 hover:border-cyan-400/50 shadow-lg overflow-hidden transition-all duration-300"
            >
              {/* Background - either image or gradient */}
              {project.profilePhoto?.secure_url ? (
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-all duration-500"
                  style={{ backgroundImage: `url(${project.profilePhoto.secure_url})` }}
                ></div>
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${gradientColors[gradientIndex]} opacity-60 group-hover:opacity-80 transition-all duration-500`}></div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all duration-500"></div>

              {/* Content */}
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
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-100 transition-colors"
                    >
                      <Github className="w-4 h-4" /> GitHub
                    </a>
                  )}

                  {project.deploymentLink && (
                    <a
                      href={project.deploymentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-blue-300 hover:text-blue-100 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" /> Live
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </>
  );
}