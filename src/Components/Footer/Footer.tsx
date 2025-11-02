import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="w-full mt-20 bg-linear-to-t from-gray-100 via-gray-50 to-white 
      dark:from-slate-950 dark:via-blue-950 dark:to-cyan-950 
      text-gray-800 dark:text-white py-16 px-6 sm:px-12 font-[Outfit] border-t border-cyan-400/20"
    >
      <motion.div
        className="max-w-6xl mx-auto flex flex-col md:flex-row 
        items-center md:items-start justify-center md:justify-between 
        gap-12 text-center md:text-left"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* 🔹 Left Section */}
        <div className="flex-1 flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-bold bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent mb-3">
            KC Kushagra Chhabra
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base max-w-md">
            Passionate Full Stack Developer focused on creating immersive and
            efficient digital experiences through clean code, creative design,
            and performance-driven development.
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm mt-3">
            © {new Date().getFullYear()} All Rights Reserved.
          </p>
        </div>

        {/* 🔹 Middle Section */}
        <div className="flex-1 flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold text-cyan-500 mb-3">
            Quick Links
          </h3>
          <div className="flex flex-col gap-2 text-gray-600 dark:text-gray-300 text-sm">
            <a
              href="#home"
              className="hover:text-cyan-500 transition-colors duration-300"
            >
              Home
            </a>
            <a
              href="#skills"
              className="hover:text-cyan-500 transition-colors duration-300"
            >
              Skills
            </a>
            <a
              href="#projects"
              className="hover:text-cyan-500 transition-colors duration-300"
            >
              Projects
            </a>
            <a
              href="#about"
              className="hover:text-cyan-500 transition-colors duration-300"
            >
              About
            </a>
            <a
              href="#contact"
              className="hover:text-cyan-500 transition-colors duration-300"
            >
              Contact
            </a>
          </div>
        </div>

        {/* 🔹 Right Section (Contact) */}
        <div className="flex-1 flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold text-cyan-500 mb-3">
            Connect With Me
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 max-w-xs">
            Let’s connect for collaborations, projects, or opportunities.
          </p>
          <div className="flex gap-6 justify-center md:justify-start">
            <motion.a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="text-gray-600 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-all"
            >
              <Github className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="text-gray-600 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-all"
            >
              <Linkedin className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="https://mail.google.com/mail/?view=cm&to=kushagra100chhabra@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="text-gray-600 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-all"
            >
              <Mail className="w-6 h-6" />
            </motion.a>

          </div>
        </div>
      </motion.div>

      {/* 🌈 Gradient Divider */}
      <div className="max-w-6xl mx-auto mt-10 h-px bg-linear-to-r from-transparent via-cyan-400/40 to-transparent" />

      {/* Bottom Text */}
      <motion.div
        className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Designed & Built by{" "}
        <span className="text-cyan-500 dark:text-cyan-400 font-medium">
          Kushagra Chhabra
        </span>{" "}
        ✨
      </motion.div>
    </footer>
  );
}
