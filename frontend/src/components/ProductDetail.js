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

  if (!product) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="product-detail max-w-5xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Product Image */}
        <div className="flex justify-center">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-auto max-w-sm object-contain"
          />
        </div>
        
        {/* Product Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-semibold mb-4">{product.title}</h2>
            <p className="text-xl font-bold text-gray-800 mb-4">${product.price}</p>
            <p className="text-gray-600 mb-6">{product.description}</p>
          </div>

          {/* Quantity Input */}
          <div className="flex items-center mb-4">
            <label className="mr-4 font-semibold">Quantity:</label>
            <input 
              type="number" 
              value={quantity} 
              onChange={e => setQuantity(Number(e.target.value))} 
              min="1" 
              className="border border-gray-300 p-2 rounded-md w-16"
            />
          </div>

          {/* Add to Cart Button */}
          <button 
            onClick={() => addToCart(product, quantity)} 
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-colors mb-4"
          >
            Add to Cart
          </button>

          {/* Go to Cart Button */}
          <button 
            onClick={() => navigate('/cart')} 
            className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition-colors"
          >
            Go to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
