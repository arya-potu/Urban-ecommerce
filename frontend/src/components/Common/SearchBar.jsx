import { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFilters, fetchProductsByFilters } from "../../redux/slices/productsSlice";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchToggle = () => setIsOpen(!isOpen);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return; // prevent empty search
    dispatch(setFilters({ search: searchTerm }));
    dispatch(fetchProductsByFilters({ search: searchTerm })); // make sure API reads 'search'
    navigate(`/collections/all?search=${encodeURIComponent(searchTerm)}`);
    setIsOpen(false);
  };

  return (
    <div className={`flex items-center justify-center w-full transition-all duration-300 ${isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"}`}>
      {isOpen ? (
        <form onSubmit={handleSearch} className="relative flex items-center justify-center w-full">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-100 px-4 py-2 pr-12 rounded-lg w-full focus:outline-none placeholder:text-gray-700"
            />
            <button type="submit" className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800">
              <HiMagnifyingGlass className="h-6 w-6"/>
            </button>
          </div>
          <button
            type="button"
            onClick={handleSearchToggle}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
          >
            <HiMiniXMark className="h-6 w-6"/>
          </button>
        </form>
      ) : (
        <button onClick={handleSearchToggle}>
          <HiMagnifyingGlass className="h-6 w-6"/>
        </button>
      )}
    </div>
  );
};

export default SearchBar;
