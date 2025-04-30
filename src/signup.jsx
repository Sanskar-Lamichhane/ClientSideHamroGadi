
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner"; // Import the spinner component

export default function SignUp() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const postingData = () => {
    setIsLoading(true);

    const phoneWithCountryCode = `+977${phoneNumber}`;

    axios
      .post("http://localhost:3000/api/signup", {
        email: email,
        password: password,
        name: name,
        password_confirmation: confirmPassword,
        phoneNumber: phoneWithCountryCode,
      })
      .then((response) => {
        navigate("/otp-verification", { state: { email } });
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response && error.response.status === 400) {
          error.response.data.errors.forEach((err) => {
            toast.error(err.message, {
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
      });
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 0 && value[0] !== "9") {
      value = "9" + value.substring(value.length > 1 ? 1 : 0);
    }

    if (value.length <= 10) {
      setPhoneNumber(value);
    }

    if (value.length > 0 && value.length !== 10) {
      setPhoneError("Phone number must be 10 digits");
    } else if (value.length > 0 && value[0] !== "9") {
      setPhoneError("Phone number must start with 9");
    } else {
      setPhoneError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-={}|;:,.<>?~`]+$/;

    if (value.length === 0) {
      setPasswordError("");
    } else if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else if (!passwordRegex.test(value)) {
      setPasswordError("Password contains invalid characters");
    } else {
      setPasswordError("");
    }

    if (confirmPassword && value !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    } else if (confirmPassword) {
      setConfirmPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !phoneError &&
      !passwordError &&
      !confirmPasswordError &&
      password === confirmPassword &&
      password.length >= 6
    ) {
      console.log("Form submitted successfully");
      postingData();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="w-full bg-white container mt-20">
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row">
        <div className="hidden lg:block lg:w-1/2 p-8">
          <img
            src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg?t=st=1742304338~exp=1742307938~hmac=7ecde455e15b225a893cbf3a2e38ccfeecea5a43565f4348eaa4ebd707ef7e15&w=1380"
            alt="Sign Up Illustration"
            className="w-full max-w-2xl mx-auto"
          />
        </div>

        <div className="w-full lg:w-1/2 p-4 lg:p-8">
          <div className="max-w-xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-blue-600">Sign Up</h2>

            <div className="mb-6">
              <Link
                to="/user-type"
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
                Go Back to User Type Selection
              </Link>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="9XXXXXXXXX"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    className={`w-full p-4 pl-8 border ${phoneError ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                    maxLength={10}
                  />
                  {phoneError && (
                    <p className="text-red-500 text-sm">{phoneError}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Email
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="******"
                      value={password}
                      onChange={handlePasswordChange}
                      className={`w-full p-4 border ${passwordError ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        // Eye-slash icon (password visible)
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        // Eye icon (password hidden)
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  <div className={`h-6 ${passwordError ? "block" : "hidden"}`}>
                    {passwordError && (
                      <p className="text-red-500 text-sm mt-1">
                        {passwordError}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="******"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      className={`w-full p-4 border ${confirmPasswordError ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {showConfirmPassword ? (
                        // Eye-slash icon (password visible)
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        // Eye icon (password hidden)
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  <div
                    className={`h-6 ${confirmPasswordError ? "block" : "hidden"}`}
                  >
                    {confirmPasswordError && (
                      <p className="text-red-500 text-sm mt-1">
                        {confirmPasswordError}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    required
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                    I agree to the
                    <Link
                      to="/policy"
                      className="text-blue-600 hover:underline"
                    >
                      Terms & Conditions
                    </Link>
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Oval
                      height={24}
                      width={24}
                      color="white"
                      secondaryColor="white"
                      ariaLabel="loading"
                      strokeWidth={4}
                    />
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
