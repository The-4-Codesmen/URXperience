import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./EventComponents/EventPage.css";

import EventPages from "./EventComponents/EventPages";
import moment from "moment";
import axios from "axios";

import EventNoteIcon from "@mui/icons-material/EventNote";
import { green } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isAuth, getCookie, signout } from "../helpers/auth";
function Events() {
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

  const getAllEvents = async () => {
    axios
      .get(`${process.env.REACT_APP_SERVER}api/eventfindall`)
      .then((res) => {
        setAllEvents(res.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getAllEvents();
    const interval = setInterval(() => {
      getAllEvents();
    }, 2 * 1000);
    return () => clearInterval(interval);
  }, []);

  //Date fromat for user
  function changeTime(time) {
    const [hours, minute] = time.split(":");
    const hour = +hours % 24;

    const TimeFrame = hour < 12 ? " AM" : " PM";
    return (hour % 12 || 12) + ":" + minute + TimeFrame;
  }
  function changeDate(date) {
    return moment(date).format("MMM Do YY");
    //  return date;
  }
  function sortBy(field) {
    return function (a, b) {
      return (a[field] < b[field]) - (a[field] > b[field]);
    };
  }
  return (
    <div className="min-h-screen  text-gray-900 flex justify-center mt-20">
      <Navbar />
      <div className=" container justify-center ">
        <h1 className="text-2xl xl:text-3xl font-extrabold text-center mt-2 -mb-4 ">
          ALL EVENTS
        </h1>
        <div className="text-center Align-items -mb-20">
          <EventPages />
        </div>

        <div className="mt-2 grid p-4 grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-8 auto-cols-auto">
          {allEvents?.sort(sortBy("date")).map((event) => (
            <div
              className="  bg-green-800  ok rounded-lg  mt-20 mb-20 "
              key={event._id}
            >
              <div className=" bg-yellow-200  ok2 rounded-lg  mt-10 ">
                <div
                  className="bg-gray-100 rounded-lg p-3 shadow-lg items-center now"
                  key={event.id}
                >
                  <div className="rounded-lg text-center ">
                    <h1 className="font-mono tracking-tight font-bold  italic  text-green-800 text-4xl overflow-hidden">
                      {event.title}
                    </h1>{" "}
                    <br></br>
                    <label className="font-bold">Description</label>
                    <div className="container mt-2 overflow-y-scroll rounded">
                      <h3 className="object-none h-40">{event.description}</h3>
                    </div>
                    <br></br>
                    <EventNoteIcon
                      className=" flex-right mb-2 leading-tight relative mb-5 "
                      color="action "
                      fontSize="large"
                      sx={{ color: green[900] }}
                    ></EventNoteIcon>
                    <p className=" font-bold">
                      From:{" "}
                      <span className=" font-light">
                        {changeTime(event.from) + " "}
                      </span>
                      To:{" "}
                      <span className=" font-light ">
                        {changeTime(event.to)}
                      </span>
                    </p>
                    <p className=" font-bold">
                      On:{" "}
                      <span className=" font-light">
                        {changeDate(event.date)}
                      </span>
                    </p>
                    <p className=" font-bold">
                      Posted By:{" "}
                      <span className=" font-light">{event.authorName}</span>
                    </p>
                    <i>
                      To register contact{" "}
                      <a
                        className="underline text-blue-500"
                        href="mailto:housing.services@uregina.ca"
                      >
                        {" "}
                        housing.services@uregina.ca
                      </a>
                    </i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Events;
