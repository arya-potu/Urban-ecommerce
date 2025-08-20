import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllOrders } from "../redux/slices/adminOrderSlice";
import {
  fetchAdminProducts,
  selectAdminTotalProducts,
} from "../redux/slices/adminProductSlice";
import { FaDollarSign, FaBoxOpen, FaClipboardList } from "react-icons/fa";

const StatCard = ({ title, value, icon: Icon, link }) => (
  <div className="p-6 rounded-2xl bg-white shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-sm font-medium text-gray-500">{title}</h2>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        {link && (
          <Link
            to={link}
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Manage →
          </Link>
        )}
      </div>
      <div className="p-4 rounded-full bg-indigo-100 text-indigo-600 shadow-inner">
        <Icon className="text-2xl" />
      </div>
    </div>
  </div>
);

const AdminHomePage = () => {
  const dispatch = useDispatch();
  const totalProducts = useSelector(selectAdminTotalProducts);
  const {
    orders,
    totalOrders,
    totalSales,
    loading: ordersLoading,
    error: ordersError,
  } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  if (ordersLoading) return <p className="text-gray-500">Loading...</p>;
  if (ordersError) return <p className="text-red-500">Error: {ordersError}</p>;

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-10">
      <header>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-1">Overview of your store’s activity</p>
      </header>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Revenue"
          value={`$${totalSales.toFixed(2)}`}
          icon={FaDollarSign}
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={FaClipboardList}
          link="/admin/orders"
        />
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={FaBoxOpen}
          link="/admin/products"
        />
      </div>

      {/* Recent Orders */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Orders</h2>
        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Total</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.length > 0 ? (
                orders.map((order, idx) => (
                  <tr
                    key={order._id}
                    className={`${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-indigo-50 transition`}
                  >
                    <td className="px-6 py-4 font-mono text-gray-800">
                      {order._id}
                    </td>
                    <td className="px-6 py-4">{order.user.name}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      ${order.totalPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        ● {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-6 text-center text-gray-500 italic"
                  >
                    No recent orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminHomePage;
