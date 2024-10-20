// src/components/NavBar.js
import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; // Importing cart icon
import { CartContext } from '../context/CartContext'; // Cart context for item count
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'; // For mobile menu

function NavBar() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItems } = useContext(CartContext); // Getting cart items from context
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const handleSearch = () => {
    const filteredProducts = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Navigate to the Products page with the filtered results
    navigate('/products', { state: { filteredProducts, searchTerm } });
    setSearchTerm(''); // Clear the search input after navigating
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Brand Name */}
        <Link to="/" className="text-white text-2xl font-bold">
          MyStore
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex items-center justify-center w-full max-w-lg">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                handleSearch(); // Trigger search on Enter key
              }
            }}
            className="p-2 border border-gray-300 rounded-lg w-full max-w-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button 
            onClick={handleSearch} 
            className="ml-2 bg-white text-blue-600 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Search
          </button>
        </div>

        {/* Navigation Links and Cart */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className="text-white hover:text-gray-200 transition-colors">Home</Link>
          <Link to="/products" className="text-white hover:text-gray-200 transition-colors">Products</Link>
          <Link to="/cart" className="relative text-white hover:text-gray-200 transition-colors flex items-center">
            <FaShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span className="bg-red-600 text-white text-xs rounded-full px-2 absolute top-0 right-0">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <AiOutlineClose size={24} className="text-white" /> : <AiOutlineMenu size={24} className="text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-700 text-white space-y-4 p-4">
          <Link to="/" className="block" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/products" className="block" onClick={() => setIsMobileMenuOpen(false)}>Products</Link>
          <Link to="/cart" className="block relative flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
            <FaShoppingCart size={20} />
            {cartItems.length > 0 && (
              <span className="bg-red-600 text-white text-xs rounded-full px-2 absolute top-0 right-0">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
