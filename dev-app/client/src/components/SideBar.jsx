import React, { useEffect, useRef, useContext } from "react";
import Logo from '../img/URX-logo.svg'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from '../context/appContext';
import ListGroup from 'react-bootstrap/ListGroup'
import { addNotifications, resetNotifications } from '../features/userSlice'
import { useLogoutUserMutation } from "../services/appApi";
import axios from 'axios'
const SideBar = () => {
    const sideBarRef = useRef()
    function toogleSideBar() {
        sideBarRef.current.classList.toggle('-translate-x-full')
    }
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { socket, currentRoom, setCurrentRoom, members,
        setMembers, directMemberMessage,
        setDirectMemberMessage, rooms, setRooms, } = useContext(AppContext)
    var stringRoom = user.faculty
    const [logoutUser] = useLogoutUserMutation();
    useEffect(() => {
        setCurrentRoom(stringRoom)
        getAttributedRoom()
        socket.emit('join-room', stringRoom)
        socket.emit("new-user")
    }, [])
    socket.off('new-user').on('new-user', (payload) => {
        setMembers(payload)
    })
    function getAttributedRoom() {
        axios.get("http://localhost:5000/api/rooms").then((res) => {
            setRooms(res.data)
        })

    }
    function handleLeaveChat(e) {
        e.preventDefault()
        socket.emit('leave-chat')
        // console.log(user.newMessages)
        //logoutUser(tempUser);
        window.location.replace('/dashboard')
    }
    // socket.off('notifications').on('notifications', (room) => {
    //     if (currentRoom !== room) dispatch(addNotifications(room))
    // })
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
        socket.off('notifications').on('notifications', (room) => {
            dispatch(addNotifications(room));
        })
    }

    function sortIds(id1, id2) {
        if (id1 > id2) {
            return id1 + '-' + id2
        } else {
            return id2 + '-' + id1
        }
    }
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
                    {rooms.map((room, idx) => (
                        room === user.faculty ?
                            <ListGroup.Item
                                key={idx} onClick={() => joinRoom(room)}
                                active={room === currentRoom}
                                className='w-full cursor-pointer max-w-xs font-bold shadow-sm rounded-lg py-3
                                bg-green-700 text-white flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:bg-green-600 
                                focus:shadow-sm focus:shadow-outline mt-1'>
                                <i className='fa-solid fa-book fa 1x w-6  -ml-2 text-white' />
                                {room}
                                {currentRoom !== room && <span className='rounded bg-yellow-200 text-black text-center'>{console.log(user.newMessages[room])}</span>}
                            </ListGroup.Item> : null
                    ))}
                </ListGroup>
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
                                <div className='flex gap-3 flex-row'>
                                    <div >
                                        {member.status === "online" ? <i className="fas fa-circle text-green-300 "></i>
                                            : <i className="fas fa-circle text-red-600"></i>}
                                    </div>
                                    <div>{member.name}</div>

                                </div>
                            </ListGroup.Item>
                    ))}
                </div>

                <div className='flex flex-col items-center'>
                    <a
                        className='w-full cursor-pointer mt-56 max-w-xs font-bold shadow-sm rounded-lg py-3
                                bg-green-700 text-white flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:bg-green-600 focus:shadow-sm focus:shadow-outline mt-5'
                        onClick={handleLeaveChat}
                        target='_self'
                    >
                        <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2 text-white' />
                        <span className='ml-4'>Leave Chat</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SideBar