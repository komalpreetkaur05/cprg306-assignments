'use client';

import { useState } from 'react';
import { useUserAuth } from '../_utils/auth-context';
import NewItem from './new-item';
import ItemList from './item-list';
import MealIdeas from './meal-ideas';
import itemsData from './items.json';

export default function Page() {

  const { user } = useUserAuth();

  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState('');

  if (!user) {
    return (
      <main className="min-h-screen bg-amber-100 flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-4xl font-bold mb-6 text-emerald-900">Please log in to access the Shopping List</h1>
      </main>
    );
  }

  function handleAddItem(item) {
    setItems([...items, item]);
  }

  function handleItemSelect(item) {
    // Clean up item name by removing quantity, emoji, etc.
    const cleanedName = item.name
      .split(',')[0]
      .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\uD83E[\uDD00-\uDDFF])/g, '')
      .trim()
      .toLowerCase();


    setSelectedItemName(cleanedName);
  }

  return (
    <main className="min-h-screen bg-amber-50 p-6 ">
      <div className="max-w-5xl mx-auto bg-amber-100 rounded-lg p-6 flex gap-6 border-2 border-emerald-950">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4 text-green-700">Shopping List</h1>
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>
        
        <div className="flex-1 bg-amber-50 border-2 border-amber-900  rounded p-4 shadow">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-800">Meal Ideas</h2>
          {selectedItemName ? (
            <MealIdeas ingredient={selectedItemName} />
          ) : (
            <p>Select an item to see meal ideas</p>
          )}
        </div>
      </div>
    </main>
  );
}
