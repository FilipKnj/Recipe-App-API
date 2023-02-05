const searchBtn = document.querySelector('#searchBtn');
const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
const result = document.querySelector('.result');

searchBtn.addEventListener('click', () => {
    const inputVal = document.querySelector('#mealInp').value;
    if(inputVal.lenght == 0){
        result.innerHTML = `
            <h3>Input Field Cannot Be Empty...</h3>
        `
    }else{
        fetch(`${url}${inputVal}`).then(res => res.json()).then(data => {
            let myMeal = data.meals[0];
            let count = 1;
            let ingredients = [];
            for(let i in myMeal){
                let ingredient = '';
                let measure = '';
                if(i.startsWith('strIngredient') && myMeal[i]){
                    ingredient = myMeal[i];
                    measure = myMeal['strMeasure' + count ];
                    count++;
                    ingredients.push(`${measure} ${ingredient}`);
                };
            };
        
            result.innerHTML = `
                <img id='mealImg' src='${myMeal.strMealThumb}'>
                <div class='details'>
                    <h2>${myMeal.strMeal}</h2>
                    <h4>${myMeal.strArea}</h4>
                </div>
                <div class='ingredient-div'></div>
                <div class='recipe'>
                    <button id='hide-recipe'>X</button>
                    <pre id='instructions'>${myMeal.strInstructions}</pre>
                </div>
                <button id='show-recipe'>Show Recipe</button>
            `
            let ingredientDiv = document.querySelector('.ingredient-div');
            let parent = document.createElement('ul');
            let recipe = document.querySelector('.recipe');
            let hideRecipeBtn = document.querySelector('#hide-recipe');
            let showRecipeBtn = document.querySelector('#show-recipe');
        
            ingredients.forEach(i => {
                let child = document.createElement("li");
                child.innerText = i;
                parent.appendChild(child);
                ingredientDiv.appendChild(parent);
            });
        
            showRecipeBtn.addEventListener('click', () => {
                recipe.style.display = 'block'
            });
        
            hideRecipeBtn.addEventListener('click', () => {
                recipe.style.display = 'none'
            });
        }).catch(() => {
            result.innerHTML = `<h3>Invalid Input</h3>`
        })
    }
})


