import React from 'react'
import { 
  FaBoxOpen, 
  FaClipboardList, 
  FaSignOutAlt, 
  FaStore, 
  FaUser, 
  FaArrowLeft 
} from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { clearCart } from '../../redux/slices/cartSlice';
import { logout } from '../../redux/slices/authSlice';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
  }

  return (
    <div className="p-6 min-h-screen w-64 bg-gray-900 text-gray-200 flex flex-col justify-between">
      <div>
        {/* Branding */}
        <div className="mb-8 text-center">
          <Link 
            to="/" 
            className="text-2xl font-bold text-white tracking-wide"
          >
            Urban
          </Link>
        </div>

        {/* Title */}
        <h2 className="text-sm font-semibold mb-6 text-gray-400 uppercase tracking-wide text-center">
          Admin Dashboard
        </h2>

        {/* Navigation */}
        <nav className="flex flex-col space-y-2">
          <NavLink 
            to="/admin/users" 
            className={({isActive}) => 
              isActive 
                ? "bg-gray-700 text-white py-2 px-4 rounded-lg flex items-center space-x-3"
                : "text-gray-300 hover:bg-gray-800 py-2 px-4 rounded-lg flex items-center space-x-3"
            }
          >
            <FaUser className="text-lg" />
            <span>Users</span>
          </NavLink>

          <NavLink 
            to="/admin/products" 
            className={({isActive}) => 
              isActive 
                ? "bg-gray-700 text-white py-2 px-4 rounded-lg flex items-center space-x-3"
                : "text-gray-300 hover:bg-gray-800 py-2 px-4 rounded-lg flex items-center space-x-3"
            }
          >
            <FaBoxOpen className="text-lg" />
            <span>Products</span>
          </NavLink>

          <NavLink 
            to="/admin/orders" 
            className={({isActive}) => 
              isActive 
                ? "bg-gray-700 text-white py-2 px-4 rounded-lg flex items-center space-x-3"
                : "text-gray-300 hover:bg-gray-800 py-2 px-4 rounded-lg flex items-center space-x-3"
            }
          >
            <FaClipboardList className="text-lg" />
            <span>Orders</span>
          </NavLink>

          <NavLink 
            to="/collections/all" 
            className={({isActive}) => 
              isActive 
                ? "bg-gray-700 text-white py-2 px-4 rounded-lg flex items-center space-x-3"
                : "text-gray-300 hover:bg-gray-800 py-2 px-4 rounded-lg flex items-center space-x-3"
            }
          >
            <FaStore className="text-lg" />
            <span>Shop</span>
          </NavLink>
        </nav>
      </div>

      {/* Buttons */}
      <div className="space-y-2">
        {/* Back to Dashboard */}
        <button 
          onClick={() => navigate("/admin")} 
          className="w-full bg-gray-800 hover:bg-gray-700 text-gray-200 py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition"
        >
          <FaArrowLeft className="text-lg" />
          <span>Back to Dashboard</span>
        </button>

        {/* Logout */}
        <button 
          onClick={handleLogout} 
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition"
        >
          <FaSignOutAlt className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default AdminSidebar
