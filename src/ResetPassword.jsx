import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner"; // Import the Oval spinner

export default function PasswordResetVerification() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || ""; // Get email from state
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  // Add state for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle OTP input change
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle password change with validation
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

  // Handle confirm password change
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  // Handle resend code
  const handleResendCode = () => {
    if (!email) {
      setError("Email is missing.");
      return;
    }

    setResending(true);

    axios
      .post("http://localhost:3000/api/resendEmail", {
        email,
      })
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
        if (error.response.status === 400) {
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
        setResending(false);
      });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is missing.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (otp.some((digit) => digit === "")) {
      setError("OTP is incomplete.");
      return;
    }
    if (passwordError || confirmPasswordError) {
      setError("Please fix the errors in the form.");
      return;
    }

    setLoading(true);
    setError("");

    axios
      .post("http://localhost:3000/api/setNewPassword", {
        email,
        newPassword: password,
        confirmPassword,
        verificationCode: otp.join(""),
      })
      .then((response) => {
        console.log(response.data.message);
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        localStorage.setItem("access_token", response.data.token);
        navigate("/");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast.error(err.response.data.message, {
            position: "top-right",
            autoClose: 3000,
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
        setLoading(false);
      });
  };

  // Toggle password visibility functions
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="w-full mt-24 bg-white container">
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row">
        <div className="hidden lg:block lg:w-1/2 p-8">
          <img
            src="https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1123.jpg"
            alt="Password Reset Illustration"
            className="w-full max-w-2xl mx-auto"
          />
        </div>
        <div className="w-full lg:w-1/2 p-4 lg:p-8">
          <div className="max-w-xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-blue-600">
              Reset Password
            </h2>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-gray-700">
                We've sent a verification code to{" "}
                <span className="font-semibold">{email}</span>.
              </p>
            </div>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-gray-700 font-medium">
                    Enter Verification Code
                  </label>
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={resending}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1 p-1 rounded-md hover:bg-blue-50 transition-all duration-200 text-sm font-medium"
                  >
                    {resending ? (
                      <span className="flex items-center">
                        <Oval
                          height={20}
                          width={20}
                          color="#0062FF"
                          visible={true}
                          ariaLabel="oval-loading"
                          secondaryColor="#00BFFF"
                          strokeWidth={4}
                          strokeWidthSecondary={4}
                        />
                        Sending...
                      </span>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                        Resend Code
                      </>
                    )}
                  </button>
                </div>
                <div className="flex justify-between gap-2">
                  {otp.map((data, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      maxLength="1"
                      value={data}
                      onChange={(e) => handleChange(e.target, index)}
                      className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ))}
                </div>
                <div className="mt-2 flex justify-center">
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={resending}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 transition-all duration-200"
                  >
                    {resending ? (
                      <Oval
                        height={20}
                        width={20}
                        color="#0062FF"
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="#00BFFF"
                        strokeWidth={4}
                        strokeWidthSecondary={4}
                      />
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 3v18m9-9H3"
                          />
                        </svg>
                        Resend Code
                      </>
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <div className="relative mt-1">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500"
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500"
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
                {passwordError && (
                  <p className="text-xs text-red-500">{passwordError}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="relative mt-1">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500"
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500"
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
                {confirmPasswordError && (
                  <p className="text-xs text-red-500">{confirmPasswordError}</p>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full py-2 text-white bg-blue-500 rounded-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <Oval
                      height={20}
                      width={20}
                      color="#ffffff"
                      visible={true}
                      ariaLabel="oval-loading"
                      secondaryColor="#00BFFF"
                      strokeWidth={4}
                      strokeWidthSecondary={4}
                    />
                  ) : (
                    "Reset Password"
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
