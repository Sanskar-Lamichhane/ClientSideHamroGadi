import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CheckCircle,
  Car,
  Users,
  Truck,
  XCircle,
  CheckCheck,
  UserCircle,
  MapPin,
  ChartBarStacked,
} from "lucide-react";

// Admin sidebar items
const adminSidebarItems = [
  { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/approvedVehicleList", icon: CheckCircle, label: "Approved" },
  { path: "/intripVehicleList", icon: MapPin, label: "In Trip" },
  { path: "/cancelledVehicleList", icon: XCircle, label: "Cancelled Trips" },
  { path: "/rejectedVehicleList", icon: XCircle, label: "Rejected Trips" },
  { path: "/completedVehicleList", icon: CheckCheck, label: "Completed Trips" },
  { path: "/vehicles", icon: Car, label: "Vehicles" },
  { path: "/customers", icon: Users, label: "Customers" },
  { path: "/vendors", icon: Truck, label: "Vendors" },
  { path: "/type", icon: ChartBarStacked, label: "Type" },
  { path: "/brands", icon: Car, label: "Brands" },
];

// Vendor sidebar items (customize as needed)
const vendorSidebarItems = [
  { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/vehicles", icon: Car, label: "My Vehicles" },
  { path: "/intripVehicleList", icon: MapPin, label: "In Trip" },
  { path: "/approvedVehicleList", icon: CheckCircle, label: "Approved Trips" },
  { path: "/completedVehicleList", icon: CheckCheck, label: "Completed Trips" },
  { path: "/cancelledVehicleList", icon: XCircle, label: "Cancelled Trips" },
  { path: "/rejectedVehicleList", icon: XCircle, label: "Rejected Trips" },
];

function AdminSidebar() {
  const location = useLocation();

  // Get user role from localStorage
  const getUserRole = () => {
    const expiry = localStorage.getItem("expiry_date");
    if (!expiry || new Date().getTime() > expiry) {
      localStorage.removeItem("userRole");
      localStorage.removeItem("expiry_date");
      return null;
    }
    return localStorage.getItem("userRole");
  };

  const userRole = getUserRole();

  // Determine sidebar items and panel name based on role
  const sidebarItems =
    userRole === "vendor" ? vendorSidebarItems : adminSidebarItems;
  const panelName = userRole === "vendor" ? "Vendor Panel" : "Admin Panel";

  return (
    <div className="admin-sidebar w-64 bg-gray-800 text-white p-4">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold">{panelName}</h2>
      </div>
      <nav>
        {sidebarItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`
              flex items-center p-3 mb-2 rounded transition-colors duration-200
              ${
                location.pathname === item.path
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-700 text-gray-300"
              }
            `}
          >
            <item.icon className="mr-3" size={20} />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default AdminSidebar;
