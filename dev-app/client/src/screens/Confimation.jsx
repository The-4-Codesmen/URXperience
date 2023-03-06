import React from "react";

const Confimation = () => {
  return (
    <div className="grid h-screen place-items-center">
      <i
        className="fa fa-check-circle text-3xl text-green-800"
        aria-hidden="true"
      ></i>
      <h1 className="font-bold">
        <h1 className="text-green-800 text-center">Registration Successful!</h1>
        An activation link has been sent to the email provided. Please verify
        your account before logging in.
        <h1 className="text-red-500 text-center">
          {" "}
          The Link will expire in the next 10 mins!{" "}
        </h1>
      </h1>
      <i className="text-red-500">
        NOTE: Please check your junk or spam box as well
      </i>
    </div>
  );
};

export default Confimation;
