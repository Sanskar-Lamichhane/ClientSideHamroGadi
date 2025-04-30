import React, { useState, useEffect } from "react";
import { Users, Lock, Unlock, Eye, UserCheck, UserX } from "lucide-react";
import axios from "axios";
import { toast, Bounce } from "react-toastify";

function CustomerDashboard() {
  const [customerList, setCustomer] = useState([]);
  const [confirmationModal, setConfirmationModal] = useState({
    show: false,
    customer: null,
    action: "",
  });

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/admin/customerList", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setCustomer(res.data.customers);
        }
      })
      .catch((err) => {
        // Error handling can be added here
      });
  });

  const openConfirmationModal = (customer, action) => {
    setConfirmationModal({
      show: true,
      customer: customer,
      action: action,
    });
  };

  const closeConfirmationModal = () => {
    setConfirmationModal({
      show: false,
      customer: null,
      action: "",
    });
  };

  const handleAccountAction = () => {
    axios
      .put(
        `http://localhost:3000/api/admin/user/${confirmationModal.customer._id}/status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        if (res.status === 200) {
          closeConfirmationModal();
          toast.success(res.data.message, {
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
        }
      })
      .catch((err) => {});
  };

  return (
    <div className="dashboard p-6 bg-gray-50 font-sans">
      {/* Customer List Section */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-blue-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">
            Customer Management
          </h2>
          <span className="text-sm text-gray-600 font-medium">
            Total Customers: {customerList.length}
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-100 to-blue-200 border-b-2 border-blue-300">
              <tr>
                <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Customer Name
                </th>
                <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Email
                </th>
                <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Phone
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
              {customerList.map((customer) => (
                <tr
                  key={customer._id}
                  className="hover:bg-blue-50 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center">
                      <div
                        className={`p-2 rounded-full mr-3 ${customer.isActive ? "bg-green-100" : "bg-red-100"}`}
                      >
                        <Users
                          className={
                            customer.isActive
                              ? "text-green-600"
                              : "text-red-600"
                          }
                          size={20}
                        />
                      </div>
                      <span className="font-semibold text-gray-900">
                        {customer.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-700">{customer.email}</td>
                  <td className="p-4 text-gray-700">{customer.phoneNumber}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        customer.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {customer.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {customer.isActive ? (
                      <button
                        onClick={() => openConfirmationModal(customer, "lock")}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center justify-center ml-auto transition-colors"
                      >
                        <Lock size={16} className="mr-2" /> Lock Account
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          openConfirmationModal(customer, "unlock")
                        }
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center justify-center ml-auto transition-colors"
                      >
                        <Unlock size={16} className="mr-2" /> Unlock Account
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmationModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">
              {confirmationModal.action === "lock" ? "Lock" : "Unlock"} Customer
            </h2>
            <p className="mb-6">
              Are you sure you want to {confirmationModal.action} the account
              for {confirmationModal.customer.name}?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeConfirmationModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAccountAction}
                className={`px-4 py-2 rounded-lg ${
                  confirmationModal.action === "lock"
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerDashboard;
