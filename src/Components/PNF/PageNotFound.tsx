import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; 
import type { Variants } from 'framer-motion';

export default function PageNotFound() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.1,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { 
      y: 20, 
      opacity: 0 
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };

  // Background particles animation variants
  const particleVariants: Variants = {
    animate: (i: number) => ({
      y: [0, -30, 0],
      opacity: [0.1, 0.3, 0.1],
      transition: {
        duration: 4 + i,
        repeat: Infinity,
        delay: i * 0.5
      }
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <motion.div
        className="text-center max-w-2xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 404 Number */}
        <motion.div
          className="relative mb-8"
          variants={itemVariants}
        >
          <motion.h1
            className="text-9xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
            animate={floatingAnimation}
          >
            404
          </motion.h1>
          
          {/* Floating elements */}
          <motion.div
            className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full opacity-60"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              transition: {
                duration: 4,
                repeat: Infinity,
                delay: 0.5
              }
            }}
          />
          <motion.div
            className="absolute -bottom-4 -right-4 w-6 h-6 bg-red-400 rounded-full opacity-60"
            animate={{
              y: [0, 15, 0],
              x: [0, -15, 0],
              transition: {
                duration: 3.5,
                repeat: Infinity,
                delay: 1
              }
            }}
          />
        </motion.div>

        {/* Title */}
        <motion.h2
          className="text-3xl font-bold text-white mb-4"
          variants={itemVariants}
        >
          Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-gray-400 text-lg mb-8 leading-relaxed"
          variants={itemVariants}
        >
          Oops! The page you're looking for seems to have been lost in cyberspace. 
          It might have been moved, deleted, or you entered the wrong URL.
        </motion.p>

        {/* Cybersecurity themed message */}
        <motion.div
          className="bg-gray-800 border-l-4 border-blue-500 p-4 mb-8 rounded-r-lg"
          variants={itemVariants}
        >
          <p className="text-blue-300 text-sm font-mono">
            <span className="text-green-400">$</span> status: 404_NOT_FOUND
            <br />
            <span className="text-green-400">$</span> security_check: PASSED
            <br />
            <span className="text-green-400">$</span> recommendation: RETURN_TO_SAFETY
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={itemVariants}
        >
          <Link to="/">
            <motion.button
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Back to Home
            </motion.button>
          </Link>
          
          <motion.button
            className="border border-gray-600 text-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()}
          >
            Go Back
          </motion.button>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="mt-12 text-gray-500 text-sm"
          variants={itemVariants}
        >
          <p>If you believe this is an error, please contact the administrator.</p>
          <p className="mt-2 font-mono text-xs">Error Code: 0x4E6F745F466F756E64</p>
        </motion.div>
      </motion.div>

      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            variants={particleVariants}
            animate="animate"
            custom={i}
          />
        ))}
      </div>
    </div>
  );
}