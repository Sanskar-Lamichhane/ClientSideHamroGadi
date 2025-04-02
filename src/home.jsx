// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
// import FeaturedProduct from "./FeaturedProduct";
// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'
// import axios from 'axios';
// import { useState, useEffect } from 'react'




// function CarouselItems(props) {
//     return (
//         <div className={`${props.banner} h-[83vh] bg-cover bg-right text-left flex justify-start bg-no-repeat`}>
//             <div className='container'>
//                 <div className='w-2/4 mt-36'>
//                     <p className='text-secondary mb-7 text-2xl'>Best Furniture For Your Castle ...</p>
//                     <p className='text-5xl mb-7 font-bold leading-tight'>New Furniture Collection Trends in 2020</p>
//                     <button className='bg-blue-500 text-white font-semibold py-4 px-8 text-lg rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out'>
//                         Shop Now
//                     </button>


//                 </div>
//             </div>
//         </div>
//     )

// }

// function Home() {

//     const [trendingProduct, setTrendingProduct] = useState([]);
//     const[latestProduct,setLatestProduct]=useState([]);

//     useEffect(() => {
//         axios.get("https://ecommerce-sagartmg2.vercel.app/api/products/trending")
//             .then((response) => {
//                 setTrendingProduct(response.data.data)
//                 console.log(response.data.data)
//             })
//     }, [])

//     useEffect(()=>{
//         axios.get("https://ecommerce-sagartmg2.vercel.app/api/products")
//         .then((response) => {
//             setLatestProduct(response.data.products)
//             console.log(response.data.products)
//         })
//     },[])



//     return (
//         <>
     
//             <Carousel showThumbs={false} swipeable={true} >
//                 <CarouselItems banner="bg-banner-2" />
//                 <CarouselItems banner="bg-banner-2" />
//                 <CarouselItems banner="bg-banner-2" />



//             </Carousel>

//             <div className='container my-12 grid grid-cols-4 gap-4'>

//             {
//                 trendingProduct.length===0
//                 &&
//                 <>
//                 <Skeleton height={200} />
//                 <Skeleton height={200} />
//                 <Skeleton height={200} />
//                 <Skeleton height={200} />
//                 </>
//             }
//                 {
//                     trendingProduct.map((element,index)=>{
//                        return( <FeaturedProduct key={index} image={element.image}
//                         name={element.name} price={element.price} id={element._id}/>)
//                     })
//                 }

//                 {/* <FeaturedProduct/>
//           <FeaturedProduct/>
//           <FeaturedProduct/>
//           <FeaturedProduct/> */}

//             </div>

//             <p className='text-5xl text-center fotn-bold text-primary-dark mb-12 mt-6'>Latest Products</p>
//             <section className='container grid grid-cols-3 gap-4'>

//                 {
//                     latestProduct.length===0 &&
//                     <>
//                     <Skeleton height={200}/>
//                     <Skeleton height={200}/>
//                     <Skeleton height={200}/>
//                     <Skeleton height={200}/>
//                     <Skeleton height={200}/>
//                     <Skeleton height={200}/>
//                     </>
//                 }
//                 {
//                     latestProduct.map((element,index)=>{
//                         return(
//                             index>6|| index===1 ? null:
//                             <FeaturedProduct key={index} type="latest" image={element.image}
//                             name={element.name} price={element.price} id={element._id}/>
                            

//                         )
//                     })
//                 }
//                 {/* <FeaturedProduct type="latest"  />
//                 <FeaturedProduct type="latest" />
//                 <FeaturedProduct type="latest" /> */}
//             </section>
//         </>
//     )

// }

// export default Home;



import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiMapPin, FiUsers, FiChevronRight } from 'react-icons/fi';
import { RiCarLine, RiGasStationLine, RiSteeringLine } from 'react-icons/ri';
import { IoCarSportOutline } from 'react-icons/io5';

const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      {/* Hero Section */}
<section className="relative h-screen overflow-hidden">
  {/* Background Image with Overlay */}
  <div 
    className="absolute inset-0 z-0 bg-backgroundVehicle"
    style={{
      backgroundSize: "cover",
      backgroundPosition: "right center", // Position the image to the right
      backgroundRepeat: "no-repeat",
      filter: "brightness(0.7)" // Darkens the image slightly for better text contrast
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
        Experience the freedom of the road with our premium fleet of vehicles. 
        From city commutes to weekend adventures, we have the perfect car for every journey.
      </p>
      <div className="flex flex-wrap gap-4">
        <Link to="/vehicles" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition duration-300 shadow-lg hover:shadow-xl">
          Browse Vehicles
        </Link>
        <Link to="/about" className="px-8 py-4 border-2 border-white text-white font-medium rounded-full hover:bg-white/10 transition duration-300">
          Learn More
        </Link>
      </div>
    </div>
  </div>
</section>

      {/* Search Form Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-1">
  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
    Pickup Location
  </label>
  <div className="relative">
    <input 
      type="text" 
      id="location"
      placeholder="Enter location"
      className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
    />
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <FiMapPin className="h-5 w-5 text-gray-400" />
    </div>
  </div>
</div>
            
            <div className="lg:col-span-1">
              <label htmlFor="vehicle-type" className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Type
              </label>
              <div className="relative">
                <select 
                  id="vehicle-type"
                  className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Categories</option>
                  <option value="suv">SUV</option>
                  <option value="sedan">Sedan</option>
                  <option value="hatchback">Hatchback</option>
                  <option value="van">Van</option>
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <RiCarLine className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <label htmlFor="pickup-date" className="block text-sm font-medium text-gray-700 mb-2">
                Pickup Date
              </label>
              <div className="relative">
                <input 
                  type="date" 
                  id="pickup-date"
                  className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiCalendar className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <label htmlFor="return-date" className="block text-sm font-medium text-gray-700 mb-2">
                Return Date
              </label>
              <div className="relative">
                <input 
                  type="date" 
                  id="return-date"
                  className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiCalendar className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <label className="invisible block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
              >
                Find Vehicles
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Vehicle Categories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore Our Fleet</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We offer a diverse range of vehicles to suit every need and preference. 
            From compact city cars to spacious family SUVs, find the perfect match for your journey.
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
                Spacious and powerful vehicles perfect for adventures and family trips.
              </p>
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>18 vehicles</span>
                <span>From $65/day</span>
              </div>
              <Link 
                to="/vehicles/suv" 
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
                Comfortable and fuel-efficient cars ideal for business trips and city driving.
              </p>
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>24 vehicles</span>
                <span>From $45/day</span>
              </div>
              <Link 
                to="/vehicles/sedan" 
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
              <h3 className="text-xl font-bold text-gray-900 mb-2">Hatchbacks</h3>
              <p className="text-gray-600 mb-4">
                Compact and versatile vehicles perfect for urban environments and parking ease.
              </p>
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>15 vehicles</span>
                <span>From $38/day</span>
              </div>
              <Link 
                to="/vehicles/hatchback" 
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
                Spacious vehicles designed for transporting groups or large cargo loads.
              </p>
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>12 vehicles</span>
                <span>From $75/day</span>
              </div>
              <Link 
                to="/vehicles/van" 
                className="text-blue-600 font-medium hover:text-blue-800 flex items-center"
              >
                View All Vans <FiChevronRight className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Vehicles Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Vehicles</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our most popular choices selected for their exceptional performance, comfort, and value.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Vehicle Card 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="h-56 bg-gray-200 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1581540222194-0def2dda95b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Toyota RAV4" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Toyota RAV4</h3>
                  <span className="text-lg font-bold text-blue-600">$68/day</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Compact SUV with excellent fuel efficiency and spacious interior.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center text-gray-500 text-sm">
                    <FiUsers className="mr-2" /> 5 Seats
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <RiSteeringLine className="mr-2" /> Automatic
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <RiGasStationLine className="mr-2" /> Hybrid
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <IoCarSportOutline className="mr-2" /> SUV
                  </div>
                </div>
                <Link 
                  to="/vehicle/toyota-rav4" 
                  className="block w-full py-3 bg-blue-600 hover:bg-blue-700 text-center text-white font-medium rounded-lg transition duration-300"
                >
                  Rent Now
                </Link>
              </div>
            </div>
            
            {/* Vehicle Card 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="h-56 bg-gray-200 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1580274455191-1c62238fa333?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Honda Civic" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Honda Civic</h3>
                  <span className="text-lg font-bold text-blue-600">$52/day</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Reliable sedan with excellent fuel economy and modern features.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center text-gray-500 text-sm">
                    <FiUsers className="mr-2" /> 5 Seats
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <RiSteeringLine className="mr-2" /> Automatic
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <RiGasStationLine className="mr-2" /> Gas
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <IoCarSportOutline className="mr-2" /> Sedan
                  </div>
                </div>
                <Link 
                  to="/vehicle/honda-civic" 
                  className="block w-full py-3 bg-blue-600 hover:bg-blue-700 text-center text-white font-medium rounded-lg transition duration-300"
                >
                  Rent Now
                </Link>
              </div>
            </div>
            
            {/* Vehicle Card 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="h-56 bg-gray-200 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1464219222984-216ebffaaf85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Ford Transit" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Ford Transit</h3>
                  <span className="text-lg font-bold text-blue-600">$85/day</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Spacious van perfect for group travel or moving larger items.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center text-gray-500 text-sm">
                    <FiUsers className="mr-2" /> 9 Seats
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <RiSteeringLine className="mr-2" /> Automatic
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <RiGasStationLine className="mr-2" /> Diesel
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <IoCarSportOutline className="mr-2" /> Van
                  </div>
                </div>
                <Link 
                  to="/vehicle/ford-transit" 
                  className="block w-full py-3 bg-blue-600 hover:bg-blue-700 text-center text-white font-medium rounded-lg transition duration-300"
                >
                  Rent Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Customer Stories</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear what our satisfied customers have to say about their experience with InFleet.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <p className="text-gray-600 italic mb-6">
                "The booking process was incredibly smooth, and the SUV we rented was in perfect condition. 
                We had an amazing road trip thanks to InFleet!"
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                  <img 
                    src="https://randomuser.me/api/portraits/women/44.jpg" 
                    alt="Sarah Johnson" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500">Family trip to the mountains</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <p className="text-gray-600 italic mb-6">
                "As a business traveler, I appreciate the reliability and cleanliness of InFleet vehicles.
                Their sedan collection is top-notch, and the service is always professional."
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="Michael Chen" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Michael Chen</h4>
                  <p className="text-sm text-gray-500">Business consultant</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <p className="text-gray-600 italic mb-6">
                "We needed a van for a weekend move, and InFleet made it so easy.
                Great rates, clean vehicle, and zero hassle. Will definitely use again!"
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                  <img 
                    src="https://randomuser.me/api/portraits/women/68.jpg" 
                    alt="Emily Rodriguez" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Emily Rodriguez</h4>
                  <p className="text-sm text-gray-500">Local moving day</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Hit the Road?</h2>
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
            Join thousands of satisfied customers who choose InFleet for their car rental needs. 
            Experience premium vehicles and exceptional service today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/vehicles" 
              className="px-8 py-4 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition duration-300 shadow-lg"
            >
              Book a Vehicle
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-4 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;