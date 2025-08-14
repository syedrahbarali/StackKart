import { Link } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const Cart = () => {
  // Total price calculate
  const cart = useSelector((state) => state.cart);
  console.log(cart)
  const totalPrice = cart.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left - Cart Items */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-4">
            Your Shopping Cart
          </h2>

          {cart.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">Your cart is empty.</p>
              <Link
                to="/"
                className="text-indigo-600 hover:underline font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 border-b pb-4 hover:shadow-md transition-all duration-200 rounded-lg p-2"
              >
                <img
                  src={`${item.product.images[0].path}`}
                  alt={item.product.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-medium text-lg text-gray-800">
                    {item.product.name}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    ₹{item.product.price.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      
                      disabled={item.quantity <= 1}
                      className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                    >
                      -
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <p className="font-semibold text-gray-800">
                    ₹{(item.product.price * item.quantity).toLocaleString()}
                  </p>
                  <button
                    className="mt-2 text-red-500 hover:text-red-700 transition"
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
          <div className="flex justify-between mt-4 text-gray-600">
            <span>Subtotal</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between mt-2 text-gray-600">
            <span>Shipping</span>
            <span className="text-green-600 font-medium">Free</span>
          </div>
          <div className="border-t mt-4 pt-4 flex justify-between text-lg font-semibold text-gray-800">
            <span>Total</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>
          <button className="mt-6 w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
