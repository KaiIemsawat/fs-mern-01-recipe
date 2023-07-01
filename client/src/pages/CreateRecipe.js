import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID.js";
import { useNavigate } from "react-router-dom";

const CreateRecipe = () => {
    const userID = useGetUserID();
    const nav = useNavigate();

    const [recipe, setRecipe] = useState({
        title: "",
        ingredients: [],
        instruction: "",
        imgUrl: "",
        cookingTime: 0,
        userOwner: userID,
    });

    const changeHandle = (e) => {
        const { name, value } = e.target;
        setRecipe({ ...recipe, [name]: value });
    };

    const handleIngredientChange = (e, index) => {
        const { value } = e.target;
        const ingredients = recipe.ingredients;
        ingredients[index] = value;
        setRecipe({ ...recipe, ingredients });
    };

    const addIngredient = () => {
        setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3001/recipes", recipe);
            alert("Recipe added");
            nav("/");
        } catch (error) {
            console.error(error, "error here");
        }
    };
    return (
        <div className="create-recipe">
            <h2>Create Recipe</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    onChange={changeHandle}
                />

                <label htmlFor="ingredients">Ingredients</label>
                {/* <input type="text" id="ingredients" name="ingredients" onChange={changeHandle} /> */}
                {recipe.ingredients.map((ingredient, index) => (
                    <input
                        key={index}
                        type="text"
                        name="ingredients"
                        value={ingredient}
                        onChange={(e) =>
                            handleIngredientChange(e, index)
                        }></input>
                ))}
                <button onClick={addIngredient} type="button">
                    Add Ingredient
                </button>

                <label htmlFor="instruction">Instruction</label>
                <input
                    type="text"
                    id="instruction"
                    name="instruction"
                    onChange={changeHandle}
                />

                <label htmlFor="imgUrl">Image URL</label>
                <input
                    type="text"
                    id="imgUrl"
                    name="imgUrl"
                    onChange={changeHandle}
                />

                <label htmlFor="cookingTime">Cooking Time (minute)</label>
                <input
                    type="number"
                    id="cookingTime"
                    name="cookingTime"
                    onChange={changeHandle}
                />
                <button type="submit">submit</button>
            </form>
        </div>
    );
};

export default CreateRecipe;
