// src/components/Cart.js
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  if (cartItems.length === 0) {
    return <h2>Your cart is empty!</h2>;
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.map(item => (
        <div className="cart-item" key={item.id}>
          <img src={item.image} alt={item.title} />
          <div className="item-details">
            <h3>{item.title}</h3>
            <p>${item.price}</p>
          </div>
          <div className="item-actions">
            <input 
              type="number" 
              value={item.quantity} 
              onChange={e => updateQuantity(item.id, Number(e.target.value))} 
              min="1"
            />
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cart;
