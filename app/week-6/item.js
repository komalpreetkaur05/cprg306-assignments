export default function Item({ name, quantity, category }) {
  return (
    <li className="bg-green-50 rounded-md  py-2 mb-2">
      <div className="block font-medium capitalize ml-1">{name}</div>
      <div className="text-sm text-amber-800 ml-1">
        Buy {quantity} in {category}
      </div>
    </li>
  );
}
