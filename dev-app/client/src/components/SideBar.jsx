import React, { useState, useEffect, useRef, useContext } from "react";
import Logo from "../img/URX-logo.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
import ListGroup from "react-bootstrap/ListGroup";
import { addNotifications, resetNotifications } from "../features/userSlice";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import axios from "axios";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
const SideBar = () => {
  const sideBarRef = useRef();
  function toogleSideBar() {
    sideBarRef.current.classList.toggle("-translate-x-full");
  }
  const { user } = useSelector((state) => state.user);
  const [groupName, setGroupName] = useState("");
  const [selectedMember, setSelectedMember] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [groupNameCheck, setGroupNameCheck] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    socket,
    currentRoom,
    setCurrentRoom,
    members,
    setMembers,
    directMemberMessage,
    setDirectMemberMessage,
    rooms,
    setRooms,
    groupRooms,
    setGroupRooms,
  } = useContext(AppContext);
  var stringRoom = user.faculty;
  function joinRoom(room, isPublic = true) {
    if (!user) {
      navigate("/login");
    }
    socket.emit("join-room", room, currentRoom);
    setCurrentRoom(room);
    if (isPublic) {
      setDirectMemberMessage(null);
    }
    //dispatch notifications
    dispatch(resetNotifications(room));
  }
  socket.off("notifications").on("notifications", (room) => {
    if (currentRoom !== room) dispatch(addNotifications(room));
  });
  useEffect(() => {
    setCurrentRoom(stringRoom);
    getAttributedRoom();
    getGroupChatRooms();
    socket.emit("join-room", stringRoom);
    socket.emit("new-user");
    const interval = setInterval(() => {
      getGroupChatRooms();
    }, 5 * 1000);
    return () => clearInterval(interval);
  }, []);
  socket.off("new-user").on("new-user", (payload) => {
    setMembers(payload);
  });
  function getAttributedRoom() {
    //console.log(process.env.REACT_APP_SERVER);
    axios.get(`${process.env.REACT_APP_SERVER}api/rooms`).then((res) => {
      setRooms(res.data);
    });
  }
  function getGroupChatRooms() {
    axios
      .post(`${process.env.REACT_APP_SERVER}api/groupRooms`, {
        userId: user._id,
      })
      .then((res) => {
        setGroupRooms(res.data);
      });
    axios.get(`${process.env.REACT_APP_SERVER}api/groupChatArr`).then((res) => {
      setGroupNameCheck(res.data);
    });
  }
  function handleLeaveChat(e) {
    e.preventDefault();
    socket.emit("leave-chat");
    window.location.replace("/dashboard");
  }
  function sortIds(id1, id2) {
    if (id1 > id2) {
      return id1 + "-" + id2;
    } else {
      return id2 + "-" + id1;
    }
  }
  const options = members?.map((member, idx) => {
    return { label: member.name, value: member._id };
  });
  const excludeditem = [`${user._id}`];
  const filteredList = options?.filter(
    ({ value }) => !excludeditem.includes(value)
  );

  const handelSelectedItems = (selectedOption) => {
    setSelectedMember(selectedOption);
  };

  const getdatafromsource = selectedMember.map((member, idx) => {
    return member.value;
  });
  function handleGroupCreate(e) {
    e.preventDefault();
    if (!groupName) {
      toast.error("Please Enter groupName");
    } else if (selectedMember.length < 2) {
      toast.error("Please select at least 2 memebers");
    } else {
      const groupChatNames = groupNameCheck.map((chatNames, idx) => {
        return chatNames.name;
      });
      for (let i = 0; i < groupChatNames.length; i++) {
        if (groupName.trim() === groupChatNames[i]) {
          toast.error("Sorry that Chat Name is Taken");
          return;
        }
      }
      //console.log(groupChatNames)
      // // console.log(getdatafromsource)
      const additonalMember = `${user._id}`;
      getdatafromsource.push(additonalMember);
      socket.emit("group-chat", user._id, groupName.trim(), getdatafromsource);
      // getGroupChatRooms()
      setPopUp(false);
      toast.success("Chat successfully created!");
    }
  }
  function deleteGroupRoom(room) {
    try {
      axios
        .post(`${process.env.REACT_APP_SERVER}api/deletegroup`, {
          groupRoom: room,
        })
        .then((res) => {
          toast.success(res.data.msg);
          joinRoom(user.faculty);
        });
    } catch (error) {
      toast.error("Somethign went Wrong");
    }
  }
  function handleDirectMemberMessage(member) {
    setDirectMemberMessage(member);
    const roomID = sortIds(user._id, member._id);
    joinRoom(roomID, false);
  }
  return (
    <div className="md:sticky md:top-0 z-50 text-white">
      {/* MOBILE SIDEBAR */}
      <div className="bg-green-800 flex justify-between p-2 items-center sticky top-0 z-30">
        <p className="block text-white font-extrabold dark:text-dw">
          URXPERIENCE CHAT
        </p>
        <button className="rounded text-3l" onClick={toogleSideBar}>
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
        <h2 className="text-lg font-extrabold">Faculty Room:</h2>
        {/* <div className='flex flex-col items-center'>


                </div> */}
        <ListGroup>
          {rooms.map((room) =>
            room.label === user.faculty ? (
              <ListGroup.Item
                key={room._id}
                onClick={() => joinRoom(room.label)}
                active={room === currentRoom}
                className="w-full cursor-pointer max-w-xs font-bold shadow-sm rounded-lg py-3
                                bg-green-700 text-white flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:bg-green-600 
                                focus:shadow-sm focus:shadow-outline grid grid-cols-5 gap-2 items-center mb-2"
              >
                <div className="px-4">
                  <i className="fa-solid fa-book fa 1x w-6 text-white" />
                </div>
                <div className="text-center col-span-3">{room.label}</div>
                <div className=" ">
                  {currentRoom !== room && (
                    <Badge
                      badgeContent={user?.newMessages[room.label]}
                      color="primary"
                    >
                      <MailIcon sx={{ color: "white" }} />
                    </Badge>
                  )}
                </div>
              </ListGroup.Item>
            ) : null
          )}
        </ListGroup>
        {popUp && (
          <>
            <div className="ml-2 mr-2 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
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
                      <i className="fa fa-times 1x w-6  -ml-2" />
                    </button>
                  </div>
                  {/*body*/}
                  <div className="text-center p-6 flex-auto">
                    <input
                      type="text"
                      className="w-full px-8 py-4 rounded-lg font-medium 
                    bg-gray-100 border border-gray-200 placeholder-gray-500 
                    text-md text-black focus:outline-none focus:border-gray-400 
                    focus:bg-white"
                      placeholder="Group Chat Name"
                      onChange={(e) => setGroupName(e.target.value)}
                    />
                  </div>
                  <div
                    className="w-full  px-6 py-3 rounded-lg font-medium 
                    bg-gray-100 border border-gray-200 placeholder-gray-500 
                    text-md text-black focus:outline-none focus:border-gray-400 
                    focus:bg-white"
                  >
                    <Select
                      placeholder="Select member"
                      isMulti
                      name="members"
                      options={filteredList}
                      onChange={handelSelectedItems}
                      className="basic-multi-select text-black"
                      classNamePrefix="select"
                    />
                  </div>
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
            {/* {console.log(groupNameCheck.name)} */}
          </>
        )}
        {/* for members who joined the chat */}
        <h2 className="text-lg font-extrabold">Members:</h2>
        <div
          className="container overflow-y-scroll rounded bg-green-800 px-2 font-medium border border-green-800"
          style={{ height: "250px" }}
        >
          {members
            ?.map(
              (member, idx) =>
                member._id === user._id ? (
                  <ListGroup.Item
                    key={idx}
                    className="hidden "
                  ></ListGroup.Item>
                ) : (
                  <ListGroup.Item
                    key={member._id}
                    className="w-full cursor-pointer max-w-xs font-bold shadow-sm rounded-lg py-3
                                bg-green-700 text-white justify-center transition-all 
                                duration-300 ease-in-out focus:outline-none hover:bg-green-600 
                                focus:shadow-sm focus:shadow-outline mt-5 grid grid-cols-5 gap-2 items-center"
                    active={directMemberMessage?._id === member?._id}
                    onClick={() => handleDirectMemberMessage(member)}
                  >
                    <div className="col-span-1 px-2">
                      {member.status === "online" ? (
                        <i className="fas fa-circle text-green-300 "></i>
                      ) : (
                        <i className="fas fa-circle text-red-600"></i>
                      )}
                    </div>
                    <div className=" text-center col-span-3">{member.name}</div>
                    <div className="col-span-1">
                      <Badge
                        className="col-span-2"
                        badgeContent={
                          user?.newMessages[sortIds(member._id, user._id)]
                        }
                        color="primary"
                      >
                        <MailIcon sx={{ color: "white" }} />
                      </Badge>
                    </div>
                  </ListGroup.Item>
                )
              // sort by status
            )
            .sort((a, b) => (a.status > b.status ? -1 : 1))}
        </div>
        {/* For newly created group chats */}
        <div className="grid grid-cols-5 gap-2  items-center ">
          <h2 className="text-lg col-span-4 font-extrabold">Group Chat:</h2>
          <button
            className="w-full cursor-pointer max-w-xs font-bold shadow-sm rounded-lg py-3
                                bg-green-700 text-white items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:bg-green-600 focus:shadow-sm focus:shadow-outline"
            onClick={() => setPopUp(true)}
          >
            <i className="fa fa-plus text-white" />
          </button>
        </div>
        <div
          className="container overflow-y-scroll rounded bg-green-800 px-2 font-medium border border-green-800"
          style={{ height: "150px" }}
        >
          {groupRooms.map((room) => (
            <ListGroup.Item
              key={room._id}
              onClick={() => joinRoom(room.name)}
              active={room === currentRoom}
              className="w-full cursor-pointer max-w-xs font-bold shadow-sm rounded-lg py-3
                                bg-green-700 text-white justify-center transition-all duration-300 ease-in-out focus:outline-none hover:bg-green-600 
                                focus:shadow-sm focus:shadow-outline mt-3 grid grid-cols-5 gap-2 items-center"
            >
              <div className="col-span-1 px-4">
                {room.creator === user._id ? (
                  <i
                    className="fas fa-trash-alt text-white hover:text-red-600"
                    onClick={() => deleteGroupRoom(room.name)}
                  />
                ) : (
                  <i className="fa fa-users" aria-hidden="true" />
                )}
              </div>
              <div className=" text-center col-span-3">{room.name}</div>
              <div className="col-span-1">
                {currentRoom !== room && (
                  <Badge
                    badgeContent={user?.newMessages[room.name]}
                    color="primary"
                  >
                    <MailIcon sx={{ color: "white" }} />
                  </Badge>
                )}
              </div>
            </ListGroup.Item>
          ))}
        </div>
        <div className="flex flex-col items-center">
          <button
            className="w-full cursor-pointer max-w-xs font-bold shadow-sm rounded-lg py-3
                                bg-red-700 text-white flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:bg-red-600 focus:shadow-sm focus:shadow-outline"
            onClick={handleLeaveChat}
          >
            <i className="fas fa-sign-in-alt fa 1x w-6  -ml-2 text-white" />
            <span className="ml-4">Leave Chat</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
