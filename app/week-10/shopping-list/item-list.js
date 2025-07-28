'use client';

import { useState } from 'react';
import Item from './item';

export default function ItemList({ items, onItemSelect, onItemDelete }) {
  const [sortBy, setSortBy] = useState('name');

  let content;

  if (sortBy === 'name' || sortBy === 'category') {
    const sortedItems = [...items].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else {
        return a.category.localeCompare(b.category);
      }
    });

    content = (
      <ul>
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            quantity={item.quantity}
            category={item.category}
            onSelect={() => onItemSelect(item)}
            onDelete={() => onItemDelete(item.id)}
          />
        ))}
      </ul>
    );
  } else if (sortBy === 'grouped') {
    // Group by category
    const grouped = items.reduce((acc, item) => {
      const cat = item.category;
      if (!acc[cat]) {
        acc[cat] = [];
      }
      acc[cat].push(item);
      return acc;
    }, {});

    // Sort categories alphabetically
    const sortedCategories = Object.keys(grouped).sort();

    content = (
      <div>
        {sortedCategories.map((category) => (
          <div key={category} className="mb-4">
            <h2 className="text-lg font-semibold capitalize mb-2 border-b pb-1">
              {category}
            </h2>
            <ul className="pl-4">
              {grouped[category]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((item) => (
                  <Item
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    quantity={item.quantity}
                    category={item.category}
                    onSelect={() => onItemSelect(item)}
                    onDelete={ onItemDelete(item.id)}
                  />
                ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 mx-auto bg-amber-50 border-2 border-amber-800 p-6 rounded shadow">
      {/* Sort Buttons */}
      <div className="flex justify-center gap-3 mb-4">
        {['name', 'category', 'grouped'].map((type) => (
          <button
            key={type}
            onClick={() => setSortBy(type)}
            className={`px-4 py-2 rounded capitalize ${
              sortBy === type ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            {type === 'grouped' ? 'Group by Category' : `Sort by ${type}`}
          </button>
        ))}
      </div>

      {/* Rendered List of Items */}
      {content}
    </div>
  );
}


        