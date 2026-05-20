import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect, useState } from "react";

export default function About() {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: (custom: number = 0) => ({
      opacity: 1,
      x: 0,
      transition: { delay: custom * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: (custom: number = 0) => ({
      opacity: 1,
      x: 0,
      transition: { delay: custom * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <div className="relative pt-36 pb-24 px-6 sm:px-12 md:px-20 lg:px-32 font-[Outfit] overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-20 -left-20 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -Math.random() * 150 - 50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto"
      >
        {/* Profile Icon */}
        <motion.div
          variants={fadeInUp}
          custom={0}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
            className="inline-block"
          >
            <div className="w-24 h-24 bg-linear-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
              <span className="text-5xl">👨‍💻</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Heading */}
        <motion.div
          variants={fadeInUp}
          custom={1}
          className="text-center mb-12"
        >
          <motion.h1
            whileHover={{ scale: 1.05 }}
            className="text-5xl md:text-6xl font-bold mb-4 bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
          >
            About Me
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-linear-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"
          />
        </motion.div>

        {/* Intro Card */}
        <motion.div
          variants={fadeInUp}
          custom={2}
          whileHover={{ y: -5 }}
          className="bg-linear-to-br from-white/10 to-white/5 dark:from-gray-900/50 dark:to-gray-800/30 backdrop-blur-md rounded-3xl p-8 mb-16 shadow-2xl border border-cyan-400/20"
        >
          <motion.p
            className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed text-center"
          >
            Hi, I'm{" "}
            <motion.span 
              whileHover={{ scale: 1.1, display: "inline-block" }}
              className="dark:text-cyan-400 font-semibold cursor-pointer bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            >
              Kushagra Chhabra
            </motion.span>
            , a Mern-Stack developer who loves to turn creative ideas into dynamic, 
            user-focused experiences. My approach combines clean design, 
            efficient code, and interactive motion to bring websites to life.
          </motion.p>
        </motion.div>

        {/* Main Content Sections */}
        <div className="space-y-8">
          {/* My Journey */}
          <motion.div
            variants={fadeInLeft}
            custom={3}
            whileHover={{ x: 10 }}
            onMouseEnter={() => setHoveredSection("journey")}
            onMouseLeave={() => setHoveredSection(null)}
            className="group relative"
          >
            <div className="relative bg-white/10 dark:bg-gray-900/30 backdrop-blur-md rounded-2xl p-8 border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                  className="text-5xl"
                >
                  🚀
                </motion.div>
                <motion.h2
                  whileHover={{ x: 10 }}
                  className="text-2xl md:text-3xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
                >
                  My Journey
                </motion.h2>
              </div>
              <motion.p
                animate={{
                  opacity: hoveredSection === "journey" ? 0.9 : 1,
                }}
                className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg"
              >
                My journey in web development started with a simple curiosity about
                how websites worked. Over time, I learned the art of combining
                structure, style, and motion — using technologies like React,
                TypeScript, and Tailwind CSS. What began as experimentation has
                now become a passion for creating smooth, aesthetic, and purposeful
                digital experiences.
              </motion.p>
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-cyan-400 to-blue-500 rounded-full"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </motion.div>

          {/* What I Believe */}
          <motion.div
            variants={fadeInRight}
            custom={4}
            whileHover={{ x: -10 }}
            onMouseEnter={() => setHoveredSection("believe")}
            onMouseLeave={() => setHoveredSection(null)}
            className="group relative"
          >
            <div className="relative bg-white/10 dark:bg-gray-900/30 backdrop-blur-md rounded-2xl p-8 border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                  className="text-5xl"
                >
                  💡
                </motion.div>
                <motion.h2
                  whileHover={{ x: 10 }}
                  className="text-2xl md:text-3xl font-bold bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
                >
                  What I Believe
                </motion.h2>
              </div>
              <motion.p
                animate={{
                  opacity: hoveredSection === "believe" ? 0.9 : 1,
                }}
                className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg"
              >
                I believe that every project is a story waiting to be told — 
                through design, animation, and interactivity. My goal is to 
                make technology feel intuitive and enjoyable, while keeping 
                performance and accessibility at the core of everything I build.
              </motion.p>
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-purple-400 to-pink-500 rounded-full"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </motion.div>

          {/* Beyond Code */}
          <motion.div
            variants={fadeInLeft}
            custom={5}
            whileHover={{ x: 10 }}
            onMouseEnter={() => setHoveredSection("beyond")}
            onMouseLeave={() => setHoveredSection(null)}
            className="group relative"
          >
            <div className="relative bg-white/10 dark:bg-gray-900/30 backdrop-blur-md rounded-2xl p-8 border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                  className="text-5xl"
                >
                  🌎
                </motion.div>
                <motion.h2
                  whileHover={{ x: 10 }}
                  className="text-2xl md:text-3xl font-bold bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent"
                >
                  Beyond Code
                </motion.h2>
              </div>
              <motion.p
                animate={{
                  opacity: hoveredSection === "beyond" ? 0.9 : 1,
                }}
                className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg"
              >
                When I'm not coding, I enjoy exploring creative visuals, 
                diving into tech innovations, and learning how design and 
                motion can influence emotion. I'm always curious — not just 
                about what's possible, but about how to make it meaningful.
              </motion.p>
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-green-400 to-emerald-500 rounded-full"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </motion.div>
        </div>

        {/* Quote */}
        <motion.div
          variants={fadeInUp}
          custom={6}
          className="mt-20 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative inline-block w-full md:w-auto"
          >
            <div className="absolute -inset-4 bg-linear-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-xl" />
            <div className="relative bg-linear-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-md rounded-2xl p-8 border border-cyan-400/30">
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="text-6xl mb-4"
              >
                
              </motion.div>
              <p className="text-xl md:text-2xl italic text-gray-700 dark:text-gray-300 font-light leading-relaxed">
                Creativity is intelligence having fun.
              </p>
              <p className="mt-4 text-cyan-400 font-semibold">
                ~ Albert Einstein
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={fadeInUp}
          custom={7}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="relative inline-flex items-center gap-3 bg-linear-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-semibold overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="absolute inset-0 w-full h-full">
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <div className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-linear-to-r from-white/0 via-white/30 to-white/0" />
            </div>
            <span className="relative z-10">Let's Connect</span>
            <motion.div
              animate={{ x: 0 }}
              whileHover={{ x: 8 }}
              transition={{ duration: 0.3 }}
            >
              →
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}