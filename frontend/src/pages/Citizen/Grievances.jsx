import React, { useState } from "react";
import { MessageSquare, Send, ClipboardList, Search, MapPin, Home, FileText, Briefcase, User, Calendar } from "lucide-react";
import Navbar from "../../components/Navbar";

const handleLogout = () => {
  console.log("User logged out!");
};

const statusColors = {
  "Submitted": "bg-blue-100 text-blue-700",
  "In Progress": "bg-blue-100 text-blue-700",
  "Resolved": "bg-green-100 text-green-700",
  "Rejected": "bg-red-100 text-red-700"
};

const categoryIcons = {
  "infrastructure": <MapPin className="w-4 h-4" />,
  "utilities": <Home className="w-4 h-4" />,
  "transport": <Briefcase className="w-4 h-4" />,
  "public_service": <FileText className="w-4 h-4" />,
  "other": <User className="w-4 h-4" />
};

export default function Grievances() {
  const [grievances, setGrievances] = useState([
    { 
      id: 1, 
      title: "Streetlight not working", 
      status: "In Progress", 
      category: "infrastructure",
      description: "The streetlight near my house has been not working for the past week, making it unsafe to walk at night.",
      date: "2023-10-15",
      location: "Sector 12, RK Puram"
    },
    { 
      id: 2, 
      title: "Water supply issue", 
      status: "Resolved", 
      category: "utilities",
      description: "Irregular water supply in our area for the past 3 days.",
      date: "2023-10-10",
      location: "Mayur Vihar Phase 1"
    },
    { 
      id: 3, 
      title: "Potholes on main road", 
      status: "Submitted", 
      category: "infrastructure",
      description: "Large potholes on the main road causing traffic issues and accidents.",
      date: "2023-10-18",
      location: "Outer Ring Road, Near Delhi Gate"
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    location: ""
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGrievance = {
      id: grievances.length + 1,
      title: formData.title,
      status: "Submitted",
      category: formData.category,
      description: formData.description,
      location: formData.location,
      date: new Date().toISOString().split('T')[0]
    };
    setGrievances([newGrievance, ...grievances]);
    setFormData({ title: "", category: "", description: "", location: "" });
  };

  const filteredGrievances = grievances.filter(g => {
    const matchesSearch = g.title.toLowerCase().includes(search.toLowerCase()) || 
                          g.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || g.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-spline-sans">
      <Navbar notificationsCount={5} onLogout={handleLogout} />

      {/* Banner */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Grievances & Feedback
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Submit complaints, grievances, or feedback. Track your submissions and
              stay updated on their status.
            </p>

            {/* Enhanced Search */}
            <div className="relative max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search grievances by title, description..."
                  className="w-full px-6 py-4 pr-16 rounded-xl text-gray-900 shadow-lg border border-white/20 focus:outline-none focus:ring-4 focus:ring-white/20 focus:border-white text-lg backdrop-blur-sm bg-white/95"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Submission Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Send className="h-6 w-6 text-blue-600" /> Submit New Grievance
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter grievance title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="infrastructure">Infrastructure</option>
                    <option value="utilities">Utilities</option>
                    <option value="transport">Transportation</option>
                    <option value="public_service">Public Services</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Enter location of the issue"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    placeholder="Describe your grievance or feedback in detail..."
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="4"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium shadow-md"
                >
                  Submit Grievance
                </button>
              </form>
            </div>
          </div>

          {/* List of Grievances */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-md">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <ClipboardList className="h-6 w-6 text-blue-600" /> Your Grievances
                  <span className="text-sm font-normal text-gray-500 ml-2">({grievances.length})</span>
                </h2>
                
                <div className="mt-3 md:mt-0">
                  <select 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="All">All Status</option>
                    <option value="Submitted">Submitted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </div>

              {filteredGrievances.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No grievances found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredGrievances.map((g) => (
                    <div key={g.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[g.status]}`}>
                              {g.status}
                            </span>
                            <span className="flex items-center text-xs text-gray-500 gap-1">
                              {categoryIcons[g.category]}
                              {g.category.replace('_', ' ')}
                            </span>
                          </div>
                          <h3 className="font-bold text-gray-900">{g.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{g.description}</p>
                          
                          <div className="flex flex-wrap gap-4 mt-3">
                            <div className="flex items-center text-xs text-gray-500">
                              <MapPin className="w-3 h-3 mr-1" /> {g.location}
                            </div>
                            <div className="text-xs text-gray-500">
                              Submitted: {g.date}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}