import React, { useState, useEffect } from "react";
import Navbar from "../../components/NavbarHome";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsCount, setNotificationsCount] = useState(3);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [showAllApplications, setShowAllApplications] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [activeTopCategory, setActiveTopCategory] = useState(null);

  const recentlyUsed = [
    {
      id: 1,
      title: "Birth Certificate Application",
      status: "In Progress",
      statusColor: "bg-blue-600",
      department: "Civil Registration",
      lastUpdate: "2 hours ago",
      progress: 60,
      category: "citizen",
    },
    {
      id: 2,
      title: "Healthcare Provider Search",
      status: "Completed",
      statusColor: "bg-green-600",
      department: "Health Services",
      lastUpdate: "1 day ago",
      progress: 100,
      category: "health",
    },
    {
      id: 3,
      title: "Community Workshop Registration",
      status: "Pending Review",
      statusColor: "bg-yellow-500",
      department: "Community Affairs",
      lastUpdate: "3 hours ago",
      progress: 30,
      category: "community",
    },
  ];

  // Mock data for all visited services (expanded list)
  const allVisitedServices = [
    {
      id: 1,
      title: "Birth Certificate Application",
      status: "In Progress",
      statusColor: "bg-blue-600",
      department: "Civil Registration",
      lastUpdate: "2 hours ago",
      progress: 60,
      category: "citizen",
    },
    {
      id: 2,
      title: "Healthcare Provider Search",
      status: "Completed",
      statusColor: "bg-green-600",
      department: "Health Services",
      lastUpdate: "1 day ago",
      progress: 100,
      category: "health",
    },
    {
      id: 3,
      title: "Community Workshop Registration",
      status: "Pending Review",
      statusColor: "bg-yellow-500",
      department: "Community Affairs",
      lastUpdate: "3 hours ago",
      progress: 30,
      category: "community",
    },
    {
      id: 4,
      title: "Property Tax Payment",
      status: "Completed",
      statusColor: "bg-green-600",
      department: "Revenue Department",
      lastUpdate: "3 days ago",
      progress: 100,
      category: "revenue",
    },
    {
      id: 5,
      title: "Business License Renewal",
      status: "Approved",
      statusColor: "bg-green-600",
      department: "Business Services",
      lastUpdate: "1 week ago",
      progress: 100,
      category: "business",
    },
    {
      id: 6,
      title: "Parking Permit Application",
      status: "Rejected",
      statusColor: "bg-red-600",
      department: "Transportation",
      lastUpdate: "2 weeks ago",
      progress: 100,
      category: "transport",
    },
    {
      id: 7,
      title: "Building Permit Request",
      status: "Under Review",
      statusColor: "bg-blue-600",
      department: "Urban Planning",
      lastUpdate: "5 days ago",
      progress: 40,
      category: "planning",
    },
    {
      id: 8,
      title: "Voter Registration",
      status: "Completed",
      statusColor: "bg-green-600",
      department: "Elections Office",
      lastUpdate: "1 month ago",
      progress: 100,
      category: "citizen",
    },
    {
      id: 9,
      title: "Public Records Request",
      status: "Processing",
      statusColor: "bg-blue-600",
      department: "Administrative Services",
      lastUpdate: "2 days ago",
      progress: 20,
      category: "admin",
    },
  ];

  // Mock data for visited businesses
  const visitedBusinesses = [
    {
      id: 1,
      name: "Central Pharmacy",
      category: "Healthcare Services",
      rating: 4.8,
      location: "Government Hospital Complex",
      isFavorite: true,
      distance: "0.8 mi",
      image: "🏥",
    },
    {
      id: 2,
      name: "Civic Center Cafeteria",
      category: "Food Services",
      rating: 4.2,
      location: "Main Administrative Block",
      isFavorite: false,
      distance: "0.3 mi",
      image: "🍽️",
    },
    {
      id: 3,
      name: "Community Resource Center",
      category: "Public Services",
      rating: 4.9,
      location: "District Center",
      isFavorite: true,
      distance: "1.2 mi",
      image: "🏛️",
    },
    {
      id: 4,
      name: "Public Library Branch",
      category: "Educational Services",
      rating: 4.6,
      location: "Sector 15",
      isFavorite: false,
      distance: "2.1 mi",
      image: "📚",
    },
  ];

  // Mock data for government announcements
  const announcements = [
    {
      id: 1,
      type: "policy",
      priority: "high",
      title: "New Digital Service Implementation",
      description:
        "Enhanced online portal for property tax payments now available with additional features.",
      publishedBy: "Revenue Department",
      date: "Today, 10:30 AM",
    },
    {
      id: 2,
      type: "maintenance",
      priority: "medium",
      title: "Scheduled System Maintenance",
      description:
        "Online services will be temporarily unavailable this Sunday from 2:00 AM to 6:00 AM.",
      publishedBy: "IT Department",
      date: "Yesterday, 3:45 PM",
    },
    {
      id: 3,
      type: "event",
      priority: "low",
      title: "Public Consultation Meeting",
      description:
        "Community input session for the new urban development project scheduled for next week.",
      publishedBy: "Urban Planning",
      date: "2 days ago",
    },
  ];

  useEffect(() => {
    setFilteredApplications(recentlyUsed);
    setFilteredBusinesses(visitedBusinesses);
  }, []);

  // Government service categories
  const serviceCategories = [
    {
      id: 1,
      label: "Citizen Services",
      bgColor: "bg-blue-50 hover:bg-blue-100",
      iconColor: "text-blue-700",
      borderColor: "border-blue-200",
      hoverBorderColor: "hover:border-blue-400",
      count: 24,
      value: "citizen",
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      id: 2,
      label: "Emergency Services",
      bgColor: "bg-red-50 hover:bg-red-100",
      iconColor: "text-red-700",
      borderColor: "border-red-200",
      hoverBorderColor: "hover:border-red-400",
      count: 8,
      value: "emergency",
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
    },
    {
      id: 3,
      label: "Business Services",
      bgColor: "bg-green-50 hover:bg-green-100",
      iconColor: "text-green-700",
      borderColor: "border-green-200",
      hoverBorderColor: "hover:border-green-400",
      count: 18,
      value: "business",
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      id: 4,
      label: "Public Events",
      bgColor: "bg-purple-50 hover:bg-purple-100",
      iconColor: "text-purple-700",
      borderColor: "border-purple-200",
      hoverBorderColor: "hover:border-purple-400",
      count: 12,
      value: "events",
      icon: (
        <svg
          className="h-8 w-8"
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
      ),
    },
    {
      id: 5,
      label: "Transportation",
      bgColor: "bg-indigo-50 hover:bg-indigo-100",
      iconColor: "text-indigo-700",
      borderColor: "border-indigo-200",
      hoverBorderColor: "hover:border-indigo-400",
      count: 6,
      value: "transport",
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
      ),
    },
    {
      id: 6,
      label: "Civic Engagement",
      bgColor: "bg-orange-50 hover:bg-orange-100",
      iconColor: "text-orange-700",
      borderColor: "border-orange-200",
      hoverBorderColor: "hover:border-orange-400",
      count: 9,
      value: "civic",
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
  ];

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();

    // Filter Applications
    const filteredApps = recentlyUsed.filter((item) =>
      item.title.toLowerCase().includes(query)
    );

    // Filter Businesses
    const filteredBiz = visitedBusinesses.filter((biz) =>
      biz.name.toLowerCase().includes(query)
    );

    setFilteredApplications(filteredApps);
    setFilteredBusinesses(filteredBiz);
  };

  const handleLogout = () => {
    console.log("User logged out!");
  };

  const toggleFavorite = (id) => {
    console.log("Toggle favorite for business:", id);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const navigate = useNavigate();

  const handleTopCategoryClick = (category) => {
    switch (category) {
      case "citizen":
        navigate("/citizen-services");
        break;
      case "emergency":
        navigate("/emergency-services");
        break;
      case "business":
        navigate("/business-services");
        break;
      case "events":
        navigate("/public-events");
        break;
      case "transport":
        navigate("/transportation");
        break;
      case "civic":
        navigate("/civic-engagement");
      default:
        break;
    }
  };

  const getAnnouncementIcon = (type) => {
    switch (type) {
      case "policy":
        return (
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "maintenance":
        return (
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        );
      case "event":
        return (
          <svg
            className="h-5 w-5"
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
        );
      default:
        return (
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 01118 0z"
            />
          </svg>
        );
    }
  };

  const filterApplicationsByCategory = (category) => {
    setActiveCategory(category);
    if (category === "all") {
      setFilteredApplications(recentlyUsed);
    } else {
      const filtered = recentlyUsed.filter((app) => app.category === category);
      setFilteredApplications(filtered);
    }
  };

  const toggleApplicationsView = () => {
    setShowAllApplications(!showAllApplications);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "grid" ? "list" : "grid");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar notificationsCount={5} onLogout={handleLogout} />

      {/* Welcome Banner */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Welcome to Your Government Services Portal
            </h1>
            <p className="text-blue-100 text-lg mb-0 max-w-2xl mx-auto">
              Access all government services, track your applications, and stay
              informed about community updates in one secure platform.
            </p>
          </div>
        </div>
      </section>

      {/* Service Categories Grid */}
      <section className="py-12 -mt-6 relative z-10">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Government Service Categories
            </h2>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {serviceCategories.map((category) => (
                <div
                  key={category.id}
                  className={`${category.bgColor} ${category.borderColor} ${category.hoverBorderColor} border-2 rounded-xl p-4 text-center transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg group`}
                  onClick={() => handleTopCategoryClick(category.value)}
                >
                  <div
                    className={`${category.iconColor} mb-3 flex justify-center group-hover:scale-110 transition-transform`}
                  >
                    {category.icon}
                  </div>
                  <h3 className="text-gray-900 font-bold text-sm mb-1">
                    {category.label}
                  </h3>
                  <div className="flex items-center justify-center">
                    <span
                      className={`${category.iconColor} bg-white px-2 py-1 rounded-full text-xs font-semibold border-2 ${category.borderColor}`}
                    >
                      {category.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 space-y-12 pb-12">
        {/* Recent Applications */}
        <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Recent Applications & Services
            </h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleViewMode}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                {viewMode === "grid" ? (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                )}
              </button>
              <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1 transition-colors">
                <span>View All</span>
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

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => filterApplicationsByCategory("all")}
            >
              All Applications
            </button>
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => filterApplicationsByCategory(category.value)}
              >
                {category.label}
              </button>
            ))}
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredApplications.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-all hover:shadow-md bg-gray-50/50 relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gray-200">
                    <div
                      className={`h-full ${item.statusColor}`}
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex items-start justify-between mb-4 pt-2">
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 ${item.statusColor} rounded-full mr-2`}
                      ></div>
                      <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full border">
                        {item.lastUpdate}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {item.department}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      {item.status}
                    </span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors flex items-center">
                      <span>View Details</span>
                      <svg
                        className="h-4 w-4 ml-1"
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
              ))}
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Service
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Department
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Last Update
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredApplications.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {item.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.statusColor} text-white`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.lastUpdate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* All Applications Section */}
        <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              All Applications
            </h2>
            <button
              onClick={toggleApplicationsView}
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1 transition-colors"
            >
              <span>{showAllApplications ? "Show Less" : "View All"}</span>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(showAllApplications
              ? allVisitedServices
              : allVisitedServices.slice(0, 3)
            ).map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-all hover:shadow-md bg-gray-50/50 relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-200">
                  <div
                    className={`h-full ${item.statusColor}`}
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
                <div className="flex items-start justify-between mb-4 pt-2">
                  <div className="flex items-center">
                    <div
                      className={`w-3 h-3 ${item.statusColor} rounded-full mr-2`}
                    ></div>
                    <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full border">
                      {item.lastUpdate}
                    </span>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{item.department}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {item.status}
                  </span>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors flex items-center">
                    <span>View Details</span>
                    <svg
                      className="h-4 w-4 ml-1"
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
            ))}
          </div>
        </section>

        {/* Two-column layout for Announcements and Featured Services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Government Announcements */}
          <section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                What's happening in your city
              </h2>
              <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1 transition-colors text-sm">
                <span>View All</span>
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

            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="border border-gray-200 rounded-xl p-5 hover:border-blue-300 transition-all hover:shadow-md bg-gray-50/30"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full ${getPriorityColor(
                          announcement.priority
                        )}`}
                      >
                        {getAnnouncementIcon(announcement.type)}
                      </div>
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(
                          announcement.priority
                        )}`}
                      >
                        {announcement.type.toUpperCase()}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">
                      {announcement.date}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-md">
                    {announcement.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                    {announcement.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium">
                      {announcement.publishedBy}
                    </span>
                    <button className="text-blue-600 hover:text-blue-800 text-xs font-medium transition-colors flex items-center space-x-1">
                      <span>Read More</span>
                      <svg
                        className="h-3 w-3"
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
              ))}
            </div>
          </section>

          {/* Featured Services & Businesses */}
          <section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Featured Services & Locations
              </h2>
              <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1 transition-colors text-sm">
                <span>Explore All</span>
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
            <div className="grid grid-cols-1 gap-4">
              {filteredBusinesses.map((business) => (
                <div
                  key={business.id}
                  className="border border-gray-200 rounded-xl p-5 hover:border-blue-300 transition-all hover:shadow-md bg-gray-50/30 group flex items-center"
                >
                  <div className="flex-shrink-0 mr-4 text-3xl">
                    {business.image}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-md">
                        {business.name}
                      </h3>
                      <button
                        onClick={() => toggleFavorite(business.id)}
                        className={`transition-colors p-1 rounded-lg ${
                          business.isFavorite
                            ? "text-yellow-500 bg-yellow-50"
                            : "text-gray-400 hover:text-yellow-500 hover:bg-yellow-50"
                        }`}
                      >
                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      {business.category}
                    </p>
                    <p className="text-xs text-gray-500 mb-2">
                      {business.location}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <svg
                            className="h-3 w-3 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-xs font-semibold text-gray-700">
                            {business.rating}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">
                          {business.distance}
                        </span>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 text-xs font-medium transition-colors">
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 py-12 mt-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              Need Immediate Assistance?
            </h2>
            <p className="text-blue-100">
              Access emergency services and critical information
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg flex items-center space-x-3 transform hover:scale-105 transition-transform">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span>Emergency: 911</span>
            </button>
            <button className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg flex items-center space-x-3 transform hover:scale-105 transition-transform">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 01118 0z"
                />
              </svg>
              <span>Help Center</span>
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg flex items-center space-x-3 transform hover:scale-105 transition-transform">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z"
                />
              </svg>
              <span>Live Chat Support</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
