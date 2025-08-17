import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../services/cartService";
import toast from "react-hot-toast";
import { addToCartProduct } from "../store/slices/cart.slice";

const ProductCard = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  // check if product is already in cart
  const cartItem = cart.find((item) => item?.product?._id === product._id);

  const mainImage =
    product.images?.length > 0
      ? product.images[0].path
      : "https://via.placeholder.com/300x300.png?text=No+Image";

  const averageRating =
    product.ratings?.length > 0
      ? (
        product.ratings.reduce((sum, review) => sum + review.rating, 0) /
        product.ratings.length
      ).toFixed(1)
      : null;

  const handleAddToCart = async (newQuantity) => {
    if (!user || !user.status) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      const response = await addToCart(product._id, newQuantity);

      if (response?.ok) {
        setQuantity(quantity + newQuantity);
        dispatch(addToCartProduct({ product, quantity: newQuantity }));
        toast.success(response.message || "Product added to cart");
      } else {
        toast.error(response.message || "Failed to add to cart");
      }
    } catch (err) {
      console.error("Error in handleAddToCart:", err);
      if (err.message === "Unauthorized") {
        toast.error("Please login to continue");
        navigate("/login");
      } else {
        toast.error(err.message || "Failed to add to cart");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      {/* Product Image */}
      <div className="relative overflow-hidden h-64">
        <Link to={`/product/${product._id}`} className="block relative h-full w-full">
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-full transition-transform duration-500 ease-in-out object-contain"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300"></div>
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

        {/* Price */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-2xl font-semibold text-indigo-600">
            ₹{product.price.toLocaleString()}
          </span>
        </div>

        {/* Rating and Cart Controls */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-yellow-600">
            {averageRating
              ? `${averageRating} ★ (${product.ratings.length} reviews)`
              : `${product.ratings?.length || 0} reviews`}
          </span>

          {/* Conditional rendering based on cartItem */}
          {cartItem ? (
            // Quantity controls if product already in cart
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => handleAddToCart(-1)}
                disabled={cartItem.quantity <= 1 || loading}
                className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                -
              </button>
              <span className="px-3 py-1 text-sm font-medium min-w-[30px] text-center">
                {cartItem.quantity}
              </span>
              <button
                onClick={() => handleAddToCart(1)}
                disabled={cartItem.quantity >= product.stock || loading}
                className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>
          ) : (
            // Add to Cart button if product not in cart
            <button
              onClick={() => handleAddToCart(1)}
              disabled={loading || product.stock === 0}
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2"></div>
                  Adding...
                </div>
              ) : product.stock === 0 ? (
                "Out of Stock"
              ) : (
                `Add to Cart`
              )}
            </button>
          )}
        </div>
      </div>

      {/* Badges */}
      {product.stock > 0 && product.stock < 10 && (
        <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
          Low Stock!
        </div>
      )}
      {product.stock === 0 && (
        <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
          Out of Stock!
        </div>
      )}
    </div>
  );
};

export default ProductCard;
