import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";


import EventPages from "./EventComponents/EventPages";

import axios from "axios";
import EventBusyTwoToneIcon from '@mui/icons-material/EventBusyTwoTone';
import { purple } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { updateUser, isAuth, getCookie, signout } from '../helpers/auth';
function Events() {
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
  const [allEvents, setAllEvents]= useState([]);
   const getAllEvents = async() =>{
    axios.get(`http://localhost:5000/api/eventfindall`)
    .then(res => {
      //console.log(res.data)
      setAllEvents(res.data)
    })
    .catch(err => {
     console.log(err)
     })
 //    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5">

   };
 
  useEffect(()=>{
    getAllEvents();
  },[]);


  return (
    <div className='min-h-screen  text-gray-900 flex justify-center mt-20'>
      <Navbar />
      
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
    
 
    <EventPages />
     
     <div className="col-span-2 justify-center ">
    
      <h1 className='text-2xl xl:text-3xl font-extrabold text-center '>ALL EVENTS</h1>

    
       <div className="mt-2 grid p-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 auto-cols-auto"> 

      { allEvents.map((event)=>(
            <div className="bg-gray-100 rounded-lg p-3 shadow-lg items-center" key={event.id}>
                      
                    <div className='rounded-lg'>
                        
                      <h1 className="font-mono font-bold text-indigo-500 text-2xl">{event.title}</h1> <br></br>
                      <label>Description:</label>
                      <h3>{event.description}</h3><br></br>


                      <EventBusyTwoToneIcon className=" flex-right leading-tight relative " color="action " fontSize="large"  sx={{color:purple[900]}} ></EventBusyTwoToneIcon>

                      <p className=" ">From: {event.from} To: {event.to}</p>
                    
                      <p>{event.date}</p><br></br>
                    
                    </div>
                    
            </div>

      ))}
   
    </div>
    </div>

    </div>

     
     
    



    </div>

  );
}

export default Events;
