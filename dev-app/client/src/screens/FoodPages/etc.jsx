import React from 'react'
import {Link, useParams,NavLink} from 'react-router-dom'; 
import { useEffect, useState } from "react";


function etc() {
    const [typeOfOption, settypeOfRecipes] = useState([]);
    let params=useParams();



    const gettypeOfRecipes = async (name) =>{
        console.log(name);

  
      // const api= await fetch(`https://api.spoonacular.com/recipes/random?apiKey=fafea13599c5427bbf16f0e730c9b0c3&number=1&instructionsRequired=true&tags=${name}`);
       const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=49198b4329a048b381f314c4141e6c14&number=1&tags=${name}&instructionsRequired=true`);
       
       const recipe = await api.json();
       console.log(recipe);
     
        settypeOfRecipes(recipe);
        console.log("second way");
      //  console.log(recipe.results);
     
       // settypeOfRecipes(recipe.results);
/*

       <div >
    
       <h1>  {recipeDetail.title} </h1>
   
         <div>
           {recipeDetail.image}
         </div>
         
   
         <div>
         {recipeDetail.readyInMinutes}
           {recipeDetail.servings}
           <h3 dangerouslySetInnerHTML={{ _html:recipeDetail.summary }}/>  
           <ul>
             {recipeDetail.extendedIgredients.map((ingredient)=>
             <li >{ingredient.origianl}</li>
             //also have image if need .image
             
             )}
           </ul>
         </div>
   
   
         <h2 dangerouslySetInnerHTML={{ _html:recipeDetail.instructions}}/>
   
         
         {recipeDetail.sourceUrl}
   
                
       </div>
     );*/

    };

    useEffect(()=>{
        gettypeOfRecipes(params.type);
    },[params.type])


    return (
        <div className="box-border my-12 mx-auto px-4  border-4 display:inline rounded  "> 
    
          {typeOfOption.map((recipe)=>{
              return (
                <div   key={recipe.id}>
                          <article >
                         <div className="flex items-center justify-between leading-tight p-2 md:2 font-semibold text-xl ">{recipe.title}</div>
                        <Link to={'/foodscreen/RecipeList/' +recipe.id}></Link> 
                        
                                <img className="block w-full  shadow-2xl shadow-cyan-500/50" src={recipe.image} alt ={recipe.title}/>
                                    <br></br>   
                               
                        
                        <div className="font-semibold text-gray-500">Servings: {recipe.servings}
                        <br />
                        Preparation Time: {recipe.readyInMinutes}</div>
                        
    
                          <button className=" font-bold text-lg bg-gray-400 hover:bg-green-900 hover:text-white focus:outline-none w-full h-16 rounded"  >Show Details</button>
                        </article>
                    
                    </div>
              );
    
          })}
        
        
        </div>
      );
    }
    export default    etc