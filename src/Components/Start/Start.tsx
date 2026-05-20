import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Code, Palette, Rocket } from "lucide-react";
import { useEffect, useState } from "react";

interface StartProps {
  onStart: () => void;
}

export default function Start({ onStart }: StartProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Floating particles
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 5 + Math.random() * 10,
    delay: Math.random() * 5,
    size: 2 + Math.random() * 4,
  }));

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center font-[Outfit]">
      
      {/* Animated Background */}
      <div className="absolute inset-0 bg-black">
        {/* Gradient Orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
          transition={{ duration: 0.5 }}
          className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/20 blur-3xl rounded-full"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            x: mousePosition.x * -0.01,
            y: mousePosition.y * -0.01,
          }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-[-20%] right-1/2 translate-x-1/2 w-[500px] h-[500px] bg-blue-600/20 blur-3xl rounded-full"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            x: mousePosition.x * 0.015,
            y: mousePosition.y * 0.015,
          }}
          transition={{ duration: 0.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/10 blur-3xl rounded-full"
        />

        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1e3a8a_0%,#000_60%,#000_100%)] opacity-70" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-size-[50px_50px]" />
      </div>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-cyan-400/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating Icons Background with Hover Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[Code, Palette, Rocket, Sparkles].map((Icon, idx) => (
          <motion.div
            key={idx}
            className="absolute text-cyan-400/10 cursor-pointer pointer-events-auto"
            style={{
              left: `${15 + idx * 25}%`,
              top: `${20 + idx * 15}%`,
            }}
            onMouseEnter={() => setHoveredIcon(idx)}
            onMouseLeave={() => setHoveredIcon(null)}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              scale: hoveredIcon === idx ? 1.5 : 1,
              opacity: hoveredIcon === idx ? 0.8 : 0.3,
            }}
            transition={{
              y: { duration: 8 + idx * 2, repeat: Infinity, ease: "linear" },
              rotate: { duration: 8 + idx * 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 0.3 },
              opacity: { duration: 0.3 },
            }}
          >
            <Icon size={40 + idx * 10} />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
      >
        {/* Animated Border Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 rounded-full blur-3xl bg-linear-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 -z-10"
        />

        {/* Small top text with typing effect */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="overflow-hidden"
        >
          <motion.p
            animate={{ 
              x: [0, 5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="text-cyan-400 tracking-[0.3em] uppercase text-sm mb-4 inline-block cursor-pointer"
            whileHover={{ 
              letterSpacing: "0.5em",
              textShadow: "0 0 10px rgba(34,211,238,0.5)",
            }}
          >
            ✦ Welcome to My Universe ✦
          </motion.p>
        </motion.div>

        {/* Main Heading with Split Text Animation */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white leading-tight"
          >
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-block cursor-pointer"
              whileHover={{ 
                scale: 1.05,
                textShadow: "0 0 20px rgba(34,211,238,0.5)",
                transition: { duration: 0.2 }
              }}
            >
              Kushagra
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="block bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent relative cursor-pointer"
              whileHover={{ 
                scale: 1.05,
                filter: "brightness(1.2)",
              }}
            >
              Portfolio
              {/* Animated underline */}
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute bottom-0 left-0 h-[3px] bg-linear-to-r from-cyan-400 to-blue-500"
              />
            </motion.span>
          </motion.h1>
        </div>

        {/* Subtitle with Stagger Animation */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-6 text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed cursor-pointer"
          whileHover={{ 
            scale: 1.02,
            color: "#ffffff",
            transition: { duration: 0.2 }
          }}
        >
          Full Stack Developer crafting cinematic web experiences,
          interactive interfaces, and scalable applications.
        </motion.p>

        {/* Stats/Info Bar with Hover Effects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap justify-center gap-8 mt-12"
        >
          {[
            { label: "Projects", value: "10+", icon: Rocket, color: "from-cyan-400 to-blue-400" },
            { label: "Experience", value: "1+ Year", icon: Code, color: "from-purple-400 to-pink-400" },
            { label: "Technologies", value: "15+", icon: Sparkles, color: "from-green-400 to-emerald-400" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              onMouseEnter={() => setHoveredStat(idx)}
              onMouseLeave={() => setHoveredStat(null)}
              animate={{
                scale: hoveredStat === idx ? 1.15 : 1,
                y: hoveredStat === idx ? -8 : 0,
              }}
              transition={{ duration: 0.2 }}
              className="relative flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-cyan-400/20 cursor-pointer overflow-hidden group"
            >
              {/* Hover Background Effect */}
              <motion.div
                className="absolute inset-0 bg-linear-to-r opacity-0 group-hover:opacity-100"
                style={{ background: `linear-gradient(135deg, ${stat.color.split(' ')[1]}, ${stat.color.split(' ')[3]})` }}
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
              
              <stat.icon className="relative z-10 w-5 h-5 text-cyan-400 group-hover:text-white transition-colors duration-300" />
              <div className="relative z-10">
                <div className="text-white font-bold group-hover:text-white transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-400 group-hover:text-white/80 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
              
              {/* Glow Effect on Hover */}
              <motion.div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                animate={{
                  boxShadow: hoveredStat === idx ? "0 0 20px rgba(34,211,238,0.5)" : "none",
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Animated Button with Enhanced Hover Effects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="relative inline-block"
        >
          <motion.button
            whileHover={{ 
              scale: 1.08,
              boxShadow: "0 0 30px rgba(34,211,238,0.8)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="group relative mt-12 inline-flex items-center gap-3 px-8 py-4 rounded-full
            bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600
            transition-all duration-300 text-white font-semibold text-lg shadow-2xl
            overflow-hidden"
          >
            {/* Button Background Animation */}
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-cyan-400 to-blue-400"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            
            {/* Ripple Effect on Hover */}
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ 
                scale: 2,
                opacity: [0, 0.3, 0],
                transition: { duration: 0.5, repeat: Infinity }
              }}
            />
            
            {/* Button Content */}
            <span className="relative z-10 flex items-center gap-3">
              Explore My Work
              <motion.div
                animate={{ 
                  x: [0, 5, 0],
                  rotate: [0, 360, 0],
                }}
                transition={{ 
                  x: { duration: 1, repeat: Infinity },
                  rotate: { duration: 0.5 }
                }}
              >
                <ArrowRight size={22} />
              </motion.div>
            </span>
          </motion.button>

          {/* Button Glow Effect */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.2, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="absolute inset-0 rounded-full bg-linear-to-r from-cyan-500 to-blue-500 blur-xl -z-10"
          />
        </motion.div>

        {/* Scroll Indicator with Hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
          whileHover={{ y: -5 }}
        >
          <span className="text-xs text-gray-400 tracking-wider hover:text-cyan-400 transition-colors duration-300">
            SCROLL
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-0.5 h-8 bg-linear-to-b from-cyan-400 to-transparent"
          />
        </motion.div>
      </motion.div>

      {/* Animated Bottom linear */}
      <motion.div 
        animate={{ 
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-cyan-500/20 via-transparent to-transparent pointer-events-none"
      />
    </div>
  );
}