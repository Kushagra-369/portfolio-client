import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { APIURL } from "../../GlobalAPIURL";
import { useTheme } from "../../Context/ThemeContext";

export default function Signup() {
  const { theme } = useTheme();
  const isLove = theme === "love";
  const isHorror = theme === "horror";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const payload = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phone,
        message: formData.message,
      };

      const res = await axios.post(`${APIURL}/create_message`, payload);

      if (res.status === 201) {
        alert("✅ Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      }
    } catch (error: any) {
      console.error("Error submitting message:", error);
      alert("❌ Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="signup"
      className="pt-24 pb-20 px-6 sm:px-12 md:px-20 lg:px-32 font-[Outfit] min-h-screen overflow-y-auto
      bg-linear-to-br from-gray-50 via-slate-100 to-gray-200
      dark:from-slate-900 dark:via-blue-950 dark:to-cyan-950
      love:from-pink-50 love:via-rose-100 love:to-pink-100
      horror:from-zinc-900 horror:via-neutral-900 horror:to-black
      text-gray-800 dark:text-white
      love:text-pink-900
      horror:text-red-100
      transition-colors duration-500"
    >
      {/* ============ THEME FONTS + TEXT GLOW ============ */}
      <style>
        {`
          /* HORROR — glowing white-red text */
          .contact-horror-text,
          .contact-horror-text * {
            font-family: 'Creepster', 'Nosifer', 'Eater', 'Butcherman', cursive !important;
            letter-spacing: 0.08em !important;
            color: #ffffff !important;
            -webkit-text-fill-color: #ffffff !important;
            text-shadow:
              0 0 4px #ffdddd,
              0 0 10px #ff3333,
              0 0 20px #ff0000,
              0 0 40px #cc0000,
              0 0 80px #8b0000,
              0 4px 2px #000 !important;
          }
          .contact-horror-text-soft,
          .contact-horror-text-soft * {
            font-family: 'Creepster', 'Nosifer', cursive !important;
            color: #ffdddd !important;
            -webkit-text-fill-color: #ffdddd !important;
            text-shadow:
              0 0 6px #ff3333,
              0 0 16px #cc0000,
              0 0 32px #8b0000,
              0 2px 2px #000 !important;
          }

          /* LOVE — dark rose text + pink glow */
          .contact-love-text,
          .contact-love-text * {
            font-family: 'Dancing Script', 'Great Vibes', cursive !important;
            letter-spacing: 0.02em !important;
            color: #7a0038 !important;
            -webkit-text-fill-color: #7a0038 !important;
            text-shadow:
              0 0 6px rgba(255, 182, 213, 0.9),
              0 0 14px rgba(244, 114, 182, 0.7),
              0 1px 0 rgba(255, 255, 255, 0.6) !important;
          }
          .contact-love-text-soft,
          .contact-love-text-soft * {
            font-family: 'Dancing Script', cursive !important;
            color: #8b0040 !important;
            -webkit-text-fill-color: #8b0040 !important;
            text-shadow:
              0 0 6px rgba(244, 114, 182, 0.55),
              0 1px 0 rgba(255, 255, 255, 0.55) !important;
          }

          /* Horror / Love form glow */
          @keyframes contactHorrorPulse {
            0%, 100% { box-shadow: 0 0 25px rgba(180,0,0,0.55), 0 0 70px rgba(90,0,0,0.45); }
            50%      { box-shadow: 0 0 45px rgba(255,20,20,0.9), 0 0 120px rgba(140,0,0,0.75); }
          }
          @keyframes contactLovePulse {
            0%, 100% { box-shadow: 0 0 25px rgba(244,114,182,0.7), 0 0 70px rgba(219,39,119,0.5); }
            50%      { box-shadow: 0 0 45px rgba(255,182,213,1), 0 0 120px rgba(244,114,182,0.85); }
          }
        `}
      </style>

      {/* Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Creepster&family=Nosifer&family=Eater&family=Butcherman&family=Dancing+Script:wght@400;700&family=Great+Vibes&display=swap"
      />

      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* ============ HEADING ============ */}
        <h1
          className={`
            text-4xl md:text-5xl font-bold mb-8
            bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent
            dark:from-cyan-400 dark:to-blue-500
            ${isHorror ? "contact-horror-text" : ""}
            ${isLove ? "contact-love-text" : ""}
          `}
        >
          Contact Me
        </h1>

        <p
          className={`
            text-lg mb-10
            text-gray-600 dark:text-gray-400
            love:text-pink-800
            horror:text-red-200
            ${isHorror ? "contact-horror-text-soft" : ""}
            ${isLove ? "contact-love-text-soft" : ""}
          `}
        >
          Feel free to reach out! I'd love to hear from you.
        </p>

        {/* ============ FORM ============ */}
        <motion.form
          onSubmit={handleSubmit}
          className={`
            space-y-6 backdrop-blur-md rounded-2xl p-8 select-none transition-all duration-500
            bg-white/70 dark:bg-white/10
            border border-blue-200 dark:border-cyan-400/20
            shadow-lg
            love:bg-pink-50/80 love:border-pink-400/60
            horror:bg-black/70 horror:border-red-700/80
          `}
          style={{
            animation: isHorror
              ? "contactHorrorPulse 4s ease-in-out infinite"
              : isLove
                ? "contactLovePulse 4s ease-in-out infinite"
                : undefined,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Name */}
          <div className="text-left">
            <label
              className={`
                block text-sm font-medium mb-2
                text-blue-700 dark:text-cyan-300
                love:text-pink-800
                horror:text-red-300
                ${isHorror ? "contact-horror-text-soft" : ""}
                ${isLove ? "contact-love-text-soft" : ""}
              `}
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className={`
                w-full px-4 py-3 rounded-xl transition-all duration-300 outline-none
                bg-white border border-blue-200 text-gray-800 placeholder-gray-400
                focus:border-blue-500
                dark:bg-white/5 dark:border-cyan-400/30 dark:focus:border-cyan-400 dark:text-white
                love:bg-pink-50! love:border-pink-400/70! love:text-pink-900!
love:placeholder:text-pink-400! love:focus:border-pink-500!
horror:bg-black/60! horror:border-red-700/80! horror:text-red-100!
horror:placeholder:text-red-400/60! horror:focus:border-red-500!
              `}
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div className="text-left">
            <label
              className={`
                block text-sm font-medium mb-2
                text-blue-700 dark:text-cyan-300
                love:text-pink-800
                horror:text-red-300
                ${isHorror ? "contact-horror-text-soft" : ""}
                ${isLove ? "contact-love-text-soft" : ""}
              `}
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={`
                w-full px-4 py-3 rounded-xl transition-all duration-300 outline-none
                bg-white border border-blue-200 text-gray-800 placeholder-gray-400
                focus:border-blue-500
                dark:bg-white/5 dark:border-cyan-400/30 dark:focus:border-cyan-400 dark:text-white
               love:bg-pink-50! love:border-pink-400/70! love:text-pink-900!
love:placeholder:text-pink-400! love:focus:border-pink-500!
horror:bg-black/60! horror:border-red-700/80! horror:text-red-100!
horror:placeholder:text-red-400/60! horror:focus:border-red-500!
              `}
              placeholder="Enter your email"
            />
          </div>

          {/* Phone */}
          <div className="text-left">
            <label
              className={`
                block text-sm font-medium mb-2
                text-blue-700 dark:text-cyan-300
                love:text-pink-800
                horror:text-red-300
                ${isHorror ? "contact-horror-text-soft" : ""}
                ${isLove ? "contact-love-text-soft" : ""}
              `}
            >
              Phone Number (optional)
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`
                w-full px-4 py-3 rounded-xl transition-all duration-300 outline-none
                bg-white border border-blue-200 text-gray-800 placeholder-gray-400
                focus:border-blue-500
                dark:bg-white/5 dark:border-cyan-400/30 dark:focus:border-cyan-400 dark:text-white
               love:bg-pink-50! love:border-pink-400/70! love:text-pink-900!
love:placeholder:text-pink-400! love:focus:border-pink-500!
horror:bg-black/60! horror:border-red-700/80! horror:text-red-100!
horror:placeholder:text-red-400/60! horror:focus:border-red-500!
              `}
              placeholder="Enter your phone number"
            />
          </div>

          {/* Message */}
          <div className="text-left">
            <label
              className={`
                block text-sm font-medium mb-2
                text-blue-700 dark:text-cyan-300
                love:text-pink-800
                horror:text-red-300
                ${isHorror ? "contact-horror-text-soft" : ""}
                ${isLove ? "contact-love-text-soft" : ""}
              `}
            >
              Message
            </label>
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className={`
                w-full px-4 py-3 rounded-xl transition-all duration-300 outline-none resize-none
                bg-white border border-blue-200 text-gray-800 placeholder-gray-400
                focus:border-blue-500
                dark:bg-white/5 dark:border-cyan-400/30 dark:focus:border-cyan-400 dark:text-white
              love:bg-pink-50! love:border-pink-400/70! love:text-pink-900!
love:placeholder:text-pink-400! love:focus:border-pink-500!
horror:bg-black/60! horror:border-red-700/80! horror:text-red-100!
horror:placeholder:text-red-400/60! horror:focus:border-red-500!
              `}
              placeholder="Write your message here..."
            />
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
            className={`
              w-full py-3 rounded-xl font-semibold text-lg shadow-md
              transition-all duration-500
              bg-linear-to-r from-blue-500 to-cyan-500
              hover:from-cyan-500 hover:to-blue-500
              text-white
              dark:from-cyan-500 dark:to-sky-500
              dark:hover:from-sky-500 dark:hover:to-cyan-400
              love:from-pink-500 love:to-rose-500
              love:hover:from-rose-500 love:hover:to-pink-500
              love:shadow-[0_0_25px_rgba(244,114,182,0.7)]
              horror:from-red-800 horror:to-black
              horror:hover:from-red-700 horror:hover:to-red-950
              horror:border horror:border-red-600/80
              horror:shadow-[0_0_28px_rgba(255,20,20,0.85)]
            `}
          >
            {loading ? "Sending..." : "Submit"}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
}