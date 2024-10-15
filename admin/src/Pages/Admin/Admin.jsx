import React from 'react';
import './Admin.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import AddProduct from '../../Components/AddProduct/AddProduct';
import ListProduct from '../../Components/ListProduct/ListProduct'; // Import the ListProduct component

const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar />
      <div className='admin-content'>
        <Routes>
          <Route path='/addproduct' element={<AddProduct />} />
          <Route path='/listproducts' element={<ListProduct />} /> {/* Add route for listing products */}
        </Routes>
      </div>
    </div>
  );
}

export default Admin;
