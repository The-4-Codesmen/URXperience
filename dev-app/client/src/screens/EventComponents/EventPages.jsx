import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { isAuth, getCookie, signout } from "../../helpers/auth";
import "./Event.css";
import { useSelector } from "react-redux";
function EventPages() {
  const { user } = useSelector((state) => state.user);
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
    <div>
      <div className=" grid grid-rows-2   justify-center  place-items-center mt-10">
        <div className="grid p-4 grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-8 auto-cols-auto">
          <div className="">
            <NavLink to={"/EventByDate"}>
              <button className=" tracking-wide  font-semibold bg-green-800 text-gray-100 w-60 py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                Filter By Date
              </button>
            </NavLink>
          </div>
          <div className="">
            {user.role === "Admin" ? (
              <NavLink to={"/PostEvent"}>
                <button className=" tracking-wide  font-semibold bg-green-800 text-gray-100 w-60 py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                  Post Event
                </button>
              </NavLink>
            ) : (
              <div className="hidden">Easter Egg</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventPages;
