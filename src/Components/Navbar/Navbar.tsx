import { useState, type ReactElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { Download, Menu, X, Linkedin, Github, Sun, Moon, Sparkles } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { toggleTheme, isDark } = useTheme();
  const location = useLocation();

  const floatingVariant: Variants = {
    float: {
      y: [0, -6, 0],
      transition: { duration: 3, ease: "easeInOut", repeat: Infinity },
    },
  };

  const pulseVariant: Variants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: { duration: 2, ease: "easeInOut", repeat: Infinity },
    },
  };

  const slideInVariant: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.08, duration: 0.45 },
    }),
  };

  const containerVariant: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const navigate = useNavigate();

  const icons: Icon[] = [
    {
      id: "linkedin",
      element: <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />,
      href: "https://www.linkedin.com/in/kushagra-chhabra-83b215355?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      hoverColor: "hover:text-cyan-400",
      external: true,
    },
    {
      id: "github",
      element: <Github className="w-5 h-5 sm:w-6 sm:h-6" />,
      href: "https://github.com",
      hoverColor: "hover:text-blue-400",
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
    { name: "Skills", path: "#skills" },
    { name: "Projects", path: "#projects" },
    { name: "About", path: "#about" },
    { name: "Contact", path: "/signup" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleScroll = (path: string) => {
    const sectionId = path.replace("#", "");

    if (path === "/" || path === "#home") {
      if (location.pathname !== "/") {
        navigate("/#home"); // use hash routing
      } else {
        const homeSection = document.getElementById("home");
        if (homeSection) {
          homeSection.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
      return;
    }

    if (path.startsWith("#")) {
      if (location.pathname !== "/") {
        navigate("/" + path); // e.g., "/#skills"
      } else {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    } else {
      navigate(path);
    }
  };



  return (
    <header className="fixed top-0 z-50 w-full px-4 py-3 font-[Outfit]">
      {/* NAVBAR */}
      <motion.nav
        className="w-full mx-auto px-5 py-3 flex justify-between items-center rounded-3xl backdrop-blur-xl border border-white/20 bg-linear-to-br from-slate-900/90 via-blue-900/85 to-cyan-900/90 dark:from-white/95 dark:via-blue-50/90 dark:to-cyan-50/95 shadow-2xl shadow-cyan-500/10 dark:shadow-blue-900/20"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Left: KC + Name (always visible) */}
        <motion.div
          className="flex items-center space-x-3 sm:space-x-4 cursor-pointer shrink-0"
          whileHover="float"
          variants={floatingVariant}
        >
          <motion.div className="relative border-2 border-cyan-400/80 rounded-full text-white flex items-center justify-center font-bold bg-linear-to-br from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 shadow-lg shadow-cyan-500/25 w-10 h-10 sm:w-12 sm:h-12">
            <span className="text-sm sm:text-base">KC</span>
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-cyan-300/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          <h1 className="text-base sm:text-lg md:text-xl font-[Roboto] font-bold bg-linear-to-r from-cyan-400 to-blue-400 dark:from-cyan-600 dark:to-blue-600 bg-clip-text text-transparent tracking-tight">
            Kushagra Chhabra
          </h1>
        </motion.div>

        {/* Middle: Resume + Icons (only on md, hidden on sm and lg) */}
        <div className="hidden md:flex lg:hidden items-center gap-3">
          <Link
            to="/resume"
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-linear-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 text-white font-semibold transition-all duration-200"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm">Resume</span>
          </Link>

          {icons.map((icon) =>
            icon.external ? (
              <a
                key={icon.id}
                href={icon.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-black/20 ${icon.hoverColor} transition-all duration-200`}
              >
                {icon.element}
              </a>
            ) : (
              <button
                key={icon.id}
                onClick={toggleTheme}
                className={`p-2 rounded-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-black/20 ${icon.hoverColor} transition-all duration-200`}
              >
                {icon.element}
              </button>
            )
          )}
        </div>

        {/* Large: Sections inline (visible on lg and up) */}
        <motion.div
          className="hidden xl:flex items-center gap-6"
          variants={containerVariant}
          initial="hidden"
          animate="visible"
        >
          {sections.map((section, index) => (
            <motion.div key={section.name} variants={slideInVariant} custom={index}>
              {section.path.startsWith("#") ? (
                // 🔹 Handle in-page scroll (like #about)
                <button
                  onClick={() => {
                    handleScroll(section.path);
                    setIsOpen(false);
                  }}
                  className="relative px-4 py-2 rounded-xl font-semibold transition-all duration-200 text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-black"
                >
                  {section.name}
                </button>
              ) : (
                // 🔹 Handle normal page navigation (like /signup)
                <Link
                  to={section.path}
                  onClick={() => setIsOpen(false)}
                  className={`relative px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${isActive(section.path)
                    ? "text-white dark:text-black bg-linear-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30"
                    : "text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-black"
                    }`}
                >
                  {section.name}
                </Link>
              )}
            </motion.div>

          ))}
        </motion.div>

        {/* Large: Resume + icons (visible on lg) */}
        <motion.div className="hidden lg:flex items-center gap-4" variants={containerVariant} initial="hidden" animate="visible">
          <motion.div variants={pulseVariant} animate="pulse">
            <Link
              to="/resume"
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-cyan-500 via-blue-500 to-sky-500 text-white font-semibold shadow-md transition-all duration-200"
            >
              <Download className="w-4 h-4" />
              <span>Resume</span>
              <Sparkles className="w-3 h-3 text-cyan-200" />
            </Link>
          </motion.div>

          {icons.map((icon) =>
            icon.external ? (
              <a
                key={icon.id}
                href={icon.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-black/20 ${icon.hoverColor} transition-all duration-200`}
              >
                {icon.element}
              </a>
            ) : (
              <button
                key={icon.id}
                onClick={toggleTheme}
                className={`p-3 rounded-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-black/20 ${icon.hoverColor} transition-all duration-200`}
              >
                {icon.element}
              </button>
            )
          )}
        </motion.div>

        {/* Hamburger (SM & MD): visible below lg */}
        <button
          className="block xl:hidden p-3 rounded-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-black/20 text-white dark:text-black"
          onClick={() => setIsOpen((s) => !s)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>

      {/* DROPDOWN (visible on screens < lg) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="xl:hidden fixed inset-x-4 top-20 mx-auto rounded-3xl backdrop-blur-xl border border-white/20 bg-linear-to-br from-slate-900/95 via-blue-900/90 to-cyan-900/95 dark:from-white/98 dark:via-blue-50/95 dark:to-cyan-50/98 shadow-2xl shadow-cyan-500/20 dark:shadow-blue-900/30 overflow-hidden z-50"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22 }}
          >
            <motion.div className="flex flex-col p-5 gap-3" variants={containerVariant} initial="hidden" animate="visible">
              {/* Sections (always show inside dropdown for small & md) */}
              {sections.map((section, idx) => (
                <motion.div key={section.name} variants={slideInVariant} custom={idx}>
                  {section.path.startsWith("#") ? (
                    <button
                      onClick={() => {
                        handleScroll(section.path);
                        setIsOpen(false);
                      }}
                      className="block w-full text-center px-4 py-3 rounded-xl font-semibold transition-all duration-150 text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-black hover:bg-white/10 dark:hover:bg-black/10"
                    >
                      {section.name}
                    </button>
                  ) : (
                    <Link
                      to={section.path}
                      onClick={() => setIsOpen(false)}
                      className={`block w-full text-center px-4 py-3 rounded-xl font-semibold transition-all duration-150 ${isActive(section.path)
                        ? "text-white dark:text-black bg-linear-to-r from-cyan-500/30 to-blue-500/30 border border-cyan-400/40"
                        : "text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-black hover:bg-white/10 dark:hover:bg-black/10"
                        }`}
                    >
                      {section.name}
                    </Link>
                  )}
                </motion.div>
              ))}


              {/* Resume + icons: Visible inside dropdown on SMALL SCREENS ONLY.
                  On MEDIUM screens the resume+icons are outside (in navbar), so inside the dropdown they are hidden via `md:hidden`. */}
              <div className="mt-2 md:hidden">
                <motion.div variants={pulseVariant} animate="pulse" className="mb-2">
                  <Link
                    to="/resume"
                    onClick={() => setIsOpen(false)}
                    className="flex justify-center items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-cyan-500 via-blue-500 to-sky-500 text-white font-semibold shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    <span>Resume</span>
                    <Sparkles className="w-3 h-3 text-cyan-200" />
                  </Link>
                </motion.div>

                <div className="flex justify-center gap-3">
                  {icons.map((icon) =>
                    icon.external ? (
                      <a
                        key={icon.id}
                        href={icon.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 rounded-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-black/20 ${icon.hoverColor}`}
                        onClick={() => setIsOpen(false)}
                      >
                        {icon.element}
                      </a>
                    ) : (
                      <button
                        key={icon.id}
                        onClick={() => {
                          toggleTheme();
                          setIsOpen(false);
                        }}
                        className={`p-3 rounded-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-black/20 ${icon.hoverColor}`}
                      >
                        {icon.element}
                      </button>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
