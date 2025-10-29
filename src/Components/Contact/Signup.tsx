import { motion } from "framer-motion";
import { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
    alert("Signup Successful!");
  };

  const fields = [
    { label: "Name", type: "text", name: "name", placeholder: "Enter your name" },
    { label: "Email", type: "email", name: "email", placeholder: "Enter your email" },
    { label: "Password", type: "password", name: "password", placeholder: "Enter your password" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center pt-32 pb-20 transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] dark:bg-white dark:[background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] rounded-2xl shadow-xl p-8 w-80 sm:w-96"
      >
        {/* Animated heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center text-cyan-300 dark:text-blue-700 mb-6"
        >
          Create Account
        </motion.h2>

        {/* Animated form container */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          {fields.map((field, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 * index }}
            >
              <label className="block text-sm font-medium text-white dark:text-black mb-1">
                {field.label}
              </label>

              <motion.input
                whileFocus={{
                  scale: 1.03,
                  borderColor: "#38bdf8",
                  boxShadow: "0px 0px 8px rgba(56, 189, 248, 0.4)",
                }}
                transition={{ type: "spring", stiffness: 250 }}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name as keyof typeof formData]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-400"
              />
            </motion.div>
          ))}

          {/* Animated button */}
          <motion.button
            whileHover={{
              scale: 1.05,
              // backgroundColor: "#4f46e5",
              boxShadow: "0px 0px 15px rgba(99, 102, 241, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-2 mt-3 text-black bg-cyan-300 hover:bg-cyan-500 dark:bg-indigo-700 dark:text-white dark:hover:bg-indigo-600 font-semibold rounded-lg shadow-md  transition"
          >
            Sign Up
          </motion.button>
        </motion.form>

        {/* Animated bottom text */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-sm text-center text-white dark:text-black mt-5"
        >
          Already have an account?{" "}
          <motion.a
            whileHover={{ color: "#ef4444", scale: 1.05 }}
            href="/login"
            className="text-cyan-300 dark:text-blue-700 hover:underline"
          >
            Login
          </motion.a>
        </motion.p>
      </motion.div>
    </div>
  );
}
