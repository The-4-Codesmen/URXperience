import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./buttoncss.css";
import BookmarkIcon from "@mui/icons-material/Bookmark";

function RecipeOfTheDay() {
  const [Random, setRandomRecipe] = useState([]);

  useEffect(() => {
    getRandomRecipe();
  }, []);

  // const FOOD_API_KEY = "a42902460cad4a248268cab667591a2f";
  const getRandomRecipe = async () => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_FOOD_API_KEY}&number=1&instructionsRequired=true&extendedIgredients=true`
    );
    const data = await api.json();
    setRandomRecipe(data.recipes);
  };
  return (
    <>
      {Random?.map((recipe) => (
        <div
          className="rounded-lg bg-opacity-0 overflow-hidden"
          key={recipe.id}
        >
          <img className="w-full" src={recipe.image} alt={recipe.title} />
          <div className="px-6 py-4">
            <div className="flex justify-between">
              <div className="font-bold text-xl mb-2 underline">
                Feelin' Hungry 😋
              </div>
            </div>
            <h2 className="text-gray-700 text-base">{recipe.title}</h2>
            <div className="flex text-gray-700 text-base">
              <div className="mr-5">
                <i className="fas fa-utensils"></i>
              </div>
              <div className="">
                <p>{recipe.servings} plate(s)</p>
              </div>
            </div>
            <div className="flex text-gray-700 text-base">
              <div className="mr-5">
                <i className="fas fa-clock"></i>
              </div>
              <div className="">
                <p>{recipe.readyInMinutes} min(s)</p>
              </div>
            </div>
          </div>
          <Link to={"/foodscreen/RecipeList/" + recipe.id}>
            <div className="text-center rounded-b-lg p-6 bg-green-800 font-bold text-white hover:bg-green-700">
              <span>Show Details</span>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}

export default RecipeOfTheDay;
