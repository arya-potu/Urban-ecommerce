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
  const colors = [
    "Red", "Blue", "Black", "Green", "Yellow", "Gray", "White", "Pink", "Beige", "Navy",
  ];
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
      <label className="block text-gray-600 font-medium mb-2">{label}</label>
      {options.map((opt) => (
        <div key={opt} className="flex items-center mb-1">
          <input
            type="checkbox"
            name={name}
            value={opt}
            checked={filters[name].includes(opt)}
            onChange={handleFilterChange}
            className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
          />
          <span className="text-gray-700">{opt}</span>
        </div>
      ))}
    </div>
  );

  const renderRadioGroup = (label, options, name) => (
    <div className="mb-6">
      <label className="block text-gray-600 font-medium mb-2">{label}</label>
      {options.map((opt) => (
        <div key={opt} className="flex items-center mb-1">
          <input
            type="radio"
            name={name}
            value={opt}
            checked={filters[name] === opt}
            onChange={handleFilterChange}
            className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
          />
          <span className="text-gray-700">{opt}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Filters</h3>
        <button
          onClick={handleClearAll}
          className="text-sm text-blue-500 hover:text-white hover:bg-blue-500 px-3 py-1 rounded transition"
        >
          Clear All
        </button>
      </div>

      {renderRadioGroup("Category", categories, "category")}
      {renderRadioGroup("Gender", genders, "gender")}

      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              name="color"
              value={color}
              onClick={(e) => handleFilterChange({ target: e.target })}
              className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition transform hover:scale-105 ${
                filters.color === color ? "ring-2 ring-blue-500" : ""
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
            />
          ))}
        </div>
      </div>

      {renderCheckboxGroup("Size", sizes, "size")}
      {renderCheckboxGroup("Material", materials, "material")}
      {renderCheckboxGroup("Brand", brands, "brand")}

      <div className="mb-8">
        <label className="block text-gray-600 font-medium mb-2">Price Range</label>
        <input
          type="range"
          name="priceRange"
          min={0}
          max={100}
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>$0</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
