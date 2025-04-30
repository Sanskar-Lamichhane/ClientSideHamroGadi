import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetReduxUser, setReduxUser } from "./Redux/Slice/userSlice";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { RiCarLine } from "react-icons/ri";
import {
  FiSearch,
  FiCalendar,
  FiLogOut,
  FiUser,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { IoCarSportOutline } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import App2 from "./App2";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname;

  // Get token and manage user role
  const accessToken = localStorage.getItem("access_token");

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

  // Get user from Redux store
  const userReduxStore = useSelector((store) => store.user.value);

  // Check if user is logged in
  const isLoggedIn = Boolean(userReduxStore?.name);

  // Check if user is admin or vendor
  const isAdminOrVendor = userRole === "admin" || userRole === "vendor";

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Add this useEffect in your Header component
  useEffect(() => {
    // Scroll to top when location changes
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Close profile menu if open
    if (isProfileMenuOpen) setIsProfileMenuOpen(false);
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

  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://localhost:3000/api/vehicles?search_term=${e.target.search_term.value}`,
      )
      .then((res) => {
        navigate("/product?search_term=" + e.target.search_term.value);
      })
      .catch((err) => {});
  };

  // Check if nav item is active based on pathname
  const isActive = (path) => {
    if (path === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(path);
  };

  // Get nav item classes based on active state
  const getNavItemClasses = (path) => {
    return `flex items-center gap-2 font-medium text-gray-700 hover:text-gray-900 relative py-2 group text-lg ${
      isActive(path) ? "font-bold" : ""
    }`;
  };

  // Get mobile nav item classes based on active state
  const getMobileNavItemClasses = (path) => {
    return `flex items-center gap-3 py-3.5 px-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-lg font-medium ${
      isActive(path) ? "bg-gray-100 font-bold" : ""
    }`;
  };

  useEffect(() => {
    // Fetch user data if token exists
    if (accessToken) {
      axios
        .get("http://localhost:3000/api/user/me", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          dispatch(setReduxUser(response.data));
        })
        .catch((error) => {
          if (
            error.response &&
            (error.response.status === 401 || error.response.status === 403)
          ) {
            localStorage.removeItem("access_token");
            dispatch(resetReduxUser());
          }
        });
    }
  }, [accessToken, dispatch]);

  // Return App2 for admin/vendor users
  if (isAdminOrVendor) {
    return <App2 />;
  }

  // Main navbar for regular users
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 bg-gray-100 shadow-lg py-4 px-10">
      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full transform transition-all">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Confirm Logout
            </h3>
            <p className="mb-6 text-gray-600">
              Are you sure you want to logout from your account?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={cancelLogout}
                className="py-2.5 px-5 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="py-2.5 px-5 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          width: "100%",
          maxWidth: "1400px",
        }}
        className="flex justify-between items-center"
      >
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-blue-500 p-2 rounded-full shadow-md">
              <IoCarSportOutline className="text-white text-2xl" />
            </div>
            <span className="text-2xl font-bold text-gray-800">HamroGadi</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden flex items-center text-gray-700"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-between flex-grow mx-12">
          <ul className="flex space-x-10">
            <li>
              <Link to="/" className={getNavItemClasses("/")}>
                <span className="text-gray-700">Home</span>
                <span
                  className={`absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-300 ${isActive("/") ? "w-full" : "w-0 group-hover:w-full"}`}
                ></span>
              </Link>
            </li>
            <li>
              <Link to="/product" className={getNavItemClasses("/product")}>
                <RiCarLine className="text-gray-700" size={20} />
                <span className="text-gray-700">Vehicles</span>
                <span
                  className={`absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-300 ${isActive("/product") ? "w-full" : "w-0 group-hover:w-full"}`}
                ></span>
              </Link>
            </li>
            <li>
              <Link
                to="/MyBookings/pending"
                className={getNavItemClasses("/MyBookings")}
              >
                <FiCalendar className="text-gray-700" size={18} />
                <span className="text-gray-700">My Bookings</span>
                <span
                  className={`absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-300 ${isActive("/MyBookings") ? "w-full" : "w-0 group-hover:w-full"}`}
                ></span>
              </Link>
            </li>
            <li>
              <Link to="/policy" className={getNavItemClasses("/policy")}>
                <BiSupport className="text-gray-700" size={20} />
                <span className="text-gray-700">Policy</span>
                <span
                  className={`absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-300 ${isActive("/policy") ? "w-full" : "w-0 group-hover:w-full"}`}
                ></span>
              </Link>
            </li>
          </ul>

          {/* Search Input */}
          <div className="relative">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                name="search_term"
                placeholder="Search vehicles..."
                className="py-2.5 pl-10 pr-4 bg-white border border-gray-200 rounded-full w-64 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all"
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                <FiSearch size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Auth Section - Desktop */}
        <div className="hidden lg:flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-3 relative">
              <span className="text-gray-700 font-semibold text-lg">
                {userReduxStore.name}
              </span>
              <div
                onClick={toggleProfileMenu}
                className="relative cursor-pointer bg-blue-500 p-2 rounded-full hover:bg-blue-600 transition-all"
              >
                <CgProfile size={22} className="text-white" />

                {isProfileMenuOpen && (
                  <div className="absolute right-0 top-12 bg-white rounded-lg shadow-xl py-2 w-56 z-20 transform origin-top-right transition-all">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-700">
                        Signed in as
                      </p>
                      <p className="text-sm text-gray-900 font-bold truncate">
                        {userReduxStore.name}
                      </p>
                    </div>
                    <Link
                      to="/profileManagement"
                      className="flex items-center gap-2 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <FiUser size={16} />
                      <span>Profile Information</span>
                    </Link>
                    <button
                      onClick={initiateLogout}
                      className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <FiLogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="py-2.5 px-6 border-2 border-blue-500 text-blue-500 rounded-full font-medium text-base transition-all hover:bg-blue-500 hover:text-white text-center"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="py-2.5 px-6 bg-blue-500 text-white rounded-full font-medium text-base transition-all hover:bg-blue-600 hover:shadow-lg text-center shadow-md"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-white transition-all duration-300 overflow-hidden ${isMenuOpen ? "max-h-screen py-4 opacity-100 shadow-xl" : "max-h-0 py-0 opacity-0"}`}
      >
        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: "2rem",
            paddingRight: "2rem",
            width: "100%",
          }}
        >
          {/* Mobile Search */}
          <div className="relative w-full mb-6 mt-2">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                name="search_term"
                placeholder="Search vehicles..."
                className="py-3 pl-10 pr-4 bg-white border border-gray-200 rounded-lg w-full text-gray-800 placeholder-gray-500 focus:outline-none transition-all"
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                <FiSearch size={18} />
              </button>
            </form>
          </div>

          {/* Mobile Navigation Links */}
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className={getMobileNavItemClasses("/")}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/product"
                className={getMobileNavItemClasses("/product")}
                onClick={() => setIsMenuOpen(false)}
              >
                <RiCarLine size={20} />
                Vehicles
              </Link>
            </li>
            <li>
              <Link
                to="/MyBookings"
                className={getMobileNavItemClasses("/MyBookings")}
                onClick={() => setIsMenuOpen(false)}
              >
                <FiCalendar size={18} />
                My Bookings
              </Link>
            </li>
            <li>
              <Link
                to="/policy"
                className={getMobileNavItemClasses("/cart")}
                onClick={() => setIsMenuOpen(false)}
              >
                <BiSupport size={20} />
                Policy
              </Link>
            </li>
          </ul>

          {/* Mobile Auth */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            {isLoggedIn ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-4 py-2.5 text-gray-700">
                  <CgProfile size={22} />
                  <span className="font-medium text-lg">
                    {userReduxStore.name}
                  </span>
                </div>
                <Link
                  to="/profileManagement"
                  className={`flex items-center gap-3 py-3.5 px-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-lg ${isActive("/profile") ? "bg-gray-100 font-bold" : ""}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiUser size={18} />
                  Profile Information
                </Link>
                <button
                  onClick={() => {
                    initiateLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 py-3.5 px-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors w-full text-left text-lg"
                >
                  <FiLogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 px-4 pt-2">
                <Link
                  to="/login"
                  className="py-3 border-2 border-blue-500 text-blue-500 rounded-lg font-medium text-center hover:bg-blue-500 hover:text-white transition-colors text-base"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="py-3 bg-blue-500 text-white rounded-lg font-medium text-center hover:bg-blue-600 transition-colors shadow-md text-base"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
