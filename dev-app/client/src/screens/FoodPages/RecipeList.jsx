import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { sanitize } from "dompurify";
import image from "../../img/recipelistBG.jpg";
import Navbar from "../Navbar";
import axios from "axios";
function RecipeList() {
  const [recipeDetail, setRecipeDetail] = useState({});
  let params = useParams();
  const apiURL = `${process.env.REACT_APP_FOOD_API_RECIPE_INFO}${params.id}/information`;
  const api = async () => {
    const datafetch = await axios.get(apiURL, {
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_FOOD_API_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_FOOD_API_HOST,
      },
    });
    setRecipeDetail(datafetch.data);
  };

  useEffect(() => {
    api(params.id);
  }, []);
  return (
    <div
      className="min-h-screen text-gray-900 text-center"
      style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}
    >
      <Navbar />
      <div className="flex mt-10 justify-center">
        <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5">
          <div className="backdrop-filter backdrop-blur-xl rounded-lg overflow-hidden shadow-lg">
            <img className="w-full" src={recipeDetail.image} alt="River" />
            <div className="px-6 py-4">
              <div className="flex justify-between">
                <div className="font-bold text-xl mb-2 text-left text-black">
                  {recipeDetail.title}
                </div>
              </div>
              <p className="text-black text-base text-left">
                <strong>Servings: </strong>
                {recipeDetail.servings} plate(s)
              </p>
              <p className="text-black text-base text-left">
                <strong>Prep Time: </strong>
                {recipeDetail.readyInMinutes} mins
              </p>
              <p className="text-black text-xl underline text-base text-center mt-2">
                <strong>Ingredients</strong>
              </p>
              <div
                className="container overflow-y-scroll"
                style={{ height: "300px" }}
              >
                <div className="grid grid-cols-2 grid-flow-rows gap-2 mt-2">
                  {recipeDetail.extendedIngredients?.map((ingredients, idx) => (
                    <div key={idx}>
                      <div className="bg-white w-fit rounded-lg p-3 shadow-lg items-center">
                        <img
                          src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredients.image}`}
                        />
                        <p>{ingredients.original}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Link to={"/foodscreen/"}>
                <button className="mt-10 w-full text-center bg-green-800 p-2 rounded-lg text-white font-bold hover:bg-green-700 text-left">
                  Back to Recipes
                </button>
              </Link>
            </div>
          </div>
          <div className="backdrop-filter backdrop-blur-xl rounded-lg xl:h-full overflow-hidden shadow-lg">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 underline text-left">
                Summary
              </div>
              <p
                className="text-left text-black"
                dangerouslySetInnerHTML={{
                  __html: sanitize(recipeDetail.summary),
                }}
              />
              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm tracking-wide font-medium bg-black transform translate-y-1/2"></div>
              </div>
              <div className="font-bold text-left text-xl mb-2 underline">
                Instructions
              </div>
              <p
                className="text-left text-black"
                dangerouslySetInnerHTML={{
                  __html: sanitize(
                    recipeDetail?.instructions !== null
                      ? recipeDetail.instructions
                      : "Sorry no instructions avaliable yet!"
                  ),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeList;
