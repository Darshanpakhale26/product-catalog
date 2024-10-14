// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Brand Name */}
        <Link to="/" className="text-white text-2xl font-bold">
          MyStore
        </Link>

        {/* Navigation Links */}
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-200 transition-colors">Home</Link>
          <Link to="/products" className="text-white hover:text-gray-200 transition-colors">Products</Link>
          <Link to="/cart" className="text-white hover:text-gray-200 transition-colors">Cart</Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
