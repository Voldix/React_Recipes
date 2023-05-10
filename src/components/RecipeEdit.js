import React, { useContext } from 'react';
import IngredientEdit from './IngredientEdit';
import { RecipeContext } from './App';
import { v4 as uuidv4 } from 'uuid';

export default function RecipeEdit({ recipe }) { // passing "recipe" here to use it inside of all the rest of our "inputs" to set the value 

    const { handleRecipeChange, handleRecipeSelect } = useContext(RecipeContext)

    // helper function that does all of the shared functionality between all of our input
    function handleChange(changes) { // passing in the changes we want to make and this is just going to be an object with all the differences between our current recipe
        handleRecipeChange(recipe.id, { ...recipe, ...changes }) // in object we are taking everything from recipe and then we are adding everything from changes and overwriting anything in changes
    }

    // specialized function for handling ingredient change (identical to the "handleRecipeChange" function)
    function handleIngredientChange(id, ingredient) {
        const newIngredients = [...recipe.ingredients] 
        const index = newIngredients.findIndex(i => i.id === id)
        newIngredients[index] = ingredient
        handleChange({ ingredients: newIngredients})
    }

    // for adding ingredients
    function handleIngredientAdd() {
        const newIngredient = {
            id: uuidv4(),
            name: "",
            amount: ""
        }
        handleChange({ ingredients: [...recipe.ingredients, newIngredient] })
    }

    // for deleting ingredients
    function handleIngredientDelete(id) {
        handleChange({ ingredients: recipe.ingredients.filter(i => i.id !== id) })
    }

    return (
        <div className="recipe-edit">
            <div className="recipe-edit-remove-btn-container">
                <button className="btn recipe-edit-remove-btn" 
                    onClick={() => handleRecipeSelect(undefined)}> {/* hide the recipe edit form by setting the "selectedRecipeId" as undefined */}
                    &times;
                </button>
            </div>
            <div className="recipe-edit-grid">
                {/* "htmlFor" is like the normal "for" tag of a label */}
                {/* "e.target.value" here means - whatever is typed into our input element, we are going to pass that as the new name for our component */}
                {/* "e.target.value" is always a string */}
                <label htmlFor="name" className="recipe-edit-label">Name:</label> 
                <input type="text" name="name" id="name" value={recipe.name} className="recipe-edit-input" 
                onChange={e => handleChange({ name: e.target.value })}/> 
                <label htmlFor="cookTime" className="recipe-edit-label">Cook Time:</label> 
                <input type="text" name="cookTime" id="cookTime" value={recipe.cookTime} className="recipe-edit-input" 
                onChange={e => handleChange({ cookTime: e.target.value })}/>
                <label htmlFor="servings" className="recipe-edit-label">Servings:</label> 
                <input type="number" min="1" name="servings" id="servings" value={recipe.servings} className="recipe-edit-input" 
                onChange={e => handleChange({ servings: parseInt(e.target.value) || "" })}/>
                <label htmlFor="instructions" className="recipe-edit-label">Instructions:</label> 
                <textarea name="instructions" id="instructions" className="recipe-edit-input" value={recipe.instructions} 
                onChange={e => handleChange({ instructions: e.target.value })} />
            </div>
            <br/>
            <label className="recipe-edit-label">Ingredients:</label>
            <div className="recipe-edit-ingredient-grid">
                <div className="ingredients-label">Name</div>
                <div className="ingredients-label">Amount</div>
                <div></div>
                {/* looping through all of our recipe ingredients and for each one, we wanna run some code and we wanna it to return whatever is inside these parentheses  */}
                {recipe.ingredients.map(ingredient => (
                    <IngredientEdit 
                        key={ingredient.id} 
                        handleIngredientChange = {handleIngredientChange}
                        handleIngredientDelete = {handleIngredientDelete}
                        ingredient={ingredient} 
                    />    
                ))}
            </div>
            <div className="recipe-edit-add-ingredient-btn-container">
                <button className="btn btn-primary" onClick={() => handleIngredientAdd()}>Add Ingredient</button>
            </div>
        </div>
    )
}
