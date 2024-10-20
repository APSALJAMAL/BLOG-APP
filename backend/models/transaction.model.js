import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
  price: {  // Storing price as a Number
    type: Number,
    required: true,
    min: 0,
  },
  currencyType: {
    type: String,
    required: true,
    enum: ['USD', 'EUR', 'GBP', 'INR', 'JPY'],
    default: 'USD',
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['Credit Card', 'PayPal', 'Bank Transfer', 'Other'],
    default: 'Credit Card',
  },
  transactionStatus: {
    type: String,
    required: true,
    enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
    default: 'Pending',
  },
  transactionDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  isRefunded: {
    type: Boolean,
    default: false,
  },
  refundId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Refund',
  },
  shippingAddress: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    country: { type: String },
  },
  billingAddress: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    country: { type: String },
  },
  email: {
    type: String,
    required: true,  // Email field is mandatory
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
}, { timestamps: true });  // Mongoose will manage createdAt and updatedAt automatically

// Check if the model already exists before defining it
const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);

export default Transaction;
