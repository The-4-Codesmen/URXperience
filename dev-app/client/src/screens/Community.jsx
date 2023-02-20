import React, { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import MessageForm from "../components/MessageForm";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { updateUser, isAuth, getCookie, signout } from "../helpers/auth";
const Community = () => {
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
  return (
    <div className=" md:flex min-h-screen relative overflow-hidden bg-green-700">
      <SideBar />
      <div className="w-full p-3">
        <MessageForm />
      </div>
    </div>
  );
};

export default Community;
