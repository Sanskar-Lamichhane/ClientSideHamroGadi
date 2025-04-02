
import React from 'react';
import { Routes, Route } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import Dashboard from "./Dashboard";
// import ApprovedPage from "./ApprovedPage";
// import IntripPage from "./IntripPage";
// import CancelledPage from "./CancelledPage";
// import RejectedPage from "./RejectedPage";
// import CompletedPage from "./CompletedPage";
import VehiclesPage from "./VehiclesPage";
import CustomersPage from "./CustomersPage";
import CreateVehiclePage from './CreateVehicle';
import BrandsPage from './Brands';
import CategoriesPage from './Category';
import CancelledVehiclesDashboard from './CancelledVehicleList';
import CompletedVehiclesDashboard from './CompletedVehicleList';
import RejectedVehiclesDashboard from './RejectedVehicleList';
import ApprovedVehiclesDashboard from './ApprovedVehicle';
import IntripVehiclesDashboard from './IntripVehicleList';
import PendingVehiclesDashboard from './PendingVehicleList';
import VendorDashboard from './VendorsPage';
import RentalDetailsPage from './singleRentalPage';

function App2() {
    return (
        <div className="admin-dashboard flex h-screen">
            <AdminSidebar />
            <div className="admin-content flex-1 flex flex-col">
                <AdminNavbar />
                <div className="flex-1 overflow-y-auto p-4">
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        {/* <Route path="/approved" element={<ApprovedPage />} /> */}
                        {/* <Route path="/intrip" element={<IntripPage />} /> */}
                        {/* <Route path="/cancelled" element={<CancelledPage />} /> */}
                        {/* <Route path="/rejected" element={<RejectedPage />} /> */}
                        {/* <Route path="/completed" element={<CompletedPage />} /> */}
                        <Route path="/vehicles" element={<VehiclesPage />} />
                 <Route path="/CreateVehicle" element={<CreateVehiclePage/>}/>
                        <Route path="/customers" element={<CustomersPage />} />
                        {/* <Route path="/vendors" element={<VendorsPage />} /> */}
                        <Route path="/brands" element={<BrandsPage />}/>
                        <Route path="/type" element={<CategoriesPage/>}/>
                        <Route path="/cancelledVehicleList" element={<CancelledVehiclesDashboard/>}/>
                        <Route path="/completedVehicleList" element={<CompletedVehiclesDashboard/>}/>
                        <Route path="/rejectedVehicleList" element={<RejectedVehiclesDashboard/>}/>
                        <Route path="/approvedVehicleList" element={<ApprovedVehiclesDashboard/>}/>
                        <Route path="intripVehicleList" element={<IntripVehiclesDashboard/>}/>
                        <Route path="/vendors" element={<VendorDashboard/>}/>
                        <Route path="/singleRental/:id" element={<RentalDetailsPage/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App2;