import React from 'react'
import { motion } from 'framer-motion'
import Hero from '../components/Layout/Hero'
import GenderCollectionSection from '../components/Products/GenderCollectionSection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'
import ProductGrid from '../components/Products/ProductGrid'
import FeaturedCollection from '../components/Products/FeaturedCollection'
import FeaturesSection from '../components/Products/FeaturesSection'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import { fetchProductsByFilters } from '../redux/slices/productsSlice'
import  axios  from  'axios'


const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
}

const Home = () => {
    const dispatch = useDispatch();
    const {products, loading, error} = useSelector((state) => state.products);
    const [bestSellerProduct, setBestSellerProduct] = useState(null);

    useEffect(() => {
        // fetch products for a specific collection
        dispatch(
            fetchProductsByFilters({
                gender: "Women",
                category: "Bottom Wear",
                limit: 8,
            })
        );
        // fetch best seller product
        const fetchBestSeller = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
                setBestSellerProduct(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBestSeller();
    }, [dispatch]);

  return (
    <div className="overflow-x-hidden">
      <Hero />

      {/* Gender Section */}
      <motion.div
        initial="hidden"
        whileInView="show"
        variants={fadeInUp}
        viewport={{ once: true }}
      >
        <GenderCollectionSection />
      </motion.div>

      {/* New Arrivals */}
      <motion.div
        initial="hidden"
        whileInView="show"
        variants={fadeInUp}
        viewport={{ once: true }}
        className="py-20"
      >
        <NewArrivals />
      </motion.div>

      {/* Best Seller */}
      <motion.div
        initial="hidden"
        whileInView="show"
        variants={fadeInUp}
        viewport={{ once: true }}
        className="py-20"
      >
        <h2 className='text-4xl text-center font-extrabold mb-10 tracking-tight'>Best Seller</h2>
        {bestSellerProduct ? (
          <ProductDetails productId={bestSellerProduct._id} />
        ) : (
          <p className='text-center'>Loading Best Seller Product...</p>
        )}
      </motion.div>

      {/* Top Wears */}
      <motion.div
        initial="hidden"
        whileInView="show"
        variants={fadeInUp}
        viewport={{ once: true }}
        className="py-20 container mx-auto"
      >
        <h2 className='text-4xl text-center font-extrabold mb-10 tracking-tight'>Top Wears for Women</h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </motion.div>

      {/* Featured Collection */}
      <motion.div
        initial="hidden"
        whileInView="show"
        variants={fadeInUp}
        viewport={{ once: true }}
        className="py-20"
      >
        <FeaturedCollection />
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial="hidden"
        whileInView="show"
        variants={fadeInUp}
        viewport={{ once: true }}
        className="py-20 bg-gray-50"
      >
        <FeaturesSection />
      </motion.div>
    </div>
  )
}

export default Home
