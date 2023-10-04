const jwt = require('jsonwebtoken');
require('dotenv').config()


    // Authentication Middleware
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.sendStatus(401);
  console.log("token")
    jwt.verify(token, process.env.secret_key, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };

  const Joi = require('joi');

// Create a middleware function to validate the request body
const validateProductSchema = async (req, res, next) => {
  console.log("schema inside")
  // Define the schema
  const productSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    sku: Joi.number().integer().required(),
    qty: Joi.number().integer().required(),
    price: Joi.number().precision(2).required(),
  });

  // Validate the request body against the schema
  const { error } = productSchema.validate(req.body);

  // If there are any validation errors, return an error response
  if (error) {
    return res.status(400).json({
      message: 'Invalid product data',
      errors: error.details,
    });
  }
console.log("req inside schema",req.body)
  // Continue to the next middleware function
  next();
};

module.exports={authenticateToken,validateProductSchema}