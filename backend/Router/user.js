const express = require("express")
const { updateUser, deleteUser, userDetails, cartItem, getCartItem, removeCartItem, getOrderItem } = require("../controller/userController")

const router = express.Router()

router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)
router.get('/:id', userDetails)
router.put('/cart/:id', cartItem)
router.get('/getcartitem/:id', getCartItem)
router.put('/deletecartitem/:id', removeCartItem)
router.get('/get-order-item/:id', getOrderItem)

module.exports = router