'use client';
import { useEffect, useState } from 'react';

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedMealId, setExpandedMealId] = useState(null);
  const [mealIngredients, setMealIngredients] = useState({});

  async function fetchMealIdeas(ingredient) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await res.json();
    return data.meals || [];
  }

  async function fetchMealDetails(mealId) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const data = await res.json();
    return data.meals?.[0];
  }

  async function handleMealClick(mealId) {
    if (expandedMealId === mealId) {
      setExpandedMealId(null);
      return;
    }
    setExpandedMealId(mealId);

    if (!mealIngredients[mealId]) {
      const mealDetails = await fetchMealDetails(mealId);
      const ingredients = [];

      for (let i = 1; i <= 20; i++) {
        const ingr = mealDetails[`strIngredient${i}`];
        const measure = mealDetails[`strMeasure${i}`];
        if (ingr && ingr.trim()) {
          ingredients.push(`${measure?.trim() || ''} ${ingr.trim()}`.trim());
        }
      }

      setMealIngredients((prev) => ({
        ...prev,
        [mealId]: ingredients,
      }));
    }
  }

  useEffect(() => {
    async function load() {
      if (!ingredient) return setMeals([]);
      setLoading(true);
      setMeals(await fetchMealIdeas(ingredient));
      setLoading(false);
      setExpandedMealId(null);
    }
    load();
  }, [ingredient]);

  return (
    <div >
      <h2 className="text-1xl font-semibold mb-4 text-amber-800">
        Meal Ideas for: <span className="capitalize">{ingredient}</span>
      </h2>

      {loading && <p className="text-gray-600 italic">Loading meal ideas...</p>}

      {!loading && meals.length === 0 && (
        <p className="text-red-600">No meal ideas found.</p>
      )}

      <ul className="flex flex-wrap gap-4">
        {meals.map((meal) => (
          <li key={meal.idMeal} 
          onClick={() => handleMealClick(meal.idMeal)}className="border-2 rounded-2xl p-2 border-emerald-950 bg-emerald-50 hover:bg-emerald-100 transition-colors w-full md:w-[75%]">
            <div className="text">{meal.strMeal}
            </div>

            {expandedMealId === meal.idMeal && mealIngredients[meal.idMeal] && (
              <ul className="mt-2 ml-4 list-disc text-sm text-emerald-950 space-y-1">
                {mealIngredients[meal.idMeal].map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
