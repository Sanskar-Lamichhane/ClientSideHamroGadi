
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import placeholderImage from "./assets/images/inf.png"; // Import your placeholder image

const VehicleDetailsPage = () => {
  const { id } = useParams();
  const [vehicleData, setVehicleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(2);
  const navigate = useNavigate();

  // Add state for trip dates and times
  const [tripStartDate, setTripStartDate] = useState("");
  const [tripStartTime, setTripStartTime] = useState("");
  const [tripEndDate, setTripEndDate] = useState("");
  const [tripEndTime, setTripEndTime] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [journeyDetails, setJourneyDetails] = useState(""); // Added journey details state

  // Add state for confirmation popup
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [rentalSummary, setRentalSummary] = useState({
    days: 0,
    totalPrice: 0,
    startDateTime: "",
    endDateTime: "",
  });

  // Add loading states for buttons
  const [bookingLoading, setBookingLoading] = useState(false);
  const [confirmationLoading, setConfirmationLoading] = useState(false);

  const noImagePlaceholder = placeholderImage;

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/vehicles/${id}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch vehicle data");
        }

        const data = await response.json();
        setVehicleData(data.vehicle);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching vehicle data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchVehicleData();
  }, [id]);

  // Calculate average rating
  const calculateAverageRating = () => {
    if (!vehicleData?.reviews || vehicleData.reviews.length === 0) return 0;
    const totalRating = vehicleData.reviews.reduce(
      (sum, review) => sum + review.rating,
      0,
    );
    return (totalRating / vehicleData.reviews.length).toFixed(1);
  };

  // Inside VehicleDetailsPage component

  // Add state for validation errors
  const [reviewError, setReviewError] = useState("");
  // Add a key for forcing remount
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchVehicleData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/vehicles/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch vehicle data");
      }

      const data = await response.json();
      if (data.vehicle?.images) {
        // Fix: Correct the map function parameters
        data.vehicle.images = data.vehicle.images.map((image, index) => {
          return `http://localhost:3000/uploads/${image}`;
        });
        console.log(data.vehicle.images);
      }
      setVehicleData(data.vehicle);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching vehicle data:", err);
      setError(err.message);
      setLoading(false);
    }
  };
  // In the useEffect, just call this function
  useEffect(() => {
    fetchVehicleData();
  }, [id, refreshKey]); // Add refreshKey as a dependency

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const token=localStorage.getItem("access_token");
  

    // Validate the form
    if (rating === 0 || reviewText.trim() === "") {
      setReviewError("Please provide both a rating and review text");
      return;
    }

    // Clear any previous errors
    setReviewError("");

    try {
      // Prepare review data
      const reviewData = {
        rating: rating,
        comment: reviewText,
      };

      // Make API call to submit review
      const response = await axios.put(
        `http://localhost:3000/api/vehicles/${vehicleData._id}/reviews`,
        reviewData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        },
      );

      // Log the complete response in development
      console.log("Review submitted successfully:", response.data);

      // Show toast notification with the message
      toast.success(response.data.message, {
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

      // Reset form after submission
      setReviewText("");
      setRating(0);

      // Refresh vehicle data to show the new review
      // Option 1: Force a component remount by changing the refresh key
      setRefreshKey((oldKey) => oldKey + 1);

      // Option 2: Fetch fresh data without remounting
      fetchVehicleData();
    } catch (error) {
      console.error("Error submitting review:", error);
      if(!token){
        toast.error("You need to login first to provide review to vehicle", {
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
        return;
      }

      // Show error toast
      toast.error(error.response?.data?.message || "Failed to submit review", {
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

      setReviewError(
        error.response?.data?.message || "Failed to submit review",
      );

      // Even on error, we might want to refresh the data
      fetchVehicleData();
    }
  };

  // Image rendering helper function
  const renderImage = (imagePath, altText, className) => {
    if (imagePath) {
      return <img src={imagePath} alt={altText} className={className} />;
    } else {
      return (
        <img
          src={noImagePlaceholder}
          alt="Image not available"
          className={className}
        />
      );
    }
  };

  // Calculate rental duration and total price
  const calculateRental = () => {
    if (!tripStartDate || !tripStartTime || !tripEndDate || !tripEndTime) {
      return null;
    }

    const startDateTime = new Date(`${tripStartDate}T${tripStartTime}`);
    const endDateTime = new Date(`${tripEndDate}T${tripEndTime}`);

    // Calculate duration in hours
    const durationInHours = (endDateTime - startDateTime) / (1000 * 60 * 60);

    // Calculate days based on 24-hour periods
    const days = Math.ceil(durationInHours / 24);

    // Calculate total price
    const totalPrice = days * parseFloat(vehicleData.price_per_day);

    // Format dates for display
    const formattedStartDate = startDateTime.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const formattedEndDate = endDateTime.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return {
      days,
      totalPrice,
      startDateTime: formattedStartDate,
      endDateTime: formattedEndDate,
      rawStartDateTime: startDateTime,
      rawEndDateTime: endDateTime,
    };
  };

  // Handle booking confirmation
  const handleBookNowClick = () => {
    const role = localStorage.getItem("userRole");
    if (role != "customer") {
      navigate("/login");
      return;
    }
    const rentalDetails = calculateRental();
    if (!rentalDetails) {
      alert("Please select valid pickup and return dates/times");
      return;
    }

    if (!pickupLocation || !dropoffLocation) {
      alert("Please enter pickup and drop-off locations");
      return;
    }

    if (!journeyDetails) {
      alert("Please enter journey details");
      return;
    }

    // Show loading spinner on button
    setBookingLoading(true);

    // Simulate a delay before showing the confirmation popup
    setTimeout(() => {
      setRentalSummary(rentalDetails);
      setShowConfirmationPopup(true);
      setBookingLoading(false);
    }, 1000);
  };

  // Handle showing more reviews
  const handleShowMoreReviews = () => {
    setVisibleReviews(visibleReviews + 2);
  };

  // Image Popup Component
  const ImagePopup = () => {
    if (!showImagePopup) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-xl font-semibold">All Images</h3>
            <button
              onClick={() => setShowImagePopup(false)}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {vehicleData.images && vehicleData.images.length > 0 ? (
              vehicleData.images.map((image, index) => (
                <div key={index} className="aspect-square">
                  {renderImage(
                    image,
                    `${vehicleData.model} image ${index + 1}`,
                    "w-full h-full object-cover rounded",
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">No images available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Inside the BookingConfirmationPopup component, modify the confirmation button click handler:
  const BookingConfirmationPopup = () => {
    if (!showConfirmationPopup) return null;

    // Function to handle booking submission
    const handleBookingConfirmation = async () => {
      setConfirmationLoading(true);

      try {
        // Create simplified rental object with only the required fields
        const rentalData = {
          vehicle: id, // From useParams
          price: rentalSummary.totalPrice,
          per_day: parseFloat(vehicleData.price_per_day),
          pickUpLocation: pickupLocation,
          dropOffLocation: dropoffLocation,
          pickUpDateTime: rentalSummary.rawStartDateTime,
          dropOffDateTime: rentalSummary.rawEndDateTime,
          journey_details: journeyDetails, // Use the user-entered journey details
        };

        // Simulate a delay before processing
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Make API call to create the rental using axios
        const response = await axios.post(
          `http://localhost:3000/api/rental/${rentalData.vehicle}`,
          rentalData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Assuming you use token-based auth
            },
          },
        );

        // Close popup and show success message
        setShowConfirmationPopup(false);
        toast.success(
          "Booking submitted successfully! Your booking status is pending",
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
        navigate(`/rentalConfirmation/${response.data.rental._id}`);
      } catch (error) {
        console.error("Error creating booking:", error);
        // Axios error handling - error.response contains the server response for error status codes
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to create booking";
        toast.error(errorMessage, {
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
      } finally {
        setConfirmationLoading(false);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-lg w-full overflow-hidden shadow-xl">
          {/* Header with vehicle image */}
          <div className="relative h-32 bg-blue-600 overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              {renderImage(
                vehicleData.images && vehicleData.images.length > 0
                  ? vehicleData.images[0]
                  : null,
                `${vehicleData.model}`,
                "w-full h-full object-cover",
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 opacity-80"></div>
            <div className="relative p-6 flex items-center h-full">
              <div>
                <h3 className="text-2xl font-bold text-white">
                  Confirm Booking
                </h3>
                <p className="text-blue-100">
                  {vehicleData.model} ({vehicleData.year})
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowConfirmationPopup(false)}
              className="absolute right-4 top-4 text-white hover:text-gray-200 text-xl"
              disabled={confirmationLoading}
            >
              &times;
            </button>
          </div>

          {/* Booking Summary */}
          <div className="p-6">
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2 text-gray-800">
                Are you sure you want to rent this vehicle?
              </h4>
              <p className="text-gray-600 text-sm mb-4">
                Please review your booking details below.
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium">
                  {rentalSummary.days} day{rentalSummary.days !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Pickup</span>
                <span className="font-medium">
                  {rentalSummary.startDateTime}
                </span>
              </div>

              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Return</span>
                <span className="font-medium">{rentalSummary.endDateTime}</span>
              </div>

              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Pickup Location</span>
                <span className="font-medium">{pickupLocation}</span>
              </div>

              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Drop-off Location</span>
                <span className="font-medium">{dropoffLocation}</span>
              </div>

              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Daily Rate</span>
                <span className="font-medium">
                  {vehicleData.currency_type} {vehicleData.price_per_day}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-gray-800 font-bold">Total Price</span>
                <span className="text-xl font-bold text-blue-600">
                  {vehicleData.currency_type}{" "}
                  {rentalSummary.totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowConfirmationPopup(false)}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
                disabled={confirmationLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleBookingConfirmation}
                className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center"
                disabled={confirmationLoading}
              >
                {confirmationLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Helper to get today's date in YYYY-MM-DD format for min attribute
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Function to capitalize first letter of each word
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  if (!vehicleData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-500 text-xl">No vehicle data found</div>
      </div>
    );
  }

  const averageRating = calculateAverageRating();
  const hasMoreImages = vehicleData.images && vehicleData.images.length > 3;
  const hasMoreReviews =vehicleData.reviews && vehicleData.reviews.length > visibleReviews;

  return (
    <div className="max-w-6xl mx-auto mt-24 p-4 bg-gray-50">
      {/* Image Popup */}
      <ImagePopup />

      {/* Booking Confirmation Popup */}
      <BookingConfirmationPopup />

      {/* Vehicle Images Section - With improved alignment */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Main image - Now with 3/4 width */}
        <div className="md:col-span-3 bg-gray-100 rounded-lg overflow-hidden shadow-md">
          <div className="aspect-video w-full h-full">
            {renderImage(
              vehicleData.images && vehicleData.images.length > 0
                ? vehicleData.images[0]
                : null,
              `${vehicleData.model} main image`,
              "w-full h-full object-cover",
            )}
          </div>
        </div>

        {/* Side images - Now with 1/4 width and matching height */}
        <div className="md:col-span-1 flex flex-col justify-between gap-4">
          <div className="bg-gray-100 rounded-lg overflow-hidden flex-1 shadow-md">
            {renderImage(
              vehicleData.images && vehicleData.images.length > 1
                ? vehicleData.images[1]
                : null,
              "Vehicle image 2",
              "w-full h-full object-cover",
            )}
          </div>
          <div className="bg-gray-100 rounded-lg overflow-hidden flex-1 relative shadow-md">
            {renderImage(
              vehicleData.images && vehicleData.images.length > 2
                ? vehicleData.images[2]
                : null,
              "Vehicle image 3",
              "w-full h-full object-cover",
            )}

            {/* View More Button - Only show if there are more than 3 images */}
            {hasMoreImages && (
              <button
                onClick={() => setShowImagePopup(true)}
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold text-lg rounded-lg hover:bg-opacity-60 transition"
              >
                View all {vehicleData.images.length} images
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Vehicle Details */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">
            {vehicleData.model} ({vehicleData.year})
          </h1>

          {/* Description */}
          <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{vehicleData.description}</p>
          </div>

          {/* Vehicle Features - with capitalized first letters */}
          <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Vehicle Features</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <span className="text-blue-500 mr-2">•</span>
                <span className="text-gray-700">
                  Color:{" "}
                  <span className="font-medium">
                    {capitalizeFirstLetter(vehicleData.color)}
                  </span>
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-500 mr-2">•</span>
                <span className="text-gray-700">
                  Fuel Type:{" "}
                  <span className="font-medium">
                    {capitalizeFirstLetter(vehicleData.fuel_type)}
                  </span>
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-500 mr-2">•</span>
                <span className="text-gray-700">
                  Transmission:{" "}
                  <span className="font-medium">
                    {capitalizeFirstLetter(vehicleData.transmission)}
                  </span>
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-500 mr-2">•</span>
                <span className="text-gray-700">
                  Capacity:{" "}
                  <span className="font-medium">
                    {vehicleData.capacity} persons
                  </span>
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-500 mr-2">•</span>
                <span className="text-gray-700">
                  City:{" "}
                  <span className="font-medium">
                    {capitalizeFirstLetter(vehicleData.city)}
                  </span>
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-500 mr-2">•</span>
                <span className="text-gray-700">
                  Registration:{" "}
                  <span className="font-medium">
                    {vehicleData.registration_number}
                  </span>
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-500 mr-2">•</span>
                <span className="text-gray-700">
                  Service:{" "}
                  <span className="font-medium">{vehicleData.service}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Ratings Section */}
          <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-2">
              <h2 className="text-xl font-semibold">Ratings</h2>
              <div className="ml-3 px-3 py-1 bg-blue-50 rounded-full flex items-center">
                <span className="text-2xl font-bold text-blue-600">
                  {averageRating}
                </span>
                <span className="ml-1 text-yellow-500">★</span>
              </div>
              <span className="ml-2 text-gray-500">
                ({vehicleData.reviews ? vehicleData.reviews.length : 0} ratings)
              </span>
            </div>
          </div>

          {/* Driver Information */}
          <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Driver Information</h2>
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gray-300 rounded-full mr-4 flex items-center justify-center text-gray-500 text-xl font-bold">
                {vehicleData.driver.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-lg">{vehicleData.driver.name}</p>
                <p className="text-gray-600">
                  Experience:{" "}
                  <span className="font-medium">
                    {vehicleData.driver.noOfExperience} years
                  </span>
                </p>
                <p className="text-gray-600">
                  Contact:{" "}
                  <span className="font-medium">
                    {vehicleData.driver.phoneNumber}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Reviews</h2>
            {vehicleData.reviews && vehicleData.reviews.length > 0 ? (
              <>
                <div className="space-y-4">
                  {vehicleData.reviews
                    .slice(0, visibleReviews)
                    .map((review) => (
                      <div
                        key={review._id}
                        className="bg-gray-50 p-4 rounded-lg border border-gray-100"
                      >
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full mr-3 flex items-center justify-center text-blue-500 font-medium">
                            {review.created_by.substring(0, 1).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <span
                                  key={i}
                                  className={`text-lg ${i < review.rating ? "text-yellow-500" : "text-gray-300"}`}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                            <p className="text-gray-500 text-sm">
                              User #{review.created_by.substring(0, 6)}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                </div>

                {hasMoreReviews && (
                  <div className="mt-4 text-center">
                    <button
                      onClick={handleShowMoreReviews}
                      className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition font-medium"
                    >
                      Show More Reviews
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-500 italic">
                No reviews yet. Be the first to review!
              </p>
            )}
          </div>

          {/* Add Review Form */}
          <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add Your Review</h2>

            <form onSubmit={handleSubmitReview}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Rating <span className="text-red-500">*</span>
                </label>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <button
                      type="button"
                      key={i}
                      className={`text-2xl focus:outline-none ${i < rating ? "text-yellow-500" : "text-gray-300"}`}
                      onClick={() => setRating(i + 1)}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="reviewText"
                  className="block text-gray-700 mb-2"
                >
                  Your Review <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="reviewText"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  rows="4"
                  placeholder="Share your experience with this vehicle..."
                  required
                ></textarea>
                {reviewError && (
                  <p className="text-red-500 text-sm mt-1">{reviewError}</p>
                )}
              </div>

              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>

        {/* Right Column - Rental Form */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-bold text-blue-600">
                  {vehicleData.currency_type} {vehicleData.price_per_day}
                </h2>
                <p className="text-gray-500">per day</p>
              </div>
              <div className="flex items-center">
                <span className="text-yellow-500 text-xl mr-1">★</span>
                <span className="font-medium">{averageRating}</span>
                <span className="text-gray-500 ml-1">
                  ({vehicleData.reviews ? vehicleData.reviews.length : 0})
                </span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Pickup Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={tripStartDate}
                onChange={(e) => setTripStartDate(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                min={getTodayDate()}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Pickup Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                value={tripStartTime}
                onChange={(e) => setTripStartTime(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Return Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={tripEndDate}
                onChange={(e) => setTripEndDate(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                min={tripStartDate || getTodayDate()}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Return Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                value={tripEndTime}
                onChange={(e) => setTripEndTime(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Pickup Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter pickup location"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Drop-off Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter drop-off location"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">
                Journey Details <span className="text-red-500">*</span>
              </label>
              <textarea
                value={journeyDetails}
                onChange={(e) => setJourneyDetails(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                rows="3"
                placeholder="Enter journey details (purpose, stops, etc.)"
                required
              ></textarea>
            </div>

            {/* Rental Summary - Only show if dates are selected */}
            {calculateRental() && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">
                  Rental Summary
                </h3>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700">Duration:</span>
                  <span className="font-medium">
                    {calculateRental().days} day
                    {calculateRental().days !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700">Daily Rate:</span>
                  <span className="font-medium">
                    {vehicleData.currency_type}{" "}
                    {parseFloat(vehicleData.price_per_day).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-lg mt-2 pt-2 border-t">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold text-blue-700">
                    {vehicleData.currency_type}{" "}
                    {calculateRental().totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={handleBookNowClick}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center"
              disabled={bookingLoading}
            >
              {bookingLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                "Book Now"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsPage;
