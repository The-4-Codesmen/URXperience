import { Grid } from "@material-ui/core";
import React from "react";
import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import Navbar from "../Navbar";
import { NavLink, Navigate, useNavigate, useLocation } from "react-router-dom";

import "../FoodComponents/buttoncss.css";
function IngredientSearched() {
  // const FOOD_API_KEY = '49198b4329a048b381f314c4141e6c14';

  const [Options, setOptions] = useState([]);
  let params = useParams();
  // const stateParamVal = useLocation().state.stateParam;
  // console.log(stateParamVal)

  console.log(params.type);

  useEffect(() => {
    getOptions(params.type);
  }, [params.type]);

  const getOptions = async (name) => {
    console.log("search page  " + name);

    const api = await fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_FOOD_API_KEY}&ingredients=${name}&number=4`
    );
    const data = await api.json();
    console.log(data);

    setOptions(data);
  };

  return (
    <div className="min-h-screen bg-gray-200 text-gray-900 text-center">
      <Navbar />
      <div className="mt-20 grid p-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 auto-cols-auto">
        {Options?.map((recipe) => (
          <div
            className="bg-gray-100 rounded-lg p-3 shadow-lg items-center"
            key={recipe.id}
          >
            <div className="rounded-lg">
              <h4 className="text-center mb-2 font-bold">{recipe.title}</h4>
              <img
                className="w-full rounded-2xl"
                src={recipe.image}
                alt={recipe.title}
              />
            </div>
            <Link to={"/foodscreen/RecipeList/" + recipe.id}>
              <button className="mt-2 text-center w-full bg-green-800 p-2 rounded-lg text-white font-bold hover:bg-green-700 text-left">
                <span>Show Details </span>
              </button>
            </Link>
          </div>
        ))}
      </div>
      <Link to={"/foodscreen"}>
        <button className="mb-5 p-2 justify-center text-center bg-green-700 rounded-lg text-white font-bold hover:bg-green-600">
          <span>Back to Recipe</span>
        </button>
      </Link>
    </div>
  );
}

export default IngredientSearched;
