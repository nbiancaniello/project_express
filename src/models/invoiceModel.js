const mongoose = require('mongoose');
const productSchema = require('./productModel').productSchema;
const userSchema = require('./customerModel').userSchema;

const invoiceSchema = new mongoose.Schema({
  dateIssued: {
    type: Date,
    required: true,
    default: Date.now
  },
  customer: {
    type: userSchema,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  items: {
    type: [productSchema],
    required: true
  }
});

// Create an index for faster querying
invoiceSchema.index({ customer: 1 });

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;