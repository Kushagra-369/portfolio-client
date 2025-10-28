import { useState } from "react";
import { motion, easeInOut } from "framer-motion";
import type { Variants } from "framer-motion";
import { Download, Menu, X, Linkedin, Github, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../../Context/ThemeContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const {  toggleTheme, isDark } = useTheme();

  const bounceVariant: Variants = {
    bounce: {
      y: [0, -10, 0],
      transition: { duration: 2, ease: easeInOut, repeat: Infinity, repeatDelay: 1 },
    },
  };

  const icons = [
    {
      id: "linkedin",
      element: <Linkedin className="w-6 h-6 xl:w-10 xl:h-10 2xl:w-14 2xl:h-14" />,
      href: "https://linkedin.com",
      hoverColor: "hover:text-yellow-400 dark:hover:text-red-600",
      external: true,
    },
    {
      id: "github",
      element: <Github className="w-6 h-6 xl:w-10 xl:h-10 2xl:w-14 2xl:h-14" />,
      href: "https://github.com",
      hoverColor: "hover:text-yellow-400 dark:hover:text-red-600",
      external: true,
    },
    {
      id: "theme",
      element: isDark ? (
        <Sun className="w-6 h-6 xl:w-10 xl:h-10 2xl:w-14 2xl:h-14" />
      ) : (
        <Moon className="w-6 h-6 xl:w-10 xl:h-10 2xl:w-14 2xl:h-14" />
      ),
      href: "",
      hoverColor: "hover:text-yellow-400 dark:hover:text-red-600",
      external: false,
    },
  ];

  const sections = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Skills", path: "/skills" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full px-5 py-2 font-[Outfit] shadow-md transition-colors duration-500 text-white dark:text-black ">
      <nav className="w-full mx-auto px-6 py-3 2xl:px-10 flex rounded-2xl justify-between items-center mt-3 backdrop-blur-md border border-gray-700/40  [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] dark:bg-white dark:[background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] transition-colors duration-500">
        {/* Logo */}
        <div className="flex items-center space-x-3 xl:space-x-10 2xl:space-x-14 cursor-pointer">
          <motion.div
            className="border-2 text-sm xl:text-xl 2xl:text-3xl border-blue-400 rounded-full w-8 h-8 sm:w-10 sm:h-10 lg:h-12 lg:w-12 xl:h-14 xl:w-14 text-white flex items-center justify-center font-bold hover:scale-105 transition duration-300 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"
            whileHover={{ rotate: 10, scale: 1.05 }}
          >
            KC
          </motion.div>
          <h1 className="text-sm sm:text-lg lg:text-xl xl:text-3xl 2xl:text-5xl font-[Roboto] font-semibold tracking-wide hover:text-yellow-400 dark:hover:text-red-600 transition duration-300">
            Kushagra Chhabra
          </h1>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-8">
          {sections.map((section) => (
            <Link
              key={section.name}
              to={section.path}
              className="text-white dark:text-black text-lg xl:text-2xl 2xl:text-5xl hover:text-yellow-400 dark:hover:text-red-600 font-extrabold transition duration-300"
            >
              {section.name}
            </Link>
          ))}
        </div>

        {/* Right Side: Download + Icons */}
        <div className="hidden md:flex items-center gap-8">
          <motion.div variants={bounceVariant} animate="bounce">
            <Link to="/resume" className="flex items-center gap-2">
              <span className="relative inline-block overflow-hidden rounded-full p-px">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <div className="inline-flex h-full w-full xl:text-2xl 2xl:text-5xl cursor-pointer items-center justify-center rounded-full text-black bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] dark:text-white px-4 py-2 text-sm font-medium backdrop-blur-3xl">
                  <Download className="w-4 h-4 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8 mr-2" />
                  Download
                </div>
              </span>
            </Link>
          </motion.div>

          <div className="flex items-center gap-5">
            {icons.map((icon) =>
              icon.external ? (
                <motion.a
                  key={icon.id}
                  href={icon.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${icon.hoverColor} transition xl:text-xl duration-300 cursor-pointer`}
                  variants={bounceVariant}
                  animate="bounce"
                >
                  {icon.element}
                </motion.a>
              ) : (
                <motion.div
                  key={icon.id}
                  variants={bounceVariant}
                  animate="bounce"
                  onClick={icon.id === "theme" ? toggleTheme : undefined}
                  className={`${icon.hoverColor} transition duration-300 cursor-pointer`}
                >
                  {icon.element}
                </motion.div>
              )
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden focus:outline-none text-white dark:text-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-800 text-black dark:text-white border-t border-gray-300 dark:border-gray-700 flex flex-col items-center py-4 space-y-4 animate-fadeIn transition-colors duration-500">
          {sections.map((section) => (
            <Link
              key={section.name}
              to={section.path}
              className="text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              {section.name}
            </Link>
          ))}

          <motion.div variants={bounceVariant} animate="bounce">
            <Link
              to="/resume"
              className="md:hidden flex items-center gap-2 hover:text-blue-400 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              <Download className="w-5 h-5" />
              <span>Download</span>
            </Link>
          </motion.div>

          <div className="md:hidden flex items-center gap-5">
            {icons.map((icon) =>
              icon.external ? (
                <motion.a
                  key={icon.id}
                  href={icon.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${icon.hoverColor} transition duration-300 cursor-pointer`}
                  variants={bounceVariant}
                  animate="bounce"
                >
                  {icon.element}
                </motion.a>
              ) : (
                <motion.div
                  key={icon.id}
                  variants={bounceVariant}
                  animate="bounce"
                  onClick={icon.id === "theme" ? toggleTheme : undefined}
                  className={`${icon.hoverColor} transition duration-300 cursor-pointer`}
                >
                  {icon.element}
                </motion.div>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}
