// import React from 'react';
// import { UserCircle, Bell, LogOut } from 'lucide-react';
// import { useLocation } from 'react-router-dom';

// function AdminNavbar() {
//     const location = useLocation();
    
//     // Extract page name from the path
//     const getPageName = () => {
//         const path = location.pathname;
//         const pageName = path.split('/').pop();
//         return pageName.charAt(0).toUpperCase() + pageName.slice(1);
//     };

//     return (
//         <nav className="admin-navbar bg-white shadow-md p-4 flex justify-between items-center">
//             <div className="text-xl font-semibold text-gray-800">
//                 {getPageName()}
//             </div>
//             <div className="flex items-center space-x-4">
//                 <button className="text-gray-600 hover:text-gray-800">
//                     <Bell size={20} />
//                 </button>
//                 <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-full">
//                     <UserCircle size={30} className="text-gray-600" />
//                     <span className="text-sm font-medium">Admin</span>
//                 </div>
//                 <button className="text-red-600 hover:text-red-800">
//                     <LogOut size={20} />
//                 </button>
//             </div>
//         </nav>
//     );
// }

// export default AdminNavbar;


import React, { useState, useEffect } from 'react';
import { UserCircle, Bell, LogOut } from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setReduxUser } from './Redux/Slice/userSlice';
import { resetReduxUser } from './Redux/Slice/userSlice';
import axios from 'axios';

function AdminNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Get token from localStorage
  const accessToken = localStorage.getItem("access_token");

  // Get user from Redux store
  const userReduxStore = useSelector((store) => store.user.value);

  // Extract page name from the path
  const getPageName = () => {
    const path = location.pathname;
    const pageName = path.split('/').pop();
    return pageName.charAt(0).toUpperCase() + pageName.slice(1);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const initiateLogout = () => {
    setShowLogoutConfirm(true);
    setIsProfileMenuOpen(false);
  };

  const confirmLogout = () => {
    dispatch(resetReduxUser());
    localStorage.removeItem("userRole");
    localStorage.removeItem("access_token");
    setShowLogoutConfirm(false);
    navigate("/login");
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  // Fetch user data on component mount
  useEffect(() => {
    if (accessToken) {
      axios.get("http://localhost:3000/api/user/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        dispatch(setReduxUser(response.data));
      })
      .catch((error) => {
        console.log("Error fetching user data:", error);
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          localStorage.removeItem("access_token");
          dispatch(resetReduxUser());
        }
      });
    }
  }, [accessToken, dispatch]);

  return (
    <>
      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Logout</h3>
            <p className="mb-6">Are you sure you want to logout from your account?</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={cancelLogout}
                className="py-2 px-4 border border-gray-300 rounded font-medium hover:bg-gray-50"
              >
                No, Cancel
              </button>
              <button 
                onClick={confirmLogout}
                className="py-2 px-4 bg-red-600 text-white rounded font-medium hover:bg-red-700"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className="admin-navbar bg-white shadow-md p-4 flex justify-between items-center">
        <div className="text-xl font-semibold text-gray-800">
          {getPageName()}
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-800">
            <Bell size={20} />
          </button>
          
          <div className="relative">
            <div 
              className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-full"
              onClick={toggleProfileMenu}
            >
              <UserCircle size={30} className="text-gray-600" />
              <span className="text-sm font-medium">
                {userReduxStore?.name || 'User'}
              </span>
            </div>

            {isProfileMenuOpen && (
              <div className="absolute right-0 top-12 bg-white shadow-md rounded-lg py-2 w-56 z-20 border">
                <div className="px-4 py-3 border-b">
                  <p className="text-sm font-medium text-gray-900">
                    {userReduxStore?.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {userReduxStore?.email || 'user@example.com'}
                  </p>
                </div>
                <div className="py-1">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile Information
                  </Link>
                  
                </div>
                <div className="border-t py-1">
                  <button
                    onClick={initiateLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default AdminNavbar;