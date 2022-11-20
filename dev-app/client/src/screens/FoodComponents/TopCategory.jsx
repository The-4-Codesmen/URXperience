import React from 'react'
import {Link, NavLink} from "react-router-dom";

import './buttoncss.css';
function TopCategory() {
  return (
    <div>

<div class=" grid grid-cols-3 gap-3 relative left-8">
        <NavLink  to={'/foodscreen/Option/ketogenic'}>
          <button className="recipebtn">Meat </button>
        </NavLink>

        <NavLink  to={'/foodscreen/Option/vegetarian'}>
          <button className="recipebtn ">Vegetarian </button>
        </NavLink>

       

        <NavLink  to={'/foodscreen/Option/vegan'}>
          <button className="recipebtn">Vegan</button>
        
         </NavLink>

      
 

</div>

    </div>
  )
}



export default TopCategory
