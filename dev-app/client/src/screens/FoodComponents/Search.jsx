import React from 'react';
import { useEffect, useState } from "react";
import {FaSearch} from 'react-icons/fa';
import { useParams } from 'react-router-dom';



function Search() {


    const [input, setInput] = useState("");
    
    const submitHandler = (e) => {
      e.preventDefault();
      //console.log("test")
      
    };

    let params = useParams()

    const FOOD_API_KEY = '49198b4329a048b381f314c4141e6c14';

    const getInput = async(name)=> {
      const api = await fetch('https://api.spoonacular.com/recipes/findByIngredients?apiKey=${FOOD_API_KEY}&number=1&instructionsRequired=true&ingredients=${name}')
      const data = await api.json();
      setInput(data.recipes);


    };

    useEffect(() =>{
    
     console.log(params.type)
    },[params.type]);
   
    

  return (
    <>
         <form onSubmit={submitHandler}> 
          <div>
        <FaSearch></FaSearch>
        <input 
        onChange={(e) => setInput(e.target.value)}
        type = "text"
        value={input}
        />

          </div>
        </form> 





    
    </>
  );
}





export default Search