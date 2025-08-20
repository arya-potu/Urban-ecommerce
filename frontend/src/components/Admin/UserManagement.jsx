import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "../../redux/slices/adminSlice";
import { motion } from "framer-motion";
import { Trash2, UserPlus } from "lucide-react";

const UserManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { users, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user && user.role === "admin") {
      dispatch(fetchUsers());
    }
  }, [user, dispatch]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(formData));
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer",
    });
  };

  const handleRoleChange = (userId, newRole) => {
    dispatch(updateUser({ id: userId, role: newRole }));
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto p-6"
    >
      <h2 className="text-3xl font-extrabold mb-8 text-gray-800 tracking-tight">
        User Management
      </h2>

      {loading && (
        <div className="flex justify-center items-center min-h-[120px]">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      )}
      {error && (
        <div className="text-red-500 font-semibold text-center mb-6">
          Error: {error}
        </div>
      )}

      {/* Add New User Form */}
      <div className="p-6 rounded-2xl mb-8 bg-white shadow-lg">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-800">
          <UserPlus size={18} /> Add New User
        </h3>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg shadow hover:bg-green-700 transition"
            >
              Add User
            </button>
          </div>
        </form>
      </div>

      {/* User List */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-2xl">
        <table className="min-w-full text-sm text-gray-600">
          <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Role</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((u, index) => (
                <motion.tr
                  key={u._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    {u.name}
                  </td>
                  <td className="p-4">{u.email}</td>
                  <td className="p-4">
                    <select
                      value={u.role}
                      onChange={(e) =>
                        handleRoleChange(u._id, e.target.value)
                      }
                      className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleDeleteUser(u._id)}
                      className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:bg-red-600 transition mx-auto"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="p-6 text-center text-gray-500"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default UserManagement;
