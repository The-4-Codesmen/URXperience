import React from "react";
import { useState } from "react";
import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


import EventBusyTwoToneIcon from '@mui/icons-material/EventBusyTwoTone';
import { purple, red } from '@mui/material/colors';
import axios from 'axios'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
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
/*

  const onChange = (date) => {
    
    date= moment(date).format('YYYY-MM-DD');
    date.toString();

    console.log(date);
    setDate(date);
   
    retrivingEvents(date);
  

  };

*/
  

  return (
    <div  className="flex   min-h-screen   justify-center">
      <Navbar/>
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
      <div className="col-span-1 justify-center p-2 ">
        <h1 className =" mt-20 mb-10 block text-black font-bold dark:text-dw">Pick a Date</h1>
      
        <Calendar
          onChange={onChange}
          value={dateValue}
          minDate={new Date()}
        />
      
          <button 
          onClick={handleClick}
          className='mt-5 tracking-wide font-semibold bg-green-800 text-gray-100 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'>
          Find
          </button>
       
      

      </div>




    





      <div className="col-span-2 justify-center  backdrop-blur-3xl bg-white/50   drop-shadow-md  p-2 "> 

       
        <h1 className="  mt-20 mb-10 block text-black font-bold dark:text-dw w-full ">  Avaliable Events</h1>

        <div className=" bg-yellow-200 border-2 border-yellow-600 backdrop-blur-xl bg-white/30 rounded-l-lg mt-10 shadow-lg">
       

        
          <Carousel
         
          showArrows={true }
          infiniteLoop={true}
          >

            {allEvents.map((e)=>{
              return (
                <div className="backdrop-filter backdrop-filter backdrop-blur-xl  mt-10"  key={e.id}>

                  <h1 className="font-mono font-bold text-indigo-500 text-2xl">{e.title}</h1> <br></br>
                  <p className="font-light text-indigo-500 ">Description: <span className=" font-semibold text-black">{e.description}</span></p>
                  <br></br>


                  <EventBusyTwoToneIcon className=" flex-right leading-tight relative " color="action " fontSize="large"  sx={{color:purple[500]}} ></EventBusyTwoToneIcon>

                  <p className=" mb-5 mt-2 font-light text-indigo-500">From: <span className=" font-semibold text-black">{e.from +" "}</span>
                   TO: <span className=" font-semibold text-black">  {e.to}</span></p>
                 
                  <p className=" mb-5">{e.date}</p><br></br>
                </div>
            
              );

            })}

          </Carousel>
        
        </div>
       

      </div>
    </div>
    
    
  </div>
  );
}
export default EventByDate; 

