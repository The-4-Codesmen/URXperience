import React from 'react'
import {Link, NavLink} from "react-router-dom";

import './buttoncss.css';
function TopCategory() {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2 underline">Categories</div>
      <div className="m-auto">
      <NavLink  to={'/foodscreen/Option/ketogenic'}>
        <div className="rounded-lg text-center p-6 bg-green-800 font-bold text-white hover:bg-green-700">
            <span>Meat Lover</span>
        </div>
        </NavLink>
        <div className='my-12 border-b text-center'>
          <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
            Or Try
          </div>
        </div>
        <NavLink  to={'/foodscreen/Option/vegetarian'}>
        <div className="rounded-lg text-center p-6 bg-green-800 font-bold text-white hover:bg-green-700">
            <span>Vegetarian</span>
        </div>
        </NavLink>
        <div className='my-12 border-b text-center'>
          <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
            Or Try
          </div>
        </div>
        <NavLink  to={'/foodscreen/Option/vegan'}>
        <div className="rounded-lg text-center p-6 bg-green-800 font-bold text-white hover:bg-green-700">
            <span>Vegan</span>
        </div>
         </NavLink>
      </div>

    </div>
  </div>

  )
}



export default TopCategory



{/* <div>

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

    </div> */}