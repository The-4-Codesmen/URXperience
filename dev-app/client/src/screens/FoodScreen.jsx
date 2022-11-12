import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { updateUser, isAuth, getCookie, signout } from '../helpers/auth';
import{ useNavigate} from 'react-router-dom';
import Navbar from './Navbar';
import App from '../App';

import Pages from './FoodPages/Pages';

function FoodScreen(){
  return (
  <div className='min-h- bg gray-100 text-gray-900 flex grid justify-center'>
    <h1>Recipe Of The Day</h1>
    <Pages/>
  </div>
    
   
);
};

export default FoodScreen