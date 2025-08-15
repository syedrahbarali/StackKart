import { useEffect, useState } from 'react';
import { fetchAllOrders, updateOrderStatus } from '../../services/adminService';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  useEffect(() => {
    fetchAllOrders().then(res => {
      console.log(res);
      setOrders(res.orders || []);
      setLoading(false);
    });
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800 border-green-300 focus:ring-green-500';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300 focus:ring-yellow-500';
      case 'Failed':
        return 'bg-red-100 text-red-800 border-red-300 focus:ring-red-500';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800 border-blue-300 focus:ring-blue-500';
      case 'Delivered':
        return 'bg-purple-100 text-purple-800 border-purple-300 focus:ring-purple-500';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300 focus:ring-gray-500';
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingOrderId(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
      // Update local state
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, paymentStatus: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update order status. Please try again.');
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const statusOptions = ['Pending', 'Paid', 'Failed', 'Shipped', 'Delivered'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-800 mb-8 text-center animate-fade-in">All Orders</h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500 border-opacity-50"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center text-lg text-gray-600 animate-fade-in">No orders found.</div>
        ) : (
          <div className="overflow-hidden rounded-2xl shadow-xl bg-white animate-fade-in">
            <div className="overflow-x-auto max-w-full">
              <table className="min-w-full divide-y divide-gray-200 table-auto">
                <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                  <tr>
                    <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider w-1/5">Order ID</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider w-1/5">User</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider w-1/5">Status</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider w-1/5">Total</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider w-1/5">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map((order, index) => (
                    <tr
                      key={order._id}
                      className="hover:bg-indigo-50 transition-all duration-300 ease-in-out transform hover:scale-[1.01] hover:shadow-md"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 truncate">{order._id}</td>
                      <td className="py-4 px-6 text-sm text-gray-700 truncate">{order.userId || 'N/A'}</td>
                      <td className="py-4 px-6">
                        {updatingOrderId === order._id ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-indigo-500"></div>
                        ) : (
                          <select
                            value={order.paymentStatus}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.paymentStatus)} cursor-pointer transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2`}
                          >
                            {statusOptions.map(option => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        )}
                      </td>
                      <td className="py-4 px-6 text-sm font-semibold text-indigo-600">₹{order.totalAmount.toLocaleString()}</td>
                      <td className="py-4 px-6 text-sm text-gray-500">{new Date(order.orderedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default OrderList;