import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";


import EventPages from "./EventComponents/EventPages";
import moment from 'moment';
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
      console.log(res.data)
      setAllEvents(res.data)
    })
    .catch(err => {
     console.log(err)
     })
 //    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5">

   };
 
  useEffect(()=>{
    getAllEvents();
    const interval = setInterval(() => {
      getAllEvents();
    },2*1000);
    return () => clearInterval(interval);
  },[]);


    //Date fromat for user
  function changeTime(time){

    const [hours, minute] = time.split(":");
    const hour = +hours % 24;
    
    const TimeFrame = (hour < 12 ? " AM" : " PM")
    return (hour % 12 || 12) + ":" + minute + TimeFrame;
  }
  function changeDate(date){

   return moment(date).format("MMM Do YY");

   
  }

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
                      
                    <div className="ounded-lg text-center">
                        
                      <h1 className="font-mono  font-bold text-indigo-500 text-2xl">{event.title}</h1> <br></br>
                      <label className="font-bold">Description:</label>
                      <h3>{event.description}</h3><br></br>


                      <EventBusyTwoToneIcon className=" flex-right mb-2 leading-tight relative " color="action " fontSize="large"  sx={{color:purple[900]}} ></EventBusyTwoToneIcon>

                      <p className=" font-bold">From: <span className=" font-light">{changeTime(event.from) +" "}</span>
                      
                      From: <span className=" font-light ">{changeTime(event.to) }</span></p>

          
                      <p className=" font-bold">On: <span className=" font-light">{changeDate(event.date)}</span></p>

                      <p className=" font-bold">Posted By: <span className=" font-light">{event.authorName }</span></p>

                   
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
