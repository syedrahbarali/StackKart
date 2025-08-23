import { Link } from "react-router-dom";
import Container from "./Container";
import Logo from "./Logo";
import { useSelector } from "react-redux";

import CartPopover from "./CartPopover";

const Navbar = () => {
  const user = useSelector((state) => state.auth);
  const navItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Categories",
      path: "/categories",
    },
    {
      name: "Services",
      path: "/services",
    },
  ];

  return (
    <header className="fixed w-full top-0 z-50 bg-white shadow-lg">
      <Container className="flex items-center justify-between py-4 px-6">
        <Logo className="flex-1" />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center justify-center flex-1">
          <ul className="flex items-center space-x-8">
            {navItems.map((item, index) => (
              <li key={index} className="relative font-semibold text-gray-700">
                <Link
                  to={`${item.path}`}
                  className="px-2 py-1 transition-all duration-300 ease-in-out hover:text-indigo-600 hover:scale-105 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Auth */}
        {!user.status ? (
          <div className="hidden md:flex items-center justify-end gap-4 flex-1">
            {/* Login Button */}
            <Link
              to="/login"
              className="relative py-2 px-6 border border-indigo-600 text-indigo-600 rounded-xl 
               bg-transparent font-medium
               hover:bg-indigo-50 hover:shadow-lg hover:scale-105 
               transition-all duration-300 ease-in-out"
            >
              Log in
            </Link>

            {/* Signup Button */}
            <Link
              to="/signup"
              className="py-2 px-6 rounded-xl font-semibold 
               bg-gradient-to-r from-indigo-600 to-indigo-500 text-white 
               shadow-md hover:shadow-lg hover:scale-105
               transition-all duration-300 ease-in-out"
            >
              Sign up
            </Link>
          </div>

        ) : (
          <CartPopover navItems={navItems} />
        )}
      </Container>
    </header>
  );
};

export default Navbar;
