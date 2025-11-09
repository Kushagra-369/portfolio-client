import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import PNF from './Components/PNF/PageNotFound'
import Resume from './Components/Resume/Resume'
import Login from "./Components/Contact/Login";
import OTP from "./Components/Contact/OTP";
const adminPath = import.meta.env.VITE_ADMIN_ROUTE;

export default function App() {
  return (
    <BrowserRouter>
      <div className="fixed inset-0 -z-10 w-full h-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#7ee0ff_100%)]
dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<Resume />} />
        <Route path={`/${adminPath}`} element={<Login />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/*" element={<PNF />} />
      </Routes>
    </BrowserRouter>
  );
}
