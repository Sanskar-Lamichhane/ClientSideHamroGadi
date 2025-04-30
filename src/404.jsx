import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="w-full bg-white container">
      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 p-8">
          <div className="max-w-xl mx-auto">
            <h1 className="text-7xl font-bold text-blue-600 mb-4">404</h1>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Page Not Found
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/"
                className="px-6 py-3 bg-blue-600 text-white text-center font-medium rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 p-6 flex justify-center">
          <img
            src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg"
            alt="404 Error Illustration"
            className="w-full max-w-lg"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Looking for something?
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <Link to="/login" className="hover:text-blue-600 hover:underline">
                Login to your account
              </Link>
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <Link
                to="/signup"
                className="hover:text-blue-600 hover:underline"
              >
                Create a new account
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
