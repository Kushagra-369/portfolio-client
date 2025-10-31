import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Signup() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div
      id="signup"
      className="pt-24 pb-20 px-6 sm:px-12 md:px-20 lg:px-32 font-[Outfit] min-h-screen overflow-y-auto 
      bg-linear-to-br from-gray-50 via-slate-100 to-gray-200 
      dark:from-slate-900 dark:via-blue-950 dark:to-cyan-950 
      text-gray-800 dark:text-white transition-colors duration-500"
    >
      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h1
          className="text-4xl md:text-5xl font-bold mb-8 
          bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent 
          dark:from-cyan-400 dark:to-blue-500"
        >
          Contact Me
        </h1>

        <p className="text-gray-600 dark:text-gray-400 text-lg mb-10">
          Feel free to reach out! I’d love to hear from you.
        </p>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6 
          bg-white/70 dark:bg-white/10 backdrop-blur-md 
          rounded-2xl p-8 shadow-lg 
          border border-blue-200 dark:border-cyan-400/20 
          transition-all duration-500"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Name */}
          <div className="text-left">
            <label className="block text-sm font-medium text-blue-700 dark:text-cyan-300 mb-2">
              Name <span className="text-red-500 dark:text-red-400">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl 
              bg-white border border-blue-200 
              focus:border-blue-500 outline-none text-gray-800 
              placeholder-gray-400
              dark:bg-white/5 dark:border-cyan-400/30 dark:focus:border-cyan-400 dark:text-white
              transition-all duration-300"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div className="text-left">
            <label className="block text-sm font-medium text-blue-700 dark:text-cyan-300 mb-2">
              Email <span className="text-red-500 dark:text-red-400">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl 
              bg-white border border-blue-200 
              focus:border-blue-500 outline-none text-gray-800 
              placeholder-gray-400
              dark:bg-white/5 dark:border-cyan-400/30 dark:focus:border-cyan-400 dark:text-white
              transition-all duration-300"
              placeholder="Enter your email"
            />
          </div>

          {/* Phone (Optional) */}
          <div className="text-left">
            <label className="block text-sm font-medium text-blue-700 dark:text-cyan-300 mb-2">
              Phone Number (optional)
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl 
              bg-white border border-blue-200 
              focus:border-blue-500 outline-none text-gray-800 
              placeholder-gray-400
              dark:bg-white/5 dark:border-cyan-400/30 dark:focus:border-cyan-400 dark:text-white
              transition-all duration-300"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Message */}
          <div className="text-left">
            <label className="block text-sm font-medium text-blue-700 dark:text-cyan-300 mb-2">
              Message
            </label>
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl 
              bg-white border border-blue-200 
              focus:border-blue-500 outline-none text-gray-800 
              placeholder-gray-400 resize-none
              dark:bg-white/5 dark:border-cyan-400/30 dark:focus:border-cyan-400 dark:text-white
              transition-all duration-300"
              placeholder="Write your message here..."
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 rounded-xl 
            bg-linear-to-r from-blue-500 to-cyan-500 
            hover:from-cyan-500 hover:to-blue-500 
            text-white font-semibold text-lg shadow-md 
            dark:from-cyan-500 dark:to-sky-500 
            dark:hover:from-sky-500 dark:hover:to-cyan-400 
            transition-all duration-500"
          >
            Submit
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
}
