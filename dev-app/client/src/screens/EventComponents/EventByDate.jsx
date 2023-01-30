import React from "react";
import { useState } from "react";
import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './buttoncss.css';

import EventBusyTwoToneIcon from '@mui/icons-material/EventBusyTwoTone';
import { green, purple, red } from '@mui/material/colors';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import axios from 'axios'

import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import Navbar from "../Navbar";

function EventByDate() {


  const [dateValue, onChange] = useState(new Date());
  
  
  const [allEvents, setAllEvents]= useState([]);

  
  const handleClick =  () => { 
    
    if(!dateValue){

      console.log("pick date")
     
    }else{
      
    const date = moment(dateValue).format('YYYY-MM-DD');
    date.toString();
    console.log(date);

    axios.post(`http://localhost:5000/api/eventfind`, {date})
    .then(res => {
      console.log(res.data)
      setAllEvents(res.data)
    })
    .catch(err => {
     console.log(err)
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
    <div  
    
    className=" flex  min-h-screen text-center   justify-center
    bg-gradient-to-tl from-gray-700 via-gray-900 to-black
    
    "
    // style={{ backgroundImage:`url(${image})`, backgroundSize: 'cover' }}
    >
      <Navbar/>
    <div className=" mt-4 flex text-center justify-center grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-10">
      
      
      <div className=" justify-center mt-9 align-center text-center ">
        <h1 className =" underline mt-20 mb-10  text-white font-bold dark:text-dw">Pick a Date</h1>
     
    
     
      
        <Calendar
       className=  "CalendarContainer react-calendar"

  
       onChange={onChange}
          value={dateValue}
          minDate={new Date()}
          defaultValue={new Date()}
        />
     

     
        <button 
          onClick={handleClick}
       
          className='CalendarContainer mt-5 ml-16 tracking-wide  font-semibold bg-green-800 text-gray-100 w-1/2 py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'>
          Find
        </button>
    
      

      </div>




    





      <div className="  col-span-2 justify-center text-center m-4  p-2 "> 

      
      {/* // style={{ backgroundImage:`url(${image})`, backgroundSize: 'cover' }} */}



        <h1 className="   mt-20 mb-10 block text-white font-bold dark:text-dw w-full "> Avaliable Events</h1>
          <div 
              // style={{ backgroundImage:`url(${image})`, backgroundSize: 'cover' }}
            className="
            bg-gray-800
            rounded-lg
            
            "
          
          >
        <div className="
       
        backdrop-filter  backdrop-blur-2xl bg-white/150  shadow-3xl  mt-10 ">
       

          {console.log(allEvents)}
            <Carousel
          
            showArrows={true }
            infiniteLoop={true}
            >
              { 
              allEvents && allEvents.length ? 


              
              allEvents.map((e)=>{
                return (
                  <div className=" mb-10 mt-10  border-indigo-600"  key={e.id}>

                    <h1 className="font-mono  text-6xl font-extrabold tracking-tighter
                      bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text
                    ">{e.title}</h1> <br></br>
                    <p className="font-light text-indigo-500 ">Description: <span className=" font-semibold text-white">{e.description}</span></p>
                    <br></br>


                    <EventBusyTwoToneIcon className=" flex-right leading-tight relative " color="action " fontSize="large"  sx={{color:green[700]}} ></EventBusyTwoToneIcon>
                    
                    <div class="grid grid-cols-3 gap-2">
                      <div className="m-6 bg-gray-700  ">
                    

                      <p className=" mt-2 mb-2 font-light text-indigo-500">From: <span className=" font-semibold text-white">{changeTime(e.from) +" "}</span></p>
                      </div>

                      <div className="m-6 bg-gray-700 ">

                      <p className="  mt-2 mb-2 font-light text-indigo-500"> TO: <span className=" font-semibold text-white">  { changeTime(e.to)}</span></p>
                      </div>

                      <div className="m-6 bg-gray-700">
                      <p className=" mt-2 mb-2  font-light text-indigo-500"> DATE: <span className=" text-white mb-5">  { changeDate(e.date)}</span></p>
                      </div>
                    </div>
                    
                    
                  
                   
                    <p className="mt-4  ml-4 font-light text-xs text-left text-indigo-500 ">Posted By: <span className="  font-light text-xs text-white">{e.authorName}</span></p>

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
        
        </div>
        </div>

      </div>
    </div>
    
    
  </div>
  );
}
export default EventByDate; 



