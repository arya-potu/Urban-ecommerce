import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import MyOrdersPage from "./MyOrdersPage";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* User Card */}
          <div className="w-full md:w-1/3 lg:w-1/4 bg-white rounded-2xl shadow-2xl p-6 flex flex-col items-center text-center">
            <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-4 border-indigo-500">
              <img
                src={user?.avatar || "https://i.pravatar.cc/150?img=3"}
                alt={user?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{user?.name}</h1>
            <p className="text-gray-500 mb-6">{user?.email}</p>
            <button
              onClick={handleLogout}
              className="w-full py-2 px-4 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>

          {/* Orders Section */}
          <div className="w-full md:w-2/3 lg:w-3/4 bg-white rounded-2xl shadow-2xl p-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">My Orders</h2>
            <div className="overflow-x-auto">
              <MyOrdersPage />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
