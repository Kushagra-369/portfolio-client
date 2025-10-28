import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import image1 from "../../Assets/Images/Profile.jpg";

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

  return (
    <div className="py-40 px-20 transition-colors duration-700">
      <div className="flex justify-between gap-10 items-center">
        {/* Text Section */}
        <div className="text-indigo-700 dark:text-cyan-300 max-w-xl">
          <h1 className="text-5xl font-extrabold mb-6 text-indigo-800 dark:text-cyan-200">
            Welcome to My Portfolio
          </h1>

          <p className="text-lg text-slate-700 dark:text-gray-300 leading-relaxed">
            I am a passionate developer with experience in building web applications.
          </p>

          <p className="text-lg mt-3 text-gray-800 dark:text-gray-300 leading-relaxed">
            I'm a full-stack web developer who loves turning ideas into interactive digital experiences.
            I specialize in{" "}
            <span className="font-semibold text-indigo-600 dark:text-cyan-200">React</span>,
            <span className="font-semibold text-indigo-600 dark:text-cyan-200"> Node.js</span>,
            and modern UI design.
          </p>

          <p className="mt-3 text-indigo-600 dark:text-cyan-300 font-medium">
            Skilled in JavaScript, React, Tailwind CSS, and Express.js — focused on building clean,
            responsive, and scalable web apps.
          </p>

          <p className="mt-3 text-slate-600 dark:text-gray-400 leading-relaxed">
            Currently exploring{" "}
            <span className="font-semibold text-indigo-500 dark:text-cyan-400">Next.js</span>
            and cloud technologies to create even more efficient web solutions.
          </p>
        </div>

        {/* Image Section with Tilt & Moving Border */}
        <motion.div
          ref={ref}
          className="relative p-1 rounded-3xl"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          {/* Moving Gradient Border */}
          <div className="absolute inset-0 rounded-3xl bg-linear-to-r  from-blue-700 via-black to-red-600 dark:from-cyan-300 dark:via-green-400 dark:to-yellow-300 animate-gradientMove"></div>

          {/* Image container (inner layer) */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-indigo-200 dark:shadow-cyan-900">
            <motion.img
              src={image1}
              alt="Profile"
              className="w-90 h-100 mr-10 rounded-4xl object-cover"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
