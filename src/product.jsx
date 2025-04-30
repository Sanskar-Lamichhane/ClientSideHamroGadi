import React, { useState, useEffect } from "react";
import {
  FiMapPin,
  FiCalendar,
  FiClock,
  FiUsers,
  FiSearch,
} from "react-icons/fi";
import { RiSteeringLine, RiGasStationLine } from "react-icons/ri";
import { IoCarSportOutline } from "react-icons/io5";
import axios from "axios";
import Pagination from "rc-pagination";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import placeholder from "./assets/images/inf.png";

const Product = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Extract search term from URL params on initial load
  useEffect(() => {
    setSearchInput(searchParams.get("search_term") || "");
  }, [searchParams]);

  // Pagination state
  const [metadata, setMetadata] = useState({
    total: 0,
    page: parseInt(searchParams.get("page") || "1"),
    per_page: parseInt(searchParams.get("per_page") || "25"),
  });

  // Filter data
  // const brands = ["Honda", "Hyundai", "Toyota", "Suzuki", "Mahindra"];
  const cities = [
    "Chitwan",
    "Kathmandu",
    "Butwal",
    "Lalitpur",
    "Hetauda",
    "Bhaktapur",
    "Birgunj",
    "Biratnagar",
    "Dhangadi",
    "Surkhet",
  ];
  const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"];
  const transmissions = ["Automatic", "Manual"];
  const imageNotFound = placeholder;

  const [category, setCategory] = useState([]);
  const [brands, setBrands] = useState([]);

  // Get sort params from query params
  const sortField = searchParams.get("sortField") || "price_per_day";
  const sortBy = searchParams.get("sortBy") || "desc";

  // Fetch vehicles
  const fetchVehicles = async () => {
    setLoading(true);
    try {
      // Build the query string from all search params
      const response = await axios.get(
        `http://localhost:3000/api/vehicles${location.search}`,
      );

      // Check if response data is in expected format
      if (
        response.data &&
        Array.isArray(response.data) &&
        response.data.length > 0
      ) {
        setVehicles(response.data[0].data || []);
        setMetadata(
          response.data[0].meta_data || {
            total: 0,
            page: 1,
            per_page: 25,
          },
        );
      } else {
        // Empty or invalid response
        setVehicles([]);
        setMetadata({
          total: 0,
          page: 1,
          per_page: 25,
        });
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      setVehicles([]);
    } finally {
      setLoading(false);
    }
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
      .catch((err) => {});
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/brand")
      .then((res) => {
        if (res.status && res.status === 200) {
          setBrands(res.data.Brands);
        }
      })
      .catch((err) => {});
  }, []);

  // Initial fetch and when search params change
  useEffect(() => {
    fetchVehicles();
  }, [location.search]);

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    searchParams.set("search_term", searchInput);
    searchParams.set("page", "1"); // Reset to first page on new search
    setSearchParams(searchParams);
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    searchParams.set("page", newPage);
    setSearchParams(searchParams);
    window.scrollTo(0, 0); // Scroll to top when changing page
  };

  // Handle single-select filter
  const handleSingleSelect = (paramName, value) => {
    if (searchParams.get(paramName) === value) {
      // If same value is clicked again, remove it
      searchParams.delete(paramName);
    } else {
      // Set the new value
      searchParams.set(paramName, value);
    }

    // Reset to first page when changing filter
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  // FIXED FUNCTION: This was causing the issue
  const isFilterActive = (paramName, value) => {
    // For all single-select parameters
    const paramMappings = {
      types: "cat",
      brands: "make",
      fuelTypes: "fuel_type",
      transmission: "transmission",
      cities: "city",
    };

    const paramValue = searchParams.get(paramMappings[paramName]);

    // Compare case-insensitive to handle potential inconsistencies
    return paramValue && paramValue.toLowerCase() === value.toLowerCase();
  };

  // Reset all filters
  const resetFilters = () => {
    // Clear all search params
    searchParams.delete("search_term");
    searchParams.delete("cat");
    searchParams.delete("make");
    searchParams.delete("fuel_type");
    searchParams.delete("transmission");
    searchParams.delete("city");
    searchParams.delete("sortField");
    searchParams.delete("sortBy");

    // Keep only page and per_page
    searchParams.set("page", "1");
    searchParams.set("per_page", "25");

    // Update search params and reset search input
    setSearchParams(searchParams);
    setSearchInput("");
  };

  // Custom pagination item renderer
  const itemRender = (current, type, element) => {
    if (type === "page") {
      return (
        <button
          className={`w-10 h-10 flex items-center justify-center rounded-md mx-1 transition-colors ${
            current === metadata.page
              ? "bg-blue-500 text-white font-medium"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          {current}
        </button>
      );
    }
    if (type === "prev") {
      return (
        <button className="flex items-center justify-center px-3 h-10 rounded-md mx-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          Prev
        </button>
      );
    }
    if (type === "next") {
      return (
        <button className="flex items-center justify-center px-3 h-10 rounded-md mx-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
          Next
          <svg
            className="w-5 h-5 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>
      );
    }
    if (type === "jump-prev" || type === "jump-next") {
      return (
        <button className="w-10 h-10 flex items-center justify-center rounded-md mx-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
          ...
        </button>
      );
    }
    return element;
  };

  // Check if pagination should be shown
  const shouldShowPagination = metadata.total > metadata.per_page;

  return (
    <div className="bg-gray-50 min-h-screen mt-20">
      {/* Hero Banner */}
      <div className="relative h-48 bg-gray-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: "url('/api/placeholder/1200/400')" }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 h-full flex flex-col justify-center text-center">
          <h1 className="text-4xl font-bold text-white mb-2">VEHICLES</h1>
          <p className="text-xl text-white">
            Freedom to Explore – Rent Your Journey, Drive Your Adventure
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar filters */}
          <div className="lg:w-1/4">
            <div className="bg-white p-5 rounded-lg shadow-md sticky top-4 border border-gray-200">
              {/* Search */}
              <form onSubmit={handleSearch}>
                <div className="relative mb-6">
                  <input
                    type="text"
                    placeholder="Search here......"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <FiSearch className="absolute top-3 left-3 text-gray-400" />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 bg-teal-500 text-white p-1 rounded-md hover:bg-teal-600"
                  >
                    <FiSearch size={16} />
                  </button>
                </div>
              </form>

              <div className="border-b border-gray-200 pb-5 mb-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Types
                </h3>

                {/* Type filters (single-select) */}
                {category.map((category) => (
                  <div
                    key={`type-${category.categoryName}`}
                    className="flex items-center mb-2"
                  >
                    <input
                      type="checkbox"
                      id={`type-${category.categoryName}`}
                      checked={isFilterActive("types", category.categoryName)}
                      onChange={() =>
                        handleSingleSelect("cat", category.categoryName)
                      }
                      className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                    />
                    <label
                      htmlFor={`type-${category.categoryName}`}
                      className="ml-2 text-gray-700"
                    >
                      {category.categoryName.charAt(0).toUpperCase() +
                        category.categoryName.slice(1)}
                    </label>
                  </div>
                ))}

                {/* City filters (multi-select) */}
                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-4">
                  Cities
                </h3>
                {cities.map((city) => (
                  <div key={`city-${city}`} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`city-${city}`}
                      checked={isFilterActive("cities", city)}
                      onChange={() => handleSingleSelect("city", city)}
                      className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                    />
                    <label
                      htmlFor={`city-${city}`}
                      className="ml-2 text-gray-700"
                    >
                      {city.charAt(0).toUpperCase() + city.slice(1)}
                    </label>
                  </div>
                ))}
              </div>

              {/* Brand filters (single-select) */}
              <div className="border-b border-gray-200 pb-5 mb-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Brand
                </h3>
                {brands.map((brand) => (
                  <div
                    key={`brand-${brand.brandName}`}
                    className="flex items-center mb-2"
                  >
                    <input
                      type="checkbox"
                      id={`brand-${brand.brandName}`}
                      checked={isFilterActive("brands", brand.brandName)}
                      onChange={() =>
                        handleSingleSelect("make", brand.brandName)
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-teal-500"
                    />
                    <label
                      htmlFor={`brand-${brand.brandName}`}
                      className="ml-2 text-gray-700"
                    >
                      {brand.brandName}
                    </label>
                  </div>
                ))}
              </div>

              {/* Fuel Type filters (single-select) */}
              <div className="border-b border-gray-200 pb-5 mb-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Fuel Type
                </h3>
                {fuelTypes.map((fuel) => (
                  <div key={`fuel-${fuel}`} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`fuel-${fuel}`}
                      checked={isFilterActive("fuelTypes", fuel)}
                      onChange={() => handleSingleSelect("fuel_type", fuel)}
                      className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-teal-400"
                    />
                    <label
                      htmlFor={`fuel-${fuel}`}
                      className="ml-2 text-gray-700"
                    >
                      {fuel}
                    </label>
                  </div>
                ))}
              </div>

              {/* Transmission filters (single-select) */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Transmission
                </h3>
                {transmissions.map((trans) => (
                  <div
                    key={`trans-${trans}`}
                    className="flex items-center mb-2"
                  >
                    <input
                      type="checkbox"
                      id={`trans-${trans}`}
                      checked={isFilterActive("transmission", trans)}
                      onChange={() => handleSingleSelect("transmission", trans)}
                      className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-600"
                    />
                    <label
                      htmlFor={`trans-${trans}`}
                      className="ml-2 text-gray-700"
                    >
                      {trans}
                    </label>
                  </div>
                ))}
              </div>

              <button
                onClick={resetFilters}
                className="w-full mt-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Vehicle list */}
          <div className="lg:w-3/4">
            {/* Sort options and per page selector */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex items-center mb-4 md:mb-0">
                <p className="text-gray-700 mr-4">
                  <span className="text-teal-600 font-medium">
                    {metadata.total}
                  </span>{" "}
                  vehicles found
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">
                    Items per page:
                  </span>
                  <select
                    value={metadata.per_page}
                    className="border border-gray-300 rounded px-2 py-1"
                    onChange={(e) => {
                      searchParams.set("per_page", e.target.value);
                      searchParams.set("page", "1");
                      setSearchParams(searchParams);
                    }}
                  >
                    <option value="6">6</option>
                    <option value="8">8</option>
                    <option value="10">10</option>
                  </select>
                </div>

                <div className="relative">
                  <button
                    className="flex items-center gap-2 bg-gray-100 rounded-md px-3 py-1 hover:bg-gray-200 transition"
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                  >
                    <span className="text-gray-600 text-sm">Sort By: </span>
                    <span className="font-medium text-gray-800 text-sm">
                      {sortBy === "desc"
                        ? "Price: High to Low"
                        : "Price: Low to High"}
                    </span>
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>

                  {showSortDropdown && (
                    <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                        onClick={() => {
                          searchParams.set("sortField", "price_per_day");
                          searchParams.set("sortBy", "desc");
                          setSearchParams(searchParams);
                          setShowSortDropdown(false);
                        }}
                      >
                        Price: High to Low
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                        onClick={() => {
                          searchParams.set("sortField", "price_per_day");
                          searchParams.set("sortBy", "asc");
                          setSearchParams(searchParams);
                          setShowSortDropdown(false);
                        }}
                      >
                        Price: Low to High
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Loading state */}
            {loading && (
              <div className="space-y-6">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200"
                  >
                    <div className="md:flex">
                      <div className="md:w-2/5 h-64 md:h-auto">
                        <Skeleton height={250} />
                      </div>
                      <div className="md:w-3/5 p-6">
                        <Skeleton height={30} width="70%" />
                        <Skeleton height={20} count={3} className="mt-4" />
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-5">
                          <Skeleton height={20} />
                          <Skeleton height={20} />
                          <Skeleton height={20} />
                          <Skeleton height={20} />
                        </div>
                        <Skeleton height={40} width="40%" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Vehicle cards */}
            {!loading && vehicles.length > 0 && (
              <>
                <div className="space-y-6">
                  {vehicles.map((vehicle) => (
                    <div
                      key={vehicle._id}
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition border border-gray-200"
                    >
                      <div className="md:flex">
                        <div className="md:w-2/5 h-64 md:h-auto relative">
                          <img
                            src={
                              vehicle.images?.length > 0
                                ? `http://localhost:3000/uploads/${vehicle.images[0]}`
                                : placeholder
                            }
                            alt={`${vehicle.brandDetails?.brandName} ${vehicle.model}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-md text-sm font-medium">
                            {vehicle.brandDetails?.brandName || "Brand"}
                          </div>
                        </div>

                        <div className="md:w-3/5 p-6">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-2xl font-bold text-gray-900">
                              {vehicle.brandDetails?.brandName} {vehicle.model}
                            </h3>
                            <div className="text-blue-600 font-bold text-xl">
                              {vehicle.currency_type}{" "}
                              {vehicle.price_per_day.toLocaleString()}
                              <span className="text-xs text-gray-500">
                                /day
                              </span>
                            </div>
                          </div>

                          <p className="text-gray-600 mb-4">
                            {vehicle.description}
                          </p>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
                            <div className="flex items-center text-gray-700">
                              <FiUsers className="mr-2 text-teal-500" />
                              <span>{vehicle.capacity} Seats</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                              <RiSteeringLine className="mr-2 text-blue-500" />
                              <span>{vehicle.transmission}</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                              <RiGasStationLine className="mr-2 text-blue-500" />
                              <span>{vehicle.fuel_type}</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                              <IoCarSportOutline className="mr-2 text-blue-500" />
                              <span>{vehicle.vehicle_type?.categoryName}</span>
                            </div>
                          </div>

                          <Link
                            to={`/singleVehicle/${vehicle._id}`}
                            className="w-full md:w-auto px-8 py-3 bg-blue-500 hover:bg-blue-700 text-white font-medium rounded transition"
                          >
                            Rent Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Improved Pagination - Only show when total > per_page */}
                {shouldShowPagination && (
                  <div className="mt-8 flex justify-center">
                    <div className="bg-white px-4 py-3 rounded-lg shadow">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                          Showing{" "}
                          <span className="font-medium">
                            {(metadata.page - 1) * metadata.per_page + 1}
                          </span>{" "}
                          to{" "}
                          <span className="font-medium">
                            {Math.min(
                              metadata.page * metadata.per_page,
                              metadata.total,
                            )}
                          </span>{" "}
                          of{" "}
                          <span className="font-medium">{metadata.total}</span>{" "}
                          results
                        </div>
                        <Pagination
                          total={metadata.total}
                          pageSize={metadata.per_page}
                          current={metadata.page}
                          onChange={handlePageChange}
                          className="flex items-center"
                          itemRender={itemRender}
                          showLessItems={true}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Empty state */}
            {!loading && vehicles.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 16v3M19 9v3m0-6V3m-8 18h-4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2v7M3 8h18M9 22l3-3m0 0l3 3m-3-3v-7"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-700">
                  No vehicles found
                </h3>
                <p className="text-gray-500 mt-2">
                  Try changing your filters or adjusting your search criteria
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
