'use client';

import { useState } from 'react';
import NewItem from './new-item';
import ItemList from './item-list';
import MealIdeas from './meal-ideas';
import itemsData from './items.json';

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState('');

  function handleAddItem(item) {
    setItems([...items, item]);
  }

  function handleItemSelect(item) {
    // Clean up item name by removing quantity, emoji, etc.
    const cleanedName = item.name
      .split(',')[0]                       // Remove everything after comma
      .replace(/[\u{1F600}-\u{1F6FF}]/gu, '') // Remove emojis (basic emoji range)
      .trim()
      .toLowerCase();

    setSelectedItemName(cleanedName);
  }

  return (
    <main className="min-h-screen bg-gray-200 p-6">
      <div className="max-w-5xl mx-auto bg-amber-100 rounded-lg p-6 flex gap-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4 text-green-700">Shopping List</h1>
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>
        
        <div className="flex-1 bg-white rounded p-4 shadow">
          <h2 className="text-2xl font-semibold mb-4">Meal Ideas</h2>
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
