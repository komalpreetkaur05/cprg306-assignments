import ItemList from './item-list';

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-200 p-6">
      <div className="max-w-2xl mx-auto bg-amber-100 rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-green-700">Shopping List</h1>
        <ItemList />
      </div>
    </main>
  );
}
