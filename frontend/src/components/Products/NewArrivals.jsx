import React, { useEffect, useState, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
        );
        setNewArrivals(response.data);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    };
    fetchNewArrivals();
  }, []);

  // Drag functionality
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };
  const handleMouseUpOrLeave = () => setIsDragging(false);

  // Button scroll
  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  // Update button states
  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable =
        container.scrollWidth > leftScroll + container.clientWidth;

      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrollable);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return () => container.removeEventListener("scroll", updateScrollButtons);
    }
  }, [newArrivals]);

  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the latest styles straight off the runway, freshly added to
          keep your wardrobe on the cutting edge of fashion.
        </p>

        {/* Scroll Buttons */}
        <div className="absolute right-0 bottom-[-30px] flex space-x-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded shadow-md transition ${
              canScrollLeft
                ? "bg-white hover:bg-gray-100 text-black"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-2 rounded shadow-md transition ${
              canScrollRight
                ? "bg-white hover:bg-gray-100 text-black"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Scroll Content */}
     {/* Scroll Content */}
<div
  ref={scrollRef}
  className={`w-full px-4 overflow-x-auto flex space-x-6 relative snap-x snap-mandatory scrollbar-hide
    ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
  onMouseDown={handleMouseDown}
  onMouseMove={handleMouseMove}
  onMouseUp={handleMouseUpOrLeave}
  onMouseLeave={handleMouseUpOrLeave}
>
  {newArrivals.map((product) => (
    <div
      key={product._id}
      className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 relative group snap-start"
    >
      {/* Image */}
      <img
        src={product.images[0]?.url}
        alt={product.images[0]?.altText || product.Name}
        className="w-full h-[500px] object-cover rounded-xl transform transition-transform duration-500 group-hover:scale-105 shadow-lg"
        draggable="false"
      />

      {/* Price Box */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md text-white p-4 rounded-b-xl 
        opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out"
      >
        <Link to={`/product/${product._id}`} className="block">
          <h4 className="font-semibold">{product.Name}</h4>
          <p className="mt-1 text-lg font-medium">${product.price}</p>
        </Link>
      </div>
    </div>
  ))}
</div>


    </section>
  );
};

export default NewArrivals;
