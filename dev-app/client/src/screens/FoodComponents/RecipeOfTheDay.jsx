import React from 'react';
import { useEffect, useState } from "react";
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import {Link} from "react-router-dom";
import './buttoncss.css';
import { grey } from '@mui/material/colors';
import BookmarkIcon from '@mui/icons-material/Bookmark';

function RecipeOfTheDay() {
  const [Random, setRandomRecipe]= useState([]);

  useEffect(()=>{
    getRandomRecipe();
  },[]);

  const FOOD_API_KEY = 'a42902460cad4a248268cab667591a2f';
  const getRandomRecipe = async() =>{

      const Storagecheck = localStorage.getItem('Randomss');
      if(Storagecheck){
        setRandomRecipe(JSON.parse(Storagecheck));
      }else{

        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${FOOD_API_KEY}&number=1&instructionsRequired=true&extendedIgredients=true`)
        const data = await api.json();
        console.log(data);
        localStorage.setItem('Randomss', JSON.stringify(data.recipes));
        setRandomRecipe(data.recipes);

        
      }



  };


  
  return (
    <>
          {Random.map((recipe)=>(
            <div className="rounded-lg overflow-hidden shadow-lg" key={recipe.id}>
            <img className="w-full" src={recipe.image} alt ={recipe.title}/>
            <div className="px-6 py-4">
              <div className="flex justify-between">
              <div className="font-bold text-xl mb-2 underline">Recipe of The Day</div>
              <BookmarkIcon className="text-gray-300" color="action " fontSize="large"></BookmarkIcon>
              </div>
              <h2 className="text-gray-700 text-base">
                {recipe.title}
              </h2>
              <p className="text-gray-700 text-base">
                <strong>Servings: </strong>{recipe.servings} plate(s)
              </p>
              <p className="text-gray-700 text-base">
              <strong>Prep Time: </strong>{recipe.readyInMinutes} mins
              </p>
            </div>
            <Link  to={"/foodscreen/RecipeList/" +recipe.id}>
            <div className="text-center p-6 bg-green-800 font-bold text-white hover:bg-green-700">
                <span>Show Details</span>
            </div>
            </Link> 
          </div>
      ))}
    </>
  );
}

export default RecipeOfTheDay


{/* <div className="grid grid-cols-6 gap-4 "  key={recipe.id}>


<div class="col-start-1 col-span-4 ... ">

  <img className=" block w-full z-30  shadow-2xl shadow-cyan-500/50 scale-50 hover:scale-150 ease in duration-500" src={recipe.image} alt ={recipe.title}/>

</div>

<div class=" col-end-7 col-span-2 ... ">
 
 



  <BookmarkIcon className="justify-between leading-tight relative left-72 " color="action " fontSize="large"  sx={{color:grey[500]}} ></BookmarkIcon>
  <br></br>
  <br></br>

  <h2 className="text-center justify-between leading-tight p-2 md:2 font-bold text-xl  text-bg-grey-700 w-80">{recipe.title} </h2>
 
 
  <br></br>
  <br></br>
  <br></br>

  <h2 className="font-light text-lg ">Servings: {recipe.servings}</h2>
  <h2 className="font-light text-lg ">Preparation Time: {recipe.readyInMinutes}</h2>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <div className= "show_detail_link">
    <Link  to={"/foodscreen/RecipeList/" +recipe.id}>
      <button  className ="show_more "><span>Show Details </span></button>
    </Link> 
  </div>
</div>

</div> */}