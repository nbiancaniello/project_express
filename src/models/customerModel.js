const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
   firstName: { type: String, required: true },
   lastName: { type: String, required: true },
   email: { type: String, required: false, match: /.+\@.+\..+/ },
   phone: { type: String, required: false },
   price: { type: Number, required: true },
   address: { type: String, required: true },
   defaultPaymentType: { type: String, required: true },
   isActive: { type: Boolean, default: true },
});

const Customer = mongoose.model("User", customerSchema);

module.exports = Customer;