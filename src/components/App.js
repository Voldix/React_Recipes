import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList';
import "../css/app.css";
import { v4 as uuidv4 } from 'uuid';
import RecipeEdit from './RecipeEdit';
// prefix for local storage
const LOCAL_STORAGE_KEY = "React.recipes";

// exporting the context for two components (RecipeList and Recipe) where we use it
export const RecipeContext = React.createContext()

function App() {
  //  we have this "setRecipes" function that we can use to update our "recipes" every other time this gets called, our "recipes" will be that updated list of recipes whether we deleted something or added
  const [recipes, setRecipes] = useState(() => { 
    // for loading from local storage
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    // checking for existence
    if (recipeJSON == null) {
      return sampleRecipes
    } else {
      return JSON.parse(recipeJSON)
    }
  })
  // this "useEffect" inside is going to allow us to save our recipes every single time our recipe changes and we wanna store that recipe list
  useEffect(() => {
    console.log("rendered");
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes]) // calling this hook EVERY single time when our recipes change

  // for editing recipe
  // we do not want to store a reference to our recipe with all of the values filled in. We wanna get the ID of recipe and we can get this ID from "recipe" list below
  const [selectedRecipeId, setSelectedRecipeId] = useState()
  // going through all of recipes find the recipe with the given ID of "selectedRecipeId" -> it will be our current "selectedRecipe"  
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId)

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  }

  // allowing to change a recipe (we wiil call this function inside our inputs)
  function handleRecipeChange(id, recipe) { // taking ID of changeable recipe and new recipe for replacing the old one 
    // creating a duplicate of array to use it and mutate it, then set our old state of "recipe" to this new array of state
    const newRecipes = [...recipes] // copying our current recipe array (without changing the state, because we cannot do this)
    const index = newRecipes.findIndex(r => r.id === id) // getting the index of recipe with this ID
    newRecipes[index] = recipe // taking out "newRecipes" and we want to find the recipe with that index and set it to our new recipe
    setRecipes(newRecipes) // setting all of our recipes to that "newRecipes" array
  }

  function handleRecipeSelect(id) {
    // calling this function to store our selected recipe every time we click 
    setSelectedRecipeId(id)
  }

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: "",
      servings: 1,
      cookTime: "",
      instructions: "",
      ingredients: [
        {
          id: uuidv4(),
          name: "",
          amount: ""
        }
      ]
    }
    // clicking the "add recipe" button and the recipe edit section of the new one opens immediately 
    setSelectedRecipeId(newRecipe.id)
    // it will expect an array of recipes. We need to take our current "recipes" array and spread over it, getting all of the recipes that are in our array, and we want to add this "newRecipe" to the top of that array and create a brand new array
    setRecipes([newRecipe, ...recipes]);
  }

  // it is going to take the ID of the recipe we want to delete. And inside, we can just call that "setRecipes" function and we want to take the recipes that we have and just filter it. we want to get all recipes that do not have that ID
  function handleRecipeDelete(id) {
    // when deleting the recipe it is not rendering anymore, but the selected recipe ID in our app is still SET to an ID of a recipe 
    if (selectedRecipeId != null && selectedRecipeId === id) {
      setSelectedRecipeId(undefined) // cleaning up
    }
    // getting every single recipe that is not the recipe of this ID and then setting that to our current recipes, this essentially just going to remove that recipe 
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes = {recipes} />
      {/* The aim - hide the edit section at the very beginning. The working way - short circuits
      If "selectedRecipe" is undefined -> "RecipeEdit" is not rendered. 
      If "selectedRecipe" is true (by clicking the edit button) -> checking the second part after && */}
      {selectedRecipe && <RecipeEdit recipe = {selectedRecipe} />}
    </RecipeContext.Provider>
  )
}

// using an array in order to make the content dynamic 
const sampleRecipes = [
  {
    id: 1,
    name: "Salsa Chicken",
    servings: 4,
    cookTime: "20 minutes",
    instructions: "1. Put the sliced fillet on a pan and fry it for five minutes over medium heat, stirring occasionally.\n2. Then add thinly sliced onion to the chicken as well as spices (if you want) and mix it well.\n3. Fry for ten minutes until most of the liquid has evaporated.\n4. Reduce the heat, pour out the salsa, and mix everything thoroughly.\n5. It will be ready after five minutes, then remove from the heat, add to the side dish and enjoy!",
    ingredients: [
      {
        id: 1,
        name: "Chicken",
        amount: "700g"
      },
      {
        id: 2,
        name: "Salsa",
        amount: "300g"
      },
      {
        id: 3,
        name: "Onion",
        amount: "2 heads"
      },
      {
        id: 4,
        name: "Spices",
        amount: "1 tbs"
      }
    ]
  },
  {
    id: 2,
    name: "Mushrooms Chicken",
    servings: 4,
    cookTime: "25-30 minutes",
    instructions: "1. Prepare the mushrooms by slicing them (not finely) then putting champignons on a pan over medium heat.\n2. Put the sliced fillets on another pan over medium heat too and add spices (if you need).\n3. Fry everything for ten minutes until the mushrooms become dark in color and begin to be covered with a golden crust.\n4. Then add the mushrooms to the chicken and mix thoroughly.\n5. Evaporate most of the liquid for about ten minutes while stirring frequently so that the food does not start to burn.\n6. Finally, fill it all with creamer and reduce the heat.\n7. Wait for about 10 minutes until the chicken and mushrooms are soaked with cream (do not mix and the creamer should thicken) and then remove from the heat, add to the side dish, and enjoy!",
    ingredients: [
      {
        id: 1,
        name: "Chicken",
        amount: "700g"
      },
      {
        id: 2,
        name: "Champignons",
        amount: "350g"
      },
      {
        id: 3,
        name: "Cream 15%",
        amount: "250ml"
      },
      {
        id: 4,
        name: "Spices",
        amount: "1 tbs"
      }
    ]
  }
]

export default App;
