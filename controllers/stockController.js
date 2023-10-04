
const Product = require('../model/Product')
const {authenticateToken,validateProductSchema}=require('../utilities')
const jwt=require('jsonwebtoken')
require('dotenv').config()
class StockController {

    register(app) {
    
        app.post("/addStock",authenticateToken,async (req, res) => {
            const prodId = await Product.findOne({ _id: req.body.productId});
            if (!prodId) {
                return res.status(404).json({ message: 'Product not found.' });
            }
            const product = await Product.findOne({ _id: req.body.productId});
            product.qty=product.qty+parseInt(req.body.stockup);
            let pr = await product.save();

            res.status(201).json(pr);
        });
        
    }

}
module.exports = StockController
