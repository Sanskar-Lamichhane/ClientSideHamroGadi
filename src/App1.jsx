import Header from "./Header.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Product from "./product.jsx"
import Cart from "./cart.jsx"
import Home from "./home.jsx"
import Login from "./login.jsx"
import { ToastContainer } from "react-toastify"
import SignUp from "./signup.jsx"
import { useState } from "react"
import { Provider, useSelector } from "react-redux"  // Import useSelector to get user role
import { store } from "./Redux/Store.js"
import SingleProduct from "./SingleProductDetails.jsx"
import Create from "./create.jsx"
import ProtectedRoutes from "./ProtectedRoutes.jsx"
import ForgotPassword from "./forgetPassword.jsx"
import OtpVerification from "./OtpVerification.jsx"
import PasswordResetVerification from "./ResetPassword.jsx"
import NotFound from "./404.jsx"
import App2 from "./App2.jsx"
// import MyBookings from "./MyBookings.jsx"
import {VehicleDashboard} from "./MyBookings.jsx"
import RentalDetailsPage from "./singleRentalPage.jsx"
import ProfileManagement from "./ProfileManagementPage.jsx"
import VehicleDetailsPage from "./SingleVehiclePage"
import RentalConfirmation from "./PendingConfirmation.jsx"
import PendingVehiclesDashboard from "./PendingVehicleList.jsx"
import CancelledVehiclesDashboard from "./CancelledVehicleList.jsx"
import ApprovedVehiclesDashboard from "./ApprovedVehicle.jsx"
import CompletedVehiclesDashboard from "./CompletedVehicleList.jsx"
import IntripVehiclesDashboard from "./IntripVehicleList.jsx"
import RejectedVehiclesDashboard from "./RejectedVehicleList.jsx"
import VehicleEditPage from "./VehicleEditPage.jsx"
import Footer from "./Footer.jsx"


function App1() {
  // Use selector to get user role (assuming you have a role in your store)
  // const userRole = useSelector(state => state?.user?.value?.role);  // Adjust based on how role is stored in Redux
  // console.log("hello",userRole)
  const getUserRole = () => {
    const expiry = localStorage.getItem("expiry_date");
    if (!expiry || new Date().getTime() > expiry) {
        localStorage.removeItem("userRole");
        localStorage.removeItem("expiry_date");
        return null;
    }
    return localStorage.getItem("userRole");
};

const userRole = getUserRole();

  


  return (
    <>
        <ToastContainer />
        <BrowserRouter>
          {/* Conditionally render Header based on user role */}
          <Header />
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/product">
              <Route path="" element={<Product />} />
              <Route path=":id" element={<SingleProduct />} />
              <Route path="create" element={<ProtectedRoutes role={["seller"]} />}>
                <Route path="" element={<Create />} />
              </Route>
            </Route>

            <Route path="/cart" element={<ProtectedRoutes role={["buyer"]} />}>
              <Route path="" element={<Cart />} />
            </Route>

           
            {/* <Route path="/MyBookings" element={<ProtectedRoutes role='customer'/>}> 
                            <Route path="" element={<VehicleDashboard />} />
                            <Route path=":id" element={<RentalDetailsPage/>}/>
                        </Route> */}
                      <Route path="/MyBookings" element={<ProtectedRoutes role='customer'/>}> 
                            <Route path="pending" element={<PendingVehiclesDashboard />} />
                            <Route path="cancelled" element={<CancelledVehiclesDashboard/>}/>
                            <Route path="approved" element={<ApprovedVehiclesDashboard/>}/>
                            <Route path="completed" element={<CompletedVehiclesDashboard/>}/>
                            <Route path="rejected" element={<RejectedVehiclesDashboard/>}/>
                            <Route path="in-trip" element={<IntripVehiclesDashboard/>}/>
                            <Route path=":id" element={<RentalDetailsPage/>}/>
                        </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/otp-verification" element={<OtpVerification />} />
            <Route path="/PasswordResetVerification" element={<PasswordResetVerification />} />
            <Route path="/profileManagement" element={<ProfileManagement/>}/>
            <Route path="/singleVehicle/:id" element={<VehicleDetailsPage/>}/>
            <Route path="/rentalConfirmation/:id" element={<RentalConfirmation/>}/>
            <Route path="/404" element={<NotFound />} />
          </Routes>
          {userRole!=="admin" && userRole!=="vendor"?<Footer/>:null}
        </BrowserRouter>
    </>
  )
}

export default App1;


// import Header from "./Header.jsx"
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
// import Product from "./product.jsx"
// import Cart from "./cart.jsx"
// import Home from "./home.jsx"
// import Login from "./login.jsx"
// import { ToastContainer } from "react-toastify"
// import SignUp from "./signup.jsx"
// import { useSelector } from "react-redux"
// import SingleProduct from "./SingleProductDetails.jsx"
// import Create from "./create.jsx"
// import ProtectedRoutes from "./ProtectedRoutes.jsx"
// import ForgotPassword from "./forgetPassword.jsx"
// import OtpVerification from "./OtpVerification.jsx"
// import PasswordResetVerification from "./ResetPassword.jsx"
// import NotFound from "./404.jsx"
// import App2 from "./App2.jsx" // Dashboard component

// function App1() {
//   // Get user role from Redux store
//   //const userRole = useSelector(state => state.auth?.user?.role || null);

//   const Role = localStorage.getItem("userRole")
  
//   // Check if user is admin or vendor
//   const isAdminOrVendor = Role === "admin" || Role === "vendor";

//   return (
//     <>
//       <ToastContainer />
//       <BrowserRouter>
//         {isAdminOrVendor ? (
//           <Routes>
//             <Route path="/dashboard/*" element={<App2 />} />
//             <Route path="*" element={<Navigate to="/dashboard" replace />} />
//           </Routes>
//         ) : (
//           <>
//             <Header />
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/product">
//                 <Route path="" element={<Product />} />
//                 <Route path=":id" element={<SingleProduct />} />
//                 <Route path="create" element={<ProtectedRoutes role={["seller"]} />}>
//                   <Route path="" element={<Create />} />
//                 </Route>
//               </Route>
              
//               <Route path="/cart" element={<ProtectedRoutes role={["buyer"]} />}>
//                 <Route path="" element={<Cart />} />
//               </Route>
              
//               <Route path="/login" element={<Login />} />
//               <Route path="/SignUp" element={<SignUp />} />
//               <Route path="/forgot-password" element={<ForgotPassword />} />
//               <Route path="/otp-verification" element={<OtpVerification />} />
//               <Route path="/PasswordResetVerification" element={<PasswordResetVerification />} />
//               <Route path="/404" element={<NotFound />} />
//               <Route path="/dashboard/*" element={<Navigate to="/" replace />} /> 
//             </Routes>
//           </>
//         )}
//       </BrowserRouter>
//     </>
//   )
// }

// export default App1;


