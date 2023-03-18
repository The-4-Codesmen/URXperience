import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { isAuth } from "../helpers/auth";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Logo from "../img/URX-logo.svg";
import Select from "react-select";
const Register = () => {
  const [selected, setSelected] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pass1: "",
    pass2: "",
  });
  const options = [
    { value: "Engineering", label: "Engineering" },
    { value: "Nursing", label: "Nursing" },
    { value: "Science", label: "Science" },
    { value: "Arts", label: "Arts" },
    { value: "Kineseology", label: "Kineseology" },
    { value: "Education", label: "Education" },
    { value: "Business", label: "Business" },
    { value: "SocialWork", label: "SocialWork" },
  ];
  const navigate = useNavigate();
  const { email, name, pass1, pass2 } = formData;
  //Handle inputs
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleDropdown = (select) => {
    setSelected(select);
  };
  let stringOfSelectedFaculty = JSON.stringify(selected);
  let faculty = JSON.parse(stringOfSelectedFaculty).label;
  //send data to backend
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && pass1 && faculty) {
      if (pass1 === pass2) {
        axios
          .post(`${process.env.REACT_APP_SERVER}api/register`, {
            name,
            email,
            password: pass1,
            faculty,
          })
          .then((res) => {
            setFormData({
              ...formData,
              name: "",
              email: "",
              pass1: "",
              pass2: "",
            });
            setSelected("");
            navigate("/confirm");
          })
          .catch((err) => {
            toast.error(err.response.data.error);
          });
      } else {
        toast.error("Passwords don't match");
      }
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
                placeholder="Name"
                onChange={handleChange("name")}
                value={name}
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-md focus:outline-none focus:border-gray-400 focus:bg-white"
              />
              <input
                type="text"
                placeholder="Email"
                onChange={handleChange("email")}
                value={email}
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-md focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
              />
              <div className="flex text-black">
                <div className="">
                  <i className="fa fa-info-circle" aria-hidden="true"></i>
                </div>
                <div>
                  <i className="ml-1">Only uregina emails are allowed</i>
                </div>
              </div>
              <input
                type="password"
                placeholder="Password"
                onChange={handleChange("pass1")}
                value={pass1}
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-md focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
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
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-md focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
              />
              <Select
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-md focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                placeholder="Select Faculty"
                options={options}
                closeMenuOnSelect={true}
                hideSelectedOptions={false}
                onChange={handleDropdown}
                allowSelectAll={false}
                value={selected}
              />
              <button
                type="submit"
                className="mt-5 tracking-wide font-semibold bg-green-800 text-gray-100 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              >
                Register
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
    </div>
  );
};

export default Register;
