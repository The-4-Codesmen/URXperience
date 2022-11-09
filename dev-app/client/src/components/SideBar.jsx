import React, { useState, useRef } from "react";
import Logo from '../img/URX-logo.svg'
import { useNavigate } from 'react-router-dom'
const SideBar = () => {
    const sideBarRef = useRef()
    function toogleSideBar() {
        sideBarRef.current.classList.toggle('-translate-x-full')
    }
    const navigate = useNavigate();
    return (
        <div className="max-h-screen md:sticky md:top-0 z-50 text-white">
            {/* MOBILE SIDEBAR */}
            <div className="bg-green-800 flex justify-between p-2 items-center sticky top-0 z-30">

                <a className="block text-white font-extrabold dark:text-dw">URXperience Chat</a>
                <button

                    className="rounded text-3l"
                    onClick={toogleSideBar}
                >
                    <img src={Logo} className="mr-2 h-10 sm:h-9" alt="Logo" />
                </button>
            </div>
            {/* MAIN SIDEBAR */}
            <div
                ref={sideBarRef}
                className="bg-green-800 w-72 px-5 py-4 absolute space-y-4 inset-y-0 left-0 transform -translate-x-full
          md:relative md:translate-x-0 z-50 transition duration-200 ease-in-out flex flex-col child:transition-all md:max-h-screen md:min-h-screen md:sticky md:top-0"
            >
                <h1 className="block text-white font-extrabold dark:text-dw mt-0">
                    URXperience Chat
                </h1>
                <h2>Avaliable Room:</h2>
                <button className="flex flex-col grow font-bold items-center space-y-3 rounded bg-yellow-100 text-black ">
                    Faculty of Engineering
                </button>
                <h2>Online Members:</h2>
                <button className="flex flex-col grow font-bold items-center space-y-3 rounded bg-yellow-100 text-black ">
                    Sarah
                </button>
                <button className="flex flex-col grow font-bold items-center space-y-3 rounded bg-yellow-100 text-black ">
                    Sarah
                </button>
                <button className="flex flex-col grow font-bold items-center space-y-3 rounded bg-yellow-100 text-black ">
                    Sarah
                </button>
                <br />
                <br />
                <br />
                <br />
                <br />
                <button onClick={() => navigate('/dashboard')} className="flex flex-col grow font-bold items-center rounded bg-red-700 text-white ">
                    Leave Chat
                </button>
            </div>
        </div>
    );
};

export default SideBar