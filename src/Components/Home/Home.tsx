import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Link } from "react-router-dom"; // ✅ make sure this import is at the top
import {
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiExpress,
  SiNodedotjs,
  SiNextdotjs,
  SiMongodb,
} from "react-icons/si";
import { Download, Mail } from "lucide-react"; // ✅ Added icons
import image1 from "../../assets/Images/Profile.jpg";

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [10, -10]);
  const rotateY = useTransform(x, [-50, 50], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    x.set(offsetX);
    y.set(offsetY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // 🎯 Skill Data
  const skills = [
    { name: "JavaScript", icon: <SiJavascript className="text-yellow-400 text-2xl" /> },
    { name: "React", icon: <SiReact className="text-sky-400 text-2xl" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400 text-2xl" /> },
    { name: "Express.js", icon: <SiExpress className="text-gray-300 text-2xl" /> },
    { name: "Node.js", icon: <SiNodedotjs className="text-green-500 text-2xl" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-white text-2xl" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-green-600 text-2xl" /> },
  ];

  return (
    <div className="py-24 px-6 lg:px-16 transition-colors duration-700">
      <div className="md:flex justify-around gap-10 items-center">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-indigo-700 py-5 lg:py-10 dark:text-cyan-300 max-w-xl"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold mb-6 text-indigo-800 dark:text-cyan-200">
            Welcome to My Portfolio
          </h1>

          <p className="text-sm lg:text-xl text-slate-700 dark:text-gray-300 leading-relaxed mb-4">
            I am a passionate developer with experience in building web applications.
          </p>

          <p className="text-sm lg:text-xl text-gray-800 dark:text-gray-300 leading-relaxed mb-4">
            I specialize in creating modern, scalable, and interactive digital experiences.
          </p>

          {/* 💡 Skills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 px-3 py-2 bg-indigo-100 dark:bg-cyan-900 rounded-xl shadow-md hover:shadow-lg transition-transform hover:-translate-y-1"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {skill.icon}
                <span className="font-medium text-indigo-800 dark:text-cyan-200 text-sm sm:text-base">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>

          {/* 📞 Contact & Download Buttons */}
          <div className="flex gap-4 mt-10">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/signup"
                className="flex items-center gap-2 bg-indigo-600 dark:bg-cyan-600 text-white px-5 py-2 rounded-full shadow-md hover:shadow-lg transition"
              >
                <Mail className="w-4 h-4" />
                Contact Me
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/resume"
                className="flex items-center gap-2 border border-indigo-600 dark:border-cyan-500 text-indigo-700 dark:text-cyan-300 px-5 py-2 rounded-full hover:bg-indigo-50 dark:hover:bg-cyan-900 transition"
              >
                <Download className="w-4 h-4" />
                Download
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Image Section with Tilt & Swirl Animation */}
        <motion.div
          ref={ref}
          className="relative p-1 lg:py-15 rounded-3xl"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY }}
          whileHover={{ scale: 1.05 }}
          initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="relative flex items-center justify-center px-2 py-4">
            {/* Gradient background layer */}
            <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-blue-700 via-black to-red-600 dark:from-cyan-300 dark:via-green-400 dark:to-yellow-300 animate-gradientMove"></div>

            {/* Image container */}
            <div className="relative rounded-3xl flex justify-center">
              <motion.img
                src={image1}
                alt="Profile"
                className="w-56 h-64 sm:w-64 sm:h-72 md:w-72 md:h-80 lg:w-80 lg:h-96 object-cover rounded-3xl shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
