
import React, { useState, useEffect } from "react";
import {
  Car,
  Eye,
  AlertCircle,
  Truck,
  CheckCircle,
  Users,
  Clock,
  CreditCard,
  Briefcase,
  AlertTriangle,
} from "lucide-react";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Sector,
  Label,
} from "recharts";

function Dashboard() {
  const [vehiclesList, setVehiclesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summaryData, setSummaryData] = useState(null);
  const navigate = useNavigate();
  const pathname = useLocation();

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

  useEffect(() => {
    fetchPendingVehicles();
    fetchSummaryData();
  }, []);

  const fetchSummaryData = () => {
    const token = localStorage.getItem("access_token");
    const endpoint =
      userRole === "admin"
        ? "http://localhost:3000/api/admin/summaryList"
        : "http://localhost:3000/api/vendor/summaryList";

    axios
      .get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setSummaryData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to load summary data", {
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
      });
  };

  const fetchPendingVehicles = () => {
    const token = localStorage.getItem("access_token");
    setLoading(true);
    if (userRole === "vendor") {
      axios
        .post(
          "http://localhost:3000/api/vendor/rentalList",
          {
            status: "Pending",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          if (res.status === 200) {
            setVehiclesList(res.data);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          toast.error("Failed to load pending vehicles", {
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
        });
    } else if (userRole === "admin") {
      axios
        .post(
          "http://localhost:3000/api/admin/rentalList",
          {
            status: "Pending",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          if (res.status === 200) {
            setVehiclesList(res.data);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          toast.error("Failed to load hello vehicles", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        });
    } else if (userRole === "customer") {
      axios
        .post(
          "http://localhost:3000/api/customer/rental",
          {
            status: "Pending",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          if (res.status === 200) {
            setVehiclesList(res.data);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          toast.error("Failed to load pending vehicles", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        });
    }
  };

  const handleViewDetails = (bookingId) => {
    console.log("Navigate to vehicle details page for:", bookingId);
    if (userRole === "customer") {
      navigate(`/MyBookings/${bookingId}`);
      return;
    }
    navigate(`/singleRental/${bookingId}`, { state: { id: bookingId } });
  };

  // Custom pie chart tooltip formatter to show percentages
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const entry = payload[0];
      // Use the pre-calculated percentage from the data object
      return (
        <div className="bg-white p-2 border border-gray-300 rounded shadow-sm">
          <p className="text-sm font-medium">{`${entry.name}: ${entry.value}`}</p>
          <p className="text-sm text-gray-600">{`${entry.payload.percentage}%`}</p>
        </div>
      );
    }

    return null;
  };

  // Custom label renderer for pie chart to display percentages
  const renderCustomizedLabel = (props) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, index, payload } =
      props;
    const RADIAN = Math.PI / 180;
    // Position the label in the middle of the pie segment
    const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // Only show percentage for segments that are large enough
    if (payload.percentage < 5) return null;

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${payload.percentage}%`}
      </text>
    );
  };

  // Summary cards based on user role
  const renderSummaryCards = () => {
    if (!summaryData) return null;

    if (userRole === "admin") {
      return (
        <>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-200 flex items-center">
            <div className="bg-indigo-50 p-3 rounded-full mr-4">
              <Truck className="text-indigo-400" size={30} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">
                Total Vehicles
              </h2>
              <p className="text-2xl font-bold text-indigo-400">
                {summaryData.totalVehicles}
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-200 flex items-center">
            <div className="bg-indigo-50 p-3 rounded-full mr-4">
              <Users className="text-indigo-400" size={30} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">
                Total Vendors
              </h2>
              <p className="text-2xl font-bold text-indigo-400">
                {summaryData.totalVendors}
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-200 flex items-center">
            <div className="bg-indigo-50 p-3 rounded-full mr-4">
              <CreditCard className="text-indigo-400" size={30} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">
                Total Earnings
              </h2>
              <p className="text-2xl font-bold text-indigo-400">
                NPR {summaryData.totalEarnings}
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-200 flex items-center">
            <div className="bg-indigo-50 p-3 rounded-full mr-4">
              <CheckCircle className="text-indigo-400" size={30} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">
                Completed Rentals
              </h2>
              <p className="text-2xl font-bold text-indigo-400">
                {summaryData.completedRentals}
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-200 flex items-center">
            <div className="bg-indigo-50 p-3 rounded-full mr-4">
              <Car className="text-indigo-400" size={30} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">
                Active Rentals
              </h2>
              <p className="text-2xl font-bold text-indigo-400">
                {summaryData.activeRentals}
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-200 flex items-center">
            <div className="bg-indigo-50 p-3 rounded-full mr-4">
              <AlertTriangle className="text-indigo-400" size={30} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">
                Pending Requests
              </h2>
              <p className="text-2xl font-bold text-indigo-400">
                {summaryData.pendingRequests}
              </p>
            </div>
          </div>
        </>
      );
    } else if (userRole === "vendor") {
      return (
        <>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-200 flex items-center">
            <div className="bg-indigo-50 p-3 rounded-full mr-4">
              <Truck className="text-indigo-400" size={30} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">
                My Vehicles
              </h2>
              <p className="text-2xl font-bold text-indigo-400">
                {summaryData.totalVehicles}
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-200 flex items-center">
            <div className="bg-indigo-50 p-3 rounded-full mr-4">
              <Briefcase className="text-indigo-400" size={30} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">
                Total Bookings
              </h2>
              <p className="text-2xl font-bold text-indigo-400">
                {summaryData.totalTrips}
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-200 flex items-center">
            <div className="bg-indigo-50 p-3 rounded-full mr-4">
              <CreditCard className="text-indigo-400" size={30} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">
                Total Earnings
              </h2>
              <p className="text-2xl font-bold text-indigo-400">
                NPR {summaryData.totalEarnings}
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-200 flex items-center">
            <div className="bg-indigo-50 p-3 rounded-full mr-4">
              <CheckCircle className="text-indigo-400" size={30} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">
                Completed Rentals
              </h2>
              <p className="text-2xl font-bold text-indigo-400">
                {summaryData.completedRentals}
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-200 flex items-center">
            <div className="bg-indigo-50 p-3 rounded-full mr-4">
              <Car className="text-indigo-400" size={30} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">
                Active Rentals
              </h2>
              <p className="text-2xl font-bold text-indigo-400">
                {summaryData.activeRentals}
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-200 flex items-center">
            <div className="bg-indigo-50 p-3 rounded-full mr-4">
              <AlertTriangle className="text-indigo-400" size={30} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">
                Pending Requests
              </h2>
              <p className="text-2xl font-bold text-indigo-400">
                {summaryData.pendingRequests}
              </p>
            </div>
          </div>
        </>
      );
    }

    // Default cards if role doesn't match
    return null;
  };

  const renderCharts = () => {
    if (!summaryData) return null;

    // Updated colors for charts - using brighter, more distinct colors
    const COLORS = ["#4f46e5", "#06b6d4", "#10b981", "#f59e0b"];

    if (userRole === "admin") {
      // Chart data for admin
      const adminBarData = [
        { name: "Vehicles", value: summaryData.totalVehicles },
        { name: "Vendors", value: summaryData.totalVendors },
        { name: "Bookings", value: summaryData.totalTrips },
        { name: "Completed", value: summaryData.completedRentals },
        { name: "Active", value: summaryData.activeRentals },
        { name: "Pending", value: summaryData.pendingRequests },
      ];

      // Calculate percentages based on totalTrips
      const totalTrips = summaryData.totalTrips;

      // Prepare data for pie chart with accurate percentages
      let adminPieData = [];

      if (totalTrips > 0) {
        // Calculate the main status percentages
        const completedPercentage =
          (summaryData.completedRentals / totalTrips) * 100;
        const activePercentage = (summaryData.activeRentals / totalTrips) * 100;
        const pendingPercentage =
          (summaryData.pendingRequests / totalTrips) * 100;

        // Calculate if there are any "others" (other statuses not accounted for)
        const totalPercentageAccounted =
          completedPercentage + activePercentage + pendingPercentage;
        const othersPercentage =
          totalPercentageAccounted < 100 ? 100 - totalPercentageAccounted : 0;

        // Add main statuses
        adminPieData = [
          {
            name: "Completed Rentals",
            value: summaryData.completedRentals,
            percentage: completedPercentage.toFixed(1),
            legendName: `Completed Rentals (${completedPercentage.toFixed(1)}%)`,
          },
          {
            name: "Active Rentals",
            value: summaryData.activeRentals,
            percentage: activePercentage.toFixed(1),
            legendName: `Active Rentals (${activePercentage.toFixed(1)}%)`,
          },
          {
            name: "Pending Requests",
            value: summaryData.pendingRequests,
            percentage: pendingPercentage.toFixed(1),
            legendName: `Pending Requests (${pendingPercentage.toFixed(1)}%)`,
          },
        ];

        // Add "Others" if there are any unaccounted rentals
        if (othersPercentage > 0) {
          const othersCount =
            totalTrips -
            (summaryData.completedRentals +
              summaryData.activeRentals +
              summaryData.pendingRequests);
          adminPieData.push({
            name: "Others",
            value: othersCount,
            percentage: othersPercentage.toFixed(1),
            legendName: `Others (${othersPercentage.toFixed(1)}%)`,
          });
        }
      } else {
        // Handle edge case when there are no rentals
        adminPieData = [
          {
            name: "No Data",
            value: 1,
            percentage: "100.0",
            legendName: "No Data (100%)",
          },
        ];
      }

      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Bar Chart for admin */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Platform Overview
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={adminBarData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#4f46e5" name="Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart for admin - with percentage labels */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Rental Status Distribution
            </h2>
            <div className="text-sm text-gray-600 mb-2">
              Total Rentals: {summaryData.totalTrips}
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={adminPieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="legendName"
                  label={renderCustomizedLabel}
                  startAngle={90}
                  endAngle={-270}
                >
                  {adminPieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      );
    } else if (userRole === "vendor") {
      // Chart data for vendor
      const vendorBarData = [
        { name: "Vehicles", value: summaryData.totalVehicles },
        { name: "Bookings", value: summaryData.totalTrips },
        { name: "Completed", value: summaryData.completedRentals },
        { name: "Active", value: summaryData.activeRentals },
        { name: "Pending", value: summaryData.pendingRequests },
      ];

      // Calculate percentages based on totalTrips
      const totalTrips = summaryData.totalTrips;

      // Prepare data for pie chart with accurate percentages
      let vendorPieData = [];

      if (totalTrips > 0) {
        // Calculate the main status percentages
        const completedPercentage =
          (summaryData.completedRentals / totalTrips) * 100;
        const activePercentage = (summaryData.activeRentals / totalTrips) * 100;
        const pendingPercentage =
          (summaryData.pendingRequests / totalTrips) * 100;

        // Calculate if there are any "others" (other statuses not accounted for)
        const totalPercentageAccounted =
          completedPercentage + activePercentage + pendingPercentage;
        const othersPercentage =
          totalPercentageAccounted < 100 ? 100 - totalPercentageAccounted : 0;

        // Add main statuses
        vendorPieData = [
          {
            name: "Completed Rentals",
            value: summaryData.completedRentals,
            percentage: completedPercentage.toFixed(1),
            legendName: `Completed Rentals (${completedPercentage.toFixed(1)}%)`,
          },
          {
            name: "Active Rentals",
            value: summaryData.activeRentals,
            percentage: activePercentage.toFixed(1),
            legendName: `Active Rentals (${activePercentage.toFixed(1)}%)`,
          },
          {
            name: "Pending Requests",
            value: summaryData.pendingRequests,
            percentage: pendingPercentage.toFixed(1),
            legendName: `Pending Requests (${pendingPercentage.toFixed(1)}%)`,
          },
        ];

        // Add "Others" if there are any unaccounted rentals
        if (othersPercentage > 0) {
          const othersCount =
            totalTrips -
            (summaryData.completedRentals +
              summaryData.activeRentals +
              summaryData.pendingRequests);
          vendorPieData.push({
            name: "Others",
            value: othersCount,
            percentage: othersPercentage.toFixed(1),
            legendName: `Others (${othersPercentage.toFixed(1)}%)`,
          });
        }
      } else {
        // Handle edge case when there are no rentals
        vendorPieData = [
          {
            name: "No Data",
            value: 1,
            percentage: "100.0",
            legendName: "No Data (100%)",
          },
        ];
      }

      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Bar Chart for vendor */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Your Business Overview
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={vendorBarData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#4f46e5" name="Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart for vendor - with percentage labels */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Rental Status Distribution
            </h2>
            <div className="text-sm text-gray-600 mb-2">
              Total Rentals: {summaryData.totalTrips}
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={vendorPieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="legendName"
                  label={renderCustomizedLabel}
                  startAngle={90}
                  endAngle={-270}
                >
                  {vendorPieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      );
    }

    // Default return if role doesn't match
    return null;
  };

  return (
    <div className="dashboard p-6 bg-gray-50 font-sans">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {renderSummaryCards()}
      </div>

      {/* Dynamic Charts */}
      {renderCharts()}

      {/* Pending Vehicles Section */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-8">
        <div className="p-6 border-b bg-gradient-to-r from-indigo-50 to-indigo-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Pending Vehicles</h2>
          <span className="text-sm text-gray-600 font-medium">
            Total Pending: {vehiclesList.length}
          </span>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">
            Loading pending vehicles...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-100 to-indigo-200 border-b-2 border-indigo-200">
                <tr>
                  <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Vehicle No
                  </th>
                  <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Model
                  </th>
                  <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Pickup Location
                  </th>
                  <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="p-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {vehiclesList.map((booking) => (
                  <tr
                    key={booking._id}
                    className="hover:bg-indigo-50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="p-2 rounded-full mr-3 bg-indigo-50">
                          <Car className="text-indigo-400" size={20} />
                        </div>
                        <span className="font-semibold text-gray-900">
                          {booking.vehicle.registration_number}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-700">
                      {booking.vehicle.make?.brandName || ""}{" "}
                      {booking.vehicle.model}
                    </td>
                    <td className="p-4 text-gray-700">
                      {booking.pickUpLocation || "Not specified"}
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 flex items-center w-fit">
                        <AlertCircle size={14} className="mr-1" />
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleViewDetails(booking._id)}
                        className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors"
                      >
                        <Eye size={16} className="mr-1" />
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
                {vehiclesList.length === 0 && (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500">
                      No pending vehicles found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Customer Dashboard Placeholder */}
      {userRole === "customer" && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-8 p-6">
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome to your Dashboard
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Track your bookings, explore available vehicles, and manage your
              profile all in one place.
            </p>
            <div className="mt-6">
              <button
                onClick={() => navigate("/vehicles")}
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors mr-4"
              >
                Explore Vehicles
              </button>
              <button
                onClick={() => navigate("/MyBookings")}
                className="px-6 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors"
              >
                My Bookings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
