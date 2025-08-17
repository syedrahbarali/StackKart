import { Link } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../services/cartService";
import toast from "react-hot-toast";
import { fetchAddToCart } from "../services/productServices";
import { updateProductItemQuantity, removeFromCart } from "../store/slices/cart.slice";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart) || [];
  console.log(cart);

  // Total price calculate
  const totalPrice = cart.reduce((total, item) => {
    return total + item?.product?.price * item?.quantity;
  }, 0);

  const totalItems = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const handleQuantityChange = async (itemId, change) => {
    await fetchAddToCart(itemId, change)
      .then((res) => {
        dispatch(updateProductItemQuantity({ itemId, quantityChange: change }));
        toast.success(res.message);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleRemoveItem = async (itemId) => {
    try {
      dispatch(removeFromCart(itemId)); // ✅ immediate update in Redux
      const response = await deleteFromCart(itemId);

      if (!response.ok) {
        toast.error("Failed to remove item");
      } else {
        toast.success("Item removed from cart");
      }
    } catch (error) {
      toast.error("Failed to remove item");
      console.error("Error removing item:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Cart Items */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-4">
              Your Shopping Cart ({totalItems} items)
            </h2>

            {cart.length === 0 ? (
              <div className="text-center py-16">
                <div className="mx-auto w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
                  <svg
                    className="w-12 h-12 text-indigo-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                  Your Cart is Empty
                </h3>
                <p className="text-gray-600 mb-6">
                  Looks like you haven't added any products to your cart yet.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product._id}
                  className="flex items-center gap-4 border-b pb-4 hover:shadow-md transition-all duration-200 rounded-lg p-2"
                >
                  <img
                    src={
                      item?.product?.images[0]?.path ||
                      "https://via.placeholder.com/150"
                    }
                    alt={item.product.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-medium text-lg text-gray-800">
                      {item?.product?.name}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      ₹{item?.product?.price}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.product._id, -1)
                        }
                        disabled={item.quantity <= 1}
                        className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        -
                      </button>
                      <span className="px-2">{item?.quantity}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.product._id, 1)
                        }
                        disabled={item.quantity >= item?.product?.stock}
                        className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <p className="font-semibold text-gray-800">
                      ₹
                      {(item.product.price * item.quantity).toLocaleString()}
                    </p>
                    <button
                      onClick={() => handleRemoveItem(item.product._id)}
                      className="mt-2 text-red-500 hover:text-red-700 transition p-1 rounded hover:bg-red-50"
                      title="Remove item"
                    >
                      <IoTrashOutline size={20} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right - Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-6 h-fit">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-4">
              Order Summary
            </h2>

            {cart.length > 0 && (
              <>
                <div className="flex justify-between mt-4 text-gray-600">
                  <span>Items ({totalItems})</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between mt-2 text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="border-t mt-4 pt-4 flex justify-between text-lg font-semibold text-gray-800">
                  <span>Total</span>
                  <span>₹{totalPrice}</span>
                </div>
                <button className="mt-6 w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">
                  Proceed to Checkout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
