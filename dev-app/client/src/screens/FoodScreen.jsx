

import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { updateUser, isAuth, getCookie, signout } from "../helpers/auth";
import {Navigate, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import App from "../App";
import TakeoutImage from '../img/TakeoutMap.jpg'
import{NavLink} from 'react-router-dom';
import RecipeOfTheDay from "./FoodComponents/RecipeOfTheDay";
import RecipeList from "./FoodPages/RecipeList";
import TopCategory from "./FoodComponents/TopCategory";



function FoodScreen() {
  const navigate = useNavigate();

  return (

    <div className='min-h-screen bg gray-100 text-gray-900 flex justify-center'>

      <Navbar />
   
  
    <div className="grid grid-cols-3 gap-2 " >
     
      
      <div className="col-start-1 col-end-3  ... place-content-center justify-items-center gap-5 "  >
      <br></br> <br></br> <br></br> <br></br>
        <h1 className="font-bold text-2xl gap-5 text-center">Recipe Of the Day</h1>
         < RecipeOfTheDay/>
        <br></br>
      </div>
      


      <div className="col-start-3 col-end-4 ...">
      <br></br> <br></br> <br></br> <br></br>
        <h3 className="font-semibold text-xl text-center">Or Try Take Outs</h3>
        <a  href="/TakeOuts"><img src={TakeoutImage} alt="TakeoutImage" className="box-border h-64 w-64 relative left-32"></img></a> 
  
      </div>

      <div class="divide-y divide-solid"></div>
      <div className="col-start-1 col-end-3  ...">
        <h2 className=" font-semibold text-xl text-center">Or choose Category</h2>
        <TopCategory/>
      
      </div>
      
    
      
     
     
 
    
     

      </div>
      </div>

  );
}

export default FoodScreen;
