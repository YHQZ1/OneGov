import { Bell, Home, ClipboardList, Building2, CalendarPlus, Megaphone, PhoneCall } from "lucide-react";

export default function AdminNavbar({ onLogout, activeTab, setActiveTab }) {
  const centerLinks = [
    { key: "home", label: "Dashboard", icon: Home },
    { key: "citizen_services", label: "Citizen Services", icon: ClipboardList },
    { key: "business", label: "Local Business", icon: Building2 },
    { key: "events", label: "Community Events", icon: CalendarPlus },
    { key: "civic", label: "Civic Tools", icon: Megaphone },
    { key: "emergency", label: "Emergency", icon: PhoneCall },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Left: Logo + App name (unchanged) */}
        <div className="flex items-center">
          <span className="text-xl font-bold text-blue-700">OneGov</span>
        </div>

        {/* Center: tabs */}
        <div className="hidden md:flex items-center gap-6">
          {centerLinks.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 font-medium ${
                activeTab === key ? "text-blue-700" : "text-gray-700 hover:text-blue-600"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Right: notifications + logout */}
        <div className="flex items-center gap-4">
          <button className="relative text-gray-600 hover:text-blue-600">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">3</span>
          </button>
          <button
            onClick={onLogout}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
