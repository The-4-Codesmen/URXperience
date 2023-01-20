import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { updateUser, isAuth, getCookie, signout } from '../helpers/auth';
import Navbar from './Navbar';
import {Link} from "react-router-dom";
import image from '.././img/card-top1.jpg'
const Resources = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = getCookie('token')
    if (!getCookie('token')) {
      navigate("/login");
    } else {
      axios.get(`http://localhost:5000/api/user/${isAuth()._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        const { role, name, email } = res.data
      }).catch(err => {
        toast.error(`Error to your Information ${err.response.statusText}`)
        if (err.response.status === 401) {
          signout(() => {
            navigate('/login')
          })
        }
      })
    }
  }, []);
  return (
    <div className="min-h-screen bg gray-100 text-gray-900 flex justify-center">
      <Navbar />
      <div className="mt-16 p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <img className="w-full" src={image} alt="Sunset in the mountains"/>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Housing Services</div>
              <div class="flex flex-col">
                <div>
                  <p className="text-gray-700 text-base p-2">
                    Housing Services Contact
                  </p>
                  <a href="https://www.uregina.ca/housing/contact-us/index.html" target="_blank" rel="noreferrer">   
                    <span class="inline-block bg-green-800 rounded px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">Click Here!</span>
                  </a>
                </div>
                <div>
                  <p className="text-gray-700 text-base p-2">
                    Housing Portal
                  </p>
                  <a href="https://www2.uregina.ca/housing/" target="_blank" rel="noreferrer">   
                    <span class="inline-block bg-green-800 rounded px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">Click Here!</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full" src={image} alt="Sunset in the mountains"/>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Faculty Resources</div>
                <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                </p>
              </div>
          </div>
          <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full" src={image} alt="Sunset in the mountains"/>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">UofR Resources</div>
                <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                </p>
              </div>
          </div>
      </div>
      </div>
  );
};
export default Resources;
