

// import React, { useState, useEffect } from 'react';
// import { FiEdit2, FiUser, FiMail, FiPhone, FiLock, FiSave } from 'react-icons/fi';
// import axios from 'axios';

// const ProfileManagement = () => {
//   // User state
//   const [user, setUser] = useState({
//     name: '',
//     email: '',
//     phoneNumber: '',
//     createdAt: '',
//     role: ''
//   });

//   // Loading and error states
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const token = localStorage.getItem("access_token");

//   // Form states
//   const [isEditingProfile, setIsEditingProfile] = useState(false);
//   const [profileFormData, setProfileFormData] = useState({
//     newName: '',
//     newPhoneNumber: ''
//   });

//   const [passwordFormData, setPasswordFormData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });

//   const [formErrors, setFormErrors] = useState({
//     profile: null,
//     password: null
//   });

//   const [formSuccess, setFormSuccess] = useState({
//     profile: null,
//     password: null
//   });

//   // Fetch user data when component mounts
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get('http://localhost:3000/api/user/me',
//             {
//                 headers:{
//                     Authorization: `Bearer ${token}`
//                 }
//             }
//         );
//         setUser(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to load user data. Please try again later.');
//         setLoading(false);
//         console.error('Error fetching user data:', err);
//       }
//     };

//     fetchUserData();
//   }, [token]);

//   // Initialize form data when user data is loaded
//   useEffect(() => {
//     if (user.name && user.phoneNumber) {
//       setProfileFormData({
//         newName: user.name,
//         newPhoneNumber: user.phoneNumber
//       });
//     }
//   }, [user]);

//   // Handle profile form input changes
//   const handleProfileInputChange = (e) => {
//     const { name, value } = e.target;
//     setProfileFormData({
//       ...profileFormData,
//       [name]: value
//     });
//   };

//   // Handle password form input changes
//   const handlePasswordInputChange = (e) => {
//     const { name, value } = e.target;
//     setPasswordFormData({
//       ...passwordFormData,
//       [name]: value
//     });
//   };

//   // Toggle profile edit mode
//   const toggleProfileEdit = () => {
//     if (isEditingProfile) {
//       // Reset form data if cancelling
//       setProfileFormData({
//         newName: user.name,
//         newPhoneNumber: user.phoneNumber
//       });
//     }
//     setIsEditingProfile(!isEditingProfile);
//     setFormErrors({ ...formErrors, profile: null });
//     setFormSuccess({ ...formSuccess, profile: null });
//   };

//   // Submit profile update
//   const handleProfileUpdate = async (e) => {
//     e.preventDefault();
    
//     // Validation
//     if (!profileFormData.newName.trim()) {
//       setFormErrors({ ...formErrors, profile: 'Name cannot be empty' });
//       return;
//     }
    
//     // Phone number validation for Nepal format
//     const phoneRegex = /^\+9779[0-9]{9}$/;
//     if (!phoneRegex.test(profileFormData.newPhoneNumber)) {
//       setFormErrors({ ...formErrors, profile: 'Phone number must start with +9779 followed by 9 digits' });
//       return;
//     }
    
//     try {
//       // API call to update user profile
//       const response = await axios.post(
//         'http://localhost:3000/api/changeNamePhone', 
//         {
//           newName: profileFormData.newName,
//           newPhoneNumber: profileFormData.newPhoneNumber
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );
      
//       // Update local state with response data
//       setUser({
//         ...user,
//         name: response.data.data.name,
//         phoneNumber: response.data.data.phoneNumber
//       });
      
//       setIsEditingProfile(false);
//       setFormSuccess({ ...formSuccess, profile: 'Profile updated successfully' });
      
//       // Clear success message after 3 seconds
//       setTimeout(() => {
//         setFormSuccess({ ...formSuccess, profile: null });
//       }, 3000);
//     } catch (err) {
//       setFormErrors({ 
//         ...formErrors, 
//         profile: err.response?.data?.message || 'Failed to update profile. Please try again.' 
//       });
//       console.error('Error updating profile:', err);
//     }
//   };

//   // Submit password change
//   const handlePasswordChange = async (e) => {
//     e.preventDefault();
    
//     // Validation
//     if (!passwordFormData.currentPassword || !passwordFormData.newPassword || !passwordFormData.confirmPassword) {
//       setFormErrors({ ...formErrors, password: 'All password fields are required' });
//       return;
//     }
    
//     if (passwordFormData.newPassword !== passwordFormData.confirmPassword) {
//       setFormErrors({ ...formErrors, password: 'New passwords do not match' });
//       return;
//     }
    
//     if (passwordFormData.newPassword.length < 8) {
//       setFormErrors({ ...formErrors, password: 'Password must be at least 8 characters long' });
//       return;
//     }
    
//     try {
//       // API call to change password
//       await axios.post(
//         'http://localhost:3000/api/resetPassword', 
//         {
//           currentPassword: passwordFormData.currentPassword,
//           newPassword: passwordFormData.newPassword,
//           confirmPassword: passwordFormData.confirmPassword
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );
      
//       setFormSuccess({ ...formSuccess, password: 'Password changed successfully' });
//       setPasswordFormData({
//         currentPassword: '',
//         newPassword: '',
//         confirmPassword: ''
//       });
//       setFormErrors({ ...formErrors, password: null });
      
//       // Clear success message after 3 seconds
//       setTimeout(() => {
//         setFormSuccess({ ...formSuccess, password: null });
//       }, 3000);
//     } catch (err) {
//       setFormErrors({ 
//         ...formErrors, 
//         password: err.response?.data?.message || 'Failed to change password. Please try again.' 
//       });
//       console.error('Error changing password:', err);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading your profile...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
//           <div className="text-red-600 text-center mb-4">
//             <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//             </svg>
//           </div>
//           <h2 className="text-2xl font-bold mb-4 text-center">Error Loading Profile</h2>
//           <p className="text-gray-600 text-center mb-6">{error}</p>
//           <button 
//             onClick={() => window.location.reload()}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition duration-300"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile Management</h1>
        
//         <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//           <div className="grid grid-cols-1 md:grid-cols-3">
//             {/* Left Sidebar */}
//             <div className="bg-gray-900 text-white p-8 flex flex-col items-center justify-start">
//               <div className="relative mb-6">
//                 {/* Always use the FiUser icon instead of profile image */}
//                 <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center text-5xl border-4 border-blue-500">
//                   <FiUser />
//                 </div>
                
//                 {/* Remove the profile image upload functionality */}
//               </div>
              
//               <h2 className="text-xl font-bold mb-1">{user.name}</h2>
//               <div className="flex items-center text-gray-400 mb-6">
//                 <FiMail className="mr-2" />
//                 <span>{user.email}</span>
//               </div>
              
//               <div className="w-full border-t border-gray-700 pt-6 mt-4">
//                 <div className="flex items-center text-gray-300 mb-4">
//                   <FiPhone className="mr-3 text-blue-500" />
//                   <span>{user.phoneNumber}</span>
//                 </div>
//                 <div className="flex items-center text-gray-300">
//                   <FiLock className="mr-3 text-blue-500" />
//                   <span>Password: ********</span>
//                 </div>
//               </div>
              
//               <div className="mt-auto pt-6">
//                 <p className="text-sm text-gray-400">
//                   Member since: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
//                 </p>
//                 {user.role && (
//                   <p className="text-sm text-gray-400 mt-1">
//                     Role: <span className="capitalize">{user.role}</span>
//                   </p>
//                 )}
//               </div>
//             </div>
            
//             {/* Right Content */}
//             <div className="col-span-2 p-8">
//               <div className="mb-10">
//                 <div className="flex items-center justify-between mb-6">
//                   <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
//                   <button 
//                     onClick={toggleProfileEdit}
//                     className="flex items-center text-blue-600 hover:text-blue-800"
//                   >
//                     {isEditingProfile ? (
//                       <span>Cancel</span>
//                     ) : (
//                       <>
//                         <FiEdit2 className="mr-2" />
//                         <span>Edit</span>
//                       </>
//                     )}
//                   </button>
//                 </div>
                
//                 {formSuccess.profile && (
//                   <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
//                     {formSuccess.profile}
//                   </div>
//                 )}
                
//                 {formErrors.profile && (
//                   <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
//                     {formErrors.profile}
//                   </div>
//                 )}
                
//                 <form onSubmit={handleProfileUpdate}>
//                   <div className="space-y-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Full Name
//                       </label>
//                       {isEditingProfile ? (
//                         <input
//                           type="text"
//                           name="newName"
//                           value={profileFormData.newName}
//                           onChange={handleProfileInputChange}
//                           className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                           placeholder="Enter your full name"
//                         />
//                       ) : (
//                         <div className="text-gray-900 px-4 py-3 bg-gray-50 rounded-lg">
//                           {user.name}
//                         </div>
//                       )}
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Email Address
//                       </label>
//                       <div className="text-gray-500 px-4 py-3 bg-gray-50 rounded-lg">
//                         {user.email}
//                         <span className="ml-2 text-xs text-gray-400">(cannot be changed)</span>
//                       </div>
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Phone Number
//                       </label>
//                       {isEditingProfile ? (
//                         <input
//                           type="text"
//                           name="newPhoneNumber"
//                           value={profileFormData.newPhoneNumber}
//                           onChange={handleProfileInputChange}
//                           className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                           placeholder="Enter your phone number (format: +9779XXXXXXXXX)"
//                         />
//                       ) : (
//                         <div className="text-gray-900 px-4 py-3 bg-gray-50 rounded-lg">
//                           {user.phoneNumber}
//                         </div>
//                       )}
//                     </div>
                    
//                     {isEditingProfile && (
//                       <div className="pt-4">
//                         <button
//                           type="submit"
//                           className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300 flex items-center justify-center"
//                         >
//                           <FiSave className="mr-2" />
//                           Save Changes
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </form>
//               </div>
              
//               <div className="border-t border-gray-200 pt-10">
//                 <h3 className="text-xl font-bold text-gray-900 mb-6">Change Password</h3>
                
//                 {formSuccess.password && (
//                   <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
//                     {formSuccess.password}
//                   </div>
//                 )}
                
//                 {formErrors.password && (
//                   <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
//                     {formErrors.password}
//                   </div>
//                 )}
                
//                 <form onSubmit={handlePasswordChange}>
//                   <div className="space-y-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Current Password
//                       </label>
//                       <input
//                         type="password"
//                         name="currentPassword"
//                         value={passwordFormData.currentPassword}
//                         onChange={handlePasswordInputChange}
//                         className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="Enter your current password"
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         New Password
//                       </label>
//                       <input
//                         type="password"
//                         name="newPassword"
//                         value={passwordFormData.newPassword}
//                         onChange={handlePasswordInputChange}
//                         className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="Enter your new password"
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Confirm New Password
//                       </label>
//                       <input
//                         type="password"
//                         name="confirmPassword"
//                         value={passwordFormData.confirmPassword}
//                         onChange={handlePasswordInputChange}
//                         className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="Confirm your new password"
//                       />
//                     </div>
                    
//                     <div className="pt-4">
//                       <button
//                         type="submit"
//                         className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300 flex items-center justify-center"
//                       >
//                         <FiLock className="mr-2" />
//                         Update Password
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileManagement;


import React, { useState, useEffect } from 'react';
import { FiEdit2, FiUser, FiMail, FiPhone, FiLock, FiSave } from 'react-icons/fi';
import axios from 'axios';

const ProfileManagement = () => {
  // User state
  const [user, setUser] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    createdAt: '',
    role: ''
  });

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("access_token");

  // Form states
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileFormData, setProfileFormData] = useState({
    newName: '',
    newPhoneNumber: '' // This will store just the digits, without +977
  });

  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [formErrors, setFormErrors] = useState({
    profile: null,
    password: null
  });

  const [formSuccess, setFormSuccess] = useState({
    profile: null,
    password: null
  });

  // Function to remove +977 prefix from phone number
  const removePhonePrefix = (phoneNumber) => {
    if (phoneNumber && phoneNumber.startsWith('+977')) {
      return phoneNumber.substring(4);
    }
    return phoneNumber;
  };

  // Function to add +977 prefix to phone number if not present
  const addPhonePrefix = (phoneNumber) => {
    if (phoneNumber) {
      if (phoneNumber.startsWith('+977')) {
        return phoneNumber;
      } else {
        return `+977${phoneNumber}`;
      }
    }
    return '';
  };

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/api/user/me',
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        );
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load user data. Please try again later.');
        setLoading(false);
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserData();
  }, [token]);

  // Initialize form data when user data is loaded
  useEffect(() => {
    if (user.name && user.phoneNumber) {
      setProfileFormData({
        newName: user.name,
        newPhoneNumber: removePhonePrefix(user.phoneNumber) // Remove prefix when showing to user
      });
    }
  }, [user]);

  // Handle profile form input changes
  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'newPhoneNumber') {
      // Only allow digits for phone number
      const phoneDigits = value.replace(/\D/g, '');
      setProfileFormData({
        ...profileFormData,
        [name]: phoneDigits
      });
    } else {
      setProfileFormData({
        ...profileFormData,
        [name]: value
      });
    }
  };

  // Handle password form input changes
  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordFormData({
      ...passwordFormData,
      [name]: value
    });
  };

  // Toggle profile edit mode
  const toggleProfileEdit = () => {
    if (isEditingProfile) {
      // Reset form data if cancelling
      setProfileFormData({
        newName: user.name,
        newPhoneNumber: removePhonePrefix(user.phoneNumber)
      });
    }
    setIsEditingProfile(!isEditingProfile);
    setFormErrors({ ...formErrors, profile: null });
    setFormSuccess({ ...formSuccess, profile: null });
  };

  // Submit profile update
const handleProfileUpdate = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!profileFormData.newName.trim()) {
      setFormErrors({ ...formErrors, profile: 'Name cannot be empty' });
      return;
    }
    
    // Phone number validation - should be 10 digits
    const phoneRegex = /^9[0-9]{9}$/;
    if (!phoneRegex.test(profileFormData.newPhoneNumber)) {
      setFormErrors({ ...formErrors, profile: 'Phone number must be 10 digits starting with 9' });
      return;
    }
    
    try {
      // Add the +977 prefix before sending to API
      const phoneWithPrefix = addPhonePrefix(profileFormData.newPhoneNumber);
      
      // API call to update user profile
      const response = await axios.post(
        'http://localhost:3000/api/changeNamePhone', 
        {
          newName: profileFormData.newName,
          newPhoneNumber: phoneWithPrefix // Send with +977 prefix
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      // Update local state with response data
      setUser({
        ...user,
        name: response.data.data.name,
        phoneNumber: response.data.data.phoneNumber
      });
      
      setIsEditingProfile(false);
      // Clear any error messages when update is successful
      setFormErrors({ ...formErrors, profile: null });
      setFormSuccess({ ...formSuccess, profile: 'Profile updated successfully' });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setFormSuccess({ ...formSuccess, profile: null });
      }, 3000);
    } catch (err) {
      setFormErrors({ 
        ...formErrors, 
        profile: err.response?.data?.message || 'Failed to update profile. Please try again.' 
      });
      // Clear any success messages when there's an error
      setFormSuccess({ ...formSuccess, profile: null });
      console.error('Error updating profile:', err);
    }
  };

  // Submit password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!passwordFormData.currentPassword || !passwordFormData.newPassword || !passwordFormData.confirmPassword) {
      setFormErrors({ ...formErrors, password: 'All password fields are required' });
      return;
    }
    
    if (passwordFormData.newPassword !== passwordFormData.confirmPassword) {
      setFormErrors({ ...formErrors, password: 'New passwords do not match' });
      return;
    }
    
    if (passwordFormData.newPassword.length < 8) {
      setFormErrors({ ...formErrors, password: 'Password must be at least 8 characters long' });
      return;
    }
    
    try {
      // API call to change password
      await axios.post(
        'http://localhost:3000/api/resetPassword', 
        {
          currentPassword: passwordFormData.currentPassword,
          newPassword: passwordFormData.newPassword,
          confirmPassword: passwordFormData.confirmPassword
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      setFormSuccess({ ...formSuccess, password: 'Password changed successfully' });
      setPasswordFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setFormErrors({ ...formErrors, password: null });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setFormSuccess({ ...formSuccess, password: null });
      }, 3000);
    } catch (err) {
      setFormErrors({ 
        ...formErrors, 
        password: err.response?.data?.message || 'Failed to change password. Please try again.' 
      });
      console.error('Error changing password:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="text-red-600 text-center mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-center">Error Loading Profile</h2>
          <p className="text-gray-600 text-center mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile Management</h1>
        
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Left Sidebar */}
            <div className="bg-gray-900 text-white p-8 flex flex-col items-center justify-start">
              <div className="relative mb-6">
                {/* Always use the FiUser icon instead of profile image */}
                <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center text-5xl border-4 border-blue-500">
                  <FiUser />
                </div>
                
                {/* Remove the profile image upload functionality */}
              </div>
              
              <h2 className="text-xl font-bold mb-1">{user.name}</h2>
              <div className="flex items-center text-gray-400 mb-6">
                <FiMail className="mr-2" />
                <span>{user.email}</span>
              </div>
              
              <div className="w-full border-t border-gray-700 pt-6 mt-4">
                <div className="flex items-center text-gray-300 mb-4">
                  <FiPhone className="mr-3 text-blue-500" />
                  <span>{user.phoneNumber}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <FiLock className="mr-3 text-blue-500" />
                  <span>Password: ********</span>
                </div>
              </div>
              
              <div className="mt-auto pt-6">
                <p className="text-sm text-gray-400">
                  Member since: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </p>
                {user.role && (
                  <p className="text-sm text-gray-400 mt-1">
                    Role: <span className="capitalize">{user.role}</span>
                  </p>
                )}
              </div>
            </div>
            
            {/* Right Content */}
            <div className="col-span-2 p-8">
              <div className="mb-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
                  <button 
                    onClick={toggleProfileEdit}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    {isEditingProfile ? (
                      <span>Cancel</span>
                    ) : (
                      <>
                        <FiEdit2 className="mr-2" />
                        <span>Edit</span>
                      </>
                    )}
                  </button>
                </div>
                
                {formSuccess.profile && (
                  <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
                    {formSuccess.profile}
                  </div>
                )}
                
                {formErrors.profile && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                    {formErrors.profile}
                  </div>
                )}
                
                <form onSubmit={handleProfileUpdate}>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      {isEditingProfile ? (
                        <input
                          type="text"
                          name="newName"
                          value={profileFormData.newName}
                          onChange={handleProfileInputChange}
                          className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter your full name"
                        />
                      ) : (
                        <div className="text-gray-900 px-4 py-3 bg-gray-50 rounded-lg">
                          {user.name}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="text-gray-500 px-4 py-3 bg-gray-50 rounded-lg">
                        {user.email}
                        <span className="ml-2 text-xs text-gray-400">(cannot be changed)</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      {isEditingProfile ? (
                        <div className="flex">
                          <div className="bg-gray-100 flex items-center px-4 py-3 border border-r-0 border-gray-300 rounded-l-lg">
                            +977
                          </div>
                          <input
                            type="text"
                            name="newPhoneNumber"
                            value={profileFormData.newPhoneNumber}
                            onChange={handleProfileInputChange}
                            className="block w-full px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter 10 digits (9xxxxxxxxx)"
                            maxLength={10}
                          />
                        </div>
                      ) : (
                        <div className="text-gray-900 px-4 py-3 bg-gray-50 rounded-lg">
                          {user.phoneNumber}
                        </div>
                      )}
                    </div>
                    
                    {isEditingProfile && (
                      <div className="pt-4">
                        <button
                          type="submit"
                          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300 flex items-center justify-center"
                        >
                          <FiSave className="mr-2" />
                          Save Changes
                        </button>
                      </div>
                    )}
                  </div>
                </form>
              </div>
              
              <div className="border-t border-gray-200 pt-10">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Change Password</h3>
                
                {formSuccess.password && (
                  <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
                    {formSuccess.password}
                  </div>
                )}
                
                {formErrors.password && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                    {formErrors.password}
                  </div>
                )}
                
                <form onSubmit={handlePasswordChange}>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={passwordFormData.currentPassword}
                        onChange={handlePasswordInputChange}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your current password"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        value={passwordFormData.newPassword}
                        onChange={handlePasswordInputChange}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your new password"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={passwordFormData.confirmPassword}
                        onChange={handlePasswordInputChange}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Confirm your new password"
                      />
                    </div>
                    
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300 flex items-center justify-center"
                      >
                        <FiLock className="mr-2" />
                        Update Password
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;