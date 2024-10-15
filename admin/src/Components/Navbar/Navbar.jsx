import React from 'react';
import './Navbar.css';
import navlogo from '../../assets/logo.png';


const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="nav-left">
        <img src={navlogo} alt="Logo" className="nav-logo" />
        <span className="nav-company-name">Easy Vendor</span>
      </div>
    </div>
  );
}

export default Navbar;
