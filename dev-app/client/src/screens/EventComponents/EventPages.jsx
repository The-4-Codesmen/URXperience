import React, {useState} from 'react'
import { NavLink} from "react-router-dom";

import './Event.css';
import { useDispatch, useSelector } from "react-redux";
function EventPages() {

  
  const { user } = useSelector((state) => state.user)
  return (
    <div>
             
        <div className=" grid grid-rows-2   justify-center  place-items-center mt-10">
        {/* <h1 className='justify-center mb-15 mt-5 '>Advanced Options</h1> */}
            <div className=' mb-5'>
              <NavLink  to={'/EventByDate'}>
              <button  
              className=" mt-5  tracking-wide  font-semibold bg-green-800 text-gray-100 w-60 py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
              Filter By Date</button>
              
              </NavLink>
            </div>
            
            <div className=''>


              
              {user.role==='Admin' ?
                          <NavLink  to={'/PostEvent'}>
                          <button         
                            className=" mt-5  tracking-wide  font-semibold bg-green-800 text-gray-100 w-60 py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
      
                          Post Event</button>
                          </NavLink>
                          :
                          <div className='hidden'>Easter Egg</div>
              }

            </div>
            
        
 

        </div>

    </div>
  )
}



export default EventPages
