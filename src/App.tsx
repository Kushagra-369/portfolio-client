import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import CustomCursor from "./Components/CustomCursor";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp } from "lucide-react";

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

  // 🔥 Scroll Top Button
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;

      if (scrollPosition > 100) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 🔥 Hide Navbar Routes
  const hideNavbarRoutes = ["/admin/dashboard"];

  const shouldHideNavbar =
    hideNavbarRoutes.includes(location.pathname);

  // 🔥 START PAGE
  if (!entered && location.pathname === "/") {
    return (
      <>
        {/* 🔥 FIXED NAVBAR */}
        {!shouldHideNavbar && entered && <Navbar />}

        <AnimatePresence mode="wait">
          {!entered && location.pathname === "/" ? (
            // 🔥 START SCREEN
            <motion.div
              key="start-page"
              initial={{
                rotateY: 0,
                opacity: 1,
              }}
              animate={{
                rotateY: 0,
                opacity: 1,
              }}
              exit={{
                rotateY: -180,
                opacity: 0,
                transition: {
                  duration: 1.5,
                  ease: [0.76, 0, 0.24, 1],
                },
              }}
              style={{
                transformStyle: "preserve-3d",
                perspective: 2000,
                transformOrigin: "left center",
              }}
              className="w-full h-screen"
            >
              <Start onStart={() => setEntered(true)} />
            </motion.div>
          ) : (
            // 🔥 MAIN WEBSITE
            <motion.div
              key="main-home"
              initial={{
                rotateY: 180,
                opacity: 0,
              }}
              animate={{
                rotateY: 0,
                opacity: 1,
              }}
              transition={{
                duration: 1.5,
                ease: [0.76, 0, 0.24, 1],
              }}
              style={{
                transformStyle: "preserve-3d",
                perspective: 2000,
                transformOrigin: "right center",
              }}
            >
              {/* 🔥 CONTENT */}
              <div className="pt-28 min-h-screen">
                <Routes>
                  <Route path="/" element={<Home />} />

                  <Route path="/resume" element={<Resume />} />

                  <Route
                    path={`/${adminPath}`}
                    element={<Login />}
                  />

                  <Route path="/otp" element={<OTP />} />

                  <Route
                    path="/admin/dashboard"
                    element={<AdminDashboard />}
                  />

                  <Route path="/icons" element={<Icons />} />

                  <Route path="*" element={<PNF />} />
                </Routes>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🔥 SCROLL TO TOP BUTTON */}
        {showScrollTop && entered && (
          <button
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="
          fixed bottom-6 right-6 z-99999
          w-14 h-14 rounded-full
          bg-cyan-500 text-white
          shadow-2xl
          flex items-center justify-center
          hover:scale-110
          transition-all duration-300
        "
          >
            <ChevronUp size={28} />
          </button>
        )}
      </>
    );
  }

  return (
    <>
      {/* 🔥 FIXED NAVBAR */}
      {!shouldHideNavbar && <Navbar />}

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
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
          exit={{
            opacity: 0,
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
          {/* 🔥 CONTENT SPACE FOR FIXED NAVBAR */}
          <div className="pt-28 min-h-screen">
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/resume" element={<Resume />} />

              <Route
                path={`/${adminPath}`}
                element={<Login />}
              />

              <Route path="/otp" element={<OTP />} />

              <Route
                path="/admin/dashboard"
                element={<AdminDashboard />}
              />

              <Route path="/icons" element={<Icons />} />

              {/* 404 */}
              <Route path="*" element={<PNF />} />
            </Routes>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 🔥 SCROLL TO TOP BUTTON */}
      {showScrollTop && (
        <button
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          className="
            fixed bottom-6 right-6 z-99999
            w-14 h-14 rounded-full
            bg-cyan-500 text-white
            shadow-2xl
            flex items-center justify-center
            hover:scale-110
            transition-all duration-300
          "
        >
          <ChevronUp size={28} />
        </button>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CustomCursor />

      {/* 🔥 GLOBAL BACKGROUND */}
      <div
        className="
          fixed inset-0 -z-50 w-full h-full bg-white
          [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#7ee0ff_100%)]
          dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]
        "
      />

      <AppContent />
    </BrowserRouter>
  );
}