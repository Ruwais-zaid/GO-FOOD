import React, { createContext, useContext, useReducer } from 'react';

// Create contexts for state and dispatch
const CartStateContext = createContext();
const CartDispatchContext = createContext();

// Define the reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      // Assuming the action.payload contains the new item to add
      return [...state, action.payload];
    case 'REMOVE':
      let newArr=[...state]
      newArr.splice(action.index,1)
      return newArr;
      case 'UPDATE':
        // Find the item in the cart and update its quantity and price
        return state.map(item =>
          item.id === action.payload.id && item.size === action.payload.size
            ? { ...item, qty: action.payload.qty, price: action.payload.price }
            : item
        );

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

// Create a provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

// Custom hook to use the cart state
export const useCart = () => {
  const context = useContext(CartStateContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Custom hook to use the cart dispatch
export const useDispatch = () => {
  const context = useContext(CartDispatchContext);
  if (context === undefined) {
    throw new Error('useDispatch must be used within a CartProvider');
  }
  return context;
};