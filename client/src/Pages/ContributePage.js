import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Context } from "../context/Context";
import './ContributePage.css'; // Adjust the CSS file name as needed

export default function ContributePage() {
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [category, setCategory] = useState("breakfast");
  const [photo, setImageFile] = useState(null);
  const { user } = useContext(Context);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(user.user,user);
      const formData = new FormData();
      formData.append("username", user.message.user._id);
      formData.append("recipeName", recipeName);
      formData.append("ingredients", ingredients);
      formData.append("instructions", instructions);
      formData.append("category", category);
      formData.append("photo",photo);
      console.log(category);
      const res = await axios.post("http://localhost:3000/api/recipes/", formData,{
        headers: { // Example header
          'Authorization': `Bearer ${user.message.accessToken}`
        }});
        if (res.status === 200) {
          // Redirect to home page
          window.location.replace("/");
        }
    } catch (err) {
      console.log("Error submitting recipe:", err);
    }
    

  };
 

  return (
    <div className="contributePage">
      <h2 className="contributePageTitle">Contribute Your Recipe</h2>
      <form className="contributePageForm" onSubmit={handleSubmit}>
        <div className="contributePageFormGroup">
          <label htmlFor="recipeName">Recipe Name:</label>
          <input
            type="text"
            id="recipeName"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            required
          />
        </div>
        <div className="contributePageFormGroup">
          <label htmlFor="ingredients">Ingredients:</label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        <div className="contributePageFormGroup">
          <label htmlFor="instructions">Instructions:</label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </div>
        <div className="contributePageFormGroup">
          <label htmlFor="recipeName">Category:</label>
          <select id="category" onChange={(e) => setCategory(e.target.value)}>
            <option value="breakfast">Breakfast</option>
            <option value="quick-meal">Quick Meal</option>
            <option value="desserts">Desserts</option>
          </select>
        </div>

        
        <div className="contributePageFormGroup">
          <label htmlFor="imageFile">Recipe Image:</label>
          <input
            type="file"
            id="imageFile"
            onChange={(e) => setImageFile(e.target.files[0])}
            required
          />
        </div>
        <button className="contributePageSubmit" type="submit">
          Submit Recipe
        </button>
      </form>
    </div>
  );
}



// // export default ContributePage;
// import { useContext, useState } from "react";
// import axios from "axios";
// import { Context } from "../context/Context";
// import './ContributePage.css'; // Adjust the CSS file name as needed

// export default function ContributePage() {
//   const [recipeName, setRecipeName] = useState("");
//   const [ingredients, setIngredients] = useState("");
//   const [instructions, setInstructions] = useState("");
//   const [category, setCategory] = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const { user } = useContext(Context);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newRecipe = {
//       username: user._id,
//       recipeName,
//       ingredients,
//       instructions,
//       category,
//     };
//     if (imageFile) {
//       console.log(imageFile)
//       newRecipe.photo = imageFile;
//     }

//     // if (imageFile) {
//     //   const formData = new FormData();
//     //   formData.append("file", imageFile);
//     //   try {
      
//     //     const res = await axios.post("http://localhost:3000/api/upload", formData);
//     //     newRecipe.image = res.data.filename;
        
//     //   } catch (err) {
//     //     console.log("Error uploading image:", err);
//     //   }
//     // }

//     try {
//       //console.log("hii")
//       const res = await axios.post("http://localhost:3000/api/recipes/", newRecipe);
//       console.log("Recipe submitted successfully:", res.data);
//       // Optionally redirect to a confirmation page or homepage after submission
//     } catch (err) {
//       console.log("Error submitting recipe:", err);
//     }
//   };

//   return (
//     <div className="contributePage">
//       <h2 className="contributePageTitle">Contribute Your Recipe</h2>
//       <form className="contributePageForm" onSubmit={handleSubmit}>
//         <div className="contributePageFormGroup">
//           <label htmlFor="recipeName">Recipe Name:</label>
//           <input
//             type="text"
//             id="recipeName"
//             value={recipeName}
//             onChange={(e) => setRecipeName(e.target.value)}
//             required
//           />
//         </div>
//         <div className="contributePageFormGroup">
//           <label htmlFor="ingredients">Ingredients:</label>
//           <textarea
//             id="ingredients"
//             value={ingredients}
//             onChange={(e) => setIngredients(e.target.value)}
//             required
//           />
//         </div>
//         <div className="contributePageFormGroup">
//           <label htmlFor="instructions">Instructions:</label>
//           <textarea
//             id="instructions"
//             value={instructions}
//             onChange={(e) => setInstructions(e.target.value)}
//             required
//           />
//         </div>
//         <div className="contributePageFormGroup">
//           <label htmlFor="recipeName">Category:</label>
//           <input
//             type="text"
//             id="category"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             required
//           />
//         </div>
        
//         <div className="contributePageFormGroup">
//           <label htmlFor="imageFile">Recipe Image:</label>
//           <input
//             type="file"
//             id="imageFile"
//             onChange={(e) => setImageFile(e.target.files[0])}
//             required
//           />
//         </div>
//         <button className="contributePageSubmit" type="submit">
//           Submit Recipe
//         </button>
//       </form>
//     </div>
//   );
// }
