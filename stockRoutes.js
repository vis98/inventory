const express=require('express')
const StockController = require('./controllers/stockController.js');

const router = express.Router();
const stockController=new StockController();

stockController.register(router)

module.exports = router;
