import { Link } from "react-router-dom";

function AdminSidebar() {
    return (
        <div className="sidebar w-64 bg-gray-800 text-white h-full p-4">
            <h2 className="text-xl mb-6">Admin Dashboard</h2>
            <ul>
                <li>
                    <Link to="/dashboard" className="block py-2 px-4 hover:bg-gray-700">
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard/users" className="block py-2 px-4 hover:bg-gray-700">
                        Manage Users
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard/products" className="block py-2 px-4 hover:bg-gray-700">
                        Manage Products
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default AdminSidebar;
