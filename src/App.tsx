import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./Components/Home/Home";
import PNF from "./Components/PNF/PageNotFound";
import Resume from "./Components/Resume/Resume";
import Login from "./Components/Contact/Login";
import OTP from "./Components/Contact/OTP";
import AdminDashboard from "./Components/Dashboard/AdminDashboard";
import Icons from './Components/Home/Icons';
import Pop from './Components/Pop';
import { useState, useEffect } from 'react';

const adminPath = import.meta.env.VITE_ADMIN_ROUTE;

function AppContent() {
  const location = useLocation();
  const [showPop, setShowPop] = useState(false);

  const hideNavbarRoutes = ["/admin/dashboard"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  // 🔥 Show popup initially if allowed
  useEffect(() => {
    if (location.pathname !== "/") return;

    const popupSeen = sessionStorage.getItem("popupSeen");
    if (popupSeen === "true") return;

    const hideUntil = Number(sessionStorage.getItem("popupHideUntil")) || 0;

    if (Date.now() >= hideUntil) {
      const timer = setTimeout(() => setShowPop(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  // 🔥 Auto-watch every second (NO REFRESH NEEDED)
  useEffect(() => {
    const interval = setInterval(() => {
      const popupSeen = sessionStorage.getItem("popupSeen");
      if (popupSeen === "true") return;

      const hideUntil = Number(sessionStorage.getItem("popupHideUntil")) || 0;

      if (location.pathname === "/" && Date.now() >= hideUntil) {
        setShowPop(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [location.pathname]);

  // ❌ User closed popup without rating
  const handleClosePop = () => {
    setShowPop(false);

    const nextTime = Date.now() + 30_000; // 30 seconds
    sessionStorage.setItem("popupHideUntil", String(nextTime));
  };

  // ⭐ Rating submitted — stop popup forever
  const handleRatingSubmit = (rating: number) => {
    console.log("User rated:", rating);

    sessionStorage.setItem("popupSeen", "true");
    setShowPop(false);
  };

  return (
    <>
      <div>
        <div>
          <div className="fixed inset-0 -z-10 w-full h-full bg-white 
          [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#7ee0ff_100%)]
          dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
          </div>

          {!shouldHideNavbar && <Navbar />}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resume" element={<Resume />} />
            <Route path={`/${adminPath}`} element={<Login />} />
            <Route path="/otp" element={<OTP />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/icons" element={<Icons />} />
            <Route path="/*" element={<PNF />} />
          </Routes>
        </div>

        {showPop && (
          <Pop
            onClose={handleClosePop}
            onRatingSubmit={handleRatingSubmit}
          />
        )}
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
