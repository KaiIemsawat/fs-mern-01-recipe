import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Recipe title is needed to be filled"],
            minLength: 3,
            maxLength: 30,
        },
        ingredients: [{ type: String, required: true }],
        instruction: {
            type: String,
            required: [true, "The instruction is needed to be filled"],
            minLength: 3,
        },
        imgUrl: {
            type: String,
            required: true,
        },
        cookingTime: {
            type: Number,
            required: true,
        },
        userOwner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
    },
    { timestamps: true }
);

export const RecipeModel = mongoose.model("recipe", RecipeSchema);
