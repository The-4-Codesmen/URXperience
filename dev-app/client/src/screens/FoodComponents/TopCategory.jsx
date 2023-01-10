import React from "react";
import { NavLink } from "react-router-dom";

import "./buttoncss.css";
function TopCategory() {
  return (
    <div className="rounded-lg overflow-hidden bg-opacity-0">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 underline text-center">Categories</div>
        <NavLink to={"/foodscreen/Option/ketogenic"}>
          <div className="rounded-lg text-center p-6 bg-green-800 font-bold text-white hover:bg-green-700">
            <span>Meat Lover</span>
          </div>
        </NavLink>
        <div className="my-12 border-b text-center">
          <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
            Or Try
          </div>
        </div>
        <NavLink to={"/foodscreen/Option/vegetarian"}>
          <div className="rounded-lg text-center p-6 bg-green-800 font-bold text-white hover:bg-green-700">
            <span>Vegetarian</span>
          </div>
        </NavLink>
        <div className="my-12 border-b text-center">
          <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
            Or Try
          </div>
        </div>
        <NavLink to={"/foodscreen/Option/vegan"}>
          <div className="rounded-lg text-center p-6 bg-green-800 font-bold text-white hover:bg-green-700">
            <span>Vegan</span>
        </div>
         </NavLink>
      </div>

    </div>
  );
}

export default TopCategory;

