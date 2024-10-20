import Transaction from '../models/transaction.model.js'; // Assuming you have a Transaction model
import User from '../models/user.model.js'; // Assuming you have a User model
import Post from '../models/post.model.js'; // Assuming you have a Post model


// Create a new transaction
export const createTransaction = async (req, res) => {
  try {
      const { userId, postId, currencyType, paymentMethod, transactionStatus } = req.body;

      // Validate that the user and post exist
      const user = await User.findById(userId);
      const post = await Post.findById(postId);

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      if (!post) {
          return res.status(404).json({ message: 'Post not found' });
      }

      // Get price from post and email from user
      const price = post.price; // Assuming price is a field in your Post schema
      const email = user.email; // Assuming email is a field in your User schema

      // Create a new transaction object
      const newTransaction = new Transaction({
          userId,
          postId,
          price,
          currencyType,
          paymentMethod,
          transactionStatus,
          email,
      });

      // Save the transaction to the database
      const savedTransaction = await newTransaction.save();

      // Return a success response with the created transaction
      res.status(201).json({
          message: 'Transaction created successfully',
          transaction: savedTransaction,
      });
  } catch (error) {
      console.error('Error creating transaction:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Get all transactions
export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get transaction by ID
export const getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a transaction
export const updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json(transaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a transaction
export const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndDelete(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json({ message: 'Transaction deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
