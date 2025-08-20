import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetails } from "../redux/slices/orderSlice";
import { CheckCircle, XCircle, Truck } from "lucide-react"; // premium icons

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
        Order Details
      </h2>

      {!orderDetails ? (
        <p>No Order details found</p>
      ) : (
        <div className="p-6 sm:p-8 rounded-2xl shadow-lg border bg-white">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                Order ID: #{orderDetails._id}
              </h3>
              <p className="text-gray-500 text-sm">
                {new Date(orderDetails.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
              <span
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                  orderDetails.isPaid
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {orderDetails.isPaid ? (
                  <CheckCircle size={16} />
                ) : (
                  <XCircle size={16} />
                )}
                {orderDetails.isPaid ? "Approved" : "Pending"}
              </span>

              <span
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                  orderDetails.isDelivered
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                <Truck size={16} />
                {orderDetails.isDelivered ? "Delivered" : "Pending Delivery"}
              </span>
            </div>
          </div>

          {/* Payment & Shipping */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
            <div className="p-4 rounded-xl bg-gray-50 shadow-sm">
              <h4 className="text-lg font-semibold mb-2">💳 Payment Info</h4>
              <p className="text-gray-600">
                Method: {orderDetails.paymentMethod}
              </p>
              <p
                className={`font-medium ${
                  orderDetails.isPaid ? "text-green-600" : "text-red-600"
                }`}
              >
                {orderDetails.isPaid ? "Paid" : "Unpaid"}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 shadow-sm">
              <h4 className="text-lg font-semibold mb-2">🚚 Shipping Info</h4>
              <p className="text-gray-600">
                Method: {orderDetails.shippingMethod}
              </p>
              <p className="text-gray-600">
                Address:{" "}
                {`${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.country}`}
              </p>
            </div>
          </div>

          {/* Products */}
          <div className="overflow-x-auto">
            <h4 className="text-lg font-semibold mb-4">🛍️ Products</h4>
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700 text-sm">
                <tr>
                  <th className="py-3 px-4 text-left">Product</th>
                  <th className="py-3 px-4 text-center">Unit Price</th>
                  <th className="py-3 px-4 text-center">Quantity</th>
                  <th className="py-3 px-4 text-center">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {orderDetails.orderItems.map((item) => (
                  <tr
                    key={item.productId}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg mr-4"
                      />
                      <Link
                        to={`/product/${item.productId}`}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-center">${item.price}</td>
                    <td className="py-3 px-4 text-center">{item.quantity}</td>
                    <td className="py-3 px-4 text-center font-semibold">
                      ${item.price * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Back link */}
          <div className="mt-8">
            <Link
              to="/my-orders"
              className="inline-block px-5 py-2 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-xl shadow hover:opacity-90 transition"
            >
              ← Back to My Orders
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
