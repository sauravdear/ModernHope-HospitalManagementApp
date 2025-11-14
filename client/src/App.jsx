import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Contact } from "./pages/Contact";
import { Service } from "./pages/Service";
import Features from "./pages/Features";
import Solutions from "./pages/Solutions";
import Pricing from "./pages/Pricing";
import LearnMore from "./components/LearnMore";
import ForgotPassword from "./pages/ForgotPassword";

import { PatientManagement } from "./sec-pages/PatientManagement";
import Profile from "./sec-pages/Profile";
import StaffSchedule from "./sec-pages/StaffSchedule";
import AppointmentSystem from "./sec-pages/AppointmentSystem";
import ErrorBoundary from "./sec-pages/ErrorBoundary";
// import { Navbar } from "./components/Navbar";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/service" element={<Service />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/features" element={<Features />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/learnmore" element={<LearnMore />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/patient-management" element={<PatientManagement />} />
            <Route path="/staff-schedule" element={<StaffSchedule />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/appointments" element={<AppointmentSystem />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
