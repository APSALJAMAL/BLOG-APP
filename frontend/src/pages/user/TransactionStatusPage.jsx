import React from 'react';
import { useParams } from 'react-router-dom';

const TransactionStatusPage = () => {
  const { status, postId } = useParams(); // Get status and postId from the URL

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Transaction Status</h1>
      {status === 'success' ? (
        <div className="text-green-500">
          <h2 className="text-lg">Payment Successful!</h2>
          <p>Your purchase for post ID: {postId} was successful. Thank you!</p>
        </div>
      ) : (
        <div className="text-red-500">
          <h2 className="text-lg">Payment Failed!</h2>
          <p>There was an issue with your payment. Please try again.</p>
        </div>
      )}
      <button className="bg-teal-500 text-white px-4 py-2 mt-4 rounded">
        <a href="/">Go to Home</a>
      </button>
    </div>
  );
};

export default TransactionStatusPage;
