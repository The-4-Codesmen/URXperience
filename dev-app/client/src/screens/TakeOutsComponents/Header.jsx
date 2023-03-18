import React from "react";
import { Autocomplete } from "@react-google-maps/api";

const Header = ({ onPlaceChanged, onLoad }) => {
  return (
    <>
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
  );
};

export default Header;
