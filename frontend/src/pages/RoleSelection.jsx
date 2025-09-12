import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function RoleSelection() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    // Small delay for animation before navigation
    setTimeout(() => {
      navigate("/auth", { state: { role } });
    }, 300);
  };

  const roles = [
    {
      id: "citizen",
      title: "Citizen",
      description: "Access public services, submit requests, and track status",
      color: "from-blue-500 to-blue-700",
      hoverColor: "hover:from-blue-600 hover:to-blue-800",
    },
    {
      id: "govt-admin",
      title: "Government Administrator",
      description: "Manage services, process requests, and oversee operations",
      color: "from-green-500 to-green-700",
      hoverColor: "hover:from-green-600 hover:to-green-800",
    },
    {
      id: "local-business",
      title: "Local Business User",
      description: "Access business services, permits, and compliance tools",
      color: "from-purple-500 to-purple-700",
      hoverColor: "hover:from-purple-600 hover:to-purple-800",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 text-center">
          <h1 className="text-4xl font-bold mb-3">Welcome to OneGov</h1>
          <p className="text-lg opacity-90">
            Select your role to continue to the portal
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map((role) => (
              <div
                key={role.id}
                className={`rounded-xl bg-gradient-to-br ${role.color} ${
                  role.hoverColor
                } text-white p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  selectedRole === role.id
                    ? "ring-4 ring-blue-300 ring-opacity-70 scale-105"
                    : ""
                }`}
                onClick={() => handleRoleSelect(role.id)}
              >
                <h2 className="text-2xl font-bold mb-2">{role.title}</h2>
                <p className="opacity-90 text-sm">{role.description}</p>
                <div className="mt-6 flex justify-end">
                  <span className="bg-white bg-opacity-20 py-1 px-3 rounded-full text-xs font-semibold">
                    Select →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 p-5 text-center text-sm text-gray-600">
          <p>
            Not sure which role to select? {" "}
            <a href="#" className="text-blue-600 hover:underline">
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
