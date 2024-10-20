import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CreateTransaction = () => {
    const { postId, userId } = useParams();  // Extract postId and userId from the URL
    const navigate = useNavigate();  // Use useNavigate for navigation

    const [price, setPrice] = useState(0); // Initialize price to 0
    const [currencyType, setCurrencyType] = useState('USD');
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true); // Loading state to handle fetching data

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch post data to get the price
                const postResponse = await fetch(`/api/post/getposts/${postId}`);
                if (!postResponse.ok) throw new Error('Failed to fetch post data');
                const postData = await postResponse.json();
                setPrice(postData.price); // Set price from fetched post data

                // Fetch user data to get the email
                const userResponse = await fetch(`/api/user/getusers/${userId}`);
                if (!userResponse.ok) throw new Error('Failed to fetch user data');
                const userData = await userResponse.json();
                setEmail(userData.email); // Set email from fetched user data

                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false); // Set loading to false even on error
            }
        };

        fetchData();
    }, [postId, userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the transaction data, setting transactionStatus to 'Pending'
        const transactionData = {
            userId,  // Use userId from URL
            postId,  // Use postId from URL
            price,
            currencyType,
            paymentMethod,
            transactionStatus: 'Pending',  // Set transactionStatus as 'Pending'
            email,
        };

        try {
            const response = await fetch('/api/transactions', {  // Send POST request to backend
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(transactionData),
            });

            if (!response.ok) {
                throw new Error('Failed to create transaction');
            }

            // Optionally, redirect or show success message
            navigate('/transactions'); // Redirect to transactions page using navigate
        } catch (error) {
            console.error('Error creating transaction:', error);
            // Handle error (e.g., show a notification)
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Display loading state
    }

    return (
        <div>
            <h2>Create Transaction</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        value={price}
                        readOnly // Make the price read-only since it's fetched
                    />
                </div>
                <div>
                    <label>Currency Type:</label>
                    <select
                        value={currencyType}
                        onChange={(e) => setCurrencyType(e.target.value)}
                    >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="INR">INR</option>
                        <option value="JPY">JPY</option>
                    </select>
                </div>
                <div>
                    <label>Payment Method:</label>
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <option value="Credit Card">Credit Card</option>
                        <option value="PayPal">PayPal</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        readOnly // Make the email read-only since it's fetched
                    />
                </div>
                <button type="submit">Create Transaction</button>
            </form>
        </div>
    );
};

export default CreateTransaction;
