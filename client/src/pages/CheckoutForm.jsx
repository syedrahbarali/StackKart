import {
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import toast from "react-hot-toast";
import { createOrder, updateOrder } from "../services/orderServices";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { createPaymentIntent, getPaymentIntent } from "../services/paymentService";
import { clearCart } from "../services/cartService";
import { clearUserCart } from "../store/slices/cart.slice";


const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const { address, totalAmount } = useLocation().state;

    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (elements == null) {
            setIsLoading(false);
            return;
        }

        // Trigger form validation
        const { error: submitError } = await elements.submit();
        if (submitError) {
            setErrorMessage(submitError.message);
            setIsLoading(false);
            return;
        }

        // Creating paymentIntent and obtaining client_secret from server endpoint
        const amountInPaise = Math.round(totalAmount * 100);

        const { client_secret: clientSecret } = await createPaymentIntent(amountInPaise);
        console.log("ClientSecret: ", clientSecret);

        // Creating Order
        const items = cart.map(item => ({
            productId: item.product._id,
            quantity: item.quantity,
            price: item.product.price
        }))

        const { _id: orderId } = await createOrder(items, address, clientSecret, totalAmount).then(res => {
            return res.newOrder
        }).catch(err => {
            toast.error(err.message);
            setIsLoading(false);
            return
        });

        console.log("Order: ", orderId);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `${import.meta.env.VITE_CLIENT_BASE_URL}/payment/success`,
            },
            redirect: "if_required",
        });

        if (error) {
            setErrorMessage(error.message);
            return;
        } else {
            await getPaymentIntent(paymentIntent.id).then(async paymentInfo => {
                await updateOrder({
                    orderId,
                    paymentStatus: paymentInfo.status,
                    paymentMethod: paymentInfo.paymentMethod.type,
                    stripeChargeId: paymentInfo.latest_charge
                }).catch(err => {
                    toast.error(err.message);
                });

                await clearCart().then(res => {
                    if (res?.ok) {
                        dispatch(clearUserCart())
                        toast.success("Order Created");
                        setTimeout(() => {
                            navigate("/payment/success", { state: { paymentIntentId: paymentIntent.id } });
                        }, 1500);
                    }
                })
            }).catch(err => {
                toast.error(err.message);
            });
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Secure Checkout</h2>
                <div className="mb-6 text-center">
                    <p className="text-lg font-semibold text-gray-700">Total Amount: ₹{totalAmount.toLocaleString()}</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
                        <PaymentElement />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading || !stripe || !elements}
                        className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-md hover:bg-indigo-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Processing...' : 'Pay Now'}
                    </button>
                    {errorMessage && toast.error(errorMessage)}
                </form>
            </div>
        </div>
    );
};

export default CheckoutForm;