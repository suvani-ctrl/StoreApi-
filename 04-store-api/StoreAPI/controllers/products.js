const Product = require('../models/product');  // Import Product model

// Get all products with optional filtering by featured status, company, and name
const getAllProducts = async (req, res, next) => {
    try {
        const { featured, company, name } = req.query;  // Extract featured, company, and name from query parameters
        const queryObject = {};  // Initialize an empty query object

        // If featured is specified, filter products based on the featured status
        if (featured) {
            queryObject.featured = featured === 'true' ? true : false;  // Convert the string 'true' or 'false' to boolean
        }

        // If company is specified, filter products based on the company name
        if (company) {
            queryObject.company = company;  // Match the exact company name
        }

        // If name is specified, filter products based on the product name
        if (name) {
            const search = 'ab'
            queryObject.name = { $regex: search, $options: 'i' };  // Match name case-insensitively
        }

        console.log(queryObject);  // Log the query object (for debugging purposes)

        // Fetch the products from the database based on the query
        const products = await Product.find(queryObject);  // Use queryObject to filter products

        // Send response with products and total count
        res.status(200).json({ products, total: products.length });
    } catch (error) {
        // Pass the error to the error handling middleware
        next(error);
    }
};

// Get a static product by name 'albany'
const getAllProductsStatic = async (req, res) => {
    try {
        const products = await Product.find({
            name: {$regex:search, $options:'i'},  // Find products with the exact name 'albany'
        });

        // Send response with products and total count
        res.status(200).json({ products, total: products.length });
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getAllProducts, getAllProductsStatic };



//REGEX SETUP 