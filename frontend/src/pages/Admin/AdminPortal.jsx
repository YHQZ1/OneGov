import { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminHome from "./Home";
import CitizenServicesForm from "./CitizenServicesForm";
import BusinessApprovals from "./BusinessApprovals";
import CommunityEventsForm from "./CommunityEventsForm";
import CivicTools from "./CivicTools";
import EmergencyDirectoryForm from "./EmergencyDirectoryForm";

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState("home");
  const onLogout = () => console.log("Admin logged out");

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans overflow-x-hidden">
      <AdminNavbar onLogout={onLogout} activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "home" && <AdminHome />}
      {activeTab === "citizen_services" && <CitizenServicesForm />}
      {activeTab === "business" && <BusinessApprovals />}
      {activeTab === "events" && <CommunityEventsForm />}
      {activeTab === "civic" && <CivicTools />}
      {activeTab === "emergency" && <EmergencyDirectoryForm />}
    </div>
  );
}
