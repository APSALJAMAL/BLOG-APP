import React from 'react';
import { useParams, Link } from 'react-router-dom';

const PaymentPage = () => {
  const { postId } = useParams();

  const handlePayment = () => {
    // Implement your payment processing logic here
    // After processing, redirect to the TransactionStatusPage
    // For example, redirecting with a success status
    window.location.href = `/transaction-status/success/${postId}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Payment for Post ID: {postId}</h1>
      <p className="text-lg mb-4">Please enter your payment details below:</p>
      {/* Replace this with actual payment form */}
      <form onSubmit={(e) => {
        e.preventDefault(); // Prevent default form submission
        handlePayment();
      }}>
        <input type="text" placeholder="Card Number" className="border p-2 mb-4 w-full" required />
        <input type="text" placeholder="Expiry Date" className="border p-2 mb-4 w-full" required />
        <input type="text" placeholder="CVV" className="border p-2 mb-4 w-full" required />
        <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded">Pay Now</button>
      </form>
      <Link to="/">
        <button className="text-teal-500 mt-4">Cancel</button>
      </Link>
    </div>
  );
};

export default PaymentPage;
