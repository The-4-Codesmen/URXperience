import { Grid } from '@material-ui/core';
import React from 'react';
import { useEffect, useState } from "react";

import {Link,useParams} from "react-router-dom";
import {Card, Button} from "react-bootstrap";
import Navbar from '../Navbar';


import '../FoodComponents/buttoncss.css';
function Option() {


  const FOOD_API_KEY = 'fafea13599c5427bbf16f0e730c9b0c3';
    const [Options, setOptions]= useState([]);
    let params=useParams();


    useEffect(()=>{

    getOptions(params.type);

    },[params.type]);

   
  const getOptions = async(name) =>{

   //49198b4329a048b381f314c4141e6c14

    const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${FOOD_API_KEY}&number=4&tags=${name}&instructionsRequired=true`);
    const data = await api.json();
        // console.log(data)
  
        setOptions(data.recipes)

        
      


  };


  
  return (
    <div className="min-h-screen bg-gray-200 text-gray-900 text-center">
      <Navbar/>
          <div className="mt-20 grid p-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 auto-cols-auto"> 
      {Options.map((recipe)=>(
            <div className="bg-gray-100 rounded-lg p-3 shadow-lg items-center" key={recipe.id}>
                      
                    <div className='rounded-lg'>
                     <h4 className="text-center mb-2 font-bold">{recipe.title}</h4>
                       <img className="w-full rounded-2xl" src={recipe.image} alt ={recipe.title}/>   
                    </div>
                    <Link  to={"/foodscreen/RecipeList/" +recipe.id}>   
                      <button  className ="mt-2 text-center w-full bg-green-800 p-2 rounded-lg text-white font-bold hover:bg-green-700 text-left"><span>Show Details </span></button>
                    </Link>
                </div>

      ))}

    </div>
    <Link  to={"/foodscreen"}>   
           <button  className ="mb-5 p-2 justify-center text-center bg-green-700 rounded-lg text-white font-bold hover:bg-green-600"><span>Back to Recipe</span></button>
        </Link>
    </div>

  );

}



export default Option