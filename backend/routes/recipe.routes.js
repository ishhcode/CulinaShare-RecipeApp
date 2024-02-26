import { Router } from 'express';
import {
    deleteRecipe,
    getAllRecipes,
    getRecipeById,
    getRecipes,
    publishARecipe,
    togglePublishStatus,
    updateRecipes,
} from "../controller/recipe.controllers.js"
import {verifyJWT} from "../middlewares/auth.middlewares.js"
import {upload} from "../middlewares/multer.middlewares.js"

const router = Router();
// Apply verifyJWT middleware to all routes in this file

router
    .route("/")
    .get(getAllRecipes)
    .post(verifyJWT,
        upload.single("photo"),publishARecipe );

router
    .route("/:recipeId")
    .get(getRecipeById)
    .delete(verifyJWT,deleteRecipe)
    .patch( verifyJWT,updateRecipes);

router.route("/toggle/publish/:recipeId").patch(verifyJWT,togglePublishStatus);
router.get("/category/:categoryName", getRecipes)

export default router