
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiCalendar, FiMapPin, FiUsers, FiChevronRight } from "react-icons/fi";
import { RiCarLine, RiGasStationLine, RiSteeringLine } from "react-icons/ri";
import { IoCarSportOutline } from "react-icons/io5";
import placeholder from "./assets/images/inf.png";
import axios from "axios";

const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState({
    city: "",
    vehicleType: "",
    pickupDate: "",
    returnDate: "",
  });
  const imageNotFound = placeholder;

  const [dateErrors, setDateErrors] = useState({
    pickupDate: "",
    returnDate: "",
  });
  const [category, setCategory] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  // Get today's date in YYYY-MM-DD format for min date attribute
  const today = new Date().toISOString().split("T")[0];

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

  // Handle form input changes with validation
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const field =
      id === "location"
        ? "city"
        : id === "vehicle-type"
          ? "vehicleType"
          : id === "pickup-date"
            ? "pickupDate"
            : id === "return-date"
              ? "returnDate"
              : id;

    // Update form data
    setFormData({
      ...formData,
      [field]: value,
    });

    // Validate dates
    if (field === "pickupDate") {
      // Clear previous errors
      setDateErrors((prev) => ({ ...prev, pickupDate: "" }));

      // If return date exists, validate pickup date is before return date
      if (formData.returnDate && value > formData.returnDate) {
        setDateErrors((prev) => ({
          ...prev,
          pickupDate: "Pickup date cannot be after return date",
        }));
      }
    }

    if (field === "returnDate") {
      // Clear previous errors
      setDateErrors((prev) => ({ ...prev, returnDate: "" }));

      // Validate return date is after pickup date
      if (formData.pickupDate && value < formData.pickupDate) {
        setDateErrors((prev) => ({
          ...prev,
          returnDate: "Return date must be after pickup date",
        }));
      }
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for validation errors before submitting
    if (dateErrors.pickupDate || dateErrors.returnDate) {
      return; // Don't submit if there are errors
    }

    // Construct the search params
    const searchParams = new URLSearchParams();
    searchParams.append("city", formData.city);
    searchParams.append("cat", formData.vehicleType);
    searchParams.append("pickDate", formData.pickupDate);
    searchParams.append("dropDate", formData.returnDate);

    axios
      .get(`http://localhost:3000/api/vehicles?${searchParams.toString()}`)
      .then((res) => {
        // Navigate to vehicles page with search params
        navigate(`/product?${searchParams.toString()}`);
      })
      .catch((err) => {
        console.error("Error fetching vehicles:", err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/vehicleType")
      .then((res) => {
        if (res.status && res.status === 200) {
          console.log(res.data.Types);
          setCategory(res.data.Types);
        }
      })
      .catch((err) => {
        console.error("Error fetching vehicle types:", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/vehicles")
      .then((res) => {
        if (res.data[0]) {
          console.log(res.data[0].data);
          setVehicles(res.data[0].data);
        }
      })
      .catch((err) => {
        console.error("Error fetching vehicles:", err);
      });
  }, []);

  const availableCities = [
    { value: "chitwan", label: "Chitwan" },
    { value: "kathmandu", label: "Kathmandu" },
    { value: "butwal", label: "Butwal" },
    { value: "lalitpur", label: "Lalitpur" },
    { value: "hetauda", label: "Hetauda" },
    { value: "bhaktapur", label: "Bhaktapur" },
    { value: "biratnagar", label: "Biratnagar" },
    { value: "dhangadi", label: "Dhangadi" },
    { value: "birgunj", label: "Birgunj" },
    { value: "surkhet", label: "Surkhet" },
  ];

  return (
    <div className="min-h-screen mt-20 bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 z-0 bg-backgroundVehicle"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "right center", // Position the image to the right
            backgroundRepeat: "no-repeat",
            filter: "brightness(0.7)", // Darkens the image slightly for better text contrast
          }}
        />

        {/* Dark Overlay for Better Text Contrast */}
        <div className="absolute inset-0 bg-black opacity-40 z-1"></div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 text-shadow">
              Find Your Perfect Ride with InFleet
            </h1>
            <p className="text-lg md:text-xl text-white mb-8 max-w-2xl text-shadow">
              Experience the freedom of the road with our premium fleet of
              vehicles. From city commutes to weekend adventures, we have the
              perfect car for every journey.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/vehicles"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition duration-300 shadow-lg hover:shadow-xl"
              >
                Browse Vehicles
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 border-2 border-white text-white font-medium rounded-full hover:bg-white/10 transition duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Form Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <form
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
            onSubmit={handleSubmit}
          >
            <div className="lg:col-span-1">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                City
              </label>
              <div className="relative">
                <select
                  id="location"
                  className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                >
                  <option value="">Select City</option>
                  {availableCities.map((city) => (
                    <option key={city.value} value={city.value}>
                      {city.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMapPin className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <label
                htmlFor="vehicle-type"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Vehicle Type
              </label>
              <div className="relative">
                <select
                  id="vehicle-type"
                  className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  required
                  value={formData.vehicleType}
                  onChange={handleInputChange}
                >
                  <option value="">All Categories</option>
                  {category.map((cat) => (
                    <option key={cat._id} value={cat.categoryName}>
                      {cat.categoryName}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <RiCarLine className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <label
                htmlFor="pickup-date"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Pickup Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="pickup-date"
                  className={`block w-full pl-10 pr-4 py-3 border ${dateErrors.pickupDate ? "border-red-500" : "border-gray-300"} rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500`}
                  required
                  min={today}
                  value={formData.pickupDate}
                  onChange={handleInputChange}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiCalendar className="h-5 w-5 text-gray-400" />
                </div>
                {dateErrors.pickupDate && (
                  <p className="mt-1 text-sm text-red-600">
                    {dateErrors.pickupDate}
                  </p>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <label
                htmlFor="return-date"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Return Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="return-date"
                  className={`block w-full pl-10 pr-4 py-3 border ${dateErrors.returnDate ? "border-red-500" : "border-gray-300"} rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500`}
                  required
                  min={formData.pickupDate || today}
                  value={formData.returnDate}
                  onChange={handleInputChange}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiCalendar className="h-5 w-5 text-gray-400" />
                </div>
                {dateErrors.returnDate && (
                  <p className="mt-1 text-sm text-red-600">
                    {dateErrors.returnDate}
                  </p>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <label className="invisible block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
                disabled={dateErrors.pickupDate || dateErrors.returnDate}
              >
                Find Vehicles
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Rest of the component remains unchanged */}
      {/* Vehicle Categories Section */}
      {/* Vehicle Categories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Our Fleet
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We offer a diverse range of vehicles to suit every need and
            preference. From compact city cars to spacious family SUVs, find the
            perfect match for your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* SUV Category */}
          <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <div className="h-48 bg-gray-200 relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="SUV Category"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">SUVs</h3>
              <p className="text-gray-600 mb-4">
                Spacious and powerful vehicles perfect for adventures and family
                trips.
              </p>

              <Link
                to={`/product?cat=suv`}
                className="text-blue-600 font-medium hover:text-blue-800 flex items-center"
              >
                View All SUVs <FiChevronRight className="ml-1" />
              </Link>
            </div>
          </div>

          {/* Sedan Category */}
          <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <div className="h-48 bg-gray-200 relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Sedan Category"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sedans</h3>
              <p className="text-gray-600 mb-4">
                Comfortable and fuel-efficient cars ideal for business trips and
                city driving.
              </p>

              <Link
                to={`/product?cat=Sedan`}
                className="text-blue-600 font-medium hover:text-blue-800 flex items-center"
              >
                View All Sedans <FiChevronRight className="ml-1" />
              </Link>
            </div>
          </div>

          {/* Hatchback Category */}
          <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <div className="h-48 bg-gray-200 relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1471444928139-48c5bf5173f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Hatchback Category"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Hatchbacks
              </h3>
              <p className="text-gray-600 mb-4">
                Compact and versatile vehicles perfect for urban environments
                and parking ease.
              </p>

              <Link
                to={`/product?cat=Hatchback`}
                className="text-blue-600 font-medium hover:text-blue-800 flex items-center"
              >
                View All Hatchbacks <FiChevronRight className="ml-1" />
              </Link>
            </div>
          </div>

          {/* Van Category */}
          <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <div className="h-48 bg-gray-200 relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1532581140115-3e355d1ed1de?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Van Category"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Vans</h3>
              <p className="text-gray-600 mb-4">
                Spacious vehicles designed for transporting groups or large
                cargo loads.
              </p>

              <Link
                to={`/product?cat=Van`}
                className="text-blue-600 font-medium hover:text-blue-800 flex items-center"
              >
                View All Vans <FiChevronRight className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Vehicles Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Vehicles
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our most popular choices selected for their exceptional
              performance, comfort, and value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.slice(0, 3).map((vehicle) => (
              <div
                key={vehicle._id}
                className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="h-56 bg-gray-200 relative overflow-hidden">
                  <img
                    src={
                      vehicle.images && vehicle.images.length > 0
                        ? `http://localhost:3000/uploads/${vehicle.images[0]}`
                        : placeholder
                    }
                    alt={vehicle.brandDetails.brandName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      {`${vehicle.brandDetails.brandName} ${vehicle.model}`}
                    </h3>
                    <span className="text-lg font-bold text-blue-600">
                      NPR {vehicle.price_per_day}/day
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center text-gray-500 text-sm">
                      <FiUsers className="mr-2" /> {vehicle.year} model
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <RiSteeringLine className="mr-2" /> {vehicle.transmission}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <RiGasStationLine className="mr-2" /> {vehicle.fuel_type}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <IoCarSportOutline className="mr-2" />{" "}
                      {vehicle.vehicle_type.categoryName}
                    </div>
                  </div>
                  <Link
                    to={`/product`}
                    className="block w-full py-3 bg-blue-600 hover:bg-blue-700 text-center text-white font-medium rounded-lg transition duration-300"
                  >
                    Rent Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Information Section (replacing Customer Stories) */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Fleet?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer premium service and quality vehicles to ensure your
              journey is comfortable and reliable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <RiCarLine className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-center text-gray-900 mb-4">
                Premium Fleet
              </h3>
              <p className="text-gray-600 text-center">
                Our vehicles are regularly maintained and cleaned to ensure you
                have a comfortable and reliable ride. All vehicles in our fleet
                are less than 3 years old.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FiUsers className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-center text-gray-900 mb-4">
                24/7 Support
              </h3>
              <p className="text-gray-600 text-center">
                Our customer service team is available around the clock to
                assist with any questions or issues you might encounter during
                your rental period.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FiMapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-center text-gray-900 mb-4">
                Convenient Locations
              </h3>
              <p className="text-gray-600 text-center">
                With pickup and drop-off points in major cities across the
                country, we make it easy to get your vehicle wherever your
                journey begins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Hit the Road?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
            Join thousands of satisfied customers who choose InFleet for their
            car rental needs. Experience premium vehicles and exceptional
            service today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/product"
              className="px-8 py-4 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition duration-300 shadow-lg"
            >
              Book a Vehicle
            </Link>
            <Link
              to="/about-us"
              className="px-8 py-4 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition duration-300"
            >
              About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
