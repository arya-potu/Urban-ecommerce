import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams, useLocation } from "react-router-dom";

import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";

const CollectionPage = () => {
  const { collection } = useParams();
  const [searchParamsV6] = useSearchParams ? useSearchParams() : [];
  const location = useLocation();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  // ✅ Handle both v5 and v6 for search params
  const queryParams =
    searchParamsV6 && searchParamsV6.size > 0
      ? Object.fromEntries([...searchParamsV6])
      : Object.fromEntries(new URLSearchParams(location.search));

  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch products whenever collection or filters change
  useEffect(() => {
    dispatch(fetchProductsByFilters({ collection, ...queryParams }));
  }, [dispatch, collection, location.search]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row relative min-h-screen bg-gray-50">
      {/* 🔸 Floating filter button (mobile only) */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed bottom-6 right-6 bg-orange-500 text-white p-4 rounded-full shadow-xl z-50 hover:bg-orange-600 transition duration-300 flex items-center justify-center"
      >
        <FaFilter size={20} />
      </button>

      {/* 🔸 Sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-40 w-72 bg-white shadow-lg overflow-y-auto transform transition-transform duration-300 lg:static lg:translate-x-0 lg:shadow-none`}
      >
        
        <FilterSidebar />
      </div>

      {/* 🔸 Main Content */}
      <div className="flex-grow p-6">
        <h2 className="text-3xl font-bold uppercase mb-6 text-gray-800 tracking-wide">
          {collection ? collection : "All Collections"}
        </h2>

        {/* Sort Options */}
        <div className="mb-6">
          <SortOptions />
        </div>

        {/* Product Grid */}
        <div>
          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
          )}
          {error && (
            <div className="text-center text-red-500 font-medium">
              Failed to load products. Please try again.
            </div>
          )}
          {!loading && !error && products && products.length > 0 && (
            <ProductGrid products={products} />
          )}
          {!loading && !error && products?.length === 0 && (
            <div className="text-center text-gray-500 mt-20">
              No products found in this collection.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
