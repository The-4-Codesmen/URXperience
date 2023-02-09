import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { updateUser, isAuth, getCookie, signout } from "../helpers/auth";
import Navbar from "./Navbar";
import defaultImage from ".././img/card-top1.jpg";

import "./addcss.css";

const Complaints = () => {
  const [name, setName] = useState();
  const [role, setRole] = useState();
  const retrieveFormattedDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;
    let day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;
    return month + "/" + day + "/" + year;
  };
  const [complainForm, setComplainForm] = useState({
    title: "",
    image: "",
    description: "",
    date: retrieveFormattedDate(),
  });
  const [complaints, setAllComplaints] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const token = getCookie("token");
    if (!getCookie("token")) {
      navigate("/login");
    } else {
      axios
        .get(`http://localhost:5000/api/user/${isAuth()._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setName(res.data.name);
          setRole(res.data.role);
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
  }, []);

  const handleChange = (e) => {
    setComplainForm({ ...complainForm, [e.target.name]: e.target.value });
  };
  const onChange = (e) => {
    setComplainForm({ ...complainForm, image: e.target.files[0] });
  };
  const getAllComplaints = async () => {
    axios
      .get(`http://localhost:5000/api/getcomplaints`)
      .then((res) => {
        setAllComplaints(res.data);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    getAllComplaints();
    const interval = setInterval(() => {
      getAllComplaints();
    }, 3 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", complainForm.image);
    formData.append("name", name);
    formData.append("title", complainForm.title);
    formData.append("description", complainForm.description);
    formData.append("date", complainForm.date);
    if (complainForm.title && complainForm.description) {
      axios
        .post(`http://localhost:5000/api/complaintbox`, formData)
        .then((res) => {
          setComplainForm({
            name: name,
            title: "",
            image: "",
            description: "",
            date: retrieveFormattedDate(),
          });
          toast.success(res.data.message);
        })
        .catch((err) => {
          toast.error(err.res.data.message);
        });
    } else {
      toast.error("Please fill the required fields");
    }
  };
  const handleCompleteComplaint = (postId) => {
    try {
      axios
        .post(`http://localhost:5000/api/deletecomplaints`, { postID: postId })
        .then((res) => {
          toast.success(res.data.msg);
        });
    } catch (error) {
      toast.error("Somethign went Wrong");
    }
  };
  // console.log(file);
  return (
    <div className="min-h-screen text-gray-900 flex justify-center items-center">
      <Navbar />
      <ToastContainer />
      {role === "Admin" ? (
        <div className="mt-16">
          <h1 className="text-2xl xl:text-3xl text-center font-extrabold mt-5 mb-5">
            Complaint Box
          </h1>
          <div
            className="col-span-2 xl:col-span-3 rounded-lg container overflow-y-scroll rounded-lg px-2 font-medium border border-gray-200 shadow-lg mb-5 p-2"
            style={{ height: "800px" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-2">
              {complaints?.map((complaint) => (
                <div className="flex justify-center" key={complaint._id}>
                  <div className="rounded-lg shadow-lg bg-white max-w-sm">
                    {complaint.image != null ? (
                      <img
                        className="rounded-t-lg object-cover img w-full hover:scale-125"
                        src={`/uploads/${complaint.image}`}
                        alt=""
                      />
                    ) : (
                      <img
                        className="rounded-t-lg img"
                        src={defaultImage}
                        alt=""
                      />
                    )}

                    <div className="p-6 ">
                      <h5 className="text-black text-xl font-medium mb-2 underline text-indigo-500">
                        {complaint.title}
                      </h5>
                      <div
                        className="container overflow-y-scroll bg-gray-100 rounded-lg p-2"
                        style={{ height: "130px" }}
                      >
                        <p className="text-black text-base mb-2 overflow-hidden ">
                          {complaint.description}
                        </p>
                      </div>
                      <p className="text-base mt-2 mb-2">
                        <strong className="text-indigo-500">
                          Submitted By:
                        </strong>{" "}
                        <i>{complaint.user}</i>
                      </p>
                      <p className="text-base mb-2">
                        <strong className="text-indigo-500">
                          Submission Date:
                        </strong>{" "}
                        <i>{complaint.createdAt}</i>
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          handleCompleteComplaint(complaint._id);
                        }}
                        className=" inline-block w-full px-6 py-2.5 bg-green-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
                      >
                        Resolve
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-10 p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5 ">
          <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
              <form
                className="w-full flex-1 mt-2 text-indigo-500"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <div className="font-bold text-xl mb-2 text-center">
                  File your Complaint
                </div>
                <div className="flex flex-col">
                  <div>
                    <input
                      type="text"
                      placeholder={name}
                      name="name"
                      disabled
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    />
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Location (e.g Kisik Lounge FL2)"
                      onChange={handleChange}
                      name="title"
                      value={complainForm.title}
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    />
                    <label className="text-red-500">*</label>
                  </div>
                  <div>
                    <input
                      type="file"
                      onChange={onChange}
                      accept="image/png, image/jpeg, image/jpg"
                      name="image"
                      className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    />
                    <label>
                      <i>Please upload an image if applicable</i>
                    </label>
                  </div>
                  <div className="flex">
                    <textarea
                      type="text"
                      placeholder="Detailed Description....."
                      onChange={handleChange}
                      name="description"
                      value={complainForm.description}
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 resize-none h-40 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    />
                    <label className="text-red-500">*</label>
                  </div>
                  <i className="text-red-500 font-bold">
                    Please review your complaint before submitting
                  </i>
                  <div>
                    <button
                      type="submit"
                      className="mt-5 tracking-wide font-semibold bg-green-800 text-gray-100 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div
            className=" col-span-2 xl:col-span-3 rounded-lg container overflow-y-scroll rounded-lg px-2 font-medium border border-gray-200 p-2 shadow-lg"
            style={{ height: "616px" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-2">
              {complaints?.map((complaint) => (
                <div className="flex justify-center " key={complaint._id}>
                  <div className="rounded-lg shadow-lg bg-white max-w-sm ">
                    <div className="h-30  ">
                      {complaint.image != null ? (
                        <img
                          className="rounded-t-lg object-cover w-full img "
                          src={`/uploads/${complaint.image}`}
                          alt=""
                        />
                      ) : (
                        <img
                          className="rounded-t-lg  w-full img"
                          src={defaultImage}
                          alt=""
                        />
                      )}
                    </div>
                    <div className="p-6 ">
                      <h5 className="text-indigo-500 text-xl font-medium mb-2 underline">
                        {complaint.title}
                      </h5>
                      <div
                        className="container overflow-y-scroll bg-gray-100 rounded-lg p-2"
                        style={{ height: "130px" }}
                      >
                        <p className="text-black text-base mb-2 overflow-hidden ">
                          {complaint.description}
                        </p>
                      </div>
                      <p className="text-base mt-2 mb-2">
                        <strong className="text-indigo-500">
                          Submission Date:
                        </strong>{" "}
                        <i>{complaint.createdAt}</i>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Complaints;
