// src/components/Cart.js
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  if (cartItems.length === 0) {
    return <h2 className="text-center text-2xl font-semibold my-10">Your cart is empty!</h2>;
  }

  return (
    <div className="cart-page max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
      {cartItems.map(item => (
        <div 
          className="cart-item flex items-center border-b border-gray-300 py-4" 
          key={item.id}
        >
          {/* Product Image */}
          <div className="w-24 h-24">
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-full object-contain"
            />
          </div>

          {/* Item Details */}
          <div className="item-details flex-1 ml-4">
            <h3 className="text-xl font-medium">{item.title}</h3>
            <p className="text-lg font-semibold text-gray-700">${item.price}</p>
          </div>

          {/* Quantity and Actions */}
          <div className="item-actions flex items-center space-x-4">
            <input 
              type="number" 
              value={item.quantity} 
              onChange={e => updateQuantity(item.id, Number(e.target.value))} 
              min="1" 
              className="w-16 p-2 border border-gray-300 rounded-md text-center"
            />
            <button 
              onClick={() => removeFromCart(item.id)} 
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cart;
