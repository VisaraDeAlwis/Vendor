import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png"; // Ensure the path to assets is correct
import axios from "axios";

const URL = "16.171.170.5";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [editedPrices, setEditedPrices] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.get(`http://${URL}:4000/allproducts`); // API to get all products
      setAllProducts(data);
    } catch (error) {
      setError("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const removeProduct = async (id) => {
    try {
      await axios.post(`http://${URL}:4000/removeproduct`, { id });
      fetchAllProducts();
    } catch (error) {
      setError("Error removing product");
    }
  };

  const updateProductPrices = async (id, newPrice) => {
    try {
      await axios.put(`http://${URL}:4000/updateprice/${id}`, {
        price: newPrice,
      });
      fetchAllProducts();
    } catch (error) {
      setError("Error updating price");
    }
  };

  const handlePriceChange = (id, value) => {
    setEditedPrices({
      ...editedPrices,
      [id]: value,
    });
  };

  return (
    <div className="list-product">
      <h1>All Products List</h1>
      {error && <p className="error">{error}</p>}
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Update Price</p>
        <p>Remove</p>
        <p>Update</p>
      </div>
      <div className="listproduct-allproducts">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {allProducts.map((product) => (
              <React.Fragment key={product.id}>
                <div className="listproduct-format-main listproduct-format">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="listproduct-product-icon"
                  />
                  <p>{product.name}</p>
                  <div>Rs.{product.price}</div>
                  <input
                    type="number"
                    value={editedPrices[product.id] || product.price}
                    onChange={(e) =>
                      handlePriceChange(product.id, e.target.value)
                    }
                    className="listproduct-input"
                  />
                  <img
                    onClick={() => removeProduct(product.id)}
                    src={cross_icon}
                    alt="Remove"
                    className="listproduct-remove-icon"
                  />
                  <button
                    onClick={() =>
                      updateProductPrices(
                        product.id,
                        editedPrices[product.id] || product.price
                      )
                    }
                    className="listproduct-update-button"
                  >
                    Update
                  </button>
                </div>
                <hr />
              </React.Fragment>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ListProduct;
