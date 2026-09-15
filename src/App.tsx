import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import CustomCursor from "./Components/CustomCursor";
import Chatbot from "./Components/AI/Chatbot";
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

/* =========================================================
   SNOWFLAKES
========================================================= */

const snowflakes = Array.from({ length: 65 }, (_, i) => ({
  id: i,

  left: `${Math.random() * 100}%`,

  size: `${Math.random() * 5 + 2}px`,

  duration: `${Math.random() * 10 + 8}s`,

  delay: `${Math.random() * -18}s`,

  drift: `${Math.random() * 140 - 70}px`,

  opacity: Math.random() * 0.55 + 0.25,
}));

function Snowfall() {
  return (
    <div
      className="
        pointer-events-none
        fixed
        inset-0
        z-40
        overflow-hidden
      "
      aria-hidden="true"
    >
      {snowflakes.map((snow) => (
        <span
          key={snow.id}
          className="
            snowflake
            absolute
          -top-5
            rounded-full
            bg-cyan-400/40
            shadow-[0_0_8px_rgba(34,211,238,0.35)]
            dark:bg-white/80
            dark:shadow-[0_0_10px_rgba(255,255,255,0.45)]
          "
          style={
            {
              left: snow.left,
              width: snow.size,
              height: snow.size,
              opacity: snow.opacity,
              animationDuration: snow.duration,
              animationDelay: snow.delay,
              "--snow-drift": snow.drift,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

/* =========================================================
   APP CONTENT
========================================================= */

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

                  <Route
                    path="/resume"
                    element={<Resume />}
                  />

                  <Route
                    path={`/${adminPath}`}
                    element={<Login />}
                  />

                  <Route
                    path="/otp"
                    element={<OTP />}
                  />

                  <Route
                    path="/admin/dashboard"
                    element={<AdminDashboard />}
                  />

                  <Route
                    path="/icons"
                    element={<Icons />}
                  />

                  <Route
                    path="*"
                    element={<PNF />}
                  />
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
              fixed
              bottom-6
              right-6
              z-99999
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              bg-cyan-500
              text-white
              shadow-2xl
              transition-all
              duration-300
              hover:scale-110
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

              <Route
                path="/resume"
                element={<Resume />}
              />

              <Route
                path={`/${adminPath}`}
                element={<Login />}
              />

              <Route
                path="/otp"
                element={<OTP />}
              />

              <Route
                path="/admin/dashboard"
                element={<AdminDashboard />}
              />

              <Route
                path="/icons"
                element={<Icons />}
              />

              {/* 404 */}
              <Route
                path="*"
                element={<PNF />}
              />
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
            fixed
            bottom-6
            right-6
            z-99999
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            bg-cyan-500
            text-white
            shadow-2xl
            transition-all
            duration-300
            hover:scale-110
          "
        >
          <ChevronUp size={28} />
        </button>
      )}
    </>
  );
}

/* =========================================================
   MAIN APP
========================================================= */

export default function App() {
  return (
    <BrowserRouter>
      <CustomCursor />

      {/* ===================================================
          GLOBAL BACKGROUND
      =================================================== */}

      <div
        className="
          fixed
          inset-0
          -z-50
          h-full
          w-full

          bg-white

          [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#7ee0ff_100%)]

          dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]
        "
      />

      {/* ===================================================
          CONTINUOUS SNOWFALL
      =================================================== */}

      <Snowfall />

      {/* ===================================================
          WEBSITE
      =================================================== */}

      <AppContent />

      <Chatbot />

      {/* ===================================================
          SNOW CSS
      =================================================== */}

      <style>
        {`
          .snowflake {
            animation-name: snowfall;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            will-change: transform;
          }

          @keyframes snowfall {
            0% {
              transform:
                translate3d(0, -30px, 0)
                rotate(0deg);
            }

            25% {
              transform:
                translate3d(
                  calc(var(--snow-drift) * 0.25),
                  25vh,
                  0
                )
                rotate(90deg);
            }

            50% {
              transform:
                translate3d(
                  calc(var(--snow-drift) * -0.35),
                  50vh,
                  0
                )
                rotate(180deg);
            }

            75% {
              transform:
                translate3d(
                  calc(var(--snow-drift) * 0.55),
                  75vh,
                  0
                )
                rotate(270deg);
            }

            100% {
              transform:
                translate3d(
                  var(--snow-drift),
                  115vh,
                  0
                )
                rotate(360deg);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .snowflake {
              animation-duration: 20s;
            }
          }
        `}
      </style>
    </BrowserRouter>
  );
}