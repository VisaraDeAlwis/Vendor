import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopCategory from './Pages/ShopCategory';
import Shop from './Pages/Shop';
import Footer from './Components/Footer/Footer';
import Product from './Pages/Product';
import ShopContextProvider from './Context/ShopContext';
import ItemComponent from './Components/Item/Item';
import Success from './Components/Success/Success';

function App() {
  return (
    <div>
      <ShopContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Shop />} />
            <Route path='/Cakes' element={<ShopCategory category="Cakes" />} />
            <Route path="product">
              <Route path=":productId" element={<Product />} />
            </Route>
            {/* You can also add the ItemComponent here if needed */}
            <Route path='/items' element={<ItemComponent />} /> {/* Route to display items */}
            <Route path='/success'element={<Success/>}/>
          </Routes>
          <Footer />
        </BrowserRouter>
      </ShopContextProvider>
    </div>
  );
}

export default App;
