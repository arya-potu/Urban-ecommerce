import React from 'react'
import heroImg from "../../assets/rabbit-hero.jpg";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative overflow-hidden w-full max-w-full">
      {/* Background Image */}
      <img 
        src={heroImg} 
        alt="Vacation" 
        className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <div className="text-center text-white p-6">
          
          {/* Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight uppercase mb-4 drop-shadow-lg"
          >
            Vacation
          </motion.h1>

          {/* Sub Text */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-base md:text-lg mb-6 tracking-wide drop-shadow-md"
          >
            Explore our vacation-ready outfits with fast worldwide shipping.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
          >
            <Link 
              to="/collections/all" 
              className="inline-block bg-orange-500 text-white px-8 py-3 rounded-md text-lg font-semibold shadow-lg 
                         hover:bg-orange-600 hover:scale-105 transition-transform duration-200"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Floating Animation (optional decoration) */}
      {/* <motion.div
        className="absolute bottom-10 right-10 w-24 h-24 bg-orange-500 rounded-full opacity-30"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      /> */}
    </section>
  )
}

export default Hero
