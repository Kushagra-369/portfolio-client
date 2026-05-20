import { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

import Home from "./Components/Home/Home";
import Resume from "./Components/Resume/Resume";
import Login from "./Components/Contact/Login";
import OTP from "./Components/Contact/OTP";
import AdminDashboard from "./Components/Dashboard/AdminDashboard";
import Icons from "./Components/Home/Icons";
import PNF from "./Components/PNF/PageNotFound";
import Start from "./Components/Start/Start";

const adminPath = import.meta.env.VITE_ADMIN_ROUTE;

function AppContent() {
  const location = useLocation();

  const [entered, setEntered] = useState(false);

  const hideNavbarRoutes = ["/admin/dashboard"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  // 🔥 START PAGE
  if (!entered && location.pathname === "/") {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="start-page"
          initial={{
            rotateY: 0,
            x: 0,
            opacity: 1,
          }}
          exit={{
            rotateY: -90,
            x: "-100vw",
            opacity: 0,
            transition: {
              duration: 1.2,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          style={{
            transformStyle: "preserve-3d",
            perspective: 2000,
          }}
          className="w-full h-screen"
        >
          <Start onStart={() => setEntered(true)} />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="main-home"
        initial={{
          rotateY: 90,
          x: "100vw",
          opacity: 0,
        }}
        animate={{
          rotateY: 0,
          x: 0,
          opacity: 1,
        }}
        transition={{
          duration: 1.2,
          ease: [0.76, 0, 0.24, 1],
        }}
        style={{
          transformStyle: "preserve-3d",
          perspective: 2000,
        }}
      >
        {/* Navbar */}
        {!shouldHideNavbar && <Navbar />}

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/resume" element={<Resume />} />
          <Route path={`/${adminPath}`} element={<Login />} />
          <Route path="/otp" element={<OTP />} />
          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />
          <Route path="/icons" element={<Icons />} />

          {/* 404 */}
          <Route path="*" element={<PNF />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>

      {/* 🔥 GLOBAL BACKGROUND */}
      <div
        className="fixed inset-0 -z-50 w-full h-full bg-white 
        [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#7ee0ff_100%)]
        dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"
      ></div>

      <AppContent />
    </BrowserRouter>
  );
}