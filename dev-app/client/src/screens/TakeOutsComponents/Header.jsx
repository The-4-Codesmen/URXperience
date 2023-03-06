import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Logo from "../../img/URX-logo.svg";
import Navbar from "../Navbar";
const Header = ({ onPlaceChanged, onLoad }) => {
  return (
    <>
      {/* <div className="mb-24">
        <Navbar />
      </div> */}
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        className="flex w-full"
      >
        <div className="input-group relative flex flex-wrap items-center max-w-md mx-auto mb-4">
          <i className="fa fa-search absolute ml-2 mt-1"></i>
          <input className="pl-6 w-80 h-8 border-2 border-green-800 rounded-lg hover:border-green-500"></input>
        </div>
      </Autocomplete>
    </>
    // <nav className="flex flex-row text-center text-center justify-between py-3 px-4 bg-green-800 shadow items-center w-full mb-5">
    //   <a href="/dashboard">
    //     <img src={Logo} className="mr-3 h-14 sm:h-9" alt="Logo" />
    //   </a>
    //   <span className="text-2xl font-semibold text-white">Takeout Page</span>
    //   <div>{/* This is for Search bar */}</div>
    // </nav>
  );
};

export default Header;
