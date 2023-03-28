import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function RecipeOfTheDay() {
  const [Random, setRandomRecipe] = useState([]);

  useEffect(() => {
    getRandomRecipe();
  }, []);
  const apiURL = process.env.REACT_APP_FOOD_API_RANDOM;
  const getRandomRecipe = async () => {
    const api = await axios.get(apiURL, {
      params: {
        number: 1,
        instructionsRequired: "true",
      },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_FOOD_API_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_FOOD_API_HOST,
      },
    });
    setRandomRecipe(api.data.recipes);
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
