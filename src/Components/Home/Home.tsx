import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
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
  SiMui 
} from "react-icons/si";
import { Download, Mail, Sparkles, ArrowRight, Star } from "lucide-react";
import About from "../About/About";
import Skills from "../Skills/Skills";
import Project from "../Projects/Project";
import Signup from "../Contact/Signup";
import Footer from "../Footer/Footer";
export default function Home() {

  const location = useLocation();

  useEffect(() => {
    // Scroll to top or specific section after navigation
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
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [currentSkill, setCurrentSkill] = useState(0);

  const rotateX = useTransform(y, [-200, 200], [15, -15]);
  const rotateY = useTransform(x, [-200, 200], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    x.set(offsetX);
    y.set(offsetY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const skills = [
    {
      name: "JavaScript",
      icon: <SiJavascript className="text-yellow-400 text-2xl lg:text-3xl" />,
      gradient: "from-yellow-400 to-amber-600"
    },
    {
      name: "TypeScript",
      icon: <SiTypescript className="text-blue-600 text-2xl lg:text-3xl" />,
      gradient: "from-blue-600 to-blue-800"
    },
    {
      name: "React",
      icon: <SiReact className="text-cyan-400 text-2xl lg:text-3xl" />,
      gradient: "from-cyan-400 to-blue-600"
    },
    {
      name: "Next.js",
      icon: <SiNextdotjs className="text-white text-2xl lg:text-3xl" />,
      gradient: "from-gray-100 to-gray-300"
    },
    {
      name: "Tailwind CSS",
      icon: <SiTailwindcss className="text-teal-400 text-2xl lg:text-3xl" />,
      gradient: "from-teal-400 to-cyan-600"
    },
    {
      name: "Node.js",
      icon: <SiNodedotjs className="text-green-600 text-2xl lg:text-3xl" />,
      gradient: "from-green-600 to-green-800"
    },
    {
      name: "Express.js",
      icon: <SiExpress className="text-gray-300 text-2xl lg:text-3xl" />,
      gradient: "from-gray-300 to-gray-500"
    },
    {
      name: "MongoDB",
      icon: <SiMongodb className="text-green-500 text-2xl lg:text-3xl" />,
      gradient: "from-green-500 to-green-700"
    },
    {
      name: "Git",
      icon: <SiGit className="text-orange-600 text-2xl lg:text-3xl" />,
      gradient: "from-orange-600 to-red-600"
    },
    {
      name: "Figma",
      icon: <SiFigma className="text-indigo-500 text-2xl lg:text-3xl" />,
      gradient: "from-indigo-500 to-blue-600"
    },
    {
      name: "Material UI",
      icon: <SiMui className="text-blue-500 text-2xl lg:text-3xl" />,
      gradient: "from-blue-500 to-blue-700"
    }

  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const featuredSkills = skills.slice(0, 3);

  return (
    <div id="home" className="min-h-screen relative overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-20 sm:pb-28 lg:pb-32 px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-24 transition-colors duration-700">
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 bg-linear-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-linear-to-r from-teal-500/20 to-cyan-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      {/* Hero */}
      <div className="max-w-8xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16 xl:gap-24">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left max-w-2xl lg:max-w-xl xl:max-w-2xl"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="bg-linear-to-r from-cyan-400  via-blue-400 to-teal-400 bg-clip-text text-transparent">
                Kushagra
              </span>
              {" "}

              <span className="bg-linear-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                Chhabra
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
            >
              Full-Stack Developer &{" "}
              <span className="font-semibold text-cyan-600 dark:text-cyan-400">
                UI/UX Enthusiast
              </span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="text-base sm:text-lg text-gray-500 dark:text-gray-400 mb-10 leading-relaxed"
            >
              I craft <span className="font-semibold text-cyan-600 dark:text-cyan-400">digital experiences</span> that blend
              innovative design with cutting-edge technology. Specializing in modern web
              development with a focus on performance and user engagement.
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
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
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
                  <span className={`text-lg font-bold bg-linear-to-r ${featuredSkills[currentSkill].gradient} bg-clip-text text-transparent`}>
                    {featuredSkills[currentSkill].name}
                  </span>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* What I Do */}
            <section className="mt-20 mb-16 text-center lg:text-left">
              <h2 className="text-3xl font-bold mb-10 text-cyan-400">
                What I Do
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Frontend Development",
                    desc: "Crafting responsive, dynamic UIs using React, Next.js, and Tailwind CSS.",
                    icon: "💻",
                  },
                  {
                    title: "Backend Engineering",
                    desc: "Building scalable APIs with Node.js, Express, and MongoDB.",
                    icon: "⚙️",
                  },
                  {
                    title: "Animation & UX",
                    desc: "Enhancing user experiences using Framer Motion and creative design.",
                    icon: "🎨",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2, duration: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 dark:bg-gray-900/30 p-6 rounded-2xl border border-cyan-400/20 backdrop-blur-md hover:border-cyan-400/40 transition-all"
                  >
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="text-lg font-semibold text-cyan-400 mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{item.desc}</p>
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
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/signup"
                  className="group relative inline-flex items-center gap-3 bg-linear-to-r from-cyan-500 to-blue-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Mail className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Get In Touch</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/resume"
                  className="group inline-flex items-center gap-3 border-2 border-cyan-400 text-cyan-600 dark:text-cyan-400 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-all duration-300 backdrop-blur-sm"
                >
                  <Download className="w-5 h-5" />
                  <span>Download CV</span>
                  <Sparkles className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            ref={ref}
            className="relative shrink-0 w-full max-w-md lg:max-w-lg xl:max-w-xl"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY }}
            initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 via-blue-500/20 to-teal-500/20 rounded-3xl blur-xl animate-pulse" />
            <div className="relative bg-linear-to-br from-gray-900 via-blue-900 to-cyan-900 dark:from-gray-100 dark:via-blue-100 dark:to-cyan-100 rounded-3xl p-4 sm:p-6 shadow-2xl">
              <motion.div
                className="absolute -top-4 -left-4 w-8 h-8 bg-cyan-400 rounded-full shadow-lg"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -bottom-4 -right-4 w-6 h-6 bg-blue-400 rounded-full shadow-lg"
                animate={{
                  y: [0, 10, 0],
                  rotate: [360, 180, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="relative select-none rounded-2xl overflow-hidden bg-linear-to-br from-cyan-400/20 to-blue-400/20 p-2">
                <motion.img
                  src="https://res.cloudinary.com/dynodadq0/image/upload/v1761790870/unnamed_adxxjm.jpg"
                  alt="Kushagra Chhabra - Full Stack Developer"
                  className="w-full h-auto object-cover rounded-2xl shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                />
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-cyan-200 dark:border-cyan-800"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Available for work
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Skills Section */}
      <section id="skills" >
        <Skills />
      </section>
      {/* Projects Section */}
      <section id="projects" className="pt-10" >
        <Project />
      </section>
      {/* About Section */}
      <section id="about" >
        <About />
      </section>
      {/* Signup Section */}
      <section id="contact" >
        <Signup />
      </section>
      {/* Footer Section */}  
      <section id="footer" >
        <Footer />
      </section>
    </div>
  );
}
