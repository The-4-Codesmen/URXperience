import React from 'react';
import { useEffect, useState } from "react";
import {searchIcon} from 'react-icons/fa';



function Search() {


    const [input, setInput] = useState("");
    const submitHandler =(e)=>{


        e.preventDefault();
    }

  return (
    <div>
        <form>
        <searchIcon/>
        <input value ={input} type= "text"/>

        </form>
    </div>
  )
}





export default Search