
const Product = require('../model/Product')
const {authenticateToken,validateProductSchema}=require('../utilities')
const jwt=require('jsonwebtoken')
require('dotenv').config()
class ProductController {

    /*  async addProduct() {
         const product = new Product(req.body);
 
         let pr = await product.save();
 
         res.status(201).json(pr);
 
     }
 
     
 
     async searchProduct() {
         const products = await Product.find({ name: nm });
 
         res.status(200).json(products);
     }
 
     async deleteProduct() {
         const product = await Product.findById(req.params.id);
 
         if (!product) {
             return res.status(404).json({ message: 'Product not found.' });
         }
 
         res.status(200).json(product);
     }
 
     
     async updateProduct() {
         const product = await Product.findById(req.params.id);
 
         if (!product) {
             return res.status(404).json({ message: 'Product not found.' });
         }
 
         product.set(req.body);
 
         let pr=await product.save();
 
         res.status(200).json(pr);
     } */

    register(app) {
        app.post('/api/login', (req, res) => {
            // For simplicity, we'll use a hardcoded user and password.
            const username = 'user';
            const password = 'password';
          console.log("req",req.body)
            const { reqUsername, reqPassword } = req.body;
            if (username === reqUsername && password === reqPassword) {
              const accessToken = jwt.sign({ username }, process.env.secret_key);
              return res.json({ accessToken });
            }
            res.sendStatus(401);
          });

        app.post("/products",authenticateToken,validateProductSchema,async (req, res) => {
            const prodId = await Product.findOne().sort({ _id: 'desc' }).exec();
            console.log("prodIdd",prodId)
            const newId = prodId ? parseInt(prodId.id)+ parseInt(1) : 1;
            req.body._id=newId
            const product = new Product(req.body);
            console.log("pro",req.body)
            let pr = await product.save();

            res.status(201).json(pr);
        });
        app.get('/products/:id',authenticateToken,async (req, res) => {
            const products = await Product.find({ id: req.params.id });
            if (!products) {
                return res.status(500).json("product not found")
            }
            res.status(200).json(products);
        });
        app.post('/update',authenticateToken,async (req, res) => {
            const product = await Product.findById(req.params.id);

            if (!product) {
                return res.status(404).json({ message: 'Product not found.' });
            }

            product.set(req.body);

            await product.save();

            res.status(200).json(product);
        });
        app.post('/delete/:id',authenticateToken,async (req, res) => {
            let id=req.params.id;
            const product = await Product.findById({_id:id});
            console.log(product)
            if (!product ||  product.qty==0) {
                return res.status(404).json({ message: 'Product not found.' });
            }
            else{
                product.qty=product.qty-1
                product.save()
            }

            res.status(200).json({ message: 'Product deleted successfully.' });
        });
    }

}
module.exports = ProductController