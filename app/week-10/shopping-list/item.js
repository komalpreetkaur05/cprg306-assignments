export default function Item({ id, name, quantity, category, onSelect, onDelete }) {
  return (
    <li className="flex justify-between items-center mb-2 cursor-pointer">
      <div onClick={() => onSelect({ name, quantity, category })}>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-700">Buy {quantity} in {category}</p>
      </div>
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation(); 
            onDelete(id);
          }}
          className="text-red-600 hover:text-red-800"
        > Delete</button>
      )}
    </li>
  );
}
