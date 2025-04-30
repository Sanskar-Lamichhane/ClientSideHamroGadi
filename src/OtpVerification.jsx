import { Link, useLocation } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner"; // Import the spinner component

export default function VerificationCodeVerification() {
  const codeInputs = useRef([]);
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isResending, setIsResending] = useState(false); // New state for resend loading
  const navigate = useNavigate();

  // Get email from the location state (passed from the previous page)
  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    } else {
      setError("No email provided.");
    }
  }, [location]);

  // Auto-focus on the first input when the component mounts & clear fields
  useEffect(() => {
    if (codeInputs.current.length) {
      codeInputs.current.forEach((input) => (input.value = "")); // Clear all fields
      codeInputs.current[0].focus();
    }
  }, []);

  // Handle verification code input change
  const handleChange = (e, index) => {
    const { value } = e.target;
    if (!/^\d?$/.test(value)) return; // Only allow single digit (0-9)

    // Set verification code value
    setVerificationCode((prevCode) => {
      const newCode = [...prevCode];
      newCode[index] = value;
      return newCode.join("");
    });

    // Move to the next input if a number is entered
    if (value && index < 5) {
      codeInputs.current[index + 1]?.focus();
    }
  };

  // Handle backspace to move to the previous input
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      codeInputs.current[index - 1]?.focus();
    }
  };

  const resendingCode = () => {
    if (!email) {
      setError("Email is missing.");
      return;
    }

    setIsResending(true); // Set resend loading to true

    axios
      .post("http://localhost:3000/api/resendEmail", { email })
      .then((response) => {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
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
        setIsResending(false); // Reset the resend loading state
      });
  };

  // Handle form submission with axios (using .then() and .catch())
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    axios
      .post("http://localhost:3000/api/verifyEmail", {
        email,
        verificationCode, // Send the verification code
      })
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
        navigate("/login");
      })
      .catch((error) => {
        if (error.response.status == 400) {
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
        setIsSubmitting(false); // Reset the submitting state
      });
  };

  return (
    <div className="w-full bg-white mt-24 container">
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row">
        {/* Left Side - Illustration */}
        <div className="hidden lg:block lg:w-1/2 p-8">
          <img
            src="https://img.freepik.com/free-vector/otp-concept-illustration_114360-7893.jpg"
            alt="Verification Code Illustration"
            className="w-full max-w-2xl mx-auto"
          />
        </div>

        {/* Right Side - Verification Code Form */}
        <div className="w-full lg:w-1/2 p-4 lg:p-8">
          <div className="max-w-xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-blue-600">
              Verify Your Email
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
                We've sent a verification code to{" "}
                <span className="font-semibold">{email}</span>. Please enter the
                6-digit code below to verify your email address.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Verification Code Input Fields */}
              <div>
                <label className="block text-gray-700 mb-4 font-medium">
                  Enter Verification Code
                </label>
                <div className="flex justify-between gap-2">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <input
                      key={index}
                      ref={(el) => (codeInputs.current[index] = el)}
                      type="text"
                      maxLength="1"
                      onChange={(e) => handleChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ))}
                </div>
              </div>

              {/* Resend Code */}
              <div className="text-center">
                <p className="text-gray-700">
                  Didn't receive the code?
                  <button
                    type="button"
                    onClick={resendingCode}
                    className="text-blue-600 font-medium ml-2 hover:underline"
                  >
                    {isResending ? (
                      <Oval
                        height={24}
                        width={24}
                        color="#ffffff"
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="#ffffff"
                        strokeWidth={4}
                        strokeWidthSecondary={4}
                      />
                    ) : (
                      "Resend Code"
                    )}
                  </button>
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  You can request a new code continuously up to three times
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full p-4 bg-blue-600 text-white text-lg font-bold rounded-lg hover:bg-blue-700 transition duration-300 mt-6 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Oval
                    height={24}
                    width={24}
                    color="#ffffff"
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#ffffff"
                    strokeWidth={4}
                    strokeWidthSecondary={4}
                  />
                ) : (
                  "Verify Email"
                )}
              </button>
            </form>

            {/* Error or Success Message */}
            {error && <p className="text-red-600 mt-4">{error}</p>}
            {success && <p className="text-green-600 mt-4">Success!</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
