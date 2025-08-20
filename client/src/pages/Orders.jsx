import { useEffect, useState } from 'react';
import { getAllOrders } from '../services/orderServices';
import Loading from '../components/Loading';
import { motion } from 'framer-motion';
const MotionLink = motion(Link);
import { getOrders } from '../store/slices/orders.slice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const capitalize = (str) => {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    useEffect(() => {
        getAllOrders().then((res) => {
            dispatch(getOrders(res.orders));
            setOrders(res.orders || []);
            
        }).finally(() => {
            setLoading(false);
        });
    }, [dispatch]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'succeeded':
                return 'bg-green-200 text-green-800 border border-green-400';
            case 'pending':
                return 'bg-yellow-200 text-yellow-800 border border-yellow-400';
            case 'failed':
                return 'bg-red-200 text-red-800 border border-red-400';
            case 'shipped':
                return 'bg-blue-200 text-blue-800 border border-blue-400';
            case 'Delivered':
                return 'bg-purple-200 text-purple-800 border border-purple-400';
            default:
                return 'bg-gray-200 text-gray-800 border border-gray-400';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 sm:p-10">
            <div className="max-w-5xl mx-auto">
                {/* Heading */}
                <motion.h1
                    className="text-4xl sm:text-5xl font-extrabold text-indigo-900 mb-10 text-center"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    My Orders
                </motion.h1>

                {/* Loading */}
                {loading ? (
                    <Loading />
                ) : orders.length === 0 ? (
                    <motion.div
                        className="text-center text-lg text-gray-600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        You have no orders yet.
                    </motion.div>
                ) : (
                    <div className="space-y-8">
                        {orders.map((order, index) => (
                            <motion.div
                                key={order._id}
                                className="relative rounded-2xl p-6 bg-white/80 backdrop-blur-md shadow-lg border border-indigo-100 hover:shadow-2xl transition-all"
                                style={{ perspective: '1000px' }}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2 }}
                            >
                                {/* Order Header */}
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-800">
                                            Order #{order._id.slice(-6)}
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            {new Date(order.orderedAt).toLocaleDateString('en-IN', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3 mt-3 md:mt-0">
                                        <span
                                            className={`px-4 py-1.5 rounded-full text-sm font-medium shadow-sm ${getStatusColor(
                                                order.paymentStatus
                                            )}`}
                                        >
                                            {capitalize(order.paymentStatus)}
                                        </span>
                                        <p className="text-xl font-bold text-indigo-600">
                                            ₹{order.totalAmount.toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                {/* Items */}
                                <div className="space-y-4">
                                    {order.items.map(({ productId, quantity, price }, i) => (
                                        <motion.div
                                            key={i}
                                            className="flex items-center gap-4 border-t pt-4"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.15 + i * 0.1 }}
                                        >
                                            <motion.img
                                                src={
                                                    productId.images?.[0]?.path ||
                                                    'https://via.placeholder.com/150'
                                                }
                                                alt={productId.name}
                                                className="w-20 h-20 object-cover rounded-xl shadow-md"
                                                whileHover={{ scale: 1.1, rotate: 2 }}
                                            />
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-800">
                                                    {productId.name}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    Quantity: {quantity}
                                                </p>
                                                <p className="text-sm font-bold text-indigo-600">
                                                    ₹{price.toLocaleString()} each
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Button */}
                                <div className="mt-6 text-right">
                                    <MotionLink
                                        to={`/orders/${order._id}`} // yaha apna route daal do
                                        className="inline-block px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all"
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        View Details
                                    </MotionLink>
                                </div>

                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
