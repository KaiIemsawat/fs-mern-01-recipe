import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from "./routes/userRoute.js";
import { recipesRouter } from "./routes/recipeRoute.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

mongoose.connect(
    "mongodb+srv://kaiiemsawat:Kinkin3710@recipes.csiyjpa.mongodb.net/recipes?retryWrites=true&w=majority"
);
const port = 3001;
app.listen(port, () =>
    console.log(`Server start running...on PORT : ${port}...!!`)
);
