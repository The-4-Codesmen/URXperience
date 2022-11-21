import { Grid } from '@material-ui/core';
import React from 'react';
import { useEffect, useState } from "react";

import {Link,useParams} from "react-router-dom";
import {Card, Button} from "react-bootstrap";



import '../FoodComponents/buttoncss.css';
function Option() {


  const FOOD_API_KEY = '49198b4329a048b381f314c4141e6c14';
    const [Options, setOptions]= useState([]);
    let params=useParams();


    useEffect(()=>{

    getOptions(params.type);

    },[params.type]);

   
  const getOptions = async(name) =>{

   //49198b4329a048b381f314c4141e6c14

    const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${FOOD_API_KEY}&number=4&tags=${name}&instructionsRequired=true`);
    const data = await api.json();
        console.log(data)
  
        setOptions(data.recipes)

        
      


  };


  
  return (<Grid className="">
    <div className="grid grid-cols-4 gap-8  grid-flow-col auto-cols-auto"> 

      {Options.map((recipe)=>{
          return (
            <div   key={recipe.id}>
                      
                        <Card className=' '>
                     <h4 className="text-center gap-y-7 font-bold text-xl  p-[1rem] ">{recipe.title}</h4>
                    
                    
                            <img className="w-full rounded-2xl" src={recipe.image} alt ={recipe.title}/>
                                <br></br>   
                      <Link  to={"/foodscreen/RecipeList/" +recipe.id}>   
                      <button  className ="recipebtn"><span>Show Details </span></button>
                      </Link>
                    </Card>
                </div>
          );

      })}
    
    
    </div>
    </Grid>
  );

}



export default Option