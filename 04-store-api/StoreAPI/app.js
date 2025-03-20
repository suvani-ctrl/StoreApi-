console.log('Store API');
require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const productsRouter = require('./routes/products');
require('express-async-errors');
// Import middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1> <a href="/api/v1/products">Products Route</a>');
});

// Products API Route
app.use('/api/v1/products', productsRouter);

// Error Handling Middleware
app.use(notFoundMiddleware);
app.use(errorMiddleware);

// Database Connection & Server Start
const port = process.env.PORT || 1000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`App is running on port ${port}`));
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1); // Exit the process if DB connection fails
    }
};

start();



