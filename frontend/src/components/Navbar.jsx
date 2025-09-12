import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ notificationsCount = 0, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { name: "Citizen Services", path: "/citizen-services" },
    { name: "Emergency Services", path: "/emergency-services" },
    { name: "Business Services", path: "/business-services" },
    { name: "Public Events", path: "/public-events" },
    { name: "Transportation", path: "/transportation" },
    { name: "Civic Engagement", path: "/civic-engagement" },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="relative flex items-center h-16 max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left: Logo */}
        <div className="flex items-center flex-shrink-0">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center mr-3 shadow-md">
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </div>
          <div>
            <Link to="/home" className="hover:underline">
              <span className="text-xl font-bold text-gray-900">
                Smart Governance
              </span>
            </Link>
            <p className="text-xs text-gray-600 mt-0.5 hidden sm:block">
              Government Services Portal
            </p>
          </div>
        </div>

        {/* Center: Navigation Menu (Desktop) */}
        {/* Center: Navigation Menu (Desktop) */}
        <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-bold transition-colors duration-200 hover:bg-blue-50 whitespace-nowrap"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right: Notifications + Profile + Hamburger */}
        <div className="ml-auto flex items-center space-x-4 md:space-x-6">
          {/* Notifications */}
          <div className="relative">
            <button className="text-gray-500 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50 relative">
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
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V5a2 2 0 10-4 0v.083A6 6 0 004 11v3.159c0 .538-.214 1.055-.595 1.436L2 17h5m8 0a3 3 0 11-6 0h6z"
                />
              </svg>
              {notificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse">
                  {notificationsCount > 9 ? "9+" : notificationsCount}
                </span>
              )}
            </button>
          </div>

          {/* Profile + Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-semibold hover:ring-2 hover:ring-blue-300 transition-all duration-200 transform hover:scale-105"
              aria-label="User profile"
              aria-expanded={dropdownOpen}
            >
              JD
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50 animate-fadeIn">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Citizen ID: 12345
                  </p>
                </div>
                <div className="px-2 py-2">
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-150 flex items-center"
                  >
                    <svg
                      className="h-4 w-4 mr-2 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button (after profile) */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white border-t border-gray-200 shadow-md md:hidden animate-fadeIn z-40">
            <nav className="flex flex-col p-4 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-bold transition-colors duration-200 hover:bg-blue-50 whitespace-nowrap"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </header>
  );
};

export default Navbar;
