import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to={'/addproduct'} className='sidebar-link'>
        <div className="sidebar-item">
          <p>Add Products</p>
        </div>
      </Link>
      <Link to={'/listproducts'} className='sidebar-link'> {/* Add link for listing products */}
        <div className="sidebar-item">
          <p>List Products</p>
        </div>
      </Link>
    </div>
  );
}

export default Sidebar;
