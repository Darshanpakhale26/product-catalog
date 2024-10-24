import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Products from "./components/Products";
import Login from "./components/Login"; // Import the LoginForm component
import Register from "./components/Register"; // Import the RegisterForm component

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* NavBar */}
        <NavBar />

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/product-catalog" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<Login />} />{" "}
            {/* Add the Login route */}
            <Route path="/register" element={<Register />} />{" "}
            {/* Add the Register route */}
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
