import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify'

import { Navigate } from 'react-router-dom'


import axios from 'axios'
import Navbar from '../Navbar'

import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { purple } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { updateUser, isAuth, getCookie, signout } from '../../helpers/auth';

function PostEvent() {
    const navigate = useNavigate();
    useEffect(() => {
      const token = getCookie('token')
      if (!getCookie('token')) {
        navigate("/login");
      } else {
        axios.get(`http://localhost:5000/api/user/${isAuth()._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(res => {
          const { role, name, email } = res.data
        }).catch(err => {
          toast.error(`Error to your Information ${err.response.statusText}`)
          if (err.response.status === 401) {
            signout(() => {
              navigate('/login')
            })
          }
        })
      }
    }, []);

    const [allEvents, setAllEvents]= useState([]);

    const { user} = useSelector((state) => state.user)

    const author = user._id;
    const role = user.role
   const getAllEvents = async() =>{


    const userId= user._id
   

    axios.post(`http://localhost:5000/api/eventfindbyid`, {userId})
    .then(res => {
      
      setAllEvents(res.data)
      
    })
    .catch(err => {
     console.log(err)
     })

   };
 
   useEffect(()=>{

    getAllEvents();

    },[]);







       const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        from: "",
        to: ""

    })

    const { title, description,date, from, to } = formData

    const handleChange = text => e => {
        setFormData({ ...formData, [text]: e.target.value })
    }

    // on submit 

const handleSubmit = async (e) => { 
   e.preventDefault(); 
   console.log(role)
    if (title && description && date && from && to && role ==="Admin") {
       console.log(role)
        axios.post(`http://localhost:5000/api/postevent`, {
            title,description,date, from ,to ,author, authorName:user.name
        }).then(res => {
            setFormData({
                ...formData,
                title: "",
                description: "",
                date: "",
                from: "",
                to: "",
            })
            
            toast.success(res.data.message)
            getAllEvents();
        }).catch(err => {
            toast.error(err.response.data.error)
        })
    } else {
        toast.error("Plese fill all the feilds")
    }
}


// delete event





const deleteEvent =  (_id) => { 
    

    
if(_id){
    axios.post(`http://localhost:5000/api/eventdelete`, {_id})
    .then(res => {
      console.log(res.data)

      getAllEvents();
    })
    .catch(err => {
     console.log(err)
     })

}else{

    console.log("Try again")
}
   





  

  }



/*



    if (title && description && date && from && to) {
         axios.post(`http://localhost:5000/api/addevent`, formData).then((res) => console.log(res)).catch(err => {
            console.log(err.response.data)
        }); 
    } else { 
            console.log("Plese try again"); } 
    };


    */

  return (
    <div className='min-h-screen  text-gray-900 flex  justify-center mt-20'>

        <ToastContainer />
        <Navbar/>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">

        <div className="col-span-2 justify-center ">
        <h1 className=' text-2xl xl:text-3xl font-extrabold text-center '>Post Event</h1>

            <form className='  w-full flex-1 mt-8 text-indigo-500' onSubmit={handleSubmit}>

                <div className="mx-auto max-w-xs relative">
                <label>Title</label>
                    <input type="text" placeholder='Title' onChange={handleChange('title')}
                    value={title}
                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                    />
                <label>Description</label>
                    <input type="text" placeholder='description' onChange={handleChange('description')}
                    value={description}
                        className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                    />

                <label>Date</label>
                    <input type="date"  onChange={handleChange('date')}
                    value={date}
                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                    />
                <label>From</label>
                    <input type="time"  onChange={handleChange('from')}
                    value={from}
                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                    />

                <label>To</label>
                    <input type="time"  onChange={handleChange('to')}
                    value={to}
                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                    />

                    <button type="submit"
                    className='mt-5 tracking-wide font-semibold bg-green-800 text-gray-100 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'>
                    Add Event
                    </button>
                </div>
                        
            </form>


        </div>


             <div className="bg-slate-700">

        <p className=' text-s xl:text-s font-extrabold text-center '>My Events</p>


             { allEvents.map((event)=>(
            <div className="bg-slate-700 bg-gray-100  rounded-lg mt-5 shadow-lg  " key={event._id}>
                      
                    <div className='ml-2 bg-slate-400 p-0 grid grid-cols-2 gap-5 rounded-lg'>
                        <div>
                            <h1 className="bg-gray- 900 font-mono font-bold text-m">{event.title}</h1> 

                               { /* <p className=" text-s">From: {event.from} To: {event.to}</p> */}

                            <p className="text-xs ">On: {event.date}</p>

                        </div>
                        
                        <div  className="flex-left ml-20">
                           <button  onClick={() => deleteEvent(event._id)} >
                            <DeleteTwoToneIcon  className=" leading-tight relative " color="action " fontSize="medium"  sx={{color:purple[900]}} ></DeleteTwoToneIcon>
                         </button>
                        </div>

                    </div>
                    
                    
                 </div>

                 ))}
             </div>
      
        </div>

      



    </div>
  );
}

export default PostEvent;


