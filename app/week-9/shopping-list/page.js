'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserAuth } from '../_utils/auth-context';
import Link from 'next/link';
import NewItem from './new-item';
import ItemList from './item-list';
import MealIdeas from './meal-ideas';
import itemsData from './items.json';

export default function Page() {

  const { user, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState('');

  if (!user) {
    return (
      <main className="min-h-screen bg-amber-100 flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-4xl font-bold mb-6 text-emerald-900">Please log in to access the Shopping List</h1>
      </main>
    );
  }

  const handleLogout = async () => {
    try {
      await firebaseSignOut();
      router.push('/week-9'); 
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  function handleAddItem(item) {
    setItems([...items, item]);
  }

  function handleItemSelect(item) {
    // Clean up item name 
    const cleanedName = item.name
      .split(',')[0]
      .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\uD83E[\uDD00-\uDDFF])/g, '')
      .trim()
      .toLowerCase();


    setSelectedItemName(cleanedName);
  }

  return (
    <main className="min-h-screen bg-amber-50 p-8 relative"> 
      <div className="absolute top-12 right-6 flex flex-row gap-3 items-end">
        <button onClick={handleLogout} className="bg-red-600 text-white text-lg px-2 py-1 rounded shadow-md hover:bg-red-700 transition border-2 border-black"> Logout </button>
        <Link href="/week-9/profile" className="bg-emerald-700 text-white text-lg px-2 py-1 rounded hover:bg-emerald-800 transition border-2 border-black">
        Profile </Link>   
        <Link href="/week-9" className="bg-amber-800 text-white text-lg px-2 py-1 rounded hover:bg-amber-700 transition border-2 border-black mr-4"> Home </Link> 
      </div>
      <div className="max-w-5xl mx-auto bg-amber-100 rounded-lg p-6 flex gap-6 border-2 border-emerald-950">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4 text-green-700">Shopping List</h1>
          
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>
        
        <div className="flex-1 bg-amber-50 border-2 border-amber-900  rounded p-4 shadow mt-18">
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
