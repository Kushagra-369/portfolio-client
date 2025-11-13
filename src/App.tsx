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

  // Define routes where Navbar should be hidden
  const hideNavbarRoutes = ["/admin/dashboard"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  // --------------------------------------------
  // ⭐ POPUP SHOW ONLY ONCE PER TAB SESSION
  // --------------------------------------------
  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('popupSeen');

    if (location.pathname === "/" && !hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowPop(true);
      }, 2000); // delay for UX

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  const handleClosePop = () => {
    setShowPop(false);
    sessionStorage.setItem('popupSeen', 'true'); // show once per session
  };

  const handleRatingSubmit = (rating: number) => {
    console.log("User rated:", rating);
    handleClosePop();
  };

  return (
    <>
      <div>
        <div>
          {/* Background */}
          <div className="fixed inset-0 -z-10 w-full h-full bg-white 
            [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#7ee0ff_100%)]
            dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
          </div>

          {/* Navbar */}
          {!shouldHideNavbar && <Navbar />}

          {/* Routes */}
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

        {/* ⭐ Popup Rating Modal */}
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
