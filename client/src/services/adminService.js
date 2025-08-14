export const fetchDashboardData = async() => {
    return await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/dashboard-data`, {
        method: "GET",
        credentials: "include",
    }).then(async res => await res.json())
}