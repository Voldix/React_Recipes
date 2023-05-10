import React from 'react';

export default function IngredientEdit(props) {
    const { 
        ingredient, 
        handleIngredientChange,
        handleIngredientDelete
    } = props

    function handleChange(changes) {
        handleIngredientChange(ingredient.id, { ...ingredient, ...changes })
    }

    return (
        <>
            <input type="text" className="recipe-edit-input" value={ingredient.name} 
            onChange={(e) => handleChange({ name: e.target.value })}/>
            <input type="text" className="recipe-edit-input" value={ingredient.amount} 
            onChange={(e) => handleChange({ amount: e.target.value })}/>
            <button className="btn btn-danger remove-ingredient-btn" 
                onClick={() => handleIngredientDelete(ingredient.id)}>
                &times;
            </button>
        </>
    )
}
