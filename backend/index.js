const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./Router/auth");
const userRouter = require("./Router/user");
const productRouter = require("./Router/product");
const payment = require("./Router/payment");

dotenv.config();

const port = process.env.PORT || 7000;

const app = express();

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URL;

        // Connect to the MongoDB database
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB connected successfully`);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit the process with an error code
    }
};

// Middleware for CORS - should be placed before route handlers
app.use(cors());


const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }
    return await fn(req, res)
}

const handler = (req, res) => {
    const d = new Date()
    res.end(d.toString())
}

app.use(allowCors(handler))

// Middleware for parsing JSON
app.use(express.json());

// Middleware for parsing cookies
app.use(cookieParser());

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/payment', payment);




// Default route
app.use('/', (req, res) => {
    res.send("server is running");
});

// Error handling middleware, if needed
// app.use(function(err, req, res, next) {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
// });

// CORS headers middleware - this might not be needed if already set up in the CORS package options

app.listen(port, () => {
    connectDB();
    console.log(`Server is running at http://127.0.0.1:${port}`);
});
