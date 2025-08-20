import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteProduct,
  fetchAdminProducts,
} from "../../redux/slices/adminProductSlice";
import { motion } from "framer-motion";
import { Trash2, Pencil } from "lucide-react";

const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.adminProducts
  );

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  // ✅ ensure products is always an array
  const safeProducts = Array.isArray(products)
    ? products
    : products?.products && Array.isArray(products.products)
    ? products.products
    : [];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 font-semibold text-center mt-6">
        Error: {error}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto p-6"
    >
      <h2 className="text-3xl font-extrabold mb-8 text-gray-800 tracking-tight">
        Product Management
      </h2>

      <div className="overflow-x-auto bg-white shadow-lg rounded-2xl">
        <table className="min-w-full text-sm text-gray-600">
          <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Price</th>
              <th className="py-3 px-6">SKU</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {safeProducts.length > 0 ? (
              safeProducts.map((product, index) => (
                <motion.tr
                  key={product._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="p-4">${product.price}</td>
                  <td className="p-4">{product.sku}</td>
                  <td className="p-4 text-center flex justify-center gap-3">
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded-lg shadow hover:bg-yellow-600 transition"
                    >
                      <Pencil size={16} /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:bg-red-600 transition"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ProductManagement;
