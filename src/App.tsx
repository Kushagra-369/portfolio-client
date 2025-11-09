import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./Components/Home/Home";
import PNF from "./Components/PNF/PageNotFound";
import Resume from "./Components/Resume/Resume";
import Login from "./Components/Contact/Login";
import OTP from "./Components/Contact/OTP";
import AdminDashboard from "./Components/Dashboard/AdminDashboard";

const adminPath = import.meta.env.VITE_ADMIN_ROUTE;

function AppContent() {
  const location = useLocation();

  // Define routes where Navbar should be hidden
  const hideNavbarRoutes = ["/admin/dashboard"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      <div className="fixed inset-0 -z-10 w-full h-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#7ee0ff_100%)]
      dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      {/* ✅ Conditionally render Navbar */}
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<Resume />} />
        <Route path={`/${adminPath}`} element={<Login />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/*" element={<PNF />} />
      </Routes>
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
