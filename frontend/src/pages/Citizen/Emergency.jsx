import { useMemo, useState } from "react";
import {
  ShieldAlert,
  Flame,
  Hospital,
  Bus,
  Building2,
  Plug,
  Droplets,
  AlarmSmoke,
  Search,
  CheckCircle,
  Clock,
  Phone,
} from "lucide-react";
import Navbar from "../../components/Navbar";

const HOTLINES = [
  // 🚨 Emergency (Always First)
  {
    id: "police",
    category: "emergency",
    title: "Police",
    phone: "100",
    color: "bg-gradient-to-r from-red-500 to-red-600",
    hoverColor: "hover:from-red-600 hover:to-red-700",
    icon: ShieldAlert,
    badge: "24×7",
    description: "For all emergency police assistance",
  },
  {
    id: "fire",
    category: "emergency",
    title: "Fire & Rescue",
    phone: "101",
    color: "bg-gradient-to-r from-orange-500 to-red-500",
    hoverColor: "hover:from-orange-600 hover:to-red-600",
    icon: Flame,
    badge: "24×7",
    description: "Fire emergency and rescue services",
  },
  {
    id: "ambulance",
    category: "emergency",
    title: "Ambulance",
    phone: "102",
    color: "bg-gradient-to-r from-green-500 to-green-600",
    hoverColor: "hover:from-green-600 hover:to-green-700",
    icon: Hospital,
    badge: "24×7",
    description: "Medical emergency and ambulance",
  },
  {
    id: "disaster",
    category: "emergency",
    title: "Disaster Management",
    phone: "108",
    color: "bg-gradient-to-r from-purple-500 to-purple-600",
    hoverColor: "hover:from-purple-600 hover:to-purple-700",
    icon: ShieldAlert,
    badge: "24×7",
    description: "Natural disasters, floods, earthquakes, etc.",
  },
  {
    id: "women",
    category: "emergency",
    title: "Women Helpline",
    phone: "1091",
    color: "bg-gradient-to-r from-pink-500 to-pink-600",
    hoverColor: "hover:from-pink-600 hover:to-pink-700",
    icon: Phone,
    badge: "24×7",
    description: "Emergency support for women in distress",
  },
  {
    id: "child",
    category: "emergency",
    title: "Child Helpline",
    phone: "1098",
    color: "bg-gradient-to-r from-yellow-500 to-orange-500",
    hoverColor: "hover:from-yellow-600 hover:to-orange-600",
    icon: Phone,
    badge: "24×7",
    description: "Emergency assistance for children",
  },
  {
    id: "women-abuse",
    category: "emergency",
    title: "Domestic Violence Helpline",
    phone: "181",
    color: "bg-gradient-to-r from-rose-500 to-rose-600",
    hoverColor: "hover:from-rose-600 hover:to-rose-700",
    icon: Phone,
    badge: "24×7",
    description: "Support for women facing domestic violence",
  },
  {
    id: "senior-citizen",
    category: "emergency",
    title: "Senior Citizen Helpline",
    phone: "1291",
    color: "bg-gradient-to-r from-blue-500 to-indigo-600",
    hoverColor: "hover:from-blue-600 hover:to-indigo-700",
    icon: Phone,
    badge: "24×7",
    description: "Emergency helpline for senior citizens",
  },
  {
    id: "road-accident",
    category: "emergency",
    title: "Road Accident Emergency",
    phone: "1073",
    color: "bg-gradient-to-r from-teal-500 to-teal-600",
    hoverColor: "hover:from-teal-600 hover:to-teal-700",
    icon: Bus,
    badge: "24×7",
    description: "For highway and road accident emergencies",
  },

  // 🏛️ Government
  {
    id: "rto",
    category: "government",
    title: "RTO / Transport Helpline",
    phone: "1800123456",
    hours: "Mon–Sat 9am–6pm",
    icon: Bus,
    verified: true,
    description: "Vehicle registration and transport queries",
  },
  {
    id: "municipal",
    category: "government",
    title: "Municipal Services",
    phone: "1800266221",
    badge: "Toll-free",
    icon: Building2,
    description: "City services and municipal complaints",
  },
  {
    id: "cyber",
    category: "government",
    title: "Cybercrime Helpline",
    phone: "1930",
    badge: "24×7",
    icon: ShieldAlert,
    verified: true,
    description: "Report cyber crimes and online fraud",
  },

  // ⚡ Utilities
  {
    id: "electric",
    category: "utility",
    title: "Electricity Outage",
    phone: "1912",
    badge: "24×7",
    icon: Plug,
    description: "Power outages and electrical issues",
  },
  {
    id: "water",
    category: "utility",
    title: "Water Supply Issues",
    phone: "1916",
    icon: Droplets,
    description: "Water supply and quality issues",
  },
  {
    id: "gas",
    category: "utility",
    title: "Gas Leak Emergency",
    phone: "1906",
    badge: "24×7",
    icon: AlarmSmoke,
    description: "Gas leaks and pipeline emergencies",
  },
];

const SECTIONS = [
  {
    key: "emergency",
    title: "Emergency Services",
    color: "text-red-600",
    icon: ShieldAlert,
  },
  {
    key: "government",
    title: "Government Hotlines",
    color: "text-blue-600",
    icon: Building2,
  },
  { key: "utility", title: "Utilities", color: "text-purple-600", icon: Plug },
];

export default function Emergency() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return HOTLINES.filter(
      (h) =>
        h.title.toLowerCase().includes(q) ||
        h.hours?.toLowerCase().includes(q) ||
        h.badge?.toLowerCase().includes(q) ||
        h.description?.toLowerCase().includes(q)
    );
  }, [query]);

  function HotlineRow({ h }) {
    const Icon = h.icon ?? Phone;
    return (
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 hover:border-blue-200">
        <div className="p-5">
          <div className="flex justify-between items-start mb-4">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
              {h.category.toUpperCase()}
            </span>
            {h.badge && (
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-medium">
                {h.badge}
              </span>
            )}
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center group-hover:from-blue-50 group-hover:to-blue-100 transition-colors duration-200">
              <Icon className="w-8 h-8 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-gray-900 text-lg">{h.title}</h3>
                {h.verified && (
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                )}
              </div>
              <p className="text-sm text-gray-600 mb-2">{h.description}</p>
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <Clock className="h-4 w-4 mr-1" />
                <span>{h.hours || "24/7 Available"}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <a
              href={`tel:${h.phone}`}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors flex items-center justify-between w-full"
            >
              <span className="flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                {h.phone}
              </span>
              <span className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-xs transition-all">
                Call Now
              </span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  function EmergencyButtons() {
    const em = filtered.filter((h) => h.category === "emergency");
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {em.map((h) => (
          <a
            key={h.id}
            href={`tel:${h.phone}`}
            className={`group relative overflow-hidden flex flex-col items-center justify-center ${
              h.color ?? "bg-gradient-to-r from-gray-800 to-gray-900"
            } ${
              h.hoverColor ?? "hover:from-gray-900 hover:to-black"
            } text-white rounded-xl p-6 font-semibold shadow-lg transition-all duration-200 transform hover:scale-105 hover:shadow-xl`}
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
            {h.icon && <h.icon className="w-8 h-8 mb-3" />}
            <div className="text-center">
              <div className="text-sm font-semibold">{h.title}</div>
              <div className="text-lg font-bold mt-2">{h.phone}</div>
              <div className="text-xs opacity-90 mt-1">{h.description}</div>
            </div>
          </a>
        ))}
      </div>
    );
  }

  const emergencyCount = filtered.filter(
    (h) => h.category === "emergency"
  ).length;

  const handleLogout = () => {
    console.log("User logged out!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-spline-sans">
      {/* Hero Section */}
      <Navbar notificationsCount={5} onLogout={handleLogout} />
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Emergency Services & Hotlines
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Immediate assistance when you need it most. Find emergency
              contacts, government services, and utility helplines all in one
              place.
            </p>

            {/* Enhanced Search */}
            <div className="relative max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search helplines (e.g., police, electricity, gas)..."
                  className="w-full px-6 py-4 pr-16 rounded-xl text-gray-900 shadow-lg border border-white/20 focus:outline-none focus:ring-4 focus:ring-white/20 focus:border-white text-lg backdrop-blur-sm bg-white/95"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-all hover:scale-105 shadow-md">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Emergency buttons - only show if emergency services match search */}
        {emergencyCount > 0 && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <ShieldAlert className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Emergency Services
              </h2>
              <span className="inline-flex items-center justify-center w-6 h-6 bg-red-100 text-red-600 text-sm font-bold rounded-full">
                {emergencyCount}
              </span>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
              <EmergencyButtons />
              <div className="mt-6 p-4 bg-red-50 rounded-xl border border-red-100">
                <p className="text-sm text-red-800 text-center">
                  <strong>Emergency services are available 24/7.</strong> Call
                  immediately in case of emergency.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Other sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {SECTIONS.filter((s) => s.key !== "emergency").map((sec) => {
            const items = filtered.filter((h) => h.category === sec.key);
            if (!items.length) return null;
            const Icon = sec.icon;

            return (
              <section key={sec.key} className="mb-8">
                <div className="flex items-center gap-2 mb-6">
                  <Icon className={`w-6 h-6 ${sec.color}`} />
                  <h3 className="text-xl font-bold text-gray-900">
                    {sec.title}
                  </h3>
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-100 text-gray-600 text-sm font-bold rounded-full">
                    {items.length}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {items.map((h) => (
                    <HotlineRow key={h.id} h={h} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* No results message */}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hotlines found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms or browse all available services
              above.
            </p>
          </div>
        )}

        {/* Footer info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center mt-8">
          <p className="text-sm text-gray-600">
            <strong>Important:</strong> Keep this page bookmarked for quick
            access during emergencies. All numbers are verified and regularly
            updated.
          </p>
        </div>
      </div>
    </div>
  );
}
