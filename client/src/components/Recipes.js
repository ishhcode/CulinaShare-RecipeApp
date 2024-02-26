
import RecipeCard from './Recipes'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
export default function Recipes({ recipes }) {
  console.log(recipes);
  return (
    <div className="recipes">
      <Carousel>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}

      </Carousel>
      
    </div>
  );
}