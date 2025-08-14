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
            className={`absolute h-full left-0 bg-gradient-to-b from-indigo-700 to-purple-800 text-white p-6 transform transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-20'
                }`}
        >
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-white mb-6 focus:outline-none transition-transform duration-300 hover:scale-110"
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

            <nav>
                {navItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.link}
                        className="flex items-center gap-3 py-2 rounded-lg hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105 overflow-hidden"
                    >
                        {/* Icon */}
                        <span className="text-lg">{item.icon}</span>

                        {/* Text with animation */}
                        <span
                            className={`transition-all duration-300 ease-in-out ${isSidebarOpen
                                ? "opacity-100 translate-x-0 w-auto"
                                : "opacity-0 -translate-x-5 w-0"
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
