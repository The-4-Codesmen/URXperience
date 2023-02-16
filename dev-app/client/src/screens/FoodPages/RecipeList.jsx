import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { red } from "@mui/material/colors";
import { sanitize } from "dompurify";
import image from "../../img/recipelistBG.jpg";
import Navbar from "../Navbar";
function RecipeList() {
  // const FOOD_API_KEY = "a42902460cad4a248268cab667591a2f";
  const [recipeDetail, setRecipeDetail] = useState({});
  const [text, ext] = useState({});
  //const [iext,ext] = useState()
  let params = useParams();
  const api = async () => {
    const datafetch = await fetch(
      `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_FOOD_API_KEY}`
    );

    const data = await datafetch.json();
    setRecipeDetail(data);
    //console.log(data);
  };

  useEffect(() => {
    api(params.id);
  }, [params.id]);
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
                  {recipeDetail.extendedIngredients?.map((ingredients) => (
                    <div key={ingredients.id}>
                      <div className="bg-white rounded-lg p-3 shadow-lg items-center">
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
                <button className="mt-10 bg-green-800 p-2 rounded-lg text-white font-bold hover:bg-green-700 text-left">
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
                  __html: sanitize(recipeDetail.instructions),
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

{
  /* <div className="  box-border my-12 mx-auto px-4   "  >

      


<div class="grid grid-cols-6 gap-4 bg-gradient-to-r from-green-100 to-yellow-100 rounded-2xl">
  <div class="col-start-2 col-span-4 ...">
   <h1 className="text-center font-bold  text-2xl  p-[1rem]"> {recipeDetail.title}</h1><br></br>

  </div>

  <div class="col-start-1 col-end-3 row-end-3 ...   ">

    <img className="box-border w-128 rounded-3xl shadow-lg " src={recipeDetail.image} alt ={recipeDetail.title}/>
    <br></br>
    <br></br>
      <div   className = "shadow-lg ">
      <h2 className="font-semibold text-gray-500"> Cooking Time: {recipeDetail.readyInMinutes} </h2> 
      <h2 className="font-semibold text-gray-500"> Total Number of Servings: {recipeDetail.servings} </h2> <br></br> 
      
      
    </div>
    <br></br>
    <div className= "show_detail_link">
      <Link to={"/foodscreen/"}>   
          <button className="recipebtn"  >Back to Recipes</button>
      </Link> 
      <FavoriteRoundedIcon className="justify-between leading-tight relative left-20 " color="action " fontSize="large"  sx={{color:red[500]}} ></FavoriteRoundedIcon>
      
      
      </div>
    </div>
   
   

  <div class="col-start-4 col-span-4  ... ">
      <h2 className="font-bold text-xl shadow-lg">Summary</h2><br></br>
    <h3 className="font-light text-lg"  dangerouslySetInnerHTML={{ __html: sanitize(recipeDetail.summary)}}></h3> <br></br>
    
    <div>
    <h2 className="font-bold text-xl shadow-lg">Instructions</h2><br></br>
    <div>
    <div dangerouslySetInnerHTML={{ __html: sanitize(recipeDetail.instructions)}}/>
    </div>

    <ol >
      <ol style={{listStyle: 'inside'}}>
        <li>fe</li>
        <li>le</li>
        <li>leee</li>
        <li>ro</li>
      </ol>
    </ol>
    </div>
  
  </div>



  
</div>

  
   
  
             

</div> */
}
