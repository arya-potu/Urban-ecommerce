import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import PayPalButton from "./PayPalButton";
import { createCheckout } from "../../redux/slices/checkoutSlice"; // ensure this is the correct import path
// import { createCheckout } from "../../redux/slices/checkoutSlice"; // uncomment if you have it

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [checkoutId, setCheckoutId] = useState(null);
  const [email, setEmail] = useState(user?.email || "user@example.com");
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    if (cart && cart.products.length > 0) {
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: "Paypal",
          totalPrice: cart.totalPrice,
        })
      );

      if (res.payload && res.payload._id) {
        setCheckoutId(res.payload._id);
      }
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        {
          paymentStatus: "paid",
          paymentDetails: details,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );


        await handleFinalizeCheckout(checkoutId);

    } catch (error) {
      console.error(error);
    }
  };

  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
        { checkoutId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

     
        navigate("/order-confirmation");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error loading cart: {error}</p>;
  if (!cart || !cart.products || cart.products.length === 0) {
    return <p>No items in cart</p>;
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Left Section */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-3xl font-semibold text-gray-900 tracking-tight mb-6">
          Checkout
        </h2>
        <form onSubmit={handleCreateCheckout} className="space-y-6">
          {/* Contact */}
          <div>
            <h3 className="text-xl font-medium text-gray-800 mb-3">
              Contact Details
            </h3>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              disabled
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none bg-gray-50"
            />
          </div>

          {/* Delivery */}
          <div>
            <h3 className="text-xl font-medium text-gray-800 mb-3">Delivery</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
                required
              />
            </div>

            <input
              type="text"
              placeholder="Address"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              className="w-full mt-4 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
              required
            />

            <div className="grid grid-cols-2 gap-4 mt-4">
              <input
                type="text"
                placeholder="City"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="Postal Code"
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
                required
              />
            </div>

            <input
              type="text"
              placeholder="Country"
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
              className="w-full mt-4 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
              required
            />

            <input
              type="tel"
              placeholder="Phone"
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
              className="w-full mt-4 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
              required
            />
          </div>

          {/* Continue / Payment */}
          <div className="pt-4">
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full py-4 text-lg font-medium rounded-xl bg-black text-white shadow-md hover:shadow-lg hover:bg-gray-900 transition"
              >
                Continue to Payment
              </button>
            ) : (
              <div className="pt-2">
                <h3 className="text-lg font-semibold mb-3">
                  Complete Payment
                </h3>
                <PayPalButton
                  amount={cart.totalPrice}
                  onSuccess={handlePaymentSuccess}
                  onError={() => alert("Payment failed. Try again.")}
                />
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Right Section - Order Summary */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
          Order Summary
        </h3>
        <div className="space-y-4 divide-y divide-gray-200">
          {cart.products.map((product, index) => (
            <div key={index} className="flex justify-between py-4">
              <div className="flex gap-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                />
                <div>
                  <h4 className="text-lg font-medium text-gray-800">
                    {product.name}
                  </h4>
                  <p className="text-sm text-gray-500">Size: {product.size}</p>
                  <p className="text-sm text-gray-500">Color: {product.color}</p>
                </div>
              </div>
              <p className="text-lg font-semibold text-gray-900">
                ${product.price?.toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3 text-gray-700">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>${cart.totalPrice?.toLocaleString()}</p>
          </div>
          <div className="flex justify-between">
            <p>Shipping</p>
            <p className="text-green-600 font-medium">Free</p>
          </div>
          <div className="flex justify-between border-t pt-4 text-lg font-semibold">
            <p>Total</p>
            <p>${cart.totalPrice?.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
