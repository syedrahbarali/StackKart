import { Link, useNavigate } from "react-router-dom";
import LabelInput from "../components/LabelInput";
import { createAccount } from "../services/authServices";
import { useRef } from "react";
import toast from "react-hot-toast";

const Signup = () => {

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const phone = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    await createAccount(name.current.value,email.current.value,password.current.value,phone.current.value).then((res) => {
      if(res.ok) {
        toast.success(res.message);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        toast.error(res.message);
      }
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
          Create Account
        </h2>
        <form onSubmit={handleSubmit}>
          <LabelInput
            label="Name"
            type="text"
            ref={name}
            placeholder="Enter your full name"
            className="w-full mb-6 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition duration-200"
          />
          <LabelInput
            label="Email"
            type="email"
            ref={email}
            placeholder="Enter your email"
            className="w-full mb-6 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition duration-200"
          />
          <LabelInput
            label="Password"
            type="password"
            ref={password}
            placeholder="Enter your password"
            className="w-full mb-6 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition duration-200"
          />
          <LabelInput
            label="Phone"
            type="tel"
            ref={phone}
            placeholder="Enter your phone number"
            className="w-full mb-6 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition duration-200"
          />
          <LabelInput
            type="submit"
            value="Sign Up"
            className="w-full cursor-pointer bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-3 rounded-lg hover:from-purple-600 hover:to-indigo-600 transition duration-300 shadow-md"
          />
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
