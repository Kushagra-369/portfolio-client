import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

// Toast Component
const Toast = ({ message, onClose }: { message: string; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      className="fixed bottom-6 right-6 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-lg"
    >
      {message}
    </motion.div>
  );
};

interface PopProps {
  onClose: () => void;
  onRatingSubmit: (rating: number) => void;
}

const Pop: React.FC<PopProps> = ({ onClose, onRatingSubmit }) => {
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [scrollTriggered, setScrollTriggered] = useState<boolean>(false);

  const showToast = (msg: string) => setToastMessage(msg);

  // 🌟 Check if submitted before
  const submittedBefore = localStorage.getItem("ratingSubmitted") === "true";

  // ⭐ STEP 1 — If NOT submitted, wait for 30% scroll
  useEffect(() => {
    if (submittedBefore) {
      // ⭐ If user already submitted, popup should appear IMMEDIATELY
      setShowPopup(true);
      return;
    }

    // ⭐ If NOT submitted → wait for 30% scroll
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY / totalHeight;

      if (scrolled >= 0.3) {
        setScrollTriggered(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [submittedBefore]);

  // ⭐ STEP 2 — After scroll trigger, apply 2-minute reopen logic
  useEffect(() => {
    // ❗ If submitted before, scroll doesn't matter → popup already shown
    if (submittedBefore) return;

    if (!scrollTriggered) return;

    const lastClosed = localStorage.getItem("lastClosedTime");

    if (!lastClosed) {
      setShowPopup(true);
      return;
    }

    const lastTime = parseInt(lastClosed);
    const now = Date.now();

    if (now - lastTime >= 2 * 60 * 1000) {
      setShowPopup(true);
    } else {
      const remaining = 2 * 60 * 1000 - (now - lastTime);
      setTimeout(() => setShowPopup(true), remaining);
    }
  }, [scrollTriggered, submittedBefore]);

  // ⭐ Close handler
  const handleClose = () => {
    localStorage.setItem("lastClosedTime", Date.now().toString());
    setShowPopup(false);
    onClose();
  };

  const handleStarClick = (rating: number) => {
    setSelectedRating(rating);
  };

  // ⭐ Submit handler
  const handleSubmit = async () => {
    if (selectedRating === 0) {
      showToast("Please select a rating before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post("http://localhost:1080/send_rating", {
        rating: selectedRating,
      });

      // Store submission flag
      localStorage.setItem("ratingSubmitted", "true");

      onRatingSubmit(selectedRating);
      showToast("Thank you for your feedback!");
      setShowPopup(false);
      onClose();
    } catch {
      showToast("Failed to submit rating. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const emojiMap: Record<number, string> = {
    1: "😡",
    2: "😞",
    3: "😐",
    4: "😊",
    5: "🤩",
  };

  if (!showPopup) return null;

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
          />

          {/* Popup */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-lg w-full mx-auto p-8"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
            >
              ×
            </button>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-5 text-4xl">
                {selectedRating > 0 ? emojiMap[selectedRating] : "⭐"}
              </div>

              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                How do you like our website?
              </h2>

              <div className="flex justify-center space-x-3 mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    onClick={() => handleStarClick(star)}
                    disabled={isSubmitting}
                    whileTap={{ scale: 1.3 }}
                    animate={{ scale: star <= selectedRating ? 1.2 : 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`text-5xl ${
                      star <= selectedRating ? "text-yellow-400" : "text-gray-300"
                    } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    ★
                  </motion.button>
                ))}
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                >
                  May be Later
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

      <AnimatePresence>
        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage("")} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Pop;
