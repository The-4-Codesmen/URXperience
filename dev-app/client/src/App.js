import React, { useState } from "react";
import "@progress/kendo-theme-default/dist/all.css";
import { AppContext, socket } from "./context/appContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Forget from "./screens/Forget";
import Activate from "./screens/Activate";
import ResetPassword from "./screens/ResetPassword";
import Private from "./screens/Private";
import Dashboard from "./screens/Dashboard";
import TakeOuts from "./screens/TakeOuts";
import FoodScreen from "./screens/FoodScreen";
import Community from "./screens/Community";
import Option from "./screens/FoodPages/Option";
import RecipeList from "./screens/FoodPages/RecipeList";
import "react-toastify/dist/ReactToastify.css";
import IngredientSearched from "./screens/FoodPages/IngredientSearched";

import Events from "./screens/Events";
import PostEvent from "./screens/EventComponents/PostEvent";
import EventByDate from "./screens/EventComponents/EventByDate";
import Complaints from "./screens/Complaints";
import Confirmation from "./screens/Confimation";
function App() {
  const [rooms, setRooms] = useState([]);
  const [groupRooms, setGroupRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [directMemberMessage, setDirectMemberMessage] = useState({});
  const [newMessages, setNewMessages] = useState({});
  return (
    <AppContext.Provider
      value={{
        socket,
        currentRoom,
        setCurrentRoom,
        members,
        setMembers,
        messages,
        setMessages,
        directMemberMessage,
        setDirectMemberMessage,
        rooms,
        setRooms,
        groupRooms,
        setGroupRooms,
        newMessages,
        setNewMessages,
      }}
    >
      <Router>
        <Routes>
          <Route path="/" exact element={<Private />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/takeouts" exact element={<TakeOuts />} />
          <Route path="/chat" exact element={<Community />} />
          <Route path="/confirm" exact element={<Confirmation />} />
          <Route path="/users/password/forget" exact element={<Forget />} />
          <Route path="/users/activate/:token" exact element={<Activate />} />
          <Route
            path="/users/password/reset/:token"
            exact
            element={<ResetPassword />}
          />
          <Route path="/foodscreen" exact element={<FoodScreen />} />
          <Route path="/foodscreen/option/:type" exact element={<Option />} />

          <Route
            path="/foodscreen/ingredientsearched/:type"
            exact
            element={<IngredientSearched />}
          />
          <Route path="/events" exact element={<Events />} />
          <Route path="/postevent" exact element={<PostEvent />} />
          <Route path="/eventbydate" exact element={<EventByDate />} />
          <Route
            path="/foodscreen/recipelist/:id"
            exact
            element={<RecipeList />}
          />
          <Route path="/complaints" exact element={<Complaints />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
