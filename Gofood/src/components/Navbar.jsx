import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './ContextReducer'; 
import Cart from '../screen/Cart';
import Modal from './Modal'; 

const Navbar = () => {
  const cartItems = useCart();
  const [isCartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div>
      <nav className="flex justify-between p-5 items-center bg-green-600">
        <Link className="text-3xl text-white font-bold" to="/">Go Food</Link>
        <div className="flex items-center space-x-20">
          <ul className="flex items-center space-x-16">
            <Link className="font-semibold text-green-600 text-xl bg-white p-3 rounded-lg" to="/">Home</Link>
            {localStorage.getItem("authToken") && (
              <Link className="font-semibold text-green-600 text-xl bg-white p-3 rounded-lg" to="/orders">My Orders</Link>
            )}
          </ul>
          <div>
            {!localStorage.getItem("authToken") ? (
              <div className="flex space-x-16">
                <Link className="font-semibold text-green-600 text-xl bg-white p-3 rounded-lg" to="/login">Login</Link>
                <Link className="font-semibold text-green-600 text-xl bg-white p-3 rounded-lg" to="/register">Sign In</Link>
              </div>
            ) : (
              <div className="flex space-x-16 items-center">
                <div className="relative" onClick={() => setCartOpen(true)}>
                  <button className="font-semibold text-green-600 text-xl bg-white p-3 rounded-lg">
                    My Cart
                  </button>
                  <div className="bg-black rounded-full w-6 h-6 absolute left-[-7px] top-[-2px] flex items-center justify-center">
                    <span className="text-white font-bold">{cartItems.length}</span>
                  </div>
                </div>
                <button className="font-semibold text-red-500 text-xl bg-white p-3 rounded-lg" onClick={handleLogout}>
                  Logout
                </button>
                {/* Modal for Cart */}
                {isCartOpen && (
                  <Modal isOpen={isCartOpen} onClose={() => setCartOpen(false)}>
                    <Cart />
                  </Modal>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
