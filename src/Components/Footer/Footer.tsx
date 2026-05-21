import { motion } from "framer-motion";
import { 
  Github, Linkedin, Mail, Eye, Heart, ChevronUp, Sparkles, MapPin, Phone, 
  Code, Briefcase, Award,  MessageCircle,
  Zap,  GraduationCap, Trophy, Database, Server, Cloud,
  ShoppingBag, Plane, MessageSquare,  ExternalLink, 
   Hash, ThumbsUp, 

} from "lucide-react";
import { useEffect, useState } from "react";

export default function Footer() {
  const [visitors, setVisitors] = useState<number>(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // 24-hour visitor counter with localStorage
  useEffect(() => {
    const getOrUpdateVisitorCount = () => {
      const lastVisit = localStorage.getItem("lastVisitTimestamp");
      const currentTime = new Date().getTime();
      const twentyFourHours = 24 * 60 * 60 * 1000;
      
      let currentCount = localStorage.getItem("visitorCount");
      let count = currentCount ? parseInt(currentCount) : 0;
      
      if (!lastVisit || (currentTime - parseInt(lastVisit)) > twentyFourHours) {
        const newCount = count + 1;
        localStorage.setItem("visitorCount", newCount.toString());
        localStorage.setItem("lastVisitTimestamp", currentTime.toString());
        setVisitors(newCount);
      } else {
        setVisitors(count);
      }
    };
    
    getOrUpdateVisitorCount();
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  // Contact Info
  const contactInfo = [
    { icon: <Phone className="w-4 h-4" />, text: "+91 9468436924", href: "tel:+919468436924" },
    { icon: <Mail className="w-4 h-4" />, text: "kushagra369chhabra@gmail.com", href: "mailto:kushagra369chhabra@gmail.com" },
    { icon: <MapPin className="w-4 h-4" />, text: "India", href: "#" },
  ];

  // Social Links (Only GitHub, LinkedIn, Mail, LeetCode, WhatsApp)
  const socialLinks = [
    { 
      name: "GitHub", 
      url: "https://github.com/Kushagra-369", 
      icon: Github, 
      color: "hover:text-gray-900 dark:hover:text-white",
      bgColor: "hover:bg-gray-900"
    },
    { 
      name: "LinkedIn", 
      url: "https://www.linkedin.com/in/kushagra-chhabra-83b215355/", 
      icon: Linkedin, 
      color: "hover:text-blue-600",
      bgColor: "hover:bg-blue-600"
    },
    { 
      name: "LeetCode", 
      url: "https://leetcode.com/kushagra-369/", 
      icon: Code, 
      color: "hover:text-orange-500",
      bgColor: "hover:bg-orange-500"
    },
    { 
      name: "WhatsApp", 
      url: "https://wa.me/919468436924", 
      icon: MessageCircle, 
      color: "hover:text-green-500",
      bgColor: "hover:bg-green-500"
    },
    { 
      name: "Email", 
      url: "mailto:kushagra369chhabra@gmail.com", 
      icon: Mail, 
      color: "hover:text-red-500",
      bgColor: "hover:bg-red-500"
    },
  ];

  // Quick Links
  const quickLinks = [
    { name: "Home", hash: "#home", icon: <Zap className="w-3 h-3" /> },
    { name: "Skills", hash: "#skills", icon: <Code className="w-3 h-3" /> },
    { name: "Projects", hash: "#projects", icon: <Briefcase className="w-3 h-3" /> },
    { name: "Experience", hash: "#experience", icon: <Award className="w-3 h-3" /> },
    { name: "Contact", hash: "#contact", icon: <MessageCircle className="w-3 h-3" /> },
  ];

  // Projects
  const projects = [
    { name: "AuraLink", icon: <MessageSquare className="w-3 h-3" />, link: "https://aura-link-bw7g.vercel.app/" },
    { name: "Globex", icon: <Plane className="w-3 h-3" />, link: "https://travelling-client-orcin.vercel.app/" },
    { name: "FoodKing", icon: <ShoppingBag className="w-3 h-3" />, link: "https://food-client-33mf.vercel.app/" },
  ];

  // Tech Stack Categories
  const techStack = {
    frontend: ["React.js", "Next.js", "Tailwind CSS"],
    backend: ["Node.js", "Express.js", "Redis"],
    database: ["MongoDB", "MySQL"],
    devops: ["Docker", "AWS S3", "Git"]
  };

  // Stats/Achievements
  const stats = [
    { value: "250+", label: "DSA Problems Solved", icon: <Hash className="w-4 h-4" /> },
    { value: "12+", label: "Projects Completed", icon: <Briefcase className="w-4 h-4" /> },
    { value: "3+", label: "Production Apps", icon: <ThumbsUp className="w-4 h-4" /> },
    { value: "8.7", label: "B.Tech CGPA", icon: <GraduationCap className="w-4 h-4" /> },
  ];

  return (
    <footer className="relative w-full mt-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-linear-to-t from-gray-100 via-gray-50 to-white dark:from-slate-950 dark:via-blue-950/30 dark:to-cyan-950/20" />
      
      {/* Animated Orbs */}
      <motion.div
        className="absolute -top-20 -left-20 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 py-16 px-6 sm:px-12 font-['Outfit']">
        {/* Scroll to Top Button */}
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-3 bg-linear-to-r from-cyan-500 to-blue-500 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp className="w-5 h-5 group-hover:animate-bounce" />
          </motion.button>
        )}

        <div className="max-w-7xl mx-auto">
          {/* Top Bar with Admin Badge and Visitor Counter */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12">
            {/* Admin Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 180 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-linear-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 backdrop-blur-md shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-cyan-500 animate-pulse" />
                <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 tracking-wider">
                  PORTFOLIO
                </span>
                <Sparkles className="w-4 h-4 text-cyan-500 animate-pulse" />
              </motion.div>
            </motion.div>

            {/* Visitor Counter */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
            >
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500 to-blue-500 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-300" />
                <div className="relative flex items-center gap-3 px-6 py-2 rounded-full bg-linear-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 backdrop-blur-md shadow-lg">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Eye className="text-cyan-500" />
                  </motion.div>
                  <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                    {visitors.toLocaleString()} Unique Visitors
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Footer Grid - 4 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* Column 1: Profile & Contact */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <motion.h2
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent mb-2"
              >
                Kushagra Chhabra
              </motion.h2>
              <p className="text-cyan-600 dark:text-cyan-400 text-sm font-semibold mb-3">
                Full Stack Developer | Backend Engineer | MERN Stack
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                Full Stack Developer specializing in MERN stack with strong expertise in backend engineering, 
                scalable system design, and API development. Focused on writing clean, production-grade code.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                {contactInfo.map((info, idx) => (
                  <motion.a
                    key={idx}
                    href={info.href}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm hover:text-cyan-500 transition-colors"
                  >
                    <span className="text-cyan-500">{info.icon}</span>
                    {info.text}
                  </motion.a>
                ))}
              </div>

              {/* Availability Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-green-600 dark:text-green-400">Open for opportunities</span>
              </div>
            </motion.div>

            {/* Column 2: Quick Links & Projects */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.h3
                whileHover={{ x: 10 }}
                className="text-lg font-semibold bg-linear-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent mb-4"
              >
                Quick Links
              </motion.h3>
              <div className="space-y-2 mb-6">
                {quickLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.hash}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm hover:text-cyan-500 transition-all duration-300"
                  >
                    {link.icon}
                    {link.name}
                  </motion.a>
                ))}
              </div>

              <motion.h3
                whileHover={{ x: 10 }}
                className="text-lg font-semibold bg-linear-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent mb-4"
              >
                Featured Projects
              </motion.h3>
              <div className="space-y-2">
                {projects.map((project, index) => (
                  <motion.a
                    key={index}
                    href={project.link}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm hover:text-cyan-500 transition-all duration-300"
                  >
                    {project.icon}
                    {project.name}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Column 3: Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.h3
                whileHover={{ x: 10 }}
                className="text-lg font-semibold bg-linear-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent mb-4"
              >
                Tech Stack
              </motion.h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1">
                    <Server className="w-3 h-3" /> Frontend
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {techStack.frontend.map((tech, idx) => (
                      <span key={idx} className="px-2 py-0.5 text-xs rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1">
                    <Database className="w-3 h-3" /> Backend & Database
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {techStack.backend.map((tech, idx) => (
                      <span key={idx} className="px-2 py-0.5 text-xs rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                        {tech}
                      </span>
                    ))}
                    {techStack.database.map((tech, idx) => (
                      <span key={idx} className="px-2 py-0.5 text-xs rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1">
                    <Cloud className="w-3 h-3" /> DevOps & Tools
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {techStack.devops.map((tech, idx) => (
                      <span key={idx} className="px-2 py-0.5 text-xs rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Column 4: Achievements & Stats */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.h3
                whileHover={{ x: 10 }}
                className="text-lg font-semibold bg-linear-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent mb-4"
              >
                Achievements
              </motion.h3>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-2 rounded-lg bg-linear-to-br from-cyan-500/5 to-blue-500/5 border border-cyan-400/20"
                  >
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <span className="text-cyan-500">{stat.icon}</span>
                      <span className="text-base font-bold text-cyan-600 dark:text-cyan-400">
                        {stat.value}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-3 rounded-lg bg-linear-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-400/20"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Additional</p>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  • 250+ DSA Problems on LeetCode<br />
                  • 3+ Production-level Applications<br />
                  • Hackathon Participant
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Social Links Section - Centered */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex flex-wrap justify-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <div className={`absolute -inset-2 bg-linear-to-r from-cyan-500 to-blue-500 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-300 ${social.bgColor}`} />
                  <div className="relative p-3 bg-white/10 dark:bg-gray-900/50 rounded-full border border-cyan-400/30 group-hover:border-cyan-400 transition-all duration-300">
                    <social.icon className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-colors ${social.color}`} />
                  </div>
                  <span className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-xs text-cyan-500 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {social.name}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
            className="h-px bg-linear-to-r from-transparent via-cyan-400/50 to-transparent"
          />

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {currentYear} Kushagra Chhabra. All Rights Reserved.
            </p>
            <motion.p
              whileHover={{ scale: 1.02 }}
              className="text-xs text-gray-400 dark:text-gray-500 mt-2 flex items-center justify-center gap-1 flex-wrap"
            >
              Built with{" "}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-3 h-3 text-red-500 fill-red-500" />
              </motion.div>
              {" "}using React, TypeScript, Tailwind CSS & Framer Motion
            </motion.p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}