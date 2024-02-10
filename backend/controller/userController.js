const User = require("../models/userScema");

const userDetails = async (req, res) => {
    try {
        let result = await User.findOne({ _id: req.params.id })

        res.status(200).json({ message: "User Found", result })
    } catch (error) {
        res.status(404).json({ message: "Internal Server Error" })
        console.log(error)
    }
}

const updateUser = async (req, res) => {
    try {
        let user = await User.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: req.body }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User Update Successfully", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const deleteUser = async (req, res) => {
    try {
        const result = await User.findOneAndDelete({ _id: req.params.id });

        if (!result) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User Delete Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// const { ObjectId } = require("mongodb");

// const cartItem = async (req, res) => {
//     const userId = req.params.id;
//     const { quantity, itemId } = req.body;

//     try {
//         const user = await User.findById(userId);

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         if (!user.cart) {
//             return res.status(404).json({ message: "User cart not found" });
//         }

//         let itemObjectId;

//         try {
//             itemObjectId = new ObjectId(itemId);
//         } catch (error) {
//             console.error("Invalid ObjectId:", error.message);
//             return res.status(400).json({ message: "Invalid itemId" });
//         }

//         let alreadyAdd = user.cart.find(
//             (cart) => cart.itemId?.toString() === itemObjectId.toString()
//         );

//         if (alreadyAdd) {
//             const updateItem = await User.updateOne(
//                 {
//                     "cart.itemId": itemObjectId,
//                 },
//                 {
//                     $set: {
//                         "cart.$.quantity": quantity,
//                     },
//                 },
//                 {
//                     new: true,
//                 }
//             );
//         } else {
//             const addItemCart = await User.findByIdAndUpdate(
//                 userId,
//                 {
//                     $push: {
//                         cart: {
//                             itemId: itemObjectId,
//                             quantity: quantity,
//                         },
//                     },
//                 },
//                 {
//                     new: true,
//                 }
//             );
//         }

//         res.status(200).json({ message: "Item added to cart" });
//     } catch (error) {
//         console.error("Error in cartItem:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

//=======================================================================


const cartItem = async (req, res) => {
    const userId = req.params.id;
    const { quantity, itemId, itemName, itemImage, itemPrice, itemQuantity } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        let alreadyAdd = user.cart.find(
            (cart) => cart.itemId?.toString() === itemId.toString()
        );

        if (alreadyAdd) {
            const updateItem = await User.updateOne(
                {
                    "cart.itemId": itemId,
                },
                {
                    $set: {
                        "cart.$.quantity": quantity,
                    },
                },
                {
                    new: true,
                }
            );
        } else {
            const addItemCart = await User.findByIdAndUpdate(
                userId,
                {
                    $push: {
                        cart: {
                            itemId: itemId,
                            itemName: itemName,
                            itemImage: itemImage,
                            itemPrice: itemPrice,
                            itemQuantity: itemQuantity,
                            quantity: quantity,
                        },
                    },
                },
                {
                    new: true,
                }
            );
        }

        const updatedUser = await User.findById(userId);
        const updatedCartItems = updatedUser.cart;

        res.status(200).json({ message: "Item added to cart", cartItems: updatedCartItems });
    } catch (error) {
        console.error("Error in cartItem:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const getCartItem = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const cartData = user.cart || []; // Use an empty array if cart is not present
        res.status(200).json({ message: "Items of cart", cartData });
    } catch (error) {
        console.error("Error in getCartItem:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const removeCartItem = async (req, res) => {
    const userId = req.params.id;
    const itemId = req.body.itemId;

    try {
        const result = await User.findByIdAndUpdate(
            userId,
            {
                $pull: { cart: { itemId: itemId } }
            },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({ message: "Item not found in the user's cart" });
        }

        res.status(200).json({ message: "Item removed successfully from the cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const getOrderItem = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const orderData = user.order || []; // Use an empty array if cart is not present
        res.status(200).json({ message: "Items of order", orderData })

    } catch (error) {
        console.error("Error in getOrderItem:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


//=======================================================================


module.exports = { updateUser, deleteUser, userDetails, cartItem, getCartItem, removeCartItem, getOrderItem }