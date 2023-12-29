const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', async (req, res) => {
  try {
    const { data } = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const cocktail = data.drinks[0];//cocktail is an JS object

    const ingredients = [];
    const measures = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = cocktail['strIngredient' + i];
      const measure = cocktail['strMeasure' + i];
      if (ingredient && measure) { //null means false
        ingredients.push(ingredient);
        measures.push(measure);
      } else {
        break;
      }
    }

    res.render('index.ejs', {
      name: cocktail.strDrink,
      image: cocktail.strDrinkThumb,
      measures: measures,
      ingredients: ingredients,
      instructions: cocktail.strInstructions,
    });
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).send('Internal Server Error: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
