import React from 'react';
import { useCart, useDispatch } from '../components/ContextReducer';
import { MdDelete } from "react-icons/md";
import {loadStripe} from '@stripe/stripe-js'

const Cart = () => {
  const cartItems = useCart();
  console.log(cartItems)
  const dispatch = useDispatch();

  if (!cartItems.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center text-3xl font-bold">The Cart is Empty</div>
      </div>
    );
  }

  const totalprice = cartItems.reduce((total, food) => total + food.price, 0);

  const makePayment = async () => {
    try {
      const stripe = await loadStripe("pk_test_51PWC9M2LziqgFmouMXmpfXao6hHV89npIejImDkFckVNKJnH3cPhQA2GOacXKoZcWMUL75sGY8bLOuLfKhGyOKCh002jGruHmz");

      const body = { products: cartItems };
      const headers = { "Content-Type": "application/json" };

      const response = await fetch("http://localhost:3000/api/create-checkout", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
      });
      console.log(response)

      const session = await response.json();
      // Redirect to Stripe checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id
      });

      if (result.error) {
        console.error('Error during checkout redirection:', result.error.message);
      }
    } catch (error) {
      console.error('Error during makePayment:', error);
    }
  };

  return (
    <div className="   p-1/3 ">
      <div className="max-w-10xl mx-auto p-4 bg-white rounded-lg ">
        <h1 className="text-4xl font-bold text-green-600 p-4 text-center">MY CART</h1>
        <hr />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
          {cartItems.map((food, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <span className="block text-lg font-semibold mb-2">Name</span>
              <p className="text-gray-700">{food.name}</p>
              <span className="block text-lg font-semibold mb-2">Quantity</span>
              <p className="text-gray-700">{food.qty}</p>
              <span className="block text-lg font-semibold mb-2">Options</span>
              <p className="text-gray-700">Size: {food.size}</p>
              <span className="block text-lg font-semibold mb-2">Amount</span>
              <p className="text-gray-700">RS {food.price.toFixed(2)}</p>
              <div className='ml-72'>
              <MdDelete type='button' onClick={()=>{
                dispatch({
                  type:'REMOVE',
                  index:index
                }) 
              }}/>


              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-end items-center">
          <span className="text-2xl font-semibold mr-4">Total: RS {totalprice.toFixed(2)}</span>
          <button className="bg-black text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200" onClick={makePayment}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
