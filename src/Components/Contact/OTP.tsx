import { motion } from "framer-motion";
import { useState, useRef } from "react";

export default function OTP() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Handle OTP change
  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if value entered
      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle Backspace navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`OTP Verified: ${otp.join("")}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-32 pb-20 transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] dark:bg-white dark:[background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] rounded-2xl shadow-xl p-8 w-80 sm:w-96"
      >
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center text-cyan-300 dark:text-blue-700 mb-6"
        >
          Verify OTP
        </motion.h2>

        {/* OTP Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="flex flex-col items-center space-y-6"
        >
          {/* OTP Inputs */}
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <motion.input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }} // ✅ FIXED: void return
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                whileFocus={{
                  scale: 1.15,
                  borderColor: "#38bdf8",
                  boxShadow: "0px 0px 10px rgba(56,189,248,0.4)",
                }}
                transition={{ type: "spring", stiffness: 250 }}
                className="w-10 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-semibold border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            ))}
          </div>

          {/* Verify Button */}
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 15px rgba(99,102,241,0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-2 mt-3 text-black bg-cyan-300 hover:bg-cyan-500 dark:bg-indigo-700 dark:text-white dark:hover:bg-indigo-600 font-semibold rounded-lg shadow-md transition"
          >
            Verify OTP
          </motion.button>

          {/* Resend Link */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-sm text-center text-white dark:text-black mt-4"
          >
            Didn’t receive the code?{" "}
            <motion.a
              whileHover={{ color: "#ef4444", scale: 1.05 }}
              href="#"
              className="text-cyan-300 dark:text-blue-700 hover:underline"
            >
              Resend OTP
            </motion.a>
          </motion.p>
        </motion.form>
      </motion.div>
    </div>
  );
}
