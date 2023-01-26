import React, { useState, useEffect, useRef, useContext } from "react";
import Logo from '../img/URX-logo.svg'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from '../context/appContext';
import ListGroup from 'react-bootstrap/ListGroup'
import { addNotifications, resetNotifications } from '../features/userSlice'
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import axios from 'axios'
import Select from 'react-select'
import { ToastContainer, toast } from "react-toastify";
// import { forEach } from "lodash";
const SideBar = () => {
    const sideBarRef = useRef()
    function toogleSideBar() {
        sideBarRef.current.classList.toggle('-translate-x-full')
    }
    const { user } = useSelector((state) => state.user)
    const [groupName, setGroupName] = useState("");
    const [selectedMember, setSelectedMember] = useState([])
    const [popUp, setPopUp] = useState(false)


    
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { socket, currentRoom, setCurrentRoom, members,
        setMembers, directMemberMessage,
        setDirectMemberMessage, rooms, setRooms, groupRooms, setGroupRooms } = useContext(AppContext)
    var stringRoom = user.faculty
    function joinRoom(room, isPublic = true) {
        if (!user) {
            navigate('/login')
        }
        socket.emit('join-room', room, currentRoom);
        setCurrentRoom(room)
        if (isPublic) {
            setDirectMemberMessage(null)
        }
        //dispatch notifications
        dispatch(resetNotifications(room));

        // socket.off('notifications').on('notifications', (room) => {
        //     dispatch(addNotifications(room));
        // })
    }
    socket.off('notifications').on('notifications', (room) => {
        if (currentRoom !== room) dispatch(addNotifications(room))
    })
    useEffect(() => {
        setCurrentRoom(stringRoom)
        getAttributedRoom()
        getGroupChatRooms()
        socket.emit('join-room', stringRoom)
        socket.emit("new-user")
    }, [])
    // useEffect(()=>{
    //     console.log("")
    // },[groupRooms])
    socket.off('new-user').on('new-user', (payload) => {    
        setMembers(payload)
    })
    function getAttributedRoom() {
        axios.get("http://localhost:5000/api/rooms").then((res) => {
            setRooms(res.data)
        })
    }
    function getGroupChatRooms(){
        axios.post(`http://localhost:5000/api/groupRooms`, {userId:user._id})
        .then(res => {
            setGroupRooms(res.data)
        })
    }
    function handleLeaveChat(e) {
        e.preventDefault()
        socket.emit('leave-chat')
        window.location.replace('/dashboard')
    }    
    function sortIds(id1, id2) {
        if (id1 > id2) {
            return id1 + '-' + id2
        } else {
            return id2 + '-' + id1
        }
    }
const options = members.map((member, idx)=>{
    return({label:member.name, value:member._id})
})
const excludeditem = [`${user._id}`]
const filteredList = options.filter(({value})=>!excludeditem.includes(value))

const handelSelectedItems = (selectedOption) => {
   setSelectedMember(selectedOption)
};
    
const  getdatafromsource= selectedMember.map((member, idx)=>{
    return (member.value)
})
async function handleGroupCreate(e){
    e.preventDefault()
    if(!groupName){
        toast.error("Please Enter groupName");
    }else if( selectedMember.length < 2){
        toast.error("Please select at least 2 memebers");
    }else{   
        const additonalMember = `${user._id}`
        // console.log(getdatafromsource) 
        getdatafromsource.push(additonalMember)
        await socket.emit("group-chat", user._id, groupName,getdatafromsource)
        getGroupChatRooms()
        setPopUp(false);
    }
   // cnsole.log(groupRooms)
    // console.log(getdatafromsource) 
}


// async function createGroup(e) {
//     e.preventDefault();
//    await socket.emit("group-chat", user.name, groupName, memberArray);
//    groupRooms.push(groupName); 
// }
function handleDirectMemberMessage(member) {
    setDirectMemberMessage(member)
    const roomID = sortIds(user._id, member._id)
    joinRoom(roomID, false)
}
    return (
        <div className="md:sticky md:top-0 z-50 text-white">
            {/* MOBILE SIDEBAR */}
            <div className="bg-green-800 flex justify-between p-2 items-center sticky top-0 z-30">

                <p className="block text-white font-extrabold dark:text-dw">URXPERIENCE CHAT</p>
                <button

                    className="rounded text-3l"
                    onClick={toogleSideBar}
                >
                    <img src={Logo} className="mr-2 h-10 sm:h-9" alt="Logo" />
                </button>
            </div>
            {/* MAIN SIDEBAR */}
            <div
                ref={sideBarRef}
                className="bg-green-800 w-72 px-5 py-4 absolute space-y-4 inset-y-0 left-0 transform -translate-x-full
          md:relative md:translate-x-0 z-50 transition duration-200 ease-in-out flex flex-col child:transition-all h-full md:sticky md:top-0"
            >
                <h1 className="block text-white text-lg font-extrabold dark:text-dw mt-0">
                    URXPERIENCE CHAT
                </h1>
                <h2 className="text-lg font-extrabold">Avaliable Room:</h2>
                {/* <div className='flex flex-col items-center'>


                </div> */}
                <ListGroup>
                    {rooms.map((room) => (
                        room.label === user.faculty ?
                            <ListGroup.Item
                                key={room._id} onClick={() => joinRoom(room.label)}
                                active={room === currentRoom}
                                className='w-full cursor-pointer max-w-xs font-bold shadow-sm rounded-lg py-3
                                bg-green-700 text-white flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:bg-green-600 
                                focus:shadow-sm focus:shadow-outline mt-1'>
                                <i className='fa-solid fa-book fa 1x w-6  -ml-2 text-white' />
                                {room.label}
                                <div className='ml-2'>
                                {currentRoom !== room && 
                                <Badge badgeContent={user?.newMessages[room.label]} color="primary">
                                    <MailIcon sx={{ color: "white" }} />
                                </Badge>}
                                </div>
                            </ListGroup.Item> : null
                    ))}
                </ListGroup>
                <div className='flex flex-col items-center'>
                    <button
                        className='w-full cursor-pointer max-w-xs font-bold shadow-sm rounded-lg py-3
                                bg-green-700 text-white flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:bg-green-600 focus:shadow-sm focus:shadow-outline mt-5'
                        onClick={()=>setPopUp(true)}
                    >
                        <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2 text-white' />
                        <span className='ml-4'>Create Group</span>
                    </button>
                </div>
                {popUp && (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl text-black font-semibold mr-10 ">
                
                    
                    Create Group Chat
                  </h3>
                  <button
                    className="ml-auto bg-transparent border-0 text-green-800 hover:text-green-700 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setPopUp(false)}
                  >
                    <i className='fa fa-times 1x w-6  -ml-2' />
                  </button>
                </div>
                {/*body*/}
                <div className="text-center p-6 flex-auto">
                    <input type="text" className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-md text-black focus:outline-none focus:border-gray-400 focus:bg-white " placeholder="Group Chat Name"onChange={(e)=>setGroupName(e.target.value)}/>
                </div>
                <Select
                    placeholder="Select member"
                    isMulti
                    name="members"
                    options={filteredList}
                    onChange={handelSelectedItems}
                    className="basic-multi-select text-black"
                    classNamePrefix="select"
                />
                {/*footer*/}
                <div className="text-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-green-800 text-white rounded font-bold uppercase text-sm px-6 py-2 rounded hover:bg-green-700"
                    type="button"
                   
                    onClick={handleGroupCreate}
                  >
                    Create Chat
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-20 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
                {/* for members who joined the chat */}
                <h2 className="text-lg font-extrabold">Online Members:</h2>

                <div className="container overflow-y-scroll rounded bg-green-800 px-2 font-medium border border-green-800" style={{ height: '300px' }}>                 
                    {members.map((member, idx) => (
                        member._id === user._id ? <ListGroup.Item key={idx} className="hidden"></ListGroup.Item>
                            : <ListGroup.Item key={member._id}
                                className='w-full cursor-pointer max-w-xs font-bold shadow-sm rounded-lg py-3
                                bg-green-700 text-white flex items-center justify-center transition-all 
                                duration-300 ease-in-out focus:outline-none hover:bg-green-600 
                                focus:shadow-sm focus:shadow-outline mt-5'
                                active={directMemberMessage?._id === member?._id} onClick={() => handleDirectMemberMessage(member)}>
                                <div className='flex gap-2 flex-row p-2'>
                                    <div className = "flex-1" >
                                        {member.status === "online" ? <i className="fas fa-circle text-green-300 "></i>
                                            : <i className="fas fa-circle text-red-600"></i>}
                                    </div>
                                    <div>{member.name}</div>
                                    <Badge badgeContent={user?.newMessages[sortIds(member._id, user._id)]} color="primary">
                                        <MailIcon sx={{ color: "white" }} />
                                    </Badge>
                                </div>
                            </ListGroup.Item>
                            // sort by status
                    )).sort((a,b)=>a.status > b.status ? -1 : 1)} 
                </div>
                {/* For newly created group chats */}
                <h2 className="text-lg font-extrabold">Group Chat:</h2>
                <div className="container overflow-y-scroll rounded bg-green-800 px-2 font-medium border border-green-800" style={{ height: '300px' }}>                 
                {groupRooms.map((room) => (
                            <ListGroup.Item
                                key={room._id} onClick={() => joinRoom(room.name)}
                                active={room === currentRoom}
                                className='w-full cursor-pointer max-w-xs font-bold shadow-sm rounded-lg py-3
                                bg-green-700 text-white flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:bg-green-600 
                                focus:shadow-sm focus:shadow-outline mt-1'>
                                <i className='fa-solid fa-book fa 1x w-6  -ml-2 text-white' />
                                {room.name}
                                <div className='ml-2'>
                                {currentRoom !== room && 
                                <Badge badgeContent={user?.newMessages[room.name]} color="primary">
                                    <MailIcon sx={{ color: "white" }} />
                                </Badge>}
                                </div>
                            </ListGroup.Item>
                    ))}
                </div>
                
{/* 
                { groupRooms.map((event)=>(
                <div className="bg-slate-700 bg-gray-100  rounded-lg mt-5 shadow-lg  " key={event._id}>
                      <p>{event.name}</p>
                      {console.log(event.name)}
                   </div>

                 ))} */}



                <div className='flex flex-col items-center'>
                    <button
                        className='w-full cursor-pointer mt-56 max-w-xs font-bold shadow-sm rounded-lg py-3
                                bg-green-700 text-white flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:bg-green-600 focus:shadow-sm focus:shadow-outline mt-5'
                        onClick={handleLeaveChat}
                    >
                        <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2 text-white' />
                        <span className='ml-4'>Leave Chat</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SideBar