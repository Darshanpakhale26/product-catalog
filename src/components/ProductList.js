// src/components/ProductList.js
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { CartContext } from '../context/CartContext';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

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
    <div className="product-list">
      <h1>Product Catalog</h1>

      {/* Search Bar */}
      <input 
        type="text" 
        placeholder="Search for products..." 
        value={searchTerm} 
        onChange={e => setSearchTerm(e.target.value)} 
      />

      {/* Sort Dropdown */}
      <select onChange={e => setSortType(e.target.value)}>
        <option value="">Sort By</option>
        <option value="price-asc">Price (Low to High)</option>
        <option value="price-desc">Price (High to Low)</option>
        <option value="name">Name</option>
      </select>

      {/* Filter by Category */}
      <select onChange={e => setFilterCategory(e.target.value)}>
        <option value="">Filter by Category</option>
        <option value="men's clothing">Men's Clothing</option>
        <option value="electronics">Electronics</option>
      </select>

      {/* Filter by Price */}
      <div>
        <label>Price Range: </label>
        <input 
          type="number" 
          placeholder="Min Price" 
          onChange={e => setPriceRange([e.target.value, priceRange[1]])} 
        />
        <input 
          type="number" 
          placeholder="Max Price" 
          onChange={e => setPriceRange([priceRange[0], e.target.value])} 
        />
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {filteredProducts.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <p>{product.description.substring(0, 100)}...</p>
            <Link to={`/product/${product.id}`}>View Details</Link>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* Go to Cart Button */}
      <button className="go-to-cart-button" onClick={() => navigate('/cart')}>
        Go to Cart
      </button>
    </div>
  );
}

export default ProductList;
