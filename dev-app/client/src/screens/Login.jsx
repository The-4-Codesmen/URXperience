import React, { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { authenticate, isAuth } from "../helpers/auth";
//import axios from 'axios'
import { Navigate, useNavigate } from "react-router-dom";
import Logo from "../img/URX-logo.svg";
import { useLoginUserMutation } from "../services/appApi";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    pass1: "",
  });
  const navigate = useNavigate();
  const [loginUser] = useLoginUserMutation();
  // const { socket } = useContext(AppContext);
  const { email, pass1 } = formData;
  //Handle inputs
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  //send data to backend
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && pass1) {
      loginUser({ email, password: pass1 })
        .then((res) => {
          authenticate(res, () => {
            setFormData({
              ...formData,
              email: "",
              pass1: "",
            });
          });
          // socket.emit('new-user')
          isAuth() && isAuth().role === "admin"
            ? navigate("/admin")
            : navigate("/dashboard");
          toast.success(`Hey ${res.data.user.name}`);
        })
        .catch((err) => {
          toast.error("User with that email does not exist");
          setFormData({
            ...formData,
            email: "",
            pass1: "",
          });
        });
    } else {
      toast.error("Please fill all fields");
    }
  };
  return (
    <div className="min-h-screen bg gray-100 text-gray-900 flex justify-center">
      {isAuth() ? <Navigate to="/" /> : null}
      <ToastContainer />
      <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-2 flex flex-col items-center">
            <img className="h-48 w-48 " src={Logo} alt="logo" />
          </div>
          <form
            className="w-full flex-1 mt-8 text-indigo-500"
            onSubmit={handleSubmit}
          >
            <div className="mx-auto max-w-xs relative">
              <input
                type="text"
                placeholder="Email"
                onChange={handleChange("email")}
                value={email}
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
              />
              <input
                type="password"
                placeholder="Password"
                onChange={handleChange("pass1")}
                value={pass1}
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
              />
              <button
                type="submit"
                className="mt-5 tracking-wide font-semibold bg-green-800 text-gray-100 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              >
                Login
              </button>
              <a
                href="/users/password/forget"
                className="no-underline hover:underline text-green-800 text-md text-right absolute right-0  mt-2"
              >
                Forgot Password?
              </a>
            </div>
            <div className="my-12 border-b text-center">
              <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                Or Register
              </div>
            </div>
            <div className="flex flex-col items-center">
              <a
                className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3
                                bg-green-800 text-white flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:bg-green-700 focus:shadow-sm focus:shadow-outline mt-5"
                href="/register"
                target="_self"
              >
                <i className="fas fa-sign-in-alt fa 1x w-6  -ml-2 text-white" />
                <span className="ml-4">Register</span>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
