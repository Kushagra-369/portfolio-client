import {  useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import {APIURL} from "../../GlobalAPIURL"
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
  SiMui
} from "react-icons/si";
import { Download, Mail, Sparkles, ArrowRight, Star } from "lucide-react";
import About from "../About/About";
import Skills from "../Skills/Skills";
import Project from "../Projects/Project";
import Signup from "../Contact/Signup";
import Footer from "../Footer/Footer";

export default function Home() {
  const location = useLocation();

  const [adminName, setAdminName] = useState("Kushagra Chhabra");
  const [profileImg, setProfileImg] = useState(
    "https://res.cloudinary.com/dynodadq0/image/upload/v1761790870/unnamed_adxxjm.jpg"
  );
  const [isHoveringImg, setIsHoveringImg] = useState(false);

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

  const [currentSkill, setCurrentSkill] = useState(0);
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

  const skills = [
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

  const featuredSkills = skills.slice(0, 3);

  return (
    <div id="home" className="min-h-screen relative overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-20 sm:pb-28 lg:pb-32 px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-24 transition-colors duration-700">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
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
                  transition: { duration: 0.2 }
                }}
                className="bg-linear-to-r from-cyan-400 to-blue-400 dark:from-cyan-300 dark:via-white dark:to-orange-400 bg-clip-text text-transparent inline-block cursor-pointer"
              >
                {adminName.split(" ")[0] || "Kushagra"}
              </motion.span>{" "}
              <motion.span
                whileHover={{ 
                  scale: 1.05,
                  textShadow: "0 0 20px rgba(156, 163, 175, 0.5)",
                  transition: { duration: 0.2 }
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
                whileHover={{ 
                  scale: 1.1,
                  color: "#06b6d4",
                  transition: { duration: 0.2 }
                }}
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
                whileHover={{ 
                  scale: 1.05,
                  color: "#06b6d4",
                  transition: { duration: 0.2 }
                }}
                className="font-semibold text-cyan-600 dark:text-cyan-400 inline-block cursor-pointer"
              >
                digital experiences
              </motion.span>{" "}
              that blend innovative design with cutting-edge technology. Specializing in modern web
              development with a focus on performance and user engagement.
            </motion.p>

            {/* Dynamic Skill + What I Do */}
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
                      transition: { duration: 0.2 }
                    }}
                    className={`text-lg font-bold bg-linear-to-r ${featuredSkills[currentSkill].gradient} bg-clip-text text-transparent cursor-pointer`}
                  >
                    {featuredSkills[currentSkill].name}
                  </motion.span>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* What I Do Section with Smooth Card Animations */}
            <section className="mt-20 select-none mb-16 text-center lg:text-left">
              <motion.h2 
                whileHover={{ 
                  scale: 1.05,
                  textShadow: "0 0 20px rgba(6, 182, 212, 0.5)",
                  transition: { duration: 0.2 }
                }}
                className="text-3xl font-bold mb-10 text-cyan-400 cursor-pointer inline-block"
              >
                What I Do
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { title: "Frontend Development", desc: "Crafting responsive, dynamic UIs using React, Next.js, and Tailwind CSS.", icon: "💻", color: "from-cyan-400 to-blue-500" },
                  { title: "Backend Engineering", desc: "Building scalable APIs with Node.js, Express, and MongoDB.", icon: "⚙️", color: "from-green-400 to-emerald-500" },
                  { title: "Animation & UX", desc: "Enhancing user experiences using Framer Motion and creative design.", icon: "🎨", color: "from-purple-400 to-pink-500" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2, duration: 0.6 }}
                    whileHover={{ 
                      y: -10,
                      transition: { duration: 0.3, ease: "easeOut" }
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
                          transition: { duration: 0.6, ease: "easeInOut" }
                        }}
                      >
                        {item.icon}
                      </motion.div>
                      
                      <motion.h3 
                        initial={{ x: 0 }}
                        whileHover={{ 
                          x: 10,
                          color: "#06b6d4",
                          transition: { duration: 0.2 }
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

            {/* Beautiful Buttons with Smooth Effects */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              {/* Get In Touch Button - Ripple Effect */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Link
                  to="#signup"
                  className="relative inline-flex items-center gap-3 bg-linear-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-semibold overflow-hidden group shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  {/* Ripple Effect Background */}
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

              {/* Download CV Button - Border Glow Effect */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Link
                  to="/resume"
                  className="relative inline-flex items-center gap-3 border-2 border-cyan-400 text-cyan-600 dark:text-cyan-400 px-8 py-4 rounded-2xl font-semibold backdrop-blur-sm overflow-hidden group hover:bg-cyan-500/10 transition-all duration-300"
                >
                  {/* Glowing Border Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                  
                  <Download className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium tracking-wide group-hover:text-white transition-colors duration-300">Download CV</span>
                  
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

          {/* Profile Image with Amazing Disco Lights */}
          <div className="flex flex-col items-center">
            <motion.div
              className="relative select-none shrink-0 w-full max-w-md lg:max-w-lg xl:max-w-xl"
              initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              onMouseEnter={() => setIsHoveringImg(true)}
              onMouseLeave={() => setIsHoveringImg(false)}
            >
              {/* Disco Lights - Multi-layered Rainbow Effect */}
              {isHoveringImg && (
                <>
                  {/* Outer Rainbow Ring */}
                  <motion.div 
                    className="absolute -inset-4 rounded-3xl"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(255,0,0,0.8), 0 0 40px rgba(255,0,0,0.4)",
                        "0 0 20px rgba(255,255,0,0.8), 0 0 40px rgba(255,255,0,0.4)",
                        "0 0 20px rgba(0,255,0,0.8), 0 0 40px rgba(0,255,0,0.4)",
                        "0 0 20px rgba(0,255,255,0.8), 0 0 40px rgba(0,255,255,0.4)",
                        "0 0 20px rgba(255,0,255,0.8), 0 0 40px rgba(255,0,255,0.4)",
                        "0 0 20px rgba(255,0,0,0.8), 0 0 40px rgba(255,0,0,0.4)"
                      ],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  
                  {/* Rotating Rainbow Border */}
                  <motion.div 
                    className="absolute -inset-2 rounded-2xl"
                    style={{
                      background: "conic-gradient(from 0deg, red, orange, yellow, green, blue, indigo, violet, red)"
                    }}
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  
                  {/* Pulsing Light Beams */}
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-16 h-16 rounded-full"
                      style={{
                        left: "50%",
                        top: "50%",
                        marginLeft: "-32px",
                        marginTop: "-32px",
                        background: `radial-gradient(circle, hsla(${i * 30}, 100%, 50%, 0.6), transparent)`,
                      }}
                      animate={{
                        scale: [1, 2, 1],
                        opacity: [0.6, 0, 0.6],
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.1,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                  
                  {/* Floating Colorful Particles */}
                  {[...Array(30)].map((_, i) => (
                    <motion.div
                      key={`particle-${i}`}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        background: `hsl(${Math.random() * 360}, 100%, 50%)`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        x: [0, (Math.random() - 0.5) * 200],
                        y: [0, (Math.random() - 0.5) * 200],
                        scale: [1, 2, 0],
                        opacity: [1, 0.5, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.05,
                        repeat: Infinity,
                        repeatDelay: Math.random() * 2,
                      }}
                    />
                  ))}
                </>
              )}
              
              {/* Static Glow Background */}
              <div className={`absolute inset-0 bg-linear-to-r from-cyan-500/20 via-blue-500/20 to-teal-500/20 rounded-3xl blur-xl transition-all duration-300 ${isHoveringImg ? 'opacity-100 scale-110' : 'opacity-50'}`} />
              
              <div className="relative rounded-3xl p-4 sm:p-6">
                {/* Animated Corner Decorations */}
                <motion.div
                  className="absolute -top-4 -left-4 w-8 h-8 bg-cyan-400 rounded-full shadow-lg"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 180, 360],
                    scale: isHoveringImg ? [1, 1.5, 1] : 1,
                    backgroundColor: isHoveringImg ? ["#06b6d4", "#ff0000", "#00ff00", "#0000ff", "#06b6d4"] : "#06b6d4"
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -bottom-4 -right-4 w-6 h-6 bg-blue-400 rounded-full shadow-lg"
                  animate={{
                    y: [0, 10, 0],
                    rotate: [360, 180, 0],
                    scale: isHoveringImg ? [1, 1.5, 1] : 1,
                    backgroundColor: isHoveringImg ? ["#3b82f6", "#ffff00", "#ff00ff", "#00ffff", "#3b82f6"] : "#3b82f6"
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                <div className="relative select-none rounded-2xl overflow-hidden bg-transparent p-2">
                  <motion.img
                    src={profileImg}
                    alt={`${adminName} - Full Stack Developer`}
                    className="w-full h-auto object-cover rounded-2xl shadow-2xl relative z-10"
                    animate={{
                      scale: isHoveringImg ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Disco Light Overlay Sweeping Effect */}
                  {isHoveringImg && (
                    <motion.div 
                      className="absolute inset-0 rounded-2xl"
                      animate={{
                        background: [
                          "linear-gradient(90deg, rgba(255,0,0,0.2), rgba(255,255,0,0.2), rgba(0,255,0,0.2), rgba(0,255,255,0.2), rgba(255,0,255,0.2))",
                          "linear-gradient(270deg, rgba(255,0,0,0.2), rgba(255,255,0,0.2), rgba(0,255,0,0.2), rgba(0,255,255,0.2), rgba(255,0,255,0.2))",
                          "linear-gradient(360deg, rgba(255,0,0,0.2), rgba(255,255,0,0.2), rgba(0,255,0,0.2), rgba(0,255,255,0.2), rgba(255,0,255,0.2))",
                        ],
                        backgroundSize: ["200% 100%", "200% 100%", "200% 100%"]
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  )}
                </div>
              </div>
            </motion.div>

            {/* Rating Stars with Animation */}
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
                        whileHover={{ 
                          scale: 1.3,
                          rotate: 360,
                          transition: { duration: 0.4 }
                        }}
                      >
                        <Star className="absolute top-0 left-0 w-6 h-6 text-gray-300 dark:text-gray-600" />
                        <div
                          className="absolute top-0 left-0 overflow-hidden"
                          style={{ width: `${fillPercent}%` }}
                        >
                          <motion.div
                            animate={isHoveringImg ? {
                              scale: [1, 1.2, 1],
                              transition: { duration: 0.5, repeat: Infinity }
                            } : {}}
                          >
                            <Star className="w-6 h-6 text-yellow-400" />
                          </motion.div>
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
                  <motion.span 
                    className="font-semibold text-yellow-500"
                    animate={isHoveringImg ? {
                      textShadow: ["0 0 0px gold", "0 0 10px gold", "0 0 0px gold"],
                      transition: { duration: 1, repeat: Infinity }
                    } : {}}
                  >
                    {averageRating.toFixed(1)}
                  </motion.span>
                  /5 ⭐
                </motion.p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Sections below */}
      <section id="skills"><Skills /></section>
      <section id="projects" className="pt-10"><Project /></section>
      <section id="about"><About /></section>
      <section id="contact"><Signup /></section>
      <section id="footer"><Footer /></section>
    </div>
  );
}