import { useState } from "react";
import {
  Home,
  FileText,
  Briefcase,
  Calendar,
  User,
  Search,
  MapPin,
  Phone,
  Star,
} from "lucide-react";
import Navbar from "../../components/Navbar";

const businessesData = [
  {
    id: 1,
    name: "AIIMS Delhi - Public Health Services",
    category: "Hospital",
    phone: "011-26588500",
    address: "Ansari Nagar, New Delhi - 110029",
    logo: (
      <div className="w-20 h-20 rounded-lg bg-blue-100 flex items-center justify-center p-2">
        <svg viewBox="0 0 100 100" className="w-16 h-16">
          <circle cx="50" cy="50" r="45" fill="#1e40af" />
          <path
            d="M40 30 L60 30 L70 50 L60 70 L40 70 L30 50 Z"
            fill="white"
          />
          <path
            d="M45 40 L55 40 L55 60 L45 60 Z"
            fill="#1e40af"
          />
        </svg>
      </div>
    ),
    rating: 4.7,
    openNow: true,
  },
  {
    id: 2,
    name: "India Post - Head Post Office",
    category: "Postal Services",
    phone: "1800 266 6868",
    address: "Sansad Marg, New Delhi - 110001",
    logo: (
      <div className="w-20 h-20 rounded-lg bg-red-100 flex items-center justify-center p-2">
        <svg viewBox="0 0 100 100" className="w-16 h-16">
          <rect x="20" y="25" width="60" height="50" rx="5" fill="#dc2626" />
          <text x="50" y="55" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">IP</text>
        </svg>
      </div>
    ),
    rating: 4.4,
    openNow: true,
  },
  {
    id: 3,
    name: "State Bank of India (SBI) - Main Branch",
    category: "Banking",
    phone: "1800 1234",
    address: "Parliament Street, New Delhi - 110001",
    logo: (
      <div className="w-20 h-20 rounded-lg bg-blue-100 flex items-center justify-center p-2">
        <svg viewBox="0 0 100 100" className="w-16 h-16">
          <circle cx="50" cy="50" r="40" fill="#1e3a8a" />
          <circle cx="50" cy="50" r="30" fill="white" />
          <text x="50" y="55" textAnchor="middle" fill="#1e3a8a" fontSize="20" fontWeight="bold">SBI</text>
        </svg>
      </div>
    ),
    rating: 4.6,
    openNow: true,
  },
  {
    id: 4,
    name: "Passport Seva Kendra",
    category: "Citizen Services",
    phone: "1800 258 1800",
    address: "R.K. Puram, New Delhi - 110022",
    logo: (
      <div className="w-20 h-20 rounded-lg bg-blue-100 flex items-center justify-center p-2">
        <svg viewBox="0 0 100 100" className="w-16 h-16">
          <rect x="25" y="25" width="50" height="50" rx="5" fill="#1e40af" />
          <path
            d="M35 35 L65 35 L65 45 L35 45 Z"
            fill="white"
          />
          <circle cx="50" cy="60" r="8" fill="white" />
        </svg>
      </div>
    ),
    rating: 4.3,
    openNow: false,
  },
  {
    id: 5,
    name: "Delhi Jal Board - Citizen Facilitation Center",
    category: "Utilities",
    phone: "1916",
    address: "Varunalaya Bhawan, Jhandewalan, New Delhi - 110005",
    logo: (
      <div className="w-20 h-20 rounded-lg bg-blue-100 flex items-center justify-center p-2">
        <svg viewBox="0 0 100 100" className="w-16 h-16">
          <path
            d="M30 30 Q50 20 70 30 Q80 50 70 70 Q50 80 30 70 Q20 50 30 30"
            fill="#0284c7"
          />
          <path
            d="M40 40 L60 40 L55 60 L45 60 Z"
            fill="white"
          />
        </svg>
      </div>
    ),
    rating: 4.1,
    openNow: true,
  },
  {
    id: 6,
    name: "IRCTC Regional Office",
    category: "Transport",
    phone: "139",
    address: "State Entry Road, Connaught Place, New Delhi - 110001",
    logo: (
      <div className="w-20 h-20 rounded-lg bg-orange-100 flex items-center justify-center p-2">
        <svg viewBox="0 0 100 100" className="w-16 h-16">
          <rect x="20" y="30" width="60" height="40" rx="5" fill="#ea580c" />
          <text x="50" y="55" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">IRCTC</text>
        </svg>
      </div>
    ),
    rating: 4.5,
    openNow: true,
  },
];

const handleLogout = () => {
  console.log("User logged out!");
};

export default function Business() {
  const [search, setSearch] = useState("");

  const filteredBusinesses = businessesData.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-spline-sans">
      <Navbar notificationsCount={5} onLogout={handleLogout} />

      {/* Banner */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Explore Local Businesses Near You
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Find trusted local shops, clinics, services, and more. Stay
              connected and discover the businesses that make your community
              thrive.
            </p>

            {/* Enhanced Search */}
            <div className="relative max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search businesses by name, category, or location..."
                  className="w-full px-6 py-4 pr-16 rounded-xl text-gray-900 shadow-lg border border-white/20 focus:outline-none focus:ring-4 focus:ring-white/20 focus:border-white text-lg backdrop-blur-sm bg-white/95"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyPress={(e) =>
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
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Nearby Businesses
        </h2>
        <p className="text-gray-600 mb-6">
          Discover trusted local services and shops in your community
        </p>

        {/* Businesses List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((biz) => (
            <div
              key={biz.id}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 hover:border-blue-200"
            >
              <div className="p-5 flex items-center space-x-4">
                {biz.logo}
                <div className="flex-1">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                    {biz.category}
                  </span>
                  <h3 className="font-bold text-gray-900 text-lg mt-1">
                    {biz.name}
                  </h3>
                  <p className="flex items-center text-sm text-gray-500 mt-1">
                    <MapPin className="w-4 h-4 mr-1" /> {biz.address}
                  </p>
                  <p className="flex items-center text-sm text-gray-500">
                    <Phone className="w-4 h-4 mr-1" /> {biz.phone}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Star className="w-4 h-4 mr-1 text-yellow-500" />
                    {biz.rating} ·{" "}
                    <span
                      className={`ml-1 font-medium ${
                        biz.openNow ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {biz.openNow ? "Open Now" : "Closed"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {filteredBusinesses.length === 0 && (
            <div className="text-center py-12 col-span-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7h18M3 12h18M3 17h18"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No businesses found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search terms or browse all local businesses
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}