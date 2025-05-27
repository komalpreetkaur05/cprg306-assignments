import ItemList from "./item-list";

export default function Page(){
    return(
        <main>
            <h1 className="text-4xl text-left m-5 text-amber-950">Shopping List</h1>
            <ItemList />
        </main>
    )
}