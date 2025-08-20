import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
// import { clearCart } from "../services/cartService";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";

const PaymentSuccess = () => {
  const location = useLocation();
  const { paymentIntentId } = location.state || {};
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const cartItems = useSelector((state) => state.cart);


  useEffect(() => {

    // remove items from cart and also from DB
    const fetchPayment = async () => {
      console.log("paymentIntentId: ", paymentIntentId)
      if (!paymentIntentId) return;

      try {
        setLoading(true);

        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/v1/payment/get-payment-intent/${paymentIntentId}`
        );
        const data = await res.json();
        setPaymentInfo(data);

        // Clearing Cart
        const items = cartItems.map(item => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.price
        }))

        console.log("Items: ", items) // expected an array of object
        // await clearCart();

      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
  }, [paymentIntentId, cartItems]);

  return (
    <>
      {
        loading ? <Loading /> : <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-green-50 to-green-100">
          <CheckCircle className="text-green-600 w-20 h-20 animate-bounce" />
          <h1 className="text-3xl font-bold mt-4">Payment Successful 🎉</h1>

          {paymentInfo ? (
            <div className="mt-6 bg-white shadow-lg rounded-2xl p-6 w-[400px]">
              <h2 className="text-lg font-semibold mb-3">Payment Details</h2>
              <p><strong>ID:</strong> {paymentInfo.id}</p>
              <p><strong>Amount:</strong> ₹{paymentInfo.amount / 100}</p>
              <p><strong>Status:</strong> {paymentInfo.status}</p>
              <p><strong>Date:</strong> {new Date(paymentInfo.created * 1000).toLocaleString()}</p>
            </div>
          ) : (
            <p className="mt-4 text-gray-600">Fetching payment details...</p>
          )}
        </div>
      }
    </>
  );
};

export default PaymentSuccess;
