import React from 'react'
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
const ChartSection = ({ dashboardData }) => {
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top', labels: { color: '#1f2937' } },
            title: { display: true, text: '', color: '#1f2937' },
        },
    };
    return (
        <>
            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8 justify-items-center">
                <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg max-w-md w-full mx-auto flex flex-col items-center">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Sales Overview</h2>
                    <div className="w-full flex justify-center">
                        <Bar
                            data={dashboardData.salesData && dashboardData.salesData.labels ? dashboardData.salesData : {
                                labels: [],
                                datasets: [{ label: 'Sales', data: [], backgroundColor: '#6366f1' }]
                            }}
                            options={{ ...chartOptions, plugins: { title: { text: 'Monthly Sales' } } }}
                            height={260}
                            width={400}
                        />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg max-w-md w-full mx-auto flex flex-col items-center">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Category Distribution</h2>
                    <div className="w-full flex justify-center">
                        <Doughnut
                            data={dashboardData.categoryDistribution && dashboardData.categoryDistribution.labels ? dashboardData.categoryDistribution : {
                                labels: [],
                                datasets: [{ data: [], backgroundColor: [] }]
                            }}
                            options={{ ...chartOptions, plugins: { title: { text: 'Product Categories' } } }}
                            height={260}
                            width={400}
                        />
                    </div>
                </div>
            </div>

            {/* Additional Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-items-center">
                <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg max-w-md w-full mx-auto flex flex-col items-center">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Status Distribution</h2>
                    <div className="w-full flex justify-center">
                        <Doughnut
                            data={dashboardData.orderStatusDistribution && dashboardData.orderStatusDistribution.labels ? dashboardData.orderStatusDistribution : {
                                labels: ['Delivered', 'Pending', 'Cancelled', 'Processing'],
                                datasets: [{ data: [0, 0, 0, 0], backgroundColor: ['#34d399', '#fbbf24', '#f87171', '#60a5fa'] }]
                            }}
                            options={{ ...chartOptions, plugins: { title: { text: 'Order Status' } } }}
                            height={260}
                            width={400}
                        />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg max-w-md w-full mx-auto flex flex-col items-center">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Selling Products</h2>
                    <div className="w-full flex justify-center">
                        <Bar
                            data={dashboardData.topSellingProducts && dashboardData.topSellingProducts.labels ? dashboardData.topSellingProducts : {
                                labels: [],
                                datasets: [{ label: 'Units Sold', data: [], backgroundColor: '#6366f1' }]
                            }}
                            options={{ ...chartOptions, plugins: { title: { text: 'Top Products' } } }}
                            height={260}
                            width={400}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChartSection
