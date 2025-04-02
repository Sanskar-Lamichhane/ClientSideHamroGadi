// import Skeleton from "react-loading-skeleton";
// import axios from "axios";
// import { useState, useEffect } from 'react'
// import FeaturedProduct from "./FeaturedProduct";
// import { useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import Pagination from 'rc-pagination';
// import { useSearchParams } from "react-router-dom";

// function Product() {

//     const[paginationData,setPaginationData]=useState({
//         total:0,
//         page:1,
//         per_page: 25
//     })

//     const [latestProduct, setLatestProduct] = useState([]);
//     const navigate = useNavigate()

//     const [currentSearchParams,setSearchParams]=useSearchParams();


//     const params = useLocation();
//     console.log(params)

//     const hello=useParams();
//     console.log(hello)





//     useEffect(() => {
//         axios.get("https://ecommerce-sagartmg2.vercel.app/api/products" + params.search).
//             then((res) => {
//                 console.log(res)
//                 setLatestProduct(res.data.products)
//                 setPaginationData(res.data.metadata)
//             })
//             .catch((error) => {
//                 console.log(err)
//             })
//     }, [params.search])

//     // useEffect(()=>{
//     //     axios.get("https://ecommerce-sagartmg2.vercel.app/api/products"+useParams.search).
//     //     then((res)=>{
//     //       console.log(res)
//     //       setProducts(res.data.data[0].data)
//     //     })
//     //   },[])

//     return (
//         <>
//             <section className="h-48 bg-primary-light flex items-center">
//                 <div className="container">
//                     <p className="text-4xl font-bold">Product Title</p>
//                     <p className="text-xl mt-3">Home / Products</p>
//                 </div>
//             </section>

//             <section className=" container mt-16">
//                 <div className="mb-12 flex items-center justify-between">
//                     <div>
//                         <p className='text-primary-dark text-3xl font-bold'>Ecommerce Furniture Accesorries and Items</p>
//                         <Pagination
//                         total={paginationData.total}
//                         pageSize={paginationData.per_page}
//                         prevIcon=" < prev "
//                         nextIcon=" next > "
//                         current={paginationData.page}
//                         onChange={(pageNumber)=>{
//                             console.log(pageNumber)
//                             currentSearchParams.set("page", pageNumber)
//                             setSearchParams(currentSearchParams)
//                         }}
//                         showTotal={(total,range)=>
//                             `${range[0]} - ${range[1]} of ${total} items`

//                         }
     
//                         />
//                     </div>

//                     <div className="flex gap-4">
//                         <select name="" id="" onChange={(e) => {
//                             e.preventDefault();
//                             currentSearchParams.set("per_page", e.target.value)
//                             setSearchParams(currentSearchParams)
//                         }}>
//                             <option value="25">25</option>
//                             <option value="50">50</option>
//                             <option value="100">100</option>
//                         </select>


//                         <select name="" id="" onChange={(e) => {
//                             e.preventDefault();
//                             currentSearchParams.set("sort", e.target.value)
//                             setSearchParams(currentSearchParams)
                           
//                         }}>
//                             <option value="datedesc">latest</option>
//                             <option value="pricedesc">price desc</option>
//                         </select>

                        
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
//                     <div className="border border-gray-300">
//                         filters...
//                     </div>
//                     <div className='border border-gray-300 sm:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4'>

//                         {
//                             Array.isArray(latestProduct)
//                                 ?

//                                 (
//                                     latestProduct.length === 0 ?
//                                         <>
//                                             <Skeleton height={200} />
//                                             <Skeleton height={200} />
//                                             <Skeleton height={200} />
//                                             <Skeleton height={200} />
//                                             <Skeleton height={200} />
//                                             <Skeleton height={200} />
//                                         </>
//                                         : latestProduct.map((element, index) => {
//                                             return (

//                                                 <FeaturedProduct key={index} type="latest" image={element.image}
//                                                     name={element.name} price={element.price} id={element._id} />
//                                             )
//                                         })) : (<p className="text-center text-gray-500 text-xl">No Products Available</p>)
//                         }


//                     </div>
//                 </div>
//             </section>
//         </>
//     )
// }

// export default Product;


import React, { useState } from 'react';
import { FiMapPin, FiCalendar, FiClock, FiUsers } from 'react-icons/fi';
import { RiSteeringLine, RiGasStationLine } from 'react-icons/ri';
import { IoCarSportOutline } from 'react-icons/io5';

const Product = () => {
  const [sortOrder, setSortOrder] = useState('high-to-low');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  
  // Time slots for pickup and drop-off
  const timeSlots = [
    '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', 
    '4:00', '4:30', '5:00', '5:30', '6:00', '6:30',
    '7:00', '7:30', '8:00', '8:30', '9:00', '9:30',
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30'
  ];
  
  // Sample vehicle data - simplified
  const vehicles = [
    {
      id: 1,
      name: 'Hyundai Creta',
      brand: 'Hyundai',
      price: 8000,
      priceUnit: 'Nrs',
      period: 'day',
      image: '/api/placeholder/400/250',
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      type: 'SUV',
    },
    {
      id: 2,
      name: 'Tata Nexon Ev',
      brand: 'Tata',
      price: 8500,
      priceUnit: 'Nrs',
      period: 'day',
      image: '/api/placeholder/400/250',
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Electric',
      type: 'SUV',
    },
    {
      id: 3,
      name: 'Suzuki Swift',
      brand: 'Suzuki',
      price: 6000,
      priceUnit: 'Nrs',
      period: 'day',
      image: '/api/placeholder/400/250',
      seats: 5,
      transmission: 'Manual',
      fuelType: 'Petrol',
      type: 'Hatchback',
    },
    {
      id: 4,
      name: 'Honda City',
      brand: 'Honda',
      price: 7500,
      priceUnit: 'Nrs',
      period: 'day',
      image: '/api/placeholder/400/250',
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      type: 'Sedan',
    },
    {
      id: 5,
      name: 'Toyota Fortuner',
      brand: 'Toyota',
      price: 12000,
      priceUnit: 'Nrs',
      period: 'day',
      image: '/api/placeholder/400/250',
      seats: 7,
      transmission: 'Automatic',
      fuelType: 'Diesel',
      type: 'SUV',
    },
    {
      id: 6,
      name: 'Mahindra Thar',
      brand: 'Mahindra',
      price: 9500,
      priceUnit: 'Nrs',
      period: 'day',
      image: '/api/placeholder/400/250',
      seats: 4,
      transmission: 'Manual',
      fuelType: 'Diesel',
      type: 'Off-road',
    }
  ];

  // Filter state
  const [filters, setFilters] = useState({
    brands: {
      Hyundai: false,
      Tata: false,
      Suzuki: false,
      Honda: false,
      Toyota: false,
      Mahindra: false
    },
    fuelTypes: {
      Petrol: false,
      Diesel: false,
      Electric: false,
      Hybrid: false
    },
    transmission: {
      Automatic: false,
      Manual: false
    },
    categories: {
      SUV: false,
      Sedan: false,
      Hatchback: false,
      'Off-road': false
    }
  });

  const toggleFilter = (category, item) => {
    setFilters({
      ...filters,
      [category]: {
        ...filters[category],
        [item]: !filters[category][item]
      }
    });
  };

  const toggleSortDropdown = () => {
    setShowSortDropdown(!showSortDropdown);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    setShowSortDropdown(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">Find Your Perfect Vehicle</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Choose from our wide selection of quality vehicles for your next adventure</p>
        </div>
        
        {/* Search and date-time filters */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-11 gap-4">
            <div className="lg:col-span-3">
              <div className="flex items-center border rounded-xl p-3 bg-white shadow-sm">
                <FiMapPin className="text-blue-500 mr-2" />
                <select className="w-full bg-transparent outline-none appearance-none text-gray-700">
                  <option>Select Location</option>
                  <option>Kathmandu</option>
                  <option>Pokhara</option>
                  <option>Chitwan</option>
                </select>
              </div>
            </div>
            
            {/* Pickup date and time on the same row */}
            <div className="lg:col-span-4">
              <div className="flex">
                <div className="flex-1 flex items-center border rounded-l-xl p-3 bg-white shadow-sm">
                  <FiCalendar className="text-blue-500 mr-2" />
                  <input 
                    type="date" 
                    placeholder="Pick-up Date"
                    className="w-full bg-transparent outline-none text-gray-700"
                  />
                </div>
                <div className="flex-1 flex items-center border-y border-r rounded-r-xl p-3 bg-white shadow-sm">
                  <FiClock className="text-blue-500 mr-2" />
                  <select className="w-full bg-transparent outline-none appearance-none text-gray-700">
                    <option value="">Pick-up Time</option>
                    {timeSlots.map((time, index) => (
                      <option key={`pickup-${index}`} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            {/* Return date and time on the same row */}
            <div className="lg:col-span-4">
              <div className="flex">
                <div className="flex-1 flex items-center border rounded-l-xl p-3 bg-white shadow-sm">
                  <FiCalendar className="text-blue-500 mr-2" />
                  <input 
                    type="date" 
                    placeholder="Return Date"
                    className="w-full bg-transparent outline-none text-gray-700"
                  />
                </div>
                <div className="flex-1 flex items-center border-y border-r rounded-r-xl p-3 bg-white shadow-sm">
                  <FiClock className="text-blue-500 mr-2" />
                  <select className="w-full bg-transparent outline-none appearance-none text-gray-700">
                    <option value="">Return Time</option>
                    {timeSlots.map((time, index) => (
                      <option key={`return-${index}`} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters - IMPROVED STYLING */}
          <div className="lg:w-1/5">
            <div className="bg-white p-3 rounded-2xl shadow-md sticky top-4">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                <button className="text-blue-600 text-sm font-medium hover:text-blue-800 transition">Reset</button>
              </div>
              
              {/* Brand filters - improved spacing */}
              <div className="mb-5">
                <h4 className="text-base font-semibold mb-3 text-gray-800">Brand</h4>
                <div className="space-y-2">
                  {Object.keys(filters.brands).map(brand => (
                    <div key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`brand-${brand}`}
                        checked={filters.brands[brand]}
                        onChange={() => toggleFilter('brands', brand)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor={`brand-${brand}`} className="ml-2 text-sm font-medium text-gray-700">{brand}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Fuel Type filters - improved spacing */}
              <div className="mb-5">
                <h4 className="text-base font-semibold mb-3 text-gray-800">Fuel Type</h4>
                <div className="space-y-2">
                  {Object.keys(filters.fuelTypes).map(fuelType => (
                    <div key={fuelType} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`fuel-${fuelType}`}
                        checked={filters.fuelTypes[fuelType]}
                        onChange={() => toggleFilter('fuelTypes', fuelType)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor={`fuel-${fuelType}`} className="ml-2 text-sm font-medium text-gray-700">{fuelType}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Transmission filters - improved spacing */}
              <div className="mb-5">
                <h4 className="text-base font-semibold mb-3 text-gray-800">Transmission</h4>
                <div className="space-y-2">
                  {Object.keys(filters.transmission).map(trans => (
                    <div key={trans} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`trans-${trans}`}
                        checked={filters.transmission[trans]}
                        onChange={() => toggleFilter('transmission', trans)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor={`trans-${trans}`} className="ml-2 text-sm font-medium text-gray-700">{trans}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Category filters - improved spacing */}
              <div>
                <h4 className="text-base font-semibold mb-3 text-gray-800">Vehicle Type</h4>
                <div className="space-y-2">
                  {Object.keys(filters.categories).map(category => (
                    <div key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`category-${category}`}
                        checked={filters.categories[category]}
                        onChange={() => toggleFilter('categories', category)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor={`category-${category}`} className="ml-2 text-sm font-medium text-gray-700">{category}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Vehicle grid */}
          <div className="lg:w-4/5">
            {/* Sort options */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-700 font-medium"><span className="text-blue-600">{vehicles.length}</span> vehicles found</p>
              <div className="relative">
                <button 
                  className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm hover:shadow transition"
                  onClick={toggleSortDropdown}
                >
                  <span className="text-gray-600 text-sm">Sort By: </span>
                  <span className="font-medium text-gray-800 text-sm">{sortOrder === 'high-to-low' ? 'Price: High to Low' : 'Price: Low to High'}</span>
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                
                {showSortDropdown && (
                  <div className="absolute right-0 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                    <button 
                      className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-sm rounded-t-xl"
                      onClick={() => handleSortChange('high-to-low')}
                    >
                      Price: High to Low
                    </button>
                    <button 
                      className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-sm rounded-b-xl"
                      onClick={() => handleSortChange('low-to-high')}
                    >
                      Price: Low to High
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Vehicle cards grid - WIDER CARDS */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map(vehicle => (
                <div key={vehicle.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
                  <div className="h-56 bg-gray-100 relative overflow-hidden">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-blue-600 bg-opacity-90 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {vehicle.brand}
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold text-gray-900">{vehicle.name}</h3>
                      <div className="text-blue-600 font-bold">
                        {vehicle.priceUnit} {vehicle.price.toLocaleString()}<span className="text-xs text-gray-500">/{vehicle.period}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-4">
                      <div className="flex items-center text-gray-600 text-sm">
                        <FiUsers className="mr-2 text-blue-500" /> {vehicle.seats} Seats
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <RiSteeringLine className="mr-2 text-blue-500" /> {vehicle.transmission}
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <RiGasStationLine className="mr-2 text-blue-500" /> {vehicle.fuelType}
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <IoCarSportOutline className="mr-2 text-blue-500" /> {vehicle.type}
                      </div>
                    </div>
                    
                    <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition duration-300 mt-2">
                      Rent Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;