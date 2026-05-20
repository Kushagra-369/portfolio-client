import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Eye, Heart, ChevronUp, Sparkles, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";

export default function Footer() {
  const [visitors, setVisitors] = useState<number>(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // 24-hour visitor counter with localStorage
  useEffect(() => {
    const getOrUpdateVisitorCount = () => {
      const lastVisit = localStorage.getItem("lastVisitTimestamp");
      const currentTime = new Date().getTime();
      const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      
      let currentCount = localStorage.getItem("visitorCount");
      let count = currentCount ? parseInt(currentCount) : 0;
      
      // Check if last visit was more than 24 hours ago
      if (!lastVisit || (currentTime - parseInt(lastVisit)) > twentyFourHours) {
        // New unique visit in last 24 hours
        const newCount = count + 1;
        localStorage.setItem("visitorCount", newCount.toString());
        localStorage.setItem("lastVisitTimestamp", currentTime.toString());
        setVisitors(newCount);
      } else {
        // Use existing count
        setVisitors(count);
      }
    };
    
    getOrUpdateVisitorCount();
    
    // Show scroll button after scrolling
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

  return (
    <footer className="relative w-full mt-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-linear-to-t from-gray-100 via-gray-50 to-white dark:from-slate-950 dark:via-blue-950/30 dark:to-cyan-950/20" />
      
      {/* Animated linear Orbs */}
      <motion.div
        className="absolute -top-20 -left-20 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 py-16 px-6 sm:px-12 font-[Outfit]">
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

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto">
          {/* Admin Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotateY: 180 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-linear-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 backdrop-blur-md shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-cyan-500 animate-pulse" />
              <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 tracking-wider">
                ADMIN PORTAL
              </span>
              <Sparkles className="w-4 h-4 text-cyan-500 animate-pulse" />
            </motion.div>
          </motion.div>

          {/* Visitor Counter - 24 Hour Unique */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
            className="flex justify-center mb-12"
          >
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500 to-blue-500 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-300" />
              <div className="relative flex items-center gap-3 px-8 py-3 rounded-full bg-linear-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 backdrop-blur-md shadow-lg">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <Eye className="text-cyan-500" />
                </motion.div>
                <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                  Total Unique Visitors: {visitors.toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Left Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center md:text-left"
            >
              <motion.h2
                whileHover={{ scale: 1.05 }}
                className="text-3xl font-bold bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent mb-4"
              >
                KC Kushagra Chhabra
              </motion.h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base max-w-md mx-auto md:mx-0">
                Passionate Full Stack Developer focused on creating immersive and
                efficient digital experiences through clean code, creative design,
                and performance-driven development.
              </p>
              
              {/* Contact Info */}
              <div className="mt-4 space-y-2">
                <motion.p
                  whileHover={{ x: 5 }}
                  className="text-gray-500 dark:text-gray-500 text-sm flex items-center justify-center md:justify-start gap-2"
                >
                  <MapPin className="w-4 h-4 text-cyan-500" />
                  India
                </motion.p>
                <motion.p
                  whileHover={{ x: 5 }}
                  className="text-gray-500 dark:text-gray-500 text-sm flex items-center justify-center md:justify-start gap-2"
                >
                  <Phone className="w-4 h-4 text-cyan-500" />
                  Available for work
                </motion.p>
              </div>
            </motion.div>

            {/* Middle Section - Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center md:text-left"
            >
              <motion.h3
                whileHover={{ x: 10 }}
                className="text-xl font-semibold bg-linear-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent mb-4"
              >
                Quick Links
              </motion.h3>
              <div className="flex flex-col gap-3">
                {[
                  { name: "Home", hash: "#home" },
                  { name: "Skills", hash: "#skills" },
                  { name: "Projects", hash: "#projects" },
                  { name: "About", hash: "#about" },
                  { name: "Contact", hash: "#contact" },
                ].map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.hash}
                    custom={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 10, color: "#06b6d4" }}
                    className="text-gray-600 dark:text-gray-400 text-sm hover:text-cyan-500 transition-all duration-300 inline-block w-fit mx-auto md:mx-0"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Right Section - Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center md:text-left"
            >
              <motion.h3
                whileHover={{ x: 10 }}
                className="text-xl font-semibold bg-linear-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent mb-4"
              >
                Connect With Me
              </motion.h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 max-w-xs mx-auto md:mx-0">
                Let's connect for collaborations, projects, or opportunities.
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <motion.a
                  href="https://github.com/Kushagra-369"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                  className="relative group"
                >
                  <div className="absolute -inset-2 bg-linear-to-r from-cyan-500 to-blue-500 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-300" />
                  <div className="relative p-2 bg-white/10 dark:bg-gray-900/50 rounded-full border border-cyan-400/30 group-hover:border-cyan-400 transition-all duration-300">
                    <Github className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-cyan-500 transition-colors" />
                  </div>
                </motion.a>

                <motion.a
                  href="https://www.linkedin.com/in/kushagra-chhabra-83b215355/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                  className="relative group"
                >
                  <div className="absolute -inset-2 bg-linear-to-r from-cyan-500 to-blue-500 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-300" />
                  <div className="relative p-2 bg-white/10 dark:bg-gray-900/50 rounded-full border border-cyan-400/30 group-hover:border-cyan-400 transition-all duration-300">
                    <Linkedin className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-cyan-500 transition-colors" />
                  </div>
                </motion.a>

                <motion.a
                  href="https://mail.google.com/mail/?view=cm&to=kushagra100chhabra@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                  className="relative group"
                >
                  <div className="absolute -inset-2 bg-linear-to-r from-cyan-500 to-blue-500 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-300" />
                  <div className="relative p-2 bg-white/10 dark:bg-gray-900/50 rounded-full border border-cyan-400/30 group-hover:border-cyan-400 transition-all duration-300">
                    <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-cyan-500 transition-colors" />
                  </div>
                </motion.a>
              </div>
            </motion.div>
          </div>

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
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {currentYear} All Rights Reserved.{" "}
              <span className="text-cyan-500 dark:text-cyan-400 font-medium">
                Kushagra Chhabra
              </span>
            </p>
            <motion.p
              whileHover={{ scale: 1.05 }}
              className="text-xs text-gray-400 dark:text-gray-500 mt-2 flex items-center justify-center gap-1"
            >
              Designed & Built with{" "}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              >
                <Heart className="w-3 h-3 text-red-500 fill-red-500" />
              </motion.div>
              {" "}using React & Framer Motion
            </motion.p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}