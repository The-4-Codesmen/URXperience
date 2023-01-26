import React, {useState} from 'react'
import { NavLink} from "react-router-dom";

import './buttoncss.css';
import { useDispatch, useSelector } from "react-redux";
function EventPages() {

  
  const { user } = useSelector((state) => state.user)
  return (
    <div>
        <div className=" grid grid-rows2 gap-3 relative ">
          <h1 className='text-center mb-15 mt-5'>Advanced Options</h1>
            <div className='show_detail_link mb-5'>
            <NavLink  to={'/EventByDate'}>
            <button  className ="show_more "><span>Filter By Date</span></button>
            
            </NavLink>
            </div>
            <div className='show_detail_link  '>


            
            {user.role==='Admin' ?
                        <NavLink  to={'/PostEvent'}>
                        <button              
                        className ="show_more "><span>Post Event</span></button>
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
