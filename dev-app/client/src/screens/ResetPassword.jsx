import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Logo from "../img/URX-logo.svg";
import { Navigate, useParams, useNavigate } from "react-router-dom";
const ResetPassword = () => {
  const [formData, setFormData] = useState({
    pass1: "",
    pass2: "",
  });
  const { pass1, pass2 } = formData;
  const navigate = useNavigate();
  //get token from params e.g /active/token
  //then decode this token and get the name
  const { token } = useParams();
  useEffect(() => {
    if (token) {
      setFormData({ ...formData });
    }
  }, [token]);

  //Handle inputs
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (pass1 === pass2 && pass1 && pass2) {
      axios
        .put(`${process.env.REACT_APP_SERVER}api/resetpassword`, {
          newPassword: pass1,
          resetPasswordLink: token,
        })
        .then((res) => {
          setFormData({ ...formData, pass1: "", pass2: "" });
          toast.success(res.data.message);
          setTimeout(() => {
            navigate("/login");
          }, 4000);
        })
        .catch((err) => {
          toast.error(err.response.data.error);
        });
    } else {
      toast.error(`Passwords does not match`);
    }
  };
  return (
    <div className="min-h-screen bg gray-100 text-gray-900 flex justify-center">
      <ToastContainer />
      <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 mt-20">
          <div className="mt-2 flex flex-col items-center">
            <img className="h-48 w-48 " src={Logo} alt="logo" />
          </div>
          <form
            className="w-full flex-1 mt-8 text-indigo-500"
            onSubmit={handleSubmit}
          >
            <div className="mx-auto max-w-xs relative">
              <input
                type="password"
                placeholder="New Password"
                onChange={handleChange("pass1")}
                value={pass1}
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
              />
              <div className="flex text-black">
                <div className="">
                  <i className="fa fa-info-circle" aria-hidden="true"></i>
                </div>
                <div>
                  <i className="ml-1">Password must be at least 8 chars long</i>
                </div>
              </div>
              <input
                type="password"
                placeholder="Confirm Password"
                onChange={handleChange("pass2")}
                value={pass2}
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
              />
              <button
                type="submit"
                className="mt-5 tracking-wide font-semibold bg-green-800 text-white w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              >
                <i className="fas fa-sign-in-alt  w-6  -ml-2" />
                <span className="ml-3">Submit</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
