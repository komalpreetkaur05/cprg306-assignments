

export default function Item({ name, quantity, category, onSelect }) {
  return (
    <li onClick={() => onSelect({ name, quantity, category })}>
      {name}, {quantity} ({category})
    </li>
  );
}
