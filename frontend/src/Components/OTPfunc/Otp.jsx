import React from 'react';

const Otp = () => {
  // Function to map product names to numbers from 0 to 5
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

  // Example usage: Generating OTP for a product
  const productName = 'productA'; // Replace with actual product name
  const otp = generateOtp(productName);

  return (
    <div>
      <h2>Generated OTP: {otp}</h2>
    </div>
  );
};

export default Otp;
