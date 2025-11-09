import { useState } from "react";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../TestNotifivation/Notification";

export default function AddProject() {
  const [preview, setPreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [tools, setTools] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    githubLink: "",
    deploymentLink: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) return showErrorToast("Please upload an image!");
    if (tools.length === 0) return showErrorToast("Please add at least one tool!");

    const data = new FormData();
    data.append("profilePhoto", imageFile);
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("githubLink", formData.githubLink);
    data.append("deploymentLink", formData.deploymentLink);
    data.append("category", formData.category);
    tools.forEach((tool) => data.append("tools", tool));

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:1080/create_project", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      showSuccessToast("✅ Project created successfully!");
      console.log("Response:", res.data);

      // reset form
      setFormData({
        name: "",
        description: "",
        githubLink: "",
        deploymentLink: "",
        category: "",
      });
      setPreview(null);
      setImageFile(null);
      setTools([]);
    } catch (err: any) {
      console.error(err);
      const msg = err.response?.data?.message || "❌ Failed to create project";
      showErrorToast(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 text-gray-800 dark:text-gray-100">
      <h2 className="text-2xl font-bold mb-6">Add New Project</h2>

      <form className="space-y-6 max-w-2xl" onSubmit={handleSubmit}>
        {/* 📸 Drag and Drop Upload */}
        <div
          className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file) {
              setImageFile(file);
              const reader = new FileReader();
              reader.onload = () => setPreview(reader.result as string);
              reader.readAsDataURL(file);
            }
          }}
          onClick={() => document.getElementById("imageUpload")?.click()}
        >
          {preview ? (
            <img src={preview} alt="Preview" className="mx-auto max-h-48 rounded-md" />
          ) : (
            <p className="text-gray-500">Drag & drop project image here, or click to select</p>
          )}
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setImageFile(file);
                const reader = new FileReader();
                reader.onload = () => setPreview(reader.result as string);
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>

        {/* 🧾 Name */}
        <div>
          <label className="block mb-1 font-medium">Project Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-transparent"
            placeholder="Enter project name"
            required
          />
        </div>

        {/* 📝 Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-transparent"
            placeholder="Describe your project"
            rows={4}
            required
          />
        </div>

        {/* ⚙️ Tools */}
        <div>
          <label className="block mb-1 font-medium">Tools Used</label>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-600 text-white rounded-full flex items-center gap-2"
              >
                {tool}
                <button
                  type="button"
                  className="text-xs bg-white/30 px-1 rounded"
                  onClick={() => setTools(tools.filter((_, i) => i !== index))}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            placeholder="Add a tool and press Enter"
            className="w-full border mt-2 border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-transparent"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.currentTarget.value.trim()) {
                e.preventDefault();
                setTools([...tools, e.currentTarget.value.trim()]);
                e.currentTarget.value = "";
              }
            }}
          />
        </div>

        {/* 🔗 GitHub Link */}
        <div>
          <label className="block mb-1 font-medium">GitHub Link</label>
          <input
            name="githubLink"
            value={formData.githubLink}
            onChange={handleChange}
            type="url"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-transparent"
            placeholder="https://github.com/username/repo"
            required
          />
        </div>

        {/* 🚀 Deployment Link */}
        <div>
          <label className="block mb-1 font-medium">Deployment Link</label>
          <input
            name="deploymentLink"
            value={formData.deploymentLink}
            onChange={handleChange}
            type="url"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-transparent"
            placeholder="https://your-live-site.com"
          />
        </div>

        {/* 🧩 Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-transparent"
            required
          >
            <option value="">Select category</option>
            <option value="Frontend">Frontend</option>
            <option value="Full Stack">Full Stack</option>
          </select>
        </div>

        {/* ✅ Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Project"}
        </button>
      </form>
    </div>
  );
}
