import { BrowserRouter, Routes, Route } from "react-router-dom";

import FontLoader from "./utils/FontLoader";
import GlobalStyles from "./styles/GlobalStyles";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SelectRole from "./pages/SelectRole"
import Dashboard from "./pages/Dashboard"
import About from "./pages/About"
import Achievements from "./pages/Achievements"
import Opportunities from "./pages/Opportunities"
import Settings from "./pages/Settings"
import Profile from "./pages/Profile"
import AddCertificate from "./pages/AddCertificate"
import Home from "./pages/Home"
import AddOpportunity from "./pages/AddOpportunity"

export default function App() {
  return (
    <>
      <FontLoader />
      <GlobalStyles />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/select-role" element={<SelectRole />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-certificate" element={<AddCertificate />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add-opportunity" element={<AddOpportunity />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}