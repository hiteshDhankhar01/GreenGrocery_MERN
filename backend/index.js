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


        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB connected successfully`);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};


app.use(cors());


app.use(express.json());


app.use(cookieParser());


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/payment', payment);


app.use('/', (req, res) => {
    res.send("server is running");
});

app.listen(port, () => {
    connectDB();
    console.log(`Server is running at http://127.0.0.1:${port}`);
});
