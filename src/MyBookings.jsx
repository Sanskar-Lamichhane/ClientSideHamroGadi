// import React, { useState, useEffect } from 'react';
// import { Car, Eye, AlertCircle, Clock, CheckCircle, XCircle, MapPin, Truck } from 'lucide-react';
// import axios from 'axios';
// import { toast, Bounce } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import RentalDetailsPage from './singleRentalPage';

// function VehicleDashboard() {
//     const [vehiclesList, setVehiclesList] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [currentStatus, setCurrentStatus] = useState("Pending");
//     const navigate=useNavigate();

//     const statusIcons = {
//         "Pending": <Clock className="mr-1" size={14} />,
//         "Cancelled": <AlertCircle className="mr-1" size={14} />,
//         "Approved": <CheckCircle className="mr-1" size={14} />,
//         "Rejected": <XCircle className="mr-1" size={14} />,
//         "Completed": <CheckCircle className="mr-1" size={14} />,
//         "In Trip": <MapPin className="mr-1" size={14} />
//     };

//     const statusColors = {
//         "Pending": "bg-yellow-100 text-yellow-800",
//         "Cancelled": "bg-red-100 text-red-800",
//         "Approved": "bg-green-100 text-green-800",
//         "Rejected": "bg-gray-100 text-gray-800",
//         "Completed": "bg-blue-100 text-blue-800",
//         "In Trip": "bg-purple-100 text-purple-800"
//     };

//     const getUserRole = () => {
//         const expiry = localStorage.getItem("expiry_date");
//         if (!expiry || new Date().getTime() > expiry) {
//             localStorage.removeItem("userRole");
//             localStorage.removeItem("expiry_date");
//             return null;
//         }
//         return localStorage.getItem("userRole");
//     };

//     const userRole = getUserRole();

//     useEffect(() => {
//         fetchVehicles(currentStatus);
//     }, [currentStatus]);

//     const fetchVehicles = (status) => {
//         const token = localStorage.getItem("access_token");
//         setLoading(true);

//         let endpoint = "";
//         if (userRole === "vendor") {
//             endpoint = "http://localhost:3000/api/vendor/rentalList";
//         } else if (userRole === "admin") {
//             endpoint = "http://localhost:3000/api/admin/rentalList";
//         } else if (userRole === "customer") {
//             endpoint = "http://localhost:3000/api/customer/rental";
//         } else {
//             setLoading(false);
//             toast.error("User role not recognized", {
//                 position: "top-right",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "colored",
//                 transition: Bounce,
//             });
//             return;
//         }

//         axios.post(endpoint,
//             { status: status },
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             }
//         ).then(res => {
//             if (res.status === 200) {
//                 setVehiclesList(res.data);
//                 setLoading(false);
//             }
//         }).catch(err => {
//             console.log(err);
//             setLoading(false);
//             toast.error(`Failed to load ${status.toLowerCase()} vehicles`, {
//                 position: "top-right",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "colored",
//                 transition: Bounce,
//             });
//         });
//     };

//     const handleViewDetails = (vehicleId) => {
//         // This will be handled by your routing logic later
//         console.log("Navigate to vehicle details page for:", vehicleId);
//         navigate(`/MyBookings/${vehicleId}`)
//         // For example: history.push(`/vehicle-details/${vehicleId}`);
//     };

//     const handleStatusChange = (status) => {
//         setCurrentStatus(status);
//     };

//     return (
//         <div className="dashboard p-6 bg-gray-50 font-sans mt-20 container">
//             {/* Status Navigation */}
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
//                 <div className="flex flex-wrap">
//                     {["Pending", "Approved", "In Trip", "Completed", "Rejected", "Cancelled"].map((status) => (
//                         <button
//                             key={status}
//                             onClick={() => handleStatusChange(status)}
//                             className={`flex-1 py-4 px-4 text-center font-medium transition-colors ${
//                                 currentStatus === status
//                                 ? "bg-blue-400 text-white"
//                                 : "hover:bg-blue-100 text-gray-700"
//                             }`}
//                         >
//                             <div className="flex items-center justify-center">
//                                 {status === "Pending" && <Clock size={18} className="mr-2" />}
//                                 {status === "Approved" && <CheckCircle size={18} className="mr-2" />}
//                                 {status === "In Trip" && <Truck size={18} className="mr-2" />}
//                                 {status === "Completed" && <CheckCircle size={18} className="mr-2" />}
//                                 {status === "Rejected" && <XCircle size={18} className="mr-2" />}
//                                 {status === "Cancelled" && <AlertCircle size={18} className="mr-2" />}
//                                 {status}
//                             </div>
//                         </button>
//                     ))}
//                 </div>
//             </div>

//             {/* Vehicles List Section */}
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//                 <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-blue-100 flex justify-between items-center">
//                     <h2 className="text-xl font-bold text-gray-800">{currentStatus} Vehicles</h2>
//                     <span className="text-sm text-gray-600 font-medium">Total: {vehiclesList.length}</span>
//                 </div>

//                 {loading ? (
//                     <div className="p-8 text-center text-gray-500">Loading vehicles...</div>
//                 ) : (
//                     <div className="overflow-x-auto">
//                         <table className="w-full">
//                             <thead className="bg-gradient-to-r from-blue-100 to-blue-200 border-b-2 border-blue-300">
//                                 <tr>
//                                     <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
//                                         Vehicle No
//                                     </th>
//                                     <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
//                                         Model
//                                     </th>
//                                     <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
//                                         Pickup Location
//                                     </th>
//                                     <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
//                                         Status
//                                     </th>
//                                     <th className="p-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
//                                         Actions
//                                     </th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-200">
//                                 {vehiclesList.map((booking) => (
//                                     <tr key={booking._id} className="hover:bg-blue-50 transition-colors">
//                                         <td className="p-4">
//                                             <div className="flex items-center">
//                                                 <div className="p-2 rounded-full mr-3 bg-blue-100">
//                                                     <Car className="text-blue-600" size={20} />
//                                                 </div>
//                                                 <span className="font-semibold text-gray-900">
//                                                     {booking.vehicle.registration_number}
//                                                 </span>
//                                             </div>
//                                         </td>
//                                         <td className="p-4 text-gray-700">
//                                              {booking.vehicle.model}
//                                         </td>
//                                         <td className="p-4 text-gray-700">
//                                             {booking.pickUpLocation || 'Not specified'}
//                                         </td>
//                                         <td className="p-4">
//                                             <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[booking.status]} flex items-center w-fit`}>
//                                                 {statusIcons[booking.status]}
//                                                 {booking.status}
//                                             </span>
//                                         </td>
//                                         <td className="p-4 text-right">
//                                             <button
//                                                 onClick={() => handleViewDetails(booking._id)}
//                                                 className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:opacity-70 flex items-center justify-center ml-auto transition-colors"
//                                             >
//                                                 <Eye size={16} className="mr-2" /> View Details
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}

//                                 {vehiclesList.length === 0 && (
//                                     <tr>
//                                         <td colSpan="5" className="p-8 text-center text-gray-500">
//                                             No {currentStatus.toLowerCase()} vehicles found.
//                                         </td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default VehicleDashboard;

import React, { useState, useEffect } from "react";
import { Clock, CheckCircle, Truck, XCircle, AlertCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function VehicleDashboard() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Function to check if a path is active
  const isActive = (path) => {
    return currentPath.includes(path);
  };

  return (
    <div className="mt-24 w-full bg-white shadow overflow-hidden container">
      <div className="flex w-full">
        <Link to="/MyBookings/pending" className="flex-1">
          <div
            className={`${isActive("/pending") ? "bg-blue-400 text-white border-b-2 border-blue-600" : "bg-white text-gray-700 border-b-2 border-transparent hover:border-blue-400"} py-4 px-6 flex items-center justify-center cursor-pointer hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:text-blue-600 ${isActive("/pending") ? "" : "hover:bg-blue-50"}`}
          >
            <Clock className="mr-2" size={20} />
            <span className="font-medium">Pending</span>
          </div>
        </Link>

        <Link to="/MyBookings/approved" className="flex-1">
          <div
            className={`${isActive("/approved") ? "bg-blue-400 text-white border-b-2 border-blue-600" : "bg-white text-gray-700 border-b-2 border-transparent hover:border-blue-400"} py-4 px-6 flex items-center justify-center cursor-pointer hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:text-blue-600 ${isActive("/approved") ? "" : "hover:bg-blue-50"}`}
          >
            <CheckCircle className="mr-2" size={20} />
            <span className="font-medium">Approved</span>
          </div>
        </Link>

        <Link to="/MyBookings/in-trip" className="flex-1">
          <div
            className={`${isActive("/in-trip") ? "bg-blue-400 text-white border-b-2 border-blue-600" : "bg-white text-gray-700 border-b-2 border-transparent hover:border-blue-400"} py-4 px-6 flex items-center justify-center cursor-pointer hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:text-blue-600 ${isActive("/in-trip") ? "" : "hover:bg-blue-50"}`}
          >
            <Truck className="mr-2" size={20} />
            <span className="font-medium">In Trip</span>
          </div>
        </Link>

        <Link to="/MyBookings/completed" className="flex-1">
          <div
            className={`${isActive("/completed") ? "bg-blue-400 text-white border-b-2 border-blue-600" : "bg-white text-gray-700 border-b-2 border-transparent hover:border-blue-400"} py-4 px-6 flex items-center justify-center cursor-pointer hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:text-blue-600 ${isActive("/completed") ? "" : "hover:bg-blue-50"}`}
          >
            <CheckCircle className="mr-2" size={20} />
            <span className="font-medium">Completed</span>
          </div>
        </Link>

        <Link to="/MyBookings/rejected" className="flex-1">
          <div
            className={`${isActive("/rejected") ? "bg-blue-400 text-white border-b-2 border-blue-600" : "bg-white text-gray-700 border-b-2 border-transparent hover:border-blue-400"} py-4 px-6 flex items-center justify-center cursor-pointer hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:text-blue-600 ${isActive("/rejected") ? "" : "hover:bg-blue-50"}`}
          >
            <XCircle className="mr-2" size={20} />
            <span className="font-medium">Rejected</span>
          </div>
        </Link>

        <Link to="/MyBookings/cancelled" className="flex-1">
          <div
            className={`${isActive("/cancelled") ? "bg-blue-400 text-white border-b-2 border-blue-600" : "bg-white text-gray-700 border-b-2 border-transparent hover:border-blue-400"} py-4 px-6 flex items-center justify-center cursor-pointer hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:text-blue-600 ${isActive("/cancelled") ? "" : "hover:bg-blue-50"}`}
          >
            <AlertCircle className="mr-2" size={20} />
            <span className="font-medium">Cancelled</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

function VehicleDashboard1() {
  return (
    <div className="mt-16 container">
      <VehicleDashboard />
      {/* Content would go here */}
    </div>
  );
}

export { VehicleDashboard1, VehicleDashboard };
