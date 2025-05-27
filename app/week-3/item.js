
export default function Item({name, quantity, category}){
    return(
        <li className="p-2 bg-green-50 rounded-lg border border-amber-900 hover:shadow-md transition duration-200">
            <div className="text-emerald-900 font-semibold text-lg">{name}</div>
            <div className="text-amber-700"> Buy {quantity} in {category}</div>
        </li>

    );
}