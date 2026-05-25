import { useState, useEffect, type ReactElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import axios from "axios";
import { Download, Menu, X, Linkedin, Github, Sun, Moon, Sparkles } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../Context/ThemeContext";
import { APIURL } from "../../GlobalAPIURL"
import {
  Home as HomeIcon,
  Build as SkillsIcon,
  Work as ProjectsIcon,
  Info as AboutIcon,
  ContactMail as ContactIcon,
  ArrowDownward as FooterIcon,
} from "@mui/icons-material";

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

interface AdminData {
  name: string;
  socialLinks: { name: string; link: string }[];
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { toggleTheme, isDark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // 🟢 default fallback values
  const [admin, setAdmin] = useState<AdminData>({
    name: "Kushagra Chhabra",
    socialLinks: [
      { name: "LinkedIn", link: "https://www.linkedin.com/in/kushagra-chhabra-83b215355" },
      { name: "GitHub", link: "https://github.com/Kushagra-369" },
    ],
  });

  // 🟢 Fetch admin data from backend
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axios.get(`${APIURL}/get_new_profile`);
        const profile = res.data?.adminProfiles?.[0];
        if (profile) {
          setAdmin({
            name: profile.name,
            socialLinks: profile.socialLinks || [],
          });
        }
      } catch {
        console.warn("⚠️ Backend not reachable — using fallback data");
      }
    };
    fetchAdmin();
  }, []);

  // Track mouse position for 3D tilt effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 🟢 Safe social links
  const linkedin =
    admin.socialLinks.find((l) => l.name.toLowerCase() === "linkedin")?.link ||
    "https://www.linkedin.com/in/kushagra-chhabra-83b215355";
  const github =
    admin.socialLinks.find((l) => l.name.toLowerCase() === "github")?.link ||
    "https://github.com/Kushagra-369";

  // 🔹 Enhanced Animations
  const floatingVariant: Variants = {
    float: {
      y: [0, -8, 0],
      rotate: [0, 2, -2, 0],
      transition: { duration: 3, ease: "easeInOut", repeat: Infinity }
    },
  };

  const bounceVariant: Variants = {
    rest: { scale: 1, y: 0 },
    hover: {
      scale: 1.08,
      y: -4,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95, transition: { duration: 0.1 } }
  };

  const iconHoverVariant: Variants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.08,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };
  const sectionHoverVariant: Variants = {
    rest: { x: 0, scale: 1 },
    hover: {
      x: 6,
      scale: 1.02,
      transition: { type: "spring", stiffness: 400, damping: 15 }
    }
  };

  const navTiltVariant: Variants = {
    initial: { rotateX: 0, rotateY: 0, boxShadow: "0 20px 40px -20px rgba(0,0,0,0.3)" },
    animate: {
      rotateX: (mousePosition.y / window.innerHeight - 0.5) * 3,
      rotateY: (mousePosition.x / window.innerWidth - 0.5) * 3,
      transition: { type: "spring", stiffness: 200, damping: 25 }
    }
  };

  const shineVariant: Variants = {
    rest: { opacity: 0, x: "-100%" },
    hover: {
      opacity: [0, 0.3, 0],
      x: "100%",
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const rippleVariant: Variants = {
    rest: { scale: 0, opacity: 0 },
    tap: {
      scale: [0, 2],
      opacity: [0.5, 0],
      transition: { duration: 0.4 }
    }
  };

  const icons: Icon[] = [
    {
      id: "linkedin",
      element: <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />,
      href: linkedin,
      hoverColor: "hover:text-cyan-400",
      external: true,
    },
    {
      id: "github",
      element: <Github className="w-5 h-5 sm:w-6 sm:h-6" />,
      href: github,
      hoverColor: "hover:text-blue-400",
      external: true,
    },
    {
      id: "theme",
      element: isDark ? <Sun className="w-5 h-5 sm:w-6 sm:h-6" /> : <Moon className="w-5 h-5 sm:w-6 sm:h-6" />,
      href: "",
      hoverColor: "hover:text-amber-400 ",
      external: false,
    },
  ];

  const sections: Section[] = [
    { name: "Home", path: "/", icon: <HomeIcon fontSize="small" /> },
    { name: "Skills", path: "#skills", icon: <SkillsIcon fontSize="small" /> },
    { name: "Projects", path: "#projects", icon: <ProjectsIcon fontSize="small" /> },
    { name: "About", path: "#about", icon: <AboutIcon fontSize="small" /> },
    { name: "Contact", path: "#signup", icon: <ContactIcon fontSize="small" /> },
    { name: "Footer", path: "#footer", icon: <FooterIcon fontSize="small" /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleScroll = (path: string) => {
    const sectionId = path.replace("#", "");
    if (path === "/" || path === "#home") {
      if (location.pathname !== "/") navigate("/#home");
      else {
        const home = document.getElementById("home");
        home
          ? home.scrollIntoView({ behavior: "smooth" })
          : window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    if (path.startsWith("#")) {
      if (location.pathname !== "/") navigate("/" + path);
      else {
        const section = document.getElementById(sectionId);
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }
    } else navigate(path);
  };

  return (
    <header className="fixed top-4 z-50 w-full px-4 font-[Outfit]">
      <motion.nav
        className="relative w-full mx-auto px-5 py-3 flex justify-between items-center rounded-3xl backdrop-blur-xl border border-white/20 bg-linear-to-br from-slate-900/90 via-blue-900/85 to-cyan-900/90 dark:from-black dark:via-blue-950 dark:to-cyan-900 shadow-2xl shadow-cyan-500/20 dark:shadow-blue-900/30 overflow-hidden"
        initial={{ y: -80, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.005 }}
      >
        {/* Animated border linear */}
        <motion.div
          className="absolute inset-0 rounded-3xl bg-linear-to-r from-transparent via-cyan-500/30 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 5,
            ease: "easeInOut",
          }}
          style={{ filter: "blur(20px)" }}
        />

        {/* Left: KC + Dynamic Name */}
        <Link to="/">
          <motion.div
            className="flex items-center space-x-3 sm:space-x-4 cursor-pointer shrink-0 select-none relative group"
            variants={floatingVariant}
            animate="float"
            whileHover="hover"
          >
            <motion.div
              className="relative border-2 border-cyan-400/80 rounded-full text-white flex items-center justify-center font-bold bg-linear-to-br from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 shadow-lg shadow-cyan-500/25 w-10 h-10 sm:w-12 sm:h-12 overflow-hidden"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span className="text-sm sm:text-base relative z-10">{admin.name?.charAt(0) || "K"}</span>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-cyan-300/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>

            <h1 className="text-base sm:text-lg md:text-xl font-[Roboto] font-bold bg-linear-to-r from-cyan-400 to-blue-400 dark:from-cyan-300 dark:via-white dark:to-orange-400 bg-clip-text text-transparent tracking-tight">
              {admin.name}
            </h1>
          </motion.div>
        </Link>

        {/* Middle (md) Resume + Icons */}
        <div className="hidden md:flex lg:hidden items-center gap-3">
          <motion.div
            variants={bounceVariant}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
            <Link
              to="/resume"
              className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-linear-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 text-white font-semibold transition-all duration-200 overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-cyan-500/20 to-blue-500/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              <Download className="w-4 h-4 relative z-10" />
              <span className="text-sm relative z-10">Resume</span>
            </Link>
          </motion.div>

          {icons.map((icon) =>
            icon.external ? (
              <motion.a
                key={icon.id}
                href={icon.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative p-2 rounded-xl bg-white/10 dark:bg-black/10 border dark:text-white border-white/20 dark:border-black/20 ${icon.hoverColor} overflow-hidden group cursor-pointer`}
                variants={iconHoverVariant}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.4 }}
                />
                {icon.element}
              </motion.a>
            ) : (
              <motion.button
                key={icon.id}
                onClick={toggleTheme}
                className={`relative p-2 rounded-xl bg-white/10 dark:bg-black/10 border dark:text-white border-white/20 dark:border-black/20 ${icon.hoverColor} overflow-hidden group`}
                variants={iconHoverVariant}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.4 }}
                />
                {icon.element}
              </motion.button>
            )
          )}
        </div>

        {/* Large: Sections */}
        <motion.div
          className="hidden xl:flex items-center gap-2"
          initial="hidden"
          animate="visible"
        >
          {sections.map((section, index) => (
            <motion.div
              key={section.name}
              variants={sectionHoverVariant}
              initial="rest"
              whileHover="hover"
              custom={index}
              className="relative"
            >
              {section.path.startsWith("#") ? (
                <button
                  onClick={() => {
                    handleScroll(section.path);
                    setIsOpen(false);
                  }}
                  className="relative px-4 py-2 select-none rounded-xl font-semibold text-gray-300 dark:text-white hover:text-white dark:hover:text-red-600 transition-all overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-cyan-500/20 to-blue-500/20 rounded-xl"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <span className="relative flex items-center gap-2">
                    {section.icon && <span className="text-cyan-400 dark:text-cyan-300">{section.icon}</span>}
                    <span>{section.name}</span>
                  </span>
                </button>
              ) : (
                <Link
                  to={section.path}
                  onClick={() => setIsOpen(false)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all overflow-hidden group ${isActive(section.path)
                    ? "text-white dark:text-white bg-linear-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30"
                    : "text-gray-300 dark:text-white hover:text-white dark:hover:text-red-600"
                    }`}
                >
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-cyan-500/20 to-blue-500/20"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <span className="relative flex items-center gap-2">
                    {section.icon && <span className="text-cyan-400 dark:text-cyan-300">{section.icon}</span>}
                    <span>{section.name}</span>
                  </span>
                </Link>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Large: Resume + Icons */}
        <motion.div className="hidden lg:flex items-center gap-4" initial="hidden" animate="visible">
          <motion.div
            variants={bounceVariant}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
            <Link
              to="/resume"
              className="group relative inline-flex select-none items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-cyan-500 via-blue-500 to-sky-500 text-white font-semibold shadow-md transition-all overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-white/30 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              />
              <Download className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Resume</span>
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-3 h-3 text-cyan-200 relative z-10" />
              </motion.span>
            </Link>
          </motion.div>

          {icons.map((icon) =>
            icon.external ? (
              <motion.a
                key={icon.id}
                href={icon.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative p-3 rounded-xl dark:text-white bg-white/10 dark:bg-black/10 border border-white/20 dark:border-black/20 ${icon.hoverColor} overflow-hidden group cursor-pointer`}
                variants={iconHoverVariant}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.4 }}
                />
                {icon.element}
              </motion.a>
            ) : (
              <motion.button
                key={icon.id}
                onClick={toggleTheme}
                className={`relative p-3 rounded-xl dark:text-white bg-white/10 dark:bg-black/10 border border-white/20 dark:border-black/20 ${icon.hoverColor} overflow-hidden group`}
                variants={iconHoverVariant}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.4 }}
                />
                {icon.element}
              </motion.button>
            )
          )}
        </motion.div>

        {/* Hamburger with animation */}
        <motion.button
          className="block xl:hidden p-3 rounded-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-black/20 text-white dark:text-white relative overflow-hidden group"
          whileHover={{ scale: 1.05, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen((s) => !s)}
        >
          <motion.div
            className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.4 }}
          />
          <motion.div
            animate={isOpen ? { rotate: 90 } : { rotate: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.div>
        </motion.button>
      </motion.nav>

      {/* Mobile Dropdown with enhanced animations */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="xl:hidden fixed inset-x-4 top-24 mx-auto rounded-3xl backdrop-blur-md border border-white/20 bg-linear-to-br from-slate-900/95 via-blue-900/90 to-cyan-900/95 dark:from-black dark:via-blue-950 dark:to-cyan-900 shadow-2xl shadow-cyan-500/20 dark:shadow-blue-900/30 z-50 overflow-hidden"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <motion.div
              className="flex flex-col p-5 gap-3"
              initial="hidden"
              animate="visible"
            >
              {sections.map((section, idx) => (
                <motion.div
                  key={section.name}
                  custom={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ x: 8 }}
                  className="flex justify-center"
                >
                  <button
                    onClick={() => {
                      handleScroll(section.path);
                      setIsOpen(false);
                    }}
                    className="relative flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-semibold text-gray-300 dark:text-white hover:text-white hover:bg-white/10 dark:hover:bg-black/10 transition-all overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-linear-to-r from-cyan-500/20 to-blue-500/20"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                    <span className="relative">
                      {section.icon && <span className="text-cyan-400 dark:text-cyan-300">{section.icon}</span>}
                    </span>
                    <span className="relative">{section.name}</span>
                  </button>
                </motion.div>
              ))}

              {/* Resume + Icons (mobile only) */}
              <div className="mt-2 md:hidden">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mb-2"
                >
                  <Link
                    to="/resume"
                    onClick={() => setIsOpen(false)}
                    className="flex justify-center items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-cyan-500 via-blue-500 to-sky-500 text-white font-semibold shadow-md relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-linear-to-r from-white/30 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                    <Download className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">Resume</span>
                    <motion.span
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-3 h-3 text-cyan-200 relative z-10" />
                    </motion.span>
                  </Link>
                </motion.div>

                <div className="flex justify-center gap-3">
                  {icons.map((icon) =>
                    icon.external ? (
                      <motion.a
                        key={icon.id}
                        href={icon.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 rounded-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-black/20 ${icon.hoverColor} relative overflow-hidden group`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.4 }}
                        />
                        {icon.element}
                      </motion.a>
                    ) : (
                      <motion.button
                        key={icon.id}
                        onClick={() => {
                          toggleTheme();
                          setIsOpen(false);
                        }}
                        className={`p-3 rounded-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-black/20 ${icon.hoverColor} relative overflow-hidden group`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.4 }}
                        />
                        {icon.element}
                      </motion.button>
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