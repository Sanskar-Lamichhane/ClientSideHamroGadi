import React, { useState, useEffect } from 'react';
import { Edit, Plus, X, Check, Filter, ChevronDown } from 'lucide-react';
import axios from 'axios';
import { toast, Bounce } from 'react-toastify';

function BrandsPage() {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editingBrandId, setEditingBrandId] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    
    // For editing existing brand
    const [editFormData, setEditFormData] = useState({
        brandName: '',
        countryOfOrigin: '',
        yearOfOrigin: ''
    });
    
    // For adding new brand
    const [newBrandData, setNewBrandData] = useState({
        brandName: '',
        countryOfOrigin: '',
        yearOfOrigin: ''
    });

    // Countries list for dropdown
    const countries = [
        "Australia", "Usa", "France", "Germany", "India", "China", "Japan"
    ];

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const token = localStorage.getItem("access_token");
            const response = await axios.get("http://localhost:3000/api/brand", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            if (response.status === 200) {
                setBrands(response.data?.Brands || []);
            }
        } catch (err) {
            console.error("Error fetching brands:", err);
            setError("Failed to load brands");
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (brand) => {
        setEditingBrandId(brand._id);
        setEditFormData({
            brandName: brand.brandName,
            countryOfOrigin: brand.countryOfOrigin,
            yearOfOrigin: brand.yearOfOrigin
        });
    };

    const handleCancelEdit = () => {
        setEditingBrandId(null);
        setEditFormData({
            brandName: '',
            countryOfOrigin: '',
            yearOfOrigin: ''
        });
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({
            ...editFormData,
            [name]: value
        });
    };

    const handleNewBrandInputChange = (e) => {
        const { name, value } = e.target;
        setNewBrandData({
            ...newBrandData,
            [name]: value
        });
    };

    const saveEditedBrand = async () => {
        // Validate required fields
        if (!editFormData.brandName || !editFormData.countryOfOrigin || !editFormData.yearOfOrigin) {
            alert("All fields are required");
            return;
        }
        
    
        try {
            const token = localStorage.getItem("access_token");
            console.log(editFormData)
            const response = await axios.put(
                `http://localhost:3000/api/brand/${editingBrandId}`,
                editFormData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            
            if (response.status === 200) {
                // Update the brands list with edited brand
                fetchBrands(); // Refetch all brands to ensure data consistency
                setEditingBrandId(null);
                
                toast.success("Brand updated successfully", {
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
            console.error("Error updating brand:", err);
            
            toast.error("Failed to update brand", {
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

    const addNewBrand = async () => {
        // Validate required fields
        if (!newBrandData.brandName || !newBrandData.countryOfOrigin || !newBrandData.yearOfOrigin) {
            alert("All fields are required");
            return;
        }

        try {
            const token = localStorage.getItem("access_token");
            const response = await axios.post(
                "http://localhost:3000/api/brand",
                newBrandData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            
            if (response.status === 200) {
                // Add the new brand to the list
                console.log(response.data.data)
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
                
                setNewBrandData({
                    brandName: '',
                    countryOfOrigin: '',
                    yearOfOrigin: ''
                });
                setShowAddForm(false);
            }
        } catch (err) {
            console.error("Error adding brand:", err);
            alert("Failed to add brand");
        }
    };

    const cancelAddBrand = () => {
        setShowAddForm(false);
        setNewBrandData({
            brandName: '',
            countryOfOrigin: '',
            yearOfOrigin: ''
        });
    };

    return (
        <div className="brands-page p-6 bg-gray-50">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Vehicle Brands</h1>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-blue-100">
                    <div className="flex flex-wrap justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">Brands</h2>
                        
                        <button 
                            onClick={() => setShowAddForm(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center transition-colors"
                        >
                            <Plus size={16} className="mr-2" /> Add Brand
                        </button>
                    </div>
                </div>

                {/* Add Brand Form */}
                {showAddForm && (
                    <div className="p-6 border-b border-blue-100 bg-blue-50">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Brand</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name *</label>
                                <input
                                    type="text"
                                    name="brandName"
                                    value={newBrandData.brandName}
                                    onChange={handleNewBrandInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                                <select
                                    name="countryOfOrigin"
                                    value={newBrandData.countryOfOrigin}
                                    onChange={handleNewBrandInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    required
                                >
                                    <option value="">Select a country</option>
                                    {countries.map(country => (
                                        <option key={country} value={country}>{country}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Year of Origin *</label>
                                <input
                                    type="number"
                                    name="yearOfOrigin"
                                    value={newBrandData.yearOfOrigin}
                                    onChange={handleNewBrandInputChange}
                                    min="1800"
                                    max={new Date().getFullYear()}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={cancelAddBrand}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 mr-3 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={addNewBrand}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                )}

                {/* Brands Table */}
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="p-8 text-center">
                            <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            <p className="mt-2 text-gray-600">Loading brands...</p>
                        </div>
                    ) : error ? (
                        <div className="p-8 text-center">
                            <div className="text-red-500 text-lg mb-2">⚠️ {error}</div>
                            <button 
                                onClick={() => fetchBrands()}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            >
                                Retry
                            </button>
                        </div>
                    ) : brands.length === 0 ? (
                        <div className="p-8 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                <Filter size={32} className="text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">No Brands Found</h3>
                            <p className="text-gray-600 mb-4">
                                Get started by adding your first vehicle brand.
                            </p>
                            <button 
                                onClick={() => setShowAddForm(true)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            >
                                Add Brand
                            </button>
                        </div>
                    ) : (
                        <table className="w-full">
                            <colgroup>
                                <col style={{ width: "30%" }} /> {/* Brand Name */}
                                <col style={{ width: "25%" }} /> {/* Country */}
                                <col style={{ width: "15%" }} /> {/* Year of Origin */}
                                <col style={{ width: "20%" }} /> {/* Created By */}
                                <col style={{ width: "10%" }} /> {/* Actions */}
                            </colgroup>
                            <thead className="bg-gradient-to-r from-blue-100 to-blue-200 border-b-2 border-blue-300">
                                <tr>
                                    <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        Brand Name
                                    </th>
                                    <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        Country
                                    </th>
                                    <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        Year of Origin
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
                                {brands.map((brand) => (
                                    <tr key={brand._id} className="hover:bg-blue-50 transition-colors">
                                        <td className="p-4">
                                            {editingBrandId === brand._id ? (
                                                <input
                                                    type="text"
                                                    name="brandName"
                                                    value={editFormData.brandName}
                                                    onChange={handleEditInputChange}
                                                    className="w-full p-2 border border-gray-300 rounded-md"
                                                    required
                                                />
                                            ) : (
                                                <span className="font-semibold text-gray-900">{brand.brandName}</span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            {editingBrandId === brand._id ? (
                                                <select
                                                    name="countryOfOrigin"
                                                    value={editFormData.countryOfOrigin}
                                                    onChange={handleEditInputChange}
                                                    className="w-full p-2 border border-gray-300 rounded-md"
                                                    required
                                                >
                                                    <option value="">Select a country</option>
                                                    {countries.map(country => (
                                                        <option key={country} value={country}>{country}</option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <span className="text-gray-700">{brand.countryOfOrigin}</span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            {editingBrandId === brand._id ? (
                                                <input
                                                    type="number"
                                                    name="yearOfOrigin"
                                                    value={editFormData.yearOfOrigin}
                                                    onChange={handleEditInputChange}
                                                    min="1800"
                                                    max={new Date().getFullYear()}
                                                    className="w-full p-2 border border-gray-300 rounded-md"
                                                    required
                                                />
                                            ) : (
                                                <span className="text-gray-700">{brand.yearOfOrigin}</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-gray-700">{brand.created_by[0]?.name || 'System'}</td>
                                        <td className="p-4 text-right">
                                            {editingBrandId === brand._id ? (
                                                <div className="flex justify-end space-x-2">
                                                    <button 
                                                        onClick={handleCancelEdit}
                                                        className="text-gray-600 hover:text-gray-900"
                                                        title="Cancel"
                                                    >
                                                        <X size={18} />
                                                    </button>
                                                    <button 
                                                        onClick={saveEditedBrand}
                                                        className="text-green-600 hover:text-green-900"
                                                        title="Save"
                                                    >
                                                        <Check size={18} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <button 
                                                    onClick={() => handleEditClick(brand)}
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

export default BrandsPage;