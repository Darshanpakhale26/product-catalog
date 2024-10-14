// src/components/ProductList.js
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const handleBuyNow = (productId) => {
    navigate(`/product/${productId}`);
  };

  const filteredProducts = products
    .filter(product => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(product => 
      (filterCategory ? product.category === filterCategory : true) &&
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    .sort((a, b) => {
      if (sortType === 'price-asc') return a.price - b.price;
      if (sortType === 'price-desc') return b.price - a.price;
      if (sortType === 'name') return a.title.localeCompare(b.title);
      return 0;
    });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Product Catalog</h1>

      {/* Search Bar */}
      <div className="mb-6 flex items-center justify-center">
        <input 
          type="text" 
          placeholder="Search for products..." 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)} 
          className="p-2 border border-gray-300 rounded-lg w-full max-w-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Sort and Filter Options */}
      <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
        <select 
          onChange={e => setSortType(e.target.value)} 
          className="p-2 border border-gray-300 rounded-lg"
        >
          <option value="">Sort By</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
          <option value="name">Name</option>
        </select>

        <select 
          onChange={e => setFilterCategory(e.target.value)} 
          className="p-2 border border-gray-300 rounded-lg"
        >
          <option value="">Filter by Category</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="electronics">Electronics</option>
        </select>

        <div className="flex items-center space-x-2">
          <input 
            type="number" 
            placeholder="Min Price" 
            onChange={e => setPriceRange([e.target.value, priceRange[1]])} 
            className="p-2 border border-gray-300 rounded-lg w-24"
          />
          <input 
            type="number" 
            placeholder="Max Price" 
            onChange={e => setPriceRange([priceRange[0], e.target.value])} 
            className="p-2 border border-gray-300 rounded-lg w-24"
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div className="bg-white border border-gray-200 p-4 rounded-lg shadow hover:shadow-lg transition-shadow" key={product.id}>
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-40 object-contain mb-4"
            />
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-xl font-bold text-blue-600">${product.price}</p>
            <Link to={`/product/${product.id}`} className="text-blue-500 hover:underline">View Details</Link>
            
            {/* Button Group */}
            <div className="flex justify-between items-center mt-4">
              {/* Add to Cart Button */}
              <button 
                onClick={() => addToCart(product)} 
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
              >
                Add to Cart
              </button>

              {/* Buy Now Button */}
              <button 
                onClick={() => handleBuyNow(product.id)} 
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Go to Cart Button */}
      <div className="mt-8 flex justify-center">
        <button 
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
          onClick={() => navigate('/cart')}
        >
          Go to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductList;
