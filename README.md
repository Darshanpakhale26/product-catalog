# 🛒 Product Catalog Application - React

A fully responsive **Product Catalog Application** built using **React** that allows users to browse, search, sort, and filter products fetched from the **FakeStore API**. Users can view detailed product information and manage a shopping cart by adding or removing products and updating product quantities.

## ✨ Features
- **Product List Page**: Fetch and display products with a grid layout, including name, price, thumbnail, and description. Implement search, sorting, and filtering functionalities. Each product includes an "Add to Cart" button.
- **Product Detail Page**: View detailed product information with larger images and descriptions. Users can select quantities and add products to the cart.
- **Shopping Cart Page**: Manage the cart with options to update quantities, remove products, and view the total price.
- **Routing**: Seamless navigation between pages using **React Router**.

## 🔧 Technologies Used
- **React** (functional components)
- **React Router** for client-side routing
- **FakeStore API** for product data
- **Context API** for global state management
- **CSS** for styling

## 🛠 React Hooks Used
- **useState**: Manage local component state (e.g., search term, cart items).
- **useEffect**: Make API calls and react to state changes.
- **useContext**: Access and update global cart state across components.
- **useNavigate**: Navigate between routes in the app.

## 🚀 Getting Started
1. **Clone the repository**:
    ```bash
    git clone
    ```
2. **Install dependencies**:
    ```bash
    npm install
    ```
3. **Start the development server**:
    ```bash
    npm start
    ```
4. **Open the app**:
    ```bash
    http://localhost:3000
    ```
5. **Build the app**:
    ```bash
    npm run build
    ```
6. **Deploy the app**:
    ```bash
    npm run deploy
    ```

## 📡 API Information
- **FakeStore API**: [FakeStore API](https://fakestoreapi.com/)
- **Get all products**: GET https://fakestoreapi.com/products
- **Get product by ID**: GET https://fakestoreapi.com/products/:id

