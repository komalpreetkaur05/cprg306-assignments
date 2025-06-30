'use client';

import { useState } from 'react';
import NewItem from './new-item';
import ItemList from './item-list';
import itemsData from './items.json';

export default function Page() {
  const [items, setItems] = useState(itemsData);

  function handleAddItem(item) {
    setItems([...items, item]); 
  }
  return (
    <main className="min-h-screen bg-gray-200 p-6">
      <div className="max-w-2xl mx-auto bg-amber-100 rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-green-700">Shopping List</h1>
        
      <NewItem onAddItem={handleAddItem} />
      <ItemList items={items} />
        
      </div>
    </main>
  );
}
