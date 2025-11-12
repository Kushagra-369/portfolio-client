import React, { useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function ChangeAdmin() {
  const [formData, setFormData] = useState({
    name: "",
    linkedin: "",
    github: "",
    profileImg: null as File | null,
    resume: null as File | null,
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Handle text input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Common file handling logic
  const handleProfileFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file for profile photo.");
      return;
    }
    setFormData({ ...formData, profileImg: file });
    setPreview(URL.createObjectURL(file));
  };

  // Handle file input (click upload)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];

      if (name === "profileImg") handleProfileFile(file);
      if (name === "resume") {
        if (file.type !== "application/pdf") {
          alert("Please upload a PDF file for resume.");
          return;
        }
        setFormData({ ...formData, resume: file });
      }
    }
  };

  // Handle drag events
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    if (e.type === "dragleave") setDragActive(false);
  };

  // Handle drop event
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleProfileFile(e.dataTransfer.files[0]);
    }
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("linkedin", formData.linkedin);
    data.append("github", formData.github);
    if (formData.profileImg) data.append("profileImg", formData.profileImg);
    if (formData.resume) data.append("resume", formData.resume);

    try {
      const res = await axios.post("http://localhost:1080/create_new_profile", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Admin profile updated successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to update admin profile.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Change Admin Profile
        </h2>

        {/* Name */}
        <label className="block mb-2 font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 border rounded-lg focus:ring focus:ring-blue-300"
        />

        {/* LinkedIn */}
        <label className="block mb-2 font-medium">LinkedIn ID</label>
        <input
          type="url"
          name="linkedin"
          value={formData.linkedin}
          onChange={handleChange}
          placeholder="https://linkedin.com/in/username"
          className="w-full p-2 mb-4 border rounded-lg focus:ring focus:ring-blue-300"
        />

        {/* GitHub */}
        <label className="block mb-2 font-medium">GitHub ID</label>
        <input
          type="url"
          name="github"
          value={formData.github}
          onChange={handleChange}
          placeholder="https://github.com/username"
          className="w-full p-2 mb-4 border rounded-lg focus:ring focus:ring-blue-300"
        />

        {/* Profile Photo (Drag & Drop Zone) */}
        <label className="block mb-2 font-medium">Profile Photo</label>
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
            dragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-blue-400"
          }`}
          onClick={() => inputRef.current?.click()}
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 mx-auto rounded-full object-cover"
            />
          ) : (
            <p className="text-gray-500">
              Drag & drop an image here, or click to browse
            </p>
          )}
          <input
            type="file"
            name="profileImg"
            accept="image/*"
            ref={inputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Resume PDF */}
        <label className="block mb-2 mt-6 font-medium">Resume (PDF only)</label>
        <input
          type="file"
          name="resume"
          accept="application/pdf"
          onChange={handleFileChange}
          className="mb-6"
        />

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Update Profile"}
        </button>
      </motion.form>
    </div>
  );
}
