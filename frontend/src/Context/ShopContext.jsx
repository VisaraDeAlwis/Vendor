import React, { createContext, useEffect, useState } from "react";

// Create the context
export const ShopContext = createContext(null);

const URL = "13.60.205.166";

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [hasFetched, setHasFetched] = useState(false); // Track whether products have been fetched

  // Function to fetch all products from the backend
  const fetchAllProducts = async () => {
    try {
      const response = await fetch(`http://${URL}:4000/allproducts`); // Replace with your actual API endpoint
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // Check if data is already in all_product to avoid duplicates
      const uniqueProducts = data.filter(
        (item, index, self) => index === self.findIndex((p) => p.id === item.id)
      );
      setAll_Product(uniqueProducts); // Set unique product data
      setHasFetched(true); // Mark fetch as completed
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // Only fetch products once
  useEffect(() => {
    if (!hasFetched && all_product.length === 0) {
      fetchAllProducts();
    }
  }, [hasFetched, all_product.length]); // Dependency on hasFetched and all_product length

  // Cart management functions
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) =>
      prevItems.filter((cartItem) => cartItem.id !== id)
    );
  };

  const updateCartQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.id === id ? { ...cartItem, quantity: newQuantity } : cartItem
      )
    );
  };

  const clearCart = () => {
    setCartItems([]); // Clear all items from the cart
  };

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    fetchAllProducts,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
