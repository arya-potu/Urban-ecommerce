import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import { mergeCart } from "../redux/slices/cartSlice";
import login from "../assets/login.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, guestId, loading } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(() => {
    if (user) {
      if (cart?.products.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        });
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, guestId, cart, isCheckoutRedirect, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-12">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-gray-900">Urban</h1>
            <p className="text-gray-500 mt-2">Welcome back 👋</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-gray-50 p-8 rounded-2xl shadow-sm border"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-2 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-2 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              to={`/register?redirect=${encodeURIComponent(redirect)}`}
              className="text-indigo-600 font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="hidden md:block w-1/2 relative">
        <img
          src={login}
          alt="Login"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
    </div>
  );
};

export default Login;
