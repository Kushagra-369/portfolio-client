import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import {APIURL} from "../../GlobalAPIURL"

interface Message {
  _id: string;
  name: string;
  email: string;
  phoneNumber?: number;
  message: string;
  createdAt: string;
}

export default function UserMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // ✅ Fetch all messages
  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${APIURL}/get_all_messages`);
      setMessages(res.data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      alert("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete a message
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      setDeletingId(id);
      await axios.delete(`${APIURL}/delete_message/${id}`);
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (error) {
      console.error("Error deleting message:", error);
      alert("Failed to delete message");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div
      className="min-h-screen pt-24 pb-16 px-6 sm:px-12 md:px-20 lg:px-32 
      font-[Outfit] bg-linear-to-br from-gray-50 via-slate-100 to-gray-200 
      dark:from-slate-900 dark:via-blue-950 dark:to-cyan-950 
      text-gray-800 dark:text-white transition-colors duration-500"
    >
      <motion.h1
        className="text-4xl font-bold text-center mb-10 
        bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent
        dark:from-cyan-400 dark:to-blue-500"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        User Messages
      </motion.h1>

      {/* Loading state */}
      {loading && (
        <div className="text-center text-gray-600 dark:text-gray-300">
          Loading messages...
        </div>
      )}

      {/* Empty state */}
      {!loading && messages.length === 0 && (
        <div className="text-center text-gray-600 dark:text-gray-300">
          No messages yet.
        </div>
      )}

      {/* Messages grid */}
      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {messages.map((msg) => (
          <motion.div
            key={msg._id}
            className="bg-white/70 dark:bg-white/10 backdrop-blur-md border 
            border-blue-200 dark:border-cyan-400/20 rounded-2xl shadow-md p-6 
            flex flex-col justify-between transition-all duration-300 hover:shadow-lg"
            whileHover={{ scale: 1.02 }}
          >
            <div>
              <h2 className="text-xl font-semibold text-blue-700 dark:text-cyan-300 mb-2">
                {msg.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                <span className="font-medium text-gray-700 dark:text-gray-300">Email:</span>{" "}
                {msg.email}
              </p>
              {msg.phoneNumber && (
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Phone:</span>{" "}
                  {msg.phoneNumber}
                </p>
              )}
              <p className="text-gray-700 dark:text-gray-200 text-base mt-3">
                {msg.message}
              </p>
            </div>

            <div className="flex justify-between items-center mt-4 text-sm text-gray-500 dark:text-gray-400">
              <p>{new Date(msg.createdAt).toLocaleString()}</p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={deletingId === msg._id}
                onClick={() => handleDelete(msg._id)}
                className="flex items-center gap-1 px-3 py-1 rounded-lg 
                bg-red-500 hover:bg-red-600 text-white font-medium 
                transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2 size={16} />
                {deletingId === msg._id ? "Deleting..." : "Delete"}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
