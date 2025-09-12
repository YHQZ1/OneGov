import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Citizen/Home";
import Landing from "./pages/Landing";
import Events from "./pages/Citizen/Events";
import RoleSelection from "./pages/RoleSelection";
import BusinessPage from "./pages/Citizen/Business";
import Emergency from "./pages/Citizen/Emergency";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/emergency" element={<Emergency />} />
      </Routes>
    </Router>
  );
}

export default App;
