import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
  useMotionTemplate,
  useAnimationFrame,
} from "framer-motion";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { APIURL } from "../../GlobalAPIURL";

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
  SiMui,
} from "react-icons/si";
import { Download, Mail, Sparkles, ArrowRight, Star } from "lucide-react";
import About from "../About/About";
import Skills from "../Skills/Skills";
import Project from "../Projects/Project";
import Signup from "../Contact/Signup";
import Footer from "../Footer/Footer";

interface Skill {
  name: string;
  icon: React.ReactNode;
  gradient: string;
}

interface WorkItem {
  title: string;
  desc: string;
  icon: string;
  color: string;
}


export default function Home() {
  const location = useLocation();

  const [adminName, setAdminName] = useState<string>("Kushagra Chhabra");
  const [profileImg, setProfileImg] = useState<string>(
    "https://res.cloudinary.com/dynodadq0/image/upload/v1761790870/unnamed_adxxjm.jpg"
  );
  const [isHoveringImg, setIsHoveringImg] = useState<boolean>(false);

  // ===== Profile image 3D tilt (UNCHANGED) =====
  const cardRef = useRef<HTMLDivElement | null>(null);
  const mouseX = useMotionValue<number>(0);
  const mouseY = useMotionValue<number>(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 200,
    damping: 20,
  });

  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.25), transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHoveringImg(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // ===== Controllable 3D revolution state =====
  const rotation = useMotionValue<number>(0);
  const isDragging = useRef<boolean>(false);
  const lastX = useRef<number>(0);

  useAnimationFrame((_, delta) => {
    if (!isDragging.current) {
      rotation.set(rotation.get() + delta * 0.03);
    }
  });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastX.current;
      lastX.current = e.clientX;
      rotation.set(rotation.get() + dx * 0.4);
    };
    const onUp = () => {
      isDragging.current = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [rotation]);



  // ✅ Fetch dynamic admin data
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axios.get(`${APIURL}/get_new_profile`);
        const admin = res.data?.adminProfiles?.[0];
        if (admin) {
          setAdminName(admin.name || "Kushagra Chhabra");
          setProfileImg(admin.profileImg?.secure_url || profileImg);
        }
      } catch {
        console.warn("⚠️ Could not load admin details — using default.");
      }
    };
    fetchAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
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

  const [currentSkill, setCurrentSkill] = useState<number>(0);
  const [averageRating, setAverageRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get(`${APIURL}/get_ratings`);
        setAverageRating(response.data.averageRating);
      } catch (error) {
        console.error("❌ Error fetching ratings:", error);
      }
    };
    fetchRatings();
  }, []);

  const skills: Skill[] = [
    { name: "JavaScript", icon: <SiJavascript className="text-yellow-400 text-2xl lg:text-3xl" />, gradient: "from-yellow-400 to-amber-600" },
    { name: "TypeScript", icon: <SiTypescript className="text-blue-600 text-2xl lg:text-3xl" />, gradient: "from-blue-600 to-blue-800" },
    { name: "React", icon: <SiReact className="text-cyan-400 text-2xl lg:text-3xl" />, gradient: "from-cyan-400 to-blue-600" },
    { name: "Next.js", icon: <SiNextdotjs className="text-white text-2xl lg:text-3xl" />, gradient: "from-gray-100 to-gray-300" },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-400 text-2xl lg:text-3xl" />, gradient: "from-teal-400 to-cyan-600" },
    { name: "Node.js", icon: <SiNodedotjs className="text-green-600 text-2xl lg:text-3xl" />, gradient: "from-green-600 to-green-800" },
    { name: "Express.js", icon: <SiExpress className="text-gray-300 text-2xl lg:text-3xl" />, gradient: "from-gray-300 to-gray-500" },
    { name: "MongoDB", icon: <SiMongodb className="text-green-500 text-2xl lg:text-3xl" />, gradient: "from-green-500 to-green-700" },
    { name: "Git", icon: <SiGit className="text-orange-600 text-2xl lg:text-3xl" />, gradient: "from-orange-600 to-red-600" },
    { name: "Figma", icon: <SiFigma className="text-indigo-500 text-2xl lg:text-3xl" />, gradient: "from-indigo-500 to-blue-600" },
    { name: "Material UI", icon: <SiMui className="text-blue-500 text-2xl lg:text-3xl" />, gradient: "from-blue-500 to-blue-700" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const featuredSkills: Skill[] = skills.slice(0, 3);

  const workItems: WorkItem[] = [
    { title: "Frontend Development", desc: "Crafting responsive, dynamic UIs using React, Next.js, and Tailwind CSS.", icon: "💻", color: "from-cyan-400 to-blue-500" },
    { title: "Backend Engineering", desc: "Building scalable APIs with Node.js, Express, and MongoDB.", icon: "⚙️", color: "from-green-400 to-emerald-500" },
    { title: "Animation & UX", desc: "Enhancing user experiences using Framer Motion and creative design.", icon: "🎨", color: "from-purple-400 to-pink-500" },
  ];




  return (
    <div
      id="home"
      className="min-h-screen relative overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-20 sm:pb-28 lg:pb-32 px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-24 transition-colors duration-700"
    >
      {/* === 3D Background Layer === */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 -left-20 w-md h-112 rounded-full bg-cyan-500/10 dark:bg-cyan-500/5 blur-3xl"
          animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 -right-20 w-lg h-128 rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-3xl"
          animate={{ y: [0, -40, 0], x: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="absolute top-1/3 right-[8%] hidden xl:block" style={{ perspective: "800px" }}>
          <motion.div
            className="relative w-24 h-24"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          >
            {[
              "rotateY(0deg) translateZ(48px)",
              "rotateY(90deg) translateZ(48px)",
              "rotateY(180deg) translateZ(48px)",
              "rotateY(270deg) translateZ(48px)",
              "rotateX(90deg) translateZ(48px)",
              "rotateX(-90deg) translateZ(48px)",
            ].map((t, i) => (
              <div
                key={i}
                className="absolute inset-0 border border-cyan-400/30 rounded-md"
                style={{ transform: t }}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-8xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12 lg:gap-16 xl:gap-24">
          {/* Text Section */}
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
              <motion.span
                whileHover={{
                  scale: 1.05,
                  textShadow: "0 0 20px rgba(6, 182, 212, 0.5)",
                  transition: { duration: 0.2 },
                }}
                className="bg-linear-to-r from-cyan-400 to-blue-400 dark:from-cyan-300 dark:via-white dark:to-orange-400 bg-clip-text text-transparent inline-block cursor-pointer"
              >
                {adminName.split(" ")[0] || "Kushagra"}
              </motion.span>{" "}
              <motion.span
                whileHover={{
                  scale: 1.05,
                  textShadow: "0 0 20px rgba(156, 163, 175, 0.5)",
                  transition: { duration: 0.2 },
                }}
                className="bg-linear-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent inline-block cursor-pointer"
              >
                {adminName.split(" ")[1] || "Chhabra"}
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
            >
              Full-Stack Developer &{" "}
              <motion.span
                whileHover={{ scale: 1.1, color: "#06b6d4", transition: { duration: 0.2 } }}
                className="font-semibold text-cyan-600 dark:text-cyan-400 inline-block cursor-pointer"
              >
                App developer
              </motion.span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="text-base sm:text-lg text-gray-500 dark:text-gray-400 mb-10 leading-relaxed"
            >
              I craft{" "}
              <motion.span
                whileHover={{ scale: 1.05, color: "#06b6d4", transition: { duration: 0.2 } }}
                className="font-semibold text-cyan-600 dark:text-cyan-400 inline-block cursor-pointer"
              >
                digital experiences
              </motion.span>{" "}
              that blend innovative design with cutting-edge technology.
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
                  <motion.span
                    whileHover={{
                      scale: 1.1,
                      textShadow: "0 0 10px currentColor",
                      transition: { duration: 0.2 },
                    }}
                    className={`text-lg font-bold bg-linear-to-r ${featuredSkills[currentSkill].gradient} bg-clip-text text-transparent cursor-pointer`}
                  >
                    {featuredSkills[currentSkill].name}
                  </motion.span>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* ============ "What I Do" — ORIGINAL ANIMATION ============ */}
            <section className="mt-20 select-none mb-16 text-center lg:text-left">
              <motion.h2
                whileHover={{
                  scale: 1.05,
                  textShadow: "0 0 20px rgba(6, 182, 212, 0.5)",
                  transition: { duration: 0.2 },
                }}
                className="text-3xl font-bold mb-10 text-cyan-400 cursor-pointer inline-block"
              >
                What I Do
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {workItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2, duration: 0.6 }}
                    whileHover={{
                      y: -10,
                      transition: { duration: 0.3, ease: "easeOut" },
                    }}
                    className="relative group cursor-pointer"
                  >
                    {/* Card Glow Effect */}
                    <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-600 to-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300" />

                    <div className="relative bg-transparent p-6 rounded-2xl border border-cyan-400/20 backdrop-blur-md hover:border-transparent transition-all duration-300 h-full">
                      <motion.div
                        className="text-4xl mb-4 inline-block"
                        whileHover={{
                          rotate: 360,
                          scale: 1.2,
                          transition: { duration: 0.6, ease: "easeInOut" },
                        }}
                      >
                        {item.icon}
                      </motion.div>

                      <motion.h3
                        initial={{ x: 0 }}
                        whileHover={{
                          x: 10,
                          color: "#06b6d4",
                          transition: { duration: 0.2 },
                        }}
                        className="text-lg font-semibold text-cyan-400 mb-2"
                      >
                        {item.title}
                      </motion.h3>

                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {item.desc}
                      </p>

                      {/* Animated Border Bottom */}
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-cyan-400 to-blue-500"
                        initial={{ width: "0%" }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
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
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
                <Link
                  to="#signup"
                  className="relative inline-flex items-center gap-3 bg-linear-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-semibold overflow-hidden group shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="absolute inset-0 w-full h-full">
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    <div className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-linear-to-r from-white/0 via-white/30 to-white/0" />
                  </div>
                  <Mail className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  <span className="relative z-10 font-medium tracking-wide">Get In Touch</span>
                  <motion.div
                    animate={{ x: 0 }}
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 400 }}
                  >
                    <ArrowRight className="w-4 h-4 relative z-10" />
                  </motion.div>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
                <Link
                  to="/resume"
                  className="relative inline-flex items-center gap-3 border-2 border-cyan-400 text-cyan-600 dark:text-cyan-400 px-8 py-4 rounded-2xl font-semibold backdrop-blur-sm overflow-hidden group hover:bg-cyan-500/10 transition-all duration-300"
                >
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                  <Download className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium tracking-wide group-hover:text-white transition-colors duration-300">
                    Download CV
                  </span>
                  <motion.div
                    animate={{ rotate: 0 }}
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <Sparkles className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:text-white" />
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* === 3D Profile Image (UNCHANGED) === */}
          <div className="flex flex-col items-center">
            <motion.div
              ref={cardRef}
              className="relative select-none shrink-0 w-full max-w-md lg:max-w-lg xl:max-w-xl"
              initial={{ opacity: 0, scale: 0.85, rotateY: 20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              onMouseEnter={() => setIsHoveringImg(true)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ perspective: 1200 }}
            >
              <motion.div
                className="relative rounded-3xl p-4 sm:p-6"
                style={{
                  transformStyle: "preserve-3d",
                  rotateX: isHoveringImg ? rotateX : 0,
                  rotateY: isHoveringImg ? rotateY : 0,
                }}
                animate={{ y: isHoveringImg ? -8 : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-linear-to-br from-cyan-500/20 via-transparent to-blue-500/20 blur-2xl"
                  animate={{
                    opacity: isHoveringImg ? 0.9 : 0.5,
                    scale: isHoveringImg ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                  style={{ transform: "translateZ(-40px)" }}
                />

                <div
                  className="absolute inset-0 rounded-3xl border border-cyan-400/20 dark:border-cyan-400/10"
                  style={{ transform: "translateZ(0px)" }}
                />

                <div
                  className="relative select-none rounded-2xl overflow-hidden"
                  style={{ transform: "translateZ(30px)" }}
                >
                  <motion.img
                    src={profileImg}
                    alt={`${adminName} - Full Stack Developer`}
                    className="w-full h-auto object-cover rounded-2xl shadow-2xl relative z-10"
                    animate={{ scale: isHoveringImg ? 1.03 : 1 }}
                    transition={{ duration: 0.4 }}
                  />

                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{ background: glareBg }}
                    animate={{ opacity: isHoveringImg ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <motion.div
                  className="absolute -top-2 -left-2 w-3 h-3 rounded-full bg-cyan-400"
                  style={{ transform: "translateZ(60px)" }}
                  animate={isHoveringImg ? { scale: [1, 1.5, 1] } : { scale: 1 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-2 -right-2 w-3 h-3 rounded-full bg-blue-400"
                  style={{ transform: "translateZ(60px)" }}
                  animate={isHoveringImg ? { scale: [1, 1.5, 1] } : { scale: 1 }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                />
              </motion.div>
            </motion.div>

            {/* Rating Stars */}
            {averageRating !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mt-6 flex flex-col items-center"
              >
                <div className="flex items-center justify-center space-x-1">
                  {[...Array(5)].map((_, i) => {
                    const fillPercent = Math.min(Math.max(averageRating - i, 0), 1) * 100;
                    return (
                      <motion.div
                        key={i}
                        className="relative w-6 h-6 cursor-pointer"
                        whileHover={{ scale: 1.3, rotate: 360, transition: { duration: 0.4 } }}
                      >
                        <Star className="absolute top-0 left-0 w-6 h-6 text-gray-300 dark:text-gray-600" />
                        <div
                          className="absolute top-0 left-0 overflow-hidden"
                          style={{ width: `${fillPercent}%` }}
                        >
                          <Star className="w-6 h-6 text-yellow-400" />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                <motion.p
                  whileHover={{ scale: 1.05 }}
                  className="mt-2 text-gray-700 dark:text-gray-300 text-sm text-center cursor-pointer"
                >
                  Average Rating:{" "}
                  <span className="font-semibold text-yellow-500">
                    {averageRating.toFixed(1)}
                  </span>
                  /5 ⭐
                </motion.p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

   

      {/* Sections below */}
      <section id="skills">
        <Skills />
      </section>
      <section id="projects" className="pt-10">
        <Project />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="contact">
        <Signup />
      </section>
      <section id="footer">
        <Footer />
      </section>
    </div>
  );
}