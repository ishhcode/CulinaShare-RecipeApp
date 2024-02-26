import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
//express ke saath json ko config kar rahe hain
//excepting json files
app.use(express.json({ limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRoutes from "./routes/user.routes.js";
import recipeRoutes from "./routes/recipe.routes.js";

app.use("/api/users", userRoutes)
app.use("/api/recipes",recipeRoutes)

export {app}
