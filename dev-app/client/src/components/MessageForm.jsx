import React, { useState, useContext, useRef, useEffect } from 'react'
import { AppContext } from '../context/appContext';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
const MessageForm = () => {
    const [message, setMessage] = useState("")
    const { socket, currentRoom, messages, setMessages, directMemberMessage } = useContext(AppContext)
    const messageEndRef = useRef(null)
    const { user } = useSelector((state) => state.user)

    useEffect(()=>{
        messageEndRef.current?.scrollIntoView({ behaviour: "smooth" })
        socket.off('room-messages').on('room-messages', (roomMessages) => {
            //console.log(roomMessages)
            setMessages(roomMessages)
        })
    },[messages])
    // useEffect(() => {
    //     //scroll to bottom everytime message is sent
    //     messageEndRef.current?.scrollIntoView({ behaviour: "smooth" })
    // }, [])

    function retrieveFormattedDate() {
        const date = new Date();
        const year = date.getFullYear();
        let month = (1 + date.getMonth()).toString()
        month = month.length > 1 ? month : '0' + month;
        let day = date.getDate().toString()
        day = day.length > 1 ? day : '0' + day
        return month + "/" + day + "/" + year
    }
    const presentDate = retrieveFormattedDate()

    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!message){
            toast.error("Please input something!");
        }else{                                     
            const today = new Date()
            const time = formatAMPM(today)
            const roomID = currentRoom;     
            socket.emit('message-room',roomID, message, user, time, presentDate)
        }
        setMessage('')
    }
    return (
        <div className="lg:mt-12 md:mt-12">
                  <ToastContainer />
            <div className="container overflow-y-scroll rounded-lg bg-gray-200 px-2 font-medium border border-gray-200" style={{ height: '720px' }}>
                {user && !directMemberMessage?._id &&
                    <div className="flex justify-center mt-1">
                        <p className="absolute p-2 text-center w-max rounded text-white bg-green-500">
                            Welcome to {currentRoom} room
                        </p>
                    </div>
                }
                {user && directMemberMessage?._id && (
                    <>
                        <div className="flex justify-center mt-1">
                            <p className="absolute p-2 text-center w-max text-white rounded bg-green-500">
                                Direct messaging with {directMemberMessage.name}
                            </p>
                        </div>
                    </>
                )}
                {user && messages.map(({ _id: date, messagesByDate }, idx) => (
                    <div key={idx}>
                        <div className="flex items-center mt-5" >
                            <div className="flex-grow h-px bg-green-700"></div>
                            <p className="text-green-700 text-center text-white mt-1 flex-shrink p-3">
                                {date}
                            </p>
                            <div className="flex-grow h-px bg-green-700"></div>
                        </div>
                        {messagesByDate?.map(({ content, time, from: sender }, msgIdx) => (
                            <div className="flow-root p-2" key={msgIdx}>
                                <div className={sender._id !== user?._id ? "p-2 float-left w-6/12 text-left rounded bg-yellow-100"
                                    : "p-2 text-right float-right w-6/12 rounded bg-green-100"}>
                                    <p className="text-sm underline underline-offset-4">{sender._id == user?._id ? "You" : sender.name}</p>
                                    <p>{content}</p>
                                    <p className="text-xs">Sent @ {time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
                <div ref={messageEndRef}></div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-col-5 grid-flow-col gap-3">
                    <input type="text" placeholder='Enter Message....'
                        className='w-full lg:col-span-4 md:col-span-4 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm overflow-y-scroll focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button type="submit"
                        className='mt-5 tracking-wide lg:w-9/12 font-semibold bg-green-800 text-gray-100 w-full rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out items-center justify-center focus:shadow-outline focus:outline-none'
                    >
                        <i className="fa fa-paper-plane"></i>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default MessageForm