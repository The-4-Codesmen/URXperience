import React, { useState, useContext, useRef, useEffect } from "react";
import { AppContext } from "../../context/appContext";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import image from "../../img/chatBG.jpg";
import image2 from "../../img/chatBG2.jpg";
const MessageForm = () => {
  const [message, setMessage] = useState("");
  const [toggle, setToggle] = useState(false);
  const { socket, currentRoom, messages, setMessages, directMemberMessage } =
    useContext(AppContext);
  const messageEndRef = useRef(null);
  const { user } = useSelector((state) => state?.user);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  function handleToggle() {
    if (toggle == false) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }
  function retrieveFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;
    let day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;
    return month + "/" + day + "/" + year;
  }
  function scrollToBottom() {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }
  const presentDate = retrieveFormattedDate();
  socket.off("room-messages").on("room-messages", (roomMessages) => {
    setMessages(roomMessages);
  });
  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!message) {
      toast.error("Please input something!");
    } else {
      const today = new Date();
      const time = formatAMPM(today);
      const roomID = currentRoom;
      socket.emit("message-room", roomID, message, user, time, presentDate);
    }
    setMessage("");
  }
  return (
    <div className="">
      <ToastContainer />
      <div className="float-right mb-5">
        <label className="flex select-none items-center space-x-4">
          <div className="relative cursor-pointer">
            <div
              onClick={handleToggle}
              className="h-5 w-14 rounded-lg bg-gray-200 shadow-inner "
            ></div>
            <div
              onClick={handleToggle}
              className={`${
                toggle
                  ? "dot shadow-switch-1 absolute right-0 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-white"
                  : "dot shadow-switch-1 absolute left-0 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-white"
              }`}
            >
              <span
                className={`${
                  toggle
                    ? "active h-4 w-4 rounded-full bg-green-500"
                    : "active h-4 w-4 rounded-full bg-gray-300"
                }`}
              ></span>
            </div>
          </div>
          <div className="text-white font-bold">Toggle Background</div>
        </label>
      </div>
      <div
        className="container overflow-y-scroll rounded-lg px-2 font-medium"
        style={{
          height: "720px",
          backgroundImage: `${toggle ? `url(${image})` : `url(${image2})`}`,
        }}
      >
        {user && !directMemberMessage?._id && (
          <div className="flex justify-center mt-1">
            <p className="absolute p-2 text-center w-max rounded text-white bg-green-500">
              Welcome to {currentRoom} room
            </p>
          </div>
        )}
        {user && directMemberMessage?._id && (
          <>
            <div className="flex justify-center mt-1">
              <p className="absolute p-2 text-center w-max text-white rounded bg-green-500">
                Direct messaging with {directMemberMessage.name}
              </p>
            </div>
          </>
        )}
        {user &&
          messages.map(({ _id: date, messagesByDate }, idx) => (
            <div key={idx}>
              <div className="flex items-center mt-5">
                <div className="flex-grow h-px bg-green-700"></div>
                <p className="text-green-700 text-center text-white mt-1 flex-shrink p-3">
                  {date}
                </p>
                <div className="flex-grow h-px bg-green-700"></div>
              </div>
              {messagesByDate?.map(
                ({ content, time, from: sender }, msgIdx) => (
                  <div className="flow-root p-2" key={msgIdx}>
                    {sender._id == user?._id ? (
                      <p
                        className={`text-xs underline-offset-4 text-right ${
                          toggle ? "text-white" : "text-black"
                        }`}
                      >
                        You {time}
                      </p>
                    ) : (
                      <p
                        className={`text-xs underline-offset-4 ${
                          toggle ? "text-white" : "text-black"
                        }`}
                      >
                        {sender.name} {time}
                      </p>
                    )}
                    <div
                      className={
                        sender?.email !== user?.email
                          ? "p-2 float-left max-w-xs break-all text-left rounded-t-2xl rounded-br-2xl bg-blue-400 text-white"
                          : "p-2 text-right float-right break-all max-w-xs rounded-t-2xl rounded-bl-2xl bg-green-500 text-white"
                      }
                    >
                      <p>{content}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          ))}
        <div ref={messageEndRef}></div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-col-5 grid-flow-col gap-3">
          <input
            type="text"
            placeholder="Enter Message...."
            className="w-full lg:col-span-4 md:col-span-4 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm overflow-y-scroll focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="mt-5 tracking-wide lg:w-9/12 font-semibold bg-green-800 text-gray-100 w-full rounded-lg hover:bg-green-600 transition-all duration-300 ease-in-out items-center justify-center focus:shadow-outline focus:outline-none"
          >
            <i className="fa fa-paper-plane"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
