import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "../TestNotifivation/Notification";
import axios from "axios";

export default function OTP() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();

  // ✅ Handle change
  const handleChange = (value: string, index: number): void => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // ✅ Handle backspace navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number): void => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // ✅ Handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length !== 4) {
      showErrorToast("Please enter the complete 4-digit OTP");
      return;
    }

    try {
      const res = await axios.post("http://localhost:1080/verify_admin_otp", { otp: otpCode });
      if (res.data.status === "success") {
        showSuccessToast("OTP verified successfully!");
        localStorage.setItem("admin_token", res.data.token);
        setTimeout(() => navigate("/admin/dashboard"), 1000);
      } else {
        showErrorToast(res.data.message || "Invalid OTP");
      }
    } catch (err: any) {
      showErrorToast(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 dark:from-gray-950 dark:via-gray-900 dark:to-black transition-all duration-700">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="p-8 sm:p-10 w-80 sm:w-96 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 shadow-[0_0_30px_rgba(99,102,241,0.2)] dark:shadow-[0_0_35px_rgba(34,211,238,0.15)] backdrop-blur-xl"
      >
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold text-center mb-6 text-indigo-700 dark:text-cyan-300 tracking-wide drop-shadow-sm"
        >
          Verify OTP
        </motion.h2>

        {/* OTP Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col items-center space-y-6"
        >
          {/* OTP Inputs */}
          <div className="flex justify-center gap-3 sm:gap-4">
            {otp.map((digit, index) => (
              <motion.input
                key={index}
                ref={(el: HTMLInputElement | null): void => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                whileFocus={{
                  scale: 1.15,
                  boxShadow: "0 0 18px rgba(99,102,241,0.6)",
                }}
                transition={{ type: "spring", stiffness: 250 }}
                className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-bold rounded-2xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-indigo-200 dark:border-cyan-700 focus:border-indigo-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-cyan-500 outline-none shadow-md transition-all duration-200"
              />
            ))}
          </div>

          {/* Verify Button */}
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 25px rgba(99,102,241,0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 mt-3 rounded-xl text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700 dark:from-cyan-400 dark:to-cyan-500 dark:hover:from-cyan-300 dark:hover:to-cyan-400 shadow-lg transition-all duration-300"
          >
            Verify OTP
          </motion.button>

          {/* Resend OTP */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-sm text-center text-gray-700 dark:text-gray-300 mt-3"
          >
            Didn’t receive the code?{" "}
            <motion.a
              whileHover={{ color: "#ef4444", scale: 1.05 }}
              href="#"
              className="text-indigo-700 dark:text-cyan-300 font-medium hover:underline"
            >
              Resend OTP
            </motion.a>
          </motion.p>
        </motion.form>
      </motion.div>
    </div>
  );
}
