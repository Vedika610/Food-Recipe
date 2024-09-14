document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('search-button');
    const ingredientsInput = document.getElementById('ingredients');
    const recipesContainer = document.getElementById('recipes-container');

    const apiID = '4764df8b';  
    const apiKey = '4579012b5e9756715151905d079046cd'; 

    searchButton.addEventListener('click', function() {
        const ingredients = ingredientsInput.value.trim();

        if (ingredients) {
            findRecipes(ingredients);
        }
    });

    function findRecipes(ingredients) {
        const url = `https://api.edamam.com/search?q=${ingredients}&app_id=${apiID}&app_key=${apiKey}&to=10`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                displayRecipes(data.hits);
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
            });
    }

    function displayRecipes(recipes) {
        recipesContainer.innerHTML = ''; // Clear previous results

        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe');

            recipeCard.innerHTML = `
                <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
                <h2>${recipe.recipe.label}</h2>
                <p><strong>Calories:</strong> ${Math.round(recipe.recipe.calories)}</p>
                <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
            `;

            recipesContainer.appendChild(recipeCard);
        });
    }
});
