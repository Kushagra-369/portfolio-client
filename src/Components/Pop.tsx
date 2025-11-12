import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

interface PopProps {
  onClose: () => void;
  onRatingSubmit: (rating: number) => void;
}

const Pop: React.FC<PopProps> = ({ onClose, onRatingSubmit }) => {
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isBlocked, setIsBlocked] = useState<boolean>(false);

  // Check if user submitted a rating within last 24 hours
  useEffect(() => {
    const lastSubmitted = localStorage.getItem("lastRatingTime");
    if (lastSubmitted) {
      const lastTime = new Date(lastSubmitted).getTime();
      const now = new Date().getTime();
      const hoursPassed = (now - lastTime) / (1000 * 60 * 60);
      if (hoursPassed < 24) {
        console.log(`⏳ Rating blocked for ${24 - Math.floor(hoursPassed)} more hours`);
        setIsBlocked(true);
        onClose(); // Auto close popup if blocked
      }
    }
  }, [onClose]);

  const handleStarClick = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleSubmit = async () => {
    if (selectedRating === 0) {
      alert("Please select a rating before submitting");
      return;
    }

    setIsSubmitting(true);
    try {
      // ✅ Send rating to backend API
      const response = await axios.post("http://localhost:1080/send_rating", {
        rating: selectedRating,
      });

      console.log("✅ Rating submitted:", response.data);

      // Save timestamp in localStorage for 24-hour limit
      localStorage.setItem("lastRatingTime", new Date().toISOString());

      onRatingSubmit(selectedRating);
      alert("Thank you for your feedback!");
      onClose();
    } catch (error: any) {
      console.error("❌ Error submitting rating:", error);
      alert(
        error.response?.data?.error ||
          "Failed to submit rating. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Emoji mapping by rating
  const emojiMap: Record<number, string> = {
    1: "😡",
    2: "😞",
    3: "😐",
    4: "😊",
    5: "🤩",
  };

  // 🧱 If blocked, don’t show popup at all
  if (isBlocked) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* 🔳 Background overlay */}
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
        />

        {/* 💬 Popup box */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full mx-auto p-8"
        >
          {/* ❌ Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl transition-colors"
          >
            ×
          </button>

          <div className="text-center">
            {/* ⭐ Emoji Icon */}
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-5 text-4xl">
              {selectedRating > 0 ? emojiMap[selectedRating] : "⭐"}
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              How do you like our website?
            </h2>

            {/* ⭐ Star Rating */}
            <div className="flex justify-center space-x-3 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleStarClick(star)}
                  disabled={isSubmitting}
                  className={`text-5xl transition-all duration-200 transform hover:scale-110 ${
                    star <= selectedRating
                      ? "text-yellow-400 scale-110"
                      : "text-gray-300 hover:text-yellow-300"
                  } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  ★
                </button>
              ))}
            </div>

            {/* ✅ Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 py-3 px-5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Maybe Later
              </button>
              <button
                onClick={handleSubmit}
                disabled={selectedRating === 0 || isSubmitting}
                className={`flex-1 py-3 px-5 rounded-lg text-white transition-colors ${
                  selectedRating > 0 && !isSubmitting
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-400 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Pop;
