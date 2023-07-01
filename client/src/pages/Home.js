import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const userID = useGetUserID();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3001/recipes"
                );
                setRecipes(response.data);
            } catch (error) {
                console.error(error, "error here");
            }
        };

        const fetchSavedRecipe = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
                );
                setSavedRecipes(response.data.savedRecipes);
            } catch (error) {
                console.error(error, "error here");
            }
        };

        fetchRecipe();
        fetchSavedRecipe();
    }, []);

    const saveRecipes = async (recipeID) => {
        try {
            const response = await axios.put("http://localhost:3001/recipes", {
                recipeID,
                userID,
            });
            console.log(response);
        } catch (error) {
            console.error(error, "error here");
        }
    };

    return (
        <div>
            <h1>Recipes</h1>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe._id}>
                        <div>
                            <h2>{recipe.title}</h2>
                            <button onClick={() => saveRecipes(recipe._id)}>
                                save
                            </button>
                        </div>
                        <div className="instruction">
                            <p>{recipe.instruction}</p>
                        </div>
                        <img src={recipe.imgUrl} alt={recipe.title} />
                        <p>Cooking Time : {recipe.cookingTime} (minutes)</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
