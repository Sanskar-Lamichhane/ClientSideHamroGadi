
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { setReduxUser } from "./Redux/Slice/userSlice";
import { jwtDecode } from "jwt-decode"; // ✅ Correct import



export default function Login() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const postingData = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3000/api/login",
      {
        "email": event.target.email.value,
        "password": event.target.password.value
      }
    )
      .then(response => {

        toast.success('Login Successfull', {
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
        localStorage.setItem("access_token", response.data.token)
        // Decode token to get user role
        const token = localStorage.getItem("access_token")
        const decoded = jwtDecode(token);
        console.log(decoded)
        dispatch(setReduxUser(decoded))
        const userRole = decoded.role; // Assuming role is inside the token

        // Store role in localStorage
        localStorage.setItem("userRole", userRole);

        if (userRole === "admin" || userRole === "vendor") {
          navigate('/dashboard'); // Redirect admin or vendor to dashboard
        } else {
          navigate('/'); // Redirect normal user to home
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

      })

  }
  return (
    <div className="w-full bg-white container">
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
              <Link to="/" className="text-blue-600 flex items-center hover:underline">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
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

              {/* Password */}
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Password</label>
                <input
                  type="password"
                  placeholder="********"
                  name="password"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Remember Me and Forgot Password Row */}
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    required
                  />
                  <label htmlFor="remember" className="ml-2 text-gray-700">
                    Remember me
                  </label>
                </div>

                <Link to="/forgot-password" className="text-blue-600 hover:underline">
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full p-4 bg-blue-600 text-white text-lg font-bold rounded-lg hover:bg-blue-700 transition duration-300 mt-6"
              >
                Login
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <span className="text-gray-700">Don't have an account? </span>
              <Link to="/signup" className="text-blue-600 font-medium hover:underline">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}