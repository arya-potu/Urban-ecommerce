import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFilters, fetchProductsByFilters } from "../../redux/slices/productsSlice";

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortValue, setSortValue] = useState(searchParams.get("sortBy") || "");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  // Sync local state with URL params
  useEffect(() => {
    const currentSort = searchParams.get("sortBy") || "";
    setSortValue(currentSort);
  }, [searchParams]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSortChange = (value) => {
    setSortValue(value);
    setIsOpen(false); // close dropdown

    // Update URL params
    if (value) {
      searchParams.set("sortBy", value);
    } else {
      searchParams.delete("sortBy");
    }
    setSearchParams(searchParams);

    // Update Redux filters and fetch products
    dispatch(setFilters({ sortBy: value }));
    dispatch(fetchProductsByFilters({ sortBy: value }));
  };

  const options = [
    { value: "", label: "Default" },
    { value: "priceAsc", label: "💰 Price: Low to High" },
    { value: "priceDesc", label: "💎 Price: High to Low" },
    { value: "popularity", label: "🔥 Popularity" },
    { value: "newest", label: "✨ Newest Arrivals" },
    { value: "bestSeller", label: "🏆 Best Sellers" },
  ];

  return (
    <div className="mb-6 flex items-center justify-end relative" ref={dropdownRef}>
      <button
        className="w-[220px] rounded-2xl border border-gray-300 bg-white shadow-sm px-3 py-2 text-sm font-medium text-left focus:ring-2 focus:ring-black transition"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {options.find((o) => o.value === sortValue)?.label || "Sort By"}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-[220px] rounded-xl shadow-lg border border-gray-200 bg-white z-10">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className="cursor-pointer px-3 py-2 hover:bg-gray-100"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortOptions;
