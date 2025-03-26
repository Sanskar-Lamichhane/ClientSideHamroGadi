import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import AdminSidebar from "./AdminSidebar";
//import AdminSidebar from "./AdminSidebar.jsx";
//import AdminHome from "./AdminHome.jsx";
//import ManageUsers from "./ManageUsers.jsx";
//import ManageProducts from "./ManageProducts.jsx";
//import NotFound from "./404.jsx";

function App2() {
    return (
        <div className="admin-dashboard flex">
            <AdminSidebar />
            <div className="admin-content flex-1">
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} /> 
                    {/* <Route path="users" element={<ManageUsers />} /> */}
                    {/* <Route path="products" element={<ManageProducts />} /> */}
                    {/* <Route path="*" element={<NotFound />} /> */}
                </Routes>
            </div>
        </div>
    );
}

export default App2;
