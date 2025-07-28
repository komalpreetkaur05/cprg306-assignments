'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserAuth } from '../_utils/auth-context';
import {getItems, addItem, deleteItem} from '../_services/shopping-list-service';
import Link from 'next/link';
import NewItem from './new-item';
import ItemList from './item-list';
import MealIdeas from './meal-ideas';

export default function Page() {

  const { user, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState('');

  useEffect(() => {
    const loadItems = async () => {
      if (user) 
        {
          const data = await getItems(user.uid); 
          setItems(data); 
        }
    };
    loadItems();
  }, [user]);

  if (!user) {
    return (
      <main className="min-h-screen bg-amber-100 flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-4xl font-bold mb-6 text-emerald-900">Please log in to access the Shopping List</h1>
      </main>
    );
  };

  

  const handleLogout = async () => {
    try {
      await firebaseSignOut();
      router.push('/week-10'); 
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleAddItem = async (item) => {
    await addItem(user.uid, item);
    const updatedItems = await getItems(user.uid);
    setItems(updatedItems);

  };

  const handleDeleteItem = async (itemId) => {
  if (!user) return;

  await deleteItem(user.uid, itemId);
  setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
};


  function handleItemSelect(item) {
    const cleanedName = item.name
      .split(',')[0]
      .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\uD83E[\uDD00-\uDDFF])/g, '')
      .trim()
      .toLowerCase();


    setSelectedItemName(cleanedName);
  }

  return (
    <main className="min-h-screen bg-amber-50 p-14"> 
      <div className="absolute top-2 right-6 flex flex-row gap-3 items-end">
        <button onClick={handleLogout} className="bg-red-600 text-white text-lg px-2 py-1 rounded shadow-md hover:bg-red-700 transition border-2 border-black"> Logout </button>
        <Link href="/week-10/profile" className="bg-emerald-700 text-white text-lg px-2 py-1 rounded hover:bg-emerald-800 transition border-2 border-black">
        Profile </Link>   
        <Link href="/week-10" className="bg-amber-800 text-white text-lg px-2 py-1 rounded hover:bg-amber-700 transition border-2 border-black mr-4"> Home </Link> 
      </div>
      <div className="max-w-5xl mx-auto bg-amber-100 rounded-lg p-6 flex gap-6 border-2 border-emerald-950">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4 text-green-700">Shopping List</h1>
          
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} onItemDelete={handleDeleteItem} />
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
