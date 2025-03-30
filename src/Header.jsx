
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { resetReduxUser, setReduxUser } from './Redux/Slice/userSlice';
// import axios from 'axios';
// import { CgProfile } from "react-icons/cg";
// import App2 from './App2';

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
//   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Get user from Redux store
//   const userReduxStore = useSelector((store) => store.user.value);

//   // Check if user is logged in
//   const isLoggedIn = Boolean(userReduxStore?.name);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const toggleProfileMenu = () => {
//     setIsProfileMenuOpen(!isProfileMenuOpen);
//   };

//   const initiateLogout = () => {
//     setShowLogoutConfirm(true);
//     // Close the profile menu when showing confirmation
//     setIsProfileMenuOpen(false);
//   };

//   const confirmLogout = () => {
//     dispatch(resetReduxUser());
//     localStorage.removeItem("access_token");
//     setShowLogoutConfirm(false);
//     navigate("/login")
//   };

//   const cancelLogout = () => {
//     setShowLogoutConfirm(false);
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     navigate("/product?search_term=" + e.target.search_term.value);
//   };

//   // Get token from localStorage
//   const accessToken = localStorage.getItem("access_token");



//   useEffect(() => {
//     // Only fetch user data if token exists
//     if (accessToken) {
//       axios.get("http://localhost:3000/api/user/me", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`
//         }
//       })
//       .then((response) => {
//         console.log("User data fetched:", response.data);
//         dispatch(setReduxUser(response.data));
//       })
//       .catch((error) => {
//         console.log("Error fetching user data:", error);
//         // If the token is invalid, clear it
//         if (error.response && (error.response.status === 401 || error.response.status === 403)) {
//           localStorage.removeItem("access_token");
//           dispatch(resetReduxUser());
//         }
//       });
//     }
//   }, [accessToken, dispatch]);

//   return (
//       <nav className="flex justify-between items-center px-6 lg:px-24 py-4 bg-customBlue shadow-md">
//       {/* Logout Confirmation Modal */}
//       {showLogoutConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
//             <h3 className="text-lg font-semibold mb-4">Confirm Logout</h3>
//             <p className="mb-6">Are you sure you want to logout from your account?</p>
//             <div className="flex justify-end gap-3">
//               <button 
//                 onClick={cancelLogout}
//                 className="py-2 px-4 border border-gray-300 rounded font-medium hover:bg-gray-50"
//               >
//                 No, Cancel
//               </button>
//               <button 
//                 onClick={confirmLogout}
//                 className="py-2 px-4 bg-[#3b65d9] text-white rounded font-medium hover:bg-[#2a50b8]"
//               >
//                 Yes, Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="flex justify-between items-center w-full lg:w-auto">
//         <Link to="/" className="text-2xl font-bold text-[#3b65d9] no-underline">Logo</Link>
//         <div className="flex flex-col gap-1 cursor-pointer lg:hidden" onClick={toggleMenu}>
//           <div className="w-6 h-0.5 bg-gray-800"></div>
//           <div className="w-6 h-0.5 bg-gray-800"></div>
//           <div className="w-6 h-0.5 bg-gray-800"></div>
//         </div>
//       </div>

//       <ul className={`${isMenuOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row absolute lg:static top-20 left-0 right-0 bg-white lg:bg-transparent gap-0 lg:gap-8 z-10 overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'h-auto py-4 shadow-md' : 'h-0'} lg:h-auto lg:shadow-none`}>
//         <li className="w-full lg:w-auto text-center py-4 lg:py-0">
//           <Link to="/" className="no-underline text-gray-800 font-medium hover:text-[#3b65d9] transition-colors">Home</Link>
//         </li>
//         <li className="w-full lg:w-auto text-center py-4 lg:py-0">
//           <Link to="/product" className="no-underline text-gray-800 font-medium hover:text-[#3b65d9] transition-colors">Vehicle</Link>
//         </li>
//         <li className="w-full lg:w-auto text-center py-4 lg:py-0">
//           <Link to="/cart" className="no-underline text-gray-800 font-medium hover:text-[#3b65d9] transition-colors">Contact</Link>
//         </li>
//       </ul>

//       {/* Auth and Search Section */}
//       <div className="hidden lg:flex flex-row w-auto items-center gap-4">
//         {/* Search Input - Always visible */}
//         <div className="relative">
//           <form onSubmit={handleSearch}>
//             <input 
//               type="text" 
//               name="search_term"
//               placeholder="Search..." 
//               className="py-2 px-4 pr-10 border border-gray-300 rounded w-56"
//             />
//             <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 bg-transparent border-0">
//               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
//                 <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
//               </svg>
//             </button>
//           </form>
//         </div>

//         {/* Conditional rendering based on login status */}
//         {isLoggedIn ? (
//           <div className="flex items-center gap-2 relative">
//             <span className="font-medium">{userReduxStore.name}</span>
//             <div className="cursor-pointer" onClick={toggleProfileMenu}>
//               <CgProfile size={24} className="text-[#3b65d9]" />
//             </div>

//             {isProfileMenuOpen && (
//               <div className="absolute right-0 top-10 bg-white shadow-md rounded py-2 w-48 z-20">
//                 <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile Information</Link>
//                 <button 
//                   onClick={initiateLogout} 
//                   className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div className="flex gap-3">
//             <Link to="/login" className="py-2 px-4 border border-[#3b65d9] bg-white text-[#3b65d9] rounded font-medium cursor-pointer transition-all hover:bg-blue-50 text-center">
//               Login
//             </Link>
//             <Link to="/signup" className="py-2 px-4 border-none bg-[#3b65d9] text-white rounded font-medium cursor-pointer transition-all hover:bg-[#2a50b8] text-center">
//               Sign up
//             </Link>
//           </div>
//         )}
//       </div>

//       {/* Mobile menu items (shown when menu is toggled) */}
//       <div className={`${isMenuOpen ? 'flex' : 'hidden'} lg:hidden flex-col w-full items-center gap-4 mt-4 absolute top-20 left-0 right-0 bg-white z-10 p-4 shadow-md`}>
//         <div className="relative w-full">
//           <form onSubmit={handleSearch}>
//             <input 
//               type="text" 
//               name="search_term"
//               placeholder="Search..." 
//               className="py-2 px-4 pr-10 border border-gray-300 rounded w-full"
//             />
//             <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 bg-transparent border-0">
//               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
//                 <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
//               </svg>
//             </button>
//           </form>
//         </div>

//         {isLoggedIn ? (
//           <div className="flex items-center gap-2 w-full justify-center py-2">
//             <span className="font-medium">{userReduxStore.name}</span>
//             <div className="cursor-pointer relative" onClick={toggleProfileMenu}>
//               <CgProfile size={24} className="text-[#3b65d9]" />

//               {isProfileMenuOpen && (
//                 <div className="absolute right-0 top-10 bg-white shadow-md rounded py-2 w-48 z-20">
//                   <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile Information</Link>
//                   <button 
//                     onClick={initiateLogout} 
//                     className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         ) : (
//           <div className="flex gap-3 w-full">
//             <Link to="/login" className="py-2 px-4 border border-[#3b65d9] bg-white text-[#3b65d9] rounded font-medium cursor-pointer transition-all hover:bg-blue-50 flex-1 text-center">
//               Login
//             </Link>
//             <Link to="/signup" className="py-2 px-4 border-none bg-[#3b65d9] text-white rounded font-medium cursor-pointer transition-all hover:bg-[#2a50b8] flex-1 text-center">
//               Sign up
//             </Link>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Header;


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetReduxUser, setReduxUser } from './Redux/Slice/userSlice';
import axios from 'axios';
import { CgProfile } from "react-icons/cg";
import App2 from './App2';
import { jwtDecode } from 'jwt-decode';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const[name,setName]=useState(null);
  const[role,setRole]=useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get token from localStorage
  const accessToken = localStorage.getItem("access_token");
 // const userRole = localStorage.getItem("userRole")
  
 const getUserRole = () => {
  const expiry = localStorage.getItem("expiry_date");
  if (!expiry || new Date().getTime() > expiry) {
      localStorage.removeItem("userRole");
      localStorage.removeItem("expiry_date");
      return null;
  }
  return localStorage.getItem("userRole");
};

const userRole=getUserRole();
  // Get user from Redux store
  const userReduxStore = useSelector((store) => store.user.value);

  // Check if user is logged in
  const isLoggedIn = Boolean(userReduxStore?.name);


  
  // Check if user is admin or vendor
  // const isAdminOrVendor = userReduxStore?.role === 'admin' || userReduxStore?.role === 'vendor';
  const isAdminOrVendor = userRole === 'admin' || userRole === 'vendor';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const initiateLogout = () => {
    setShowLogoutConfirm(true);
    // Close the profile menu when showing confirmation
    setIsProfileMenuOpen(false);
  };

  const confirmLogout = () => {
    dispatch(resetReduxUser());
    localStorage.removeItem("userRole")
    localStorage.removeItem("access_token");
    setShowLogoutConfirm(false);
    navigate("/login")
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/product?search_term=" + e.target.search_term.value);
  };



  useEffect(() => {
    // Only fetch user data if token exists
    if (accessToken) {
      axios.get("http://localhost:3000/api/user/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then((response) => {
          console.log("User data fetched:", response.data);
          dispatch(setReduxUser(response.data));
        })
        .catch((error) => {
          console.log("Error fetching user data:", error);
          // If the token is invalid, clear it
          if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            localStorage.removeItem("access_token");
            dispatch(resetReduxUser());
          }
        });
    }
  }, [accessToken, dispatch]);

  // Using ternary operator to conditionally render App2 or the Header component
  return isAdminOrVendor ? (
    <App2 />
  ) : (
    <nav className="flex justify-between items-center px-6 lg:px-24 py-4 bg-customBlue shadow-md">
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
                className="py-2 px-4 bg-[#3b65d9] text-white rounded font-medium hover:bg-[#2a50b8]"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center w-full lg:w-auto">
        <Link to="/" className="text-2xl font-bold text-[#3b65d9] no-underline">Logo</Link>
        <div className="flex flex-col gap-1 cursor-pointer lg:hidden" onClick={toggleMenu}>
          <div className="w-6 h-0.5 bg-gray-800"></div>
          <div className="w-6 h-0.5 bg-gray-800"></div>
          <div className="w-6 h-0.5 bg-gray-800"></div>
        </div>
      </div>

      <ul className={`${isMenuOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row absolute lg:static top-20 left-0 right-0 bg-white lg:bg-transparent gap-0 lg:gap-8 z-10 overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'h-auto py-4 shadow-md' : 'h-0'} lg:h-auto lg:shadow-none`}>
        <li className="w-full lg:w-auto text-center py-4 lg:py-0">
          <Link to="/" className="no-underline text-gray-800 font-medium hover:text-[#3b65d9] transition-colors">Home</Link>
        </li>
        <li className="w-full lg:w-auto text-center py-4 lg:py-0">
          <Link to="/product" className="no-underline text-gray-800 font-medium hover:text-[#3b65d9] transition-colors">Vehicle</Link>
        </li>
        <li className="w-full lg:w-auto text-center py-4 lg:py-0">
          <Link to="/cart" className="no-underline text-gray-800 font-medium hover:text-[#3b65d9] transition-colors">Contact</Link>
        </li>
      </ul>

      {/* Auth and Search Section */}
      <div className="hidden lg:flex flex-row w-auto items-center gap-4">
        {/* Search Input - Always visible */}
        <div className="relative">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              name="search_term"
              placeholder="Search..."
              className="py-2 px-4 pr-10 border border-gray-300 rounded w-56"
            />
            <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 bg-transparent border-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
          </form>
        </div>

        {/* Conditional rendering based on login status */}
        {isLoggedIn ? (
          <div className="flex items-center gap-2 relative">
            <span className="font-medium">{userReduxStore.name}</span>
            <div className="cursor-pointer" onClick={toggleProfileMenu}>
              <CgProfile size={24} className="text-[#3b65d9]" />
            </div>

            {isProfileMenuOpen && (
              <div className="absolute right-0 top-10 bg-white shadow-md rounded py-2 w-48 z-20">
                <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile Information</Link>
                <button
                  onClick={initiateLogout}
                  className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-3">
            <Link to="/login" className="py-2 px-4 border border-[#3b65d9] bg-white text-[#3b65d9] rounded font-medium cursor-pointer transition-all hover:bg-blue-50 text-center">
              Login
            </Link>
            <Link to="/signup" className="py-2 px-4 border-none bg-[#3b65d9] text-white rounded font-medium cursor-pointer transition-all hover:bg-[#2a50b8] text-center">
              Sign up
            </Link>
          </div>
        )}
      </div>

      {/* Mobile menu items (shown when menu is toggled) */}
      <div className={`${isMenuOpen ? 'flex' : 'hidden'} lg:hidden flex-col w-full items-center gap-4 mt-4 absolute top-20 left-0 right-0 bg-white z-10 p-4 shadow-md`}>
        <div className="relative w-full">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              name="search_term"
              placeholder="Search..."
              className="py-2 px-4 pr-10 border border-gray-300 rounded w-full"
            />
            <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 bg-transparent border-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
          </form>
        </div>

        {isLoggedIn ? (
          <div className="flex items-center gap-2 w-full justify-center py-2">
            <span className="font-medium">{userReduxStore.name}</span>
            <div className="cursor-pointer relative" onClick={toggleProfileMenu}>
              <CgProfile size={24} className="text-[#3b65d9]" />

              {isProfileMenuOpen && (
                <div className="absolute right-0 top-10 bg-white shadow-md rounded py-2 w-48 z-20">
                  <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile Information</Link>
                  <button
                    onClick={initiateLogout}
                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex gap-3 w-full">
            <Link to="/login" className="py-2 px-4 border border-[#3b65d9] bg-white text-[#3b65d9] rounded font-medium cursor-pointer transition-all hover:bg-blue-50 flex-1 text-center">
              Login
            </Link>
            <Link to="/signup" className="py-2 px-4 border-none bg-[#3b65d9] text-white rounded font-medium cursor-pointer transition-all hover:bg-[#2a50b8] flex-1 text-center">
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;



