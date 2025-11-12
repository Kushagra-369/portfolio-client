import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "../Home/Home";
import {
  User,
  HomeIcon,
  LogOut,
  FolderPlus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import AddProject from "./AddProject";
import UserMessages from "./UserMessages";
import ChangeAdmin from "./ChangeAdmin";
export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <Home />;
      case "users":
        return <UserMessages />;
      case "addProject":
        return <AddProject />;
      case "changeAdmin":
        return <ChangeAdmin />;
      default:
        return (
          <div className="p-6 text-gray-800 dark:text-gray-100">
            Select a page from the sidebar
          </div>
        );
    }
  };

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen relative">
      {/* Sidebar */}
      <aside
        className={`bg-white dark:bg-gray-800 shadow-md flex flex-col justify-between transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-0 overflow-hidden"
        }`}
      >
        {sidebarOpen && (
          <>
            {/* Scrollable section */}
            <div className="flex-1 overflow-y-auto">
              <h2 className="text-2xl font-bold text-center py-5 text-blue-600 dark:text-blue-400 border-b border-gray-200 dark:border-gray-700">
                Admin Panel
              </h2>

              <nav className="p-4 space-y-2">
                <button
                  onClick={() => setActivePage("home")}
                  className={`flex items-center w-full px-4 py-2 rounded-md transition ${
                    activePage === "home"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <HomeIcon className="w-5 h-5 mr-2" /> Home
                </button>

                <button
                  onClick={() => setActivePage("users")}
                  className={`flex items-center w-full px-4 py-2 rounded-md transition ${
                    activePage === "users"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <User className="w-5 h-5 mr-2" /> Users
                </button>

                <button
                  onClick={() => setActivePage("addProject")}
                  className={`flex items-center w-full px-4 py-2 rounded-md transition ${
                    activePage === "addProject"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <FolderPlus className="w-5 h-5 mr-2" /> Add Projects
                </button>

                <button
                  onClick={() => setActivePage("changeAdmin")}
                  className={`flex items-center w-full px-4 py-2 rounded-md transition ${
                    activePage === "changeAdmin"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <User className="w-5 h-5 mr-2" /> Change Admin
                </button>
              </nav>
            </div>

            {/* ✅ Fixed Logout Button */} 
            <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleLogout}
                className="flex items-center justify-center w-full px-4 py-3 text-red-500 
                  hover:bg-red-100 dark:hover:bg-red-900/30 transition font-medium"
              >
                <LogOut className="w-5 h-5 mr-2" /> Logout
              </button>
            </div>
          </>
        )}
      </aside>

      {/* 🧭 Floating Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-1/2 left-0 transform -translate-y-1/2 z-50 bg-blue-600 text-white p-2 rounded-r-md shadow-lg hover:bg-blue-700 transition"
      >
        {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto transition-all duration-300 p-2">
        {renderPage()}
      </main>
    </div>
  );
}
