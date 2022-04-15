const mongoose = require('mongoose');
const productModel = mongoose.Schema({
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true},
    inStock: { type: Boolean, default: true },
});



const product = mongoose.model('Product', productModel);
module.exports.Product = product;
