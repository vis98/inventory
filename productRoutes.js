const express=require('express')
const ProductController = require('./controllers/productController.js');

const router = express.Router();

/* // Create product
router.post('/', ProductController.createProduct);

// Get all products
router.get('/', ProductController.getAllProducts);

// Get product by id
router.get('/:id', ProductController.getProductById);

// Update product
router.put('/:id', ProductController.updateProduct);

// Delete product
router.delete('/:id', ProductController.deleteProduct);
 */
const productController=new ProductController();

productController.register(router)

module.exports = router;
