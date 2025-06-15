import NewItem from "./new-item";

export default function Page() {
    return (
        <main className="p-4">
            <h1 className="text-3xl text-amber-800 font-bold mb-3"> Add Item to Shopping List : </h1>
            <NewItem />
        </main>
    );
}