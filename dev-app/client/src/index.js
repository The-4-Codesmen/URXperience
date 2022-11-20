import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Forget from "./screens/Forget";
import Activate from "./screens/Activate";
import ResetPassword from "./screens/ResetPassword";
import Private from "./screens/Private";
import Dashboard from "./screens/Dashboard";
import TakeOuts from "./screens/TakeOuts";
import FoodScreen from "./screens/FoodScreen";

import "react-toastify/dist/ReactToastify.css";
import Community from "./screens/Community";
//import FoodRoutes from "./screens/FoodPages/FoodRoutes";

//food routes 

import Option from "./screens/FoodPages/Option";
import RecipeList from "./screens/FoodPages/RecipeList";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(


  <Router>
    <Routes>
      <Route path="/" exact element={<Private />} />
      <Route path="/register" exact element={<Register />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/dashboard" exact element={<Dashboard />} />
      <Route path="/chat" exact element={<Community />} />
      <Route path="/users/password/forget" exact element={<Forget />} />
      <Route path="/users/activate/:token" exact element={<Activate />} />
     
      <Route
        path="/users/password/reset/:token"
        exact
        element={<ResetPassword />}
      />
      <Route path="/takeouts" exact element={<TakeOuts />} />

      {/* <Route path="/type" exact element={<FoodRoutes/>} />
      <Route Path="/recipedetails" exact element={<RecipeDetails/>}/> */}

      
      <Route path="/foodscreen" exact element={<FoodScreen/>} />
      <Route path="/foodscreen/option/:type" exact element={<Option/>}/>
      <Route path="/foodscreen/recipelist/:id" exact element={<RecipeList/>}/>


      </Routes>
</Router>
);
