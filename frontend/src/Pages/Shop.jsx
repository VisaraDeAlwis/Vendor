import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item/Item';
import './Shop.css';

const Shop = () => {
  const { all_product } = useContext(ShopContext);

  // Only display the first 6 products for this layout
  const displayedProducts = all_product.slice(0, 6);

  return (
    <div className="shop-container">
      <h1>Our Products</h1>
      <div className="products-grid">
        {displayedProducts.length > 0 ? (
          displayedProducts.map((product) => (
            <Item
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
            />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default Shop;
