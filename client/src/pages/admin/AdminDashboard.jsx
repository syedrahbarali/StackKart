import { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Link } from 'react-router-dom';
import { FaBox, FaShoppingCart, FaUsers } from "react-icons/fa";
import { fetchDashboardData } from '../../services/adminService';
import { FourSquare } from 'react-loading-indicators';
import Loading from '../../components/Loading';
import Sidebar from './Sidebar';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
    
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [dashboardData, setDashboardData] = useState({});
    const [loading, setLoading] = useState(true);

    // Chart options
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top', labels: { color: '#1f2937' } },
            title: { display: true, text: '', color: '#1f2937' },
        },
    };

    useEffect(() => {
        (async () => {
            setLoading(true)
            fetchDashboardData().then(res => setDashboardData(res)).finally(() => setLoading(false))
        })()
    }, []);

    return (
        <>
            {
                loading ? <Loading /> : <div className="min-h-screen flex bg-gradient-to-br from-indigo-100 to-purple-100">
                    {/* Sidebar */}
                    <Sidebar {...{ isSidebarOpen, setIsSidebarOpen }} />

                    {/* Main Content */}
                    <div className={`flex-1 ml-0 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
                        <div className="p-8">
                            {/* Header */}
                            <h1 className="text-3xl font-bold text-indigo-800 mb-6">Admin Dashboard</h1>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-6 rounded-lg shadow-md hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105">
                                    <h3 className="text-lg font-semibold">Total Products</h3>
                                    <p className="text-2xl">{dashboardData.totalProducts}</p>
                                </div>
                                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 rounded-lg shadow-md hover:bg-purple-600 transition-all duration-300 transform hover:scale-105">
                                    <h3 className="text-lg font-semibold">Total Orders</h3>
                                    <p className="text-2xl">{dashboardData.totalOrders}</p>
                                </div>
                                <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-6 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 transform hover:scale-105">
                                    <h3 className="text-lg font-semibold">Total Users</h3>
                                    <p className="text-2xl">{dashboardData.totalUsers}</p>
                                </div>
                                <div className="bg-gradient-to-r from-teal-500 to-green-500 text-white p-6 rounded-lg shadow-md hover:bg-teal-600 transition-all duration-300 transform hover:scale-105">
                                    <h3 className="text-lg font-semibold">Total Sales (₹)</h3>
                                    <p className="text-2xl">₹{dashboardData.totalSales}</p>
                                </div>
                            </div>

                            {/* Charts Section */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                                <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Sales Overview</h2>
                                    <Bar data={dashboardData.salesData} options={{ ...chartOptions, plugins: { title: { text: 'Monthly Sales' } } }} />
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Category Distribution</h2>
                                    <Doughnut data={dashboardData.categoryDistribution} options={{ ...chartOptions, plugins: { title: { text: 'Product Categories' } } }} />
                                </div>
                            </div>

                            {/* Additional Charts */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Order Status Distribution */}
                                <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Status Distribution</h2>
                                    <Doughnut
                                        data={dashboardData.orderStatusData || {
                                            labels: ['Delivered', 'Pending', 'Cancelled', 'Processing'],
                                            datasets: [{
                                                data: [120, 45, 10, 25],
                                                backgroundColor: ['#34d399', '#fbbf24', '#f87171', '#60a5fa'],
                                            }],
                                        }}
                                        options={{ ...chartOptions, plugins: { title: { text: 'Order Status' } } }}
                                    />
                                </div>

                                {/* Top Selling Products */}
                                <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Selling Products</h2>
                                    <Bar
                                        data={dashboardData.topProductsData || {
                                            labels: ['Product A', 'Product B', 'Product C', 'Product D'],
                                            datasets: [{
                                                label: 'Units Sold',
                                                data: [150, 120, 90, 60],
                                                backgroundColor: '#6366f1',
                                            }],
                                        }}
                                        options={{ ...chartOptions, plugins: { title: { text: 'Top Products' } } }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default AdminDashboard;