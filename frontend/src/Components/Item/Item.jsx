import React, { useState } from "react";
import "./Item.css"; // Link to CSS
import cart_icon from "../Assets/cart_icon.png"; // Adjust path accordingly

const URL = "16.171.170.5";

const Item = ({ id, name, image, price, initialQuantity }) => {
  const [quantity, setQuantity] = useState(initialQuantity); // Track quantity state

  // Function to handle the checkout process
  const handleCheckout = () => {
    if (quantity === 0) return; // Prevent checkout if out of stock

    const items = [
      {
        id: id,
        quantity: 1, // Purchase 1 item
      },
    ];

    fetch(`http://${URL}:4000/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: items,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        // Redirect to the payment page
        window.location = url;

        // Simulate quantity decrease locally after successful checkout
        setQuantity((prevQuantity) => Math.max(0, prevQuantity - 1));
      })
      .catch((e) => {
        console.error(e.error);
      });
  };

  return (
    <div className="item">
      <img src={image} alt={name} />
      <p>{name}</p>
      <div className="item-prices">
        <div className="item-price-new">Rs.{price}</div>
      </div>
      <button
        className="add-to-cart-btn"
        onClick={handleCheckout}
        disabled={quantity === 0} // Disable if out of stock
      >
        <img src={cart_icon} alt="Cart Icon" />
        {quantity === 0 ? "Out of Stock" : "Buy Now"}{" "}
        {/* Change label based on quantity */}
      </button>
    </div>
  );
};

export default Item;
