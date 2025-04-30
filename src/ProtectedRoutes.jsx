// import { Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import {jwtDecode} from "jwt-decode";

// // Function to check if token is expired
// const isTokenExpired = (token) => {
//   if (!token) return true;
//   const decoded = jwtDecode(token);
//   const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
//   return decoded.exp < currentTime; // Compare expiration time with current time
// };

// function ProtectedRoutes({ role }) {
//   const user = useSelector((store) => store.user.value);
//   const token = localStorage.getItem("access_token");

//   if (!token || isTokenExpired(token)) {
//     // If there's no token or it's expired, redirect to login
//     return <Navigate to="/login" />;
//   }

//   try {
//     const decoded = jwtDecode(token);

//     // Check if the user's role is included in the allowed roles array
//     if (role.includes(decoded.role)) {
//       return <Outlet />;
//     } else {
//       return <div>Forbidden to enter</div>;
//     }
//   } catch (error) {

//     return <Navigate to="/login" />;
//   }
// }

// export default ProtectedRoutes;

import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const isTokenExpired = (token) => {
  if (!token) return true;
  const decoded = jwtDecode(token);
  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
};

function ProtectedRoutes({ role = [], allowUnauthenticated = false }) {
  const token = localStorage.getItem("access_token");

  // No token
  if (!token) {
    return allowUnauthenticated ? <Outlet /> : <Navigate to="/login" />;
  }

  // Token exists but expired
  if (isTokenExpired(token)) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);

    if (role.includes(decoded.role)) {
      return <Outlet />;
    } else {
      return <div>Forbidden to enter</div>;
    }
  } catch (err) {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoutes;
