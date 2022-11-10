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
        <div className="md:sticky md:top-0 z-50 text-white">
            {/* MOBILE SIDEBAR */}
            <div className="bg-green-800 flex justify-between p-2 items-center sticky top-0 z-30">

                <a className="block text-white font-extrabold dark:text-dw">URXPERIENCE CHAT</a>
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
          md:relative md:translate-x-0 z-50 transition duration-200 ease-in-out flex flex-col child:transition-all h-full md:sticky md:top-0"
            >
                <h1 className="block text-white text-lg font-extrabold dark:text-dw mt-0">
                    URXPERIENCE CHAT
                </h1>
                <h2 className="text-lg font-extrabold">Avaliable Room:</h2>
                <div className='flex flex-col items-center'>
                    <a
                        className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
                                bg-green-700 text-white flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:bg-green-600 focus:shadow-sm focus:shadow-outline mt-1'
                        href=''
                        target='_self'
                    >
                        <i className='fa-solid fa-book fa 1x w-6  -ml-2 text-white' />
                        <span className='ml-2'>Faculy of Engineering</span>
                    </a>
                </div>
                {/* for members who joined the chat */}
                <h2 className="text-lg font-extrabold">Online Members:</h2>
                <a
                    className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
                                bg-green-700 text-white flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:bg-green-600 focus:shadow-sm focus:shadow-outline mt-5'
                    href='#'
                    target='_self'
                >
                    <span>Sarah</span>
                </a>
                <a
                    className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
                                bg-green-700 text-white flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:bg-green-600 focus:shadow-sm focus:shadow-outline mt-5'
                    href='#'
                    target='_self'
                >
                    <span>Sarah</span>
                </a>
                <a
                    className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
                                bg-green-700 text-white flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:bg-green-600 focus:shadow-sm focus:shadow-outline mt-5'
                    href='#'
                    target='_self'
                >
                    <span>Sarah</span>
                </a>

                <div className='flex flex-col items-center'>
                    <a
                        className='w-full mt-56 max-w-xs font-bold shadow-sm rounded-lg py-3
                                bg-green-700 text-white flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:bg-green-600 focus:shadow-sm focus:shadow-outline mt-5'
                        href='/dashboard'
                        target='_self'
                    >
                        <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2 text-white' />
                        <span className='ml-4'>Leave Chat</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SideBar