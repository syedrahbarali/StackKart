import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const OrderDetails = () => {
    const params = useParams(); // Get orderId from URL params
    const orderId = params.orderId;
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const orderState = useSelector((state) => state.order);

    useEffect(() => {
        orderState.forEach((order) => {
            if (order._id === orderId) {
                setOrder(order);
            }
        })
        setLoading(false);

    }, [orderState, orderId]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'succeeded':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'failed':
                return 'bg-red-100 text-red-800';
            case 'Shipped':
                return 'bg-blue-100 text-blue-800';
            case 'Delivered':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500 border-opacity-50"></div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                <div className="text-center text-lg text-gray-600">Order not found.</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-500 hover:shadow-2xl animate-fade-in">
                <h1 className="text-3xl font-bold text-indigo-800 mb-6 text-center">Order Details: {order._id}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className='font-bold'>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Information</h2>
                        <p className="text-sm text-gray-600 mb-2"><span className="font-medium">Date:</span> {new Date(order.orderedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p className="text-sm text-gray-600 mb-2"><span className="font-medium">Status:</span> <span className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.paymentStatus)}`}>{order.paymentStatus}</span></p>
                        <p className="text-sm text-gray-600 mb-2"><span className="font-medium">Total Amount:</span> ₹{order.totalAmount.toLocaleString()}</p>
                        <p className="text-sm text-gray-600 mb-2"><span className="font-medium">Payment Method:</span> {order.paymentMethod || 'N/A'}</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Items</h2>
                        <div className="space-y-4">
                            {order.items.map(({productId, quantity, price}, index) => (
                                <div key={index} className="flex items-center space-x-4 border-b pb-4 last:border-b-0">
                                    <img
                                        src={productId.images[0].path || 'placeholder-image-url'}
                                        alt={productId.name}
                                        className="w-16 h-16 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-110"
                                    />
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-800">{productId.name}</h3>
                                        <p className="text-sm text-gray-600">Quantity: {quantity}</p>
                                        <p className="text-sm font-semibold text-indigo-600">₹{price.toLocaleString()} each</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Custom CSS for animations */}
            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
        </div>
    );
};

export default OrderDetails;