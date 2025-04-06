
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// const VehicleDetailsPage = () => {
//   const { id } = useParams();
//   const [vehicleData, setVehicleData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [reviewText, setReviewText] = useState('');
//   const [rating, setRating] = useState(0);
//   const [showImagePopup, setShowImagePopup] = useState(false);

//   // Add state for trip dates and times
//   const [tripStartDate, setTripStartDate] = useState('');
//   const [tripStartTime, setTripStartTime] = useState('');
//   const [tripEndDate, setTripEndDate] = useState('');
//   const [tripEndTime, setTripEndTime] = useState('');

// //   const noImagePlaceholder = "https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk=";

//    const noImagePlaceholder = "http://localhost:3000/uploads/1740903066921-21738505220210610035741_Creta.jpg";
//   useEffect(() => {
//     const fetchVehicleData = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`http://localhost:3000/api/vehicles/${id}`);

//         if (!response.ok) {
//           throw new Error('Failed to fetch vehicle data');
//         }

//         const data = await response.json();
//         setVehicleData(data.vehicle);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching vehicle data:', err);
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchVehicleData();
//   }, [id]);

//   // Calculate average rating
//   const calculateAverageRating = () => {
//     if (!vehicleData?.reviews || vehicleData.reviews.length === 0) return 0;
//     const totalRating = vehicleData.reviews.reduce((sum, review) => sum + review.rating, 0);
//     return (totalRating / vehicleData.reviews.length).toFixed(1);
//   };

//   const handleSubmitReview = (e) => {
//     e.preventDefault();
//     // Here you would implement the API call to submit the review
//     console.log("Review submitted:", { rating, comment: reviewText });
//     setReviewText('');
//     setRating(0);
//   };

//   // Image rendering helper function
//   const renderImage = (imagePath, altText, className) => {
//     if (imagePath) {
//       return (
//         <img
//           src={`/images/${imagePath}`}
//           alt={altText}
//           className={className}
//         />
//       );
//     } else {
//       return (
//         <img 
//           src={noImagePlaceholder}
//           alt="Image not available" 
//           className={className}
//         />
//       );
//     }
//   };

//   // Image Popup Component
//   const ImagePopup = () => {
//     if (!showImagePopup) return null;

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
//         <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//           <div className="flex justify-between items-center p-4 border-b">
//             <h3 className="text-xl font-semibold">All Images</h3>
//             <button 
//               onClick={() => setShowImagePopup(false)}
//               className="text-gray-500 hover:text-gray-700 text-2xl"
//             >
//               &times;
//             </button>
//           </div>
//           <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {vehicleData.images && vehicleData.images.length > 0 ? (
//               vehicleData.images.map((image, index) => (
//                 <div key={index} className="aspect-square">
//                   {renderImage(
//                     image,
//                     `${vehicleData.model} image ${index + 1}`,
//                     "w-full h-full object-cover rounded" 
//                   )}
//                 </div>
//               ))
//             ) : (
//               <div className="col-span-full text-center py-8">
//                 <p className="text-gray-500">No images available</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Helper to get today's date in YYYY-MM-DD format for min attribute
//   const getTodayDate = () => {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = String(today.getMonth() + 1).padStart(2, '0');
//     const day = String(today.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   // Helper to get future date (for end date min)
//   const getFutureDate = (days) => {
//     const future = new Date();
//     future.setDate(future.getDate() + days);
//     const year = future.getFullYear();
//     const month = String(future.getMonth() + 1).padStart(2, '0');
//     const day = String(future.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-red-500 text-xl">Error: {error}</div>
//       </div>
//     );
//   }

//   if (!vehicleData) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-gray-500 text-xl">No vehicle data found</div>
//       </div>
//     );
//   }

//   const averageRating = calculateAverageRating();
//   const hasMoreImages = vehicleData.images && vehicleData.images.length > 3;

//   return (
//     <div className="max-w-6xl mx-auto mt-24 p-4 bg-gray-50">
//       {/* Image Popup */}
//       <ImagePopup />

//       {/* Vehicle Images Section - With improved alignment */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         {/* Main image - Now with 3/4 width */}
//         <div className="md:col-span-3 bg-gray-100 rounded-lg overflow-hidden">
//           <div className="aspect-video w-full h-full">
//             {renderImage(
//               vehicleData.images && vehicleData.images.length > 0 ? vehicleData.images[0] : null,
//               `${vehicleData.model} main image`,
//               "w-full h-full object-cover"
//             )}
//           </div>
//         </div>

//         {/* Side images - Now with 1/4 width and matching height */}
//         <div className="md:col-span-1 flex flex-col justify-between gap-4">
//           <div className="bg-gray-100 rounded-lg overflow-hidden flex-1">
//             {renderImage(
//               vehicleData.images && vehicleData.images.length > 1 ? vehicleData.images[1] : null,
//               "Vehicle image 2",
//               "w-full h-full object-cover"
//             )}
//           </div>
//           <div className="bg-gray-100 rounded-lg overflow-hidden flex-1 relative">
//             {renderImage(
//               vehicleData.images && vehicleData.images.length > 2 ? vehicleData.images[2] : null,
//               "Vehicle image 3",
//               "w-full h-full object-cover"
//             )}

//             {/* View More Button - Only show if there are more than 3 images */}
//             {hasMoreImages && (
//               <button 
//                 onClick={() => setShowImagePopup(true)}
//                 className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold text-lg rounded-lg hover:bg-opacity-60 transition"
//               >
//                 View all {vehicleData.images.length} images
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {/* Left Column - Vehicle Details */}
//         <div className="md:col-span-2">
//           <h1 className="text-3xl font-bold mb-4">{vehicleData.model} ({vehicleData.year})</h1>

//           {/* Description */}
//           <div className="mb-6">
//             <h2 className="text-xl font-semibold mb-2">Description</h2>
//             <p className="text-gray-700">{vehicleData.description}</p>
//             <div className="border-b my-4"></div>
//           </div>

//           {/* Vehicle Features */}
//           <div className="mb-6">
//             <h2 className="text-xl font-semibold mb-2">Vehicle Features</h2>
//             <div className="grid grid-cols-2 gap-2">
//               <div className="flex items-center">
//                 <span className="text-gray-700">• Color: {vehicleData.color}</span>
//               </div>
//               <div className="flex items-center">
//                 <span className="text-gray-700">• Fuel Type: {vehicleData.fuel_type}</span>
//               </div>
//               <div className="flex items-center">
//                 <span className="text-gray-700">• Transmission: {vehicleData.transmission}</span>
//               </div>
//               <div className="flex items-center">
//                 <span className="text-gray-700">• Capacity: {vehicleData.capacity} persons</span>
//               </div>
//               <div className="flex items-center">
//                 <span className="text-gray-700">• City: {vehicleData.city}</span>
//               </div>
//               <div className="flex items-center">
//                 <span className="text-gray-700">• Registration: {vehicleData.registration_number}</span>
//               </div>
//             </div>
//             <div className="border-b my-4"></div>
//           </div>

//           {/* Ratings Section */}
//           <div className="mb-6">
//             <div className="flex items-center mb-2">
//               <h2 className="text-xl font-semibold">Ratings</h2>
//               <div className="ml-2 flex items-center">
//                 <span className="text-2xl font-bold">{averageRating}</span>
//                 <span className="ml-1 text-yellow-500">★</span>
//               </div>
//               <span className="ml-2 text-gray-500">
//                 ({vehicleData.reviews ? vehicleData.reviews.length : 0} ratings)
//               </span>
//             </div>
//             <div className="border-b my-4"></div>
//           </div>

//           {/* Driver Information */}
//           <div className="mb-6">
//             <h2 className="text-xl font-semibold mb-2">Driver Information</h2>
//             <div className="flex items-center">
//               <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
//               <div>
//                 <p className="font-medium">{vehicleData.driver.name}</p>
//                 <p className="text-gray-600">Experience: {vehicleData.driver.noOfExperience} years</p>
//                 <p className="text-gray-600">Contact: {vehicleData.driver.phoneNumber}</p>
//               </div>
//             </div>
//             <div className="border-b my-4"></div>
//           </div>

//           {/* Reviews */}
//           <div className="mb-6">
//             <h2 className="text-xl font-semibold mb-4">Reviews</h2>
//             {vehicleData.reviews && vehicleData.reviews.length > 0 ? (
//               vehicleData.reviews.slice(0, 2).map((review) => (
//                 <div key={review._id} className="mb-4 bg-white p-4 rounded-lg shadow">
//                   <div className="flex items-center mb-2">
//                     <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
//                     <div>
//                       <div className="flex items-center">
//                         {[...Array(5)].map((_, i) => (
//                           <span key={i} className={`text-xl ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
//                         ))}
//                       </div>
//                       <p className="text-gray-500 text-sm">User #{review.created_by.substring(0, 6)}</p>
//                     </div>
//                   </div>
//                   <p className="text-gray-700">{review.comment}</p>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500">No reviews yet</p>
//             )}
//             <div className="border-b my-4"></div>
//           </div>

//           {/* Add Review Form */}
//           <div className="mb-6">
//             <h2 className="text-xl font-semibold mb-4">Add Your Review</h2>
//             <form onSubmit={handleSubmitReview}>
//               <div className="mb-4">
//                 <div className="flex mb-2">
//                   {[...Array(5)].map((_, i) => (
//                     <button
//                       type="button"
//                       key={i}
//                       className="text-2xl focus:outline-none"
//                       onClick={() => setRating(i + 1)}
//                     >
//                       <span className={i < rating ? 'text-yellow-500' : 'text-gray-300'}>★</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//               <div className="mb-4">
//                 <textarea
//                   className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500"
//                   rows="4"
//                   placeholder="Write your review here..."
//                   value={reviewText}
//                   onChange={(e) => setReviewText(e.target.value)}
//                   required
//                 ></textarea>
//               </div>
//               <button
//                 type="submit"
//                 className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//               >
//                 Submit Review
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* Right Column - Booking Section */}
//         <div>
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <div className="mb-4">
//               <div className="flex justify-between items-center">
//                 <span className="text-2xl font-bold">{vehicleData.currency_type}.{vehicleData.price_per_day}</span>
//                 <span className="text-gray-600">/ day</span>
//               </div>
//               <p className="text-gray-500 text-sm">Rate per day</p>
//               <div className="border-b my-4"></div>
//             </div>

//             <h3 className="text-lg font-semibold mb-3">Your trip</h3>

//             {/* Trip Start - Now with proper date/time selectors */}
//             <div className="mb-4">
//               <label className="block text-gray-600 mb-1">Trip start</label>
//               <div className="grid grid-cols-2 gap-2">
//                 <input
//                   type="date"
//                   min={getTodayDate()}
//                   className="border p-2 rounded-lg"
//                   value={tripStartDate}
//                   onChange={(e) => setTripStartDate(e.target.value)}
//                 />
//                 <select
//                   className="border p-2 rounded-lg"
//                   value={tripStartTime}
//                   onChange={(e) => setTripStartTime(e.target.value)}
//                 >
//                   <option value="">Select time</option>
//                   <option value="09:00">09:00 AM</option>
//                   <option value="10:00">10:00 AM</option>
//                   <option value="11:00">11:00 AM</option>
//                   <option value="12:00">12:00 PM</option>
//                   <option value="13:00">01:00 PM</option>
//                   <option value="14:00">02:00 PM</option>
//                   <option value="15:00">03:00 PM</option>
//                   <option value="16:00">04:00 PM</option>
//                   <option value="17:00">05:00 PM</option>
//                   <option value="18:00">06:00 PM</option>
//                 </select>
//               </div>
//             </div>

//             {/* Trip End - Now with proper date/time selectors */}
//             <div className="mb-4">
//               <label className="block text-gray-600 mb-1">Trip end</label>
//               <div className="grid grid-cols-2 gap-2">
//                 <input
//                   type="date"
//                   min={tripStartDate || getTodayDate()}
//                   className="border p-2 rounded-lg"
//                   value={tripEndDate}
//                   onChange={(e) => setTripEndDate(e.target.value)}
//                 />
//                 <select
//                   className="border p-2 rounded-lg"
//                   value={tripEndTime}
//                   onChange={(e) => setTripEndTime(e.target.value)}
//                 >
//                   <option value="">Select time</option>
//                   <option value="09:00">09:00 AM</option>
//                   <option value="10:00">10:00 AM</option>
//                   <option value="11:00">11:00 AM</option>
//                   <option value="12:00">12:00 PM</option>
//                   <option value="13:00">01:00 PM</option>
//                   <option value="14:00">02:00 PM</option>
//                   <option value="15:00">03:00 PM</option>
//                   <option value="16:00">04:00 PM</option>
//                   <option value="17:00">05:00 PM</option>
//                   <option value="18:00">06:00 PM</option>
//                 </select>
//               </div>
//             </div>

//             {/* Locations */}
//             <div className="mb-4">
//               <div className="relative mb-3">
//                 <input
//                   type="text"
//                   placeholder="Enter the pick up location"
//                   className="w-full border p-2 rounded-lg pr-10"
//                 />
//                 <button className="absolute right-2 top-2 text-blue-500">
//                   ✏️
//                 </button>
//               </div>
//               <div className="relative mb-3">
//                 <input
//                   type="text"
//                   placeholder="Enter the Drop up location"
//                   className="w-full border p-2 rounded-lg pr-10"
//                 />
//                 <button className="absolute right-2 top-2 text-blue-500">
//                   ✏️
//                 </button>
//               </div>
//             </div>

//             {/* Facilities */}
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold mb-3">Facilities</h3>
//               <div className="flex items-center mb-2">
//                 <span className="text-gray-700 flex-1">Free Cancellation</span>
//                 <span className="text-green-500">👍</span>
//               </div>
//               <div className="flex items-center">
//                 <span className="text-gray-700 flex-1">Free {vehicleData.kilometers_per_day} miles per day</span>
//                 <span>⭕</span>
//               </div>
//               {vehicleData.per_extra_kilometer && (
//                 <div className="text-gray-500 text-sm mt-1">
//                   {vehicleData.currency_type} {vehicleData.per_extra_kilometer} per extra kilometer
//                 </div>
//               )}
//             </div>

//             {/* Book Now Button */}
//             <button className="bg-blue-600 text-white w-full py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
//               Book Now
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VehicleDetailsPage;


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const VehicleDetailsPage = () => {
    const { id } = useParams();
    const [vehicleData, setVehicleData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const [showImagePopup, setShowImagePopup] = useState(false);
    const [visibleReviews, setVisibleReviews] = useState(2);

    // Add state for trip dates and times
    const [tripStartDate, setTripStartDate] = useState('');
    const [tripStartTime, setTripStartTime] = useState('');
    const [tripEndDate, setTripEndDate] = useState('');
    const [tripEndTime, setTripEndTime] = useState('');
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropoffLocation, setDropoffLocation] = useState('');

    // Add state for confirmation popup
    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
    const [rentalSummary, setRentalSummary] = useState({
        days: 0,
        totalPrice: 0,
        startDateTime: '',
        endDateTime: '',
    });

    const noImagePlaceholder = "http://localhost:3000/uploads/1740903066921-21738505220210610035741_Creta.jpg";

    useEffect(() => {
        const fetchVehicleData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:3000/api/vehicles/${id}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch vehicle data');
                }

                const data = await response.json();
                setVehicleData(data.vehicle);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching vehicle data:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchVehicleData();
    }, [id]);

    // Calculate average rating
    const calculateAverageRating = () => {
        if (!vehicleData?.reviews || vehicleData.reviews.length === 0) return 0;
        const totalRating = vehicleData.reviews.reduce((sum, review) => sum + review.rating, 0);
        return (totalRating / vehicleData.reviews.length).toFixed(1);
    };

    const handleSubmitReview = (e) => {
        e.preventDefault();
        // Here you would implement the API call to submit the review
        console.log("Review submitted:", { rating, comment: reviewText });
        setReviewText('');
        setRating(0);
    };

    // Image rendering helper function
    const renderImage = (imagePath, altText, className) => {
        if (imagePath) {
            return (
                <img
                    src={`/images/${imagePath}`}
                    alt={altText}
                    className={className}
                />
            );
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
        const formattedStartDate = startDateTime.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const formattedEndDate = endDateTime.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        return {
            days,
            totalPrice,
            startDateTime: formattedStartDate,
            endDateTime: formattedEndDate,
            rawStartDateTime: startDateTime,
            rawEndDateTime: endDateTime
        };
    };

    // Handle booking confirmation
    const handleBookNowClick = () => {
        const rentalDetails = calculateRental();
        if (!rentalDetails) {
            alert('Please select valid pickup and return dates/times');
            return;
        }

        if (!pickupLocation || !dropoffLocation) {
            alert('Please enter pickup and drop-off locations');
            return;
        }

        setRentalSummary(rentalDetails);
        setShowConfirmationPopup(true);
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
                                        "w-full h-full object-cover rounded"
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
        try {
            // Create simplified rental object with only the required fields
            const rentalData = {
                vehicle: id, // From useParams
                price:rentalSummary.totalPrice,
                per_day: parseFloat(vehicleData.price_per_day),
                pickUpLocation: pickupLocation,
                dropOffLocation: dropoffLocation,
                pickUpDateTime: rentalSummary.rawStartDateTime,
                dropOffDateTime: rentalSummary.rawEndDateTime,
                journey_details: `Trip from ${pickupLocation} to ${dropoffLocation} for ${rentalSummary.days} days with ${vehicleData.model} (${vehicleData.year})`
            };

            // Make API call to create the rental using axios
            const response = await axios.post(`http://localhost:3000/api/rental/${rentalData.vehicle}`, rentalData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}` // Assuming you use token-based auth
                }
            });

            // Axios automatically throws errors for non-2xx responses, 
            // and the response data is in response.data

            // Close popup and show success message
            setShowConfirmationPopup(false);
            alert('Booking submitted successfully! Your booking status is pending approval.');
            
        } catch (error) {
            console.error('Error creating booking:', error);
            // Axios error handling - error.response contains the server response for error status codes
            const errorMessage = error.response?.data?.message || error.message || 'Failed to create booking';
            alert(`Booking failed: ${errorMessage}`);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-lg w-full overflow-hidden shadow-xl">
                {/* Header with vehicle image */}
                <div className="relative h-32 bg-blue-600 overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        {renderImage(
                            vehicleData.images && vehicleData.images.length > 0 ? vehicleData.images[0] : null,
                            `${vehicleData.model}`,
                            "w-full h-full object-cover"
                        )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 opacity-80"></div>
                    <div className="relative p-6 flex items-center h-full">
                        <div>
                            <h3 className="text-2xl font-bold text-white">Confirm Booking</h3>
                            <p className="text-blue-100">{vehicleData.model} ({vehicleData.year})</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowConfirmationPopup(false)}
                        className="absolute right-4 top-4 text-white hover:text-gray-200 text-xl"
                    >
                        &times;
                    </button>
                </div>

                {/* Booking Summary */}
                <div className="p-6">
                    <div className="mb-4">
                        <h4 className="text-lg font-semibold mb-2 text-gray-800">Are you sure you want to rent this vehicle?</h4>
                        <p className="text-gray-600 text-sm mb-4">Please review your booking details below.</p>
                    </div>

                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-gray-600">Duration</span>
                            <span className="font-medium">{rentalSummary.days} day{rentalSummary.days !== 1 ? 's' : ''}</span>
                        </div>

                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-gray-600">Pickup</span>
                            <span className="font-medium">{rentalSummary.startDateTime}</span>
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
                            <span className="font-medium">{vehicleData.currency_type}{vehicleData.price_per_day}</span>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                            <span className="text-gray-800 font-bold">Total Price</span>
                            <span className="text-xl font-bold text-blue-600">{vehicleData.currency_type}{rentalSummary.totalPrice.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <button
                            onClick={() => setShowConfirmationPopup(false)}
                            className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleBookingConfirmation}
                            className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                        >
                            Confirm Booking
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
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
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
    const hasMoreReviews = vehicleData.reviews && vehicleData.reviews.length > visibleReviews;

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
                            vehicleData.images && vehicleData.images.length > 0 ? vehicleData.images[0] : null,
                            `${vehicleData.model} main image`,
                            "w-full h-full object-cover"
                        )}
                    </div>
                </div>

                {/* Side images - Now with 1/4 width and matching height */}
                <div className="md:col-span-1 flex flex-col justify-between gap-4">
                    <div className="bg-gray-100 rounded-lg overflow-hidden flex-1 shadow-md">
                        {renderImage(
                            vehicleData.images && vehicleData.images.length > 1 ? vehicleData.images[1] : null,
                            "Vehicle image 2",
                            "w-full h-full object-cover"
                        )}
                    </div>
                    <div className="bg-gray-100 rounded-lg overflow-hidden flex-1 relative shadow-md">
                        {renderImage(
                            vehicleData.images && vehicleData.images.length > 2 ? vehicleData.images[2] : null,
                            "Vehicle image 3",
                            "w-full h-full object-cover"
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
                    <h1 className="text-3xl font-bold mb-4">{vehicleData.model} ({vehicleData.year})</h1>

                    {/* Description */}
                    <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">Description</h2>
                        <p className="text-gray-700">{vehicleData.description}</p>
                    </div>

                    {/* Vehicle Features */}
                    <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Vehicle Features</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center">
                                <span className="text-blue-500 mr-2">•</span>
                                <span className="text-gray-700">Color: <span className="font-medium">{vehicleData.color}</span></span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-blue-500 mr-2">•</span>
                                <span className="text-gray-700">Fuel Type: <span className="font-medium">{vehicleData.fuel_type}</span></span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-blue-500 mr-2">•</span>
                                <span className="text-gray-700">Transmission: <span className="font-medium">{vehicleData.transmission}</span></span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-blue-500 mr-2">•</span>
                                <span className="text-gray-700">Capacity: <span className="font-medium">{vehicleData.capacity} persons</span></span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-blue-500 mr-2">•</span>
                                <span className="text-gray-700">City: <span className="font-medium">{vehicleData.city}</span></span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-blue-500 mr-2">•</span>
                                <span className="text-gray-700">Registration: <span className="font-medium">{vehicleData.registration_number}</span></span>
                            </div>
                        </div>
                    </div>

                    {/* Ratings Section */}
                    <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center mb-2">
                            <h2 className="text-xl font-semibold">Ratings</h2>
                            <div className="ml-3 px-3 py-1 bg-blue-50 rounded-full flex items-center">
                                <span className="text-2xl font-bold text-blue-600">{averageRating}</span>
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
                                <p className="text-gray-600">Experience: <span className="font-medium">{vehicleData.driver.noOfExperience} years</span></p>
                                <p className="text-gray-600">Contact: <span className="font-medium">{vehicleData.driver.phoneNumber}</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Reviews */}
                    <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Reviews</h2>
                        {vehicleData.reviews && vehicleData.reviews.length > 0 ? (
                            <>
                                <div className="space-y-4">
                                    {vehicleData.reviews.slice(0, visibleReviews).map((review) => (
                                        <div key={review._id} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                            <div className="flex items-center mb-3">
                                                <div className="w-10 h-10 bg-blue-100 rounded-full mr-3 flex items-center justify-center text-blue-500 font-medium">
                                                    {review.created_by.substring(0, 1).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="flex items-center">
                                                        {[...Array(5)].map((_, i) => (
                                                            <span key={i} className={`text-lg ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
                                                        ))}
                                                    </div>
                                                    <p className="text-gray-500 text-sm">User #{review.created_by.substring(0, 6)}</p>
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
                            <p className="text-gray-500 italic">No reviews yet. Be the first to review!</p>
                        )}
                    </div>

                    {/* Add Review Form */}
                    <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Add Your Review</h2>
                        <form onSubmit={handleSubmitReview}>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Rating</label>
                                <div className="flex mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <button
                                            type="button"
                                            key={i}
                                            className="text-2xl focus:outline-none"
                                            onClick={() => setRating(i + 1)}
                                        >
                                            <span className={i < rating ? 'text-yellow-500' : 'text-gray-300'}>★</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Your Review</label>
                                <textarea
                                    className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500"
                                    rows="4"
                                    placeholder="Share your experience with this vehicle..."
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                            >
                                Submit Review
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right Column - Booking Section */}
                <div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="mb-6">
                            <div className="flex justify-between items-center">
                                <span className="text-3xl font-bold text-blue-600">{vehicleData.currency_type} {vehicleData.price_per_day}</span>
                                <span className="text-gray-600 bg-blue-50 px-3 py-1 rounded-full">per day</span>
                            </div>
                            <div className="border-b my-4"></div>
                        </div>

                        <h3 className="text-lg font-semibold mb-4">Your Trip</h3>

                        {/* Trip Start */}
                        <div className="mb-4">
                            <label className="block text-gray-600 mb-2 font-medium">Trip Start</label>
                            <div className="grid grid-cols-2 gap-2">
                                <input
                                    type="date"
                                    min={getTodayDate()}
                                    className="border p-3 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500"
                                    value={tripStartDate}
                                    onChange={(e) => setTripStartDate(e.target.value)}
                                    required
                                />
                                <select
                                    className="border p-3 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500"
                                    value={tripStartTime}
                                    onChange={(e) => setTripStartTime(e.target.value)}
                                    required
                                >
                                    <option value="">Select time</option>
                                    <option value="09:00">09:00 AM</option>
                                    <option value="10:00">10:00 AM</option>
                                    <option value="11:00">11:00 AM</option>
                                    <option value="12:00">12:00 PM</option>
                                    <option value="13:00">01:00 PM</option>
                                    <option value="14:00">02:00 PM</option>
                                    <option value="15:00">03:00 PM</option>
                                    <option value="16:00">04:00 PM</option>
                                    <option value="17:00">05:00 PM</option>
                                    <option value="18:00">06:00 PM</option>
                                </select>
                            </div>
                        </div>

                        {/* Trip End */}
                        <div className="mb-4">
                            <label className="block text-gray-600 mb-2 font-medium">Trip End</label>
                            <div className="grid grid-cols-2 gap-2">
                                <input
                                    type="date"
                                    min={tripStartDate || getTodayDate()}
                                    className="border p-3 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500"
                                    value={tripEndDate}
                                    onChange={(e) => setTripEndDate(e.target.value)}
                                    required
                                />
                                <select
                                    className="border p-3 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500"
                                    value={tripEndTime}
                                    onChange={(e) => setTripEndTime(e.target.value)}
                                    required
                                >
                                    <option value="">Select time</option>
                                    <option value="09:00">09:00 AM</option>
                                    <option value="10:00">10:00 AM</option>
                                    <option value="11:00">11:00 AM</option>
                                    <option value="12:00">12:00 PM</option>
                                    <option value="13:00">01:00 PM</option>
                                    <option value="14:00">02:00 PM</option>
                                    <option value="15:00">03:00 PM</option>
                                    <option value="16:00">04:00 PM</option>
                                    <option value="17:00">05:00 PM</option>
                                    <option value="18:00">06:00 PM</option>
                                </select>
                            </div>
                        </div>

                        {/* Rental Duration & Price Preview */}
                        {tripStartDate && tripStartTime && tripEndDate && tripEndTime && (
                            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">Duration:</span>
                                    <span className="font-medium">{calculateRental()?.days || 0} day{(calculateRental()?.days || 0) !== 1 ? 's' : ''}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Estimated total:</span>
                                    <span className="font-bold text-blue-600">
                                        {vehicleData.currency_type} {((calculateRental()?.totalPrice || 0))}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Locations */}
                        <div className="mb-6">
                            <label className="block text-gray-600 mb-2 font-medium">Pickup Location</label>
                            <div className="relative mb-3">
                                <input
                                    type="text"
                                    placeholder="Enter pickup location"
                                    className="w-full border p-3 rounded-lg pr-10 focus:ring focus:ring-blue-200 focus:border-blue-500"
                                    value={pickupLocation}
                                    onChange={(e) => setPickupLocation(e.target.value)}
                                    required
                                />
                                <span className="absolute right-3 top-3 text-blue-500">📍</span>
                            </div>

                            <label className="block text-gray-600 mb-2 font-medium">Drop-off Location</label>
                            <div className="relative mb-3">
                                <input
                                    type="text"
                                    placeholder="Enter drop-off location"
                                    className="w-full border p-3 rounded-lg pr-10 focus:ring focus:ring-blue-200 focus:border-blue-500"
                                    value={dropoffLocation}
                                    onChange={(e) => setDropoffLocation(e.target.value)}
                                    required
                                />
                                <span className="absolute right-3 top-3 text-blue-500">📍</span>
                                 {/* Book Now Button */}
                                 <button
                                        onClick={handleBookNowClick}
                                        className="w-full py-4 bg-blue-600 text-white mt-5 mb-5 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg"
                                    >
                                        Book Now
                                    </button>
                            </div>
                        </div>

                        {/* Facilities */}
                        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                            <h3 className="text-lg font-semibold mb-3">Included Facilities</h3>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                   
                                </div>
                                <span className="text-green-500 mr-2">✓</span>
                                <span className="text-gray-700">Free cancellation up to 24 hours before trip start</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                <span className="text-gray-700">24/7 roadside assistance</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                <span className="text-gray-700">Insurance coverage included</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                <span className="text-gray-700">Cleaned & sanitized after each trip</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleDetailsPage;