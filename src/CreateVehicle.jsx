// import React, { useState, useEffect } from 'react';
// import {
//     Car,
//     Save,
//     Upload,
//     Truck,
//     MapPin,
//     CalendarCheck,
//     DollarSign,
//     Palette,
//     Users,
//     PhoneCall
// } from 'lucide-react';
// import { toast, Bounce } from 'react-toastify';
// import axios from 'axios';

// function CreateVehiclePage() {
//     // State for form data
//     const [formData, setFormData] = useState({
//         make: '',
//         model: '',
//         city: '',
//         year: '',
//         registration_number: '',
//         vehicle_type: '',
//         kilometers_per_day: '',
//         per_extra_kilometer: '',
//         price_per_day: '',
//         color: '',
//         capacity: '',
//         fuel_type: '',
//         transmission: '',
//         service: '',
//         description: '',
//         driver: {
//             name: '',
//             noOfExperience: '',
//             phoneNumber: ''
//         }
//     });

//     // Predefined lists for dropdowns
//     const cities = [
//         "chitwan", "kathmandu", "butwal", "lalitpur", "hetauda",
//         "bhaktapur", "birgunj", "biratnagar", "dhangadi", "surkhet"
//     ];

//     const colors = ["Black", "Red", "Blue", "Violet", "Grey", "White", "Yellow", "Pink"];
//     const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
//     const transmissionTypes = ['Manual', 'Automatic'];

//     // Handle input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         // Handle nested driver object
//         if (name.startsWith('driver.')) {
//             setFormData(prev => ({
//                 ...prev,
//                 driver: {
//                     ...prev.driver,
//                     [name.split('.')[1]]: value
//                 }
//             }));
//         } else {
//             setFormData(prev => ({
//                 ...prev,
//                 [name]: value
//             }));
//         }
//     };

//     // Handle form submission
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // TODO: Implement form submission logic
//         axios.post("http://localhost:3000/api/vehicles", {
//             formData
//         },
//             {
//                 headers: {
//                     "Content-Type": "multipart/form-data",  // Set the Content-Type header
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("access_token")}`
//                     }
//                 }
//             })
//             .then(res => {
//                 if(res.status=== 200){

//         toast.success('Vehicle Created Successfully', {
//             position: "top-right",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "colored",
//             transition: Bounce,
//           });
//                 }
//             })
//             .catch(err=>{

//             })
//         console.log(formData);
//     };

//     return (
//         <div className="create-vehicle-page p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
//             <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-8">
//                 <div className="flex items-center mb-8 border-b pb-4">
//                     <Car className="mr-4 text-indigo-600" size={40} />
//                     <h1 className="text-2xl font-bold text-gray-800">Add New Vehicle</h1>
//                 </div>

//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     {/* Vehicle Basic Information */}
//                     <div className="grid md:grid-cols-3 gap-6">
//                         <div className="form-group">
//                             <label className="block text-gray-700 font-medium mb-2">
//                                 <Truck className="inline-block mr-2 text-indigo-500" size={16} />
//                                 Make/Brand
//                             </label>
//                             <input
//                                 type="text"
//                                 name="make"
//                                 value={formData.make}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                 placeholder="e.g., Toyota, Honda, Ford"
//                                 required
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label className="block text-gray-700 font-medium mb-2">
//                                 <Car className="inline-block mr-2 text-indigo-500" size={16} />
//                                 Model
//                             </label>
//                             <input
//                                 type="text"
//                                 name="model"
//                                 value={formData.model}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                 placeholder="e.g., Camry, Civic, Mustang"
//                                 required
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label className="block text-gray-700 font-medium mb-2">
//                                 <MapPin className="inline-block mr-2 text-indigo-500" size={16} />
//                                 City
//                             </label>
//                             <select
//                                 name="city"
//                                 value={formData.city}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                 required
//                             >
//                                 <option value="">Select Vehicle Location</option>
//                                 {cities.map(city => (
//                                     <option key={city} value={city}>{city.charAt(0).toUpperCase() + city.slice(1)}</option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>

//                     {/* Vehicle Details */}
//                     <div className="grid md:grid-cols-3 gap-6">
//                         <div className="form-group">
//                             <label className="block text-gray-700 font-medium mb-2">
//                                 <CalendarCheck className="inline-block mr-2 text-indigo-500" size={16} />
//                                 Year
//                             </label>
//                             <input
//                                 type="number"
//                                 name="year"
//                                 value={formData.year}
//                                 onChange={handleChange}
//                                 min="1900"
//                                 max="2025"
//                                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                 placeholder="Manufacturing year"
//                                 required
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label className="block text-gray-700 font-medium mb-2">
//                                 <Car className="inline-block mr-2 text-indigo-500" size={16} />
//                                 Registration Number
//                             </label>
//                             <input
//                                 type="text"
//                                 name="registration_number"
//                                 value={formData.registration_number}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                 placeholder="Vehicle registration ID"
//                                 required
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label className="block text-gray-700 font-medium mb-2">
//                                 <Palette className="inline-block mr-2 text-indigo-500" size={16} />
//                                 Color
//                             </label>
//                             <select
//                                 name="color"
//                                 value={formData.color}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                 required
//                             >
//                                 <option value="">Select Vehicle Color</option>
//                                 {colors.map(color => (
//                                     <option key={color} value={color}>{color}</option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>

//                     {/* Pricing and Service Details */}
//                     <div className="grid md:grid-cols-3 gap-6">
//                         <div className="form-group">
//                             <label className="block text-gray-700 font-medium mb-2">
//                                 <DollarSign className="inline-block mr-2 text-indigo-500" size={16} />
//                                 Price per Day
//                             </label>
//                             <input
//                                 type="number"
//                                 name="price_per_day"
//                                 value={formData.price_per_day}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                 placeholder="Daily rental rate"
//                                 required
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label className="block text-gray-700 font-medium mb-2">
//                                 <Car className="inline-block mr-2 text-indigo-500" size={16} />
//                                 Kilometers per Day
//                             </label>
//                             <input
//                                 type="number"
//                                 name="kilometers_per_day"
//                                 value={formData.kilometers_per_day}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                 placeholder="Included daily kilometers"
//                                 required
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label className="block text-gray-700 font-medium mb-2">
//                                 <DollarSign className="inline-block mr-2 text-indigo-500" size={16} />
//                                 Per Extra Kilometer
//                             </label>
//                             <input
//                                 type="number"
//                                 name="per_extra_kilometer"
//                                 value={formData.per_extra_kilometer}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                 placeholder="Rate for additional km"
//                                 required
//                             />
//                         </div>
//                     </div>

//                     {/* Additional Vehicle Details */}
//                     <div className="grid md:grid-cols-3 gap-6">
//                         <div className="form-group">
//                             <label className="block text-gray-700 font-medium mb-2">
//                                 <Users className="inline-block mr-2 text-indigo-500" size={16} />
//                                 Capacity
//                             </label>
//                             <input
//                                 type="number"
//                                 name="capacity"
//                                 value={formData.capacity}
//                                 onChange={handleChange}
//                                 min="2"
//                                 max="15"
//                                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                 placeholder="Number of passengers"
//                                 required
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label className="block text-gray-700 font-medium mb-2">
//                                 <Car className="inline-block mr-2 text-indigo-500" size={16} />
//                                 Fuel Type
//                             </label>
//                             <select
//                                 name="fuel_type"
//                                 value={formData.fuel_type}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                 required
//                             >
//                                 <option value="">Select Fuel Type</option>
//                                 {fuelTypes.map(type => (
//                                     <option key={type} value={type}>{type}</option>
//                                 ))}
//                             </select>
//                         </div>

//                         <div className="form-group">
//                             <label className="block text-gray-700 font-medium mb-2">
//                                 <Car className="inline-block mr-2 text-indigo-500" size={16} />
//                                 Transmission
//                             </label>
//                             <select
//                                 name="transmission"
//                                 value={formData.transmission}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                 required
//                             >
//                                 <option value="">Select Transmission Type</option>
//                                 {transmissionTypes.map(type => (
//                                     <option key={type} value={type}>{type}</option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>

//                     {/* Driver Details */}
//                     <div className="grid md:grid-cols-3 gap-6">
//                         <div className="form-group">
//                             <label className="block text-gray-700 font-medium mb-2">
//                                 <Users className="inline-block mr-2 text-indigo-500" size={16} />
//                                 Driver Name
//                             </label>
//                             <input
//                                 type="text"
//                                 name="driver.name"
//                                 value={formData.driver.name}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                 placeholder="Full name of the driver"
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label className="block text-gray-700 font-medium mb-2">
//                                 <CalendarCheck className="inline-block mr-2 text-indigo-500" size={16} />
//                                 Driver Experience
//                             </label>
//                             <input
//                                 type="number"
//                                 name="driver.noOfExperience"
//                                 value={formData.driver.noOfExperience}
//                                 onChange={handleChange}
//                                 min="1"
//                                 max="50"
//                                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                 placeholder="Years of driving experience"
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label className="block text-gray-700 font-medium mb-2">
//                                 <PhoneCall className="inline-block mr-2 text-indigo-500" size={16} />
//                                 Driver Phone
//                             </label>
//                             <input
//                                 type="tel"
//                                 name="driver.phoneNumber"
//                                 value={formData.driver.phoneNumber}
//                                 onChange={handleChange}
//                                 pattern="\+9779[0-9]{9}"
//                                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                 placeholder="Driver's contact number"
//                             />
//                         </div>
//                     </div>

//                     {/* Description and Service */}
//                     <div className="grid md:grid-cols-2 gap-6">
//                         <div className="form-group">
//                             <label className="block text-gray-700 font-medium mb-2">
//                                 Description
//                             </label>
//                             <textarea
//                                 name="description"
//                                 value={formData.description}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                 placeholder="Additional vehicle details, special features, or notes"
//                                 rows="4"
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label className="block text-gray-700 font-medium mb-2">
//                                 Service Status
//                             </label>
//                             <select
//                                 name="service"
//                                 value={formData.service}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                 required
//                             >
//                                 <option value="">Select Vehicle Service Status</option>
//                                 <option value="on">On Service</option>
//                                 <option value="off">Off Service</option>
//                             </select>
//                         </div>
//                     </div>

//                     {/* Image Upload */}
//                     <div className="form-group">
//                         <label className="block text-gray-700 font-medium mb-2">
//                             <Upload className="inline-block mr-2 text-indigo-500" size={16} />
//                             Vehicle Images
//                         </label>
//                         <div className="border-2 border-dashed border-indigo-200 p-6 text-center">
//                             <input
//                                 type="file"
//                                 multiple
//                                 accept="image/*"
//                                 className="hidden"
//                                 id="vehicle-images"
//                             />
//                             <label
//                                 htmlFor="vehicle-images"
//                                 className="cursor-pointer text-indigo-600 hover:text-indigo-800"
//                             >
//                                 Click to upload vehicle images
//                             </label>
//                         </div>
//                     </div>

//                     {/* Submit Button */}
//                     <div className="flex justify-end mt-6">
//                         <button
//                             type="submit"
//                             className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors flex items-center"
//                         >
//                             <Save className="mr-2" size={16} /> Save Vehicle
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default CreateVehiclePage;

import React, { useState, useEffect } from 'react';
import {
    Car,
    Save,
    Upload,
    Truck,
    MapPin,
    CalendarCheck,
    DollarSign,
    Palette,
    Users,
    PhoneCall
} from 'lucide-react';
import { toast, Bounce } from 'react-toastify';
import axios from 'axios';
import { useRef } from 'react';

function CreateVehiclePage() {

    // Ref for file input
    const fileInputRef = useRef(null);
    const initialFormData = {
        make: '',
        model: '',
        city: '',
        year: '',
        registration_number: '',
        vehicle_type: '',
        kilometers_per_day: '',
        per_extra_kilometer: '',
        price_per_day: '',
        color: '',
        capacity: '',
        fuel_type: '',
        transmission: '',
        service: '',
        description: '',
        driver: {
            name: '',
            noOfExperience: '',
            phoneNumber: ''
        },
        images: []
    };

    // State for form data
    const [formData, setFormData] = useState({
        make: '',
        model: '',
        city: '',
        year: '',
        registration_number: '',
        vehicle_type: '',
        kilometers_per_day: '',
        per_extra_kilometer: '',
        price_per_day: '',
        color: '',
        capacity: '',
        fuel_type: '',
        transmission: '',
        service: '',
        description: '',
        driver: {
            name: '',
            noOfExperience: '',
            phoneNumber: ''
        },
        images: []
    });

    // State for dropdown options fetched from backend
    const cities = ["Chitwan", "Kathmandu", "Butwal", "Surkhet", "Biratnagar", "Hetauda"]
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [makes, setMakes] = useState([]);

    const colors = ["Black", "Red", "Blue", "Violet", "Grey", "White", "Yellow", "Pink"];
    const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
    const transmissionTypes = ['Manual', 'Automatic'];

    // Fetch dropdown data from backend
    useEffect(() => {
        const fetchDropdownData = async () => {
            try {
                const token = localStorage.getItem("access_token");


                // Fetch vehicle types
                const vehicleTypesResponse = await axios.get('http://localhost:3000/api/vehicleType');
                setVehicleTypes(vehicleTypesResponse.data.Types);

                // Fetch vehicle makes/brands
                const makesResponse = await axios.get('http://localhost:3000/api/brand');
                setMakes(makesResponse.data.Brands);
            } catch (error) {
                console.error('Error fetching dropdown data:', error);
                toast.error('Failed to load dropdown options', {
                    position: "top-right",
                    autoClose: 5000,
                    theme: "colored",
                    transition: Bounce,
                });
            }
        };

        fetchDropdownData();
    }, []);


    const handleChange = (e) => {
        const { name, value, files } = e.target;

        // Handle file uploads
        if (name === 'images') {
            setFormData(prev => ({
                ...prev,
                images: Array.from(files)
            }));
            return;
        }

        // Handle nested driver object
        if (name.startsWith('driver.')) {
            setFormData(prev => ({
                ...prev,
                driver: {
                    ...prev.driver,
                    [name.split('.')[1]]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        // Create FormData object
        const submitFormData = new FormData();

        // Append all non-nested fields
        Object.keys(formData).forEach(key => {
            if (key === 'driver') {
                // Append driver details
                Object.keys(formData.driver).forEach(driverKey => {
                    submitFormData.append(`driver.${driverKey}`, formData.driver[driverKey]);
                });
            } else if (key === 'images') {
                // Append images
                formData.images.forEach((image) => {
                    submitFormData.append('images[]', image);
                });
            } else if (key !== 'driver' && key !== 'images') {
                // Append other fields
                submitFormData.append(key, formData[key]);
            }
        });

        // Send form data
        axios.post("http://localhost:3000/api/vehicles", submitFormData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        })
            .then(res => {
                if (res.status === 200) {

                    setFormData(initialFormData);

                    // Reset file input
                    if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                    }

                    toast.success('Vehicle Created Successfully', {
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
            })
            .catch(err => {
                toast.error('Failed to create vehicle', {
                    position: "top-right",
                    autoClose: 5000,
                    theme: "colored",
                    transition: Bounce,
                });
            });
    };

    return (
        <div className="create-vehicle-page p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-8">
                <div className="flex items-center mb-8 border-b pb-4">
                    <Car className="mr-4 text-indigo-600" size={40} />
                    <h1 className="text-2xl font-bold text-gray-800">Add New Vehicle</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Vehicle Basic Information */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="form-group">
                            <label className="block text-gray-700 font-medium mb-2">
                                <Truck className="inline-block mr-2 text-indigo-500" size={16} />
                                Make/Brand
                            </label>
                            <select
                                name="make"
                                value={formData.make}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            >
                                <option value="">Select Vehicle Brand</option>
                                {makes.map(make => (
                                    <option key={make._id} value={make._id}>
                                        {make.brandName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="block text-gray-700 font-medium mb-2">
                                <Car className="inline-block mr-2 text-indigo-500" size={16} />
                                Model
                            </label>
                            <input
                                type="text"
                                name="model"
                                value={formData.model}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="e.g., Camry, Civic, Mustang"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="block text-gray-700 font-medium mb-2">
                                <MapPin className="inline-block mr-2 text-indigo-500" size={16} />
                                City
                            </label>
                            <select
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            >
                                <option value="">Select Vehicle Location</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Vehicle Details */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="form-group">
                            <label className="block text-gray-700 font-medium mb-2">
                                <Car className="inline-block mr-2 text-indigo-500" size={16} />
                                Vehicle Type
                            </label>
                            <select
                                name="vehicle_type"
                                value={formData.vehicle_type}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            >
                                <option value="">Select Vehicle Type</option>
                                {vehicleTypes.map(type => (
                                    <option key={type._id} value={type._id}>
                                        {type.categoryName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="block text-gray-700 font-medium mb-2">
                                <CalendarCheck className="inline-block mr-2 text-indigo-500" size={16} />
                                Year
                            </label>
                            <input
                                type="number"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                min="1900"
                                max="2025"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Manufacturing year"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="block text-gray-700 font-medium mb-2">
                                <Car className="inline-block mr-2 text-indigo-500" size={16} />
                                Registration Number
                            </label>
                            <input
                                type="text"
                                name="registration_number"
                                value={formData.registration_number}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Vehicle registration ID"
                                required
                            />
                        </div>
                    </div>

                    {/* Pricing and Service Details */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="form-group">
                            <label className="block text-gray-700 font-medium mb-2">
                                <DollarSign className="inline-block mr-2 text-indigo-500" size={16} />
                                Price per Day
                            </label>
                            <input
                                type="number"
                                name="price_per_day"
                                value={formData.price_per_day}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Daily rental rate"
                                min="1"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="block text-gray-700 font-medium mb-2">
                                <Car className="inline-block mr-2 text-indigo-500" size={16} />
                                Kilometers per Day
                            </label>
                            <input
                                type="number"
                                name="kilometers_per_day"
                                value={formData.kilometers_per_day}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Included daily kilometers"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="block text-gray-700 font-medium mb-2">
                                <DollarSign className="inline-block mr-2 text-indigo-500" size={16} />
                                Per Extra Kilometer
                            </label>
                            <input
                                type="number"
                                name="per_extra_kilometer"
                                value={formData.per_extra_kilometer}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Rate for additional km"
                                min="1"
                                required
                            />
                        </div>
                    </div>

                    {/* Additional Vehicle Details */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="form-group">
                            <label className="block text-gray-700 font-medium mb-2">
                                <Palette className="inline-block mr-2 text-indigo-500" size={16} />
                                Color
                            </label>
                            <select
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            >
                                <option value="">Select Vehicle Color</option>
                                {colors.map(color => (
                                    <option key={color} value={color}>{color}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="block text-gray-700 font-medium mb-2">
                                <Users className="inline-block mr-2 text-indigo-500" size={16} />
                                Capacity
                            </label>
                            <input
                                type="number"
                                name="capacity"
                                value={formData.capacity}
                                onChange={handleChange}
                                min="2"
                                max="15"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Number of passengers"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="block text-gray-700 font-medium mb-2">
                                <Car className="inline-block mr-2 text-indigo-500" size={16} />
                                Fuel Type
                            </label>
                            <select
                                name="fuel_type"
                                value={formData.fuel_type}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            >
                                <option value="">Select Fuel Type</option>
                                {fuelTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Transmission and Service Details */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="form-group">
                            <label className="block text-gray-700 font-medium mb-2">
                                <Car className="inline-block mr-2 text-indigo-500" size={16} />
                                Transmission
                            </label>
                            <select
                                name="transmission"
                                value={formData.transmission}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            >
                                <option value="">Select Transmission Type</option>
                                {transmissionTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="block text-gray-700 font-medium mb-2">
                                Service Status
                            </label>
                            <select
                                name="service"
                                value={formData.service}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            >
                                <option value="">Select Vehicle Service Status</option>
                                <option value="on">On Service</option>
                                <option value="off">Off Service</option>
                            </select>
                        </div>
                    </div>

                    {/* Driver Details */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="form-group">
                            <label className="block text-gray-700 font-medium mb-2">
                                <Users className="inline-block mr-2 text-indigo-500" size={16} />
                                Driver Name
                            </label>
                            <input
                                type="text"
                                name="driver.name"
                                value={formData.driver.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Full name of the driver"
                            />
                        </div>

                        <div className="form-group">
                            <label className="block text-gray-700 font-medium mb-2">
                                <CalendarCheck className="inline-block mr-2 text-indigo-500" size={16} />
                                Driver Experience
                            </label>
                            <input
                                type="number"
                                name="driver.noOfExperience"
                                value={formData.driver.noOfExperience}
                                onChange={handleChange}
                                min="1"
                                max="50"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Years of driving experience"
                            />
                        </div>

                        <div className="form-group">
                            <label className="block text-gray-700 font-medium mb-2">
                                <PhoneCall className="inline-block mr-2 text-indigo-500" size={16} />
                                Driver Phone
                            </label>
                            <input
                                type="tel"
                                name="driver.phoneNumber"
                                value={formData.driver.phoneNumber}
                                onChange={handleChange}
                                pattern="\+9779[0-9]{9}"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Driver's contact number"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="form-group">
                        <label className="block text-gray-700 font-medium mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Additional vehicle details, special features, or notes"
                            rows="4"
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="form-group">
                        <label className="block text-gray-700 font-medium mb-2">
                            <Upload className="inline-block mr-2 text-indigo-500" size={16} />
                            Vehicle Images
                        </label>
                        <div className="border-2 border-dashed border-indigo-200 p-6 text-center">
                            <input
                                type="file"
                                multiple
                                name="images"
                                accept="image/*"
                                onChange={handleChange}
                                ref={fileInputRef}  // Add ref here
                                id="vehicle-images"
                            />

                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors flex items-center"
                        >
                            <Save className="mr-2" size={16} /> Save Vehicle
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateVehiclePage;