import { useState } from 'react';

export default function VehicleEditPage() {
  // State to track if edit mode is active
  const [isEditing, setIsEditing] = useState(false);
  
  // Sample data from your API response
  const [vehicle, setVehicle] = useState({
    driver: {
      name: "Rajesh Thapa",
      noOfExperience: 5,
      phoneNumber: "+9779812345678"
    },
    _id: "67e65cd649b2b24438c73bf8",
    make: "67e6532e3472c32f1991f544",
    model: "Corolla",
    city: "kathmandu",
    year: 2019,
    registration_number: "BA 2 PA 1234",
    vehicle_type: "67e6543f3472c32f1991f550",
    kilometers_per_day: 200,
    per_extra_kilometer: 15,
    price_per_day: 5000,
    currency_type: "NPR",
    color: "White",
    capacity: 5,
    fuel_type: "Petrol",
    transmission: "Automatic",
    images: [], // Empty array in your API response
    description: "A reliable sedan perfect for city travel.",
    service: "on",
    reviews: [],
    created_by: "67c1a18f637c6297bf8783ee",
    __v: 2
  });

  // For demo purposes, let's add some sample images
  const [images, setImages] = useState([
    '/api/placeholder/400/320',
    '/api/placeholder/400/320',
    '/api/placeholder/400/320',
  ]);

  const handleDeleteImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleInputChange = (field, value) => {
    setVehicle({
      ...vehicle,
      [field]: value
    });
  };

  const handleDriverInputChange = (field, value) => {
    setVehicle({
      ...vehicle,
      driver: {
        ...vehicle.driver,
        [field]: value
      }
    });
  };

  const handleEditVehicle = () => {
    if (isEditing) {
      // Save logic would go here
      console.log("Saving vehicle details:", vehicle);
    }
    setIsEditing(!isEditing);
  };

  const handleCancelEdit = () => {
    // Reset the form or fetch original data
    setIsEditing(false);
  };

  // Input or text based on edit mode
  const EditableField = ({ label, value, field, type = "text" }) => {
    return (
      <div>
        <h3 className="text-sm text-gray-500 mb-1">{label}</h3>
        {isEditing ? (
          <input
            type={type}
            value={value}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        ) : (
          <p className="text-gray-800">{value}</p>
        )}
      </div>
    );
  };

  // Dropdown for service status
  const ServiceDropdown = () => {
    return (
      <div>
        <h3 className="text-sm text-gray-500 mb-1">Service Status</h3>
        {isEditing ? (
          <select
            value={vehicle.service}
            onChange={(e) => handleInputChange('service', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="on">On</option>
            <option value="off">Off</option>
          </select>
        ) : (
          <p className="text-gray-800 capitalize">{vehicle.service}</p>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        {/* Header with Title and Edit/Save Button */}
        <div className="flex justify-between items-center border-b pb-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Toyota {vehicle.model} ({vehicle.registration_number})</h1>
          <div className="flex gap-2">
            {isEditing && (
              <button 
                onClick={handleCancelEdit}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded transition duration-200"
              >
                Cancel
              </button>
            )}
            <button 
              onClick={handleEditVehicle}
              className={`${isEditing ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} text-white py-2 px-4 rounded transition duration-200`}
            >
              {isEditing ? 'Save Changes' : 'Edit Vehicle Details'}
            </button>
          </div>
        </div>

        {/* Vehicle Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <EditableField 
            label="Model" 
            value={vehicle.model} 
            field="model" 
          />
          <EditableField 
            label="Year" 
            value={vehicle.year} 
            field="year" 
            type="number" 
          />
          <EditableField 
            label="Registration Number" 
            value={vehicle.registration_number} 
            field="registration_number" 
          />
          <EditableField 
            label="Location" 
            value={vehicle.city} 
            field="city" 
          />
          <EditableField 
            label="Color" 
            value={vehicle.color} 
            field="color" 
          />
          <EditableField 
            label="Capacity" 
            value={vehicle.capacity} 
            field="capacity" 
            type="number" 
          />
          <EditableField 
            label="Price Per Day" 
            value={vehicle.price_per_day} 
            field="price_per_day" 
            type="number" 
          />
          <EditableField 
            label="Kilometers Per Day" 
            value={vehicle.kilometers_per_day} 
            field="kilometers_per_day" 
            type="number" 
          />
          <EditableField 
            label="Per Extra Kilometer" 
            value={vehicle.per_extra_kilometer} 
            field="per_extra_kilometer" 
            type="number" 
          />
          <EditableField 
            label="Fuel Type" 
            value={vehicle.fuel_type} 
            field="fuel_type" 
          />
          <EditableField 
            label="Transmission" 
            value={vehicle.transmission} 
            field="transmission" 
          />
          <ServiceDropdown />
        </div>

        {/* Driver Details Section */}
        <div className="bg-gray-50 rounded-lg p-4 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Driver Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Name</h3>
              {isEditing ? (
                <input
                  type="text"
                  value={vehicle.driver.name}
                  onChange={(e) => handleDriverInputChange('name', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              ) : (
                <p className="text-gray-800">{vehicle.driver.name}</p>
              )}
            </div>
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Experience</h3>
              {isEditing ? (
                <input
                  type="number"
                  value={vehicle.driver.noOfExperience}
                  onChange={(e) => handleDriverInputChange('noOfExperience', parseInt(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              ) : (
                <p className="text-gray-800">{vehicle.driver.noOfExperience} years</p>
              )}
            </div>
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Contact</h3>
              {isEditing ? (
                <input
                  type="text"
                  value={vehicle.driver.phoneNumber}
                  onChange={(e) => handleDriverInputChange('phoneNumber', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              ) : (
                <p className="text-gray-800">{vehicle.driver.phoneNumber}</p>
              )}
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
          {isEditing ? (
            <textarea
              value={vehicle.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded h-32"
            />
          ) : (
            <p className="text-gray-700 leading-relaxed">{vehicle.description}</p>
          )}
        </div>

        {/* Images Section - Not Editable */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Vehicle Images</h2>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Images Grid */}
            <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.length > 0 ? (
                images.map((image, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="h-48 overflow-hidden rounded-lg shadow-sm">
                      <img 
                        src={image} 
                        alt={`Vehicle Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="mt-2 text-center">
                      <button 
                        onClick={() => handleDeleteImage(index)}
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded text-sm transition duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-8 text-gray-500">
                  No images available for this vehicle.
                </div>
              )}
            </div>
            
            {/* Add Images Section */}
            <div className="w-full md:w-64 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-4">Add Images</h3>
              <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center cursor-pointer hover:bg-blue-50 transition duration-200">
                <div className="text-3xl mb-2">📁</div>
                <p className="text-sm text-gray-500">Drag & drop images here or click to browse</p>
              </div>
              <button className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition duration-200">
                Upload Images
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}