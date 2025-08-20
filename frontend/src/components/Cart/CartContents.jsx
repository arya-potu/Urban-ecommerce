import React from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { updateCartItemQuantity, removeFromCart } from "../../redux/slices/cartSlice";

const CartContents = ({ userId, guestId }) => {
  const dispatch = useDispatch();

  // Get cart from Redux store
  const cart = useSelector((state) => state.cart.cart);
  const products = cart?.products || [];

  const handleQuantityChange = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          size,
          color,
          userId,
          guestId,
        })
      );
    }
  };

  const handleRemoveItem = (productId, size, color) => {
    dispatch(
      removeFromCart({
        productId,
        size,
        color,
        userId,
        guestId,
      })
    );
  };

  if (products.length === 0) {
    return <p className="text-gray-500 p-6 text-center">Your cart is empty.</p>;
  }

  return (
    <div className="space-y-4">
      {products.map((product, index) => (
        <div
          key={index}
          className="flex items-start justify-between p-4 border-b hover:bg-gray-50 transition rounded-lg"
        >
          {/* Product Info */}
          <div className="flex items-start space-x-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 object-cover rounded"
            />
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Size: {product.size} | Color: {product.color}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center mt-3 space-x-3">
                <button
                  onClick={() =>
                    handleQuantityChange(
                      product.productId,
                      -1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                  className="border rounded px-2 py-1 text-lg font-medium hover:bg-gray-200 transition"
                >
                  -
                </button>
                <span className="text-base font-medium">{product.quantity}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(
                      product.productId,
                      1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                  className="border rounded px-2 py-1 text-lg font-medium hover:bg-gray-200 transition"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Price & Remove */}
          <div className="flex flex-col items-end justify-between">
            <p className="font-semibold">
              ${(product.price * product.quantity).toLocaleString()}
            </p>
            <button
              onClick={() =>
                handleRemoveItem(product.productId, product.size, product.color)
              }
              className="mt-2 hover:text-red-700 transition"
            >
              <RiDeleteBin2Line className="h-6 w-6 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
