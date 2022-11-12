import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { updateUser, isAuth, getCookie, signout } from "../helpers/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import App from "../App";
import { Card, Button } from "react-bootstrap";

const FoodScreen = () => {
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/random.php")
      .then(({ data }) => setMeals(data.meals))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="min-h-screen bg gray-100 text-gray-900 flex justify-center">
      <h1>Recipe Of The Day</h1>

      <div>
        <br></br>
        {meals.map((meal) => (
          <div key={meal.idMeal}>
            {meal.strMeal}

            <Card style={{ width: "18ren" }}>
              <Card.Img variant="top" src={meal.strMealThumb} width="200px" />
              <Card.Body>
                <Card.Title src={meal.idMeal}></Card.Title>
                <Card.Text>Some quick test example</Card.Text>
                <Button variant="primary">Show Details</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodScreen;
