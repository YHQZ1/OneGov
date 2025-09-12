import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Citizen/Home";
import Landing from "./pages/Landing";
import RoleSelection from "./pages/RoleSelection";

import Events from "./pages/Citizen/Events";
import BusinessPage from "./pages/Citizen/Business";
import Emergency from "./pages/Citizen/Emergency";
import Civic from "./pages/Citizen/Civic";
import CitizenServices from "./pages/Citizen/CitizenServices";
import Transportation from "./pages/Citizen/Transportation";

import BusinessPortal from "./pages/Business/BusinessPortal";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/public-events" element={<Events />} />
        <Route path="/business-services" element={<BusinessPage />} />
        <Route path="/emergency-services" element={<Emergency />} />
        <Route path="/civic-engagement" element={<Civic />} />
        <Route path="/citizen-services" element={<CitizenServices />} />
        <Route path="/transportation" element={<Transportation />} />
        <Route path="/business-portal" element={<BusinessPortal />} />
      </Routes>
    </Router>
  );
}

export default App;
