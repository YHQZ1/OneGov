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
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/f0/AIIMS_New_Delhi.jpg",
    rating: 4.7,
    openNow: true,
  },
  {
    id: 2,
    name: "India Post - Head Post Office",
    category: "Postal Services",
    phone: "1800 266 6868",
    address: "Sansad Marg, New Delhi - 110001",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/3c/India_Post_Logo.png",
    rating: 4.4,
    openNow: true,
  },
  {
    id: 3,
    name: "State Bank of India (SBI) - Main Branch",
    category: "Banking",
    phone: "1800 1234",
    address: "Parliament Street, New Delhi - 110001",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/89/State_Bank_of_India_logo.svg",
    rating: 4.6,
    openNow: true,
  },
  {
    id: 4,
    name: "Passport Seva Kendra",
    category: "Citizen Services",
    phone: "1800 258 1800",
    address: "R.K. Puram, New Delhi - 110022",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/f1/Passport_Seva_Logo.png",
    rating: 4.3,
    openNow: false,
  },
  {
    id: 5,
    name: "Delhi Jal Board - Citizen Facilitation Center",
    category: "Utilities",
    phone: "1916",
    address: "Varunalaya Bhawan, Jhandewalan, New Delhi - 110005",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/1a/Delhi_Jal_Board_logo.png",
    rating: 4.1,
    openNow: true,
  },
  {
    id: 6,
    name: "IRCTC Regional Office",
    category: "Transport",
    phone: "139",
    address: "State Entry Road, Connaught Place, New Delhi - 110001",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/IRCTC_Logo.png",
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
              <div className="p-5 flex space-x-4">
                <img
                  src={biz.image}
                  alt={biz.name}
                  className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                />
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
