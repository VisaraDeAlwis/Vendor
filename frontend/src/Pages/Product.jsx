import React from 'react';
import { useParams } from 'react-router-dom';

const Product = () => {
  const { productId } = useParams(); // Get product ID from URL
  return (
    <div>
      <h1>Product Details for ID: {productId}</h1>
    </div>
  );
}

export default Product;
