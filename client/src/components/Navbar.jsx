import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Container from "./Container";
import Logo from "./Logo";
import { useSelector } from "react-redux";
import { IoCartOutline } from "react-icons/io5";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { logoutUser } from "../services/authServices";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  // const [isOpen, setIsOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Calculate total cart items count
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logoutUser().then((res) => {
      toast.success(res.message);

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    });
  };

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
        <Logo className="" />

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
        {!user.status ? (
          <div className="hidden md:flex items-center gap-4">
            <Link
              to={`/login`}
              className="py-2 px-4 border border-indigo-600 text-indigo-600 rounded-lg bg-transparent hover:bg-indigo-600 hover:text-white transition-all duration-300 ease-in-out hover:shadow-md"
            >
              Log in
            </Link>
            <Link
              to={`/signup`}
              className="py-2 px-4 border border-indigo-600 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 ease-in-out hover:shadow-md"
            >
              Sign up
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-4 sm:gap-3">
              {/* Cart Icon */}
              <Link to="/cart" className="relative flex items-center">
                <IoCartOutline size={22} className="sm:size-[20px]" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {/* Avatar + Menu */}
              <div>
                <Avatar
                  alt={`${user.user?.name[0]}`}
                  src="/static/images/avatar/1.jpg"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  className="cursor-pointer w-10 h-10 sm:w-8 sm:h-8"
                />

                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  slotProps={{
                    list: {
                      "aria-labelledby": "basic-button",
                    },
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <Link to={`/profile/${user.user?._id}`}>Profile</Link>
                  </MenuItem>
                  {/* <MenuItem onClick={handleClose}>
                    <Link to={`/${user.user.isAdmin ? "admin/" : ""}dashboard`}>
                      Dashboard
                    </Link>
                  </MenuItem> */}
                  {
                    user.user.isAdmin ? <MenuItem onClick={handleClose}>
                      <Link to="/admin/dashboard">
                        Dashboard
                      </Link>
                    </MenuItem> : null
                  }
                  <MenuItem onClick={handleClose}>
                    <Button
                      onClick={handleLogout}
                      variant="outlined"
                      color="error"
                    >
                      Log out
                    </Button>
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </>
        )}

        {/* Mobile Hamburger */}
        {/* <div className="flex items-center gap-4 md:hidden">
          {user.status && (
            <Link to="/cart" className="relative">
              <IoCartOutline size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>
          )}
          <button
            className="text-indigo-600 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div> */}
      </Container>

      {/* Mobile Menu */}
      {/* {isOpen && (
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
            </ul>
          </Container>
        </div> */}
      {/* )} */}
    </header>
  );
};

export default Navbar;
