import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { updateUser, isAuth, getCookie, signout } from "../helpers/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../img/URX-logo.svg";
import Navbar from "./Navbar";
const Private = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pass1: "",
    textChange: "Update",
    role: "",
    pass2: "",
  });
  const [popUp, setPopUp] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    loadProfile();
  }, []);
  const loadProfile = () => {
    const token = getCookie("token");
    if (!getCookie("token")) {
      navigate("/login");
    } else {
      axios
        .get(`${process.env.REACT_APP_SERVER}api/user/${isAuth()._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const { role, name, email } = res.data;
          setFormData({ ...formData, role, name, email });
        })
        .catch((err) => {
          toast.error(`Error to your Information ${err.response.statusText}`);
          if (err.response.status === 401) {
            signout(() => {
              navigate("/login");
            });
          }
        });
    }
  };
  const { name, email, pass1, textChange, role, pass2 } = formData;
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = (e) => {
    const token = getCookie("token");
    e.preventDefault();
    if (name && pass1 && pass2) {
      if (!pass1.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
        toast.error(
          "Password must be minimum eight characters, at least one letter and one number"
        );
        setFormData({
          ...formData,
          pass1: "",
          pass2: "",
        });
      } else if (pass1 != pass2) {
        toast.error("Passwords needs to match");
      } else {
        setFormData({ ...formData, textChange: "Updated" });
        axios
          .put(
            `${process.env.REACT_APP_SERVER}api/user/update`,
            { name, password: pass1, userID: user._id },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            updateUser(res, () => {
              toast.success("Profile Successfully Updated");
              setFormData({
                ...formData,
                pass1: "",
                pass2: "",
                textChange: "Update",
              });
            });
          })
          .catch((err) => {
            toast.error(err.response.data.error);
          });
      }
    } else {
      toast.error("Please fill all required fields");
    }
  };
  function deleteAccount() {
    const token = getCookie("token");
    if (isAuth()._id != null) {
      axios
        .delete(`${process.env.REACT_APP_SERVER}api/delete/`, {
          headers: {
            accessToken: token,
          },
        })
        .then(toast.success(`Account successfully deleted`))
        .then(
          signout(() => {
            navigate("/login");
          })
        );
    } else {
      console.log("something went wrong");
    }
  }
  return (
    <div className="min-h-screen bg gray-100 text-gray-900 flex justify-center">
      <Navbar />
      <ToastContainer />
      <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center items-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 text-center text-black">
          <h1 className="text-2xl xl:text-3xl font-extrabold">Profile Page</h1>
          <div className="mt-2 flex flex-col items-center">
            <img className="h-48 w-48 " src={Logo} alt="logo" />
          </div>
          <form
            className="w-full flex-1 mt-8 text-indigo-500"
            onSubmit={handleSubmit}
          >
            <div className="mx-auto max-w-xs relative">
              <i className="text-black font-bold">
                <i>The only changeable fields are marked with the asterisk</i>
                <i className="text-red-500 font-bold"> *</i> symbol
              </i>
              <input
                disabled
                placeholder="Email"
                value={email}
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
              />
              <div className="flex">
                <input
                  type="text"
                  placeholder="Name"
                  onChange={handleChange("name")}
                  value={name}
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                />
                <label className="text-red-500">*</label>
              </div>
              <div className="flex">
                <input
                  type="password"
                  placeholder=" Change password"
                  onChange={handleChange("pass1")}
                  value={pass1}
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                />
                <label className="text-red-500">*</label>
              </div>
              <div className="flex text-black">
                <div className="">
                  <i className="fa fa-info-circle" aria-hidden="true"></i>
                </div>
                <div>
                  <i className="ml-1">Password must be at least 8 chars long</i>
                </div>
              </div>
              <div className="flex">
                <input
                  type="password"
                  placeholder="Confirm password"
                  onChange={handleChange("pass2")}
                  value={pass2}
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                />
                <label className="text-red-500">*</label>
              </div>
              <button
                type="submit"
                className="mt-5 tracking-wide font-semibold bg-green-800 text-gray-100 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              >
                <i className="fas fa-user-plus fa 1x w-6  -ml-2" />
                <span className="ml-3">{textChange}</span>
              </button>
            </div>
          </form>
          {role === "Admin" ? null : (
            <div className="self-center	">
              <button
                onClick={() => setPopUp(true)}
                className="mt-5 items-center tracking-wide font-semibold bg-red-800 text-gray-100 w-full xl:w-9/12 lg:ml-14 py-4 rounded-lg hover:bg-red-700 transition-all duration-300 ease-in-out flex justify-center"
              >
                <i className="fa fa-trash 1x w-6  -ml-2" />
                <span className="ml-3">Delete Account</span>
              </button>
            </div>
          )}

          {popUp && (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">You sure!?</h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-green-800 hover:text-green-700 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setPopUp(false)}
                      >
                        <i className="fa fa-times 1x w-6  -ml-2" />
                      </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      <p className="my-4 text-left text-slate-500 text-lg leading-relaxed">
                        This action will permanently delete your ACCOUNT!!
                      </p>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-white bg-red-600 hover:bg-red-500 rounded font-bold uppercase px-6 py-2 text-sm "
                        type="button"
                        onClick={() => setPopUp(false)}
                      >
                        cancel
                      </button>
                      <button
                        className="bg-green-800 text-white rounded font-bold uppercase text-sm px-6 py-2 rounded hover:bg-green-700"
                        type="button"
                        onClick={deleteAccount}
                      >
                        Proceed
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-20 fixed inset-0 z-40 bg-black"></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Private;
