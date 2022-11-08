import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { updateUser, isAuth, getCookie, signout } from '../helpers/auth';
import{ useNavigate} from 'react-router-dom'
import Logo from '../img/URX-logo.svg'
const FoodScreen = () => {
 
  return (
    <div className='min-h-screen bg gray-100 text-gray-900 flex justify-center'>
      Hello

    </div>
  )
}

export default FoodScreen