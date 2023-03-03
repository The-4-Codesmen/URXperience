import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { authenticate, isAuth } from "../helpers/auth";
import axios from "axios";
import jwt from "jsonwebtoken";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import Logo from "../img/URX-logo.svg";

const Activate = () => {
  const [formData, setFormData] = useState({
    name: "",
    show: true,
  });
  const navigate = useNavigate();
  //get token from params e.g /active/token
  //then decode this token and get the name
  const { token } = useParams();
  useEffect(() => {
    let { name } = jwt.decode(token);
    if (token) {
      setFormData({ ...formData, name });
    }
  }, [token]);

  const { name } = formData;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_SERVER}api/activation`, {
        token,
      })
      .then((res) => {
        setFormData({ ...formData, show: false });
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 4000);
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      {isAuth() ? <Navigate to="/" /> : null}
      <ToastContainer />
      <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Welcome {name}
            </h1>

            <form
              className="w-full flex-1 mt-8 text-indigo-500"
              onSubmit={handleSubmit}
            >
              <div className="mx-auto max-w-xs relative ">
                <button
                  type="submit"
                  className="mt-5 tracking-wide font-semibold bg-green-800 text-gray-100 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <i className="fas fa-user-plus fa 1x w-6  ml-2" />
                  <span className="ml-2 mr-2">Activate your Account</span>
                </button>
              </div>
              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or Login
                </div>
              </div>
              <div className="flex flex-col items-center">
                <a
                  className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3
         bg-green-800 text-white flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:bg-green-700 focus:shadow-sm focus:shadow-outline mt-5"
                  href="/login"
                  target="_self"
                >
                  <i className="fas fa-sign-in-alt fa 1x w-6  -ml-2 text-white" />
                  <span className="ml-4">Login</span>
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className="flex-1 bg-green-800 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${Logo})` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Activate;
