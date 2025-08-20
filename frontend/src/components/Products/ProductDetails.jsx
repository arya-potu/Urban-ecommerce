import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { motion } from 'framer-motion'
import ProductGrid from './ProductGrid';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails, fetchSimilarProducts } from '../../redux/slices/productsSlice';
import { addToCart } from '../../redux/slices/cartSlice';



const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error, similarProducts } = useSelector((state) => state.products);
  const { user, guestId } = useSelector((state) => state.auth);

  const [mainImage, setMainImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  
  const productFetchId = productId || id;

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const handleQuantityChange = (action) => {
    if (action === "plus") setQuantity((prev) => prev + 1);
    if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select a size and color before adding to bag.", { duration: 1000 });
      return;
    }
    setIsButtonDisabled(true);
   dispatch(
    addToCart({
    productId: productFetchId,
    quantity,
    size: selectedSize,
    color: selectedColor,
    guestId,
    userId: user?._id,

   }))
   .then(() => {
    toast.success("Product added to bag successfully!", { duration: 1000 });
   })
   .finally(() => {
    setIsButtonDisabled(false);
   });
  };


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="p-6">
        {selectedProduct && (

      <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-sm">
        <div className="flex flex-col md:flex-row gap-10">
          
          {/* Left: Thumbnails + Main Image */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row gap-6"
          >
            {/* Thumbnails */}
            <div className="hidden md:flex flex-col space-y-3">
              {selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-all duration-300
                  ${mainImage === image.url ? "ring-2 ring-black shadow-lg" : "ring-1 ring-gray-200 hover:ring-black"}`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="md:w-[400px] flex-shrink-0">
              {mainImage && (
                <motion.img
                  key={mainImage}
                  src={mainImage}
                  alt="Main Product"
                  className="w-full h-auto object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </div>
          </motion.div>

          {/* Right: Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6 }}
            className="md:w-1/2"
          >
            <h1 className="text-3xl font-bold mb-3">{selectedProduct.name}</h1>
            <p className="text-lg text-gray-400 line-through">
              {selectedProduct.originalPrice && `$${selectedProduct.originalPrice}`}
            </p>
            <p className="text-2xl font-semibold text-gray-800 mb-3">${selectedProduct.price}</p>
            <p className="text-gray-600 mb-6">{selectedProduct.description}</p>

            {/* Colors */}
            <div className="mb-6">
              <p className="text-gray-700 font-medium">Color:</p>
              <div className="flex gap-3 mt-2">
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-9 h-9 rounded-full border-2 transition-all 
                    ${selectedColor === color ? "border-black scale-110 shadow-md" : "border-gray-300 hover:border-black"}`}
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-6">
              <p className="text-gray-700 font-medium">Size:</p>
              <div className="flex gap-3 mt-2">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-full border transition-all
                    ${selectedSize === size ? "bg-black text-white border-black" : "hover:bg-gray-100"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <p className="text-gray-700 font-medium">Quantity:</p>
              <div className="flex items-center gap-4 mt-2">
                <button 
                  onClick={() => handleQuantityChange("minus")}
                  className="px-3 py-1 border rounded-lg hover:bg-gray-100"
                >-</button>
                <span className="text-lg font-medium">{quantity}</span>
                <button 
                  onClick={() => handleQuantityChange("plus")}
                  className="px-3 py-1 border rounded-lg hover:bg-gray-100"
                >+</button>
              </div>
            </div>

            {/* Add to Bag */}
            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={`bg-black text-white py-3 px-6 rounded-xl w-full text-lg font-semibold
              transition-all duration-300 ${isButtonDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-900"}`}
            >
              {isButtonDisabled ? "Adding..." : "ADD TO BAG"}
            </button>

            {/* Characteristics */}
            <div className="mt-10 text-gray-700">
              <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
              <table className="w-full text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-2">Brand</td>
                    <td className="py-2">{selectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-2">Material</td>
                    <td className="py-2">{selectedProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Similar Products */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h2 className="text-2xl text-center font-semibold mb-6">You May Also Like</h2>
          <ProductGrid products={similarProducts} loading={loading} error={error} />
        </motion.div>
      </div>
  )}
    </div>
  )
}

export default ProductDetails
