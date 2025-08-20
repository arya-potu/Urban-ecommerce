import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineUser, HiOutlineShoppingBag, HiBars3BottomRight } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const { cart } = useSelector((state) => state.cart);

  const { user } = useSelector((state) => state.auth);
  const cartItemCount = cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0;

  const toggleNavDrawer = () => setNavDrawerOpen(!navDrawerOpen);
  const toggleCartDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div>
          <Link to="/" className="text-2xl font-bold text-gray-800">
            Urban
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          {[
            { label: "Men", link: "/collections/all?gender=Men" },
            { label: "Women", link: "/collections/all?gender=Women" },
            { label: "Top Wear", link: "/collections/all?category=Top Wear" },
            { label: "Bottom Wear", link: "/collections/all?category=Bottom Wear" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.link}
              className="text-gray-700 hover:text-black text-sm font-medium uppercase transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
            {user && user.role === "admin" && (
                 <Link to="/admin" className="bg-black text-white text-sm px-3 py-1 rounded hover:bg-gray-800 transition">
            Admin
          </Link>
          )}

          <Link to="/profile" className="hover:text-black transition">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>

          <button onClick={toggleCartDrawer} className="relative hover:text-black transition">
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold rounded-full px-2 py-0.5 animate-pulse">
                {cartItemCount}
              </span>
            )}
          </button>

          <div className="overflow-hidden hidden md:block">
            <SearchBar />
          </div>

          <button onClick={toggleNavDrawer} className="md:hidden">
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav className="space-y-4">
            {[
              { label: "Men", link: "/collections/all?gender=Men" },
              { label: "Women", link: "/collections/all?gender=Women" },
              { label: "Top Wear", link: "/collections/all?category=Top Wear" },
              { label: "Bottom Wear", link: "/collections/all?category=Bottom Wear" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.link}
                onClick={toggleNavDrawer}
                className="block text-gray-600 hover:text-black transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
