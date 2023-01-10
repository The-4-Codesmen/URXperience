import React from 'react';
import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { red } from '@mui/material/colors';


function RecipeList() {
 const FOOD_API_KEY ='49198b4329a048b381f314c4141e6c14';
  const [recipeDetail, setRecipeDetail] = useState({});
 const [text, ext]= useState({});
  //const [iext,ext] = useState()
  let params = useParams();
  const api = async  () => {
 
   const datafetch =  await fetch(`https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${FOOD_API_KEY}`)
   
   
   const data = await datafetch.json();
    setRecipeDetail(data);
    //console.log(data);

    
  };


  useEffect(()=>{
    api(params.id);}, [params.id]
  );


  /*


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
   

  for each (index) use original 
         <ul>

             {recipeDetail.extendedIngredients.map((ingredient)=>(
             <li key= {ingredient.id}>{ingredients.original}</li>
            
            ))}
      </ul>

       <ul>
             {recipeDetail.extendedIngredients.map((ingredient)=>(
             <li key={ingredient.id}>{ingredient.original}</li>
             //also have image if need .image
             
             ))}
           </ul>

  */


           /*

<h1 className="text-center font-bold text-2xl  p-[1rem]"> {recipeDetail.title}</h1><br></br>
      <div className="float-left">
         <img className="box-border w-128  " src={recipeDetail.image} alt ={recipeDetail.title}/>

      </div>
       <div className= "float-right">
        <h2 className="font-semibold text-gray-500"> Cooking Time: {recipeDetail.readyInMinutes} </h2> <br></br>   
        <h2 className="font-semibold text-gray-500"> Total Number of Servings: {recipeDetail.servings} </h2> <br></br>   
      

      
        <h2 className="font-bold text-xl">Summary:</h2>
        <h3 dangerouslySetInnerHTML={{ __html: recipeDetail.summary}}></h3> <br></br>
        
        <h2 className="font-bold text-xl">Instructions:</h2>
        <h3 dangerouslySetInnerHTML={{ __html: recipeDetail.instructions}}></h3> <br></br>
      </div>


      for extendedIngredients 
  <div class="col-start-1 col-end-7 ...">04</div>

           */
 


  return (
    <div className="  box-border my-12 mx-auto px-4   "  >

      


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
      <h3 className="font-light text-lg"  dangerouslySetInnerHTML={{ __html: recipeDetail.summary}}></h3> <br></br>
      
      <div>
      <h2 className="font-bold text-xl shadow-lg">Instructions</h2><br></br>
      <h3 className="font-light text-lg"  dangerouslySetInnerHTML={{ __html: recipeDetail.instructions}}></h3> <br></br>
      </div>
    
    </div>


  
    
  </div>

    
     
    
               
  
</div>
  );
 


}


export default RecipeList

