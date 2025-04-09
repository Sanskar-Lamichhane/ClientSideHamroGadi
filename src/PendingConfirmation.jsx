import React from 'react';
import { CheckCircle, Clock, Home, ChevronRight, Car, Mail, Calendar, MapPin } from 'lucide-react';
import axios from "axios";
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const RentalConfirmation = () => {
  const [email, setEmail] = useState(null);
  const { id } = useParams();
  const [singleRentalDetails, setSingleRentalDetails] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3000/api/rental/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
    .then(res => {
      console.log(res.data.individualRentalDetails[0]);
      setSingleRentalDetails(res.data.individualRentalDetails[0]);
    })
    .catch(err => {
      console.error("Error fetching rental details:", err);
    });
  }, [id]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/user/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
    .then(res => {
      setEmail(res.data.email);
    })
    .catch(err => {
      console.error("Error fetching user details:", err);
    });
  }, []);

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };
  
  return (
    <div className="flex flex-col items-center justify-center mt-28 mb-10">
      {/* Main container - optimized for laptop screens but responsive */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Status and Confirmation */}
          <div className="lg:col-span-1 flex flex-col">
            {/* Status Banner */}
            <div className="bg-amber-100 rounded-xl p-4 mb-6 flex items-center">
              <Clock className="text-amber-500 mr-3 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold text-amber-700">Tour Request Pending</h3>
                <p className="text-sm text-amber-600">We're reviewing your request</p>
              </div>
            </div>

            {/* Illustration & Check Icon */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-4">
                <div className="bg-blue-600 rounded-full p-6 flex items-center justify-center">
                  <Car className="text-white" size={64} />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-100 rounded-full p-2 border-4 border-white">
                  <CheckCircle className="text-green-600" size={32} />
                </div>
              </div>
            </div>

            {/* Confirmation Message */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Rental Confirmed!</h2>
              <p className="text-gray-600">Your vehicle tour request is in process</p>
            </div>
            
            {/* Email Confirmation */}
            <div className="bg-blue-50 rounded-xl p-4 mb-6 flex items-center">
              <Mail className="text-blue-600 mr-3 flex-shrink-0" size={20} />
              <div className="text-sm">
                <p className="text-blue-800 font-medium">Confirmation details sent to</p>
                <p className="text-blue-600 break-all">{email}</p>
              </div>
            </div>
          </div>

          {/* Right column - Rental Details */}
          <div className="lg:col-span-2">
            <div className="border border-gray-200 rounded-xl p-6 mb-6 h-full">
              <h3 className="font-semibold text-xl mb-4 text-gray-800 border-b pb-2">Rental Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Car className="text-blue-500 mr-3 flex-shrink-0 mt-1" size={20} />
                  <div className="flex justify-between w-full">
                    <span className="text-gray-600 font-medium">Vehicle ID:</span>
                    <span className="font-medium text-right text-gray-800">{singleRentalDetails?.vehicle?._id || 'Loading...'}</span>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Car className="text-blue-500 mr-3 flex-shrink-0 mt-1" size={20} />
                  <div className="flex justify-between w-full">
                    <span className="text-gray-600 font-medium">Vehicle:</span>
                    <span className="font-medium text-right text-gray-800">
                      {singleRentalDetails?.vehicle?.make?.brandName || 'Loading...'} {singleRentalDetails?.vehicle?.model || ''} {singleRentalDetails?.vehicle?.year || ''}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar className="text-blue-500 mr-3 flex-shrink-0 mt-1" size={20} />
                  <div className="flex justify-between w-full">
                    <span className="text-gray-600 font-medium">Pickup Date:</span>
                    <span className="font-medium text-right text-gray-800">{formatDate(singleRentalDetails.pickUpDateTime) || 'Loading...'}</span>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar className="text-blue-500 mr-3 flex-shrink-0 mt-1" size={20} />
                  <div className="flex justify-between w-full">
                    <span className="text-gray-600 font-medium">Return Date:</span>
                    <span className="font-medium text-right text-gray-800">{formatDate(singleRentalDetails.dropOffDateTime) || 'Loading...'}</span>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="text-blue-500 mr-3 flex-shrink-0 mt-1" size={20} />
                  <div className="flex justify-between w-full">
                    <span className="text-gray-600 font-medium">Pickup Location:</span>
                    <span className="font-medium text-right text-gray-800">{singleRentalDetails.pickUpLocation || 'Loading...'}</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 my-4"></div>
                
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-xl text-gray-800">Total:</span>
                  <span className="font-bold text-xl text-blue-700">NPR {singleRentalDetails.price || '0'}</span>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3 text-center mt-4">
                  <span className="text-sm text-gray-600">Rental #{singleRentalDetails._id || 'Processing...'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Full width - Navigation Buttons */}
          <div className="lg:col-span-3 flex flex-col md:flex-row gap-4">
            <Link to="/MyBookings" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl flex items-center justify-center transition-colors text-lg font-medium shadow-md">
              <Clock className="mr-2" size={20} />
              View Pending Requests
              <ChevronRight className="ml-2" size={20} />
            </Link>
            
            <Link to="/" className="flex-1 bg-white hover:bg-blue-50 text-blue-700 py-3 px-4 rounded-xl border border-blue-200 flex items-center justify-center transition-colors text-lg font-medium">
              <Home className="mr-2" size={20} />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalConfirmation;