
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setReduxUser } from "./Redux/Slice/userSlice";
import { jwtDecode } from "jwt-decode"; // ✅ Correct import
import { useState } from "react"; // Added import for useState hook

export default function Login() {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const postingData = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/api/login", {
        email: event.target.email.value,
        password: event.target.password.value,
      })
      .then((response) => {
        toast.success("Login Successfull", {
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
        localStorage.setItem("access_token", response.data.token);
        // Decode token to get user role
        const token = localStorage.getItem("access_token");
        const decoded = jwtDecode(token);
        console.log(decoded);
        dispatch(setReduxUser(decoded));
        const userRole = decoded.role; // Assuming role is inside the token

        // Store role in localStorage
        localStorage.setItem("userRole", userRole);
        localStorage.setItem("expiry_date", decoded.exp);

        if (userRole === "admin" || userRole === "vendor") {
          navigate("/dashboard"); // Redirect admin or vendor to dashboard
        } else {
          navigate("/"); // Redirect normal user to home
        }
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
        }
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full bg-white mt-24 container">
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row">
        {/* Left Side - Illustration */}
        <div className="hidden lg:block lg:w-1/2 p-8">
          <img
            src="https://img.freepik.com/free-vector/sign-concept-illustration_114360-5267.jpg?t=st=1742304338~exp=1742307938~hmac=9f450b76b9c294c84075c0e4ba67c042c1ec5a25c6e04f66b0addb0a0f131c25&w=1380"
            alt="Login Illustration"
            className="w-full max-w-2xl mx-auto"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 p-4 lg:p-8">
          <div className="max-w-xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-blue-600">Login</h2>

            <div className="mb-6">
              <Link
                to="/"
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
                Back to Home
              </Link>
            </div>

            <form className="space-y-6" onSubmit={postingData}>
              {/* Email */}
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Email
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="email"
                  required
                />
              </div>

              {/* Password with Eye Icon */}
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    name="password"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
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
              </div>

              {/* Remember Me and Forgot Password Row */}
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-blue-400 border-gray-300 rounded focus:ring-blue-400"
                    required
                  />
                  <label htmlFor="remember" className="ml-2 text-gray-700">
                    Remember me
                  </label>
                </div>

                <Link
                  to="/forgot-password"
                  className="text-blue-400 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full p-4 bg-blue-400 text-white text-lg font-bold rounded-lg hover:opacity-65 transition duration-300 mt-6"
              >
                Login
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <span className="text-gray-700">Don't have an account? </span>
              <Link
                to="/signup"
                className="text-blue-400 font-medium hover:underline"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
