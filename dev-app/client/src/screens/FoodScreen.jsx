import React from "react";
import Navbar from "./Navbar";
import TakeoutImage from "../img/TakeoutMap.jpg";
import { Link } from "react-router-dom";
import RecipeOfTheDay from "./FoodComponents/RecipeOfTheDay";
import TopCategory from "./FoodComponents/TopCategory";
import IngredientSearched from "./FoodPages/IngredientSearched";

function FoodScreen() {
  return (
    <div className="min-h-screen bg gray-100 text-gray-900 flex justify-center">
      <Navbar />

      <div className="mt-16 p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        <RecipeOfTheDay />
        <TopCategory />
        <div className="rounded-lg overflow-hidden bg-opacity-0 ">
          <img className="w-full" src={TakeoutImage} alt="River" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 underline">Takeouts</div>
            <p className="text-gray-700 text-base">Don't wanna cook?</p>
          </div>
          <Link to={"/Takeouts"}>
            <div className="text-center rounded-b-lg p-6 bg-green-800 font-bold text-white hover:bg-green-700">
              <span>Show More</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FoodScreen;
