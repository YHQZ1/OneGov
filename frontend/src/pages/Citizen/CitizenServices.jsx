import { useState } from "react";
import {
  Search,
  FileText,
  Home,
  CreditCard,
  Globe,
  Shield,
  Zap,
  Leaf,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import Navbar from "../../components/Navbar";

const services = [
  {
    id: 1,
    name: "Births, Deaths & Marriages",
    icon: FileText,
    link: "https://crsorgi.gov.in/", // Civil Registration System
  },
  {
    id: 2,
    name: "Property Services",
    icon: Home,
    link: "https://www.nhb.org.in/home/", // Or state property registration portals
  },
  {
    id: 3,
    name: "Financial Services",
    icon: CreditCard,
    link: "https://www.incometax.gov.in/", // Income Tax Portal
  },
  {
    id: 4,
    name: "Citizenship & Passports",
    icon: Globe,
    link: "https://portal2.passportindia.gov.in/", // Passport Seva
  },
  {
    id: 5,
    name: "Legal & Police Services",
    icon: Shield,
    link: "https://digitalpolice.gov.in/", // NCRB digital police portal
  },
  {
    id: 6,
    name: "Utility Services",
    icon: Zap,
    link: "https://www.bharatbillpay.com/", // Bharat BillPay
  },
  {
    id: 7,
    name: "Agriculture",
    icon: Leaf,
    link: "https://agricorpgov.org/", // Ministry of Agriculture
  },
  {
    id: 8,
    name: "Education & Health",
    icon: GraduationCap,
    link: "https://www.education.gov.in/", // Ministry of Education (can also link to NHM for health)
  },
  {
    id: 9,
    name: "Business & Self-Employment",
    icon: Briefcase,
    link: "https://www.startupindia.gov.in/", // Startup India portal
  },
];

const recentlyUsed = [
  { id: 1, name: "Electricity Bill Payment" },
  { id: 2, name: "PAN Card Application" },
  { id: 3, name: "Passport Renewal" },
];

const handleLogout = () => {
  console.log("User logged out!");
};

export default function CitizenServices() {
  const [search, setSearch] = useState("");

  const filteredServices = services.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-spline-sans">
      <Navbar notificationsCount={5} onLogout={handleLogout} />

      {/* Hero Section (Consistent Design) */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Access Citizen Services
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Certificates, bills, passports, legal help, and more — all in one
              place for your convenience.
            </p>

            {/* Search */}
            <div className="relative max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for a service..."
                  className="w-full px-6 py-4 pr-16 rounded-xl text-gray-900 shadow-lg border border-white/20 focus:outline-none focus:ring-4 focus:ring-white/20 focus:border-white text-lg backdrop-blur-sm bg-white/95"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && console.log("Search triggered")
                  }
                />
                <button
                  onClick={() => console.log("Search triggered")}
                  className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-all hover:scale-105 shadow-md"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-10">
        {/* Services Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <a
                key={service.id}
                href={service.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl border border-gray-100 p-6 text-center shadow hover:shadow-md transition-all cursor-pointer block"
              >
                <Icon className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                <h3 className="font-medium text-gray-800">{service.name}</h3>
              </a>
            );
          })}
        </div>

        {/* Recently Used */}
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6 text-center">
          Recently Used
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {recentlyUsed.map((item) => (
            <div
              key={item.id}
              className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-6 text-center text-blue-800 font-medium hover:bg-blue-100 cursor-pointer transition-colors"
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
