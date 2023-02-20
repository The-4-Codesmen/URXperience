import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { updateUser, isAuth, getCookie, signout } from "../helpers/auth";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/appContext";
import ListGroup from "react-bootstrap/ListGroup";
import Logo from "../img/URX-logo.svg";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import Typical from "react-typical";
import RecipeOfTheDay from "./FoodComponents/RecipeOfTheDay";
import moment from "moment";
const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState([]);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [allEvents, setAllEvents] = useState([]);
  const [seePeople, setSeePeople] = useState(false);

  // useEffect(() => {

  // }, []);
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
          const { name } = res.data;
          setUserName(name);
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
  function getPersons() {
    axios.get(`${process.env.REACT_APP_SERVER}api/allUsers`).then((res) => {
      const temp = res.data.members;
      let tempArray = [];
      temp.forEach((member) => {
        if (member.status === "online" && member._id != user._id) {
          tempArray.push(member);
        }
      });
      setUsers(tempArray);
    });
  }
  const getAllEvents = async () => {
    axios
      .get(`${process.env.REACT_APP_SERVER}api/dashboardevent`)
      .then((res) => {
        setAllEvents(res.data);
      })
      .catch((err) => {});
    //    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5">
  };
  useEffect(() => {
    getAllEvents();
    getPersons();
    const interval = setInterval(() => {
      getPersons();
    }, 5 * 1000);
    return () => clearInterval(interval);
  }, []);

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

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="min-h-screen">
        <div className="mt-20 justify-center">
          <section className="bg-white dark:bg-gray-900">
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
              <div className="mr-auto place-self-center lg:col-span-7 ">
                <h1 className=" mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                  Welcome {userName}!
                </h1>
                <br></br>
                <h2 className="max-w-2xl mb-6 font-light italic text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                  {/* <Typical
                    steps={["Communities", 2000, "Foods", 2000, "Events", 2000]}
                    loop={Infinity}
                  /> */}
                  Communities, Foods, Events
                </h2>
              </div>
            </div>
          </section>
        </div>
        <div className="">
          <div className="p-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-2">
            <div className="h-86 rounded overflow-hidden shadow-lg bg-red-400 h-fit">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-center underline">
                  Foods
                </div>
                <div className="font-regular italic font-serif text-md mb-2 text-center">
                  Feeling adventurous to cook? Explore some{" "}
                  <a
                    href="/FoodScreen"
                    className="underline text-indigo-500 hover:text-blue-500"
                  >
                    Recipes
                  </a>
                  <br />
                  <i className="fas fa-arrow-down animate-bounce w-6 h-6 text-yellow-200"></i>
                </div>
                <RecipeOfTheDay />
              </div>
            </div>
            <div className="rounded overflow-hidden shadow-lg bg-green-400 h-fit">
              <div className="px-12 py-4">
                <div className="font-bold text-xl mb-2 text-center underline">
                  Events
                </div>
                <div className="font-regular italic font-serif text-md mb-2 text-center">
                  Stay up to date with Events on Residence. Find more on{" "}
                  <a
                    href="/Events"
                    className="underline text-indigo-500 hover:text-blue-500"
                  >
                    Events
                  </a>
                  <br />
                  <i className="fas fa-arrow-down animate-bounce w-6 h-6 text-yellow-200"></i>
                </div>
                {allEvents.length != 0 ? (
                  allEvents.map((event) => (
                    <div
                      key={event._id}
                      className="mb-8 pl-2 w-full p-4 rounded-lg shadow-lg bg-white text-center"
                    >
                      <div className="italic font-bold text-lg text-indigo-500 underline">
                        <h1>{event.title}</h1>
                      </div>
                      <p className=" font-bold">
                        From:{" "}
                        <span className="font-light">
                          {changeTime(event.from) + " "}
                        </span>
                        To:{" "}
                        <span className="font-light ">
                          {changeTime(event.to)}
                        </span>
                      </p>
                      <p className="font-bold">
                        On:{" "}
                        <span className=" font-light">
                          {changeDate(event.date)}
                        </span>
                      </p>
                    </div>
                  ))
                ) : (
                  <h1 className="text-center font-bold">No Current Events</h1>
                )}
              </div>
            </div>
            <div className="rounded overflow-hidden shadow-lg overflow-y-scroll container bg-blue-400 h-fit">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-center underline">
                  Online Members
                </div>
                <div className="font-regular italic font-serif text-md mb-2 text-center">
                  Here are the members who are currently using this app. Start{" "}
                  <a
                    href="/Chat"
                    className="underline text-indigo-500 hover:text-blue-500"
                  >
                    Chatting
                  </a>
                  <br />
                  <i className="fas fa-arrow-down animate-bounce w-6 h-6 text-yellow-200"></i>
                </div>
                {users.length != 0 ? (
                  users?.map((usr) => (
                    <ListGroup.Item
                      key={usr._id}
                      className="w-full font-bold shadow-sm rounded-lg py-3
                              bg-green-700 text-white flex items-center justify-center transition-all 
                              duration-300 ease-in-out focus:outline-none hover:bg-green-600 
                              focus:shadow-sm focus:shadow-outline mt-5"
                    >
                      <div className="flex gap-3 flex-row">
                        <div>
                          <i className="fas fa-circle text-green-300 "></i>
                        </div>
                        <div>{usr.name}</div>
                      </div>
                    </ListGroup.Item>
                  ))
                ) : (
                  <h1 className="text-center font-bold">
                    No online Members Hombre 🥲
                  </h1>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
