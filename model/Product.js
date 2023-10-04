const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: { type: Number, autoIncrement: true, primaryKey: true },
  name: { type: String, required: true },
  sku: { type: Number, required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;