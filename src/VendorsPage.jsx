// import React, { useState, useEffect } from 'react';
// import { Users, Lock, Unlock, Plus } from 'lucide-react';
// import axios from 'axios';
// import { toast, Bounce } from 'react-toastify';

// function VendorDashboard() {
//     const [vendorList, setVendorList] = useState([]);
//     const [confirmationModal, setConfirmationModal] = useState({
//         show: false,
//         vendor: null,
//         action: ''
//     });
//     const [createVendorModal, setCreateVendorModal] = useState(false);

//     // Form state for new vendor
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [phoneNumber, setPhoneNumber] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");

//     // Form validation errors
//     const [phoneError, setPhoneError] = useState("");
//     const [passwordError, setPasswordError] = useState("");
//     const [confirmPasswordError, setConfirmPasswordError] = useState("");
//     const [isLoading, setIsLoading] = useState(false);

//     const token = localStorage.getItem("access_token");

//     useEffect(() => {
//         fetchVendorList();
//     }, []);

//     const fetchVendorList = () => {
//         axios.get("http://localhost:3000/api/admin/vendorList", {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         }).then(res => {
//             if (res.status === 200) {
//                 setVendorList(res.data.vendors);
//             }
//         }).catch(err => {
//             // Error handling can be added here
//             toast.error("Failed to fetch vendor list", {
//                 position: "top-right",
//                 autoClose: 5000,
//                 theme: "colored",
//                 transition: Bounce,
//             });
//         });
//     };

//     const openConfirmationModal = (vendor, action) => {
//         setConfirmationModal({
//             show: true,
//             vendor: vendor,
//             action: action
//         });
//     };

//     const closeConfirmationModal = () => {
//         setConfirmationModal({
//             show: false,
//             vendor: null,
//             action: ''
//         });
//     };

//     const openCreateVendorModal = () => {
//         // Reset form state
//         setName("");
//         setEmail("");
//         setPhoneNumber("");
//         setPassword("");
//         setConfirmPassword("");
//         setPhoneError("");
//         setPasswordError("");
//         setConfirmPasswordError("");

//         setCreateVendorModal(true);
//     };

//     const closeCreateVendorModal = () => {
//         setCreateVendorModal(false);
//     };

//     const handleAccountAction = () => {
//         axios.put(`http://localhost:3000/api/admin/user/${confirmationModal.vendor._id}/status`,
//             {},
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             }
//         )
//         .then(res => {
//             if (res.status === 200) {
//                 closeConfirmationModal();
//                 fetchVendorList(); // Refresh the vendor list
//                 toast.success(res.data.message, {
//                     position: "top-right",
//                     autoClose: 5000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "colored",
//                     transition: Bounce,
//                 });
//             }
//         })
//         .catch(err => {
//             toast.error("Failed to update vendor status", {
//                 position: "top-right",
//                 autoClose: 5000,
//                 theme: "colored",
//                 transition: Bounce,
//             });
//         });
//     };

//     // Form Validation Functions
//     const handlePhoneChange = (e) => {
//         let value = e.target.value.replace(/\D/g, "");
//         if (value.length > 0 && value[0] !== "9") {
//             value = "9" + value.substring(value.length > 1 ? 1 : 0);
//         }

//         if (value.length <= 10) {
//             setPhoneNumber(value);
//         }

//         if (value.length > 0 && value.length !== 10) {
//             setPhoneError("Phone number must be 10 digits");
//         } else if (value.length > 0 && value[0] !== "9") {
//             setPhoneError("Phone number must start with 9");
//         } else {
//             setPhoneError("");
//         }
//     };

//     const handlePasswordChange = (e) => {
//         const value = e.target.value;
//         setPassword(value);

//         const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-={}|;:,.<>?~`]+$/;

//         if (value.length === 0) {
//             setPasswordError("");
//         } else if (value.length < 6) {
//             setPasswordError("Password must be at least 6 characters long");
//         } else if (!passwordRegex.test(value)) {
//             setPasswordError("Password contains invalid characters");
//         } else {
//             setPasswordError("");
//         }

//         if (confirmPassword && value !== confirmPassword) {
//             setConfirmPasswordError("Passwords do not match");
//         } else if (confirmPassword) {
//             setConfirmPasswordError("");
//         }
//     };

//     const handleConfirmPasswordChange = (e) => {
//         const value = e.target.value;
//         setConfirmPassword(value);

//         if (value !== password) {
//             setConfirmPasswordError("Passwords do not match");
//         } else {
//             setConfirmPasswordError("");
//         }
//     };

//     const handleCreateVendor = (e) => {
//         e.preventDefault();

//         if (
//             !phoneError &&
//             !passwordError &&
//             !confirmPasswordError &&
//             password === confirmPassword &&
//             password.length >= 6 &&
//             name.trim() !== "" &&
//             email.trim() !== ""
//         ) {
//             setIsLoading(true);

//             const phoneWithCountryCode = `+977${phoneNumber}`;

//             axios.post("http://localhost:3000/api/vendorRegistration",
//                 {
//                     name: name,
//                     email: email,
//                     password: password,
//                     phoneNumber: phoneWithCountryCode,
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 }
//             )
//             .then(response => {
//                 setIsLoading(false);
//                 closeCreateVendorModal();
//                 fetchVendorList(); // Refresh the vendor list

//                 toast.success("Vendor registered successfully", {
//                     position: "top-right",
//                     autoClose: 5000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "colored",
//                     transition: Bounce,
//                 });
//             })
//             .catch(error => {
//                 setIsLoading(false);
//                 if (error.response && error.response.status === 400) {
//                     error.response.data.errors.forEach((err) => {
//                         toast.error(err.message, {
//                             position: "top-right",
//                             autoClose: 5000,
//                             hideProgressBar: false,
//                             closeOnClick: true,
//                             pauseOnHover: true,
//                             draggable: true,
//                             progress: undefined,
//                             theme: "colored",
//                             transition: Bounce,
//                         });
//                     });
//                 } else {
//                     toast.error("Failed to register vendor", {
//                         position: "top-right",
//                         autoClose: 5000,
//                         hideProgressBar: false,
//                         closeOnClick: true,
//                         pauseOnHover: true,
//                         draggable: true,
//                         progress: undefined,
//                         theme: "colored",
//                         transition: Bounce,
//                     });
//                 }
//             });
//         }
//     };

//     return (
//         <div className="dashboard p-6 bg-gray-50 font-sans">
//             {/* Vendor List Section */}
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//                 <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-blue-100 flex justify-between items-center">
//                     <h2 className="text-xl font-bold text-gray-800">Vendor Management</h2>
//                     <div className="flex items-center gap-4">
//                         <span className="text-sm text-gray-600 font-medium">Total Vendors: {vendorList.length}</span>
//                         <button
//                             onClick={openCreateVendorModal}
//                             className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center transition-colors"
//                         >
//                             <Plus size={16} className="mr-2" /> Create Vendor
//                         </button>
//                     </div>
//                 </div>
//                 <div className="overflow-x-auto">
//                     <table className="w-full">
//                         <thead className="bg-gradient-to-r from-blue-100 to-blue-200 border-b-2 border-blue-300">
//                             <tr>
//                                 <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
//                                     Vendor Name
//                                 </th>
//                                 <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
//                                     Email
//                                 </th>
//                                 <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
//                                     Phone
//                                 </th>
//                                 <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
//                                     Status
//                                 </th>
//                                 <th className="p-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
//                                     Actions
//                                 </th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-200">
//                             {vendorList.map((vendor) => (
//                                 <tr key={vendor._id} className="hover:bg-blue-50 transition-colors">
//                                     <td className="p-4">
//                                         <div className="flex items-center">
//                                             <div className={`p-2 rounded-full mr-3 ${vendor.isActive ? 'bg-green-100' : 'bg-red-100'}`}>
//                                                 <Users className={vendor.isActive ? 'text-green-600' : 'text-red-600'} size={20} />
//                                             </div>
//                                             <span className="font-semibold text-gray-900">{vendor.name}</span>
//                                         </div>
//                                     </td>
//                                     <td className="p-4 text-gray-700">{vendor.email}</td>
//                                     <td className="p-4 text-gray-700">{vendor.phoneNumber}</td>
//                                     <td className="p-4">
//                                         <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                                             vendor.isActive
//                                             ? 'bg-green-100 text-green-800'
//                                             : 'bg-red-100 text-red-800'
//                                         }`}>
//                                             {vendor.isActive ? 'Active' : 'Inactive'}
//                                         </span>
//                                     </td>
//                                     <td className="p-4 text-right">
//                                         {vendor.isActive ? (
//                                             <button
//                                                 onClick={() => openConfirmationModal(vendor, 'lock')}
//                                                 className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center justify-center ml-auto transition-colors"
//                                             >
//                                                 <Lock size={16} className="mr-2" /> Lock Account
//                                             </button>
//                                         ) : (
//                                             <button
//                                                 onClick={() => openConfirmationModal(vendor, 'unlock')}
//                                                 className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center justify-center ml-auto transition-colors"
//                                             >
//                                                 <Unlock size={16} className="mr-2" /> Unlock Account
//                                             </button>
//                                         )}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//             {/* Confirmation Modal */}
//             {confirmationModal.show && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-white rounded-lg p-6 max-w-sm w-full">
//                         <h2 className="text-xl font-bold mb-4">
//                             {confirmationModal.action === 'lock' ? 'Lock' : 'Unlock'} Vendor
//                         </h2>
//                         <p className="mb-6">
//                             Are you sure you want to {confirmationModal.action} the account for {confirmationModal.vendor.name}?
//                         </p>
//                         <div className="flex justify-end space-x-4">
//                             <button
//                                 onClick={closeConfirmationModal}
//                                 className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleAccountAction}
//                                 className={`px-4 py-2 rounded-lg ${
//                                     confirmationModal.action === 'lock'
//                                     ? 'bg-red-500 hover:bg-red-600 text-white'
//                                     : 'bg-green-500 hover:bg-green-600 text-white'
//                                 }`}
//                             >
//                                 Confirm
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Create Vendor Modal */}
//             {createVendorModal && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-white rounded-lg p-6 max-w-3xl w-full h-auto max-h-screen overflow-y-auto">
//                         <div className="flex items-center justify-between mb-6">
//                             <h2 className="text-2xl font-bold text-blue-600">Create New Vendor</h2>
//                             <button
//                                 onClick={closeCreateVendorModal}
//                                 className="text-gray-500 hover:text-gray-700"
//                             >
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                 </svg>
//                             </button>
//                         </div>

//                         <form className="space-y-6" onSubmit={handleCreateVendor}>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 <div>
//                                     <label className="block text-gray-700 mb-2 font-medium">Name</label>
//                                     <input
//                                         type="text"
//                                         value={name}
//                                         onChange={(e) => setName(e.target.value)}
//                                         placeholder="e.g. John Doe"
//                                         className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         required
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-gray-700 mb-2 font-medium">Phone Number</label>
//                                     <input
//                                         type="tel"
//                                         placeholder="9XXXXXXXXX"
//                                         value={phoneNumber}
//                                         onChange={handlePhoneChange}
//                                         className={`w-full p-4 border ${phoneError ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                                         required
//                                         maxLength={10}
//                                     />
//                                     {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
//                                 </div>
//                             </div>

//                             <div>
//                                 <label className="block text-gray-700 mb-2 font-medium">
//                                     Email
//                                     <span className="text-red-500 ml-1">*</span>
//                                 </label>
//                                 <input
//                                     type="email"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     placeholder="example@gmail.com"
//                                     className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     required
//                                 />
//                             </div>

//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 <div>
//                                     <label className="block text-gray-700 mb-2 font-medium">Password</label>
//                                     <input
//                                         type="password"
//                                         placeholder="******"
//                                         value={password}
//                                         onChange={handlePasswordChange}
//                                         className={`w-full p-4 border ${passwordError ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                                         required
//                                         minLength={6}
//                                     />
//                                     <div className={`h-6 ${passwordError ? 'block' : 'hidden'}`}>
//                                         {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
//                                     </div>
//                                 </div>

//                                 <div>
//                                     <label className="block text-gray-700 mb-2 font-medium">Confirm Password</label>
//                                     <input
//                                         type="password"
//                                         placeholder="******"
//                                         value={confirmPassword}
//                                         onChange={handleConfirmPasswordChange}
//                                         className={`w-full p-4 border ${confirmPasswordError ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                                         required
//                                     />
//                                     <div className={`h-6 ${confirmPasswordError ? 'block' : 'hidden'}`}>
//                                         {confirmPasswordError && <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>}
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="flex justify-end mt-6 space-x-4">
//                                 <button
//                                     type="button"
//                                     onClick={closeCreateVendorModal}
//                                     className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
//                                     disabled={isLoading}
//                                 >
//                                     {isLoading ? (
//                                         <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                                     ) : (
//                                         "Create Vendor"
//                                     )}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default VendorDashboard;

import React, { useState, useEffect } from "react";
import { Users, Lock, Unlock, Plus } from "lucide-react";
import axios from "axios";
import { toast, Bounce } from "react-toastify";

function VendorDashboard() {
  const [vendorList, setVendorList] = useState([]);
  const [confirmationModal, setConfirmationModal] = useState({
    show: false,
    vendor: null,
    action: "",
  });
  const [createVendorModal, setCreateVendorModal] = useState(false);

  // Form state for new vendor
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Form validation errors
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    fetchVendorList();
  }, []);

  const fetchVendorList = () => {
    axios
      .get("http://localhost:3000/api/admin/vendorList", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setVendorList(res.data.vendors);
        }
      })
      .catch((err) => {
        // Error handling can be added here
        toast.error("Failed to fetch vendor list", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
          transition: Bounce,
        });
      });
  };

  const openConfirmationModal = (vendor, action) => {
    setConfirmationModal({
      show: true,
      vendor: vendor,
      action: action,
    });
  };

  const closeConfirmationModal = () => {
    setConfirmationModal({
      show: false,
      vendor: null,
      action: "",
    });
  };

  const openCreateVendorModal = () => {
    // Reset form state
    setName("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
    setConfirmPassword("");
    setPhoneError("");
    setPasswordError("");
    setConfirmPasswordError("");

    setCreateVendorModal(true);
  };

  const closeCreateVendorModal = () => {
    setCreateVendorModal(false);
  };

  const handleAccountAction = () => {
    axios
      .put(
        `http://localhost:3000/api/admin/user/${confirmationModal.vendor._id}/status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        if (res.status === 200) {
          closeConfirmationModal();
          fetchVendorList(); // Refresh the vendor list
          toast.success(res.data.message, {
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
        }
      })
      .catch((err) => {
        toast.error("Failed to update vendor status", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
          transition: Bounce,
        });
      });
  };

  // Form Validation Functions - Updated to match SignUp page
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 0 && value[0] !== "9") {
      value = "9" + value.substring(value.length > 1 ? 1 : 0);
    }

    if (value.length <= 10) {
      setPhoneNumber(value);
    }

    if (value.length > 0 && value.length !== 10) {
      setPhoneError("Phone number must be 10 digits");
    } else if (value.length > 0 && value[0] !== "9") {
      setPhoneError("Phone number must start with 9");
    } else {
      setPhoneError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-={}|;:,.<>?~`]+$/;

    if (value.length === 0) {
      setPasswordError("");
    } else if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else if (!passwordRegex.test(value)) {
      setPasswordError("Password contains invalid characters");
    } else {
      setPasswordError("");
    }

    // Check if confirm password matches
    if (confirmPassword && value !== confirmPassword) {
      setConfirmPasswordError("Passwords don't match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value !== password) {
      setConfirmPasswordError("Passwords don't match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleCreateVendor = (e) => {
    e.preventDefault();

    if (
      !phoneError &&
      !passwordError &&
      !confirmPasswordError &&
      password.length >= 6 &&
      name.trim() !== "" &&
      email.trim() !== "" &&
      password === confirmPassword
    ) {
      setIsLoading(true);

      const phoneWithCountryCode = `+977${phoneNumber}`;

      axios
        .post(
          "http://localhost:3000/api/vendorRegistration",
          {
            name: name,
            email: email,
            password: password,
            password_confirmation: confirmPassword,
            phoneNumber: phoneWithCountryCode,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((response) => {
          setIsLoading(false);
          closeCreateVendorModal();
          fetchVendorList(); // Refresh the vendor list

          toast.success("Vendor registered successfully", {
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
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.response && error.response.status === 400) {
            error.response.data.errors.forEach((err) => {
              toast.error(err.message, {
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
          } else {
            toast.error("Failed to register vendor", {
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
          }
        });
    }
  };

  return (
    <div className="dashboard p-6 bg-gray-50 font-sans">
      {/* Vendor List Section */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-blue-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Vendor Management</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 font-medium">
              Total Vendors: {vendorList.length}
            </span>
            <button
              onClick={openCreateVendorModal}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center transition-colors"
            >
              <Plus size={16} className="mr-2" /> Create Vendor
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-100 to-blue-200 border-b-2 border-blue-300">
              <tr>
                <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Vendor Name
                </th>
                <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Email
                </th>
                <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Phone
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
              {vendorList.map((vendor) => (
                <tr
                  key={vendor._id}
                  className="hover:bg-blue-50 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center">
                      <div
                        className={`p-2 rounded-full mr-3 ${vendor.isActive ? "bg-green-100" : "bg-red-100"}`}
                      >
                        <Users
                          className={
                            vendor.isActive ? "text-green-600" : "text-red-600"
                          }
                          size={20}
                        />
                      </div>
                      <span className="font-semibold text-gray-900">
                        {vendor.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-700">{vendor.email}</td>
                  <td className="p-4 text-gray-700">{vendor.phoneNumber}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        vendor.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {vendor.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {vendor.isActive ? (
                      <button
                        onClick={() => openConfirmationModal(vendor, "lock")}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center justify-center ml-auto transition-colors"
                      >
                        <Lock size={16} className="mr-2" /> Lock Account
                      </button>
                    ) : (
                      <button
                        onClick={() => openConfirmationModal(vendor, "unlock")}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center justify-center ml-auto transition-colors"
                      >
                        <Unlock size={16} className="mr-2" /> Unlock Account
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmationModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">
              {confirmationModal.action === "lock" ? "Lock" : "Unlock"} Vendor
            </h2>
            <p className="mb-6">
              Are you sure you want to {confirmationModal.action} the account
              for {confirmationModal.vendor.name}?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeConfirmationModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAccountAction}
                className={`px-4 py-2 rounded-lg ${
                  confirmationModal.action === "lock"
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Vendor Modal */}
      {createVendorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full h-auto max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-blue-600">
                Create New Vendor
              </h2>
              <button
                onClick={closeCreateVendorModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form className="space-y-6" onSubmit={handleCreateVendor}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="9XXXXXXXXX"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    className={`w-full p-4 pl-8 border ${phoneError ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                    maxLength={10}
                  />
                  {phoneError && (
                    <p className="text-red-500 text-sm">{phoneError}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Email
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="******"
                    value={password}
                    onChange={handlePasswordChange}
                    className={`w-full p-4 border ${passwordError ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                    minLength={6}
                  />
                  <div className={`h-6 ${passwordError ? "block" : "hidden"}`}>
                    {passwordError && (
                      <p className="text-red-500 text-sm mt-1">
                        {passwordError}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="******"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className={`w-full p-4 border ${confirmPasswordError ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                    minLength={6}
                  />
                  <div
                    className={`h-6 ${confirmPasswordError ? "block" : "hidden"}`}
                  >
                    {confirmPasswordError && (
                      <p className="text-red-500 text-sm mt-1">
                        {confirmPasswordError}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6 space-x-4">
                <button
                  type="button"
                  onClick={closeCreateVendorModal}
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  ) : (
                    "Create Vendor"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default VendorDashboard;
