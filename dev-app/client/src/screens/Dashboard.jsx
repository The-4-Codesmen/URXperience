import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { updateUser, isAuth, getCookie, signout } from '../helpers/auth';
import{ useNavigate} from 'react-router-dom'
import Logo from '../img/URX-logo.svg'
import Navbar from './Navbar';
const Dashboard = () => {

  const navigate = useNavigate();
  useEffect(() => {
    const token = getCookie('token')
    if (!getCookie('token')) {
        navigate("/login");
    }else{
        axios.get(`http://localhost:5000/api/user/${isAuth()._id}`,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        }).then(res=>{
          const {role, name, email} = res.data
        }).catch(err=>{
          toast.error(`Error to your Information ${err.response.statusText}`)
          if(err.response.status === 401){
            signout(()=>{
              navigate('/login')
            })
          }
        })
      }
}, []);
  return (
    <div className='min-h-screen bg gray-100 text-gray-900 flex justify-center'>
        <Navbar />
        <ToastContainer/>
    </div>
  )
}

export default Dashboard