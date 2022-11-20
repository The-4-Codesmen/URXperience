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

  const FOOD_API_KEY = '49198b4329a048b381f314c4141e6c14';
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
    <div className=" border-box rounded shadow-2xl "> 

    
      {Random.map((recipe)=>{
          return (
            
            <div className="grid grid-cols-6 gap-4 "  key={recipe.id}>


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
     
            </div>
          );

      })}
    
     
    </div>
  );
}

export default RecipeOfTheDay