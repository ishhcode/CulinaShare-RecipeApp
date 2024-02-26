
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Recipes from './Recipes'; // Renamed from Posts to Recipes
import About from './About';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';



export default function Home() {
    const [recipes, setRecipes] = useState([]); // Renamed from posts to recipes
    const { search } = useLocation();
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const queryParams = {
                    page: 1,
                    limit: 10,
                };

                // Make the GET request with query parameters included in the URL
                const res = await axios.get("http://localhost:3000/api/recipes", { params: queryParams });
                setRecipes(res.data.data);// Changed from setPosts to setRecipes
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        };
        fetchRecipes();
    }, []);

    return (
        <>
            <Header />
            <div className="home">
                <div className="recipes">
                    <div className="featured-heading">
                        <h3 >Featured Recipes</h3>
                        </div>
                    
                    <Carousel responsive={ responsive}>
                        {recipes.map((recipe) => (
                            <RecipeCard key={recipe._id} recipe={recipe} />
                        ))}

                    </Carousel>
                    
                </div>
                {/* <Recipes recipes={recipes} /> Changed from Posts to Recipes */}
                <About />
            </div>
        </>
    );
}
