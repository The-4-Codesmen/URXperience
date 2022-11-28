import React from "react";
import Navbar from "./Navbar";
import TakeoutImage from '../img/TakeoutMap.jpg'
import {Link} from "react-router-dom";
import RecipeOfTheDay from "./FoodComponents/RecipeOfTheDay";
import TopCategory from "./FoodComponents/TopCategory";



function FoodScreen() {
  return (
    <div className='min-h-screen  text-gray-900 flex justify-center'>
      <Navbar />
      <div className="mt-16 p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
      < RecipeOfTheDay/>
      <TopCategory/>
    <div className="rounded-lg xl:h-3/5 overflow-hidden shadow-lg">
      <img className="w-full" src={TakeoutImage} alt="River"/>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 underline">Takeouts</div>
        <p className="text-gray-700 text-base">
          Don't wanna cook?  
        </p>
      </div>
      <Link  to={"/Takeouts"}>
            <div className="text-center p-8 bg-green-800 font-bold text-white hover:bg-green-700 min-h-full">
                <span>Show More</span>
            </div>
      </Link> 
    </div>
  </div>
</div>
  );
}

export default FoodScreen;




// <div className="grid grid-cols-3 gap-2 " >
     
      
// <div className="col-start-1 col-end-3  ... place-content-center justify-items-center gap-5 "  >
// <br></br> <br></br> <br></br> <br></br>
//   <h1 className="font-bold text-2xl gap-5 text-center">Recipe Of the Day</h1>
//    < RecipeOfTheDay/>
//   <br></br>
// </div>



// <div className="col-start-3 col-end-4 ...">
// <br></br> <br></br> <br></br> <br></br>
//   <h3 className="font-semibold text-xl text-center">Or Try Take Outs</h3>
//   <a  href="/TakeOuts"><img src={TakeoutImage} alt="TakeoutImage" className="box-border h-64 w-64 relative left-32"></img></a> 

// </div>

// <div class="divide-y divide-solid"></div>
// <div className="col-start-1 col-end-3  ...">
//   <h2 className=" font-semibold text-xl text-center">Or choose Category</h2>
//   <TopCategory/>

// </div>