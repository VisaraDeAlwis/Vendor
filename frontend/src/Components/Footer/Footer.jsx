import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo.png'
import instagram_icon from '../Assets/insta.png'
import youtube_icon from '../Assets/utube.png'
import facebook_icon from '../Assets/fb.png'

const Footer = () => {
  return (
    <div className='footer'>
      <hr />
      <div className="footer-logo">
        <img src={footer_logo} alt="Logo" />
        <p>Easy Vendor</p>
      </div>
      <div className="footer-social-icon">
        <div className="footer-icons-container">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={instagram_icon} alt="Instagram" />
          </a>
        </div>
        <div className="footer-icons-container">
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <img src={youtube_icon} alt="YouTube" />
          </a>
        </div>
        <div className="footer-icons-container">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img src={facebook_icon} alt="Facebook" />
          </a>
        </div>
      </div>
      <div className="footer-copyright">
        <p>Copyright @2024 - All rights reserved</p>
      </div>
    </div>
  )
}

export default Footer
