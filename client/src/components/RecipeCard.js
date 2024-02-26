
import { Link ,useHistory} from 'react-router-dom';

import './RecipeCard.css'; // Adjust the CSS file name as needed
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function RecipeCard({ recipe }) {
  // Assuming 'recipe' object has 'id', 'photo', 'title', 'categories', 'createdAt', and 'description' properties
  // const PF = "http://localhost:3000/images/";
 


  return (
    <div className='recipe-card' >
      {recipe.photo && <img className='recipe-img' src={ recipe.photo} alt='' />}
      
      <div className='recipe-info'>
        {/* <div className='recipe-categories'>
          {recipe.categories.map((category) => (
            <span key={category.id} className='recipe-category'>{category.name}</span>
          ))}
        </div> */}
        <Link to={`/recipe/${recipe._id}`} className='link'>
          <span className='recipe-title'>{recipe.title}</span>
        </Link>
        
        <hr />
        <span className='recipe-date'>{new Date(recipe.createdAt).toDateString()}</span>
      </div>
      
      
      {/* <p className='recipe-description'>
        {recipe.ingredients}
      </p> */}
      {/* <p className='recipe-description'>
        {recipe.instructions}
      </p> */}
      <p className='recipe-description'>
        {recipe.category}
      </p>
      <Link to={`/recipe/${recipe._id}`} className='link'>
          <button className='recipe-description'>see more..</button>
        </Link>
      
    </div>
  );
}
