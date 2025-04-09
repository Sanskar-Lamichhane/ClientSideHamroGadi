import React from 'react';
import { Link } from 'react-router-dom';
import { FiPhoneCall, FiMail, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';
import { useEffect } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">InFleet</h3>
            <p className="text-gray-400 mb-6">
              Premium vehicle rental services for business and leisure. Experience comfort and reliability on every journey.
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                <FiFacebook size={20} />
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                <FiTwitter size={20} />
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                <FiInstagram size={20} />
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                <FiLinkedin size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/vehicles" className="text-gray-400 hover:text-blue-400 transition-colors">Browse Vehicles</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-blue-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/locations" className="text-gray-400 hover:text-blue-400 transition-colors">Locations</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-blue-400 transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-blue-400 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Vehicle Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Vehicle Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/product?cat=SUV" className="text-gray-400 hover:text-blue-400 transition-colors">SUVs</Link>
              </li>
              <li>
                <Link to="/product?cat=Sedan" className="text-gray-400 hover:text-blue-400 transition-colors">Sedans</Link>
              </li>
              <li>
                <Link to="/product?cat=Hatchback" className="text-gray-400 hover:text-blue-400 transition-colors">Hatchbacks</Link>
              </li>
              <li>
                <Link to="/product?cat=Van" className="text-gray-400 hover:text-blue-400 transition-colors">Vans</Link>
              </li>
              <li>
                <Link to="/product?cat=Luxury" className="text-gray-400 hover:text-blue-400 transition-colors">Luxury</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FiMapPin className="mt-1 mr-3 text-blue-500 flex-shrink-0" />
                <span className="text-gray-400">123 Rental Street, Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center">
                <FiPhoneCall className="mr-3 text-blue-500 flex-shrink-0" />
                <span className="text-gray-400">+977 1234 5678</span>
              </li>
              <li className="flex items-center">
                <FiMail className="mr-3 text-blue-500 flex-shrink-0" />
                <a href="mailto:info@infleet.com" className="text-gray-400 hover:text-blue-400 transition-colors">info@infleet.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>



      {/* Copyright Section */}
      <div className="bg-gray-950">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-sm text-gray-400">
              <p>© {currentYear} InFleet. All rights reserved.</p>
            </div>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6 text-sm">
                <li>
                  <Link to="/terms" className="text-gray-400 hover:text-gray-300">Terms & Conditions</Link>
                </li>
                
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;