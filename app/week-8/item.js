
export default function Item({ name, quantity, category, onSelect }) {
  return (
    <li
      onClick={() => onSelect({ name, quantity, category })}
      className="cursor-pointer mb-2"
    >
      <p className="font-medium">{name}</p>
      <p className="text-sm text-gray-700">Buy {quantity} in {category}</p>
    </li>
  );
}
