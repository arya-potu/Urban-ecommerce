import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice";
import { fetchCheckoutById } from "../redux/slices/checkoutSlice"; // <-- new thunk to fetch order by ID
import { CheckCircle2 } from "lucide-react";

const OrderConfirmationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // order id from route
  const { checkout, loading } = useSelector((state) => state.checkout);

  // Fetch order by ID after redirect
  useEffect(() => {
    if (id) {
      dispatch(fetchCheckoutById(id));
    }
  }, [id, dispatch]);

  // Clear cart once order is confirmed
  useEffect(() => {
    if (checkout && checkout._id) {
      dispatch(clearCart());
      localStorage.removeItem("cart");
    }
    else{
        navigate("/my-orders"); // Redirect to my orders if no checkout found
    }
  }, [checkout, dispatch]);

  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 7);
    return orderDate.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-gray-500 text-lg">Loading your order...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="bg-gradient-to-r from-emerald-50 to-white p-10 rounded-2xl shadow-lg border">
        {/* Success header */}
        <div className="text-center mb-8">
          <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold text-emerald-700">
            Order Confirmed!
          </h1>
          <p className="text-gray-600 mt-2">
            Thank you for shopping with us. Your order has been placed
            successfully.
          </p>
        </div>

        {checkout && (
          <div>
            {/* Order info */}
            <div className="flex justify-between items-center bg-white shadow-md rounded-xl p-6 mb-8">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Order ID: <span className="text-emerald-700">{checkout._id}</span>
                </h2>
                <p className="text-gray-500">
                  Order Date:{" "}
                  {new Date(checkout.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-600">
                  Estimated Delivery
                </p>
                <p className="text-emerald-600 font-semibold">
                  {calculateEstimatedDelivery(checkout.createdAt)}
                </p>
              </div>
            </div>

            {/* Ordered items */}
            <div className="bg-white shadow-md rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Ordered Items
              </h3>
              <div className="divide-y">
                {checkout.checkoutItems.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center py-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg mr-4 border"
                    />
                    <div>
                      <h4 className="font-medium text-gray-800">{item.name}</h4>
                      <p className="text-sm text-gray-500">
                        {item.color} | {item.size}
                      </p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-md font-semibold text-gray-800">
                        ${item.price}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment & delivery */}
            <div className="bg-white shadow-md rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-lg font-semibold mb-2 text-gray-800">
                  Payment
                </h4>
                <p className="text-gray-600">{checkout.paymentMethod}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2 text-gray-800">
                  Delivery Address
                </h4>
                <p className="text-gray-600">{checkout.shippingAddress.address}</p>
                <p className="text-gray-600">
                  {checkout.shippingAddress.city},{" "}
                  {checkout.shippingAddress.country}
                </p>
              </div>
            </div>

            {/* Continue shopping */}
            <div className="text-center">
              <Link
                to="/"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-md transition"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
