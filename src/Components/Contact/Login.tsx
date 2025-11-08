import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:1080/create_admin", formData);
      console.log(res.data);
      navigate("/otp", { state: { email: formData.email } });
    } catch (err: any) {
      setError(err.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
          Create Account
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2.5 rounded-md border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
              focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2.5 rounded-md border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
              focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2.5 rounded-md border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
              focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full py-2.5 rounded-md font-semibold text-white bg-blue-600 
          hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}
