import React, { useContext, useState } from 'react';
import Recipe from './Recipe';
import { RecipeContext } from './App';

export default function RecipeList({ recipes }) {
    // for searching the recipe
    const [search, setSearch ] = useState("")
    const filterRecipes = recipes.filter(res => {
        return res.name.toLowerCase().includes(search.toLowerCase())
    })

    const { handleRecipeAdd } = useContext(RecipeContext)

    return (
        <div className="recipe-list">
            <div className="add-recipe-btn-container">
                <button className="btn btn-primary btn-add" onClick={handleRecipeAdd}>Add Recipe</button>
                <input type="search" placeholder="Search a recipe..." className="recipe-list-search"
                onChange={(e) => setSearch(e.target.value)}/>
            </div>
            <div className="recipe-list-container">
                {/* looping through the recipes array and rendering each one of those as a component */} 
                {filterRecipes.map(recipe => { 
                    return (
                        // "handleRecipeDelete" no need inside of "recipeList" component anywhere, we only need it inside of our "recipe" component
                        // we need special/unique key which React.js uses to know what different parts of the array it needs to re-render. If the recipe with ID 1 changes, but the recipe with ID 2 does not change, it will only re-render the recipe with ID 1
                        <Recipe key={recipe.id} {...recipe} /> 
                    )
                })}
            </div>
        </div>
    )
}
