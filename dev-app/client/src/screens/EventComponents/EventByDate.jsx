import React from "react";
import { useState } from "react";
import moment from 'moment';
import Calendar from 'react-calendar';
//  import 'react-calendar/dist/Calendar.css';
import './Event.css';
import { ToastContainer, toast } from 'react-toastify'
import EventBusyTwoToneIcon from '@mui/icons-material/EventBusyTwoTone';
import { green, purple, red } from '@mui/material/colors';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import axios from 'axios'
import CelebrationIcon from '@mui/icons-material/Celebration';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import Navbar from "../Navbar";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function EventByDate() {


  const [dateValue, onChange] = useState(null);
  
  const [dateChosen, setDateChosen] = useState(null);
  const [allEvents, setAllEvents]= useState([]);

  
  const handleClick =  () => { 
    
    if(!dateValue){

     
      toast.error("Please Select a Date ")
     
    }else{
      setDateChosen(dateValue)
  
     
    const date = moment(dateValue).format('YYYY-MM-DD');
    date.toString();
    

    axios.post(`http://localhost:5000/api/eventfind`, {date})
    .then(res => {
    
      setAllEvents(res.data)
    })
    .catch(err => {
     
     })



    }

  

  }
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
    <div className="flex  text-center  relative  justify-center" >
      <Navbar/>
      <ToastContainer />
        <div className="divB absolute rounded-full top-60 left-50 ml-20 mt-20 w-80 h-80 bg-green-600 mix-blend-multiply opacity-20 filter blur-xl "></div>
       <div className="divB absolute rounded-full top-60 left-50 top-20  w-80 h-80 bg-yellow-200 mix-blend-multiply  opacity-20 filter blur-xl"></div>
        <div className="divB2 absolute rounded-full top-60 left-50 mr-20  top-40  w-80 h-80 bg-indigo-500 mix-blend-multiply opacity-20 filter blur-xl"></div>
     <div className=" mt-4 m-4  flex text-center justify-center grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-10">
      <div className="   col-span-1 justify-center  align-center text-center ">
        <h1 className =" underline mt-20 mb-10  text-black font-bold dark:text-dw">Pick a Date</h1>    
        <Calendar
          className=  "CalendarContainer react-calendar"
          onChange={onChange}
          value={dateValue}
          minDate={new Date()}
         
        />
     
        <button 
          onClick={handleClick}
       
          className='CalendarContainer mt-5 ml-16 tracking-wide  font-semibold bg-green-800 text-gray-100 w-1/2 py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'>
          Find
        </button>
    
      

      </div>




    





      <div className="  col-span-2 justify-center text-center m-4  p-2 "> 

      
  



        <h1 className="   mt-20 mb-10 block text-black font-bold dark:text-dw w-full "> Avaliable Events</h1>
          <div className="  shadow-3xl   rounded-lg " >
            <div className=" backdrop-filter  backdrop-blur-2xl bg-white/150  shadow-3xl  mt-10  ">
       
              {  dateChosen  ?   
            
  
                <Carousel
                
                  showArrows={true }
                  infiniteLoop={true}
                  showThumbs={false}
                 
                  renderArrowPrev={(clickHandler, hasPrev) => {
                    return (
                      <div
                        className={`${
                          hasPrev ? "absolute" : "hidden"
                        } top-0 bottom-0 left-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20`}
                        onClick={clickHandler}
                      >
                        
                            <ArrowBackIosIcon className=" flex-right leading-tight relative " color="action " fontSize="large"   ></ArrowBackIosIcon>
                     </div>
                    );
                  }}


                  renderArrowNext={(clickHandler, hasNext) => {
                    return (
                      <div
                        className={`${
                          hasNext ? "absolute" : "hidden"
                        } top-0 bottom-0 right-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20`}
                        onClick={clickHandler}
                      >
                        
                        <ArrowForwardIosIcon className=" flex-right leading-tight relative " color="action " fontSize="large"   ></ArrowForwardIosIcon>
                      </div>
                    );
                  }}
                  >
                  {  
                    allEvents && allEvents.length ? 


                  
                      allEvents.map((e)=>{
                        return (
                          <div className=" mb-10 mt-10 "  key={e._id}>

                            <h1 className="font-mono  text-6xl font-extrabold tracking-tighter
                              bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text
                            ">{e.title}</h1> <br></br>
                            <p className="font-bold  text-green-800 ">Description: <span className=" font-semibold text-black">{e.description}</span></p>
                            <br></br>

                          
                            <EventBusyTwoToneIcon className=" flex-right leading-tight relative " color="action " fontSize="large"  sx={{color:green[700]}} ></EventBusyTwoToneIcon>
                            
                            <div className="grid grid-cols-1 mr-20 ml-20 gap-2   sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3  xl:grid-cols-3 ">
                              <div className="m-6  box   bg-indigo-500 shadow-3xl  sm:bg-indigo-500 md:bg-indigo-500 lg:bg-indigo-500  xl:bg-indigo-500">
                            
                              {/* sm: md: lg:  xl: */}
                              <p className=" mt-2 mb-2 font-bold  text-green-800  ">From: <span className=" font-semibold text-white   ">{changeTime(e.from) +" "}</span></p>
                              </div>

                              <div className="m-6  box  bg-indigo-500 shadow-3xl">

                              <p className="  mt-2 mb-2 font-bold  text-green-800 "> TO: <span className=" font-semibold text-white">  { changeTime(e.to)}</span></p>
                              </div>

                              <div className="m-6  bg-indigo-500 box  shadow-3xl ">
                              <p className=" mt-2 mb-2  font-bold  text-green-800"> DATE: <span className=" text-white mb-5">  { changeDate(e.date)}</span></p>
                              </div>
                            </div>
                            
                            
                          
                          
                            <p className="mt-4  ml-4  font-light text-xs text-left font-bold text-green-800">Posted By: <span className="  font-light text-xs text-black">{e.authorName}</span></p>

                          </div>
                      
                        );

                      })
                      
                    
                    
                    
                    : 

                    <div className=" mt-10 mb-10"  >

                      <h1 className="font-mono  text-6xl font-extrabold tracking-tighter
                        bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text
                      
                      ">No Event on this Date. </h1> <br></br>
                    
                    
                      <p className="font-light text-indigo-500 ">Try Another Date</p>

                      
                      <SentimentDissatisfiedOutlinedIcon className=" flex-right leading-tight relative " color="action " fontSize="large"  sx={{color:green[700]}} ></SentimentDissatisfiedOutlinedIcon>

                    </div>

                  
                    
                  }
                    
                </Carousel>
              
                :
               
                <Carousel>
                <div className=" mt-10 mb-10"  >

                  <h1 className="font-mono  text-6xl font-extrabold tracking-tighter
                    bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text
                  
                  ">Choose a Date </h1> <br></br>
                
                
                
                  <CelebrationIcon className=" flex-right leading-tight relative " color="action " fontSize="large"  sx={{color:green[700]}} ></CelebrationIcon>
                              
                

                  

                </div>
                </Carousel>
                
              }
       
        
            </div>
         </div>

      </div>
    </div>
    
    
  </div>
  );


  
}
export default EventByDate; 



