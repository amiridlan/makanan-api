const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('API is running');
});

const recipes = [
  {
    id: 1,
    name: "Nasi Lemak",
    description: "Fragrant rice cooked in coconut milk served with sambal, fried anchovies, peanuts, boiled egg, and cucumber.",
    origin: "Malaysia",
    cookTimeMinutes: 45,
    caloriesPerServing: 550,
    image: "/static/images/nasi-lemak.jpg",
    ingredients: [
      "2 cups of rice",
      "400 ml coconut milk",
      "2 pandan leaves",
      "Salt to taste",
      "Fried anchovies",
      "Peanuts",
      "Boiled eggs",
      "Cucumber slices",
      "Sambal (spicy chili paste)"
    ],
    steps: [
      "Rinse the rice and drain well.",
      "Cook rice with coconut milk, pandan leaves, and salt until done.",
      "Prepare sambal by frying chili paste with onions and other spices.",
      "Serve rice with sambal, fried anchovies, peanuts, boiled egg, and cucumber slices."
    ]
  },
  {
    id: 2,
    name: "Kway Teow Goreng",
    description: "Stir-fried flat rice noodles with shrimp, Chinese sausage, egg, bean sprouts, and chives.",
    origin: "Malaysia",
    cookTimeMinutes: 30,
    caloriesPerServing: 600,
    image: "/static/images/kway-teow-goreng.jpg",
    ingredients: [
      "200g flat rice noodles",
      "100g shrimp",
      "2 Chinese sausages, sliced",
      "2 eggs",
      "Bean sprouts",
      "Chives",
      "Soy sauce",
      "Garlic",
      "Chili"
    ],
    steps: [
      "Heat oil in wok, fry garlic until fragrant.",
      "Add shrimp and Chinese sausages, stir fry until cooked.",
      "Add eggs and lightly scramble.",
      "Add rice noodles, soy sauce, chili and stir fry well.",
      "Add bean sprouts and chives, mix quickly and serve."
    ]
  },
  {
    id: 3,
    name: "Roti Canai",
    description: "Flaky, crispy flatbread served with dhal or curry.",
    origin: "Malaysia",
    cookTimeMinutes: 60,
    caloriesPerServing: 400,
    image: "/static/images/roti-canai.jpg",
    ingredients: [
      "2 cups all-purpose flour",
      "1 teaspoon salt",
      "1 tablespoon sugar",
      "Water as needed",
      "Oil or ghee for frying"
    ],
    steps: [
      "Mix flour, salt, sugar with water to form a dough.",
      "Knead until smooth and let it rest for an hour.",
      "Divide dough into balls, flatten and stretch thin.",
      "Fold into layers, then flatten again.",
      "Fry on a hot pan with oil until golden and crispy.",
      "Serve with dhal or curry."
    ]
  },
  {
    id: 4,
    name: "Laksa",
    description: "Spicy noodle soup with a rich and flavorful coconut milk or tamarind-based broth.",
    origin: "Malaysia",
    cookTimeMinutes: 40,
    caloriesPerServing: 500,
    image: "/static/images/laksa.jpg",
    ingredients: [
      "200g rice noodles",
      "200g prawns",
      "100g chicken",
      "Laksa paste",
      "Coconut milk",
      "Bean sprouts",
      "Mint leaves",
      "Lime wedges"
    ],
    steps: [
      "Boil chicken and prawns separately and slice the chicken.",
      "Cook laksa paste in pot, add coconut milk and water to make broth.",
      "Add chicken and prawns to broth, simmer gently.",
      "Blanch rice noodles in boiling water and drain.",
      "Serve noodles, pour broth over, garnish with bean sprouts, mint leaves and lime wedges."
    ]
  },
  {
    id: 5,
    name: "Nasi Ayam",
    description: "Poached chicken and seasoned rice served with chili sauce and garlic paste.",
    origin: "Malaysia",
    cookTimeMinutes: 50,
    caloriesPerServing: 450,
    image: "/static/images/nasi-ayam.jpg",
    ingredients: [
      "1 whole chicken",
      "2 cups jasmine rice",
      "Ginger",
      "Garlic",
      "Cucumber",
      "Chili sauce",
      "Chicken stock"
    ],
    steps: [
      "Poach chicken in boiling water with ginger until cooked.",
      "Use chicken stock to cook jasmine rice with ginger and garlic.",
      "Chop chicken, serve with rice and sliced cucumber.",
      "Serve with chili sauce and garlic paste."
    ]
  },
];

// Helper function to filter recipes by query parameters
function filterRecipes(query) {
  let filtered = recipes;

  if (query.name) {
    const nameLower = query.name.toLowerCase();
    filtered = filtered.filter(r => r.name.toLowerCase().includes(nameLower));
  }

  if (query.origin) {
    const originLower = query.origin.toLowerCase();
    filtered = filtered.filter(r => r.origin.toLowerCase() === originLower);
  }

  if (query.alphabet) {
    const alphabetLower = query.alphabet.toLowerCase();
    filtered = filtered.filter(r => r.name.toLowerCase().startsWith(alphabetLower));
  }

  return filtered;
}

app.get('/recipes', (req, res) => {
  const filteredRecipes = filterRecipes(req.query);
  res.json(filteredRecipes);
});

app.get('/recipes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const recipe = recipes.find(r => r.id === id);
  if (!recipe) {
    return res.status(404).json({ error: 'Recipe not found' });
  }
  res.json(recipe);
});

app.get('/recipes/:id/image', (req, res) => {
  const id = parseInt(req.params.id);
  const recipe = recipes.find(r => r.id === id);
  if (!recipe) {
    return res.status(404).json({ error: 'Recipe not found' });
  }
  res.json({ image: recipe.image });
});

module.exports.handler = serverless(app, { basePath: '/.netlify/functions/api' });
