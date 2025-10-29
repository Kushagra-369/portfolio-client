import { useState, type ReactElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { Download, Menu, X, Linkedin, Github, Sun, Moon, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../Context/ThemeContext";

interface Icon {
  id: string;
  element: ReactElement;
  href: string;
  hoverColor: string;
  external: boolean;
}

interface Section {
  name: string;
  path: string;
  icon?: ReactElement;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const { toggleTheme, isDark } = useTheme();
  const location = useLocation();

  const floatingVariant: Variants = {
    initial: { y: 0 },
    float: {
      y: [0, -8, 0],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  const pulseVariant: Variants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity
      }
    }
  };

  const slideInVariant: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  const containerVariant: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const icons: Icon[] = [
    {
      id: "linkedin",
      element: <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />,
      href: "https://linkedin.com",
      hoverColor: "hover:text-cyan-400",
      external: true,
    },
    {
      id: "github",
      element: <Github className="w-5 h-5 sm:w-6 sm:h-6" />,
      href: "https://github.com",
      hoverColor: "hover:text-purple-400",
      external: true,
    },
    {
      id: "theme",
      element: isDark ? (
        <Sun className="w-5 h-5 sm:w-6 sm:h-6" />
      ) : (
        <Moon className="w-5 h-5 sm:w-6 sm:h-6" />
      ),
      href: "",
      hoverColor: "hover:text-amber-400",
      external: false,
    },
  ];

  const sections: Section[] = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Skills", path: "/skills" },
    { name: "Contact", path: "/signup" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 z-50 w-full px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8 2xl:px-10 py-3 font-[Outfit]">
      <motion.nav 
        className="w-full mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 2xl:px-12 py-3 sm:py-4 md:py-3 flex rounded-3xl justify-between items-center backdrop-blur-xl border border-white/20 bg-gradient-to-br from-slate-900/90 via-purple-900/80 to-blue-900/90 dark:from-white/95 dark:via-purple-50/90 dark:to-blue-50/95 shadow-2xl shadow-purple-500/10 dark:shadow-purple-900/20"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Logo Section */}
        <motion.div 
          className="flex items-center space-x-3 sm:space-x-4 md:space-x-5 cursor-pointer flex-shrink-0 group"
          whileHover="float"
        >
          <motion.div
            className="relative border-2 border-cyan-400/80 rounded-full text-white flex items-center justify-center font-bold bg-gradient-to-br from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 shadow-lg shadow-cyan-500/25 dark:shadow-cyan-400/20 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
            variants={floatingVariant}
            whileHover={{ 
              scale: 1.1,
              rotate: 5,
              transition: { duration: 0.3 }
            }}
          >
            <span className="text-sm sm:text-base md:text-lg lg:text-xl">KC</span>
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-cyan-300/50"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
          
          <motion.div className="relative">
            <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-[Roboto] font-bold bg-gradient-to-r from-cyan-400 to-purple-400 dark:from-cyan-600 dark:to-purple-600 bg-clip-text text-transparent tracking-tight">
              Kushagra Chhabra
            </h1>
            <motion.div
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>

        {/* Desktop Nav Links */}
        <motion.div 
          className="hidden lg:flex items-center gap-6 xl:gap-8 2xl:gap-10"
          variants={containerVariant}
          initial="hidden"
          animate="visible"
        >
          {sections.map((section, index) => (
            <motion.div
              key={section.name}
              className="relative"
              variants={slideInVariant}
              custom={index}
              onHoverStart={() => setIsHovered(section.name)}
              onHoverEnd={() => setIsHovered(null)}
            >
              <Link
                to={section.path}
                className={`relative px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  isActive(section.path)
                    ? "text-white dark:text-black bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30"
                    : "text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-black"
                }`}
              >
                {section.name}
                {isActive(section.path) && (
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/20"
                    layoutId="activeSection"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
              
              {/* Hover effect */}
              {isHovered === section.name && !isActive(section.path) && (
                <motion.div
                  className="absolute inset-0 rounded-xl bg-white/5 border border-white/10"
                  layoutId="hoverSection"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Right Side: Download + Icons */}
        <motion.div 
          className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8 2xl:gap-10 flex-shrink-0"
          variants={containerVariant}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={pulseVariant} animate="pulse">
            <Link to="/resume" className="group relative">
              <span className="relative inline-block overflow-hidden rounded-2xl p-0.5">
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-pulse" />
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-2 bg-slate-900/95 dark:bg-white/95 px-4 py-2 sm:px-5 sm:py-3 rounded-xl text-white dark:text-black font-semibold backdrop-blur-xl group-hover:bg-slate-800/95 dark:group-hover:bg-gray-100/95 transition-colors duration-300">
                  <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Resume</span>
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </span>
            </Link>
          </motion.div>

          <motion.div className="flex items-center gap-3 sm:gap-4 lg:gap-5">
            {icons.map((icon, index) => (
              <motion.div
                key={icon.id}
                variants={slideInVariant}
                custom={index + sections.length}
              >
                {icon.external ? (
                  <motion.a
                    href={icon.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative p-3 rounded-2xl   `}
                    whileHover={{ 
                      scale: 1.1,
                      y: -2,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {icon.element}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-linear-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                ) : (
                  <motion.button
                    onClick={toggleTheme}
                    className={`relative p-3 rounded-2xl bg-white/5 dark:bg-black/5 border border-white/10 dark:border-black/10 ${icon.hoverColor} transition-all duration-300 group`}
                    whileHover={{ 
                      scale: 1.1,
                      y: -2,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {icon.element}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-linear-to-r from-amber-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden relative p-3 rounded-2xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-black/20 text-white dark:text-black"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isOpen ? "close" : "menu"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden fixed inset-x-4 top-24 mx-auto rounded-3xl backdrop-blur-xl border border-white/20 bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-blue-900/95 dark:from-white/98 dark:via-purple-50/95 dark:to-blue-50/98 shadow-2xl shadow-purple-500/20 dark:shadow-purple-900/30 overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <motion.div 
              className="flex flex-col p-6 space-y-4"
              variants={containerVariant}
              initial="hidden"
              animate="visible"
            >
              {sections.map((section, index) => (
                <motion.div
                  key={section.name}
                  variants={slideInVariant}
                  custom={index}
                >
                  <Link
                    to={section.path}
                    className={`block px-4 py-3 rounded-xl font-semibold text-center transition-all duration-300 ${
                      isActive(section.path)
                        ? "text-white dark:text-black bg-gradient-to-r from-cyan-500/30 to-purple-500/30 border border-cyan-400/50"
                        : "text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-black hover:bg-white/10 dark:hover:bg-black/10"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {section.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div 
                className="pt-4 border-t border-white/10 dark:border-black/10"
                variants={slideInVariant}
                custom={sections.length}
              >
                <Link
                  to="/resume"
                  className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 text-white dark:text-black font-semibold hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <Download className="w-5 h-5" />
                  <span>Download Resume</span>
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </Link>
              </motion.div>

              <motion.div 
                className="flex justify-center gap-6 pt-4"
                variants={slideInVariant}
                custom={sections.length + 1}
              >
                {icons.map((icon, index) =>
                  icon.external ? (
                    <motion.a
                      key={icon.id}
                      href={icon.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-black/20 ${icon.hoverColor} transition-all duration-300`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsOpen(false)}
                    >
                      {icon.element}
                    </motion.a>
                  ) : (
                    <motion.button
                      key={icon.id}
                      onClick={() => {
                        toggleTheme();
                        setIsOpen(false);
                      }}
                      className={`p-3 rounded-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-black/20 ${icon.hoverColor} transition-all duration-300`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {icon.element}
                    </motion.button>
                  )
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}