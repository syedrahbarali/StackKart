import { Link, useNavigate } from "react-router-dom";
import LabelInput from "../components/LabelInput";
import { loginUser } from "../services/authServices";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/auth.slice";
import { getCartItems } from "../store/slices/cart.slice";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(email.current.value, password.current.value).then((res) => {
      if (res.ok) {
        console.log(res.user);
        dispatch(login(res.user));

        if(res?.user?.cart?.length > 0) {
          dispatch(getCartItems(res.user.cart))
        }

        toast.success("Welcome " + res?.user?.name);

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit}>
          <LabelInput
            label="Email"
            type="email"
            ref={email}
            placeholder="Enter your email"
            className="w-full mb-6 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-200"
          />
          <LabelInput
            label="Password"
            type="password"
            ref={password}
            placeholder="Enter your password"
            className="w-full mb-6 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-200"
          />
          <LabelInput 
            type="submit" 
            value="Login" 
            className="w-full cursor-pointer bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold py-3 rounded-lg hover:from-indigo-600 hover:to-blue-600 transition duration-300 shadow-md" 
          />

          {/* <button
            type="submit"
            onClick={handleSubmit}
            className="w-full cursor-pointer bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold py-3 rounded-lg hover:from-indigo-600 hover:to-blue-600 transition duration-300 shadow-md"
          >
            Login
          </button> */}
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
