import { useEffect, useState } from 'react';
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

import { fetchDashboardData } from '../../services/adminService';
import Loading from '../../components/Loading';
import Sidebar from '../../components/admin/Sidebar';
import StatsCards from '../../components/admin/StatsCards';
import ChartSection from '../../components/admin/ChartSection';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const AdminDashboard = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [dashboardData, setDashboardData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setLoading(true)
            fetchDashboardData().then(res => { console.log(res); setDashboardData(res) }).finally(() => setLoading(false))
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
                            <StatsCards dashboardData={dashboardData} />
                            {/* Charts Section */}
                            <ChartSection dashboardData={dashboardData} />
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default AdminDashboard;