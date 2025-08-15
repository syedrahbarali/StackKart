import React from 'react'
import { useNavigate } from 'react-router-dom';

const StatsCards = ({dashboardData}) => {
    const navigate = useNavigate();
    const handleCardClick = (path) => {
        navigate(path);
    };
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div
                className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-6 rounded-lg shadow-md hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() => handleCardClick('/admin/products')}
                tabIndex={0}
                role="button"
                aria-label="View Products"
            >
                <h3 className="text-lg font-semibold">Total Products</h3>
                <p className="text-2xl">{dashboardData.totalProducts}</p>
            </div>
            <div
                className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 rounded-lg shadow-md hover:bg-purple-600 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() => handleCardClick('/admin/orders')}
                tabIndex={0}
                role="button"
                aria-label="View Orders"
            >
                <h3 className="text-lg font-semibold">Total Orders</h3>
                <p className="text-2xl">{dashboardData.totalOrders}</p>
            </div>
            <div
                className="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-6 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() => handleCardClick('/admin/users')}
                tabIndex={0}
                role="button"
                aria-label="View Users"
            >
                <h3 className="text-lg font-semibold">Total Users</h3>
                <p className="text-2xl">{dashboardData.totalUsers}</p>
            </div>
            <div
                className="bg-gradient-to-r from-teal-500 to-green-500 text-white p-6 rounded-lg shadow-md hover:bg-teal-600 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() => handleCardClick('/admin/orders')}
                tabIndex={0}
                role="button"
                aria-label="View Sales"
            >
                <h3 className="text-lg font-semibold">Total Sales (₹)</h3>
                <p className="text-2xl">₹{dashboardData.totalSales}</p>
            </div>
        </div>
    )
}

export default StatsCards
