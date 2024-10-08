// src/components/ProductDetail.js
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { CartContext } from '../context/CartContext';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.title} />
      <h2>{product.title}</h2>
      <p>${product.price}</p>
      <p>{product.description}</p>

      {/* Quantity Input */}
      <input 
        type="number" 
        value={quantity} 
        onChange={e => setQuantity(Number(e.target.value))} 
        min="1" 
      />
      <button onClick={() => addToCart(product, quantity)}>Add to Cart</button>

      {/* Go to Cart Button */}
      <button className="go-to-cart-button" onClick={() => navigate('/cart')}>
        Go to Cart
      </button>
    </div>
  );
}

export default ProductDetail;
