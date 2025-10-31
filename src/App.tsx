import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
// import PNF from './Components/PNF/PageNotFound'
// import Resume from './Components/Resume/Resume'

export default function App() {
  return (
    <BrowserRouter>
      <div className="fixed inset-0 -z-10 w-full h-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#7ee0ff_100%)]
dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/resume" element={<Resume />} /> */}
        {/* <Route path="/*" element={<PNF />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
