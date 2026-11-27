import { useState, useEffect, type ReactElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import axios from "axios";
import { Download, Menu, X, Linkedin, Github, Sun, Moon, Heart, Skull, Sparkles } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../Context/ThemeContext";
import { APIURL } from "../../GlobalAPIURL";
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
  id: string;
}

interface AdminData {
  name: string;
  socialLinks: { name: string; link: string }[];
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { toggleTheme, theme } = useTheme();
  const isHorror = theme === "horror";

  const handleThemeToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    toggleTheme(rect.left + rect.width / 2, rect.top + rect.height / 2);
  };
  const location = useLocation();
  const navigate = useNavigate();
  const [, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("home");
  const [borderWidth, setBorderWidth] = useState(0);

  const [admin, setAdmin] = useState<AdminData>({
    name: "Kushagra Chhabra",
    socialLinks: [
      { name: "LinkedIn", link: "https://www.linkedin.com/in/kushagra-chhabra-83b215355" },
      { name: "GitHub", link: "https://github.com/Kushagra-369" },
    ],
  });

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ===== HORROR FONT LOADER (Creepster + Nosifer + Eater + Butcherman) =====
  useEffect(() => {
    const id = "horror-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Creepster&family=Nosifer&family=Eater&family=Butcherman&display=swap";
    document.head.appendChild(link);
  }, []);

  const linkedin =
    admin.socialLinks.find((l) => l.name.toLowerCase() === "linkedin")?.link ||
    "https://www.linkedin.com/in/kushagra-chhabra-83b215355";
  const github =
    admin.socialLinks.find((l) => l.name.toLowerCase() === "github")?.link ||
    "https://github.com/Kushagra-369";

  const sections: Section[] = [
    { name: "Home", path: "/", icon: <HomeIcon fontSize="small" />, id: "home" },
    { name: "Skills", path: "#skills", icon: <SkillsIcon fontSize="small" />, id: "skills" },
    { name: "Projects", path: "#projects", icon: <ProjectsIcon fontSize="small" />, id: "projects" },
    { name: "Experience", path: "#about", icon: <AboutIcon fontSize="small" />, id: "about" },
    { name: "Contact", path: "#signup", icon: <ContactIcon fontSize="small" />, id: "signup" },
    { name: "Footer", path: "#footer", icon: <FooterIcon fontSize="small" />, id: "footer" },
  ];

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      let newActiveSection = activeSection;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section) {
          const { offsetTop } = section;
          if (scrollPosition >= offsetTop) {
            newActiveSection = sections[i].id;
            break;
          }
        }
      }

      if (newActiveSection !== activeSection) {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setActiveSection(newActiveSection);
        }, 50);
      }

      const footer = document.getElementById("footer");
      if (footer) {
        const footerPosition = footer.offsetTop + footer.offsetHeight;
        const windowHeight = window.innerHeight;
        const maxScroll = footerPosition - windowHeight;
        const currentScroll = window.scrollY;
        let progress = Math.min(Math.max(currentScroll / maxScroll, 0), 1);
        const easedProgress = 1 - Math.pow(1 - progress, 1.5);
        setBorderWidth(easedProgress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [activeSection]);

  const getTargetBorderWidth = (sectionId: string) => {
    const sectionMap: { [key: string]: number } = {
      home: 0,
      skills: 0.2,
      projects: 0.4,
      about: 0.6,
      signup: 0.8,
      footer: 1,
    };
    return sectionMap[sectionId] || 0;
  };

  const floatingVariant: Variants = {
    float: {
      y: [0, -8, 0],
      rotate: [0, 2, -2, 0],
      transition: { duration: 3, ease: "easeInOut", repeat: Infinity },
    },
  };

  const bounceVariant: Variants = {
    rest: { scale: 1, y: 0 },
    hover: {
      scale: 1,
      y: [0, -12, 0, -8, 0, -4, 0],
      transition: {
        duration: 0.6,
        ease: "easeOut",
        times: [0, 0.2, 0.4, 0.5, 0.7, 0.85, 1],
      },
    },
    tap: { scale: 0.95, transition: { duration: 0.1 } },
  };

  const iconHoverVariant: Variants = {
    rest: { scale: 1 },
    hover: {
      scale: 1,
      y: [0, -6, 0, -4, 0],
      transition: {
        duration: 0.5,
        ease: "easeOut",
        times: [0, 0.2, 0.4, 0.6, 1],
      },
    },
  };

  const sectionHoverVariant: Variants = {
    rest: { x: 0, scale: 1 },
    hover: {
      x: 6,
      scale: 1,
      transition: { type: "spring", stiffness: 400, damping: 15 },
    },
  };

  const icons: Icon[] = [
    {
      id: "linkedin",
      element: <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />,
      href: linkedin,
      hoverColor:
        "hover:text-cyan-400 love:hover:text-pink-300 horror:hover:text-red-400",
      external: true,
    },
    {
      id: "github",
      element: <Github className="w-5 h-5 sm:w-6 sm:h-6" />,
      href: github,
      hoverColor:
        "hover:text-blue-400 love:hover:text-rose-300 horror:hover:text-red-500",
      external: true,
    },
    {
      id: "theme",
      element:
        theme === "dark" ? (
          <Sun className="w-5 h-5 sm:w-6 sm:h-6" />
        ) : theme === "light" ? (
          <Moon className="w-5 h-5 sm:w-6 sm:h-6" />
        ) : theme === "love" ? (
          <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
        ) : (
          <Skull className="w-5 h-5 sm:w-6 sm:h-6" />
        ),
      href: "",
      hoverColor:
        "hover:text-amber-400 love:hover:text-pink-400 horror:hover:text-red-500",
      external: false,
    },
  ];

  const isActive = (path: string, id: string) => {
    if (path === "/") return location.pathname === "/" && activeSection === "home";
    return activeSection === id;
  };

  const handleScroll = (path: string, sectionId?: string) => {
    const sectionIdToScroll = path.replace("#", "");

    if (sectionId && getTargetBorderWidth(sectionId) !== undefined) {
      setBorderWidth(getTargetBorderWidth(sectionId));
    }

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
        const section = document.getElementById(sectionIdToScroll);
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }
    } else navigate(path);
  };

  // Horror font stack — strongest spooky fonts
  const horrorFontClass = isHorror ? "horror-text" : "";

  return (
    <header className="fixed top-6 z-50 w-full px-4 font-[Outfit]">
      {/* ===== HORROR STYLES ===== */}
      <style>
        {`
          /* HORROR FONT — applied via .horror-text */
          .horror-text,
          .horror-text * {
            font-family: 'Creepster', 'Nosifer', 'Eater', 'Butcherman', cursive !important;
            letter-spacing: 0.08em !important;
            text-shadow:
              0 0 4px #ff1a1a,
              0 0 12px #b30000,
              0 0 24px #6b0000,
              0 2px 0 #000 !important;
          }
          .horror-text-soft,
          .horror-text-soft * {
            font-family: 'Creepster', 'Nosifer', cursive !important;
            letter-spacing: 0.06em !important;
            text-shadow: 0 0 8px #b30000, 0 0 18px #6b0000 !important;
          }

          /* Blood-drip pulse for horror navbar */
          @keyframes horrorBloodPulse {
            0%, 100% {
              box-shadow:
                0 0 18px rgba(180, 0, 0, 0.55),
                0 0 50px rgba(90, 0, 0, 0.55);
            }
            50% {
              box-shadow:
                0 0 32px rgba(255, 20, 20, 0.85),
                0 0 90px rgba(140, 0, 0, 0.7);
            }
          }

          /* Sheen sweep — like blood smear */
          @keyframes horrorBloodSheen {
            0%   { transform: translateX(-120%); }
            100% { transform: translateX(120%); }
          }

          /* Drip animation for horror border */
          @keyframes horrorDrip {
            0%, 100% { opacity: 0.7; filter: blur(0.5px); }
            50%      { opacity: 1;   filter: blur(1.5px); }
          }
        `}
      </style>

      <motion.nav
        className={`
          relative w-full mx-auto px-5 py-3 flex justify-between items-center rounded-3xl
          backdrop-blur-xl border border-white/20
          bg-linear-to-br from-slate-900/90 via-blue-900/85 to-cyan-900/90
          dark:from-black dark:via-blue-950 dark:to-cyan-900
          love:from-rose-950/95 love:via-pink-900/90 love:to-red-900/95
          horror:from-zinc-900/95 horror:via-neutral-900/95 horror:to-black
          shadow-2xl shadow-cyan-500/20
          dark:shadow-blue-900/30
          love:shadow-pink-600/30
          horror:shadow-[0_0_40px_rgba(180,0,0,0.55)]
          horror:animate-[horrorBloodPulse_4s_ease-in-out_infinite]
          horror:border-red-900/60
          overflow-hidden
        `}
        initial={{ y: -80, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", type: "spring", stiffness: 200 }}
        whileHover="hover"
        variants={bounceVariant}
      >
        {/* Animated border linear */}
        <motion.div
          className="absolute inset-0 rounded-3xl bg-linear-to-r from-transparent via-cyan-500/30 to-transparent love:via-pink-500/40 horror:via-red-700/60"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
          style={{ filter: "blur(20px)" }}
        />

        {/* Horror blood sheen */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden horror:block hidden">
          <div
            className="absolute top-0 left-0 h-full w-1/3 bg-linear-to-r from-transparent via-red-600/30 to-transparent"
            style={{ animation: "horrorBloodSheen 6s linear infinite" }}
          />
        </div>

        {/* Smooth Growing bottom border */}
        <motion.div
          className="
            absolute bottom-0 left-0 h-1 rounded-full
            bg-linear-to-r from-cyan-400 via-blue-500 to-cyan-400
            love:from-pink-400 love:via-rose-500 love:to-red-500
            horror:from-red-700 horror:via-red-500 horror:to-red-800
            horror:animate-[horrorDrip_2.5s_ease-in-out_infinite]
          "
          initial={{ width: "0%" }}
          animate={{
            width: `${borderWidth * 100}%`,
            transition: { type: "spring", stiffness: 100, damping: 20, mass: 0.5 },
          }}
          whileHover={{
            boxShadow: "0 0 20px rgba(6,182,212,0.8)",
            transition: { duration: 0.3 },
          }}
        />

        {/* Animated glowing effect */}
        <motion.div
          className="
            absolute bottom-0 left-0 h-1 rounded-full blur-sm
            bg-linear-to-r from-cyan-400 via-blue-500 to-cyan-400
            love:from-pink-400 love:via-rose-500 love:to-red-500
            horror:from-red-600 horror:via-red-400 horror:to-red-700
          "
          animate={{
            width: `${borderWidth * 100}%`,
            opacity: [0.5, 1, 0.5],
            transition: {
              width: { type: "spring", stiffness: 100, damping: 20, mass: 0.5 },
              opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            },
          }}
        />

        {/* Left: KC + Dynamic Name */}
        <Link to="/">
          <motion.div
            className="flex items-center space-x-3 sm:space-x-4 cursor-pointer shrink-0 select-none relative group"
            variants={floatingVariant}
            animate="float"
          >
            <motion.div
              className="
                relative rounded-full text-white flex items-center justify-center font-bold
                border-2
                border-cyan-400/80
                love:border-pink-400/80
                horror:border-red-700/90
                bg-linear-to-br from-cyan-500 to-blue-600
                dark:from-cyan-400 dark:to-blue-500
                love:from-pink-500 love:to-rose-600
                horror:from-red-800 horror:to-black
                shadow-lg shadow-cyan-500/25
                love:shadow-pink-500/30
                horror:shadow-[0_0_28px_rgba(180,0,0,0.8)]
                w-10 h-10 sm:w-12 sm:h-12 overflow-hidden
              "
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span className={`text-sm sm:text-base relative z-10 ${horrorFontClass}`}>
                {admin.name?.charAt(0) || "K"}
              </span>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-cyan-300/40 love:border-pink-300/50 horror:border-red-500/80"
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

            <h1
              className={`
                text-base sm:text-lg md:text-xl font-[Roboto] font-bold tracking-tight
                bg-clip-text text-transparent
                bg-linear-to-r from-cyan-400 to-blue-400
                dark:from-cyan-300 dark:via-white dark:to-orange-400
                love:from-pink-300 love:via-rose-200 love:to-red-300
                horror:from-red-500 horror:via-red-300 horror:to-red-700
                ${horrorFontClass}
              `}
            >
              {admin.name}
            </h1>
          </motion.div>
        </Link>

        {/* Middle (md) Resume + Icons */}
        <div className="hidden md:flex lg:hidden items-center gap-3">
          <motion.div variants={bounceVariant} initial="rest" whileHover="hover" whileTap="tap">
            <Link
              to="/resume"
              className="
                relative flex items-center gap-2 px-3 py-2 rounded-xl
                bg-linear-to-r from-cyan-500/20 to-blue-500/20
                love:from-pink-500/20 love:to-rose-500/20
                horror:from-red-900/40 horror:to-black/60
                border border-cyan-400/30
                love:border-pink-400/40
                horror:border-red-800/70
                text-white font-semibold transition-all duration-200 overflow-hidden group
                horror:shadow-[0_0_18px_rgba(180,0,0,0.5)]
              "
            >
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-cyan-500/20 to-blue-500/20 love:from-pink-500/20 love:to-rose-500/20 horror:from-red-700/25 horror:to-red-950/30"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              <Download className="w-4 h-4 relative z-10" />
              <span className={`text-sm relative z-10 ${horrorFontClass}`}>Resume</span>
            </Link>
          </motion.div>

          {icons.map((icon) =>
            icon.external ? (
              <motion.a
                key={icon.id}
                href={icon.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  relative p-2 rounded-xl
                  bg-white/10 dark:bg-black/10
                  love:bg-pink-500/10
                  horror:bg-black/60
                  border border-white/20 dark:border-black/20
                  love:border-pink-400/30
                  horror:border-red-900/70
                  dark:text-white love:text-pink-200 horror:text-red-300
                  ${icon.hoverColor}
                  overflow-hidden group cursor-pointer
                  horror:shadow-[0_0_14px_rgba(180,0,0,0.5)]
                `}
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
                onClick={handleThemeToggle}
                className={`
                  relative p-2 rounded-xl
                  bg-white/10 dark:bg-black/10
                  love:bg-pink-500/10
                  horror:bg-black/60
                  border border-white/20 dark:border-black/20
                  love:border-pink-400/30
                  horror:border-red-900/70
                  dark:text-white love:text-pink-200 horror:text-red-300
                  ${icon.hoverColor}
                  overflow-hidden group
                  horror:shadow-[0_0_14px_rgba(180,0,0,0.5)]
                `}
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

        {/* Large: Sections with Highlight */}
        <motion.div className="hidden xl:flex items-center gap-2" initial="hidden" animate="visible">
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
                    handleScroll(section.path, section.id);
                    setIsOpen(false);
                  }}
                  className={`
                    relative px-4 py-2 select-none rounded-xl font-semibold
                    transition-all duration-300 overflow-hidden group
                    ${
                      isActive(section.path, section.id)
                        ? `
                          text-white
                          bg-linear-to-r from-cyan-500/30 to-blue-500/30
                          love:from-pink-500/30 love:to-rose-500/30
                          horror:from-red-900/70 horror:to-black/80
                          border border-cyan-400/50
                          love:border-pink-400/60
                          horror:border-red-600/80
                          shadow-lg shadow-cyan-500/25
                          love:shadow-pink-500/25
                          horror:shadow-[0_0_28px_rgba(255,20,20,0.75)]
                        `
                        : `
                          text-gray-300 dark:text-white
                          love:text-pink-200
                          horror:text-neutral-300
                          hover:text-white dark:hover:text-red-600
                          love:hover:text-pink-100
                          horror:hover:text-red-400
                        `
                    }
                  `}
                >
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-cyan-500/20 to-blue-500/20 love:from-pink-500/20 love:to-rose-500/20 horror:from-red-800/40 horror:to-black/50 rounded-xl"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  {isActive(section.path, section.id) && (
                    <motion.div
                      className="absolute -top-1 left-1/2 w-1.5 h-1.5 bg-cyan-400 love:bg-pink-400 horror:bg-red-500 rounded-full horror:shadow-[0_0_12px_rgba(255,20,20,1)]"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, delay: 0.1 }}
                      style={{ x: "-50%" }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    {section.icon && (
                      <span
                        className={`
                          ${
                            isActive(section.path, section.id)
                              ? "text-cyan-300 love:text-pink-300 horror:text-red-400"
                              : "text-cyan-400 dark:text-cyan-300 love:text-pink-300 horror:text-red-500"
                          }
                          transition-all duration-300
                        `}
                      >
                        {section.icon}
                      </span>
                    )}
                    <span className={`transition-all duration-300 ${horrorFontClass}`}>
                      {section.name}
                    </span>
                  </span>
                </button>
              ) : (
                <Link
                  to={section.path}
                  onClick={() => setIsOpen(false)}
                  className={`
                    relative flex items-center gap-2 px-4 py-2 rounded-xl font-semibold
                    transition-all duration-300 overflow-hidden group
                    ${
                      isActive(section.path, section.id)
                        ? `
                          text-white
                          bg-linear-to-r from-cyan-500/30 to-blue-500/30
                          love:from-pink-500/30 love:to-rose-500/30
                          horror:from-red-900/70 horror:to-black/80
                          border border-cyan-400/50
                          love:border-pink-400/60
                          horror:border-red-600/80
                          shadow-lg shadow-cyan-500/25
                          love:shadow-pink-500/25
                          horror:shadow-[0_0_28px_rgba(255,20,20,0.75)]
                        `
                        : `
                          text-gray-300 dark:text-white
                          love:text-pink-200
                          horror:text-neutral-300
                          hover:text-white dark:hover:text-red-600
                          love:hover:text-pink-100
                          horror:hover:text-red-400
                        `
                    }
                  `}
                >
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-cyan-500/20 to-blue-500/20 love:from-pink-500/20 love:to-rose-500/20 horror:from-red-800/40 horror:to-black/50"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  {isActive(section.path, section.id) && (
                    <motion.div
                      className="absolute -top-1 left-1/2 w-1.5 h-1.5 bg-cyan-400 love:bg-pink-400 horror:bg-red-500 rounded-full horror:shadow-[0_0_12px_rgba(255,20,20,1)]"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, delay: 0.1 }}
                      style={{ x: "-50%" }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    {section.icon && (
                      <span
                        className={`
                          ${
                            isActive(section.path, section.id)
                              ? "text-cyan-300 love:text-pink-300 horror:text-red-400"
                              : "text-cyan-400 dark:text-cyan-300 love:text-pink-300 horror:text-red-500"
                          }
                          transition-all duration-300
                        `}
                      >
                        {section.icon}
                      </span>
                    )}
                    <span className={`transition-all duration-300 ${horrorFontClass}`}>
                      {section.name}
                    </span>
                  </span>
                </Link>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Large: Resume + Icons */}
        <motion.div className="hidden lg:flex items-center gap-4" initial="hidden" animate="visible">
          <motion.div variants={bounceVariant} initial="rest" whileHover="hover" whileTap="tap">
            <Link
              to="/resume"
              className="
                group relative inline-flex select-none items-center gap-2 px-4 py-2 rounded-xl
                bg-linear-to-r from-cyan-500 via-blue-500 to-sky-500
                love:from-pink-500 love:via-rose-500 love:to-red-400
                horror:from-red-800 horror:via-red-900 horror:to-black
                text-white font-semibold shadow-md transition-all overflow-hidden
                horror:shadow-[0_0_28px_rgba(255,20,20,0.85)]
                horror:border horror:border-red-700/80
              "
            >
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-white/30 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
              />
              <Download className="w-4 h-4 relative z-10" />
              <span className={`relative z-10 ${horrorFontClass}`}>Resume</span>
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-3 h-3 text-cyan-200 love:text-pink-200 horror:text-red-300 relative z-10" />
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
                className={`
                  relative p-3 rounded-xl
                  dark:text-white love:text-pink-200 horror:text-red-300
                  bg-white/10 dark:bg-black/10
                  love:bg-pink-500/10
                  horror:bg-black/60
                  border border-white/20 dark:border-black/20
                  love:border-pink-400/30
                  horror:border-red-900/70
                  ${icon.hoverColor}
                  overflow-hidden group cursor-pointer
                  horror:shadow-[0_0_16px_rgba(180,0,0,0.55)]
                `}
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
                onClick={handleThemeToggle}
                className={`
                  relative p-3 rounded-xl
                  dark:text-white love:text-pink-200 horror:text-red-300
                  bg-white/10 dark:bg-black/10
                  love:bg-pink-500/10
                  horror:bg-black/60
                  border border-white/20 dark:border-black/20
                  love:border-pink-400/30
                  horror:border-red-900/70
                  ${icon.hoverColor}
                  overflow-hidden group
                  horror:shadow-[0_0_16px_rgba(180,0,0,0.55)]
                `}
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
          className={`
            block xl:hidden p-3 rounded-xl
            bg-white/10 dark:bg-black/10
            love:bg-pink-500/10
            horror:bg-black/60
            border border-white/20 dark:border-black/20
            love:border-pink-400/30
            horror:border-red-900/70
            text-white dark:text-white love:text-pink-200 horror:text-red-300
            relative overflow-hidden group
            horror:shadow-[0_0_16px_rgba(180,0,0,0.55)]
          `}
          whileHover={{ scale: 1, y: [0, -6, 0, -4, 0] }}
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

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`
              xl:hidden fixed inset-x-4 top-24 mx-auto rounded-3xl backdrop-blur-md
              border border-white/20
              bg-linear-to-br from-slate-900/95 via-blue-900/90 to-cyan-900/95
              dark:from-black dark:via-blue-950 dark:to-cyan-900
              love:from-rose-950/95 love:via-pink-900/90 love:to-red-900/95
              horror:from-zinc-900/95 horror:via-neutral-900/95 horror:to-black
              shadow-2xl shadow-cyan-500/20
              dark:shadow-blue-900/30
              love:shadow-pink-600/30
              horror:shadow-[0_0_40px_rgba(180,0,0,0.6)]
              horror:border-red-900/70
              z-50 overflow-hidden
            `}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <motion.div className="flex flex-col p-5 gap-3" initial="hidden" animate="visible">
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
                      handleScroll(section.path, section.id);
                      setIsOpen(false);
                    }}
                    className={`
                      relative flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl
                      font-semibold transition-all duration-300 overflow-hidden group
                      ${
                        isActive(section.path, section.id)
                          ? `
                            text-white
                            bg-linear-to-r from-cyan-500/30 to-blue-500/30
                            love:from-pink-500/30 love:to-rose-500/30
                            horror:from-red-900/70 horror:to-black/80
                            border border-cyan-400/50
                            love:border-pink-400/60
                            horror:border-red-600/80
                            horror:shadow-[0_0_22px_rgba(255,20,20,0.7)]
                          `
                          : `
                            text-gray-300 dark:text-white
                            love:text-pink-200
                            horror:text-neutral-300
                            hover:text-white hover:bg-white/10
                            dark:hover:bg-black/10
                            love:hover:bg-pink-500/10
                            horror:hover:bg-black/60
                          `
                      }
                    `}
                  >
                    <motion.div
                      className="absolute inset-0 bg-linear-to-r from-cyan-500/20 to-blue-500/20 love:from-pink-500/20 love:to-rose-500/20 horror:from-red-800/40 horror:to-black/50"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                    <span className="relative">
                      {section.icon && (
                        <span
                          className={`
                            ${
                              isActive(section.path, section.id)
                                ? "text-cyan-300 love:text-pink-300 horror:text-red-400"
                                : "text-cyan-400 dark:text-cyan-300 love:text-pink-300 horror:text-red-500"
                            }
                            transition-all duration-300
                          `}
                        >
                          {section.icon}
                        </span>
                      )}
                    </span>
                    <span className={`relative ${horrorFontClass}`}>{section.name}</span>
                  </button>
                </motion.div>
              ))}

              {/* Resume + Icons (mobile only) */}
              <div className="mt-2 md:hidden">
                <motion.div
                  whileHover={{ scale: 1, y: [0, -6, 0, -4, 0] }}
                  whileTap={{ scale: 0.98 }}
                  className="mb-2"
                >
                  <Link
                    to="/resume"
                    onClick={() => setIsOpen(false)}
                    className="
                      flex justify-center items-center gap-2 px-4 py-2 rounded-xl
                      bg-linear-to-r from-cyan-500 via-blue-500 to-sky-500
                      love:from-pink-500 love:via-rose-500 love:to-red-400
                      horror:from-red-800 horror:via-red-900 horror:to-black
                      text-white font-semibold shadow-md relative overflow-hidden group
                      horror:shadow-[0_0_28px_rgba(255,20,20,0.85)]
                      horror:border horror:border-red-700/80
                    "
                  >
                    <motion.div
                      className="absolute inset-0 bg-linear-to-r from-white/30 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                    <Download className="w-4 h-4 relative z-10" />
                    <span className={`relative z-10 ${horrorFontClass}`}>Resume</span>
                    <motion.span
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-3 h-3 text-cyan-200 love:text-pink-200 horror:text-red-300 relative z-10" />
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
                        className={`
                          p-3 rounded-xl
                          bg-white/10 dark:bg-black/10
                          love:bg-pink-500/10
                          horror:bg-black/60
                          border border-white/20 dark:border-black/20
                          love:border-pink-400/30
                          horror:border-red-900/70
                          love:text-pink-200 horror:text-red-300
                          ${icon.hoverColor}
                          relative overflow-hidden group
                          horror:shadow-[0_0_14px_rgba(180,0,0,0.5)]
                        `}
                        whileHover={{ scale: 1, y: [0, -6, 0, -4, 0] }}
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
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          toggleTheme(rect.left + rect.width / 2, rect.top + rect.height / 2);
                          setIsOpen(false);
                        }}
                        className={`
                          p-3 rounded-xl
                          bg-white/10 dark:bg-black/10
                          love:bg-pink-500/10
                          horror:bg-black/60
                          border border-white/20 dark:border-black/20
                          love:border-pink-400/30
                          horror:border-red-900/70
                          love:text-pink-200 horror:text-red-300
                          ${icon.hoverColor}
                          relative overflow-hidden group
                          horror:shadow-[0_0_14px_rgba(180,0,0,0.5)]
                        `}
                        whileHover={{ scale: 1, y: [0, -6, 0, -4, 0] }}
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