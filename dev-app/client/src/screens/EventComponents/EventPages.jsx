import React from 'react'
import { NavLink} from "react-router-dom";

import './buttoncss.css';

function EventPages() {
  return (
    <div>
        <div class=" grid grid-rows2 gap-3 relative ">
          <h1 className='text-center mb-15 mt-5'>Advanced Options</h1>
            <div className='show_detail_link mb-5'>
            <NavLink  to={'/EventByDate'}>
            <button  className ="show_more "><span>Filter By Date</span></button>
            
            </NavLink>
            </div>
            <div className='show_detail_link  '>
            <NavLink  to={'/PostEvent'}>
            <button  className ="show_more "><span>Post Event</span></button>
            
            </NavLink>
            </div>
            
        
 

          </div>

    </div>
  )
}



export default EventPages
