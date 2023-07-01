import express from "express";
import mongoose from "mongoose";
import { RecipeModel } from "../models/recipeModel.js";
import { UserModel } from "../models/userModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const response = await RecipeModel.find({});
        res.json(response);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post("/", async (req, res) => {
    const recipe = new RecipeModel(req.body);
    try {
        const response = await recipe.save();
        res.json(response);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.put("/", async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.body.recipeID);
        const user = await UserModel.findById(req.body.userID);

        user.savedRecipes.push(recipe);
        await user.save();

        res.json({ savedRecipes: user.savedRecipes });
    } catch (error) {
        res.status(400).json(error);
    }
});

router.get("/savedRecipes/ids", async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userID);
        const savedRecipes = await RecipeModel.find({
            _id: { $in: user.savedRecipes },
        });

        res.json({ savedRecipes });
    } catch (error) {
        res.status(400).json(error);
    }
});

export { router as recipesRouter };
