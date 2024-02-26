import axios from "axios";
import { useContext, useEffect, useState, } from "react";
import { useLocation } from "react-router";
import { Link,  useParams } from "react-router-dom";
import { Context } from "../context/Context";
import './RecipePost.css'; // Adjust the CSS file name as needed

export default function RecipePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [recipe, setRecipe] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const {recipeId} = useParams();
  
  const [instructions, setInstructions] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  console.log(recipeId);

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/recipes/" + recipeId);
        console.log(res.data.message);
        setRecipe(res.data.message);
        setTitle(res.data.message.title);
        setInstructions(res.data.message.instructions);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };
    getRecipe();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/recipes/${recipe._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {
      console.error("Error deleting recipe:", err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/recipes/${recipe._id}`, {
        owner: user.username,
        recipeName: title,
        instructions,
      });
      setUpdateMode(false);
    } catch (err) {
      console.error("Error updating recipe:", err);
    }
  };

  return (
    <div className="recipe-details">
      <div className="recipe-details-wrapper">
        {recipe.photo && (
          <img src={ recipe.photo} alt="" className="recipe-img" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="recipe-title-input"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="recipe-title">
            {title}
            {recipe.username === user?.username && (
              <div className="recipe-edit">
                <i
                  className="recipe-icon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="recipe-icon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="recipe-info">
          <span className="recipe-author">
            Author:
            <Link to={`/?user=${recipe.username}`} className="link">
              <b> {recipe.username}</b>
            </Link>
          </span>
          <span className="recipe-date">
            {new Date(recipe.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="recipe-instructions-input"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        ) : (
          <p className="recipe-instructions">{instructions}</p>
        )}
        {updateMode && (
          <button className="recipe-button" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
