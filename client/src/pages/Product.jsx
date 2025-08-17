import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductById } from "../services/productServices";
import {
  addToCartProduct,
} from "../store/slices/cart.slice";
import toast from "react-hot-toast";
import { updateUser } from "../store/slices/auth.slice";
import { addToCart } from "../services/cartService";

const Product = () => {
  const { productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const state = useSelector((state) => state.auth);
  const cartState = useSelector((state) => state.cart);
  const [quantity, setQuantity] = useState((cartState.filter((item) => item.product._id === productId)[0]?.quantity || 1));
  const productFromStore = useSelector((state) =>
    state.product?.find((product) => product._id === productId)
  );


  // Calculate average rating
  const averageRating =
    product?.ratings && product?.ratings?.length > 0
      ? (
        product.ratings.reduce((sum, review) => sum + review.rating, 0) /
        product.ratings.length
      ).toFixed(1)
      : 0;

  // Format dates
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  useEffect(() => {
    if (productFromStore) {
      console.log("Product Fetched From Store");
      setProduct(productFromStore);
      setLoading(false);
    } else {
      setLoading(true);

      fetchProductById(productId)
        .then((res) => {
          if (res?.ok) {
            console.log("Product Fetched From API");
            setProduct(res.product);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [productFromStore, productId]);

  const handleAddToCart = async (newQuantity) => {
    if (!state) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }

    try {

      const response = await addToCart(productId, newQuantity);

      if (response?.ok) {
        // Add to Redux store
        dispatch(addToCartProduct({ product, quantity: newQuantity }));

        // Update user cart in auth state if needed
        if (response?.newItem) {
          const user = {
            ...state,
            cart: [...(state.cart || []), response?.newItem?._id],
          };

          dispatch(updateUser(user));
        }
        setQuantity(quantity + newQuantity);
      } else {
        toast.error(response.message || "Failed to add to cart");
      }

      toast.success(
        response.message || "Product added to cart successfully!"
      );
    } catch (error) {
      console.error("Error adding to cart:", error);

      if (error.message === "Unauthorized") {
        toast.error("Please login to continue");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error(error.message || "Failed to add to cart");
      }
    }
  };

  return (
    <>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500"></div>
        </div>
      ) : (
        <div className="min-h-[calc(100vh-74px)] flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header with Product Name and Brand */}
            <div className="p-8 bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-lg">
                {product.brand} - {product.category}
              </p>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-xl shadow-md">
                  <img
                    src={
                      product.images[selectedImage]?.path ||
                      "placeholder-image-url"
                    }
                    alt={`${product.name} - Image ${selectedImage + 1}`}
                    className="w-full h-96 object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((img, index) => (
                    <img
                      key={index}
                      src={img.path}
                      alt={`${product.name} - Thumbnail ${index + 1}`}
                      className={`w-full h-24 object-cover rounded-lg cursor-pointer transition-opacity duration-300 ${selectedImage === index
                        ? "opacity-100 border-2 border-indigo-500"
                        : "opacity-70 hover:opacity-100"
                        }`}
                      onClick={() => setSelectedImage(index)}
                    />
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Description
                  </h2>
                  <p className="text-gray-600">{product.description}</p>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                      Price
                    </h2>
                    <p className="text-3xl font-bold text-indigo-600">
                      ₹{product.price}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                      Stock
                    </h2>
                    <p className="text-xl text-gray-600">
                      {product.stock} available
                    </p>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Quantity
                  </h2>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleAddToCart(-1)}
                      disabled={quantity <= 1}
                      className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 bg-gray-100 rounded-md min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleAddToCart(1)}
                      disabled={quantity >= product.stock}
                      className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Rating
                  </h2>
                  <p className="text-xl text-yellow-600">
                    {averageRating} ★ ({product.reviewCount || 0} reviews)
                  </p>
                </div>

                <div className="flex justify-between text-sm text-gray-500">
                  <p>Created: {formatDate(product.createdAt)}</p>
                  <p>Updated: {formatDate(product.updatedAt)}</p>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={cartState.loading || quantity > product.stock}
                  className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {cartState.loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white mr-2"></div>
                      Adding to Cart...
                    </div>
                  ) : (
                    `Add to Cart (₹${(
                      product.price * quantity
                    ).toLocaleString()})`
                  )}
                </button>
              </div>
            </div>

            {/* Reviews Section */}
            {product.ratings && product.ratings.length > 0 && (
              <div className="p-8 border-t border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Reviews
                </h2>
                <div className="space-y-4">
                  {product.ratings.map((review, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 rounded-lg shadow"
                    >
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">
                          {review.user || "Anonymous"}
                        </span>
                        <span className="text-yellow-600">
                          {review.rating} ★
                        </span>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
