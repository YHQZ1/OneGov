import { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";

export default function AdminHome() {
  const [metrics, setMetrics] = useState({
    pendingBusinesses: 0,
    pendingGrievances: 0,
    newFeedback: 0,
    activeServices: 0,
    upcomingEvents: 0,
  });
  const [loading, setLoading] = useState(true);

  // Simulate data loading with mock data
  useEffect(() => {
    const timer = setTimeout(() => {
      setMetrics({
        pendingBusinesses: 12,
        pendingGrievances: 8,
        newFeedback: 5,
        activeServices: 23,
        upcomingEvents: 4,
      });
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const cards = [
    { 
      label: "Pending Business Approvals", 
      value: metrics.pendingBusinesses,
      color: "bg-blue-100",
      textColor: "text-blue-600"
    },
    { 
      label: "Pending Grievances", 
      value: metrics.pendingGrievances,
      color: "bg-red-100",
      textColor: "text-red-600"
    },
    { 
      label: "New Feedback Items", 
      value: metrics.newFeedback,
      color: "bg-amber-100",
      textColor: "text-amber-600"
    },
    { 
      label: "Active Citizen Services", 
      value: metrics.activeServices,
      color: "bg-green-100",
      textColor: "text-green-600"
    },
    { 
      label: "Upcoming Events", 
      value: metrics.upcomingEvents,
      color: "bg-purple-100",
      textColor: "text-purple-600"
    },
  ];

  const quickActions = [
    { label: "Create Citizen Service", icon: "📋" },
    { label: "Review Business Approvals", icon: "🏢" },
    { label: "Add Community Event", icon: "📅" },
    { label: "Create Poll", icon: "📊" },
    { label: "Add Emergency Number", icon: "🆘" },
    { label: "Manage Users", icon: "👥" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
    <AdminNavbar />
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-blue-100 mt-2">
            Review pending requests, publish services and events, and manage civic tools.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Metrics Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Overview Metrics</h2>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((card) => (
                <div key={card.label} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                  <p className="text-gray-500 text-sm font-medium">{card.label}</p>
                  <p className={`text-3xl font-bold mt-2 ${card.textColor}`}>{card.value}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Quick Actions Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <button
                key={action.label}
                className="flex items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors shadow-sm"
              >
                <span className="text-2xl mr-3">{action.icon}</span>
                <span className="text-left font-medium text-gray-700">{action.label}</span>
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-200 bg-white py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Civic Administration Portal
        </div>
      </footer>
    </div>
  );
}