import { io } from 'socket.io-client'
import React from 'react'

const SOCKET_URL = "http://localhost:5000/";
export const socket = io.connect(SOCKET_URL)
//app context
export const AppContext = React.createContext()