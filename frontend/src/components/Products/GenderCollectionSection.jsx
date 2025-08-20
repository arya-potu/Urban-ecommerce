import React from "react";
import womens from "../../assets/womens-collection.jpeg";
import { Link } from "react-router-dom";
import mens from "../../assets/mens-collection.jpg";

const GenderCollectionSection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* Women's collection */}
        <div className="relative flex-1 group overflow-hidden rounded-2xl shadow-lg">
          <img
            src={womens}
            alt="Women's Collection"
            className="w-full aspect-[4/5] object-cover transform transition-transform duration-700 ease-in-out group-hover:scale-110"
          />
          <div className="absolute bottom-8 left-8 bg-white/90 p-6 rounded-lg shadow-md transform transition-all duration-500 opacity-90 group-hover:opacity-100 group-hover:translate-y-[-10px]">
            <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
              Women's Collection
            </h2>
            <Link
              to="/collections/all?gender=Women"
              className="text-red-600 font-semibold hover:underline transition"
            >
              Shop Now →
            </Link>
          </div>
        </div>

        {/* Men's collection */}
        <div className="relative flex-1 group overflow-hidden rounded-2xl shadow-lg">
          <img
            src={mens}
            alt="Men's Collection"
            className="w-full aspect-[4/5] object-cover transform transition-transform duration-700 ease-in-out group-hover:scale-110"
          />
          <div className="absolute bottom-8 left-8 bg-white/90 p-6 rounded-lg shadow-md transform transition-all duration-500 opacity-90 group-hover:opacity-100 group-hover:translate-y-[-10px]">
            <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
              Men's Collection
            </h2>
            <Link
              to="/collections/all?gender=Men"
              className="text-red-600 font-semibold hover:underline transition"
            >
              Shop Now →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;
