const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./Router/auth");
//const User = require("./models/userScema")
const userRouter = require("./Router/user")
const productRouter = require("./Router/product")
const  payment = require("./Router/payment")



dotenv.config();

const port = process.env.PORT || 7000;

const app = express();

const connectDB = async () => {
    try { 
        // Use the MONGO_URI from your environment variables (from your .env file)
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


app.use(express.json()); // Apply the JSON parsing middleware here
app.use(cookieParser());
app.use(cors());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/payment', payment)

// app.put('/api/v1/user/update/:id', async (req, res) => {
//     let result = await User.updateOne(
//         { _id: req.params.id },
//         { $set: req.body }
//     )
//     res.send(result)
// })

// ... other route configurations and server setup



app.listen(port, () => {
    connectDB();
    console.log(`Server is running at http://127.0.0.1:${port}`);
});
