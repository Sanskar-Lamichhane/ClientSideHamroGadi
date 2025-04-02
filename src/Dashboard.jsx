// import React from 'react';
// import { Eye, Truck, Users, CheckCircle, MapPin, Calendar, Clock } from 'lucide-react';

// function Dashboard() {
//     // Sample pending vehicles data
//     const pendingVehicles = [
//         {
//             id: 1,
//             vehicleNo: 'RJ14 AB 1234',
//             pickupLocation: 'Jaipur Airport',
//             pickupDate: '2024-03-28',
//             pickupTime: '10:30 AM'
//         },
//         {
//             id: 2,
//             vehicleNo: 'DL09 CD 5678',
//             pickupLocation: 'Indira Gandhi Terminal',
//             pickupDate: '2024-03-29',
//             pickupTime: '02:45 PM'
//         },
//         {
//             id: 3,
//             vehicleNo: 'MH12 EF 9012',
//             pickupLocation: 'Mumbai Central Station',
//             pickupDate: '2024-03-30',
//             pickupTime: '09:15 AM'
//         }
//     ];

//     return (
//         <div className="dashboard p-6 bg-gray-50 font-sans">
//             {/* Summary Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//                 <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 flex items-center">
//                     <div className="bg-blue-100 p-3 rounded-full mr-4">
//                         <Truck className="text-blue-600" size={30} />
//                     </div>
//                     <div>
//                         <h2 className="text-lg font-semibold text-gray-700">Total Trips</h2>
//                         <p className="text-2xl font-bold text-blue-600">1,234</p>
//                     </div>
//                 </div>
//                 <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-sky-500 flex items-center">
//                     <div className="bg-sky-100 p-3 rounded-full mr-4">
//                         <CheckCircle className="text-sky-600" size={30} />
//                     </div>
//                     <div>
//                         <h2 className="text-lg font-semibold text-gray-700">Completed</h2>
//                         <p className="text-2xl font-bold text-sky-600">876</p>
//                     </div>
//                 </div>
//                 <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-700 flex items-center">
//                     <div className="bg-blue-100 p-3 rounded-full mr-4">
//                         <Users className="text-blue-700" size={30} />
//                     </div>
//                     <div>
//                         <h2 className="text-lg font-semibold text-gray-700">Customers</h2>
//                         <p className="text-2xl font-bold text-blue-700">5,621</p>
//                     </div>
//                 </div>
//                 <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500 flex items-center">
//                     <div className="bg-indigo-100 p-3 rounded-full mr-4">
//                         <Users className="text-indigo-600" size={30} />
//                     </div>
//                     <div>
//                         <h2 className="text-lg font-semibold text-gray-700">Vendors</h2>
//                         <p className="text-2xl font-bold text-indigo-600">342</p>
//                     </div>
//                 </div>
//             </div>

//             {/* Pending Vehicles Section */}
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//                 <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-blue-100 flex justify-between items-center">
//                     <h2 className="text-xl font-bold text-gray-800">Pending Vehicles</h2>
//                     <span className="text-sm text-gray-600 font-medium">Total Pending: {pendingVehicles.length}</span>
//                 </div>
//                 <div className="overflow-x-auto">
//                     <table className="w-full">
//                         <thead className="bg-gradient-to-r from-blue-100 to-blue-200 border-b-2 border-blue-300">
//                             <tr>
//                                 <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
//                                     Vehicle No
//                                 </th>
//                                 <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
//                                     Pickup Location
//                                 </th>
//                                 <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
//                                     Pickup Date
//                                 </th>
//                                 <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
//                                     Pickup Time
//                                 </th>
//                                 <th className="p-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
//                                     Actions
//                                 </th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-200">
//                             {pendingVehicles.map((vehicle) => (
//                                 <tr key={vehicle.id} className="hover:bg-blue-50 transition-colors">
//                                     <td className="p-4">
//                                         <div className="flex items-center">
//                                             <div className="bg-blue-100 p-2 rounded-full mr-3">
//                                                 <Truck className="text-blue-600" size={20} />
//                                             </div>
//                                             <span className="font-semibold text-gray-900">{vehicle.vehicleNo}</span>
//                                         </div>
//                                     </td>
//                                     <td className="p-4">
//                                         <div className="flex items-center text-gray-700">
//                                             <MapPin className="mr-2 text-blue-500" size={16} />
//                                             {vehicle.pickupLocation}
//                                         </div>
//                                     </td>
//                                     <td className="p-4">
//                                         <div className="flex items-center text-gray-700">
//                                             <Calendar className="mr-2 text-blue-500" size={16} />
//                                             {vehicle.pickupDate}
//                                         </div>
//                                     </td>
//                                     <td className="p-4">
//                                         <div className="flex items-center text-gray-700">
//                                             <Clock className="mr-2 text-blue-500" size={16} />
//                                             {vehicle.pickupTime}
//                                         </div>
//                                     </td>
//                                     <td className="p-4 text-right">
//                                         <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center ml-auto transition-colors">
//                                             <Eye size={16} className="mr-2" /> View Details
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Dashboard;



import React, { useState, useEffect } from 'react';
import { Car, Eye, AlertCircle, Truck, CheckCircle, Users } from 'lucide-react';
import axios from 'axios';
import { toast, Bounce } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Dashboard() {
    const [vehiclesList, setVehiclesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate=useNavigate()
    const pathname=useLocation();

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
        fetchPendingVehicles();
    },[]);

    const fetchPendingVehicles = () => {
        const token = localStorage.getItem("access_token");
        setLoading(true);
        if (userRole === "vendor"){
        axios.post("http://localhost:3000/api/vendor/rentalList",
            {
                status:"Pending"
            },
             {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (res.status === 200) {
                setVehiclesList(res.data);
                setLoading(false);
            }
        }).catch(err => {
            console.log(err)
            setLoading(false);
            toast.error("Failed to load pending vehicles", {
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
    else if(userRole==="admin"){
        axios.post("http://localhost:3000/api/admin/rentalList",
            {
                status:"Pending"
            },
             {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (res.status === 200) {
                setVehiclesList(res.data);
                setLoading(false);
            }
        }).catch(err => {
            console.log(err)
           setLoading(false);
            toast.error("Failed to load hello vehicles", {
                position: "top-right",
                autoClose: 2000,
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
    else if(userRole === "customer"){
        axios.post("http://localhost:3000/api/customer/rental",
            {
                status:"Pending"
            },
             {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (res.status === 200) {
                setVehiclesList(res.data);
                setLoading(false);
            }
        }).catch(err => {
            console.log(err)
            setLoading(false);
            toast.error("Failed to load pending vehicles", {
                position: "top-right",
                autoClose: 2000,
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

    const handleViewDetails = (vehicleId) => {
        // Remove the console.log and directly navigate
        navigate(`/singleRental/${vehicleId}`, { state: { id: vehicleId } });
    };

    return (
        <div className="dashboard p-6 bg-gray-50 font-sans">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <Truck className="text-blue-600" size={30} />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700">Total Trips</h2>
                        <p className="text-2xl font-bold text-blue-600">1,234</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-sky-500 flex items-center">
                    <div className="bg-sky-100 p-3 rounded-full mr-4">
                        <CheckCircle className="text-sky-600" size={30} />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700">Completed</h2>
                        <p className="text-2xl font-bold text-sky-600">876</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-700 flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <Users className="text-blue-700" size={30} />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700">Customers</h2>
                        <p className="text-2xl font-bold text-blue-700">5,621</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500 flex items-center">
                    <div className="bg-indigo-100 p-3 rounded-full mr-4">
                        <Users className="text-indigo-600" size={30} />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700">Vendors</h2>
                        <p className="text-2xl font-bold text-indigo-600">342</p>
                    </div>
                </div>
            </div>

            {/* Pending Vehicles Section */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-blue-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">Pending Vehicles</h2>
                    <span className="text-sm text-gray-600 font-medium">Total Pending: {vehiclesList.length}</span>
                </div>
                
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading pending vehicles...</div>
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
                                    <tr key={booking._id} className="hover:bg-blue-50 transition-colors">
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
                                            {booking.vehicle.make?.brandName || ''} {booking.vehicle.model}
                                        </td>
                                        <td className="p-4 text-gray-700">
                                            {booking.pickUpLocation || 'Not specified'}
                                        </td>
                                        <td className="p-4">
                                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 flex items-center w-fit">
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
                                            No pending vehicles found.
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

export default Dashboard;