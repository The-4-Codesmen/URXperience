import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { updateUser, isAuth, getCookie, signout } from "../helpers/auth";
import { useNavigate } from "react-router-dom";
import Logo from "../img/URX-logo.svg";
import Navbar from "./Navbar";
import Typical from "react-typical";
import RecipeOfTheDay from "./FoodComponents/RecipeOfTheDay";
const Dashboard = () => {
  const [userName, setUserName] = useState("");
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
  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="mt-20 justify-center">
        <section className="bg-white dark:bg-gray-900">
          <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="mr-auto place-self-center lg:col-span-7">
              <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                Welcome {userName}!
              </h1>
              <br></br>
              <h2 className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                <Typical
                  steps={["Communities", 1000, "Foods", 1000, "Events", 1000]}
                  loop={Infinity}
                />
              </h2>
            </div>
          </div>
        </section>
      </div>
      <div className="lg:fixed lg:bottom-0">
        <div className="p-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-2">
          <div className="h-80 rounded overflow-hidden shadow-lg bg-red-400">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Foods</div>
              <div className="">
                <RecipeOfTheDay />
              </div>
            </div>
          </div>
          <div className="rounded overflow-hidden shadow-lg bg-green-400">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Events</div>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, Nonea! Maiores et perferendis eaque,
                exercitationem praesentium nihil.
              </p>
            </div>
          </div>
          <div className="rounded overflow-hidden shadow-lg bg-blue-400">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Community</div>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, Nonea! Maiores et perferendis eaque,
                exercitationem praesentium nihil.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
