import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {Recipe} from "../models/recipe.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const checkOwner = async(recipeId,id)=>{
    const recipe = await Recipe.findById(recipeId);

    if(recipe?.owner !== id){
        return false;
    }
    return true;


}

const getRecipes = async (req, res) => {
    const { categoryName } = req.params
    const { page = 0, search } = req.query
    const query = {
      $or: [
        { category: { $regex: new RegExp(search ? search : categoryName, "i") } },
        { title: { $regex: new RegExp(search ? search : categoryName, "i") } }
      ],
    }
    const recipes = await Recipe.find(query)
      .skip(parseInt(page) * 10)
      .limit(10)
    const size = await Recipe.count(query)
    const skip = 10
    res.status(200).json(
        new ApiResponse(200,recipes, "done")
    )
  }

const getAllRecipes = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query
    //TODO: get all videos based on query, sort, pagination
    const recipes = await Recipe.aggregate([
        
        {
            $skip: (page - 1) * limit
        },
        {
            $limit: parseInt(limit)
        }
    ])
    if(!recipes){
        throw new ApiError(500,"No Video Found!")
    }
    return res.status(200)
    .json(
        new ApiResponse(200,"All recipes Fetched successfully!",recipes)
    )
})

const publishARecipe = asyncHandler(async (req, res) => {
    const { recipeName, ingredients, instructions, category} = req.body
    // TODO: get recipe, upload to cloudinary, create recipe
    console.log(req.body);
    if(!recipeName || !ingredients || !instructions || !category){
        throw new ApiError(404,"title and description are required!")
    }
    const RecipeLocalPath = req.file?.path

    if(!RecipeLocalPath){
        throw new ApiError(500,"No recipe uploaded!")
    }

    const recipe = await uploadOnCloudinary(RecipeLocalPath)
    
    if(!recipe){
        throw new ApiError(500,"Something went wrong while uploading on cloudnary")
    }
    console.log(recipe)

    const createdRecipe = await Recipe.create({
        photo: recipe.url,
        title: recipeName,
        ingredients,
        instructions,
        category,
        owner:req.user._id
    })

    if(!createdRecipe){
        throw new ApiError(500,"recipe not created")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,createdRecipe,"video published successfully!")
    )

})

const getRecipeById = asyncHandler(async (req, res) => {
    const { recipeId } = req.params
    //TODO: get video by id
    if(!recipeId){
        throw new ApiError(400,"recipeId is required!")
    }
    const recipe = await Recipe.findById(recipeId)
    if(!recipe || !recipe?.isPublished){
        throw new ApiError(400,"recipe not found!")
    }
    console.log(recipe);

    return res
    .status(200)
    .json(new ApiResponse(200,recipe, "recipe fetched successfully!"))
})

const updateRecipes = asyncHandler(async (req, res) => {
    const { recipeId } = req.params
    //TODO: update video details like title, description, thumbnail
    if(!recipeId){
        throw new ApiError(400,"recipeId required!")
    }
    if(!checkOwner(recipeId,req.user?._id)) {
        throw new ApiError(404, "Unauthorized Access")
    }
    const prevRecipe = await Recipe.findById(recipeId)
    if(!prevRecipe){
        throw new ApiError(404, "recipe not found")
    }
    const {title,ingredients, instructions, category} = req.body
    if(!title || !ingredients|| !instructions || !category){
        throw new ApiError(400,"title and description are required!")
    }
    //const thumbnailLocalPath = req.file?.path;

    // if(!thumbnailLocalPath){
    //     console.log('No file uploaded');
    //     return new ApiResponse(500,"No thumbnail uploaded");
    // }
    // const previousThumbnail = prevVideo.thumbnail?.public_id;

    // const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

    // if(!thumbnail?.url){
    //     throw new ApiError(500,"Failed to save image on cloudinary!");
    // }
     
    const recipe = await Recipe.findByIdAndUpdate(recipeId,
        {
            $set:{
                //thumbnail:thumbnail.url,
                title,
                ingredients,
                instructions,
                category
            }
        },
        {new:true}
    )

    if(!recipe){
        throw new ApiError(500,"Something went wrong while updating the details")
    }
    //await deleteOnCloudinary(previousThumbnail);

    return res.status(200)
    .json(
        new ApiResponse(200,recipe,"recipe updated successfully!")
    )



})

const deleteRecipe = asyncHandler(async (req, res) => {
    const { recipeId } = req.params
    //TODO: delete video
    // Check if videoId is provided

    if (!recipeId) {
        throw new ApiError(400, "recipeId is required!");
    }
    if(!checkOwner(recipeId,req.user?._id)) {
        throw new ApiError(404, "Unauthorized Access")
    }
    // Find the video by its ID in the database
    const recipe = await Recipe.findById(recipeId);
    if(!recipe){
        throw new ApiError(404, "Recipe not found")
    }
    if(recipe.photo){
        await deleteOnCloudinary(recipe.photo.public_id, "recipe")
    }
    const deletedRecipe= await Recipe.findByIdAndDelete(recipe)
    if(!deletedRecipe){
        throw new ApiError(400, "Something error happened while deleting the video")
    }
    return res.status(200)
    .json(
        new ApiResponse(200,{},"video deleted Successfully!")
    )
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { recipeId } = req.params
    if(!recipeId){
        throw new ApiError(400,'Invalid video Id')
    }
    if(!checkOwner(recipeId?.owner,req.user?._id)){
        throw new ApiError(300,'Unauthorized Access')
    }

    const recipe = await Recipe.findById(recipeId);
    const updateRecipe = await Recipe.findByIdAndUpdate(recipeId,
        {
            $set:{
                isPublished:!recipe.isPublished
            }
        },
        {new:true}
    )

    if(!updateRecipe){
        throw new ApiError(500,"Something went wrong while updating the details")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,updateRecipe,"PublishStatus of the recipe is toggled successfully"))
})

export {
    getAllRecipes,
    publishARecipe,
    getRecipeById,
    updateRecipes,
    deleteRecipe,
    togglePublishStatus,
    getRecipes
}