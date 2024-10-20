import express from 'express';
import {
    createTransaction,
    getTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction,
} from '../controllers/transaction.controller.js';

const router = express.Router();

// Create a new transaction
router.post('/', createTransaction);

// Get all transactions
router.get('/', getTransactions);

// Get a single transaction by ID
router.get('/:id', getTransactionById);

// Update a transaction by ID
router.put('/:id', updateTransaction);

// Delete a transaction by ID
router.delete('/:id', deleteTransaction);

export default router;
