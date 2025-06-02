"use client"

import {useState} from "react";

export default function NewItem(){
    let [quantity, setQuantity] = useState(1);

    const increment = () => {
        let currentQuantity = quantity.valueOf();

        if(currentQuantity <= 19){
            setQuantity(currentQuantity + 1);
        }

    }

    const decrement = () => {
        let currentQuantity = quantity.valueOf();

        if(currentQuantity >= 2){
            setQuantity(currentQuantity - 1);
        }

    }

    let buttonStyles1 = "bg-blue-500 hover:bg-blue-200 text-white px-3 py-2.5 rounded-2xl border-2";
    if(quantity>= 20 ){
        buttonStyles1="bg-gray-500 text-white px-3 py-2.5 rounded-2xl border-2";
    }

    let buttonStyles = "bg-blue-500 hover:bg-blue-200 text-white px-3 py-2.5 rounded-2xl border-2";
    if(quantity <=1 ){
        buttonStyles="bg-gray-500 text-white px-3 py-2.5 rounded-2xl border-2";
    }


    return(
        <main className="p-4">
            <h1 className="text-3xl text-amber-800 font-bold mb-3">Quantity</h1>
            <p>Current Quantity: {quantity}</p>
            <button onClick={increment} className={buttonStyles1}>Increase Quantity </button>

            <button onClick={decrement} className={buttonStyles}>Decrease Quantity </button>



        </main>

    );
}