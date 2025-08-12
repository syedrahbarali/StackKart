import { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  // const [loading, setLoading] = useState(false);

  const mainImage =
    product.images && product.images.length > 0
      ? product.images[0].path
      : 'placeholder-image-path';

  const averageRating =
    product.ratings && product.ratings.length > 0
      ? (
        product.ratings.reduce((sum, review) => sum + review.rating, 0) /
        product.ratings.length
      ).toFixed(1)
      : null;
    
  return (
    <div
      className="relative max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden h-64">
        <Link to={`/product/${product._id}`} className="block relative h-full w-full">
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-full transition-transform duration-500 ease-in-out object-contain"
            style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
          />
          <div
            className={`absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
              }`}
          ></div>
        </Link>
      </div>


      {/* Product Details */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-1 truncate">
          <Link to={`/product/${product._id}`}>{product.name}</Link>
        </h3>
        <p className="text-sm text-gray-500 mb-2">
          {product.brand} - {product.category}
        </p>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-2xl font-semibold text-indigo-600">
            ₹ {product.price}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-yellow-600">
            {averageRating
              ? `${averageRating} ★ (${product.reviewCount} reviews)`
              : `${product.reviewCount} reviews`}
          </span>
          <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Low Stock Badge */}
      {product.stock < 10 && (
        <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
          Low Stock!
        </div>
      )}
    </div>
  );
};

export default ProductCard;
