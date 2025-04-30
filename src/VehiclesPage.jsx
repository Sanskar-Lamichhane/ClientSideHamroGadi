// import React, { useState } from 'react';
// import { Truck, Eye, Plus, Car, CheckCircle, XCircle, Filter } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
// import { useEffect } from 'react';
// import axios from 'axios';
// import Pagination from 'rc-pagination';
// import { useSearchParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { toast, Bounce } from 'react-toastify';

// function VehiclesPage() {
//     // Get user role from localStorage
//     const location=useLocation();
//     const navigate=useNavigate();
//     const params = useLocation();
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

//     const [vehicleList, setVehicleList] = useState([])
//     const [paginationData, setPaginationData] = useState({
//         total: 0,
//         page: 1,
//         per_page: 25
//     })
//     const [loading, setLoading] = useState(false)
//     const [error, setError] = useState(null)

//     const [currentSearchParams, setSearchParams] = useSearchParams();
//     const [unusedVehicleList, setUnusedVehicles] = useState([]);
//     const [perPage, setPerPage] = useState(25);

//     // Add states for delete confirmation
//     const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//     const [vehicleToDelete, setVehicleToDelete] = useState(null);

//    const cityList=["Chitwan","Kathmandu","Butwal","Heatuda","Bhaktapur","Birgunj","Biratnagar","Dhangadi","Surkhet"]

//     useEffect(() => {
//         const token = localStorage.getItem("access_token")
//         console.log("token", token)
//         setLoading(true)
//         setError(null)

//         if(userRole === "vendor"){
//             axios.get("http://localhost:3000/api/vendor/vehicles",
//                 {
//                     headers:{
//                         Authorization:`Bearer ${token}`
//                     }
//                 }
//             )
//             .then(res => {
//                 if(res.status === 200){
//                     console.log(res)
//                     setVehicleList(res.data.vehicles)
//                 }
//                 setLoading(false)
//             })
//             .catch(err => {
//                 console.error("Error fetching vendor vehicles:", err)
//                 setError("Failed to load vehicles")
//                 setLoading(false)
//             })
//         }
//         else if(userRole === "admin"){
//             let url = "http://localhost:3000/api/vehicles" + params.search;

//             axios.get(url)
//             .then(res => {
//                 if(res.data.length !== 0){
//                     console.log(res.data[0].data)
//                     console.log(res.data)
//                     setVehicleList(res.data[0].data)
//                     setPaginationData(res.data[0].meta_data)
//                 } else {
//                     // Clear the vehicle list when no data is found
//                     setVehicleList([])
//                     setPaginationData({
//                         total: 0,
//                         page: 1,
//                         per_page: paginationData.per_page
//                     })
//                     console.log("No vehicle is available")
//                 }
//                 setLoading(false)
//             })
//             .catch(err => {
//                 console.error("Error fetching admin vehicles:", err)
//                 setError("Failed to load vehicles")
//                 setLoading(false)
//             })

//             axios.get("http://localhost:3000/api/admin/vehiclesNotRentedYet",
//                 {
//                     headers:{
//                         Authorization:`Bearer ${token}`
//                     }
//                 }
//             )
//             .then(res => {
//                 if(res.status === 200){
//                     setUnusedVehicles(res.data.vehicles)
//                 }
//             })
//             .catch(err => {
//                 console.error("Error fetching unused vehicles:", err)
//             })
//         }
//     }, [location.pathname, params.search])

//     const handlePerPageChange = (e) => {
//         const newPerPage = parseInt(e.target.value);
//         setPerPage(newPerPage);
//         currentSearchParams.set("per_page", newPerPage);
//         currentSearchParams.set("page", 1); // Reset to page 1 when changing per_page
//         setSearchParams(currentSearchParams);
//     };

//     // Function to get current city filter
//     const getCurrentCity = () => {
//         return currentSearchParams.get("city") || "";
//     };

//     // New functions for handling delete confirmation
//     const handleDeleteClick = (vehicle) => {
//         setVehicleToDelete(vehicle);
//         setShowDeleteConfirm(true);
//     };

//     const handleConfirmDelete = () => {
//         const access_token = localStorage.getItem("access_token")
//         axios.delete(`http://localhost:3000/api/admin/deleteVehicle/${vehicleToDelete._id}`,
//             {
//                 headers:{
//                     Authorization:`Bearer ${access_token}`
//                 }
//             }
//         )
//         .then(res=>{
//             if(res.status===200){
//                 toast.success(`Vehicle ${vehicleToDelete.registration_number} deleted sucessfully`, {
//                     position: "top-right",
//                     autoClose: 5000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "colored",
//                     transition: Bounce,
//                   });
//             }
//         })

//         setShowDeleteConfirm(false);
//         setVehicleToDelete(null);
//         // After delete is successful, you would refresh the vehicle list
//     };

//     const handleCancelDelete = () => {
//         setShowDeleteConfirm(false);
//         setVehicleToDelete(null);
//     };

//     return (
//         <div className="vehicles-page p-6 bg-gray-50">
//             {/* Header with Add Vehicle Button (for Vendor only) */}
//             <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-2xl font-bold text-gray-800">Vehicles</h1>
//                 {userRole === 'vendor' && (
//                     <Link to="/CreateVehicle">
//                         <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center transition-colors">
//                             <Plus size={16} className="mr-2" /> Add Vehicle
//                         </button>
//                     </Link>
//                 )}
//             </div>

//             {/* Vehicles Table */}
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
//                 <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-blue-100">
//                     <div className="flex flex-wrap justify-between items-center">
//                         <div className="flex items-center mb-2 sm:mb-0">
//                             <h2 className="text-xl font-bold text-gray-800">My Vehicles</h2>

//                             {/* Per Page Dropdown for Admin Only */}
//                             {userRole === 'admin' && (
//                                 <div className="ml-8 flex items-center">
//                                     <label htmlFor="perPage" className="mr-2 text-sm text-gray-600 font-medium">Per Page:</label>
//                                     <select
//                                         id="perPage"
//                                         value={paginationData.per_page}
//                                         onChange={handlePerPageChange}
//                                         className="border border-gray-300 rounded px-2 py-1 text-sm bg-white"
//                                     >
//                                         <option value="10">10</option>
//                                         <option value="25">25</option>
//                                         <option value="50">50</option>
//                                         <option value="100">100</option>
//                                     </select>
//                                 </div>
//                             )}
//                         </div>

//                         <div className="flex items-center">
//                             {/* City Filter - Admin Only */}
//                             {userRole === 'admin' && (
//                                 <div className="mr-4 flex items-center">
//                                     <div className="flex items-center bg-white rounded-lg border border-gray-300 px-3 py-1">
//                                         <Filter size={16} className="text-gray-400 mr-2" />
//                                         <select
//                                             className="bg-transparent border-none text-sm focus:outline-none"
//                                             value={getCurrentCity()}
//                                             onChange={(e) => {
//                                                 e.preventDefault();
//                                                 currentSearchParams.set("city", e.target.value)
//                                                 setSearchParams(currentSearchParams)
//                                             }}
//                                         >

//                                             <option value="">All Cities</option>
//                                             {cityList.map(city => (
//                                                 <option key={city} value={city}>
//                                                     {city}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                 </div>
//                             )}
//                             <span className="text-sm text-gray-600 font-medium">Total Vehicles: {vehicleList.length}</span>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="overflow-x-auto">
//                     {loading ? (
//                         <div className="p-8 text-center">
//                             <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//                             <p className="mt-2 text-gray-600">Loading vehicles...</p>
//                         </div>
//                     ) : error ? (
//                         <div className="p-8 text-center">
//                             <div className="text-red-500 text-lg mb-2">⚠️ {error}</div>
//                             <button
//                                 onClick={() => window.location.reload()}
//                                 className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//                             >
//                                 Retry
//                             </button>
//                         </div>
//                     ) : vehicleList.length === 0 ? (
//                         <div className="p-8 text-center">
//                             <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
//                                 <Car size={32} className="text-gray-400" />
//                             </div>
//                             <h3 className="text-lg font-semibold text-gray-800 mb-2">No Vehicles Found</h3>
//                             <p className="text-gray-600 mb-4">
//                                 {getCurrentCity()
//                                     ? `No vehicles are available in ${getCurrentCity()}.`
//                                     : "No vehicles are available."}
//                             </p>
//                             {getCurrentCity() && (
//                                 <button
//                                     onClick={() => {
//                                         currentSearchParams.delete("city");
//                                         setSearchParams(currentSearchParams);
//                                     }}
//                                     className="text-blue-600 hover:text-blue-800 font-medium"
//                                 >
//                                     Clear filter and show all vehicles
//                                 </button>
//                             )}
//                         </div>
//                     ) : (
//                         <table className="w-full">
//                             <colgroup>
//                                 <col style={{ width: "30%" }} /> {/* Vehicle No - wider column */}
//                                 <col style={{ width: "20%" }} /> {/* Model */}
//                                 <col style={{ width: "15%" }} /> {/* Fuel Type */}
//                                 <col style={{ width: "15%" }} /> {/* Color */}
//                                 <col style={{ width: "10%" }} /> {/* Status */}
//                                 <col style={{ width: "10%" }} /> {/* Actions */}
//                             </colgroup>
//                             <thead className="bg-gradient-to-r from-blue-100 to-blue-200 border-b-2 border-blue-300">
//                                 <tr>
//                                     <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
//                                         Vehicle No
//                                     </th>
//                                     <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
//                                         Model
//                                     </th>
//                                     <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
//                                         Fuel Type
//                                     </th>
//                                     <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
//                                         Color
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
//                                 {vehicleList.map((vehicle) => (
//                                     <tr key={vehicle._id} className="hover:bg-blue-50 transition-colors">
//                                         <td className="p-4 truncate">
//                                             <div className="flex items-center">
//                                                 <div className="bg-blue-100 p-2 rounded-full mr-3 flex-shrink-0">
//                                                     <Truck className="text-blue-600" size={20} />
//                                                 </div>
//                                                 <span className="font-semibold text-gray-900 truncate">{vehicle.registration_number}</span>
//                                             </div>
//                                         </td>
//                                         <td className="p-4 text-gray-700 truncate">{vehicle.model}</td>
//                                         <td className="p-4 text-gray-700 truncate">{vehicle.fuel_type}</td>
//                                         <td className="p-4 text-gray-700 truncate">{vehicle.color}</td>
//                                         <td className="p-4">
//                                             <span className={`
//                                                 px-3 py-1 rounded-full text-xs font-medium
//                                                 ${vehicle.service === 'on'
//                                                     ? 'bg-green-100 text-green-800'
//                                                     : 'bg-red-100 text-red-800'}
//                                             `}>
//                                                 {vehicle.service === 'on' ? 'Active' : 'Inactive'}
//                                             </span>
//                                         </td>
//                                         <td className="p-4 text-right">
//                                             <button className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 flex items-center justify-center ml-auto transition-colors">
//                                                 <Eye size={14} className="mr-1" /> View
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     )}
//                 </div>

//                 {/* Pagination for Admin only - Only show when there are vehicles */}
//                 {userRole === 'admin' && vehicleList.length > 0 && (
//                     <div className="flex justify-center p-6 border-t border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100">
//                         <Pagination
//                             className="pagination-data flex items-center"
//                             current={paginationData.page}
//                             total={paginationData.total}
//                             pageSize={paginationData.per_page}
//                             onChange={(pageNumber) => {
//                                 console.log(pageNumber)
//                                 currentSearchParams.set("page", pageNumber)
//                                 setSearchParams(currentSearchParams)
//                             }}
//                             showTotal={(total, range) =>
//                                 <div className="h-10 flex items-center justify-center bg-white px-4 rounded-lg shadow-sm mr-3 border border-blue-200">
//                                     <span className="text-sm font-medium text-gray-600">
//                                         {range[0]} - {range[1]} of {total} items
//                                     </span>
//                                 </div>
//                             }
//                             showLessItems
//                             itemRender={(page, type, element) => {
//                                 if (type === 'page') {
//                                     return (
//                                         <button
//                                             className={`mx-1 w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
//                                                 page === paginationData.page
//                                                     ? 'bg-blue-600 text-white shadow-md border border-blue-600'
//                                                     : 'bg-white text-gray-700 border border-blue-200 hover:bg-blue-50'
//                                             }`}
//                                         >
//                                             {page}
//                                         </button>
//                                     );
//                                 }
//                                 return element;
//                             }}
//                             prevIcon={
//                                 <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-blue-200 mr-1 hover:bg-blue-50 bg-white shadow-sm">
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                                     </svg>
//                                 </button>
//                             }
//                             nextIcon={
//                                 <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-blue-200 ml-1 hover:bg-blue-50 bg-white shadow-sm">
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                                     </svg>
//                                 </button>
//                             }
//                             jumpPrevIcon={
//                                 <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-blue-200 mx-1 hover:bg-blue-50 bg-white shadow-sm">
//                                     <span className="text-blue-600">•••</span>
//                                 </button>
//                             }
//                             jumpNextIcon={
//                                 <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-blue-200 mx-1 hover:bg-blue-50 bg-white shadow-sm">
//                                     <span className="text-blue-600">•••</span>
//                                 </button>
//                             }
//                         />
//                     </div>
//                 )}
//             </div>

//             {/* Unused Vehicles Section (Only for Admin) */}
//             {userRole === 'admin' && (
//                 <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//                     <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-blue-100 flex justify-between items-center">
//                         <h2 className="text-xl font-bold text-gray-800">Unused Vehicles</h2>
//                         <span className="text-sm text-gray-600 font-medium">Total Unused: {unusedVehicleList.length}</span>
//                     </div>
//                     <div className="overflow-x-auto">
//                         {unusedVehicleList.length === 0 ? (
//                             <div className="p-8 text-center">
//                                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
//                                     <Car size={32} className="text-gray-400" />
//                                 </div>
//                                 <h3 className="text-lg font-semibold text-gray-800 mb-2">No Unused Vehicles</h3>
//                                 <p className="text-gray-600">All vehicles are currently in use.</p>
//                             </div>
//                         ) : (
//                             <table className="w-full">
//                                 <colgroup>
//                                     <col style={{ width: "30%" }} /> {/* Vehicle No - wider column */}
//                                     <col style={{ width: "20%" }} /> {/* Model */}
//                                     <col style={{ width: "20%" }} /> {/* Fuel Type */}
//                                     <col style={{ width: "15%" }} /> {/* Color */}
//                                     <col style={{ width: "15%" }} /> {/* Actions */}
//                                 </colgroup>
//                                 <thead className="bg-gradient-to-r from-blue-100 to-blue-200 border-b-2 border-blue-300">
//                                     <tr>
//                                         <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
//                                             Vehicle No
//                                         </th>
//                                         <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
//                                             Model
//                                         </th>
//                                         <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
//                                             Fuel Type
//                                         </th>
//                                         <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
//                                             Color
//                                         </th>
//                                         <th className="p-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
//                                             Actions
//                                         </th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="divide-y divide-gray-200">
//                                     {unusedVehicleList.map((vehicle) => (
//                                         <tr key={vehicle.id} className="hover:bg-blue-50 transition-colors">
//                                             <td className="p-4 truncate">
//                                                 <div className="flex items-center">
//                                                     <div className="bg-blue-100 p-2 rounded-full mr-3 flex-shrink-0">
//                                                         <Car className="text-blue-600" size={20} />
//                                                     </div>
//                                                     <span className="font-semibold text-gray-900 truncate">{vehicle.registration_number}</span>
//                                                 </div>
//                                             </td>
//                                             <td className="p-4 text-gray-700 truncate">{vehicle.model}</td>
//                                             <td className="p-4 text-gray-700 truncate">{vehicle.fuel_type}</td>
//                                             <td className="p-4 text-gray-700 truncate">{vehicle.color}</td>
//                                             <td className="p-4 text-right">
//                                                 <button
//                                                     className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 flex items-center justify-center ml-auto transition-colors"
//                                                     onClick={() => handleDeleteClick(vehicle)}
//                                                 >
//                                                     <XCircle size={14} className="mr-1" /> Delete
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         )}
//                     </div>
//                 </div>
//             )}

//             {/* Delete Confirmation Modal */}
//             {showDeleteConfirm && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
//                         <h3 className="text-lg font-bold text-gray-800 mb-4">Confirm Delete</h3>
//                         <p className="text-gray-600 mb-6">
//                             Do you really want to delete vehicle {vehicleToDelete?.registration_number}?
//                         </p>
//                         <div className="flex justify-end space-x-3">
//                             <button
//                                 className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
//                                 onClick={handleCancelDelete}
//                             >
//                                 No
//                             </button>
//                             <button
//                                 className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//                                 onClick={handleConfirmDelete}
//                             >
//                                 Yes
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default VehiclesPage;

import React, { useState } from "react";
import {
  Truck,
  Eye,
  Plus,
  Car,
  CheckCircle,
  XCircle,
  Filter,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Pagination from "rc-pagination";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";

function VehiclesPage() {
  // Get user role from localStorage
  const location = useLocation();
  const navigate = useNavigate();
  const params = useLocation();
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

  const [vehicleList, setVehicleList] = useState([]);
  const [paginationData, setPaginationData] = useState({
    total: 0,
    page: 1,
    per_page: 25,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentSearchParams, setSearchParams] = useSearchParams();
  const [unusedVehicleList, setUnusedVehicles] = useState([]);
  const [perPage, setPerPage] = useState(25);

  // Add states for delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);

  const cityList = [
    "Chitwan",
    "Kathmandu",
    "Butwal",
    "Heatuda",
    "Bhaktapur",
    "Birgunj",
    "Biratnagar",
    "Dhangadi",
    "Surkhet",
  ];

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    console.log("token", token);
    setLoading(true);
    setError(null);

    if (userRole === "vendor") {
      axios
        .get("http://localhost:3000/api/vendor/vehicles", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res);
            setVehicleList(res.data.vehicles);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching vendor vehicles:", err);
          setError("Failed to load vehicles");
          setLoading(false);
        });
    } else if (userRole === "admin") {
      let url = "http://localhost:3000/api/vehicles" + params.search;

      axios
        .get(url)
        .then((res) => {
          if (res.data.length !== 0) {
            console.log(res.data[0].data);
            console.log(res.data);
            setVehicleList(res.data[0].data);
            setPaginationData(res.data[0].meta_data);
          } else {
            // Clear the vehicle list when no data is found
            setVehicleList([]);
            setPaginationData({
              total: 0,
              page: 1,
              per_page: paginationData.per_page,
            });
            console.log("No vehicle is available");
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching admin vehicles:", err);
          setError("Failed to load vehicles");
          setLoading(false);
        });

      axios
        .get("http://localhost:3000/api/admin/vehiclesNotRentedYet", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setUnusedVehicles(res.data.vehicles);
          }
        })
        .catch((err) => {
          console.error("Error fetching unused vehicles:", err);
        });
    }
  }, [location.pathname, params.search]);

  const handlePerPageChange = (e) => {
    const newPerPage = parseInt(e.target.value);
    setPerPage(newPerPage);
    currentSearchParams.set("per_page", newPerPage);
    currentSearchParams.set("page", 1); // Reset to page 1 when changing per_page
    setSearchParams(currentSearchParams);
  };

  // Function to get current city filter
  const getCurrentCity = () => {
    return currentSearchParams.get("city") || "";
  };

  // New functions for handling delete confirmation
  const handleDeleteClick = (vehicle) => {
    setVehicleToDelete(vehicle);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    const access_token = localStorage.getItem("access_token");
    axios
      .delete(
        `http://localhost:3000/api/admin/deleteVehicle/${vehicleToDelete._id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success(
            `Vehicle ${vehicleToDelete.registration_number} deleted sucessfully`,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
            },
          );
        }
      });

    setShowDeleteConfirm(false);
    setVehicleToDelete(null);
    // After delete is successful, you would refresh the vehicle list
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setVehicleToDelete(null);
  };

  // Helper function to determine if pagination should be displayed
  const shouldShowPagination = () => {
    return paginationData.total > paginationData.per_page;
  };

  return (
    <div className="vehicles-page p-6 bg-gray-50">
      {/* Header with Add Vehicle Button (for Vendor only) */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Vehicles</h1>
        {userRole === "vendor" && (
          <Link to="/CreateVehicle">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center transition-colors">
              <Plus size={16} className="mr-2" /> Add Vehicle
            </button>
          </Link>
        )}
      </div>

      {/* Vehicles Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center mb-2 sm:mb-0">
              <h2 className="text-xl font-bold text-gray-800">My Vehicles</h2>

              {/* Per Page Dropdown for Admin Only */}
              {userRole === "admin" && (
                <div className="ml-8 flex items-center">
                  <label
                    htmlFor="perPage"
                    className="mr-2 text-sm text-gray-600 font-medium"
                  >
                    Per Page:
                  </label>
                  <select
                    id="perPage"
                    value={paginationData.per_page}
                    onChange={handlePerPageChange}
                    className="border border-gray-300 rounded px-2 py-1 text-sm bg-white"
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>
              )}
            </div>

            <div className="flex items-center">
              {/* City Filter - Admin Only */}
              {userRole === "admin" && (
                <div className="mr-4 flex items-center">
                  <div className="flex items-center bg-white rounded-lg border border-gray-300 px-3 py-1">
                    <Filter size={16} className="text-gray-400 mr-2" />
                    <select
                      className="bg-transparent border-none text-sm focus:outline-none"
                      value={getCurrentCity()}
                      onChange={(e) => {
                        e.preventDefault();
                        currentSearchParams.set("city", e.target.value);
                        setSearchParams(currentSearchParams);
                      }}
                    >
                      <option value="">All Cities</option>
                      {cityList.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
              <span className="text-sm text-gray-600 font-medium">
                Total Vehicles: {vehicleList.length}
              </span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-2 text-gray-600">Loading vehicles...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <div className="text-red-500 text-lg mb-2">⚠️ {error}</div>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Retry
              </button>
            </div>
          ) : vehicleList.length === 0 ? (
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Car size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                No Vehicles Found
              </h3>
              <p className="text-gray-600 mb-4">
                {getCurrentCity()
                  ? `No vehicles are available in ${getCurrentCity()}.`
                  : "No vehicles are available."}
              </p>
              {getCurrentCity() && (
                <button
                  onClick={() => {
                    currentSearchParams.delete("city");
                    setSearchParams(currentSearchParams);
                  }}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear filter and show all vehicles
                </button>
              )}
            </div>
          ) : (
            <table className="w-full">
              <colgroup>
                <col style={{ width: "30%" }} />{" "}
                {/* Vehicle No - wider column */}
                <col style={{ width: "20%" }} /> {/* Model */}
                <col style={{ width: "15%" }} /> {/* Fuel Type */}
                <col style={{ width: "15%" }} /> {/* Color */}
                <col style={{ width: "10%" }} /> {/* Status */}
                <col style={{ width: "10%" }} /> {/* Actions */}
              </colgroup>
              <thead className="bg-gradient-to-r from-blue-100 to-blue-200 border-b-2 border-blue-300">
                <tr>
                  <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Vehicle No
                  </th>
                  <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Model
                  </th>
                  <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Fuel Type
                  </th>
                  <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Color
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
                {vehicleList.map((vehicle) => (
                  <tr
                    key={vehicle._id}
                    className="hover:bg-blue-50 transition-colors"
                  >
                    <td className="p-4 truncate">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-full mr-3 flex-shrink-0">
                          <Truck className="text-blue-600" size={20} />
                        </div>
                        <span className="font-semibold text-gray-900 truncate">
                          {vehicle.registration_number}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-700 truncate">
                      {vehicle.model}
                    </td>
                    <td className="p-4 text-gray-700 truncate">
                      {vehicle.fuel_type}
                    </td>
                    <td className="p-4 text-gray-700 truncate">
                      {vehicle.color}
                    </td>
                    <td className="p-4">
                      <span
                        className={`
                                                px-3 py-1 rounded-full text-xs font-medium
                                                ${
                                                  vehicle.service === "on"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                                }
                                            `}
                      >
                        {vehicle.service === "on" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        to={`/vehicleEditPage/${vehicle._id}`}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 flex items-center justify-center ml-auto transition-colors"
                      >
                        <Eye size={14} className="mr-1" /> View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination for Admin only - Only show when there are vehicles AND total > per_page */}
        {userRole === "admin" &&
          vehicleList.length > 0 &&
          shouldShowPagination() && (
            <div className="flex justify-center p-6 border-t border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100">
              <Pagination
                className="pagination-data flex items-center"
                current={paginationData.page}
                total={paginationData.total}
                pageSize={paginationData.per_page}
                onChange={(pageNumber) => {
                  console.log(pageNumber);
                  currentSearchParams.set("page", pageNumber);
                  setSearchParams(currentSearchParams);
                }}
                showTotal={(total, range) => (
                  <div className="h-10 flex items-center justify-center bg-white px-4 rounded-lg shadow-sm mr-3 border border-blue-200">
                    <span className="text-sm font-medium text-gray-600">
                      {range[0]} - {range[1]} of {total} items
                    </span>
                  </div>
                )}
                showLessItems
                itemRender={(page, type, element) => {
                  if (type === "page") {
                    return (
                      <button
                        className={`mx-1 w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                          page === paginationData.page
                            ? "bg-blue-600 text-white shadow-md border border-blue-600"
                            : "bg-white text-gray-700 border border-blue-200 hover:bg-blue-50"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  }
                  return element;
                }}
                prevIcon={
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-blue-200 mr-1 hover:bg-blue-50 bg-white shadow-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                }
                nextIcon={
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-blue-200 ml-1 hover:bg-blue-50 bg-white shadow-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600"
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
                }
                jumpPrevIcon={
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-blue-200 mx-1 hover:bg-blue-50 bg-white shadow-sm">
                    <span className="text-blue-600">•••</span>
                  </button>
                }
                jumpNextIcon={
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-blue-200 mx-1 hover:bg-blue-50 bg-white shadow-sm">
                    <span className="text-blue-600">•••</span>
                  </button>
                }
              />
            </div>
          )}
      </div>

      {/* Unused Vehicles Section (Only for Admin) */}
      {userRole === "admin" && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-blue-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Unused Vehicles</h2>
            <span className="text-sm text-gray-600 font-medium">
              Total Unused: {unusedVehicleList.length}
            </span>
          </div>
          <div className="overflow-x-auto">
            {unusedVehicleList.length === 0 ? (
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <Car size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  No Unused Vehicles
                </h3>
                <p className="text-gray-600">
                  All vehicles are currently in use.
                </p>
              </div>
            ) : (
              <table className="w-full">
                <colgroup>
                  <col style={{ width: "30%" }} />{" "}
                  {/* Vehicle No - wider column */}
                  <col style={{ width: "20%" }} /> {/* Model */}
                  <col style={{ width: "20%" }} /> {/* Fuel Type */}
                  <col style={{ width: "15%" }} /> {/* Color */}
                  <col style={{ width: "15%" }} /> {/* Actions */}
                </colgroup>
                <thead className="bg-gradient-to-r from-blue-100 to-blue-200 border-b-2 border-blue-300">
                  <tr>
                    <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Vehicle No
                    </th>
                    <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Model
                    </th>
                    <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Fuel Type
                    </th>
                    <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Color
                    </th>
                    <th className="p-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {unusedVehicleList.map((vehicle) => (
                    <tr
                      key={vehicle.id}
                      className="hover:bg-blue-50 transition-colors"
                    >
                      <td className="p-4 truncate">
                        <div className="flex items-center">
                          <div className="bg-blue-100 p-2 rounded-full mr-3 flex-shrink-0">
                            <Car className="text-blue-600" size={20} />
                          </div>
                          <span className="font-semibold text-gray-900 truncate">
                            {vehicle.registration_number}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-700 truncate">
                        {vehicle.model}
                      </td>
                      <td className="p-4 text-gray-700 truncate">
                        {vehicle.fuel_type}
                      </td>
                      <td className="p-4 text-gray-700 truncate">
                        {vehicle.color}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 flex items-center justify-center ml-auto transition-colors"
                          onClick={() => handleDeleteClick(vehicle)}
                        >
                          <XCircle size={14} className="mr-1" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-600 mb-6">
              Do you really want to delete vehicle{" "}
              {vehicleToDelete?.registration_number}?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                onClick={handleCancelDelete}
              >
                No
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                onClick={handleConfirmDelete}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VehiclesPage;
