import { io } from "socket.io-client";
import React from "react";

export const socket = io.connect(process.env.REACT_APP_SERVER);
//app context
export const AppContext = React.createContext();
