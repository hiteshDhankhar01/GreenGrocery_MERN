const mongoose = require("mongoose")

const productScema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    oldPrice:{
        type:Number,
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    categories: {
        type: String,
        required: true
    },
    rating: [
        {
            star: Number,
            review: String,
            userName: String,
            userPhoto: String,
            postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
        }
    ],
    totalRating: {
        type: Number,
        default: 0
    },
    
},
    { timestamps: true }
)

const Product = mongoose.model("Product", productScema)

module.exports = Product