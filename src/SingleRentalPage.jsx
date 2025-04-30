
import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Truck,
  DollarSign,
  Tag,
  AlertCircle,
  Check,
  X,
  ChevronRight,
  Mail,
  Phone,
} from "lucide-react";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import placeholder from "./assets/images/inf.png";

const RentalDetailsPage = () => {
  // Fetch user role from localStorage
  const [userRole, setUserRole] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const imageNotFound = placeholder;

  const baseUrl = "http://localhost:3000/api/rental/uploads/";

  // Initialize rentalDetails as null
  const [rentalDetails, setRentalDetails] = useState(null);

  useEffect(() => {
    const getUserRole = () => {
      const expiry = localStorage.getItem("expiry_date");
      if (!expiry || new Date().getTime() > expiry) {
        localStorage.removeItem("userRole");
        localStorage.removeItem("expiry_date");
        return null;
      }
      return localStorage.getItem("userRole");
    };

    const role = getUserRole();
    setUserRole(role);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    axios
      .get(`http://localhost:3000/api/rental/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status && res.status === 200) {
          console.log(res);
          setRentalDetails(res.data.individualRentalDetails[0]);
        }
      })
      .catch((err) => {
        toast.error("Failed to load individual rental details", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      });
  }, [params.id]);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Calculate rental duration in days
  const calculateDuration = () => {
    if (!rentalDetails) return 0;

    const pickup = new Date(rentalDetails.pickUpDateTime);
    const dropoff = new Date(rentalDetails.dropOffDateTime);
    const diffTime = Math.abs(dropoff - pickup);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // State for confirmation popup
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [reasonText, setReasonText] = useState("");
  const [requiresReason, setRequiresReason] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle opening confirmation popup
  const handleConfirmationOpen = (action) => {
    setConfirmationAction(action);

    // Set appropriate message based on action
    switch (action) {
      case "approve":
        setConfirmationMessage("Do you really want to approve this vehicle?");
        setRequiresReason(false);
        break;
      case "reject":
        setConfirmationMessage("Are you sure you want to reject this rental?");
        setRequiresReason(true);
        break;
      case "cancel":
        setConfirmationMessage("Are you sure you want to cancel this rental?");
        setRequiresReason(true);
        break;
      case "inTrip":
        setConfirmationMessage("Are you sure to start the trip?");
        setRequiresReason(false);
        break;
      case "complete":
        setConfirmationMessage("Are you sure you completed your trip?");
        setRequiresReason(false);
        break;
      default:
        setConfirmationMessage("Are you sure?");
        setRequiresReason(false);
    }

    setShowConfirmationPopup(true);
  };

  // Handle confirmation action
  const handleConfirmAction = () => {
    const token = localStorage.getItem("access_token");
    setIsSubmitting(true);

    // Handle different API calls based on the action
    if (confirmationAction === "cancel") {
      // For cancellation, use the specific cancellation API
      axios
        .put(
          `http://localhost:3000/api/rental/${params.id}/cancel`,
          {
            cancellation_message: reasonText,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          if (res.status === 200) {
            toast.success("Rental has been cancelled successfully", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
            // Update local state to reflect the change
            setRentalDetails((prev) => ({
              ...prev,
              status: "Cancelled",
              cancellation_message: reasonText,
            }));
            if (userRole === "customer") {
              navigate("/MyBookings/cancelled");
              return;
            }
            navigate("/cancelledVehicleList");
          }
        })
        .catch((err) => {
          toast.error(
            err.response?.data?.message || "Failed to cancel rental",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            },
          );
        })
        .finally(() => {
          setIsSubmitting(false);
          setShowConfirmationPopup(false);
          setReasonText("");
        });
    } else {
      // For all other status changes, use the status change API
      const newStatus = (() => {
        switch (confirmationAction) {
          case "approve":
            return "Approved";
          case "reject":
            return "Rejected";
          case "inTrip":
            return "In Trip";
          case "complete":
            return "Completed";
          default:
            return "";
        }
      })();

      // Prepare request body based on whether reason is required
      const requestBody =
        confirmationAction === "reject"
          ? { status: newStatus, rejection_message: reasonText }
          : { status: newStatus };

      axios
        .put(
          `http://localhost:3000/api/rental/${params.id}/status`,
          requestBody,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          if (res.status === 200) {
            toast.success(`Rental status has been updated to ${newStatus}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });

            // Update local state to reflect the change
            setRentalDetails((prev) => ({
              ...prev,
              status: newStatus,
              ...(confirmationAction === "reject" && {
                rejection_message: reasonText,
              }),
            }));
            if (newStatus === "Approved") {
              navigate("/approvedVehicleList");
            }
            if (newStatus === "In Trip") {
              navigate("/intripVehicleList");
            }
            if (newStatus === "Completed") {
              navigate("/completedVehicleList");
            }
          }
        })
        .catch((err) => {
          toast.error(
            err.response?.data?.message || "Failed to update rental status",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            },
          );
        })
        .finally(() => {
          setIsSubmitting(false);
          setShowConfirmationPopup(false);
          setReasonText("");
        });
    }
  };

  // Handle cancellation of confirmation
  const handleCancelConfirmation = () => {
    setShowConfirmationPopup(false);
    setReasonText("");
  };

  const getStatusColor = (status) => {
    if (!status) return "bg-gray-100 text-gray-800 border-l-4 border-gray-500";

    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800 border-l-4 border-green-500";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500";
      case "in trip":
        return "bg-blue-100 text-blue-800 border-l-4 border-blue-500";
      case "completed":
        return "bg-purple-100 text-purple-800 border-l-4 border-purple-500";
      case "cancelled":
        return "bg-red-100 text-red-800 border-l-4 border-red-500";
      case "rejected":
        return "bg-gray-100 text-gray-800 border-l-4 border-gray-500";
      default:
        return "bg-gray-100 text-gray-800 border-l-4 border-gray-500";
    }
  };

  const getStatusIcon = (status) => {
    if (!status) return <AlertCircle className="text-gray-600" size={20} />;

    switch (status.toLowerCase()) {
      case "approved":
        return <Check className="text-green-600" size={20} />;
      case "pending":
        return <Clock className="text-yellow-600" size={20} />;
      case "in trip":
        return <Truck className="text-blue-600" size={20} />;
      case "completed":
        return <Check className="text-purple-600" size={20} />;
      case "cancelled":
        return <X className="text-red-600" size={20} />;
      case "rejected":
        return <X className="text-gray-600" size={20} />;
      default:
        return <AlertCircle className="text-gray-600" size={20} />;
    }
  };

  // If userRole is still loading or rentalDetails is not loaded yet, show loading state
  if (userRole === null || rentalDetails === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  // Safely get status
  const currentStatus = rentalDetails.status || "";

  return (
    <div
      className={`bg-gray-50 min-h-screen p-4 ${userRole === "customer" ? "mt-20" : ""}`}
    >
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Rental Details</h1>
          <div className="text-sm text-gray-500">
            Rental ID: <span className="font-mono">{rentalDetails._id}</span>
          </div>
        </header>

        {/* Status Banner */}
        <div
          className={`w-full p-4 rounded-t-lg ${getStatusColor(currentStatus)}`}
        >
          <div className="flex items-center">
            <div className="mr-3">{getStatusIcon(currentStatus)}</div>
            <div>
              <div className="font-semibold">{currentStatus}</div>
              {currentStatus.toLowerCase() === "cancelled" &&
                rentalDetails.cancellation_message && (
                  <div className="text-sm mt-1">
                    Reason: {rentalDetails.cancellation_message}
                  </div>
                )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-b-lg shadow overflow-hidden mb-6">
          {/* Timeline */}
          <div className="border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-1">
                  <Calendar size={20} className="text-blue-600" />
                </div>
                <div className="text-xs font-medium">Booking</div>
              </div>
              <div className="flex-1 h-0.5 bg-gray-200 mx-2"></div>
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${
                    currentStatus.toLowerCase() === "pending" ||
                    currentStatus.toLowerCase() === "approved" ||
                    currentStatus.toLowerCase() === "in trip" ||
                    currentStatus.toLowerCase() === "completed"
                      ? "bg-blue-100"
                      : "bg-gray-100"
                  }`}
                >
                  <Check
                    size={20}
                    className={
                      currentStatus.toLowerCase() === "pending" ||
                      currentStatus.toLowerCase() === "approved" ||
                      currentStatus.toLowerCase() === "in trip" ||
                      currentStatus.toLowerCase() === "completed"
                        ? "text-blue-600"
                        : "text-gray-400"
                    }
                  />
                </div>
                <div className="text-xs font-medium">Approval</div>
              </div>
              <div className="flex-1 h-0.5 bg-gray-200 mx-2"></div>
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${
                    currentStatus.toLowerCase() === "in trip" ||
                    currentStatus.toLowerCase() === "completed"
                      ? "bg-blue-100"
                      : "bg-gray-100"
                  }`}
                >
                  <Truck
                    size={20}
                    className={
                      currentStatus.toLowerCase() === "in trip" ||
                      currentStatus.toLowerCase() === "completed"
                        ? "text-blue-600"
                        : "text-gray-400"
                    }
                  />
                </div>
                <div className="text-xs font-medium">In Trip</div>
              </div>
              <div className="flex-1 h-0.5 bg-gray-200 mx-2"></div>
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${
                    currentStatus.toLowerCase() === "completed"
                      ? "bg-blue-100"
                      : "bg-gray-100"
                  }`}
                >
                  <Check
                    size={20}
                    className={
                      currentStatus.toLowerCase() === "completed"
                        ? "text-blue-600"
                        : "text-gray-400"
                    }
                  />
                </div>
                <div className="text-xs font-medium">Completed</div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-12 gap-6 p-6">
            {/* Left Column: Vehicle Image */}
            <div className="md:col-span-4">
              <div className="bg-gray-50 rounded-lg overflow-hidden mb-4">
                <div className="relative">
                  <img
                    src={
                      rentalDetails.vehicle.images &&
                      rentalDetails.vehicle.images.length > 0
                        ? `http://localhost:3000/uploads/${rentalDetails.vehicle.images[0]}`
                        : placeholder
                    }
                    alt="Vehicle"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-black bg-opacity-60 text-white px-3 py-1 m-2 rounded-full text-xs">
                    {rentalDetails.vehicle.vehicle_type.categoryName}
                  </div>
                </div>
              </div>

              {/* Driver Details */}
              {rentalDetails.vehicle.driver && (
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <div className="bg-blue-50 p-3 border-b border-blue-100">
                    <h3 className="font-medium flex items-center gap-2">
                      <User size={16} className="text-blue-600" />
                      <span>Driver Information</span>
                    </h3>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User size={20} className="text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium">
                          {rentalDetails.vehicle.driver.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {rentalDetails.vehicle.driver.noOfExperience} years
                          experience
                        </div>
                      </div>
                    </div>
                    <div className="text-sm border-t border-gray-100 pt-3">
                      <div className="flex items-center gap-2 text-blue-600 hover:underline cursor-pointer">
                        <span>{rentalDetails.vehicle.driver.phoneNumber}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Center/Right Column: Vehicle Info and Trip Details */}
            <div className="md:col-span-8">
              {/* Vehicle Information Table */}
              <div className="bg-gray-50 rounded-lg overflow-hidden mb-4">
                <div className="bg-blue-50 p-3 border-b border-blue-100">
                  <h3 className="font-medium flex items-center gap-2">
                    <Truck size={16} className="text-blue-600" />
                    <span>Vehicle Information</span>
                  </h3>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-3">
                    {rentalDetails.vehicle.make.brandName}{" "}
                    {rentalDetails.vehicle.model}{" "}
                    <span className="text-sm bg-gray-200 px-2 py-1 rounded ml-2">
                      {rentalDetails.vehicle.year}
                    </span>
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <tbody>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-3 text-gray-500 w-1/3">
                            Registration Number
                          </td>
                          <td className="py-2 px-3">
                            {rentalDetails.vehicle.registration_number}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-3 text-gray-500">Color</td>
                          <td className="py-2 px-3">
                            {rentalDetails.vehicle.color}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-3 text-gray-500">Capacity</td>
                          <td className="py-2 px-3">
                            {rentalDetails.vehicle.capacity} seats
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-3 text-gray-500">Fuel Type</td>
                          <td className="py-2 px-3">
                            {rentalDetails.vehicle.fuel_type}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-3 text-gray-500">
                            Transmission
                          </td>
                          <td className="py-2 px-3">
                            {rentalDetails.vehicle.transmission}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 text-gray-500">City</td>
                          <td className="py-2 px-3">
                            {rentalDetails.vehicle.city}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Trip Details Table */}
              <div className="bg-gray-50 rounded-lg overflow-hidden mb-4">
                <div className="bg-blue-50 p-3 border-b border-blue-100">
                  <h3 className="font-medium flex items-center gap-2">
                    <Calendar size={16} className="text-blue-600" />
                    <span>Trip Details</span>
                  </h3>
                </div>
                <div className="p-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <tbody>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-3 text-gray-500 w-1/3">
                            Pick Up Date & Time
                          </td>
                          <td className="py-2 px-3">
                            {formatDate(rentalDetails.pickUpDateTime)}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-3 text-gray-500">
                            Pick Up Location
                          </td>
                          <td className="py-2 px-3">
                            {rentalDetails.pickUpLocation}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-3 text-gray-500">
                            Drop Off Date & Time
                          </td>
                          <td className="py-2 px-3">
                            {formatDate(rentalDetails.dropOffDateTime)}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-3 text-gray-500">
                            Drop Off Location
                          </td>
                          <td className="py-2 px-3">
                            {rentalDetails.dropOffLocation}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-3 text-gray-500">Duration</td>
                          <td className="py-2 px-3">
                            {calculateDuration()} day
                            {calculateDuration() > 1 ? "s" : ""}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 text-gray-500">
                            Journey Details
                          </td>
                          <td className="py-2 px-3">
                            {rentalDetails.journey_details}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-gray-50 rounded-lg overflow-hidden mb-4">
                <div className="bg-blue-50 p-3 border-b border-blue-100">
                  <h3 className="font-medium flex items-center gap-2">
                    <DollarSign size={16} className="text-blue-600" />
                    <span>Payment Summary</span>
                  </h3>
                </div>
                <div className="p-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <tbody>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-3 text-gray-500 w-1/3">
                            Rate Per Day
                          </td>
                          <td className="py-2 px-3">
                            NPR {rentalDetails.per_day.toLocaleString()}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-3 text-gray-500">Duration</td>
                          <td className="py-2 px-3">
                            {calculateDuration()} day
                            {calculateDuration() > 1 ? "s" : ""}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 text-gray-500 font-medium">
                            Total Amount
                          </td>
                          <td className="py-2 px-3 font-medium">
                            NPR {rentalDetails.price.toLocaleString()}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    *Prices include taxes and insurance
                  </div>
                </div>
              </div>

              {/* Contact Information - Conditionally shown based on role */}
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <div className="bg-blue-50 p-3 border-b border-blue-100">
                  <h3 className="font-medium flex items-center gap-2">
                    <User size={16} className="text-blue-600" />
                    <span>Contact Information</span>
                  </h3>
                </div>
                <div className="p-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Admin sees both customer and vendor info */}
                    {userRole === "admin" && (
                      <>
                        <div className="bg-white p-3 rounded-lg border border-gray-100">
                          <h4 className="text-sm font-medium mb-2">
                            Customer Contact
                          </h4>
                          <div className="space-y-1 text-sm">
                            <div className="font-medium">
                              {rentalDetails.customer.name}
                            </div>
                            <div className="text-gray-600">
                              {rentalDetails.customer.email}
                            </div>
                            <div className="text-gray-600">
                              {rentalDetails.customer.phoneNumber}
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-3 rounded-lg border border-gray-100">
                          <h4 className="text-sm font-medium mb-2">
                            Vendor Contact
                          </h4>
                          <div className="space-y-1 text-sm">
                            <div className="font-medium">
                              {rentalDetails.vendor.name}
                            </div>
                            <div className="text-gray-600">
                              {rentalDetails.vendor.email}
                            </div>
                            <div className="text-gray-600">
                              {rentalDetails.vendor.phoneNumber}
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Vendor only sees customer info */}
                    {userRole === "vendor" && (
                      <div className="bg-white p-3 rounded-lg border border-gray-100">
                        <h4 className="text-sm font-medium mb-2">
                          Customer Contact
                        </h4>
                        <div className="space-y-1 text-sm">
                          <div className="font-medium">
                            {rentalDetails.customer.name}
                          </div>
                          <div className="text-gray-600">
                            {rentalDetails.customer.email}
                          </div>
                          <div className="text-gray-600">
                            {rentalDetails.customer.phoneNumber}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Customer only sees vendor info */}
                    {userRole === "customer" && (
                      <div className="bg-white p-3 rounded-lg border border-gray-100">
                        <h4 className="text-sm font-medium mb-2">
                          Vendor Contact
                        </h4>
                        <div className="space-y-1 text-sm">
                          <div className="font-medium">
                            {rentalDetails.vendor.name}
                          </div>
                          <div className="text-gray-600">
                            {rentalDetails.vendor.email}
                          </div>
                          <div className="text-gray-600">
                            {rentalDetails.vendor.phoneNumber}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions section - role-based visibility */}
          <div className="p-6 pt-0">
            <div className="flex flex-wrap gap-2">
              {/* For Pending status */}
              {currentStatus.toLowerCase() === "pending" && (
                <>
                  {/* Approve button for vendor only */}
                  {userRole === "vendor" && (
                    <button
                      onClick={() => handleConfirmationOpen("approve")}
                      className="flex-1 py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center gap-2"
                    >
                      <Check size={16} />
                      Approve Rental
                    </button>
                  )}

                  {/* Reject button for vendor only */}
                  {userRole === "vendor" && (
                    <button
                      onClick={() => handleConfirmationOpen("reject")}
                      className="flex-1 py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 flex items-center justify-center gap-2"
                    >
                      <X size={16} />
                      Reject Rental
                    </button>
                  )}

                  {/* Cancel button for customer and admin */}
                  {(userRole === "customer" || userRole === "admin") && (
                    <button
                      onClick={() => handleConfirmationOpen("cancel")}
                      className="flex-1 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center justify-center gap-2"
                    >
                      <X size={16} />
                      Cancel Rental
                    </button>
                  )}
                </>
              )}

              {/* For Approved status */}
              {currentStatus.toLowerCase() === "approved" && (
                <>
                  {/* Mark as In Trip button for vendor only */}
                  {userRole === "vendor" && (
                    <button
                      onClick={() => handleConfirmationOpen("inTrip")}
                      className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
                    >
                      <Truck size={16} />
                      Mark as In Trip
                    </button>
                  )}

                  {/* Cancel button for customer and admin */}
                  {(userRole === "customer" || userRole === "admin") && (
                    <button
                      onClick={() => handleConfirmationOpen("cancel")}
                      className="flex-1 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center justify-center gap-2"
                    >
                      <X size={16} />
                      Cancel Rental
                    </button>
                  )}
                </>
              )}

              {/* For In Trip status */}
              {currentStatus.toLowerCase() === "in trip" && (
                <>
                  {/* Mark as Completed button for vendor only */}
                  {userRole === "vendor" && (
                    <button
                      onClick={() => handleConfirmationOpen("complete")}
                      className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center justify-center gap-2"
                    >
                      <Check size={16} />
                      Mark as Completed
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Confirmation Popup */}
        {showConfirmationPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-md mx-4 overflow-hidden">
              <div className="bg-gray-50 p-4 border-b">
                <h3 className="font-medium">Confirm Action</h3>
              </div>
              <div className="p-4">
                <p className="mb-4">{confirmationMessage}</p>

                {requiresReason && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Please provide a reason:
                    </label>
                    <textarea
                      value={reasonText}
                      onChange={(e) => setReasonText(e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2 text-sm"
                      rows={3}
                      placeholder="Enter your reason here..."
                    />
                  </div>
                )}

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={handleCancelConfirmation}
                    className="py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmAction}
                    className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    disabled={
                      isSubmitting || (requiresReason && !reasonText.trim())
                    }
                  >
                    {isSubmitting ? "Processing..." : "Confirm"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RentalDetailsPage;
