import React, { useState } from 'react';
import { useDispatch, useCart } from '../components/ContextReducer';

const Cards = (props) => {
  const dispatch = useDispatch();
  const cartItems = useCart(); // Rename data to cartItems for clarity
  const options = props.options;
  const priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(priceOptions[0]); // Initialize size with the first available option

  const finalPrice = options[size] * qty;

  const handleCart = async () => {
    // Find if the item already exists in the cart
    const existingItem = cartItems.find(item => item.id === props.id && item.size === size);

    if (existingItem) {
      // If item exists, update the quantity and price
      await dispatch({
        type: 'UPDATE',
        payload: {
          id: props.id,
          size: size,
          qty: qty, // Add the new quantity to the existing one
          price: options[size] * (existingItem.qty + qty) // Update the price based on new quantity
        }
      });
    } else {
      // If item does not exist, add it to the cart
      await dispatch({
        type: 'ADD',
        payload: {
          id: props.id,
          name: props.item,
          img: props.image,
          qty: qty,
          size: size,
          price: finalPrice // Set the price based on selected size and quantity
        }
      });
    }
  };

  return (
    <section className="max-w-xl mx-auto px-2 sm:px-6 lg:px-3 py-8">
      <div className="w-full bg-white rounded-lg p-12 flex flex-col justify-center items-center border border-1 border-green-500">
        <div className="mb-8">
          <img
            className="object-center object-cover rounded-full h-36 w-36"
            src={props.image}
            alt={props.name}
          />
        </div>
        <div className="text-center">
          <p className="text-xl text-gray-700 font-bold mb-2">{props.item}</p>
          <div className="flex gap-5">
            <select
              className="m-2 w-100 bg-green-600 border-none rounded-lg text-white"
              value={qty}
              onChange={(e) => setQty(parseInt(e.target.value))}
            >
              {Array.from({ length: 6 }, (_, i) => i + 1).map((number) => (
                <option key={number} value={number} className="text-white text-md">
                  {number}
                </option>
              ))}
            </select>
            <select
              className="m-2 w-100 bg-green-600 border-none rounded-lg text-white"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((option) => (
                <option key={option} value={option} className="text-white text-md">
                  {option}
                </option>
              ))}
            </select>
            <button
              className="bg-black text-md font-bold text-white p-4 rounded-lg w-100"
              onClick={handleCart}
            >
              Add
            </button>
            <span className=" bg-black text-md font-bold text-white p-4 rounded-lg w-100">Price RS: {finalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cards;
