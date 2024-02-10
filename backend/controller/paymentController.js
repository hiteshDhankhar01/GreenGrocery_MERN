const User = require("../models/userScema")
const dotenv = require("dotenv").config()
const stripe = require("stripe")("sk_test_51OFVHXSJXUwhezWrkgu6uq1sXhzWQHjHUA5QVivxbmMDET59cwSahN6ClwiUTyStDNRAMTRz5QycfBSDeWhxJOA800Vq05NkdK");


const payment = async (req, res) => {
    const { products } = req.body;
    try {
        const lineItems = products.map((product) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: product.itemName,
                },
                unit_amount: product.itemPrice * 100,
            },
            quantity: product.quantity,
        }));
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:5173/Successfulpayment",
            cancel_url: "http://localhost:5173/Cancelpayment",
        });

        res.status(200).json({ sessionId: session.id });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const paymentSuccessfull = async (req, res) => {
    const userId = req.params.id;

    try {
        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Assume you have a 'cart' field in the user schema
        const cartItems = user.cart;

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ success: false, message: "Cart is empty" });
        }

        // Create a new order
        const order = {
            items: cartItems,
            // You can add more fields to the order if needed
        };

        // Add the order to the user's orders array
        // user.order.push(order);
        user.order.push(...cartItems);

        // Save the user document with the new order and an empty cart
        user.cart = [];
        await user.save();

        return res.status(200).json({ success: true, message: "Order placed successfully", order });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};




module.exports = { payment,paymentSuccessfull }

