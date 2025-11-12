import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./Components/Home/Home";
import PNF from "./Components/PNF/PageNotFound";
import Resume from "./Components/Resume/Resume";
import Login from "./Components/Contact/Login";
import OTP from "./Components/Contact/OTP";
import AdminDashboard from "./Components/Dashboard/AdminDashboard";
import Icons from './Components/Home/Icons'
import Pop from './Components/Pop'
import { useState, useEffect } from 'react';

const adminPath = import.meta.env.VITE_ADMIN_ROUTE;

function AppContent() {
  const location = useLocation();
  const [showPop, setShowPop] = useState(false);

  // Define routes where Navbar should be hidden
  const hideNavbarRoutes = ["/admin/dashboard"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  // Show popup when landing on home page
  useEffect(() => {
    // FOR DEVELOPMENT: Clear popup memory on every reload
    if (import.meta.env.DEV) {
      localStorage.removeItem('popupSeen');
      localStorage.removeItem('popupTimestamp');
      console.log('Development mode: Cleared popup memory');
    }

    console.log('Current path:', location.pathname);
    
    // Check if user is on home page and hasn't seen the popup recently
    const hasSeenPopup = localStorage.getItem('popupSeen');
    const popupTimestamp = localStorage.getItem('popupTimestamp');
    const now = Date.now();
    const oneDayInMs = 24 * 60 * 60 * 1000; // 24 hours

    // Show popup if never seen, or if seen more than 24 hours ago
    const shouldShowPopup = !hasSeenPopup || 
      (popupTimestamp && (now - parseInt(popupTimestamp)) > oneDayInMs);

    console.log('Has seen popup:', hasSeenPopup);
    console.log('Should show popup:', shouldShowPopup);
    
    if (location.pathname === "/" && shouldShowPopup) {
      console.log('Setting popup to show after delay');
      // Delay popup appearance for better UX
      const timer = setTimeout(() => {
        console.log('Popup should be visible now');
        setShowPop(true);
      }, 2000); // Show after 2 seconds

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  const handleClosePop = () => {
    console.log('Closing popup');
    setShowPop(false);
    // Remember that user has seen the popup with timestamp
    localStorage.setItem('popupSeen', 'true');
    localStorage.setItem('popupTimestamp', Date.now().toString());
  };

  const handleRatingSubmit = (rating: number) => {
    console.log('User rated:', rating);
    // Here you can send the rating to your backend
    handleClosePop();
  };

  // Manual show for testing
  const handleManualShow = () => {
    setShowPop(true);
  };

  console.log('showPop state:', showPop);

  return (
    <>
      <div>
        {/* Manual trigger button for testing */}
        {import.meta.env.DEV && (
          <button 
            onClick={handleManualShow}
            className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg z-40 shadow-lg hover:bg-blue-600 transition-colors"
          >
            Test Popup
          </button>
        )}

        <div>
          <div className="fixed inset-0 -z-10 w-full h-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#7ee0ff_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

          {/* ✅ Conditionally render Navbar */}
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

        {/* Popup Rating Modal */}
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