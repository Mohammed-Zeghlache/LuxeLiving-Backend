const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  numberofProducts: { type: Number, required: true },
  products: [
    {
      productCode: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  TotalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Client = mongoose.model('Order', clientSchema);

module.exports = Client;

