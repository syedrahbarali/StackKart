import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {  fetchAddToCart, fetchProductById } from '../services/productServices';
import { addToCart } from '../store/slices/cart.slice';
import toast from 'react-hot-toast';

const Product = () => {

  const { productId } = useParams();
  
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const productFromStore = useSelector(state => state.product?.products?.find(product => product._id === productId));

  // Calculate average rating
  const averageRating = product?.ratings && product?.ratings?.length > 0
    ? (product.ratings.reduce((sum, review) => sum + review.rating, 0) / product.ratings.length).toFixed(1)
    : 0;

  // Format dates
  const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  useEffect(() => {
    console.log("Fetching Product")

    if (productFromStore) {
      setProduct(productFromStore);
      setLoading(false);
    } else {
      setLoading(true);
      console.log(productId)
      fetchProductById(productId).then(res => {
        console.log(res)
        if (res?.ok) {
          setProduct(res.product);
        }
      }).finally(() => {
        setLoading(false)
      })
    }
  }, [productFromStore, productId]);

  const handleAddToCart = async () => {
    // TODO: Quantity need to be Dynamic
    await fetchAddToCart({product: product._id}).then(res => {
      if(res?.ok) {
        console.log(res)
        toast.success(res.message)
        
        // TODO: Mention Quantity
        dispatch(addToCart({item:product}))
      } else {
        console.log(res)
      }
    }).catch(err => console.log("Error" + err.message))
  }

  return <>
    {
      loading ? <div>Loading</div> : <div className="min-h-[calc(100vh-74px)] flex items-center justify-center  px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header with Product Name and Brand */}
          <div className="p-8 bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
            <p className="text-lg">{product.brand} - {product.category}</p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-xl shadow-md">
                <img
                  src={product.images[selectedImage]?.path || 'placeholder-image-url'}
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
                    className={`w-full h-24 object-cover rounded-lg cursor-pointer transition-opacity duration-300 ${selectedImage === index ? 'opacity-100 border-2 border-indigo-500' : 'opacity-70 hover:opacity-100'}`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Description</h2>
                <p className="text-gray-600">{product.description}</p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">Price</h2>
                  <p className="text-3xl font-bold text-indigo-600">₹{product.price}</p>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">Stock</h2>
                  <p className="text-xl text-gray-600">{product.stock} available</p>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Rating</h2>
                <p className="text-xl text-yellow-600">
                  {averageRating} ★ ({product.reviewCount} reviews)
                </p>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <p>Created: {formatDate(product.createdAt)}</p>
                <p>Updated: {formatDate(product.updatedAt)}</p>
              </div>
              <button
                onClick={handleAddToCart}
                className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                Add to Cart
              </button>
            </div>
          </div>

          {/* Reviews Section */}
          {product.ratings && product.ratings.length > 0 && (
            <div className="p-8 border-t border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reviews</h2>
              <div className="space-y-4">
                {product.ratings.map((review, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg shadow">
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">{review.user || 'Anonymous'}</span>
                      <span className="text-yellow-600">{review.rating} ★</span>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    }
  </>
};

export default Product;

