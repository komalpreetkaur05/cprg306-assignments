'use client';
import { useEffect, useState } from 'react';

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchMealIdeas(ingredient) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await response.json();
    return data.meals || [];
  }

  async function loadMealIdeas() {
    if (!ingredient) {
      setMeals([]);
      return;
    }
    setLoading(true);
    const mealIdeas = await fetchMealIdeas(ingredient);
    setMeals(mealIdeas);
    setLoading(false);
  }

  useEffect(() => {
    loadMealIdeas();
  }, [ingredient]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Meal Ideas for: {ingredient}</h2>
      {loading && <p>Loading meal ideas...</p>}
      {!loading && meals.length === 0 && <p>No meal ideas found.</p>}
      <ul className="list-disc list-inside space-y-1">
        {meals.map(meal => (
          <li key={meal.idMeal}>
            {meal.strMeal}
          </li>
        ))}
      </ul>
    </div>
  );
}
// This component fetches meal ideas based on the selected ingredient.
// It uses the MealDB API to get meal ideas and displays them in a list.
// The component updates whenever the `ingredient` prop changes, fetching new meal ideas accordingly.