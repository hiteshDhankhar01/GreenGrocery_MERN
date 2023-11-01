const mongoose = require("mongoose")

const productScema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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
    reviews: [{
        type: mongoose.Types.ObjectId,
        ref: "Review"
    }],
    averageRating: {
        type: Number,
        default: 0
    },
    totalRating: {
        type: Number,
        default: 0
    }
})

const Product = mongoose.model("Product", productScema)

module.exports = Product