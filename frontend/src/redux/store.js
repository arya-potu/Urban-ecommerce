import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; 
import productReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import CheckoutReducer  from "./slices/checkoutSlice";
import orderReducer from "./slices/orderSlice"; 
import adminReducer from "./slices/adminSlice";
import adminProductReducer from "./slices/adminProductSlice";
import adminOrderReducer from "./slices/adminOrderSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    checkout: CheckoutReducer,
    orders: orderReducer,
    admin: adminReducer,
    adminProducts: adminProductReducer,
    adminOrders: adminOrderReducer,
  },
});

export default store;
