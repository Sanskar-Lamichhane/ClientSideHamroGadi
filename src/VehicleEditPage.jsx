
import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function VehicleEditPage() {
  const { id } = useParams(); // Get vehicle ID from URL params
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);
  const scrollPositionRef = useRef(0);

  // Form reference for uncontrolled components
  const formRef = useRef(null);

  // State for vehicle data
  const [vehicle, setVehicle] = useState(null);

  // State for images
  const [images, setImages] = useState([]);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileCount, setFileCount] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [brandName, setBrandName] = useState("");

  // Fetch vehicle data when component mounts
  useEffect(() => {
    fetchVehicleData();
  }, [id]);

  // Store scroll position before loading data
  const storeScrollPosition = () => {
    scrollPositionRef.current = window.pageYOffset;
  };

  // Restore scroll position after loading data
  const restoreScrollPosition = () => {
    setTimeout(() => {
      window.scrollTo(0, scrollPositionRef.current);
    }, 0);
  };

  const fetchVehicleData = async (keepScrollPosition = false) => {
    try {
      if (keepScrollPosition) {
        storeScrollPosition();
      }

      if (!keepScrollPosition) {
        setIsLoading(true);
      }

      const response = await axios.get(
        `http://localhost:3000/api/vehicles/${id || "67e65cd649b2b24438c73bf8"}`,
      );

      // API response contains vehicle data
      setVehicle(response.data.vehicle);
      console.log(response.data.vehicle?.brandDetails?.brandName);
      setBrandName(response.data?.vehicle?.brandDetails.brandName);

      // Set images from the API response
      if (
        response.data.vehicle.images &&
        response.data.vehicle.images.length > 0
      ) {
        setImages(response.data.vehicle.images);
      } else {
        setImages([]);
      }

      setIsLoading(false);
      setIsDeleting(false);

      if (keepScrollPosition) {
        restoreScrollPosition();
      }
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
      setIsLoading(false);
      setIsDeleting(false);

      toast.error(
        `Failed to load vehicle data: ${error.response?.data?.message || error.message}`,
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
    }
  };

  const handleDeleteImage = (index) => {
    try {
      // Get the image to delete
      const imageToDelete = images[index];
      console.log("Deleting image:", imageToDelete);

      // Set deleting state
      setIsDeleting(true);

      // Call API to delete the image
      axios
        .delete(
          `http://localhost:3000/api/vehicles/${vehicle._id}/images/${imageToDelete}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          },
        )
        .then(() => {
          // Create a new array without the deleted image for immediate UI update
          const newImages = [...images];
          newImages.splice(index, 1);
          setImages(newImages);

          toast.success("Image deleted successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });

          // Set deleting state to false
          setIsDeleting(false);
        })
        .catch((error) => {
          console.error("Error deleting image:", error);
          setIsDeleting(false);

          toast.error(
            `Failed to delete image: ${error.response?.data?.message || error.message}`,
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
        });
    } catch (err) {
      console.error("Error handling image deletion:", err);
      setIsDeleting(false);

      toast.error("Failed to delete image", {
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
  };

  const saveVehicleToAPI = () => {
    // This uses a FormData approach which keeps input focus
    if (!formRef.current || !vehicle) return;

    try {
      setIsSaving(true);

      // Get form data directly from the form elements
      const formData = new FormData(formRef.current);

      // Create driver object from form data
      const driverData = {
        name: formData.get("driver_name"),
        noOfExperience: parseInt(formData.get("driver_experience")),
        phoneNumber: formData.get("driver_phone"),
      };

      // Convert FormData to a vehicle object - IMPORTANT: Match the exact field names from your backend
      const updatedVehicle = {
        make: vehicle.make, // Keep existing value
        model: formData.get("model"),
        city: formData.get("city"),
        year: parseInt(formData.get("year")),
        registration_number: formData.get("registration_number"),
        vehicle_type: vehicle.vehicle_type, // Keep existing value
        kilometers_per_day: parseInt(formData.get("kilometers_per_day")),
        per_extra_kilometer: parseInt(formData.get("per_extra_kilometer")),
        price_per_day: parseInt(formData.get("price_per_day")),
        currency_type: vehicle.currency_type, // Keep existing value
        color: formData.get("color"),
        capacity: parseInt(formData.get("capacity")),
        fuel_type: formData.get("fuel_type"), // Make sure this matches backend expectations
        transmission: formData.get("transmission"),
        description: formData.get("description"),
        service: formData.get("service"),
        driver: driverData, // Add driver information
      };

      // API endpoint
      const apiUrl = `http://localhost:3000/api/vehicles/${vehicle._id}`;

      // Make the API call
      axios
        .put(apiUrl, updatedVehicle, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((response) => {
          console.log("Vehicle updated successfully:", response.data);
          setVehicle(response.data);
          setIsSaving(false);
          setIsEditing(false);

          toast.success("Vehicle details updated successfully", {
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
          console.error("Error updating vehicle:", error);
          setIsSaving(false);

          toast.error(
            `Failed to update vehicle details: ${error.response?.data?.message || error.message}`,
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
        });
    } catch (err) {
      console.error("Error saving vehicle data:", err);
      setIsSaving(false);

      toast.error("An unexpected error occurred while saving", {
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
  };

  const handleEditVehicle = () => {
    if (isEditing) {
      saveVehicleToAPI();
    } else {
      setIsEditing(true);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleFileSelect = (e) => {
    try {
      if (e.target.files && e.target.files.length > 0) {
        const filesArray = Array.from(e.target.files);
        setSelectedFiles(filesArray);
        setFileCount(filesArray.length);
      }
    } catch (err) {
      console.error("Error selecting files:", err);

      toast.error("Failed to select files", {
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
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUploadImages = () => {
    try {
      if (!vehicle || selectedFiles.length === 0) {
        toast.warning("Please select files first", {
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
        return;
      }

      // Store scroll position before upload
      storeScrollPosition();

      // Set uploading state
      setIsUploading(true);

      // Create FormData for file upload
      const uploadFormData = new FormData();
      selectedFiles.forEach((file) => {
        uploadFormData.append("images[]", file);
      });

      // Adjust the API endpoint for images upload
      const uploadUrl = `http://localhost:3000/api/vehicles/${vehicle._id}/images`;

      // Make API call to upload images
      axios
        .put(uploadUrl, uploadFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((response) => {
          console.log("Images uploaded successfully:", response.data);

          // Always fetch the latest data after upload
          // This ensures consistent rendering of images
          fetchVehicleData(true);

          // Reset file selection
          setSelectedFiles([]);
          setFileCount(0);
          setIsUploading(false);

          toast.success("Images uploaded successfully", {
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
          console.error("Error uploading images:", error);
          setIsUploading(false);

          toast.error(
            `Failed to upload images: ${error.response?.data?.message || error.message}`,
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
        });
    } catch (err) {
      console.error("Error handling image upload:", err);
      setIsUploading(false);

      toast.error("Failed to upload images", {
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
  };

  // Helper function to generate proper image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/api/placeholder/400/320";

    if (imagePath.startsWith("http")) {
      return imagePath;
    } else {
      return `http://localhost:3000/uploads/${imagePath}`;
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="bg-gray-100 min-h-screen p-4 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">
          Loading vehicle data...
        </div>
      </div>
    );
  }

  // If vehicle data hasn't loaded yet
  if (!vehicle) {
    return (
      <div className="bg-gray-100 min-h-screen p-4 flex items-center justify-center">
        <div className="text-xl font-semibold text-red-600">
          Failed to load vehicle data. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <ToastContainer />

        {/* Header with Title and Edit/Save Button */}
        <div className="flex justify-between items-center border-b pb-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {vehicle.make ? brandName : "Toyota"} {vehicle.model} (
            {vehicle.registration_number})
          </h1>
          <div className="flex gap-2">
            {isEditing && (
              <button
                onClick={handleCancelEdit}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded transition duration-200"
                disabled={isSaving}
              >
                Cancel
              </button>
            )}
            <button
              onClick={handleEditVehicle}
              className={`${isEditing ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"} text-white py-2 px-4 rounded transition duration-200`}
              disabled={isSaving}
            >
              {isSaving
                ? "Saving..."
                : isEditing
                  ? "Save Changes"
                  : "Edit Vehicle Details"}
            </button>
          </div>
        </div>

        {/* Use a form approach with regular HTML inputs rather than controlled components */}
        <form ref={formRef}>
          {/* Vehicle Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Model</h3>
              {isEditing ? (
                <input
                  type="text"
                  name="model"
                  defaultValue={vehicle.model}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              ) : (
                <p className="text-gray-800">{vehicle.model}</p>
              )}
            </div>

            <div>
              <h3 className="text-sm text-gray-500 mb-1">Year</h3>
              {isEditing ? (
                <input
                  type="number"
                  name="year"
                  defaultValue={vehicle.year}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              ) : (
                <p className="text-gray-800">{vehicle.year}</p>
              )}
            </div>

            <div>
              <h3 className="text-sm text-gray-500 mb-1">
                Registration Number
              </h3>
              {isEditing ? (
                <input
                  type="text"
                  name="registration_number"
                  defaultValue={vehicle.registration_number}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              ) : (
                <p className="text-gray-800">{vehicle.registration_number}</p>
              )}
            </div>

            <div>
              <h3 className="text-sm text-gray-500 mb-1">Location</h3>
              {isEditing ? (
                <input
                  type="text"
                  name="city"
                  defaultValue={vehicle.city}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              ) : (
                <p className="text-gray-800">{vehicle.city}</p>
              )}
            </div>

            <div>
              <h3 className="text-sm text-gray-500 mb-1">Color</h3>
              {isEditing ? (
                <input
                  type="text"
                  name="color"
                  defaultValue={vehicle.color}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              ) : (
                <p className="text-gray-800">{vehicle.color}</p>
              )}
            </div>

            <div>
              <h3 className="text-sm text-gray-500 mb-1">Capacity</h3>
              {isEditing ? (
                <input
                  type="number"
                  name="capacity"
                  defaultValue={vehicle.capacity}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              ) : (
                <p className="text-gray-800">{vehicle.capacity}</p>
              )}
            </div>

            <div>
              <h3 className="text-sm text-gray-500 mb-1">Price Per Day</h3>
              {isEditing ? (
                <input
                  type="number"
                  name="price_per_day"
                  defaultValue={vehicle.price_per_day}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              ) : (
                <p className="text-gray-800">{vehicle.price_per_day}</p>
              )}
            </div>

            <div>
              <h3 className="text-sm text-gray-500 mb-1">Kilometers Per Day</h3>
              {isEditing ? (
                <input
                  type="number"
                  name="kilometers_per_day"
                  defaultValue={vehicle.kilometers_per_day}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              ) : (
                <p className="text-gray-800">{vehicle.kilometers_per_day}</p>
              )}
            </div>

            <div>
              <h3 className="text-sm text-gray-500 mb-1">
                Per Extra Kilometer
              </h3>
              {isEditing ? (
                <input
                  type="number"
                  name="per_extra_kilometer"
                  defaultValue={vehicle.per_extra_kilometer}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              ) : (
                <p className="text-gray-800">{vehicle.per_extra_kilometer}</p>
              )}
            </div>

            <div>
              <h3 className="text-sm text-gray-500 mb-1">Fuel Type</h3>
              {isEditing ? (
                <input
                  type="text"
                  name="fuel_type"
                  defaultValue={vehicle.fuel_type}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              ) : (
                <p className="text-gray-800">{vehicle.fuel_type}</p>
              )}
            </div>

            <div>
              <h3 className="text-sm text-gray-500 mb-1">Transmission</h3>
              {isEditing ? (
                <input
                  type="text"
                  name="transmission"
                  defaultValue={vehicle.transmission}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              ) : (
                <p className="text-gray-800">{vehicle.transmission}</p>
              )}
            </div>

            <div>
              <h3 className="text-sm text-gray-500 mb-1">Service Status</h3>
              {isEditing ? (
                <select
                  name="service"
                  defaultValue={vehicle.service}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="on">On</option>
                  <option value="off">Off</option>
                </select>
              ) : (
                <p className="text-gray-800 capitalize">{vehicle.service}</p>
              )}
            </div>
          </div>

          {/* Driver Details Section - Made Editable */}
          <div className="bg-gray-50 rounded-lg p-4 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Driver Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm text-gray-500 mb-1">Name</h3>
                {isEditing ? (
                  <input
                    type="text"
                    name="driver_name"
                    defaultValue={vehicle.driver?.name || ""}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                ) : (
                  <p className="text-gray-800">
                    {vehicle.driver?.name || "Not provided"}
                  </p>
                )}
              </div>

              <div>
                <h3 className="text-sm text-gray-500 mb-1">Experience</h3>
                {isEditing ? (
                  <input
                    type="number"
                    name="driver_experience"
                    defaultValue={vehicle.driver?.noOfExperience || 0}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                ) : (
                  <p className="text-gray-800">
                    {vehicle.driver?.noOfExperience
                      ? `${vehicle.driver.noOfExperience} years`
                      : "Not provided"}
                  </p>
                )}
              </div>

              <div>
                <h3 className="text-sm text-gray-500 mb-1">Contact</h3>
                {isEditing ? (
                  <input
                    type="text"
                    name="driver_phone"
                    defaultValue={vehicle.driver?.phoneNumber || ""}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                ) : (
                  <p className="text-gray-800">
                    {vehicle.driver?.phoneNumber || "Not provided"}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Description
            </h2>
            {isEditing ? (
              <textarea
                name="description"
                defaultValue={vehicle.description || ""}
                className="w-full p-3 border border-gray-300 rounded h-32 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">
                {vehicle.description || "No description available"}
              </p>
            )}
          </div>
        </form>

        {/* Images Section */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Vehicle Images
          </h2>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Images Grid */}
            <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {images && images.length > 0 ? (
                images.map((image, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="h-48 overflow-hidden rounded-lg shadow-sm">
                      <img
                        src={getImageUrl(image)}
                        alt={`Vehicle Image ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.log("Image failed to load:", image);
                          e.target.src = "/api/placeholder/400/320";
                        }}
                      />
                    </div>
                    <div className="mt-2 text-center">
                      <button
                        onClick={() => handleDeleteImage(index)}
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded text-sm transition duration-200"
                        disabled={isDeleting}
                      >
                        {isDeleting ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500 mb-2">
                    No images available for this vehicle
                  </p>
                  <p className="text-sm text-gray-400">
                    Add images using the panel on the right
                  </p>
                </div>
              )}
            </div>

            {/* Add Images Section */}
            <div className="w-full md:w-64 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-4">Add Images</h3>

              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                multiple
                accept="image/*"
              />

              {/* Clickable area */}
              <div
                onClick={handleBrowseClick}
                className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center cursor-pointer hover:bg-blue-50 transition duration-200"
              >
                <div className="text-3xl mb-2">📁</div>
                <p className="text-sm text-gray-500">
                  Drag & drop images here or click to browse
                </p>
                {fileCount > 0 && (
                  <p className="mt-2 text-blue-500 font-medium">
                    {fileCount} file{fileCount !== 1 ? "s" : ""} selected
                  </p>
                )}
              </div>

              <button
                onClick={handleUploadImages}
                className={`mt-4 w-full ${fileCount > 0 ? "bg-green-500 hover:bg-green-600" : "bg-gray-400"} text-white py-2 px-4 rounded transition duration-200`}
                disabled={fileCount === 0 || isUploading}
              >
                {isUploading ? "Uploading..." : "Upload Images"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
