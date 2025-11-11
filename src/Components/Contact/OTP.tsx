import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "../TestNotifivation/Notification";
import axios from "axios";

export default function OTP() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();

  // ⏱ Start Countdown
  useEffect(() => {
    let interval: any;

    if (isResendDisabled) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isResendDisabled]);

  // ✅ Handle OTP input
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

  // ✅ Backspace auto-focus
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number): void => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // ✅ Verify OTP
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

  // 🔄 Resend OTP
  const handleResend = async () => {
    setOtp(["", "", "", ""]);
    setIsResendDisabled(true);
    setTimer(30);

    try {
      await axios.get("http://localhost:1080/resend_admin_otp");
      showSuccessToast("OTP Resent Successfully!");
    } catch {
      showErrorToast("Failed to resend OTP");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden text-white px-6">

      {/* 🌈 Animated Floating Background */}
      <motion.div className="absolute inset-0 -z-10">
        <motion.div
          animate={{ x: ["-20%", "20%", "-20%"], y: ["-20%", "20%", "-20%"] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          className="absolute w-[500px] h-[500px] rounded-full blur-[180px] bg-cyan-600/30 top-[-10%] left-[-20%]"
        />

        <motion.div
          animate={{ x: ["20%", "-10%", "20%"], y: ["10%", "-20%", "10%"] }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          className="absolute w-[500px] h-[500px] rounded-full blur-[180px] bg-violet-600/30 bottom-[-10%] right-[-20%]"
        />
      </motion.div>

      {/* 🌟 OTP Card */}
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="p-8 sm:p-10 w-80 sm:w-96 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_0_40px_rgba(0,200,255,0.25)]"
      >
        <motion.h2 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold text-center mb-4 tracking-wide">
          Verify OTP
        </motion.h2>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-sm text-cyan-300 mb-6">
          Enter the 4-digit code sent to your email.
        </motion.p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6">

          {/* OTP Inputs */}
          <div className="flex gap-4 justify-center">
            {otp.map((digit, index) => (
              <motion.input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-14 h-16 text-center text-2xl font-bold rounded-2xl bg-gray-900/50 border border-cyan-400/50 text-white focus:ring-2 focus:ring-cyan-400 transition-all"
                whileFocus={{ scale: 1.15, boxShadow: "0 0 20px rgba(0,255,255,0.5)" }}
              />
            ))}
          </div>

          {/* Verify Button */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,255,255,0.4)" }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold shadow-xl"
          >
            Verify OTP
          </motion.button>

          {/* Countdown / Resend */}
          <p className="text-sm text-center text-gray-300">
            {isResendDisabled ? (
              <>Resend OTP in <span className="text-cyan-300 font-bold">{timer}s</span></>
            ) : (
              <button onClick={handleResend} className="text-cyan-400 font-semibold hover:text-cyan-200 transition-all">
                Resend OTP
              </button>
            )}
          </p>
        </form>
      </motion.div>
    </div>
  );
}
