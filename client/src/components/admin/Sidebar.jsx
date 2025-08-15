import { FaBox, FaShoppingCart, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const navItems = [
        { name: "Products", link: "/admin/products", icon: <FaBox size={20} /> },
        { name: "Orders", link: "/admin/orders", icon: <FaShoppingCart size={20} /> },
        { name: "Users", link: "/admin/users", icon: <FaUsers size={20} /> },
    ];
    return (
        <div
            className={`fixed left-0 top-16 bg-gradient-to-b from-indigo-700 to-purple-800 text-white transition-all duration-300 ease-in-out z-30
                ${isSidebarOpen ? 'w-64 p-6' : 'w-20 p-3'}
            `}
            style={{ height: 'calc(100vh - 4rem)', overflowY: 'auto' }}
        >
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-white mb-6 focus:outline-none transition-transform duration-300 hover:scale-110 flex items-center justify-center w-10 h-10 rounded-full bg-indigo-800/40"
                aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={isSidebarOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                    />
                </svg>
            </button>

            <nav className="flex flex-col gap-2 mt-4">
                {navItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.link}
                        className={`flex items-center rounded-lg hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105 overflow-hidden
                            ${isSidebarOpen ? 'gap-3 px-3 py-2' : 'justify-center p-3'}
                        `}
                    >
                        {/* Icon */}
                        <span className={`text-lg flex-shrink-0 flex items-center justify-center ${!isSidebarOpen ? 'mx-auto' : ''}`}>{item.icon}</span>

                        {/* Text with animation */}
                        <span
                            className={`transition-all duration-300 ease-in-out whitespace-nowrap ${isSidebarOpen
                                ? "opacity-100 translate-x-0 w-auto ml-2"
                                : "opacity-0 -translate-x-5 w-0 ml-0"
                                }`}
                        >
                            {item.name}
                        </span>
                    </Link>
                ))}
            </nav>
        </div>
    )
}

export default Sidebar
