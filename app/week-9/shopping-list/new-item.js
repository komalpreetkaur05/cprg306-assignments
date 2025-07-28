"use client"

import {useState} from "react";

export default function NewItem({onAddItem}) {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState('produce');

    const increment = () => {
      let currentQuantity = quantity.valueOf();

        if(currentQuantity <= 19){
            setQuantity(currentQuantity + 1);
        }

    };

    const decrement = () => {
        let currentQuantity = quantity.valueOf();

        if(currentQuantity >= 2){
            setQuantity(currentQuantity - 1);
        }

    };

    const handleSubmit = (e) => {
    e.preventDefault();
    const item = {
      id: Math.random().toString(36).substring(2, 9), // Generate a random ID
      name,
      quantity,
      category,
    };
    
    onAddItem(item);
    // Reset form fields
    setName('');
    setQuantity(1);
    setCategory('produce');
  };


    return(
      <main className="p-6 mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4 mx-auto bg-amber-50  border-2 border-amber-800 p-6 rounded shadow">
        {/* Name Input */}
        <div>
          <label className="block font-medium mb-1">Item Name:</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-black rounded px-3 py-2"
          />
        </div>

        {/* Category Select */}
        <div>
          <label className="block font-medium mb-1">Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-950 rounded px-3 py-2"
          >
            {[
              'Produce',
              'Dairy',
              'Bakery',
              'Meat',
              'Frozen Foods',
              'Canned Goods',
              'Dry Goods',
              'Beverages',
              'Snacks',
              'Household',
              'Other',
            ].map((cat) => (
              <option key={cat} value={cat.toLowerCase()}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity Controls */}
        <div>
          <label className="block font-medium mb-1">Quantity:</label>
          <p className="mb-2">Current Quantity: {quantity}</p>
          <div className="flex gap-4">

            <button
              type="button"
              onClick={increment}
              disabled={quantity >= 20}
              className={`px-3 py-2.5 rounded-2xl border-2 ${
                quantity >= 20
                  ? 'bg-gray-500 text-white'
                  : 'bg-blue-800 hover:bg-blue-300 text-white'
              }`}
            >
              Increase Quantity
            </button>

            <button
              type="button"
              onClick={decrement}
              disabled={quantity <= 1}
              className={`px-3 py-2.5 rounded-2xl border-2 ${
                quantity <= 1
                  ? 'bg-gray-500 text-white'
                  : 'bg-blue-800 hover:bg-blue-300 text-white'
              }`}
            >
              Decrease Quantity
            </button>
            
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-amber-800 text-white py-2 px-4 rounded hover:bg-amber-900"
        >
          Add Item
        </button>
      </form>
    </main>
        

    );
}