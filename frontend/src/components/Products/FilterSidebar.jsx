import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });

  const [priceRange, setPriceRange] = useState([0, 100]);

  const categories = ["Top Wear", "Bottom Wear"];
  const colors = ["Red", "Blue", "Black", "Green", "Yellow", "Gray", "White", "Pink", "Beige", "Navy"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const materials = ["Cotton", "Wool", "Denim", "Polyester", "Silk", "Linen", "Viscose", "Fleece"];
  const brands = ["Urban Threads", "Modern Fit", "Street Style", "Beach Breeze", "Fashionista", "ChicStyle"];
  const genders = ["Men", "Women"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 100,
    });
    setPriceRange([0, params.maxPrice || 100]);
  }, [searchParams]);

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(","));
      } else if (newFilters[key] || newFilters[key] === 0) {
        params.append(key, newFilters[key]);
      }
    });
    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...filters };

    if (type === "checkbox") {
      newFilters[name] = checked
        ? [...(newFilters[name] || []), value]
        : newFilters[name].filter((item) => item !== value);
    } else {
      newFilters[name] = value;
    }

    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const handlePriceChange = (e) => {
    const newMax = Number(e.target.value);
    setPriceRange([0, newMax]);
    const newFilters = { ...filters, maxPrice: newMax };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const handleClearAll = () => {
    const clearedFilters = {
      category: "",
      gender: "",
      color: "",
      size: [],
      material: [],
      brand: [],
      minPrice: 0,
      maxPrice: 100,
    };
    setFilters(clearedFilters);
    setPriceRange([0, 100]);
    updateURLParams(clearedFilters);
  };

  const renderCheckboxGroup = (label, options, name) => (
    <div className="mb-6">
      <h4 className="text-gray-800 font-semibold mb-3 border-b border-gray-200 pb-1 tracking-wide">{label}</h4>
      <div className="space-y-2">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              name={name}
              value={opt}
              checked={filters[name].includes(opt)}
              onChange={handleFilterChange}
              className="h-4 w-4 rounded border-gray-300 text-indigo-500 focus:ring-indigo-400 transition"
            />
            <span className="text-gray-600 group-hover:text-indigo-600 transition">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const renderRadioGroup = (label, options, name) => (
    <div className="mb-6">
      <h4 className="text-gray-800 font-semibold mb-3 border-b border-gray-200 pb-1 tracking-wide">{label}</h4>
      <div className="space-y-2">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2 cursor-pointer group">
            <input
              type="radio"
              name={name}
              value={opt}
              checked={filters[name] === opt}
              onChange={handleFilterChange}
              className="h-4 w-4 border-gray-300 text-indigo-500 focus:ring-indigo-400 transition"
            />
            <span className="text-gray-600 group-hover:text-indigo-600 transition">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gradient-to-br from-white/80 to-gray-50/60 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 tracking-wide">✨ Filters</h3>
        <button
          onClick={handleClearAll}
          className="text-sm text-indigo-500 font-medium hover:text-white hover:bg-indigo-500 px-3 py-1.5 rounded-lg shadow-sm transition"
        >
          Clear All
        </button>
      </div>

      {renderRadioGroup("Category", categories, "category")}
      {renderRadioGroup("Gender", genders, "gender")}

      {/* Colors */}
      <div className="mb-6">
        <h4 className="text-gray-800 font-semibold mb-3 border-b border-gray-200 pb-1 tracking-wide">Color</h4>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color}
              name="color"
              value={color}
              onClick={(e) => handleFilterChange({ target: e.target })}
              className={`w-9 h-9 rounded-full border shadow-sm cursor-pointer transition transform hover:scale-110 ${
                filters.color === color ? "ring-2 ring-indigo-500" : "border-gray-300"
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
            />
          ))}
        </div>
      </div>

      {renderCheckboxGroup("Size", sizes, "size")}
      {renderCheckboxGroup("Material", materials, "material")}
      {renderCheckboxGroup("Brand", brands, "brand")}

      {/* Price */}
      <div className="mb-8">
        <h4 className="text-gray-800 font-semibold mb-3 border-b border-gray-200 pb-1 tracking-wide">Price Range</h4>
        <input
          type="range"
          name="priceRange"
          min={0}
          max={100}
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full accent-indigo-500 cursor-pointer"
        />
        <div className="flex justify-between text-gray-700 mt-2 text-sm">
          <span>$0</span>
          <span className="font-semibold text-indigo-600">${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
