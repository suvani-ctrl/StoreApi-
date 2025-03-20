
//DYNAMICALLY ADDED THEM PRODUCTS.JSON IN OUR DATABASE ON MONGODB
require('dotenv').config()

const connectDB = require('./db/connect')
const Product = require('./models/product')

const jsonProducts = require('./products.json')

//we want to connect to db and use the model to automatically add json proeducts to our databases

const start = async() =>
{
    try{
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany()
        await Product.create(jsonProducts)
        console.log('sucess insertion of products');
        process.exit(0)
    }
    catch(error)
    {console.log(error)
        process.exit(1) //err code 1
    }
}

start()