import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Success.css';

const Success = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [otp, setOtp] = useState(''); // State to store generated OTP

  // Map product names to numbers (0 to 5)
  const getProductDigit = (productName) => {
    const productMap = {
      'Soap': 0,
      'Soaph': 1,
      'productC': 2,
      'productD': 3,
    };
    return productMap[productName] ?? 0; // Default to 0 if product is not found
  };

  // Function to generate a 5-digit OTP
  const generateOtp = (productName) => {
    const randomDigits = () => Math.floor(Math.random() * 10); // Generate a random digit (0-9)

    // First 3 digits are random
    const firstDigit = randomDigits();
    const secondDigit = randomDigits();
    const thirdDigit = randomDigits();

    // 4th digit based on product name (0 to 5)
    const fourthDigit = getProductDigit(productName);

    // 5th digit is random
    const fifthDigit = randomDigits();

    // Combine digits into a 5-digit OTP
    const otp = `${firstDigit}${secondDigit}${thirdDigit}${fourthDigit}${fifthDigit}`;
    return otp;
  };

  // UseEffect to generate OTP on component mount
  useEffect(() => {
    const productName = 'Soap'; // Replace with actual product name dynamically if needed
    const generatedOtp = generateOtp(productName); // Generate OTP based on product name
    setOtp(generatedOtp); // Set the OTP in state
  }, []); // Empty dependency array to ensure this runs only on mount

  // Handle continue shopping button click
  const handleContinueShopping = () => {
    navigate('/'); // Navigate to the homepage ("/")
  };

  return (
    <div className="success-container">
      <h1 className="success-title">Payment Successful!</h1>
      <p className="success-message">
        Thank you for your purchase! Your payment has been processed successfully.
      </p>
      <div className="success-icon">&#10004;</div> {/* Check mark icon */}
      <p className="success-instructions">
        You will receive a confirmation email shortly. If you have any questions, feel free to reach out to our support team.
      </p>
      <p className="otp-code">Your OTP Code: <strong>{otp}</strong></p> {/* Display the OTP from state */}
      <button 
        className="continue-shopping-button" 
        onClick={handleContinueShopping} // Attach the click event
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default Success;
