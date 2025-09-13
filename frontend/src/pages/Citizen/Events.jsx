import { useState } from "react";
import { Search } from "lucide-react";
import Navbar from "../../components/Navbar";

const eventsData = [
  {
    id: 1,
    category: "FESTIVAL",
    title: "Community Arts Festival",
    date: "Jul 15, 2024 · 10:00 AM",
    location: "Central Park",
    logo: (
      <div className="w-16 h-16 rounded-lg bg-purple-100 flex items-center justify-center p-2 flex-shrink-0">
        <svg viewBox="0 0 100 100" className="w-12 h-12">
          <circle cx="50" cy="50" r="45" fill="#7e22ce" />
          <path d="M30 40 L70 40 L65 60 L35 60 Z" fill="white" />
          <circle cx="40" cy="45" r="5" fill="#7e22ce" />
          <circle cx="60" cy="45" r="5" fill="#7e22ce" />
        </svg>
      </div>
    ),
  },
  {
    id: 2,
    category: "WORKSHOP",
    title: "Digital Photography Workshop",
    date: "Jul 20, 2024 · 2:00 PM",
    location: "Community Center",
    logo: (
      <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center p-2 flex-shrink-0">
        <svg viewBox="0 0 100 100" className="w-12 h-12">
          <rect x="25" y="25" width="50" height="40" rx="5" fill="#1d4ed8" />
          <circle cx="50" cy="35" r="8" fill="white" />
          <circle cx="50" cy="35" r="4" fill="#1d4ed8" />
          <rect x="35" y="50" width="30" height="10" rx="2" fill="white" />
        </svg>
      </div>
    ),
  },
  {
    id: 3,
    category: "EDUCATIONAL",
    title: "Financial Literacy Seminar",
    date: "Jul 25, 2024 · 6:00 PM",
    location: "Public Library",
    logo: (
      <div className="w-16 h-16 rounded-lg bg-green-100 flex items-center justify-center p-2 flex-shrink-0">
        <svg viewBox="0 0 100 100" className="w-12 h-12">
          <path d="M30 30 L70 30 L70 70 L30 70 Z" fill="#16a34a" />
          <path d="M40 40 L60 40 L60 60 L40 60 Z" fill="white" />
          <text
            x="50"
            y="50"
            textAnchor="middle"
            fill="#16a34a"
            fontSize="20"
            fontWeight="bold"
            dy="5"
          >
            $
          </text>
        </svg>
      </div>
    ),
  },
  {
    id: 4,
    category: "FESTIVAL",
    title: "Summer Music Festival",
    date: "Aug 5, 2024 · 12:00 PM",
    location: "Waterfront Park",
    logo: (
      <div className="w-16 h-16 rounded-lg bg-yellow-100 flex items-center justify-center p-2 flex-shrink-0">
        <svg viewBox="0 0 100 100" className="w-12 h-12">
          <circle cx="50" cy="50" r="40" fill="#ca8a04" />
          <path d="M40 30 L60 30 L65 50 L60 70 L40 70 L35 50 Z" fill="white" />
          <path d="M45 40 L55 40 L55 60 L45 60 Z" fill="#ca8a04" />
        </svg>
      </div>
    ),
  },
  {
    id: 5,
    category: "FESTIVAL",
    title: "Food & Culture Fair",
    date: "Aug 12, 2024 · 11:00 AM",
    location: "Town Square",
    logo: (
      <div className="w-16 h-16 rounded-lg bg-red-100 flex items-center justify-center p-2 flex-shrink-0">
        <svg viewBox="0 0 100 100" className="w-12 h-12">
          <circle cx="50" cy="50" r="40" fill="#dc2626" />
          <path d="M35 40 L65 40 L60 60 L40 60 Z" fill="white" />
          <circle cx="45" cy="45" r="3" fill="#dc2626" />
          <circle cx="55" cy="45" r="3" fill="#dc2626" />
        </svg>
      </div>
    ),
  },
  {
    id: 6,
    category: "WORKSHOP",
    title: "Gardening Workshop",
    date: "Aug 18, 2024 · 9:00 AM",
    location: "Botanical Gardens",
    logo: (
      <div className="w-16 h-16 rounded-lg bg-emerald-100 flex items-center justify-center p-2 flex-shrink-0">
        <svg viewBox="0 0 100 100" className="w-12 h-12">
          <path d="M40 60 L50 30 L60 60 Z" fill="#059669" />
          <circle cx="50" cy="65" r="10" fill="#059669" />
          <path d="M35 50 L65 50" stroke="#059669" strokeWidth="3" />
        </svg>
      </div>
    ),
  },
];

const handleLogout = () => {
  console.log("User logged out!");
};

export default function Events() {
  const [search, setSearch] = useState("");

  const filteredEvents = eventsData.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-spline-sans">
      <Navbar notificationsCount={5} onLogout={handleLogout} />

      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Discover Community Events Near You
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Stay connected and participate in local festivals, workshops, and
              seminars. Explore events happening in your neighborhood and join
              the fun!
            </p>

            {/* Enhanced Search */}
            <div className="relative max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search events by name, date, or location..."
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
        {/* Events List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 hover:border-blue-200"
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                    {event.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {event.date.split("·")[0].trim()}
                  </span>
                </div>

                <div className="flex items-start space-x-4">
                  {event.logo}
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">
                      {event.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>{event.date.split("·")[1].trim()}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors flex items-center justify-end space-x-1 w-full">
                    <span>View Details</span>
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No events found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms or browse all events
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
