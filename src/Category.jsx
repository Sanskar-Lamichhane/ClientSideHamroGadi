import React, { useState, useEffect } from "react";
import { Edit, Plus, X, Check, Filter } from "lucide-react";
import axios from "axios";
import { toast, Bounce } from "react-toastify";

function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // For editing existing category
  const [editFormData, setEditFormData] = useState({
    categoryName: "",
  });

  // For adding new category
  const [newCategoryData, setNewCategoryData] = useState({
    categoryName: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(
        "http://localhost:3000/api/vehicleType",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        setCategories(response.data?.Types || []);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (category) => {
    setEditingCategoryId(category._id);
    setEditFormData({
      categoryName: category.categoryName,
    });
  };

  const handleCancelEdit = () => {
    setEditingCategoryId(null);
    setEditFormData({
      categoryName: "",
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleNewCategoryInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategoryData({
      ...newCategoryData,
      [name]: value,
    });
  };

  const saveEditedCategory = async () => {
    // Validate required field
    if (!editFormData.categoryName) {
      alert("Category name is required");
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.put(
        `http://localhost:3000/api/admin/vehicleType/${editingCategoryId}`,
        editFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        // Update the categories list with edited category
        fetchCategories(); // Refetch all categories to ensure data consistency
        setEditingCategoryId(null);

        toast.success("Category updated successfully", {
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
    } catch (err) {
      console.error("Error updating category:", err);

      toast.error("Failed to update category", {
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
  };

  const addNewCategory = async () => {
    // Validate required field
    if (!newCategoryData.categoryName) {
      alert("Category name is required");
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post(
        "http://localhost:3000/api/admin/vehicleType",
        newCategoryData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        // Add the new category to the list
        fetchCategories(); // Refetch to ensure data consistency
        // Reset form and hide it
        toast.success(response.data.message, {
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

        setNewCategoryData({
          categoryName: "",
        });
        setShowAddForm(false);
      }
    } catch (err) {
      console.error("Error adding category:", err);
      toast.error("Failed to add category", {
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
  };

  const cancelAddCategory = () => {
    setShowAddForm(false);
    setNewCategoryData({
      categoryName: "",
    });
  };

  return (
    <div className="categories-page p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Vehicle Categories</h1>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="flex flex-wrap justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">
              Categories
            </h2>

            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center transition-colors"
            >
              <Plus size={16} className="mr-2" /> Add Category
            </button>
          </div>
        </div>

        {/* Add Category Form */}
        {showAddForm && (
          <div className="p-6 border-b border-blue-100 bg-blue-50">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Add New Category
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  name="categoryName"
                  value={newCategoryData.categoryName}
                  onChange={handleNewCategoryInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={cancelAddCategory}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 mr-3 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addNewCategory}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        )}

        {/* Categories Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-2 text-gray-600">Loading categories...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <div className="text-red-500 text-lg mb-2">⚠️ {error}</div>
              <button
                onClick={() => fetchCategories()}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Retry
              </button>
            </div>
          ) : categories.length === 0 ? (
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Filter size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                No Categories Found
              </h3>
              <p className="text-gray-600 mb-4">
                Get started by adding your first vehicle category.
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Add Category
              </button>
            </div>
          ) : (
            <table className="w-full">
              <colgroup>
                <col style={{ width: "25%" }} /> {/* Category ID */}
                <col style={{ width: "30%" }} /> {/* Category Name */}
                <col style={{ width: "30%" }} /> {/* Created By */}
                <col style={{ width: "15%" }} /> {/* Actions */}
              </colgroup>
              <thead className="bg-gradient-to-r from-blue-100 to-blue-200 border-b-2 border-blue-300">
                <tr>
                  <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Category Name
                  </th>
                  <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Created By
                  </th>
                  <th className="p-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr
                    key={category._id}
                    className="hover:bg-blue-50 transition-colors"
                  >
                    <td className="p-4 text-gray-700">{category._id}</td>
                    <td className="p-4">
                      {editingCategoryId === category._id ? (
                        <input
                          type="text"
                          name="categoryName"
                          value={editFormData.categoryName}
                          onChange={handleEditInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          required
                        />
                      ) : (
                        <span className="font-semibold text-gray-900">
                          {category.categoryName}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-gray-700">
                      {category.created_by?.name}
                    </td>
                    <td className="p-4 text-right">
                      {editingCategoryId === category._id ? (
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={handleCancelEdit}
                            className="text-gray-600 hover:text-gray-900"
                            title="Cancel"
                          >
                            <X size={18} />
                          </button>
                          <button
                            onClick={saveEditedCategory}
                            className="text-green-600 hover:text-green-900"
                            title="Save"
                          >
                            <Check size={18} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleEditClick(category)}
                          className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 flex items-center justify-center ml-auto transition-colors"
                        >
                          <Edit size={14} className="mr-1" /> Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoriesPage;
