import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect } from "react";

export default function About() {
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

  return (
    <div className="pt-36 pb-24 px-6 sm:px-12 md:px-20 lg:px-32 font-[Outfit] overflow-y-auto">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="max-w-5xl mx-auto text-center"
      >
        {/* Heading */}
        <motion.h1
          variants={fadeIn}
          custom={0}
          className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
        >
          About Me
        </motion.h1>

        {/* Intro */}
        <motion.p
          variants={fadeIn}
          custom={1}
          className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto"
        >
          Hi, I’m{" "}
          <span className="text-cyan-500 dark:text-cyan-400 font-semibold">
            Kushagra Chhabra
          </span>
          , a front-end developer who loves to turn creative ideas into dynamic, 
          user-focused experiences. My approach combines clean design, 
          efficient code, and interactive motion to bring websites to life.
        </motion.p>

        {/* Divider */}
        <motion.div
          variants={fadeIn}
          custom={2}
          className="my-12 w-24 h-1 bg-linear-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"
        />

        {/* My Journey */}
        <motion.div variants={fadeIn} custom={3} className="text-left space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-cyan-500 dark:text-cyan-400 mb-3">
              🚀 My Journey
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              My journey in web development started with a simple curiosity about
              how websites worked. Over time, I learned the art of combining
              structure, style, and motion — using technologies like React,
              TypeScript, and Tailwind CSS. What began as experimentation has
              now become a passion for creating smooth, aesthetic, and purposeful
              digital experiences.
            </p>
          </div>

          {/* What I Believe */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-500 dark:text-blue-400 mb-3">
              💡 What I Believe
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              I believe that every project is a story waiting to be told — 
              through design, animation, and interactivity. My goal is to 
              make technology feel intuitive and enjoyable, while keeping 
              performance and accessibility at the core of everything I build.
            </p>
          </div>

          {/* Beyond Code */}
          <div>
            <h2 className="text-2xl font-semibold text-cyan-500 dark:text-cyan-400 mb-3">
              🌎 Beyond Code
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              When I’m not coding, I enjoy exploring creative visuals, 
              diving into tech innovations, and learning how design and 
              motion can influence emotion. I’m always curious — not just 
              about what’s possible, but about how to make it meaningful.
            </p>
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div
          variants={fadeIn}
          custom={6}
          className="mt-20 text-center text-lg italic text-gray-500 dark:text-gray-400"
        >
          “Creativity is intelligence having fun.” — Albert Einstein
        </motion.div>
      </motion.div>
    </div>
  );
}
