import mongoose from "mongoose" ;

const RecipeSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    ingredients: {
        type:String,
        required:true,
    },
    instructions:{
        type:String,
        required:true
    },
    photo: {
        type:String,
        required:true
    },
    owner: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    isPublished: {
        type:Boolean,
        default: true
    },
    isFeatured: {
        type:Boolean,
        default: false
    },
    category: {
        type: String,
        default: "Other"
    }     
    ,    
    
},
{ timestamps: true }
);

export const Recipe = mongoose.model("Recipe", RecipeSchema);

