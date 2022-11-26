import React, { useState } from 'react';
import { signout } from '../helpers/auth';
import Logo from '../img/URX-logo.svg'
import axios from 'axios'
import {getCookie} from "../helpers/auth"
const Navbar = () => {
  const [show, setShow] = useState(false);
  const toggleOpen = () => {
    setShow(!show)
  }
  function handleSignout() {
    const token = getCookie('token')
    axios.delete("http://localhost:5000/api/logout", {
      headers: {
        accessToken:token
      }
    }).then((res) => {
      signout();
    })
  }
  return (
    <div className='bg gray-100 text-gray-900 flex justify-center'>
      <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <a href="/dashboard" className="flex items-center">
            <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">URXperience</span>
          </a>
          <div className="flex md:order-2">
            <button type="button" onClick={handleSignout} className="text-white bg-green-800 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</button>
            <button onClick={toggleOpen} data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
            </button>
          </div>
          <div className={show ? "justify-between items-center w-full md:flex md:w-auto md:order-1" : "hidden justify-between items-center w-full md:flex md:w-auto md:order-1"} id="navbar-sticky">
            <ul className="flex text-center flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a href="/FoodScreen" className="block py-2 pr-4 pl-3 text-black font-medium rounded hover:bg-green-700 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Recipe</a>
              </li>
              <li>
                <a href="/takeouts" className="block py-2 pr-4 pl-3 text-black font-medium rounded hover:bg-green-700 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Takeout</a>
              </li>
              <li>
                <a href="/dashboard" className="block py-2 pr-4 pl-3 text-black font-medium rounded hover:bg-green-700 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Events</a>
              </li>
              <li>
                <a href="/chat" className="block py-2 pr-4 pl-3 text-black font-medium rounded hover:bg-green-700 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Community</a>
              </li>
              <li>
                <a href="/" className="block py-2 pr-4 pl-3 text-black font-medium rounded hover:bg-green-700 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Profile</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </div>
  )
}

export default Navbar