import { Link } from "react-router-dom";
import { useState } from "react";
import Container from "./Container";
import Logo from "./Logo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
      path: "services/",
    },
  ];

  return (
    <header className="fixed w-full top-0 z-50 bg-white shadow-lg">
      <Container className="flex items-center justify-between py-4 px-6">
        <Logo className="text-2xl font-extrabold text-indigo-600 hover:text-indigo-700 transition-colors duration-300" />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center">
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
        <div className="hidden md:flex items-center gap-4">
          <Link to={`/login`} className="py-2 px-4 border border-indigo-600 text-indigo-600 rounded-lg bg-transparent hover:bg-indigo-600 hover:text-white transition-all duration-300 ease-in-out hover:shadow-md">
            Log in
          </Link>
          <Link to={`/signup`} className="py-2 px-4 border border-indigo-600 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 ease-in-out hover:shadow-md">
            Sign up
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-indigo-600 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </Container>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg transition-all duration-300 ease-in-out">
          <Container className="px-6 py-4">
            <ul className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <li key={index} className="font-semibold text-gray-700">
                  <Link
                    to={`${item.path}`}
                    className="block py-2 transition-all duration-300 ease-in-out hover:text-indigo-600"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <button className="w-full py-2 px-4 border border-indigo-600 text-indigo-600 rounded-lg bg-transparent hover:bg-indigo-600 hover:text-white transition-all duration-300 ease-in-out hover:shadow-md">
                  Log in
                </button>
              </li>
              <li>
                <button className="w-full py-2 px-4 border border-indigo-600 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 ease-in-out hover:shadow-md">
                  Sign up
                </button>
              </li>
            </ul>
          </Container>
        </div>
      )}
    </header>
  );
};

export default Navbar;