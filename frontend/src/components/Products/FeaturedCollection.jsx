import React from 'react';
import featured from "../../assets/featured.jpg";
import { Link } from 'react-router-dom';

const FeaturedCollection = () => {
  return (
    <section className="py-20 px-6 lg:px-0">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center 
        bg-gradient-to-r from-gray-50 via-white to-gray-100 
        rounded-3xl shadow-xl overflow-hidden">

        {/* left content */}
        <div className="lg:w-1/2 p-10 text-center lg:text-left">
          <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-3">
            Comfort • Style • Everyday
          </h2>
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 text-gray-900 leading-tight">
            Apparel made for your <span className="text-rabbit-red">everyday life</span>
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Discover premium-quality, comfortable clothing that blends fashion and function effortlessly. 
            Designed to elevate your look and make you feel confident every day.
          </p>
          <Link 
            to="/collections/all" 
            className="inline-block bg-rabbit-red text-white px-8 py-4 rounded-xl text-lg 
            shadow-md hover:shadow-xl hover:bg-red-700 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
            Shop Now
          </Link>
        </div>

        {/* right content */}
        <div className="lg:w-1/2">
          <img 
            src={featured} 
            alt="Featured Collection" 
            className="w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl 
            transform transition-all duration-500 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
