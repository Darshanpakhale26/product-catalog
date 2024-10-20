// src/components/Products.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // To retrieve the state passed via navigation
import { Link } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState([]);
  const location = useLocation(); // Retrieve state from the location
  const filteredProducts = location.state?.filteredProducts || null; // Use filtered products if available
  const searchTerm = location.state?.searchTerm || ''; // Get the search term if passed

  useEffect(() => {
    if (!filteredProducts) {
      // Fetch all products only if no filtered results are passed
      fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => setProducts(data));
    } else {
      setProducts(filteredProducts);
    }
  }, [filteredProducts]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Product Catalog</h1>

      {searchTerm && (
        <p className="text-center text-gray-600 mb-4">
          Showing results for: <strong>{searchTerm}</strong>
        </p>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div
            className="bg-white border border-gray-200 p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
            key={product.id}
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-contain mb-4"
            />
            <h3 className="text-lg font-semibold">
              {product.title.length > 10
                ? product.title.slice(0, 10) + '...'
                : product.title}
            </h3>
            <p className="text-xl font-bold text-blue-600">${product.price}</p>
            <Link to={`/product/${product.id}`} className="text-blue-500 hover:underline">
              View Details
            </Link>
          </div>
        ))}
      </div>

      {/* If no products found */}
      {products.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No products found. Please try another search term.
        </div>
      )}
    </div>
  );
}

export default Products;
