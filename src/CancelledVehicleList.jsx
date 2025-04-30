import React, { useState, useEffect } from "react";
import { Car, Eye, AlertCircle } from "lucide-react";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { VehicleDashboard } from "./MyBookings";

function CancelledVehiclesDashboard() {
  const [vehiclesList, setVehiclesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchCancelledVehicles();
  }, []);

  const fetchCancelledVehicles = () => {
    const token = localStorage.getItem("access_token");
    setLoading(true);
    if (userRole === "vendor") {
      axios
        .post(
          "http://localhost:3000/api/vendor/rentalList",
          {
            status: "Cancelled",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          if (res.status === 200) {
            setVehiclesList(res.data);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          toast.error("Failed to load cancelled vehicles", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        });
    } else if (userRole === "admin") {
      axios
        .post(
          "http://localhost:3000/api/admin/rentalList",
          {
            status: "Cancelled",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          if (res.status === 200) {
            setVehiclesList(res.data);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          toast.error("Failed to load cancelled vehicles", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        });
    } else if (userRole === "customer") {
      axios
        .post(
          "http://localhost:3000/api/customer/rental",
          {
            status: "Cancelled",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          if (res.status === 200) {
            setVehiclesList(res.data);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          toast.error("Failed to load cancelled vehicles", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        });
    }
  };

  const handleViewDetails = (bookingId) => {
    // This will be handled by your routing logic later
    console.log("Navigate to vehicle details page for:", bookingId);
    if (userRole === "customer") {
      navigate(`/MyBookings/${bookingId}`);
      return;
    }
    navigate(`/singleRental/${bookingId}`, { state: { id: bookingId } });
    // For example: history.push(`/vehicle-details/${vehicleId}`);
  };

  return (
    <div className="dashboard p-6 bg-gray-50 font-sans">
      {/* Cancelled Vehicles List Section */}
      {userRole === "customer" ? <VehicleDashboard /> : null}
      <div
        className={`bg-white rounded-xl shadow-lg ${userRole === "customer" ? "container" : ""} overflow-hidden`}
      >
        <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-blue-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">
            Cancelled Vehicles
          </h2>
          <span className="text-sm text-gray-600 font-medium">
            Total Cancelled: {vehiclesList.length}
          </span>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">
            Loading cancelled vehicles...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-100 to-blue-200 border-b-2 border-blue-300">
                <tr>
                  <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Vehicle No
                  </th>
                  <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Model
                  </th>
                  <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Pickup Location
                  </th>
                  <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="p-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {vehiclesList.map((booking) => (
                  <tr
                    key={booking._id}
                    className="hover:bg-blue-50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="p-2 rounded-full mr-3 bg-blue-100">
                          <Car className="text-blue-600" size={20} />
                        </div>
                        <span className="font-semibold text-gray-900">
                          {booking.vehicle.registration_number}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-700">
                      {booking.vehicle.make?.brandName || ""}{" "}
                      {booking.vehicle.model}
                    </td>
                    <td className="p-4 text-gray-700">
                      {booking.pickUpLocation || "Not specified"}
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 flex items-center w-fit">
                        <AlertCircle size={14} className="mr-1" />
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleViewDetails(booking._id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center ml-auto transition-colors"
                      >
                        <Eye size={16} className="mr-2" /> View Details
                      </button>
                    </td>
                  </tr>
                ))}

                {vehiclesList.length === 0 && (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500">
                      No cancelled vehicles found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default CancelledVehiclesDashboard;
