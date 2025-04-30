import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import Pagination from "rc-pagination";

// Define the base API URL
const API_BASE_URL = "http://localhost:3000"; // Change this to your actual API base URL

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    perPage: 10,
    total: 0,
    sortDirection: "desc",
  });

  // Per page options
  const perPageOptions = [5, 10, 25, 50];

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

  // Fetch notifications based on user role
  const fetchNotifications = async (page = 1, perPage = 10) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");

      if (!token) {
        throw new Error("Authentication required");
      }

      // Use the appropriate API endpoint based on user role with full URL
      const endpoint =
        userRole === "admin"
          ? `${API_BASE_URL}/api/admin/allNotification`
          : `${API_BASE_URL}/api/vendor/getVendorNotification`;

      const response = await axios.get(endpoint, {
        params: {
          page,
          per_page: perPage,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotifications(response.data.data);
      console.log(response.data.data);
      setPagination({
        currentPage: response.data.meta_data.current_page,
        totalPages: response.data.meta_data.total_pages,
        perPage: response.data.meta_data.per_page,
        total: response.data.meta_data.total,
        sortDirection: response.data.meta_data.sort_direction,
      });
      setError(null);
    } catch (err) {
      console.error("API Error:", err);
      setError(err.response?.data?.message || "Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  };

  // Toggle notification read status
  const toggleReadStatus = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem("access_token");

      // Updated URL for toggling read status
      await axios.put(
        `${API_BASE_URL}/api/notification/${id}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Update the local state to reflect the change
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === id
            ? { ...notification, isRead: !currentStatus }
            : notification,
        ),
      );
    } catch (err) {
      setError(
        err.response?.data?.message || `Failed to update notification status`,
      );
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    fetchNotifications(page, pagination.perPage);
  };

  // Handle per page change
  const handlePerPageChange = (e) => {
    const newPerPage = parseInt(e.target.value);
    fetchNotifications(1, newPerPage);
  };

  // Initial fetch
  // useEffect(() => {
  //   if (userRole) {
  //     fetchNotifications();
  //   }
  // }, [userRole]);

  // Add this new function to mark all notifications as read
  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem("access_token");

      // Assuming you have an endpoint to mark all notifications as read
      await axios.put(
        `${API_BASE_URL}/api/notification/markAllAsRead`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Update local state to reflect all notifications as read
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({
          ...notification,
          isRead: true,
        })),
      );
    } catch (err) {
      console.error("Failed to mark all notifications as read:", err);
      // Don't show an error to the user for this background operation
    }
  };

  // Modify your useEffect to call this function when the component mounts
  useEffect(() => {
    if (userRole) {
      fetchNotifications(pagination.currentPage, pagination.perPage).then(
        () => {
          // Mark all fetched notifications as read
          markAllAsRead();
        },
      );
    }
  }, []); // Only run when the component mounts or user role changes

  // If user is not authenticated, show login message
  if (!userRole) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-8 bg-red-50 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Authentication Required
          </h2>
          <p>Please log in to view your notifications.</p>
        </div>
      </div>
    );
  }

  // Custom item renderer for RC Pagination
  const itemRender = (current, type, element) => {
    if (type === "page") {
      return (
        <button
          className={`px-3 py-1 mx-1 rounded ${current === pagination.currentPage ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
        >
          {current}
        </button>
      );
    }
    if (type === "prev") {
      return (
        <button className="px-3 py-1 mx-1 rounded bg-gray-100 hover:bg-gray-200 disabled:bg-gray-200 disabled:text-gray-500">
          Previous
        </button>
      );
    }
    if (type === "next") {
      return (
        <button className="px-3 py-1 mx-1 rounded bg-gray-100 hover:bg-gray-200 disabled:bg-gray-200 disabled:text-gray-500">
          Next
        </button>
      );
    }
    if (type === "jump-prev" || type === "jump-next") {
      return (
        <button className="px-3 py-1 mx-1 rounded bg-gray-100 hover:bg-gray-200">
          ...
        </button>
      );
    }
    return element;
  };

  // Helper function to get user name or email based on user role
  const getUserInfo = (notification) => {
    if (userRole === "admin" && notification.user) {
      // For admin, user is an object with properties
      return notification.user.name || notification.user.email;
    } else if (userRole === "vendor" && notification.user) {
      // For vendor, user might be just an ID string
      return typeof notification.user === "string"
        ? notification.user
        : notification.user.name || notification.user.email;
    }
    return "";
  };

  // Helper function to get notification type color
  const getNotificationTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "new":
        return "bg-purple-100 text-purple-800 border-purple-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  // Helper function to get notification icon
  const getNotificationIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "approved":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-green-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "cancelled":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "pending":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-yellow-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "completed":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "new":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-purple-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path
              fillRule="evenodd"
              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        );
    }
  };

  // Helper function to highlight keywords in notification description
  const highlightDescription = (text) => {
    if (!text) return "";

    // Keywords to highlight
    const keywords = [
      "approved",
      "cancelled",
      "pending",
      "completed",
      "vehicle",
      "rental",
    ];

    // Split text into parts based on keywords
    let parts = [text];

    keywords.forEach((keyword) => {
      let newParts = [];
      parts.forEach((part) => {
        if (typeof part === "string") {
          const regex = new RegExp(`(${keyword})`, "gi");
          const splitParts = part.split(regex);

          splitParts.forEach((subPart, i) => {
            if (subPart.toLowerCase() === keyword.toLowerCase()) {
              newParts.push(
                <span
                  key={`${subPart}-${i}`}
                  className="font-medium text-blue-700"
                >
                  {subPart}
                </span>,
              );
            } else if (subPart) {
              newParts.push(subPart);
            }
          });
        } else {
          newParts.push(part);
        }
      });
      parts = newParts;
    });

    return parts;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Your Notifications
            </h1>
            <p className="text-gray-600 mt-1">
              Stay updated with your latest activity
            </p>
          </div>
          <div className="flex items-center">
            <div className="flex items-center bg-white rounded-md shadow-sm p-1">
              <label
                htmlFor="perPage"
                className="ml-2 mr-2 text-gray-700 text-sm"
              >
                Show:
              </label>
              <select
                id="perPage"
                value={pagination.perPage}
                onChange={handlePerPageChange}
                className="p-2 bg-white text-gray-800 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded"
              >
                {perPageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-6 rounded-lg shadow-sm border border-red-200 text-red-700 mb-6">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {error}
          </div>
        </div>
      ) : notifications.length === 0 ? (
        <div className="bg-white p-12 rounded-lg shadow-sm text-center border border-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <p className="text-xl text-gray-600 mb-2">No notifications yet</p>
          <p className="text-gray-500">
            We'll notify you when there's activity on your account
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <li
                key={notification._id}
                className={`hover:bg-gray-50 transition duration-150 relative ${!notification.isRead ? "bg-blue-50" : ""}`}
              >
                {/* Indicator for unread notifications */}
                {!notification.isRead && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                )}
                <div className="p-5 pl-6">
                  <div className="flex justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <div className="mr-2">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium mr-2 border ${getNotificationTypeColor(notification.type)}`}
                        >
                          {notification.type || "Notification"}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {format(
                            new Date(notification.createdAt),
                            "MMM dd, yyyy • HH:mm",
                          )}
                        </span>
                      </div>
                      <p className="text-gray-800 mb-3 text-base leading-relaxed">
                        {highlightDescription(notification.description)}
                      </p>
                      <div className="flex items-center text-sm">
                        {userRole === "admin" && notification.user && (
                          <div className="flex items-center text-gray-600">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            <span>{getUserInfo(notification)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          toggleReadStatus(
                            notification._id,
                            notification.isRead,
                          )
                        }
                        className={`text-sm px-3 py-1 rounded-md ${notification.isRead ? "text-blue-600 hover:bg-blue-50" : "text-gray-600 hover:bg-gray-100"}`}
                      >
                        {notification.isRead
                          ? "Mark as unread"
                          : "Mark as read"}
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* RC Pagination - Only show when total exceeds per page */}
      {pagination.total > pagination.perPage && (
        <div className="flex justify-center mt-8">
          <Pagination
            current={pagination.currentPage}
            total={pagination.total}
            pageSize={pagination.perPage}
            onChange={handlePageChange}
            itemRender={itemRender}
            showTitle={false}
            className="flex items-center"
          />
        </div>
      )}

      {notifications.length > 0 && (
        <div className="mt-4 text-sm text-gray-500 text-center">
          Showing {notifications.length} of {pagination.total} notifications
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
