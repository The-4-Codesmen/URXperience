import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Wrapper } from "react-bootstrap";

function Vegeterian() {
  const [vegeterian, setVegeterian] = useState([]);

  useEffect(() => {
    getVegeterian();
  }, []);

  const getVegeterian = async () => {
    const api = await fetch(
      "https://api.spoonacular.com/recipes/random?apiKey=${process.env.FOOD_APP_API_KEY}&number=1"
    );
    const data = await api.json();
    console.log(data);
    setVegeterian(data.recipes);
  };

  return (
    <div>
      {vegeterian.map((recipe) => {
        return (
          <div className="box-border h-32 w-32  border-5" key={recipe.id}>
            <table className="border-separate border border-slate 500">
              <thead>
                <tr>
                  <th className="border border-slate-600">
                    <img src={recipe.image} alt="{recipe.title" />
                  </th>
                  <tr>
                    {recipe.title}
                    <br></br>
                    Prep-time: {recipe.preperationMinutes}
                    <br></br>
                    Cook-time: {recipe.readyInMinues}
                  </tr>
                </tr>
              </thead>
            </table>
          </div>
        );
      })}
    </div>
  );
}

export default Vegeterian;
