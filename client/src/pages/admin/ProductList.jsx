import { useEffect, useState } from 'react';
import { fetchAllProducts } from '../../services/productServices';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllProducts().then(res => {
      setProducts(res.products || []);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-8">
      <h1 className="text-3xl font-bold text-indigo-800 mb-6">All Products</h1>
      {loading ? (
        <div className="text-center text-lg">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product._id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition-all duration-300">
              <img src={product.images?.[0]?.path || 'https://via.placeholder.com/150'} alt={product.name} className="w-32 h-32 object-cover rounded mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-1">Brand: {product.brand}</p>
              <p className="text-gray-600 mb-1">Category: {product.category}</p>
              <p className="text-indigo-600 font-bold text-lg mb-2">₹{product.price}</p>
              <p className="text-sm text-gray-500">Stock: {product.stock}</p>
              <button
                className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-all duration-200"
                onClick={() => navigate(`/admin/products/${product._id}/edit`)}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
