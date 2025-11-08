import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function OTP() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();

  // Handle OTP change
  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

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

  // Submit OTP
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length !== 4) {
      alert("Please enter the complete 4-digit OTP");
      return;
    }

    try {
      const res = await axios.post("http://localhost:1080/verify_admin_otp", {
        otp: otpCode,
      });


      if (res.data.status === "success") {
        alert("OTP verified successfully!");
        localStorage.setItem("admin_token", res.data.token);
        navigate("/"); // ✅ redirect to home
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-32 pb-20 transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="[background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] rounded-2xl shadow-xl p-8 w-80 sm:w-96"
      >
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center text-indigo-700 dark:text-cyan-300 mb-6"
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
                }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                whileFocus={{
                  scale: 1.15,
                  borderColor: "#6366f1",
                  boxShadow: "0px 0px 10px rgba(99,102,241,0.4)",
                }}
                transition={{ type: "spring", stiffness: 250 }}
                className="w-10 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-semibold border rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-black border-gray-700 dark:border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            ))}
          </div>

          {/* Verify Button */}
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 15px rgba(56,189,248,0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-2 mt-3 text-white bg-indigo-700 hover:bg-indigo-600 dark:bg-cyan-300 dark:text-black dark:hover:bg-cyan-400 font-semibold rounded-lg shadow-md transition"
          >
            Verify OTP
          </motion.button>

          {/* Resend Link */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-sm text-center text-black dark:text-white mt-4"
          >
            Didn’t receive the code?{" "}
            <motion.a
              whileHover={{ color: "#ef4444", scale: 1.05 }}
              href="#"
              className="text-indigo-700 dark:text-cyan-300 hover:underline"
            >
              Resend OTP
            </motion.a>
          </motion.p>
        </motion.form>
      </motion.div>
    </div>
  );
}
