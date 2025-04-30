import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const VehicleRentalNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Pending", path: "/pending-vehicles" },
    { label: "Approved", path: "/approved-vehicles" },
    { label: "Cancelled", path: "/cancelled-vehicles" },
    { label: "Rejected", path: "/rejected-vehicles" },
    { label: "In Trip", path: "/in-trip-vehicles" },
    { label: "Completed", path: "/completed-vehicles" },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="w-full px-6 mx-auto max-w-7xl">
      <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
        <div className="flex overflow-x-auto justify-between">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap flex-1 ${
                isActive(item.path)
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehicleRentalNav;
