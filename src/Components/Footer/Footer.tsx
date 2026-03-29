import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Eye } from "lucide-react";
import { useEffect, useState } from "react";

export default function Footer() {

  const [loading, ] = useState(true);
  const [visitors, setVisitors] = useState<number | string>(0);

  useEffect(() => {
    const getVisitors = async () => {
      try {
        const res = await fetch("https://api.dhulluinity.com/count_visitor");
        const data = await res.json();

        setVisitors(data.count || data.visitors || data.total || 0);
      } catch (error) {
        console.log("Visitor API Error:", error);
        setVisitors("N/A");   // ✅ now allowed
      }
    };

    getVisitors();
  }, []);

  return (
    <footer
      className="w-full mt-20 bg-linear-to-t from-gray-100 via-gray-50 to-white 
      dark:from-slate-950 dark:via-blue-950 dark:to-cyan-950 
      text-gray-800 dark:text-white py-16 px-6 sm:px-12 font-[Outfit] border-t border-cyan-400/20"
    >

      <h1 className="text-center text-4xl font-extrabold tracking-wider 
      text-cyan-600 dark:text-cyan-400 mb-6">
        ADMIN
      </h1>

      {/* 🔥 Visitor Counter */}
      <div className="flex justify-center mb-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 px-6 py-3 rounded-full
          bg-cyan-500/10 border border-cyan-400/30 backdrop-blur-md shadow-lg"
        >
          <Eye className="text-cyan-500" />
          <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
            {loading ? "Counting Visitors..." : `Total Visitors: ${visitors}`}
          </span>
        </motion.div>
      </div>

      <motion.div
        className="max-w-6xl mx-auto flex flex-col md:flex-row 
        items-center md:items-start justify-center md:justify-between 
        gap-12 text-center md:text-left"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* 🔹 Left */}
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

        {/* 🔹 Middle */}
        <div className="flex-1 flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold text-cyan-500 mb-3">
            Quick Links
          </h3>
          <div className="flex flex-col gap-2 text-gray-600 dark:text-gray-300 text-sm">
            <a href="#home" className="hover:text-cyan-500 transition">Home</a>
            <a href="#skills" className="hover:text-cyan-500 transition">Skills</a>
            <a href="#projects" className="hover:text-cyan-500 transition">Projects</a>
            <a href="#about" className="hover:text-cyan-500 transition">About</a>
            <a href="#contact" className="hover:text-cyan-500 transition">Contact</a>
          </div>
        </div>

        {/* 🔹 Right */}
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
              className="text-gray-600 dark:text-gray-400 hover:text-cyan-500 transition"
            >
              <Github className="w-6 h-6" />
            </motion.a>

            <motion.a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="text-gray-600 dark:text-gray-400 hover:text-cyan-500 transition"
            >
              <Linkedin className="w-6 h-6" />
            </motion.a>

            <motion.a
              href="https://mail.google.com/mail/?view=cm&to=kushagra100chhabra@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="text-gray-600 dark:text-gray-400 hover:text-cyan-500 transition"
            >
              <Mail className="w-6 h-6" />
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Divider */}
      <div className="max-w-6xl mx-auto mt-10 h-px bg-linear-to-r from-transparent via-cyan-400/40 to-transparent" />

      {/* Bottom */}
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