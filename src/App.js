import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AdminDashboard from "./pages/AdmindashBoard";
import Manage from "./pages/Manage";
import DriverPage from "./pages/DriverPage";
import LoginForm from "./pages/LoginForm";
import axios from "axios";
import "./index.css";
import BusDetails from "./pages/BusDetails";
import BusRouteDetails from "./pages/BusRouteDetails";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/BusDetails" element={<BusDetails />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/Manage" element={<Manage />} />
        <Route path="/driver" element={<DriverPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/bus-route" element={<BusRouteDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
