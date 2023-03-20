import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { isAuth, getCookie, signout } from "../../helpers/auth";
import "../FoodComponents/buttoncss.css";
function Option() {
  const [Options, setOptions] = useState([]);
  let params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const token = getCookie("token");
    if (!getCookie("token")) {
      navigate("/login");
    } else {
      axios
        .get(`${process.env.REACT_APP_SERVER}api/user/${isAuth()._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const { role, name, email } = res.data;
        })
        .catch((err) => {
          toast.error(`Error to your Information ${err.response.statusText}`);
          if (err.response.status === 401) {
            signout(() => {
              navigate("/login");
            });
          }
        });
    }
  }, []);
  useEffect(() => {
    getOptions(params.type);
  }, [params.type]);

  const apiURL = process.env.REACT_APP_FOOD_API_RANDOM;
  const getOptions = async (name) => {
    const api = await axios.get(apiURL, {
      params: {
        number: 4,
        tags: `${name}`,
        instructionsRequired: "true",
        sortDirection: "asc",
      },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_FOOD_API_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_FOOD_API_HOST,
      },
    });
    setOptions(api.data.recipes);
  };

  return (
    <div className="min-h-screen bg-gray-200 text-gray-900 text-center">
      <Navbar />
      <div className="mt-20 grid p-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 auto-cols-auto">
        {Options.map((recipe) => (
          <div
            className="bg-gray-100 rounded-lg p-3 shadow-lg items-center"
            key={recipe.id}
          >
            <div className="rounded-lg">
              <h4 className="text-center mb-2 font-bold">{recipe.title}</h4>
              <img
                className="w-full rounded-2xl"
                src={recipe.image}
                alt={recipe.title}
              />
            </div>
            <Link to={"/foodscreen/RecipeList/" + recipe.id}>
              <button className="mt-2 text-center w-full bg-green-800 p-2 rounded-lg text-white font-bold hover:bg-green-700 text-left">
                <span>Show Details </span>
              </button>
            </Link>
          </div>
        ))}
      </div>
      <Link to={"/foodscreen"}>
        <button className="mb-5 p-2 justify-center text-center bg-green-700 rounded-lg text-white font-bold hover:bg-green-600">
          <span>Back to Recipe</span>
        </button>
      </Link>
    </div>
  );
}

export default Option;
