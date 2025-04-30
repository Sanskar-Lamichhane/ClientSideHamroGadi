import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner"; // Import the Oval spinner

export default function ForgotPassword() {
  const [email, setEmail] = useState(""); // Manage the email state
  const [loading, setLoading] = useState(false); // Track the loading state
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when the form is submitted

    axios
      .post("http://localhost:3000/api/forgetPassword", { email })
      .then((response) => {
        toast.success(response.data.message, {
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
        navigate("/PasswordResetVerification", { state: { email } });
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          toast.error(error.response.data.message, {
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
        } else if (error.response && error.response.status === 502) {
          toast.error(error.response.data.message, {
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
        }
      })
      .finally(() => {
        setLoading(false); // Set loading to false once the request is complete
      });
  };

  return (
    <div className="w-full bg-white mt-24 container">
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row">
        {/* Left Side - Illustration */}
        <div className="hidden lg:block lg:w-1/2 p-8">
          <img
            src="https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1123.jpg?t=st=1742304338~exp=1742307938~hmac=3fc070df83e1c6acb4d53f1f24ab11c8b6a5ac67ff7cde9794d629a6ab54b7e4&w=1380"
            alt="Forgot Password Illustration"
            className="w-full max-w-2xl mx-auto"
          />
        </div>

        {/* Right Side - Forgot Password Form */}
        <div className="w-full lg:w-1/2 p-4 lg:p-8">
          <div className="max-w-xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-blue-600">
              Reset Password
            </h2>

            <div className="mb-6">
              <Link
                to="/login"
                className="text-blue-600 flex items-center hover:underline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Back to Login
              </Link>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-gray-700">
                Enter your email address below and we'll send you a link to
                reset your password.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Email
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update the email state
                  placeholder="example@gmail.com"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full p-4 bg-blue-600 text-white text-lg font-bold rounded-lg hover:bg-blue-700 transition duration-300 mt-6"
                disabled={loading} // Disable the button when loading
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <Oval height={24} width={24} color="white" visible={true} />
                  </div>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>

            {/* Alternative Options */}
            <div className="mt-6 text-center">
              <span className="text-gray-700">Remember your password? </span>
              <Link
                to="/login"
                className="text-blue-600 font-medium hover:underline"
              >
                Login
              </Link>
            </div>

            <div className="mt-2 text-center">
              <span className="text-gray-700">Don't have an account? </span>
              <Link
                to="/signup"
                className="text-blue-600 font-medium hover:underline"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
