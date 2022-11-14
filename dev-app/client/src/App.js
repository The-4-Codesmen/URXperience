import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './screens/Register';
import Login from './screens/Login';
import Forget from './screens/Forget';
import Activate from './screens/Activate';
import ResetPassword from './screens/ResetPassword';
import Private from './screens/Private';
import Dashboard from './screens/Dashboard';
import 'react-toastify/dist/ReactToastify.css'
import Community from './screens/Community';
import { AppContext, socket } from './context/appContext'
function App() {
  const [rooms, setRooms] = useState([])
  const [currentRoom, setCurrentRoom] = useState([])
  const [members, setMembers] = useState([])
  const [messages, setMessages] = useState([])
  const [directMemberMessage, setDirectMemberMessage] = useState({})
  const [newMessages, setNewMessages] = useState({})
  return (
    <AppContext.Provider value={{
      socket, currentRoom, setCurrentRoom, members,
      setMembers, messages, setMessages, directMemberMessage,
      setDirectMemberMessage, rooms, setRooms, newMessages,
      setNewMessages
    }}>
      <Router>
        <Routes>
          <Route path='/' exact element={<Private />} />
          <Route path='/register' exact element={<Register />} />
          <Route path='/login' exact element={<Login />} />
          <Route path='/dashboard' exact element={<Dashboard />} />
          <Route path='/chat' exact element={<Community />} />
          <Route path='/users/password/forget' exact element={<Forget />} />
          <Route path='/users/activate/:token' exact element={<Activate />} />
          <Route path='/users/password/reset/:token' exact element={<ResetPassword />} />
        </Routes>
      </Router>
    </AppContext.Provider>

  );
}

export default App;


