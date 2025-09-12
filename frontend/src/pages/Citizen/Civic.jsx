import { useState } from "react";
import { Search } from "lucide-react";
import Navbar from "../../components/Navbar";

const eventsData = [
  {
    id: 1,
    category: "NATIONAL",
    title: "Republic Day Parade 2025",
    date: "Jan 26, 2025 · 9:00 AM",
    location: "Kartavya Path, New Delhi",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/3f/Republic_Day_Parade_India.jpg",
  },
  {
    id: 2,
    category: "INTERNATIONAL",
    title: "International Yoga Day",
    date: "Jun 21, 2025 · 6:00 AM",
    location: "All Major Cities",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/50/International_Yoga_Day_India.jpg",
  },
  {
    id: 3,
    category: "GOVERNMENT",
    title: "Union Budget 2025 Presentation",
    date: "Feb 1, 2025 · 11:00 AM",
    location: "Parliament House, New Delhi",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/1e/Parliament_House%2C_New_Delhi.jpg",
  },
  {
    id: 4,
    category: "CIVIC",
    title: "Swachh Bharat Abhiyan Drive",
    date: "Oct 2, 2025 · 8:00 AM",
    location: "Across India",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Swachh_Bharat_Abhiyan_logo.svg",
  },
  {
    id: 5,
    category: "ELECTION",
    title: "General Elections 2025 - Voting Day",
    date: "Apr 15, 2025 · 7:00 AM",
    location: "Nationwide Polling Booths",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/ed/EVM_India_Voting_Machine.jpg",
  },
  {
    id: 6,
    category: "HEALTH",
    title: "National Health Mission Free Check-up Camp",
    date: "Sep 10, 2025 · 10:00 AM",
    location: "AIIMS, New Delhi",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/f0/AIIMS_New_Delhi.jpg",
  },
];

const handleLogout = () => {
  console.log("User logged out!");
};

export default function Civic() {
  const [search, setSearch] = useState("");

  const filteredEvents = eventsData.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-spline-sans">
      <Navbar notificationsCount={5} onLogout={handleLogout} />

      {/* Civic Engagement Hero */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Participate in Civic Engagement
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Make your voice count. Vote in polls, share feedback, and file
              grievances to help improve services in your neighborhood.
            </p>

            {/* Search */}
            <div className="relative max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search polls, feedback topics, or grievances..."
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

      {/* Main Content (you can replace this with polls/feedback/grievances later) */}
      <div className="container mx-auto px-4 py-6">
        {/* Example placeholder: events list (reuse until civic engagement components are built) */}
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
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
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
              No results found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms or browse all items
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
