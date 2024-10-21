const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
app.use(express.static("public"));

app.use(express.json());
app.use(corscors({ origin: '*' }));

const URL = "13.60.205.166";

// Database connection with MongoDB
mongoose.connect(
  "mongodb+srv://sandaliwijayarathne2000:UJbeHpNitwF6miFM@cluster0.kz04u.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// API Root
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

// Image Storage Engine for multer
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// Static path for serving images
app.use("/images", express.static("upload/images"));

// Image Upload Endpoint
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://${URL}:${port}/images/${req.file.filename}`,
  });
});

// Product Schema and Model (Updated to use only one `price` field)
const Product = mongoose.model("Product", {
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true }, // Single price field
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
});

// Add Product Endpoint (Updated to use only `price`)
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    price: req.body.price, // Using single price field
  });

  try {
    await product.save();
    console.log("Product Saved");

    res.json({
      success: true,
      name: req.body.name,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Failed to add product" });
  }
});

// Delete Product Endpoint
app.post("/removeproduct", async (req, res) => {
  try {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Product Removed");

    res.json({
      success: true,
      name: req.body.name,
    });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ error: "Failed to remove product" });
  }
});

// Get All Products Endpoint
app.get("/allproducts", async (req, res) => {
  try {
    let products = await Product.find({});
    console.log("All products Fetched");
    res.json(products);
  } catch (error) {
    console.error("Error fetching all products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Update Product Price Endpoint (Updated to use only `price`)
app.put("/updateprice/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    product.price = req.body.price; // Update the single price field

    await product.save();
    console.log("Product Price Updated");

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error updating price:", error);
    res.status(500).json({ error: "Failed to update price" });
  }
});

// Creating endpoint for latest collection data
app.get("/newcollections", async (req, res) => {
  try {
    let products = await Product.find({});
    let newcollections = products.slice(-8); // Fetch the last 8 products
    console.log("New Collection Fetched");
    res.json(newcollections);
  } catch (error) {
    console.error("Error fetching new collections:", error);
    res.status(500).json({ error: "Failed to fetch new collections" });
  }
});

// Start server
app.listen(port, (error) => {
  if (!error) {
    console.log("Server running on Port " + port);
  } else {
    console.log("Error: " + error);
  }
});

//payment

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

// Assuming you have a function to get cart items from the database
async function getCartItemsFromDB(cartItems) {
  try {
    // Fetch product details from the database for each cart item
    const storeItems = await Product.find({
      id: { $in: cartItems.map((item) => item.id) },
    });

    // Map the cart items to include necessary Stripe fields
    return cartItems.map((cartItem) => {
      const product = storeItems.find((item) => item.id === cartItem.id);
      if (!product) {
        throw new Error(`Product with ID ${cartItem.id} not found`);
      }

      return {
        priceInCents: product.price * 100, // Ensure price is in cents
        name: product.name,
        quantity: cartItem.quantity,
      };
    });
  } catch (error) {
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
}

app.post("/create-checkout-session", async (req, res) => {
  try {
    // Get cart data from the request body (coming from frontend)
    const cartItems = req.body.items;

    // Fetch product details for each cart item
    const storeItems = await getCartItemsFromDB(cartItems);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: storeItems.map((item) => {
        return {
          price_data: {
            currency: "lkr", // Change currency to your preferred one
            product_data: {
              name: item.name,
            },
            unit_amount: item.priceInCents, // Amount in cents
          },
          quantity: item.quantity,
        };
      }),
      success_url: `http://${URL}:3000/success`, // Ensure this points to your frontend
      cancel_url: `http://${URL}:3000/fail`, // Ensure this points to your frontend
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: error.message });
  }
});
