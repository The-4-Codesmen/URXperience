import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import { Navigate } from "react-router-dom";

import axios from "axios";
import Navbar from "../Navbar";
import moment from "moment";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { purple, red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, isAuth, getCookie, signout } from "../../helpers/auth";

function PostEvent() {
  const navigate = useNavigate();
  useEffect(() => {
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

  const [allEvents, setAllEvents] = useState([]);

  const { user } = useSelector((state) => state.user);

  const author = user._id;
  const role = user.role;
  const getAllEvents = async () => {
    const userId = user._id;

    axios
      .post(`${process.env.REACT_APP_SERVER}api/eventfindbyid`, { userId })
      .then((res) => {
        setAllEvents(res.data);
      })
      .catch((err) => {
        toast.error("Please try again");
      });
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    from: "",
    to: "",
  });

  const { title, description, date, from, to } = formData;

  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  // function checkFromDate() {
  //   if (to < from) {
  //     return `${from}`;
  //   }
  //   return to;
  // }
  function disableDate() {
    const date = new Date();
    return moment(date).format("YYYY-MM-DD");
  }
  // on submit

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title && description && date && from && to && role === "Admin") {
      axios
        .post(`${process.env.REACT_APP_SERVER}api/postevent`, {
          title,
          description,
          date,
          from,
          to,
          author,
          authorName: user.name,
        })
        .then((res) => {
          setFormData({
            ...formData,
            title: "",
            description: "",
            date: "",
            from: "",
            to: "",
          });

          toast.success(res.data.message);
          getAllEvents();
        })
        .catch((err) => {
          toast.error(err.response.data.error);
        });
    } else {
      toast.error("Please fill all the fields");
    }
  };

  // delete event

  const deleteEvent = (_id) => {
    if (_id) {
      axios
        .post(`${process.env.REACT_APP_SERVER}api/eventdelete`, { _id })
        .then((res) => {
          toast.success("Successfully deleted Events");
          getAllEvents();
        })
        .catch((err) => {});
    } else {
      toast.error("Please try again");
    }
  };

  return (
    <div className="min-h-screen  text-gray-900 flex  text-center  mt-20   text-center justify-center">
      <ToastContainer />
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-5   text-center justify-center ">
        <div className="col-span-2 justify-center ">
          <h1 className=" text-2xl xl:text-3xl font-extrabold text-center ">
            Post Event
          </h1>

          <form
            className="  w-full flex-1 mt-8 text-indigo-500"
            onSubmit={handleSubmit}
          >
            <div className="mx-auto max-w-xs relative">
              <label>Title</label>
              <input
                type="text"
                placeholder="Title"
                onChange={handleChange("title")}
                value={title}
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
              />
              <label>Description</label>
              <input
                type="text"
                placeholder="description"
                onChange={handleChange("description")}
                value={description}
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
              />

              <label>Date</label>
              <input
                type="date"
                min={disableDate()}
                onChange={handleChange("date")}
                value={date}
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
              />
              <br />
              <label>From</label>
              <input
                type="time"
                onChange={handleChange("from")}
                value={from}
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
              />
              <br />

              <label>To</label>
              <input
                type="time"
                // min={checkFromDate()}
                onChange={handleChange("to")}
                value={to}
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
              />
              <br />

              <button
                type="submit"
                className="mt-5 tracking-wide font-semibold bg-green-800 text-gray-100 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              >
                Add Event
              </button>
            </div>
          </form>
        </div>

        <div className="bg-slate-700 ">
          <p className=" text-s xl:text-s font-extrabold text-center  ">
            My Events
          </p>

          <div className="  text-center justify-center ">
            {allEvents.map((event) => (
              <div
                className=" bg-gray-100 box transition-all  px-2 justify-center 
            duration-300 ease-in-out hover:bg-yellow-200  rounded-lg mt-5 mr-20 ml-20 shadow-lg grid grid-cols-5  gap-4 

            sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5  xl:grid-cols-5


            "
                key={event._id}
              >
                <div className=" text-center col-span-4 overflow-hidden">
                  <h1 className="text-center  font-mono font-bold text-m  text-indigo-500">
                    {event.title}
                  </h1>

                  {/* <p className="text-xs   ">On: {event.date}</p>      */}

                  <p className="text-xs  text-green-800">
                    Posted On:{" "}
                    <span className="  font-nold text-xs text-black">
                      {event.date}
                    </span>
                  </p>
                </div>

                <div className="mt-2 ml-2 ">
                  <button
                    className="cursor-pointer "
                    onClick={() => deleteEvent(event._id)}
                  >
                    <i className="fas fa-trash-alt   text-red-500 hover:text-red-800" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostEvent;
